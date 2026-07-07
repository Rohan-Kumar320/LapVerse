import express from "express";
import { createOrder, getMyOrders, getOrderById, cancelOrder,getSellerOrders, getAllOrders,updateOrderStatus } from "../controllers/order.controller.js";
import protect from "../middleware/auth.middleware.js";
import validate from "../middleware/validation.middleware.js";
import { validateCreateOrder, validateUpdateOrderStatus } from "../validators/order.validator.js";

const router = express.Router();

router.post("/", protect, validateCreateOrder,validate, createOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/seller", protect, getSellerOrders);
router.get("/", protect, getAllOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/cancel", protect, cancelOrder);
router.put("/:id/status", protect, validateUpdateOrderStatus, validate, updateOrderStatus);

export default router;