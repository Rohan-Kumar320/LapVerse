import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { deleteFromCloudinary, uploadToCloudinary } from "../services/cloudinary.service.js";

//Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

const userResponse = {
    _id: user._id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    avatar: user.avatar.url,
    phone: user.phone,
    defaultShippingAddress:
      user.defaultShippingAddress,
};
    res.status(201).json({
      message: "User registered successfully",
      user: userResponse,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


//Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      message: "Login successful",
      token: generateToken(user._id),
user: {
    _id: user._id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    avatar: user.avatar.url,
    phone: user.phone,
    defaultShippingAddress:
      user.defaultShippingAddress,
},
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


//Protected Routes
export const getProfile = async (req, res) => {
  res.status(200).json(req.user);
};

//Update Profile
export const updateProfile = async (req, res) => {
  try {
    const {
      name,
      phone,
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Update fields

    if (name !== undefined) {
      user.name = name;
    }

    if (phone !== undefined) {
      user.phone = phone;
    }


    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        roles: user.roles,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Request Account Deletion
export const requestAccountDeletion = async (
  req,
  res
) => {
  try {

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.deletionRequested) {
      return res.status(400).json({
        success: false,
        message:
          "Your account is already scheduled for deletion.",
        deletionDate: user.deletionDate,
      });
    }

    const deletionDate = new Date();

    deletionDate.setDate(
      deletionDate.getDate() + 30
    );

    user.deletionRequested = true;
    user.deletionDate = deletionDate;

    await user.save();

    return res.status(200).json({
      success: true,
      message:
        "Your account has been scheduled for deletion. You can restore it anytime within the next 30 days.",
      deletionDate,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

//Restoration of user account within 30 days
export const restoreAccount = async (
  req,
  res
) => {

  try {

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (!user.deletionRequested) {
      return res.status(400).json({
        success: false,
        message:
          "Your account is not scheduled for deletion.",
      });
    }

    user.deletionRequested = false;
    user.deletionDate = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message:
        "Your account has been restored successfully.",
      user,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};
export const changePassword = async (req, res) => {
  try {
    const {
      currentPassword,
      newPassword,
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect.",
      });
    }

    const samePassword = await bcrypt.compare(
      newPassword,
      user.password
    );

    if (samePassword) {
      return res.status(400).json({
        message:
          "New password must be different from the current password.",
      });
    }

    user.password = await bcrypt.hash(
      newPassword,
      10
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Upload Avatar
export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image to upload.",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Delete previous avatar
    if (user.avatar?.public_id) {
      await deleteFromCloudinary(user.avatar.public_id);
    }

    // Upload new avatar
    const uploadedImage = await uploadToCloudinary(
      req.file.buffer,
      "lapverse/users"
    );

    user.avatar = {
      url: uploadedImage.url,
      public_id: uploadedImage.public_id,
    };

    await user.save();

    res.status(200).json({
      success: true,
      message: "Avatar updated successfully.",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        roles: user.roles,
        defaultShippingAddress:
          user.defaultShippingAddress,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//To Remove an avatar
export const removeAvatar = async (
  req,
  res
) => {
  try {

    const user =
      await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.avatar.public_id) {
      await deleteFromCloudinary(
        user.avatar.public_id
      );
    }

    user.avatar = {
      url: "",
      public_id: "",
    };

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Avatar removed successfully.",
      user,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get User Addresses
export const getAddresses = async (
  req,
  res
) => {
  try {

    const user = await User.findById(
      req.user._id
    ).select("addresses");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      addresses: user.addresses,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Add Address
export const addAddress = async (
  req,
  res
) => {
  try {

    const {
      fullName,
      phone,
      label,
      country,
      city,
      area,
      postalCode,
      addressLine,
    } = req.body;

    const user = await User.findById(
      req.user._id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const address = {
      fullName,
      phone,
      label,
      country,
      city,
      area,
      postalCode,
      addressLine,

      // First address becomes default
      isDefault:
        user.addresses.length === 0,
    };

    if (user.addresses.length >= 10) {
  return res.status(400).json({
    success: false,
    message: "You can save a maximum of 10 addresses.",
  });
}

    user.addresses.push(address);

    await user.save();

    res.status(201).json({
      success: true,
      message:
        "Address added successfully.",
      addresses: user.addresses,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
console.log(req.body);
  }
};

// Update Address
export const updateAddress = async (
  req,
  res
) => {
  try {

    const user = await User.findById(
      req.user._id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const address =
      user.addresses.id(req.params.id);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found.",
      });
    }

    address.label =
  req.body.label ??
  address.label;
  
    address.fullName =
      req.body.fullName ??
      address.fullName;

    address.phone =
      req.body.phone ??
      address.phone;

    address.country =
      req.body.country ??
      address.country;

    address.city =
      req.body.city ??
      address.city;

    address.area =
      req.body.area ??
      address.area;

    address.postalCode =
      req.body.postalCode ??
      address.postalCode;

    address.addressLine =
      req.body.addressLine ??
      address.addressLine;

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Address updated successfully.",
      addresses: user.addresses,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Delete Address
export const deleteAddress = async (
  req,
  res
) => {
  try {

    const user = await User.findById(
      req.user._id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const address =
      user.addresses.id(req.params.id);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found.",
      });
    }

    const wasDefault =
      address.isDefault;

user.addresses.pull(req.params.id);
    // If default was deleted,
    // make first remaining address default

    if (
      wasDefault &&
      user.addresses.length > 0
    ) {
      user.addresses[0].isDefault = true;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Address deleted successfully.",
      addresses: user.addresses,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Set Default Address
export const setDefaultAddress = async (
  req,
  res
) => {
  try {

    const user = await User.findById(
      req.user._id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const address =
      user.addresses.id(req.params.id);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found.",
      });
    }

    user.addresses.forEach(
      (item) => {
        item.isDefault = false;
      }
    );

    address.isDefault = true;

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Default address updated.",
      addresses: user.addresses,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};