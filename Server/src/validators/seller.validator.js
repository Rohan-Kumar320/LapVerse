import { body } from "express-validator";

export const validateSellerApplication = [

  body("sellerType")
    .notEmpty()
    .withMessage("Seller type is required.")
    .isIn(["Individual", "Business"])
    .withMessage("Invalid seller type."),

  body("storeName")
    .trim()
    .notEmpty()
    .withMessage("Store name is required.")
    .isLength({ min: 3, max: 100 })
    .withMessage("Store name must be between 3 and 100 characters."),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required."),

  body("city")
    .trim()
    .notEmpty()
    .withMessage("City is required."),

  body("storeAddress")
    .trim()
    .notEmpty()
    .withMessage("Address is required."),

    body("businessDescription")
  .trim()
  .isLength({ min: 20, max: 300 })
  .withMessage(
    "Business description must be between 20 and 300 characters."
  ),

  body("cnic")
    .trim()
    .notEmpty()
    .withMessage("CNIC is required.")
    .matches(/^[0-9]{5}-[0-9]{7}-[0-9]$/)
    .withMessage(
      "CNIC must be in the format 12345-1234567-1."
    ),

];