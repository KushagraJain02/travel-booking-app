import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/", userRoutes);

app.listen(process.env.PORT || 4006, () => {
  console.log("User Service running on port 4006");
});
