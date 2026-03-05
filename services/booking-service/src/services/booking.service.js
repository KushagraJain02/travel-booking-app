// booking.service.js

import pool from "../config/db.js";
import axios from "axios";
import amqp from "amqplib";
import dotenv from "dotenv";

dotenv.config();

const INVENTORY_SERVICE_URL = process.env.INVENTORY_SERVICE_URL;
const RABBITMQ_URL = process.env.RABBITMQ_URL;
const QUEUE = "booking_notifications";

/*
==================================================
Create Booking (same function name as before)
==================================================
*/
export const createBookingRecord = async ({
  user_id,
  flight_id,
  quantity,
  status = "CONFIRMED",
}) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1️⃣ Reserve seats from Inventory Service
    await axios.post(`${INVENTORY_SERVICE_URL}/flights/reserve/${flight_id}`, {
      quantity,
    });

    // 2️⃣ Insert booking into DB
    const result = await client.query(
      `INSERT INTO bookings (user_id, flight_id, quantity, status)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [user_id, flight_id, quantity, status],
    );

    const booking = result.rows[0];

    await client.query("COMMIT");

    // 3️⃣ Publish notification event
    await publishBookingNotification(booking);

    return booking;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

/*
==================================================
RabbitMQ Publisher
==================================================
*/
const connectRabbitMQ = async (retries = 5) => {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    return connection;
  } catch (error) {
    if (retries === 0) {
      throw error;
    }
    console.log("Retrying RabbitMQ connection...");
    await new Promise((res) => setTimeout(res, 5000));
    return connectRabbitMQ(retries - 1);
  }
};

const publishBookingNotification = async (booking) => {
  try {
    const connection = await connectRabbitMQ();
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE, { durable: true });

    channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(booking)));

    await channel.close();
    await connection.close();
  } catch (err) {
    console.error("RabbitMQ publish error:", err.message);
  }
};

/*
==================================================
Get All Bookings
==================================================
*/
export const getAllBookings = async () => {
  const result = await pool.query("SELECT * FROM bookings ORDER BY id");
  return result.rows;
};

/*
==================================================
Get Booking By ID
==================================================
*/
export const getBookingById = async (id) => {
  const result = await pool.query("SELECT * FROM bookings WHERE user_id = $1", [
    id,
  ]);
  return result.rows;
};
