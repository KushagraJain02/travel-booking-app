import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import axios from "axios";
import { pool } from "./db.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const USER_SERVICE_URL = process.env.USER_SERVICE_URL;

// ----------------- REGISTER -----------------
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into auth_db
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id",
      [name, email, hashedPassword],
    );

    const userId = result.rows[0].id;

    // 🔥 Call User Service to create profile
    try {
      await axios.post(`${USER_SERVICE_URL}/`, {
        id: userId,
        email,
        name,
        role: "USER",
      });
    } catch (error) {
      console.error("User Service call failed:", error.message);
      return res.status(500).json({ error: "User profile creation failed" });
    }

    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// ----------------- LOGIN -----------------
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = result.rows[0];

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" },
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});

app.listen(4001, () => {
  console.log("Auth Service running on port 4001");
});
