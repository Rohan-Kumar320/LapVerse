import express from "express";
import avatarUpload from "../middleware/avatarUpload.middleware.js"
import {
    adminLogin,
    deleteUser,
    getAdminDashboard,
    getSellerCities,
    getSellers,
    getUserDetails,
    getUsers,
    reactivateUser,
    restoreUser,
    suspendUser,
    updateUser,
    updateUserAvatar,
} from "../controllers/admin.controller.js";

import {
    protectAdmin,
} from "../middleware/adminAuth.middleware.js";

const router = express.Router();

router.post(
    "/login",
    adminLogin
);

router.get(
    "/dashboard",
    protectAdmin,
    getAdminDashboard
);

router.get(
  "/users",
  protectAdmin,
  getUsers
);

router.get(

"/users/:id",

protectAdmin,

getUserDetails

);

router.get(

    "/sellers",

    protectAdmin,

    getSellers

);

router.get(

    "/sellers/cities",

    protectAdmin,

    getSellerCities

);

router.put(
    "/users/:id",
    protectAdmin,
    updateUser
);

router.put(

"/users/:id/avatar",

protectAdmin,

avatarUpload.single("avatar"),

updateUserAvatar

);

router.put(
  "/users/:id/suspend",
  protectAdmin,

  suspendUser
);

router.put(
  "/users/:id/reactivate",
  protectAdmin,

  reactivateUser
);

router.put(
    "/users/:id/delete",
    protectAdmin,
    deleteUser
);

router.put(
    "/users/:id/restore",
    protectAdmin,
    restoreUser
);


export default router;