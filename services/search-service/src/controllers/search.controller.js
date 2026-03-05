import * as searchService from "../services/search.service.js";

export const searchFlights = async (req, res) => {
  try {
    const { origin, destination, date } = req.query;

    const flights = await searchService.searchFlights(
      origin,
      destination,
      date,
    );

    res.json(flights);
  } catch (error) {
    console.error("Search Service error:", error.message);
    res.status(500).json({ error: "Failed to search flights" });
  }
};
