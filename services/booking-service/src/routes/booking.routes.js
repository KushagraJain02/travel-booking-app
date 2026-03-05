// booking.routes.js
import express from "express";
import * as bookingController from "../controllers/booking.controller.js";

const router = express.Router();

// GET all bookings
router.get("/", bookingController.getBookings);

// GET booking by ID
router.get("/:id", bookingController.getBooking);

// POST create booking
router.post("/", bookingController.createBooking);

export default router;
