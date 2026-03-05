import * as inventoryService from "../services/inventory.service.js";

export const createFlight = async (req, res) => {
  try {
    const flight = await inventoryService.createFlight(req.body);
    res.status(201).json(flight);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Flight creation failed" });
  }
};

export const getAllFlights = async (req, res) => {
  try {
    const flights = await inventoryService.getAllFlights();
    res.json(flights);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch flights" });
  }
};

export const getFlightById = async (req, res) => {
  try {
    const flight = await inventoryService.getFlightById(req.params.id);

    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    res.json(flight);
  } catch (error) {
    res.status(500).json({ error: "Error fetching flight" });
  }
};

export const reserveFlight = async (req, res) => {
  try {
    const flightId = req.params.id;
    const { quantity } = req.body;

    const updatedFlight = await inventoryService.reserveSeats(
      flightId,
      quantity,
    );

    res.json({
      message: "Seats reserved successfully",
      flight: updatedFlight,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateFlight = async (req, res) => {
  try {
    const updated = await inventoryService.updateFlight(
      req.params.id,
      req.body,
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
};

export const deleteFlight = async (req, res) => {
  try {
    await inventoryService.deleteFlight(req.params.id);
    res.json({ message: "Flight deleted" });
  } catch (error) {
    res.status(500).json({ error: "Delete failed" });
  }
};
