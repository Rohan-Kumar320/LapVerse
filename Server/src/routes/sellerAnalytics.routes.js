import express from "express";

import protect from "../middleware/auth.middleware.js";
import { getSellerAnalytics } from "../controllers/sellerAnalytics.controller.js";


const router = express.Router();

router.get(

  "/",

  protect,

  getSellerAnalytics

);

export default router;