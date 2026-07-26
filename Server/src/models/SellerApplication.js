import mongoose from "mongoose";

const sellerApplicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    status: {
      type: String,
      enum: [
        "not_applied",
        "pending",
        "approved",
        "rejected",
      ],
      default: "pending",
    },

    sellerType: {
      type: String,
      enum: [
        "Individual",
        "Business",
      ],
      required: true,
    },

    storeName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    storeAddress: {
      type: String,
      required: true,
      trim: true,
    },

    businessDescription: {
  type: String,
  required: true,
  trim: true,
  maxlength: 300,
},

    cnic: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    submittedAt: {
      type: Date,
      default: Date.now,
    },

    reviewedAt: Date,

    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    rejectionReason: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "SellerApplication",
  sellerApplicationSchema
);