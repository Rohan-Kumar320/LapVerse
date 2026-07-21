import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import { ReviewProvider } from "./context/ReviewContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <AuthProvider>
    <WishlistProvider>
      <CartProvider>
        <OrderProvider>
          <ReviewProvider>
    <App />
          </ReviewProvider>
        </OrderProvider>
      </CartProvider>
    </WishlistProvider>
  </AuthProvider>
       <ToastContainer
        position="top-right"
        autoClose={2500}
        newestOnTop
        theme="dark"
        />

  </BrowserRouter>
);