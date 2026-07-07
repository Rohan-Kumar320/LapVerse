import { body } from "express-validator";

export const validateCartQuantity = [
  body("quantity")
    .toInt()
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),
];