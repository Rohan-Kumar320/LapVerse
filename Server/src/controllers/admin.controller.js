import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";
import SellerApplication from "../models/SellerApplication.js";

export const getAdminDashboard = async (req, res) => {
  try {

    const totalUsers = await User.countDocuments({
      roles: "user",
    });

    const totalSellers = await User.countDocuments({
      roles: "seller",
    });

    const totalAdmins = await User.countDocuments({
      roles: "admin",
    });

    const totalProducts =
      await Product.countDocuments();

    const totalOrders =
      await Order.countDocuments();

    const pendingOrders =
      await Order.countDocuments({
        status: "Pending",
      });

    const deliveredOrders =
      await Order.countDocuments({
        status: "Delivered",
      });

    const cancelledOrders =
      await Order.countDocuments({
        status: "Cancelled",
      });

    const totalRevenue = await Order.aggregate([
      {
        $match: {
          status: "Delivered",
        },
      },
      {
        $group: {
          _id: null,
          revenue: {
            $sum: "$total",
          },
        },
      },
    ]);

    const recentOrders = await Order.find()
  .sort({ createdAt: -1 })
  .limit(5)
  .populate("user", "name email");

  const recentUsers = await User.find()
  .sort({ createdAt: -1 })
  .limit(5)
  .select("name email avatar roles createdAt");

  const lowStockProducts = await Product.find({
  stock: {
    $lte: 5,
  },
})
  .populate("seller", "name")
  .limit(5);

  const revenueChart = await Order.aggregate([
  {
    $match: {
      status: "Delivered",
    },
  },

  {
    $group: {

      _id: {

        $dateToString: {
          format: "%Y-%m-%d",
          date: "$createdAt",
        },

      },

      revenue: {
        $sum: "$total",
      },

    },

  },

  {
    $sort: {
      _id: 1,
    },
  },

  {
    $limit: 7,
  },

]);

const confirmedOrders =
await Order.countDocuments({
  status: "Confirmed",
});

const shippedOrders =
await Order.countDocuments({
  status: "Shipped",
});

const deletionRequests =
await User.countDocuments({

    deletionRequested: true,

});

    return res.json({

      success: true,

      overview: {

        totalUsers,

        totalSellers,

        totalAdmins,

        totalProducts,

        totalOrders,

        pendingOrders,

        deliveredOrders,

        cancelledOrders,

        totalRevenue:
          totalRevenue.length > 0
            ? totalRevenue[0].revenue
            : 0,

      },

      

  recentUsers,

  lowStockProducts,

  revenueChart,

  recentOrders,

  deletionRequests,

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }
};

export const adminLogin = async (req, res) => {

    try {

        const {
            email,
            password,
        } = req.body;

        const admin = await User.findOne({
            email,
        });

        if (!admin) {

            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });

        }

        if (!admin.roles.includes("admin")) {

            return res.status(403).json({
                success: false,
                message: "You are not authorized as an administrator.",
            });

        }

        const isMatch =
            await bcrypt.compare(
                password,
                admin.password
            );

        if (!isMatch) {

            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });

        }

        const token = jwt.sign(

            {
                id: admin._id,
                type: "admin",
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d",
            }

        );

        return res.json({

            success: true,

            token,

            admin: {

                _id: admin._id,

                name: admin.name,

                email: admin.email,

                avatar: admin.avatar,

                roles: admin.roles,

            },

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

export const getUsers = async (req, res) => {

  try {

    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 10;

    const skip =
      (page - 1) * limit;

    const search =
      req.query.search || "";

    const role =
      req.query.role || "";

    const query = {};

    if (search) {

      query.$or = [

        {
          name: {
            $regex: search,
            $options: "i",
          },
        },

        {
          email: {
            $regex: search,
            $options: "i",
          },
        },

      ];

    }

    if (role) {

      query.roles = role;

    }

    const users =
      await User.find(query)

        .sort({
          createdAt: -1,
        })

        .skip(skip)

        .limit(limit)

        .select("-password -__v");

    const total =
      await User.countDocuments(query);

    // ---------- Stats ----------

    const totalUsers =
      await User.countDocuments({
        roles: "user",
      });

    const totalSellers =
      await User.countDocuments({
        roles: "seller",
      });

    const totalAdmins =
      await User.countDocuments({
        roles: "admin",
      });

    const deletionRequests =
      await User.countDocuments({
        deletionRequested: true,
      });

    return res.json({

      success: true,

      users,

      stats: {

        totalUsers,

        totalSellers,

        totalAdmins,

        deletionRequests,

      },

      pagination: {

        total,

        page,

        pages: Math.ceil(
          total / limit
        ),

      },

    });

  }

  catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

export const getUserDetails = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({

                success:false,

                message:"User not found",

            });

        }

        return res.json({

            success:true,

            user,

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message,

        });

    }

};

const uploadAvatar = (buffer) => {

  return new Promise((resolve, reject) => {

    const stream = cloudinary.uploader.upload_stream(

      {
        folder: "LapVerse/users",
      },

      (error, result) => {

        if (result) resolve(result);

        else reject(error);

      }

    );

    streamifier

      .createReadStream(buffer)

      .pipe(stream);

  });

};

export const updateUser = async (req, res) => {

  try {

    const {

      name,

      phone,

      roles,

      accountStatus,

      sellerApprovalStatus,

      suspension

    } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {

      return res.status(404).json({

        success: false,

        message: "User not found",

      });

    }
if (accountStatus === "Suspended") {

  if (!suspension?.reason) {

    return res.status(400).json({

      success: false,

      message: "Suspension reason is required.",

    });

  }

  if (!suspension?.reviewDate) {

    return res.status(400).json({

      success: false,

      message: "Review date is required.",

    });

  }

}

if (name !== undefined)
      user.name = name;

    if (phone !== undefined)
      user.phone = phone;

    if (roles !== undefined)
      user.roles = roles;

if (accountStatus !== undefined) {

  user.accountStatus = accountStatus;

  if (accountStatus === "Suspended") {

    user.suspension = {

      reason: suspension?.reason,

      note: suspension?.note,

      reviewDate: suspension?.reviewDate,

      suspendedBy: req.user._id,

      suspendedAt: new Date(),

      isAppealed: false,

    };

  }

  if (accountStatus === "Active") {

    user.suspension = undefined;

  }

}
    if (sellerApprovalStatus !== undefined)
      user.sellerApprovalStatus = sellerApprovalStatus;

    await user.save();

    res.json({

      success: true,

      message: "User updated successfully.",

      user,

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

export const updateUserAvatar = async (req, res) => {

  try {

    const user = await User.findById(

      req.params.id

    );

    if (!user) {

      return res.status(404).json({

        success:false,

        message:"User not found."

      });

    }

    if (!req.file) {

      return res.status(400).json({

        success:false,

        message:"Please upload an image."

      });

    }

    if (user.avatar?.public_id) {

      await cloudinary.uploader.destroy(

        user.avatar.public_id

      );

    }

    const uploaded = await uploadAvatar(

      req.file.buffer

    );

    user.avatar = {

      url: uploaded.secure_url,

      public_id: uploaded.public_id,

    };

    await user.save();

    return res.json({

      success:true,

      user,

    });

  }

  catch(error){

    return res.status(500).json({

      success:false,

      message:error.message,

    });

  }

};

export const suspendUser = async (req, res) => {

    const {

        reason,

        note,

        reviewDate

    } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {

        return res.status(404).json({

            success:false,

            message:"User not found"

        });

    }

    user.accountStatus = "Suspended";

    user.suspension = {

        reason,

        note,

        reviewDate,

        suspendedBy:req.admin._id,

        suspendedAt:new Date(),

    };

    await user.save();

    res.json({

        success:true,

        message:"User suspended.",

        user,

    });

};

export const reactivateUser = async (req,res)=>{

    const user = await User.findById(req.params.id);

    if(!user){

        return res.status(404).json({

            success:false,

            message:"User not found"

        });

    }

    user.accountStatus = "Active";

user.suspension = {

    reason: null,

    note: null,

    reviewDate: null,

    suspendedAt: null,

    suspendedBy: null,

};
    await user.save();

    res.json({

        success:true,

        message:"User reactivated.",

        user

    });

};

export const deleteUser = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found.",

            });

        }

        user.isDeleted = true;

        user.deletionDate = new Date();   // ✅ Correct field

        user.deletedBy = req.admin._id;

        user.accountStatus = "Deleted";

        await user.save();

        return res.status(200).json({

            success: true,

            message: "User deleted successfully.",

            user,

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

export const restoreUser = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found.",

            });

        }

        user.isDeleted = false;

        user.deletionDate = null;

        user.deletedBy = null;

        user.accountStatus = "Active";

        await user.save();

        return res.json({

            success: true,

            message: "User restored successfully.",

            user,

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

export const getSellers = async (req, res) => {

  try {

    const {
  search = "",
  city = "",
  accountStatus = "",
  sellerStatus = "approved", // NEW
  page = 1,
  limit = 10,
} = req.query;

    const currentPage = Number(page);

const pageSize = Number(limit);

const skip = (currentPage - 1) * pageSize;

    const query = {};

    if (search) {

      query.$or = [

        {
          name: {
            $regex: search,
            $options: "i",
          },
        },

        {
          email: {
            $regex: search,
            $options: "i",
          },
        },

      ];

    }

    if (accountStatus) {

      query.accountStatus = accountStatus;

    }

    // -----------------------------
    // Seller Application Filter
    // -----------------------------

    const applicationFilter = {};

if (sellerStatus && sellerStatus !== "all") {

    applicationFilter.status = sellerStatus;

}
    if (city) {

      applicationFilter.city = city;

    }

    const applications = await SellerApplication.find(applicationFilter)
      .populate("user", "_id");

    const sellerIds = applications.map(
      application => application.user._id
    );

    query._id = {
      $in: sellerIds,
    };

    // -----------------------------
    // Sellers
    // -----------------------------

const total = await User.countDocuments(query);

const sellers = await User.find(query)

    .select("-password -__v")

    .sort({

        createdAt: -1,

    })

    .skip(skip)

    .limit(pageSize);
    // -----------------------------
    // Seller Map
    // -----------------------------

    const sellerMap = new Map();

    applications.forEach((application) => {

      sellerMap.set(

        application.user._id.toString(),

        application

      );

    });

    // -----------------------------
    // Build Response
    // -----------------------------

    const result = await Promise.all(

      sellers.map(async (seller) => {

        const application =
          sellerMap.get(
            seller._id.toString()
          ) || null;

        const products = await Product.find({

          seller: seller._id,

        });

        const totalProducts =
          products.length;

        const activeProducts =
          products.filter(

            product =>
              product.status === "Available"

          ).length;

        const orders =
          await Order.countDocuments({

            seller: seller._id,

          });

        const completedOrders =
          await Order.countDocuments({

            seller: seller._id,

            status: "Delivered",

          });

        const totalReviews =
          products.reduce(

            (total, product) =>

              total +
              (product.numReviews || 0),

            0

          );

        const rating =

          totalProducts > 0

            ? (

                products.reduce(

                  (sum, product) =>

                    sum +
                    (product.averageRating || 0),

                  0

                ) / totalProducts

              ).toFixed(1)

            : 0;

        return {

          ...seller.toObject(),

          application,

          stats: {

            products: totalProducts,

            activeProducts,

            orders,

            completedOrders,

            reviews: totalReviews,

            rating,

          },

        };

      })

    );

return res.json({

    success: true,

    sellers: result,

    pagination: {

        total,

        page: currentPage,

        pages: Math.ceil(total / pageSize),

        limit: pageSize,

    },

});
  }

  catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

export const getSellerCities = async (req, res) => {

    try {

        const cities = await SellerApplication.distinct("city", {

            status: "approved",

        });

        cities.sort();

        return res.json({

            success: true,

            cities,

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};