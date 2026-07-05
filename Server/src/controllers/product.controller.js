import Product from "../models/Product.js";
import { uploadToCloudinary } from "../services/cloudinary.service.js";

//Create Products

export const createProduct = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please upload at least one image.",
      });
    }

    const uploadedImages = [];

    for (const file of req.files) {
      const image = await uploadToCloudinary(file.buffer);

      uploadedImages.push({
        url: image.url,
        public_id: image.public_id,
      });
    }

    const product = await Product.create({
      ...req.body,
      images: uploadedImages,
      seller: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });

  
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Get Multiple Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate(
      "seller",
      "name email avatar"
    );

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Get Single Product
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "seller",
      "name email avatar"
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Update Products
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Only seller or admin can update
    if (
      product.seller.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
        returnDocument: "after",
        runValidators: true,
    }
    );
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (
      product.seller.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
