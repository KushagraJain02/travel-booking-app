import express from "express";
import dotenv from "dotenv";
import inventoryRoutes from "./routes/inventory.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/", inventoryRoutes);

app.listen(4002, () => {
  console.log("Inventory Service running on port 4002");
});
