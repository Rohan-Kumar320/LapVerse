import Product from "../models/Product.js";
import { uploadToCloudinary, deleteFromCloudinary, uploadMultipleImages } from "../services/cloudinary.service.js";

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
    //Creating Filter Object
    const {
      search,
      brand,
      category,
      condition,
      minPrice,
      maxPrice,
      ram,
      storage,
      gpu,
      processor,
      sort,
      page = 1,
      limit = 12,
    } = req.query;

    const filter = {};

    if (brand) filter.brand = brand;
    if (category) filter.category = category;
    if (condition) filter.condition = condition;
    if (ram) filter.ram = Number(ram);
    if (storage) filter.storage = Number(storage);
    if (gpu) {
      filter.gpu = { $regex: gpu, $options: "i" };
    }

    if (processor) {
      filter.processor = { $regex: processor, $options: "i" };
    }


    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (search) {
      filter.$text = {
        $search: search,
      };
    }

    //Pagination

    const currentPage = Number(page);
    const perPage = Number(limit);
    const skip = (currentPage - 1) * perPage;

    //Sorting

    let sortOption = { createdAt: -1 };

    switch (sort) {
      case "price_asc":
        sortOption = { price: 1 };
        break;

      case "price_desc":
        sortOption = { price: -1 };
        break;

      case "oldest":
        sortOption = { createdAt: 1 };
        break;

      case "newest":
        sortOption = { createdAt: -1 };
        break;
    }

    //Total Products Filtered
    const totalProducts = await Product.countDocuments(filter);

    //Fetch
    const products = await Product.find(filter)
    .populate("seller", "name email avatar")
    .sort(sortOption)
    .skip(skip)
    .limit(perPage);

    //Response
    res.status(200).json({
    success: true,
    count: products.length,
    totalProducts,
    currentPage,
    totalPages: Math.ceil(totalProducts / perPage),
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
        message: "You are not authorized to modify this product.",
      });
    }

    // Parse deleted images
    let deletedImages = [];

    if (req.body.deletedImages) {
      deletedImages = JSON.parse(req.body.deletedImages);
    }

    // Delete images from Cloudinary
    for (const publicId of deletedImages) {
      await deleteFromCloudinary(publicId);
    }

    // Remove deleted images from MongoDB
    product.images = product.images.filter(
      (image) => !deletedImages.includes(image.public_id)
    );

// Check image limit before uploading
    const remainingImages = product.images.length - deletedImages.length;
    const newImageCount = req.files ? req.files.length : 0;

    if (remainingImages + newImageCount > 5) {
      return res.status(400).json({
        success: false,
        message: "A product can have a maximum of 5 images.",
      });
    }

    // Upload new images
    let newImages = [];

    if (req.files && req.files.length > 0) {
      newImages = await uploadMultipleImages(req.files);
    }

    // Merge remaining and newly uploaded images
    const updatedImages = [
      ...product.images,
      ...newImages,
    ];

    // Update product fields
    product.title = req.body.title ?? product.title;
    product.brand = req.body.brand ?? product.brand;
    product.model = req.body.model ?? product.model;
    product.category = req.body.category ?? product.category;
    product.price = req.body.price ?? product.price;
    product.discount = req.body.discount ?? product.discount;
    product.processor = req.body.processor ?? product.processor;
    product.ram = req.body.ram ?? product.ram;
    product.storage = req.body.storage ?? product.storage;
    product.gpu = req.body.gpu ?? product.gpu;
    product.screenSize = req.body.screenSize ?? product.screenSize;
    product.battery = req.body.battery ?? product.battery;
    product.description = req.body.description ?? product.description;
    product.condition = req.body.condition ?? product.condition;

    product.images = updatedImages;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
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

    // Only seller or admin can delete
    if (
      product.seller.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Delete all images from Cloudinary
    for (const image of product.images) {
      await deleteFromCloudinary(image.public_id);
    }

    // Delete product from MongoDB
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