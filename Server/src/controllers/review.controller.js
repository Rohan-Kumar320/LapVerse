import Review from "../models/Review.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

//For Calculating Product Rating Automatically / Helper
const updateProductRating = async (productId) => {
  const reviews = await Review.find({ product: productId });

  const numReviews = reviews.length;

  const averageRating =
    numReviews === 0
      ? 0
      : reviews.reduce((sum, review) => sum + review.rating, 0) / numReviews;

  await Product.findByIdAndUpdate(productId, {
    averageRating: Number(averageRating.toFixed(1)),
    numReviews,
  });
};

//Create Review
export const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.productId;

    // Check if product exists
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if user already reviewed
    const existingReview = await Review.findOne({
      user: req.user._id,
      product: productId,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product. To Edit Please go to your profile",
      });
    }

    // Create review
    const review = await Review.create({
      rating,
      comment,
      user: req.user._id,
      product: productId,
    });

    await updateProductRating(productId);

    res.status(201).json({
      success: true,
      message: "Review added successfully.",
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Update Reviews
export const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    // Only review owner or admin can update
    if (
      review.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    review.rating = rating;
    review.comment = comment;

    await review.save();

    // Recalculate average rating
    const reviews = await Review.find({
      product: review.product,
    });

    const averageRating =
      reviews.reduce((sum, item) => sum + item.rating, 0) /
      reviews.length;

    await Product.findByIdAndUpdate(review.product, {
      averageRating,
    });

    res.status(200).json({
      success: true,
      message: "Review updated successfully.",
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Read Product Review
export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
    })
      .populate("user", "name avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// Can User Review Product

export const canReviewProduct = async (req, res) => {

  try {

    // const productId = req.params.productId;

    // const userId = req.user._id;

    // const existingReview = await Review.findOne({

    //   user: userId,

    //   product: productId,

    // });

    // if (existingReview) {

    //   return res.status(200).json({

    //     success: true,

    //     canReview: false,

    //     alreadyReviewed: true,

    //     hasPurchased: true,

    //   });

    // }

    // const order = await Order.findOne({

    //   user: userId,

    //   status: "Delivered",

    //   "items.product": productId,

    // });
 const userId = req.user._id;
    const productId = req.params.productId;

const orders = await Order.find({
  user: req.user._id,
}).populate("items.product");

console.log(JSON.stringify(orders, null, 2));

const order = await Order.findOne({
  user: req.user._id,
  status: "Delivered",
  "items.product": productId,
});

console.log("Matched Order:", order);

    if (!order) {

      return res.status(200).json({

        success: true,

        canReview: false,

        alreadyReviewed: false,

        hasPurchased: false,

      });

    }

    res.status(200).json({

      success: true,

      canReview: true,

      alreadyReviewed: false,

      hasPurchased: true,

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

//Delete A Review
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Only review owner or admin can delete
    if (
      review.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const productId = review.product;

    await review.deleteOne();

    await updateProductRating(productId);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Logged In User Reviews
export const getMyReviews = async (req, res) => {
  try {

    const reviews = await Review.find({
      user: req.user._id,
    })
      .populate({
        path: "product",
        select:
          "title images averageRating numReviews",
      })
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};