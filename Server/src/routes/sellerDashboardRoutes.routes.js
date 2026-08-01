import express from "express";
import { getSellerDashboard } from "../controllers/sellerAnalytics.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect,getSellerDashboard);

export default router;