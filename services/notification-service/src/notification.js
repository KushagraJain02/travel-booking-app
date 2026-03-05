import amqp from "amqplib";
import dotenv from "dotenv";

import { pool } from "./config/db.js";

dotenv.config();

const RABBITMQ_URL = process.env.RABBITMQ_URL;
const QUEUE = "booking_notifications";
let connection = null;
let channel = null;
let retryCount = 0;
const MAX_RETRIES = 10;
const RETRY_DELAY = 5000;

export const startNotificationListener = async () => {
  try {
    if (!RABBITMQ_URL) {
      throw new Error("RABBITMQ_URL environment variable is not set");
    }

    console.log("🔄 Connecting to RabbitMQ...");
    connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();

    // Set prefetch to process one message at a time
    await channel.prefetch(1);

    await channel.assertQueue(QUEUE, { durable: true });
    console.log("✅ Notification Service listening on queue:", QUEUE);
    retryCount = 0;

    channel.consume(
      QUEUE,
      async (msg) => {
        if (msg !== null) {
          try {
            const booking = JSON.parse(msg.content.toString());
            console.log("🔔 New Booking Notification:", booking);

            // ✅ INSERT INTO DATABASE
            await pool.query(
              `INSERT INTO notifications (user_id, message)
           VALUES ($1, $2)`,
              [
                booking.user_id,
                `Your booking for flight ${booking.flight_id} is ${booking.status}`,
              ],
            );

            console.log("✅ Notification saved to DB");

            channel.ack(msg);
          } catch (error) {
            console.error("❌ Error processing notification:", error.message);
            channel.nack(msg, false, false);
          }
        }
      },
      { noAck: false },
    );

    // Handle connection close
    connection.on("close", () => {
      console.warn(
        "⚠️  RabbitMQ connection closed. Attempting to reconnect...",
      );
      setTimeout(startNotificationListener, RETRY_DELAY);
    });

    connection.on("error", (err) => {
      console.error("❌ RabbitMQ connection error:", err);
      setTimeout(startNotificationListener, RETRY_DELAY);
    });
  } catch (err) {
    retryCount++;
    console.error(
      `❌ RabbitMQ Error (Retry ${retryCount}/${MAX_RETRIES}):`,
      err.message,
    );

    if (retryCount < MAX_RETRIES) {
      console.log(`⏳ Retrying in ${RETRY_DELAY / 1000} seconds...`);
      setTimeout(startNotificationListener, RETRY_DELAY);
    } else {
      console.error(
        "❌ Max retries reached. Notification service failed to connect.",
      );
      process.exit(1);
    }
  }
};

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down notification service...");
  if (channel) await channel.close();
  if (connection) await connection.close();
  process.exit(0);
});
