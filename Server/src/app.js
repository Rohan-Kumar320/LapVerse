import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use(errorHandler);

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "Lapverse API is running..." });
});

export default app;