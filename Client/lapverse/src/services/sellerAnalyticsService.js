import api from "./api";

export const getSellerAnalytics = async (
  range = "30d"
) => {

  const { data } = await api.get(
    `/seller/analytics?range=${range}`
  );

  return data;

};