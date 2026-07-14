import express from "express";
import { addToCart, getMyCart, updateCartQuantity, removeFromCart, clearCart } from "../controllers/cart.controller.js";
import protect from "../middleware/auth.middleware.js";
import { validateCartQuantity } from "../validators/cart.validator.js";
import validate from "../middleware/validation.middleware.js";

const router = express.Router();

router.post("/:productId", protect, addToCart);
router.get("/", protect, getMyCart);
router.put("/:productId", protect, validateCartQuantity, validate, updateCartQuantity);
router.delete("/:productId", protect, removeFromCart);
router.delete("/", protect, clearCart);

export default router;