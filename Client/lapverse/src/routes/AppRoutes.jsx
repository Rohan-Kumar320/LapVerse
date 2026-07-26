import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import ScrollToTop from "../components/common/ScrollToTop";
import PublicRoute from "./PublicRoute";
import Logout from "../pages/Logout";
import Wishlist from "../pages/Wishlist";
import ProtectedRoute from "./ProtectedRoute";
import Cart from "../pages/Cart";
import OrderSuccess from "../components/orders/OrderSuccess";
import Orders from "../pages/Orders";
import OrderDetails from "../components/orders/OrderDetails";
import Checkout from "../pages/Checkout";
import Profile from "../pages/Profile";
import SellerProtectedRoute from "../seller/routes/SellerProtectedRoute";
import SellerLayout from "../seller/layout/SellerLayout";
import Dashboard from "../seller/pages/Dashboard";
import AddProduct from "../seller/pages/AddProduct";
import SellerProducts from "../seller/pages/SellerProducts";
import SellerProductDetails from "../seller/pages/SellerProductDetails";
import EditProduct from "../seller/pages/EditProduct";

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
  path="/wishlist"
  element={
    <ProtectedRoute>
      <Wishlist />
    </ProtectedRoute>
  }
/>
<Route
  path="/cart"
  element={
    <ProtectedRoute>
      <Cart />
    </ProtectedRoute>
  }
/>
<Route
  path="/checkout"
  element={
    <ProtectedRoute>
      <Checkout />
    </ProtectedRoute>
  }
/>
<Route
  path="/order-success"
  element={
    <ProtectedRoute>
      <OrderSuccess />
    </ProtectedRoute>
  }
/>

<Route
  path="/orders"
  element={
    <ProtectedRoute>
      <Orders />
    </ProtectedRoute>
  }
/>

<Route
  path="/orders/:id"
  element={
    <ProtectedRoute>
      <OrderDetails />
    </ProtectedRoute>
  }
/>
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
        <Route path="/logout" element={<Logout />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        <Route
  path="/seller"
  element={
    <SellerProtectedRoute>
      <SellerLayout />
    </SellerProtectedRoute>
  }
>
  <Route index element={<Dashboard />} />
  <Route path="products" element={<SellerProducts />} />
  <Route
    path="products/:id"
    element={<SellerProductDetails />}
/>
  <Route path="add-product" element={<AddProduct />} />
      <Route path="products/:id/edit" element={<EditProduct />} />

  {/* <Route path="orders" element={<Orders />} /> */}
  {/* <Route path="reviews" element={<Reviews />} /> */}
  {/* <Route path="analytics" element={<Analytics />} /> */}
  {/* <Route path="settings" element={<SellerSettings />} /> */}
</Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
