import express from "express";
import * as inventoryController from "../controllers/inventory.controller.js";

const router = express.Router();

router.post("/flights", inventoryController.createFlight);
router.get("/flights", inventoryController.getAllFlights);
router.get("/flights/:id", inventoryController.getFlightById);
router.put("/flights/:id", inventoryController.updateFlight);
router.delete("/flights/:id", inventoryController.deleteFlight);
router.post("/flights/reserve/:id", inventoryController.reserveFlight);

export default router;
