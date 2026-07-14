import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { toast } from "react-toastify";

import {
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} from "../services/cartService";

import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const [cart, setCart] = useState([]);

  const [summary, setSummary] = useState({
    totalItems: 0,
    subtotal: 0,
    discount: 0,
    total: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCart([]);
      setSummary({
        totalItems: 0,
        subtotal: 0,
        discount: 0,
        total: 0,
      });
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    try {
      setLoading(true);

      const data = await getCart();

      setCart(data.cart || []);

      setSummary({
        totalItems: data.totalItems || 0,
        subtotal: data.subtotal || 0,
        discount: data.discount || 0,
        total: data.total || 0,
      });
    } catch (error) {
      console.error(error);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

const addProduct = async (
  productId,
  quantity
) => {
  try {
    const response = await addToCart(
      productId,
      quantity
    );
      await fetchCart();

      return {
        success: true,
        message: response.message,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Unable to add product.",
      };
    }
  };

  const updateQuantity = async (
    productId,
    quantity
  ) => {
    try {
      await updateCartQuantity(
        productId,
        quantity
      );

      await fetchCart();

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message,
      };
    }
  };

  const removeProduct = async (
    productId
  ) => {
    try {
      await removeFromCart(productId);

      await fetchCart();

      toast.success("Product removed from cart.");

      return {
        success: true,
      };
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to remove product."
      );

      return {
        success: false,
        message:
          error.response?.data?.message,
      };
    }
  };

  const clearUserCart = async () => {
    try {
      await clearCart();

      await fetchCart();

      toast.success("Cart emptied.");
    } catch (error) {
      toast.error("Unable to clear cart.");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount: summary.totalItems,
        summary,
        loading,
        addProduct,
        updateQuantity,
        removeProduct,
        clearUserCart,
        refreshCart: fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () =>
  useContext(CartContext);