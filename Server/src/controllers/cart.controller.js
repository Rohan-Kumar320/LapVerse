import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

//Add to Cart
export const addToCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { quantity = 1 } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.stock <= 0) {
  return res.status(400).json({
    success: false,
    message: "This product is out of stock.",
  });
}

    let cartItem = await Cart.findOne({
      user: req.user._id,
      product: productId,
    });

if (cartItem) {
  if (cartItem.quantity >= product.stock) {
    return res.status(400).json({
      success: false,
      message: `Only ${product.stock} item(s) available in stock.`,
    });
  }

  cartItem.quantity += quantity;
  await cartItem.save();
} else {
  if (product.stock < 1) {
    return res.status(400).json({
      success: false,
      message: "Product is out of stock.",
    });
  }

  cartItem = await Cart.create({
    user: req.user._id,
    product: productId,
    quantity,
  });
}
    res.status(200).json({
      success: true,
      message: "Product added to cart.",
      cartItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Read The Cart Items with Subtotal, Quantity etc
export const getMyCart = async (req, res) => {
  try {
    const cart = await Cart.find({
      user: req.user._id,
    }).populate({
      path: "product",
      populate: {
        path: "seller",
        select: "name email avatar",
      },
    });

    let totalItems = 0;
    let subtotal = 0;
    let discount = 0;

cart.forEach((item) => {
  if (!item.product) return;

  totalItems += item.quantity;

  const price = item.product.price;
  const itemDiscount = item.product.discount || 0;

  subtotal += price * item.quantity;

  discount +=
    (price * itemDiscount * item.quantity) / 100;

  const discountedPrice =
    price - (price * itemDiscount) / 100;

  item._doc.itemTotal =
    discountedPrice * item.quantity;
});
    const total = subtotal - discount;

    res.status(200).json({
      success: true,
      totalItems,
      subtotal,
      discount,
      total,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Update the Cart Quantity
export const updateCartQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;

    const product = await Product.findById(req.params.productId);

if (!product) {
  return res.status(404).json({
    success: false,
    message: "Product not found.",
  });
}

if (quantity > product.stock) {
  return res.status(400).json({
    success: false,
    message: `Only ${product.stock} item(s) available in stock.`,
  });
}

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1.",
      });
    }

    const cartItem = await Cart.findOne({
      user: req.user._id,
      product: req.params.productId,
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart.",
      });
    }

    cartItem.quantity = quantity;

    await cartItem.save();

    res.status(200).json({
      success: true,
      message: "Cart updated successfully.",
      cartItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Remove From Cart
export const removeFromCart = async (req, res) => {
  try {
    const cartItem = await Cart.findOne({
      user: req.user._id,
      product: req.params.productId,
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart.",
      });
    }

    await cartItem.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product removed from cart.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//For Completely Empting the Cart
export const clearCart = async (req, res) => {
  try {
    await Cart.deleteMany({
      user: req.user._id,
    });

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};