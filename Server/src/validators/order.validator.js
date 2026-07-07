import { body } from "express-validator";

export const validateCreateOrder = [
  body("shippingAddress")
    .trim()
    .notEmpty()
    .withMessage("Shipping address is required"),

  body("paymentMethod")
    .trim()
    .isIn([
      "Cash on Delivery",
      "Card",
      "Bank Transfer",
    ])
    .withMessage("Invalid payment method"),
];

export const validateUpdateOrderStatus = [
  body("status")
    .trim()
    .isIn([
      "Pending",
      "Confirmed",
      "Shipped",
      "Delivered",
      "Cancelled",
    ])
    .withMessage("Invalid order status"),
];