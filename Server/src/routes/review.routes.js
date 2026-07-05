import express from "express";
import {
  createReview,
  getProductReviews,
  deleteReview
} from "../controllers/review.controller.js";
import protect from "../middleware/auth.middleware.js"; 

const router = express.Router();

router.post("/:productId", protect, createReview);
router.get("/:productId", getProductReviews);
router.delete("/:reviewId", protect, deleteReview);

export default router;