import api from "./api";

export const getProductReviews = async (productId) => {
  const response = await api.get(`/reviews/${productId}`);
  return response.data;
};