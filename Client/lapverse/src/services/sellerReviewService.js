import api from "./api";

export const getSellerReviews = async () => {
  const { data } = await api.get(
    "/reviews/seller"
  );

  return data;
};