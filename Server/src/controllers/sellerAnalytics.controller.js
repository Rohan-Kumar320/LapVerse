import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Review from "../models/Review.js";

const getMonthlyRevenue = (orders) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlyRevenue = monthNames.map((month) => ({
    month,
    revenue: 0,
    orders: 0,
  }));

  orders.forEach((order) => {
    if (order.status !== "Delivered") return;

    const monthIndex = new Date(order.createdAt).getMonth();

    monthlyRevenue[monthIndex].revenue += order.total;

    monthlyRevenue[monthIndex].orders++;
  });

  return monthlyRevenue;
};

const getAverageOrderValue = (revenue, orders) => {
  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered",
  );

  if (deliveredOrders.length === 0) return 0;

  return Number((revenue / deliveredOrders.length).toFixed(2));
};

const getCurrentMonthRevenue = (orders) => {
  const now = new Date();

  return orders.reduce((sum, order) => {
    if (order.status !== "Delivered") return sum;

    const orderDate = new Date(order.createdAt);

    if (
      orderDate.getMonth() === now.getMonth() &&
      orderDate.getFullYear() === now.getFullYear()
    ) {
      return sum + order.total;
    }

    return sum;
  }, 0);
};

const getLastMonthRevenue = (orders) => {
  const now = new Date();

  const lastMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;

  const year = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();

  return orders.reduce((sum, order) => {
    if (order.status !== "Delivered") return sum;

    const orderDate = new Date(order.createdAt);

    if (
      orderDate.getMonth() === lastMonth &&
      orderDate.getFullYear() === year
    ) {
      return sum + order.total;
    }

    return sum;
  }, 0);
};

// const getTopProducts = (orders, products) => {

//   const productMap = {};

//   // Initialize every seller product
//   products.forEach((product) => {

//     productMap[product._id.toString()] = {

//       _id: product._id,

//       title: product.title,

//       brand: product.brand,

//       model: product.model,

//       image: product.images?.[0]?.url || null,

//       sold: 0,

//       revenue: 0,

//       rating: product.averageRating || 0,

//       reviews: product.numReviews || 0,

//     };

//   });

//   // Count sales from delivered orders only
//   orders.forEach((order) => {

//     if (order.status !== "Delivered") return;

//     order.items.forEach((item) => {

//       const id = item.product.toString();

//       if (!productMap[id]) return;

//       productMap[id].sold += item.quantity;

//       productMap[id].revenue +=
//         item.price * item.quantity;

//     });

//   });

//   return Object.values(productMap)

//     .sort((a, b) => b.sold - a.sold)

//     .slice(0, 5);

// };

const getRatingDistribution = async (productIds) => {
  const reviews = await Review.find({
    product: {
      $in: productIds,
    },
  });

  const distribution = {
    5: 0,

    4: 0,

    3: 0,

    2: 0,

    1: 0,
  };

  reviews.forEach((review) => {
    distribution[review.rating]++;
  });

  return distribution;
};

const getLowStockProducts = (products) => {
  return products
    .filter((product) => product.stock > 0 && product.stock <= 5)
    .map((product) => ({
      _id: product._id,
      title: product.title,
      brand: product.brand,
      model: product.model,
      stock: product.stock,
      image: product.images?.[0]?.url || null,
    }))
    .sort((a, b) => a.stock - b.stock);
};

const getOutOfStockProducts = (products) => {
  return products
    .filter((product) => product.stock === 0)
    .map((product) => ({
      _id: product._id,
      title: product.title,
      brand: product.brand,
      model: product.model,
      image: product.images?.[0]?.url || null,
    }));
};

const getInventoryValue = (products) => {
  return products.reduce((sum, product) => {
    return sum + product.stock * product.price;
  }, 0);
};

const getPendingRevenue = (orders) => {
  return orders.reduce((sum, order) => {
    if (["Pending", "Confirmed", "Shipped"].includes(order.status)) {
      return sum + order.total;
    }

    return sum;
  }, 0);
};

const getCancelledRevenue = (orders) => {
  return orders.reduce((sum, order) => {
    if (order.status === "Cancelled") {
      return sum + order.total;
    }

    return sum;
  }, 0);
};

const getRevenueGrowth = (currentMonthRevenue, lastMonthRevenue) => {
  if (lastMonthRevenue === 0) {
    return currentMonthRevenue > 0 ? 100 : 0;
  }

  return Number(
    (
      ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue) *
      100
    ).toFixed(1),
  );
};

const getProductPerformance = (orders, products) => {
  const performance = {};

  // Initialize products

  products.forEach((product) => {
    performance[product._id.toString()] = {
      _id: product._id,

      title: product.title,

      brand: product.brand,

      model: product.model,

      image: product.images?.[0]?.url || null,

      price: product.price,

      sold: 0,

      revenue: 0,

      stock: product.stock,

      rating: product.averageRating || 0,

      reviews: product.numReviews || 0,
    };
  });

  // Count delivered sales

  orders.forEach((order) => {
    if (order.status !== "Delivered") return;

    order.items.forEach((item) => {
      const id = item.product.toString();

      if (!performance[id]) return;

      performance[id].sold += item.quantity;

      performance[id].revenue += item.price * item.quantity;
    });
  });

  // Total revenue generated by all products
  const totalProductRevenue = Object.values(performance).reduce(
    (sum, product) => sum + product.revenue,
    0,
  );

  return Object.values(performance)

    .map((product) => ({
      ...product,

      revenuePercentage:
        totalProductRevenue === 0
          ? 0
          : Number(((product.revenue / totalProductRevenue) * 100).toFixed(1)),
    }))

    .sort((a, b) => b.revenue - a.revenue);
};

export const getSellerAnalytics = async (req, res) => {
  try {
    const sellerId = req.user._id;

    const range = req.query.range || "30d";

    const now = new Date();

    let startDate = null;

    switch (range) {
      case "7d":
        startDate = new Date(now);

        startDate.setDate(now.getDate() - 7);

        break;

      case "30d":
        startDate = new Date(now);

        startDate.setDate(now.getDate() - 30);

        break;

      case "90d":
        startDate = new Date(now);

        startDate.setDate(now.getDate() - 90);

        break;

      case "365d":
        startDate = new Date(now);

        startDate.setDate(now.getDate() - 365);

        break;

      default:
        startDate = null;
    }

    //--------------------------------------------------
    // Products
    //--------------------------------------------------

    const products = await Product.find({
      seller: sellerId,
    });

    const productIds = products.map((product) => product._id);

    //--------------------------------------------------
    // Orders
    //--------------------------------------------------

    const orderQuery = {
      seller: sellerId,
    };

    if (startDate) {
      orderQuery.createdAt = {
        $gte: startDate,
      };
    }

    const orders = await Order.find(orderQuery);
    //--------------------------------------------------
    // Revenue
    //--------------------------------------------------

    const revenue = orders.reduce(
      (sum, order) => (order.status === "Delivered" ? sum + order.total : sum),

      0,
    );

    //--------------------------------------------------
    // Products Sold
    //--------------------------------------------------

    const productsSold = orders.reduce(
      (sum, order) =>
        sum +
        order.items.reduce(
          (itemSum, item) => itemSum + item.quantity,

          0,
        ),

      0,
    );

    //--------------------------------------------------
    // Average Rating
    //--------------------------------------------------

    const averageRating =
      products.length === 0
        ? 0
        : products.reduce(
            (sum, product) => sum + (product.averageRating || 0),

            0,
          ) / products.length;

    //--------------------------------------------------
    // Reviews
    //--------------------------------------------------

    const totalReviews = await Review.countDocuments({
      product: {
        $in: productIds,
      },
    });

    //--------------------------------------------------
    // Order Status Count
    //--------------------------------------------------

    const statusCount = {
      Pending: 0,

      Confirmed: 0,

      Shipped: 0,

      Delivered: 0,

      Cancelled: 0,
    };

    orders.forEach((order) => {
      statusCount[order.status]++;
    });

    const monthlyRevenue = getMonthlyRevenue(orders);

    const averageOrderValue = getAverageOrderValue(revenue, orders);

    const currentMonthRevenue = getCurrentMonthRevenue(orders);

    const lastMonthRevenue = getLastMonthRevenue(orders);

    const productPerformance = getProductPerformance(
      orders,

      products,
    );

    const topProducts = productPerformance.slice(0, 5);

    //--------------------------------------------------
    // Business Insights
    //--------------------------------------------------

    const topPerformer = topProducts[0] || null;

    const highestRated =
      [...productPerformance]
        .filter((p) => p.reviews > 0)
        .sort((a, b) => b.rating - a.rating)[0] || null;

    const lowStockCount = productPerformance.filter(
      (p) => p.stock > 0 && p.stock <= 5,
    ).length;

    const outOfStockCount = productPerformance.filter(
      (p) => p.stock === 0,
    ).length;

    const noSalesCount = productPerformance.filter((p) => p.sold === 0).length;

    const ratingDistribution = await getRatingDistribution(productIds);

    const lowStockProducts = getLowStockProducts(products);

    const outOfStockProducts = getOutOfStockProducts(products);

    const inventoryValue = getInventoryValue(products);

    const pendingRevenue = getPendingRevenue(orders);

    const cancelledRevenue = getCancelledRevenue(orders);

    const revenueGrowth = getRevenueGrowth(
      currentMonthRevenue,

      lastMonthRevenue,
    );
    //--------------------------------------------------

    res.status(200).json({
      success: true,

      analytics: {
        revenue,

        totalOrders: orders.length,

        productsSold,

        averageRating: Number(averageRating.toFixed(1)),

        totalProducts: products.length,

        totalReviews,

        statusCount,

        averageOrderValue,

        currentMonthRevenue,

        lastMonthRevenue,

        monthlyRevenue,

        topProducts,
        ratingDistribution,

        inventoryValue,

        lowStockProducts,

        outOfStockProducts,

        pendingRevenue,

        cancelledRevenue,

        revenueGrowth,

        productPerformance,

        businessInsights: {
          topPerformer,

          highestRated,

          lowStockCount,

          outOfStockCount,

          noSalesCount,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

export const getSellerDashboard = async (req, res) => {
  try {
    const sellerId = req.user._id;

    // Seller Products
    const products = await Product.find({
      seller: sellerId,
    });

    // Seller Orders
    const orders = await Order.find({
      seller: sellerId,
    })
      .sort({ createdAt: -1 })
      .populate("user", "name email")
      .populate(
  "items.product",
  "title images price stock"
)

    const deliveredOrders = orders.filter(
      (order) => order.status === "Delivered",
    );

    const pendingOrders = orders.filter((order) => order.status === "Pending");

const confirmedOrders = orders.filter(
    order => order.status === "Confirmed"
);

const shippedOrders = orders.filter(
    order => order.status === "Shipped"
);
    const cancelledOrders = orders.filter(
      (order) => order.status === "Cancelled",
    );
    const totalRevenue = deliveredOrders.reduce(
      (sum, order) => sum + order.total,
      0,
    );
const revenueTrend = {};

deliveredOrders.forEach(order => {

    const date = order.createdAt
        .toISOString()
        .split("T")[0];

    if (!revenueTrend[date]) {

        revenueTrend[date] = 0;

    }

    revenueTrend[date] += order.total;

});

const salesTrend = Object.entries(revenueTrend)
.map(([date,revenue])=>({

    date,

    revenue,

}))
.sort((a,b)=>new Date(a.date)-new Date(b.date));
    const totalCustomers = new Set(
  orders.map(order => order.user.toString())
).size;

const inventory = {

    lowStock: products.filter(
        p=>p.stock>0&&p.stock<=5
    ),

    outOfStock: products.filter(
        p=>p.stock===0
    ),

};
    const lowStockProducts = products.filter(
      (product) => product.stock > 0 && product.stock <= 5,
    ).length;

    const outOfStockProducts = products.filter(
      (product) => product.stock === 0,
    ).length;
    const productSales = {};

    deliveredOrders.forEach((order) => {

      order.items.forEach((item) => {
        const id = item.product._id.toString();
if (!item.product) return;
        if (!productSales[id]) {
          productSales[id] = {
            _id: item.product._id,

            title: item.product.title,

            image: item.product.images?.[0]?.url,

            sold: 0,

            revenue: 0,
          };
        }

        productSales[id].sold += item.quantity;

        productSales[id].revenue += item.price * item.quantity;
      });
    });

    const topProducts = Object.values(productSales)
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 5);

const recentOrders = orders
.slice(0,5)
.map(order=>({

    _id:order._id,

    customer:order.user.name || "Unknown",

    total:order.total,

    status:order.status,

    items:order.items.length,

    createdAt:order.createdAt,

}));
return res.json({
  success: true,

  overview: {
    totalProducts: products.length,
    totalOrders: orders.length,
    pendingOrders: pendingOrders.length,
    confirmedOrders: confirmedOrders.length,
    shippedOrders: shippedOrders.length,
    completedOrders: deliveredOrders.length,
    cancelledOrders: cancelledOrders.length,
    totalRevenue,
    totalCustomers,
    lowStockProducts,
    outOfStockProducts,
  },

  salesTrend,

  recentOrders,

  topProducts,

  inventory,
});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};