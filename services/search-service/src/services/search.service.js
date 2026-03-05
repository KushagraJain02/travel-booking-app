import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const INVENTORY_URL = process.env.INVENTORY_SERVICE_URL;

//Fetch all flights from inventory-service and filter them
export const searchFlights = async (origin, destination, date) => {
  try {
    const res = await axios.get(`${INVENTORY_URL}/flights`);
    let flights = res.data;

    if (origin) {
      flights = flights.filter(
        (f) => f.origin.toLowerCase() === origin.toLowerCase(),
      );
    }
    if (destination) {
      flights = flights.filter(
        (f) => f.destination.toLowerCase() === destination.toLowerCase(),
      );
    }
    if (date) {
      flights = flights.filter((f) => {
        const flightDate = new Date(f.departure_time)
          .toISOString()
          .split("T")[0];
        return flightDate === date;
      });
    }

    return flights;
  } catch (err) {
    console.error("Error fetching flights from inventory:", err.message);
    throw new Error("Failed to fetch flights from inventory");
  }
};
