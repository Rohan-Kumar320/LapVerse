import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

//Order Creation
export const createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    const cart = await Cart.find({
      user: req.user._id,
    }).populate("product");

    if (cart.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty.",
      });
    }

    //----------------------------------------------------
    // Group cart items by seller
    //----------------------------------------------------

    const sellerOrders = {};

    for (const cartItem of cart) {
      if (!cartItem.product) continue;

      if (cartItem.product.stock < cartItem.quantity) {
        return res.status(400).json({
          success: false,
          message: `${cartItem.product.title} has only ${cartItem.product.stock} item(s) left in stock.`,
        });
      }

      const sellerId = cartItem.product.seller.toString();

      if (!sellerOrders[sellerId]) {
        sellerOrders[sellerId] = {
          seller: sellerId,
          items: [],
          subtotal: 0,
          discount: 0,
        };
      }

      sellerOrders[sellerId].items.push({
        product: cartItem.product._id,
        seller: sellerId,
        quantity: cartItem.quantity,
        price: cartItem.product.price,
      });

      sellerOrders[sellerId].subtotal +=
        cartItem.product.price * cartItem.quantity;

      sellerOrders[sellerId].discount +=
        (
          cartItem.product.price *
          (cartItem.product.discount || 0) *
          cartItem.quantity
        ) / 100;
    }

    //----------------------------------------------------
    // Create one order for every seller
    //----------------------------------------------------

    const createdOrders = [];

    for (const sellerId in sellerOrders) {
      const currentOrder = sellerOrders[sellerId];

      const order = await Order.create({
        user: req.user._id,
        seller: sellerId,
        items: currentOrder.items,
        subtotal: currentOrder.subtotal,
        discount: currentOrder.discount,
        total:
          currentOrder.subtotal -
          currentOrder.discount,
        paymentMethod,
        shippingAddress,
      });

      createdOrders.push(order);
    }

    //----------------------------------------------------
    // Reduce Stock
    //----------------------------------------------------

    for (const cartItem of cart) {
      if (!cartItem.product) continue;

      cartItem.product.stock -= cartItem.quantity;

      await cartItem.product.save();
    }

    //----------------------------------------------------
    // Clear Cart
    //----------------------------------------------------

    await Cart.deleteMany({
      user: req.user._id,
    });

    //----------------------------------------------------

    res.status(201).json({
      success: true,
      message: "Order(s) placed successfully.",
      count: createdOrders.length,
      orders: createdOrders,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


//Retrieving the Orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Specific Order with Order ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.product");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Owner or Admin only
// Buyer OR Seller OR Admin
if (
  order.user._id.toString() !== req.user._id.toString() &&
  order.seller.toString() !== req.user._id.toString() &&
  req.user.role !== "admin"
) {
  return res.status(403).json({
    success: false,
    message: "Unauthorized",
  });
}
     {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Cancel Order
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    // Owner or Admin
// Buyer OR Seller OR Admin
if (
  order.user.toString() !== req.user._id.toString() &&
  order.seller.toString() !== req.user._id.toString() &&
  req.user.role !== "admin"
) {
  return res.status(403).json({
    success: false,
    message: "Unauthorized",
  });
}    {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

if (
  !["Pending", "Confirmed"].includes(order.status)
) {
  return res.status(400).json({
    success: false,
    message:
      "Only pending or confirmed orders can be cancelled.",
  });
}
    order.status = "Cancelled";

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully.",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Items Only Seller could see from the order
export const getSellerOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      seller: req.user._id,
    })
      .populate("user", "name email")
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

//Get All Order with Admin Only Access
export const getAllOrders = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Update Order Status by Admin
export const updateOrderStatus = async (req, res) => {
  console.log("UPDATE STATUS HIT");
  try {

    const { status } = req.body;
console.log(req.body);
    let order;

    // Admin can update any order
    if (req.user.role === "admin") {

      order = await Order.findById(req.params.id);

    }

    // Seller can update only their own orders
    else {

      order = await Order.findOne({
        _id: req.params.id,
        seller: req.user._id,
      });

    }

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    const allowedTransitions = {
      Pending: ["Confirmed"],
      Confirmed: ["Shipped"],
      Shipped: ["Delivered"],
      Delivered: [],
      Cancelled: [],
    };

    console.log(order.status);
console.log(status);

    if (!allowedTransitions[order.status].includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Cannot change order status from ${order.status} to ${status}.`,
      });
    }

    order.status = status;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully.",
      order,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};