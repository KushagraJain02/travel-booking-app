import axiosInstance from "./axios";

export const searchFlights = async (origin, destination, departDate) => {
  const params = {};

  if (origin) params.origin = origin;
  if (destination) params.destination = destination;
  if (departDate) params.departDate = departDate;

  const response = await axiosInstance.get("/search", {
    params,
  });

  return response.data;
};
