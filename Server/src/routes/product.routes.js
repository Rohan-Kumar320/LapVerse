import express from "express";
import { createProduct, getProduct, getProducts, updateProduct, deleteProduct, getSellerProducts, updateProductStock } from "../controllers/product.controller.js";
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
router.get(
  "/seller/my-products",
  protect,
  getSellerProducts
);
router.get("/:id", getProduct);

router.put(
  "/:id",
  protect,
  upload.array("images", 5),
  validateProductUpdate,
  validate,
  updateProduct
);
router.put(
  "/:id/stock",
  protect,
  updateProductStock
);
// router.delete("/:id", protect, deleteProduct);
router.delete(
  "/seller/:id",
  protect,
  deleteProduct
);
export default router;