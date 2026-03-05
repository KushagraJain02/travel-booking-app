import pool from "../config/db.js";

export const createFlight = async (data) => {
  const {
    flight_number,
    origin,
    destination,
    departure_time,
    arrival_time,
    price,
    seats_available,
  } = data;

  const { rows } = await pool.query(
    `INSERT INTO flights 
     (flight_number, origin, destination, departure_time, arrival_time, price, seats_available)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     RETURNING *`,
    [
      flight_number,
      origin,
      destination,
      departure_time,
      arrival_time,
      price,
      seats_available,
    ],
  );

  return rows[0];
};

export const getAllFlights = async () => {
  const { rows } = await pool.query("SELECT * FROM flights ORDER BY id DESC");
  return rows;
};

export const getFlightById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM flights WHERE id = $1", [
    id,
  ]);
  return rows[0];
};

export const reserveSeats = async (flightId, quantity) => {
  // Check available seats
  const flight = await getFlightById(flightId);
  if (!flight) throw new Error("Flight not found");

  if (flight.seats_available < quantity) {
    throw new Error("Not enough seats available");
  }

  // Reduce seats
  const result = await pool.query(
    `UPDATE flights
     SET seats_available = seats_available - $1
     WHERE id = $2
     RETURNING *`,
    [quantity, flightId],
  );

  return result.rows[0];
};

export const updateFlight = async (id, data) => {
  const { price, seats_available } = data;

  const { rows } = await pool.query(
    `UPDATE flights 
     SET price = $1, seats_available = $2
     WHERE id = $3
     RETURNING *`,
    [price, seats_available, id],
  );

  return rows[0];
};

export const deleteFlight = async (id) => {
  await pool.query("DELETE FROM flights WHERE id = $1", [id]);
};
