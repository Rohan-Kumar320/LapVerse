import {
  createContext,
  useContext,
  useState,
} from "react";

import {toast} from "react-toastify";
import { createReview, deleteReview,  updateReview as updateReviewService, canReviewProduct,getProductReviews,getMyReviews, } from "../services/reviewServices";


const ReviewContext = createContext();

export const ReviewProvider = ({
  children,
}) => {

  const [reviews, setReviews] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

    const [myReviews, setMyReviews] =
  useState([]);

//   const updateReview = async (
//   reviewId,
//   reviewData
// ) => {

//   try {

//     const data =
//       await updateReviewService(
//         reviewId,
//         reviewData
//       );

//     toast.success(data.message);

//     await fetchReviews();

//     return {
//       success: true,
//     };

//   } catch (error) {

//     toast.error(
//       error.response?.data?.message ||
//       "Unable to update review."
//     );

//     return {
//       success: false,
//       message:
//         error.response?.data?.message,
//     };

//   }

// };

const fetchReviews = async (productId) => {
  try {
    const data =
      await getProductReviews(productId);

    return data.reviews || [];
  } catch (error) {
    console.error(error);

    return [];
  }
};

const checkCanReview = async (
  productId
) => {
  try {
    return await canReviewProduct(
      productId
    );
  } catch (error) {
    console.error(error);

    return {
      canReview: false,
      hasPurchased: false,
      alreadyReviewed: false,
    };
  }
};

const addReview = async (
  productId,
  review
) => {
  try {
    const data = await createReview(
      productId,
      review
    );

    toast.success(data.message);

    return {
      success: true,
    };
  } catch (error) {
    toast.error(
      error.response?.data?.message
    );

    return {
      success: false,
    };
  }
};

const updateUserReview = async (
  reviewId,
  reviewData
) => {

  try {

    const data = await updateReviewService(
      reviewId,
      reviewData
    );

    toast.success(data.message);

    await fetchMyReviews();

    return {
      success: true,
      review: data.review,
    };

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Unable to update review."
    );

    return {
      success: false,
    };

  }

};

const removeReview = async (reviewId) => {

  try {

    const data = await deleteReview(reviewId);

    toast.success(data.message);

    await fetchMyReviews();

    return {
      success: true,
    };

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Unable to delete review."
    );

    return {
      success: false,
    };

  }

};
const fetchMyReviews = async () => {

  try {

    const data = await getMyReviews();

    setMyReviews(data.reviews || []);

    return data.reviews || [];

  } catch (error) {

    console.error(error);

    return [];

  }

};

  return (

    <ReviewContext.Provider
      value={{
        reviews,
    myReviews,
    loading,

    fetchReviews,
    fetchMyReviews,

    addReview,
    removeReview,
    updateUserReview,

    checkCanReview,
        

      }}
    >

      {children}

    </ReviewContext.Provider>

  );

};

export const useReviews = () =>
  useContext(ReviewContext);