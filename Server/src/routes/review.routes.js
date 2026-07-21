import express from "express";
import {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview,
  getMyReviews,
  canReviewProduct
} from "../controllers/review.controller.js";
import protect from "../middleware/auth.middleware.js"; 
import { validateReview } from "../validators/review.validator.js";
import validate from "../middleware/validation.middleware.js";

const router = express.Router();

router.post("/:productId", protect, validateReview, validate, createReview);

router.get(
  "/can-review/:productId",
  protect,
  canReviewProduct
);

router.get(
  "/my-reviews",
  protect,
  getMyReviews
);
router.get("/:productId", getProductReviews);
router.put(
  "/:reviewId",
  protect,
  validateReview,
  validate,
  updateReview
);
router.delete("/:reviewId", protect, deleteReview);

export default router;