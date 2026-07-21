import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },

avatar: {
    url: {
        type: String,
        default: "",
    },

    public_id: {
        type: String,
        default: "",
    },
},
        phone: {
  type: String,
  default: "",
},

addresses: [
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },
    
    label: {
  type: String,
  default: "Home",
  trim: true,
  maxlength: 20,
},

    country: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    area: {
      type: String,
      required: true,
      trim: true,
    },

    postalCode: {
      type: String,
      default: "",
      trim: true,
    },

    addressLine: {
      type: String,
      required: true,
      trim: true,
    },

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
],
roles: {
  type: [String],
  enum: ["user", "seller", "admin"],
  default: ["user"],
},
    deletionRequested: {
  type: Boolean,
  default: false,
},

deletionDate: {
  type: Date,
  default: null,
},

  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;