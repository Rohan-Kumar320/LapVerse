import express from "express";
import {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview
} from "../controllers/review.controller.js";
import protect from "../middleware/auth.middleware.js"; 
import { validateReview } from "../validators/review.validator.js";
import validate from "../middleware/validation.middleware.js";

const router = express.Router();

router.post("/:productId", protect, validateReview, validate, createReview);
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