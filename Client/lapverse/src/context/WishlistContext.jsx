import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../services/wishlistService";

import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    } else {
      setWishlist([]);
    }
  }, [isAuthenticated]);

  const fetchWishlist = async () => {
    try {
      setLoading(true);

      const data = await getWishlist();

      setWishlist(data.wishlist || []);
    } catch (error) {
      console.error(error);

      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  const isWishlisted = (productId) => {
    return wishlist.some((item) => {
      const id =
        item.product?._id ||
        item.product ||
        item._id;

      return id === productId;
    });
  };

  const toggleWishlist = async (productId) => {
    try {
      const exists = isWishlisted(productId);

      if (exists) {
        await removeFromWishlist(productId);

        setWishlist((prev) =>
          prev.filter((item) => {
            const id =
              item.product?._id ||
              item.product ||
              item._id;

            return id !== productId;
          })
        );

        return {
          success: true,
          action: "removed",
        };
      }

      const response = await addToWishlist(productId);

      setWishlist((prev) => [
        ...prev,
        response.wishlistItem,
      ]);

      await fetchWishlist();

      return {
        success: true,
        action: "added",
      };
    } catch (error) {
      console.error(error);

      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Something went wrong.",
      };
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        loading,
        isWishlisted,
        toggleWishlist,
        refreshWishlist: fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);