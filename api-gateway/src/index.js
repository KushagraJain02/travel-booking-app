import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import proxyRoutes from "./routes/proxyRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan("dev"));

app.use("/api", proxyRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ message: "API Gateway is running" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on port ${PORT}`);
});
