import express from "express";

import protect from "../middleware/auth.middleware.js";

import validate from "../middleware/validation.middleware.js";

import {
  applySellerAccount,
  approveSeller,
  getMySellerApplication,
  getSellerApplications,
  getSellerApplication,
  rejectSeller,
  switchSellerMode,
  getSellerStatus,
  removeSellerRole,
  restoreSellerRole,
} from "../controllers/seller.controller.js";

import { validateSellerApplication } from "../validators/seller.validator.js";
import adminOnly from "../middleware/admin.middleware.js";

const router = express.Router();

router.post(
  "/apply",

  protect,

  validateSellerApplication,

  validate,

  applySellerAccount,
);

router.get(
  "/application",

  protect,

  getMySellerApplication,
);

router.get(
  "/admin/applications",
  protect,
  adminOnly,
  getSellerApplications,
);

router.get("/admin/applications/:id", protect, adminOnly, getSellerApplication);

router.get(
  "/status",
  protect,
  getSellerStatus
);

router.put(
  "/admin/applications/:id/approve",
  protect,
  adminOnly,
  approveSeller,
);

router.put("/admin/applications/:id/reject", protect, adminOnly, rejectSeller);

router.put(
  "/switch",
  protect,
  switchSellerMode
);

router.put(
    "/admin/:id/remove-role",
    protect,
    adminOnly,
    removeSellerRole
);

router.put(
  "/admin/applications/:applicationId/restore-role",
  protect,
  adminOnly,
  restoreSellerRole
);

export default router;
