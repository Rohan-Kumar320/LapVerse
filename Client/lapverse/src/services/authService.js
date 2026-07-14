import api from "./api";

export const registerUser = async (userData) => {
  const { data } = await api.post("/users/register", userData);

  return data;
};

export const loginUser = async (userData) => {
  const { data } = await api.post("/users/login", userData);

  return data;
};

export const getProfile = async () => {
  const { data } = await api.get("/users/profile");
  return data;
};