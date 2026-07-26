import SellerApplication from "../models/SellerApplication.js";
import User from "../models/User.js";

export const applySellerAccount = async (
  req,
  res
) => {

  try {

    const user =
      await User.findById(req.user._id);

    if (!user) {

      return res.status(404).json({
        message: "User not found.",
      });

    }

    if (
      user.roles.includes("seller")
    ) {

      return res.status(400).json({
        message:
          "You are already an approved seller.",
      });

    }

    const existing =
      await SellerApplication.findOne({
        user: user._id,
      });

    if (
      existing &&
      existing.status === "pending"
    ) {

      return res.status(400).json({
        message:
          "Your application is already under review.",
      });

    }

    if (
      existing &&
      existing.status === "approved"
    ) {

      return res.status(400).json({
        message:
          "Seller account already approved.",
      });

    }

if (
  existing &&
  existing.status === "rejected"
) {

  existing.sellerType =
    req.body.sellerType;

  existing.storeName =
    req.body.storeName;

  existing.phone =
    req.body.phone;

  existing.city =
    req.body.city;

  existing.storeaddress =
    req.body.storeaddress;

  existing.businessDescription =
    req.body.businessDescription;

  existing.cnic =
    req.body.cnic;

  existing.status = "pending";

  existing.rejectionReason = "";

  await existing.save();

  return res.status(200).json({

    success: true,

    message:
      "Seller application resubmitted successfully.",

    application: existing,

  });

}
    const application =
      await SellerApplication.create({

        user: user._id,

        sellerType:
          req.body.sellerType,

        storeName:
          req.body.storeName,

        phone:
          req.body.phone,

        city:
          req.body.city,

        storeAddress:
          req.body.storeAddress,

          businessDescription:
          req.body.businessDescription,

        cnic:
          req.body.cnic,

      });

    res.status(201).json({

      success: true,

      message:
        "Seller application submitted successfully.",

      application,

    });

  }

  catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

export const getMySellerApplication =
async (req, res) => {

  try {

    const application =
      await SellerApplication.findOne({

        user: req.user._id,

      });

    return res.status(200).json({

      success: true,

      application,

    });

  }

  catch (error) {

    return res.status(500).json({

      message: error.message,

    });

  }

};
export const getSellerApplications =
async (req, res) => {

  try {

    const { status } = req.query;

    const filter = {};

    if (
      status &&
      [
        "pending",
        "approved",
        "rejected",
      ].includes(status)
    ) {
      filter.status = status;
    }

    const applications =
      await SellerApplication.find(filter)
        .populate(
          "user",
          "name email avatar"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({

      success: true,

      applications,

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};
export const getSellerApplication =
async (req, res) => {

  try {

    const application =
      await SellerApplication
      .findById(req.params.id)
      .populate(
        "user",
        "name email avatar phone"
      );

    if (!application) {

      return res.status(404).json({

        message:
          "Application not found.",

      });

    }

    res.status(200).json({

      success: true,

      application,

    });

  }

  catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

export const approveSeller =
async (req, res) => {

  try {

    const application =
      await SellerApplication.findById(
        req.params.id
      );

    if (!application) {

      return res.status(404).json({
        message: "Application not found.",
      });

    }

    if (
      application.status === "approved"
    ) {

      return res.status(400).json({

        message:
          "Seller already approved.",

      });

    }

    application.status = "approved";

    application.reviewedAt =
      new Date();

    application.reviewedBy =
      req.user._id;

    await application.save();

    const user =
      await User.findById(
        application.user
      );

    if (
      !user.roles.includes("seller")
    ) {

      user.roles.push("seller");

    }

    await user.save();

    res.status(200).json({

      success: true,

      message:
        "Seller approved successfully.",

    });

  }

  catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

export const rejectSeller =
async (req, res) => {

  try {

    const application =
      await SellerApplication.findById(
        req.params.id
      );

    if (!application) {

      return res.status(404).json({

        message:
          "Application not found.",

      });

    }

    application.status = "rejected";

    application.reviewedAt =
      new Date();

    application.reviewedBy =
      req.user._id;

    application.rejectionReason =
      req.body.reason || "";

    await application.save();

    res.status(200).json({

      success: true,

      message:
        "Seller application rejected.",

    });

  }

  catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

export const switchSellerMode =
async (req, res) => {

  try {

    const { activeMode } = req.body;

    if (
      !["user", "seller"].includes(activeMode)
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Invalid mode.",

      });

    }

    const user =
      await User.findById(req.user._id);

    if (!user) {

      return res.status(404).json({

        message:
          "User not found.",

      });

    }

    if (
      activeMode === "seller" &&
      !user.roles.includes("seller")
    ) {

      return res.status(403).json({

        success: false,

        message:
          "Seller account not approved.",

      });

    }

    user.activeMode = activeMode;

    await user.save();

    res.status(200).json({

      success: true,

      message:
        `Switched to ${activeMode} mode.`,

      activeMode:
        user.activeMode,

    });

  }

  catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

export const getSellerStatus =
async (req, res) => {

  try {

    const user =
      await User.findById(req.user._id);

    const application =
      await SellerApplication.findOne({

        user: req.user._id,

      });

    res.status(200).json({

      success: true,

      roles: user.roles,

      activeMode:
        user.activeMode,

      application,

    });

  }

  catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};