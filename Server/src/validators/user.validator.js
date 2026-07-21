import { body } from "express-validator";

export const validateUpdateProfile = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Name is required."),

  body("phone")
    .optional()
    .trim(),
];

export const validateChangePassword = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required."),

  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters long."),

  body("confirmPassword")
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error("Passwords do not match.");
      }

      return true;
    }),
];