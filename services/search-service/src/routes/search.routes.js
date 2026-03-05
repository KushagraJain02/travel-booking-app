import express from "express";
import { searchFlights } from "../controllers/search.controller.js";

const router = express.Router();

// GET /search?origin=NYC&destination=LON&date=2026-02-28
router.get("/", searchFlights);

export default router;
