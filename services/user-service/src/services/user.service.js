import pool from "../config/db.js";

export const getUserById = async (id) => {
  const { rows } = await pool.query(
    "SELECT id, email, name, role, created_at FROM users WHERE id = $1",
    [id],
  );

  return rows[0];
};

export const updateUser = async (id, name) => {
  const { rows } = await pool.query(
    "UPDATE users SET name = $1 WHERE id = $2 RETURNING id, email, name, role",
    [name, id],
  );

  return rows[0];
};

export const createUser = async (userData) => {
  const { id, email, name, role } = userData;

  const query = `
    INSERT INTO users (id, email, name, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, email, name, role
  `;

  const response = await pool.query(query, [id, email, name, role]);

  return response.rows[0]; // ONLY this
};
