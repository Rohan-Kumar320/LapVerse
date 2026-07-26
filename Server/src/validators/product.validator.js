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

    body("category")
    .trim()
    .isIn([
      "Gaming",
      "Business",
      "Student",
      "Ultrabook",
      "Workstation",
      "2-in-1",
    ])
    .withMessage("Invalid category"),

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

  body("stock")
  .toInt()
  .isInt({ min: 0 })
  .withMessage("Stock cannot be negative"),

body("storage")
  .trim()
  .toInt()
  .isInt({ gt: 0 })
  .withMessage("Storage must be greater than 0"),

  body("gpu")
    .trim()
    .notEmpty()
    .withMessage("GPU is required"),

  body("screenSize")
  .trim()
  .toFloat()
  .isFloat({ gt: 0 })
  .withMessage("Screen size must be greater than 0"),

body("battery")
  .trim()
  .toFloat()
  .isFloat({ gt: 0 })
  .withMessage("Battery capacity must be greater than 0"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required"),

    body("discount")
  .toFloat()
  .isFloat({ min: 0, max: 100 })
  .withMessage("Discount must be between 0 and 100"),

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

    body("category")
    .optional()
    .trim()
    .isIn([
      "Gaming",
      "Business",
      "Student",
      "Ultrabook",
      "Workstation",
      "2-in-1",
    ])
    .withMessage("Invalid category"),

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

  body("stock")
  .optional()
  .toInt()
  .isInt({ min: 0 })
  .withMessage("Stock cannot be negative"),

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

    body("discount")
  .optional()
  .toFloat()
  .isFloat({ min: 0, max: 100 })
  .withMessage("Discount must be between 0 and 100"),

  body("screenSize")
  .optional()
  .trim()
  .toFloat()
  .isFloat({ gt: 0 })
  .withMessage("Screen size must be greater than 0"),

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