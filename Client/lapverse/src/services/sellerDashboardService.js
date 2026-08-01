import api from "./api";

export const getSellerDashboard = async () => {
  const { data } = await api.get("/seller/dashboard");
  return data;
};