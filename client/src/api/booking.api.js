import axiosInstance from "./axios";

// CREATE BOOKING
export const createBooking = async (user_id, flight_id, quantity) => {
  console.log("Creating booking with:", { user_id, flight_id, quantity });

  const response = await axiosInstance.post("/bookings", {
    user_id,
    flight_id,
    quantity,
  });

  return response.data;
};

// GET MY BOOKINGS
export const getMyBookings = async (user_id) => {
  const response = await axiosInstance.get(`/bookings/${user_id}`);
  return response.data;
};

export const getFlightById = async (id) => {
  const response = await axiosInstance.get(`/inventory/flights/${id}`);
  return response.data;
};

// Get user by id
export const getUserById = async (id) => {
  const response = await axiosInstance.get(`/users/${id}`);
  return response.data;
};
