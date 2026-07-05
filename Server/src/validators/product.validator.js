import { body } from "express-validator";

export const validateProduct = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required"),

  body("brand")
    .trim()
    .notEmpty()
    .withMessage("Brand is required"),

  body("model")
    .trim()
    .notEmpty()
    .withMessage("Model is required"),

  body("price")
  .trim()
  .toFloat()
  .isFloat({ gt: 0 })
  .withMessage("Price must be greater than 0"),

  body("processor")
    .trim()
    .notEmpty()
    .withMessage("Processor is required"),

  body("ram")
  .trim()
  .toInt()
  .isInt({ gt: 0 })
  .withMessage("RAM must be greater than 0"),

body("storage")
  .trim()
  .toInt()
  .isInt({ gt: 0 })
  .withMessage("Storage must be greater than 0"),

  body("gpu")
    .trim()
    .notEmpty()
    .withMessage("GPU is required"),

  body("display")
  .trim()
  .toFloat()
  .isFloat({ gt: 0 })
  .withMessage("Display size must be greater than 0"),

body("battery")
  .trim()
  .toFloat()
  .isFloat({ gt: 0 })
  .withMessage("Battery capacity must be greater than 0"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required"),

  body("condition")
  .trim()
  .optional()
  .isIn([
    "New",
    "Like New",
    "Excellent",
    "Good",
    "Fair",
  ])
  .withMessage("Invalid condition"),
];

//Validating Product Updates

export const validateProductUpdate = [
 body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title is required"),

  body("brand")
  .optional()
    .trim()
    .notEmpty()
    .withMessage("Brand is required"),

  body("model")
  .optional()
    .trim()
    .notEmpty()
    .withMessage("Model is required"),

  body("price")
  .optional()
  .trim()
  .toFloat()
  .isFloat({ gt: 0 })
  .withMessage("Price must be greater than 0"),

  body("processor")
  .optional()
    .trim()
    .notEmpty()
    .withMessage("Processor is required"),

  body("ram")
  .optional()
  .trim()
  .toInt()
  .isInt({ gt: 0 })
  .withMessage("RAM must be greater than 0"),

body("storage")
.optional()
  .trim()
  .toInt()
  .isInt({ gt: 0 })
  .withMessage("Storage must be greater than 0"),

  body("gpu")
  .optional()
    .trim()
    .notEmpty()
    .withMessage("GPU is required"),

  body("display")
  .optional()
  .trim()
  .toFloat()
  .isFloat({ gt: 0 })
  .withMessage("Display size must be greater than 0"),

body("battery")
.optional()
  .trim()
  .toFloat()
  .isFloat({ gt: 0 })
  .withMessage("Battery capacity must be greater than 0"),

  body("description")
  .optional()
    .trim()
    .notEmpty()
    .withMessage("Description is required"),

  body("condition")
  .trim()
  .optional()
  .isIn([
    "New",
    "Like New",
    "Excellent",
    "Good",
    "Fair",
  ])
  .withMessage("Invalid condition"),
];