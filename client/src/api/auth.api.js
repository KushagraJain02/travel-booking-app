import axiosInstance from "./axios";

export const loginUser = async (email, password) => {
  const response = await axiosInstance.post("/auth/login", {
    email,
    password,
  });
  // console.log(response.data);
  return response.data;
};

export const registerUser = async (name, email, password) => {
  const response = await axiosInstance.post("/auth/register", {
    name,
    email,
    password,
  });
  console.log(response.data);
  return response.data;
};
