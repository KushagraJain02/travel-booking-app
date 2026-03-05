import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import searchRoutes from "./routes/search.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/", searchRoutes);

const PORT = process.env.PORT || 4004;
app.listen(PORT, () => {
  console.log(`Search Service running on port ${PORT}`);
});
