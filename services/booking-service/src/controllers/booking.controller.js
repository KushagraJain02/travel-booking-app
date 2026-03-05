// booking.controller.js
import * as bookingService from "../services/booking.service.js";

export const createBooking = async (req, res) => {
  try {
    const { user_id, flight_id, quantity } = req.body;

    // Validate required fields
    if (!user_id || !flight_id || !quantity) {
      return res.status(400).json({
        message: "Missing required fields: user_id, flight_id, quantity",
      });
    }

    // Create booking record (handles inventory reservation internally)
    const booking = await bookingService.createBookingRecord({
      user_id,
      flight_id,
      quantity,
      status: "CONFIRMED",
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error("Booking error:", error.message);

    if (error.response) {
      return res.status(400).json({ message: error.response.data.message });
    }

    res.status(500).json({ message: "Booking failed" });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getAllBookings();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBooking = async (req, res) => {
  try {
    const booking = await bookingService.getBookingById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
