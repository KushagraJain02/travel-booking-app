import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST, // postgres (docker service name)
  user: process.env.DB_USER, // admin
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, // inventory_db
  port: process.env.DB_PORT || 5432,
});

export default pool;
