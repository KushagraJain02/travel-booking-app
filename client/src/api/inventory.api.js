import axios from "axios";

export const getFlightById = async (id) => {
  const token = localStorage.getItem("token");

  const res = await axios.get(`/api/flights/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
