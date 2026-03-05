import express from "express";
import dotenv from "dotenv";
import bookingRoutes from "./routes/booking.routes.js";
import pool from "./config/db.js";

dotenv.config();

const app = express();
app.use(express.json());

console.log("ENV CHECK → RABBITMQ_URL:", process.env.RABBITMQ_URL);
app.use("/", bookingRoutes);

const PORT = process.env.PORT || 4003;

app.listen(PORT, async () => {
  console.log(`Booking Service running on port ${PORT}`);

  try {
    const result = await pool.query("SELECT NOW()");
    console.log("DB Connected:", result.rows[0]);
  } catch (err) {
    console.error("DB Connection Failed:", err);
  }
});
