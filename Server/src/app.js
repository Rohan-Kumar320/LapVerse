import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import sellerRoutes
from "./routes/seller.routes.js";
import sellerAnalyticsRoutes from "./routes/sellerAnalytics.routes.js";
import sellerDashboardRoutes from "./routes/sellerDashboardRoutes.routes.js";
import adminRoutes from "./routes/admin.routes.js"
import errorHandler from "./middleware/error.middleware.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.use(
  "/api/seller",
  sellerRoutes
);
app.use(
    "/api/seller/dashboard",
    sellerDashboardRoutes
);
app.use("/api/seller/analytics", sellerAnalyticsRoutes);
app.use(
  "/api/admin",
  adminRoutes
);


app.use(errorHandler);

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "Lapverse API is running..." });
});

export default app;