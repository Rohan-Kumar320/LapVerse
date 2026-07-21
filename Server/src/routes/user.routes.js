import express from "express";
import protect from "../middleware/auth.middleware.js";
import { registerUser, loginUser, getProfile, updateProfile, requestAccountDeletion, restoreAccount, changePassword,uploadAvatar, removeAvatar, getAddresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } from "../controllers/user.controller.js";
import validate from "../middleware/validation.middleware.js";
import avatarUpload from "../middleware/avatarUpload.middleware.js";
import {
  validateUpdateProfile,
  validateChangePassword
} from "../validators/user.validator.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.put(
  "/profile",
  protect,
  validateUpdateProfile,
  validate,
  updateProfile
);
router.delete(
  "/profile",
  protect,
  requestAccountDeletion
);
router.put(
  "/profile/restore",
  protect,
  restoreAccount
);
router.put(
  "/change-password",
  protect,
  validateChangePassword,
  validate,
  changePassword
);

router.put(
  "/avatar",
  protect,
  avatarUpload.single("avatar"),
  uploadAvatar
);

router.delete(
  "/avatar",
  protect,
  removeAvatar
);

router.get(
  "/addresses",
  protect,
  getAddresses
);

router.post(
  "/addresses",
  protect,
  addAddress
);

router.put(
  "/addresses/:id",
  protect,
  updateAddress
);
router.delete(
  "/addresses/:id",
  protect,
  deleteAddress
);

router.put(
  "/addresses/:id/default",
  protect,
  setDefaultAddress
);

export default router;