import Wishlist from "../models/Wishlist.js";
import Product from "../models/Product.js";

//Add To WishList
export const addToWishlist = async (req, res) => {
  try {
    const productId = req.params.productId;

    // Check if product exists
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if already in wishlist
    const existingItem = await Wishlist.findOne({
      user: req.user._id,
      product: productId,
    });

    if (existingItem) {
      return res.status(400).json({
        success: false,
        message: "Product already exists in wishlist.",
      });
    }

    const wishlistItem = await Wishlist.create({
      user: req.user._id,
      product: productId,
    });

    res.status(201).json({
      success: true,
      message: "Product added to wishlist.",
      wishlistItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Read My Wishlist, Authorize
export const getMyWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({
      user: req.user._id,
    })
      .populate({
        path: "product",
        populate: {
          path: "seller",
          select: "name email avatar",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: wishlist.length,
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Remove Product From Wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const wishlistItem = await Wishlist.findOne({
      user: req.user._id,
      product: req.params.productId,
    });

    if (!wishlistItem) {
      return res.status(404).json({
        success: false,
        message: "Product not found in wishlist.",
      });
    }

    await wishlistItem.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};