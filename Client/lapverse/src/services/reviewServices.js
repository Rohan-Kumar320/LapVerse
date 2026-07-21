import api from "./api";

// Get Product Reviews
export const getProductReviews = async (productId) => {
  const { data } = await api.get(`/reviews/${productId}`);
  return data;
};

// Check if current user can review
export const canReviewProduct = async (productId) => {
  const { data } = await api.get(
    `/reviews/can-review/${productId}`
  );

  return data;
};
// Create Review
export const createReview = async (productId, reviewData) => {
  const { data } = await api.post(
    `/reviews/${productId}`,
    reviewData
  );

  return data;
};

// Update Review
export const updateReview = async (
  reviewId,
  reviewData
) => {
  const { data } = await api.put(
    `/reviews/${reviewId}`,
    reviewData
  );

  return data;
};

// Delete Review
export const deleteReview = async (
  reviewId
) => {
  const { data } = await api.delete(
    `/reviews/${reviewId}`
  );

  return data;
};

export const getMyReviews = async () => {
  const { data } = await api.get("/reviews/my-reviews");
  return data;
};