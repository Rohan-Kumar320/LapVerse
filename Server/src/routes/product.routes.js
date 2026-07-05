import express from "express";
import { createProduct, getProduct, getProducts, updateProduct, deleteProduct } from "../controllers/product.controller.js";
import protect from "../middleware/auth.middleware.js";
import { validateProduct, validateProductUpdate } from "../validators/product.validator.js";
import validate from "../middleware/validation.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  upload.array("images", 5),
  validateProduct,
  validate,
  createProduct
);

router.get("/", getProducts);
router.get("/:id", getProduct);

router.put(
  "/:id",
  protect,
  upload.array("images", 5),
  validateProductUpdate,
  validate,
  updateProduct
);

router.delete("/:id", protect, deleteProduct);

export default router;