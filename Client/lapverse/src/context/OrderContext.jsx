import {
  createContext,
  useContext,
  useState,
} from "react";

import {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
} from "../services/orderService";

import toast from "react-hot-toast";

const OrderContext = createContext();

export const OrderProvider = ({
  children,
}) => {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] =
    useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const data = await getMyOrders();

      setOrders(data.orders || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const placeOrder = async (
    orderData
  ) => {
    try {
      const data =
        await createOrder(orderData);

      toast.success(data.message);

      return {
        success: true,
        order: data.order,
      };
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to place order."
      );

      return {
        success: false,
      };
    }
  };

  const fetchOrder = async (id) => {
    try {
      const data =
        await getOrderById(id);

      return data.order;
    } catch (error) {
      console.error(error);

      return null;
    }
  };

  const cancelUserOrder  = async (id) => {
    try {
      const data =
        await cancelOrder(id);

      toast.success(data.message);

      await fetchOrders();

      return {
        success: true,
      };
    } catch (error) {
      toast.error(
        error.response?.data?.message
      );

      return {
        success: false,
      };
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        fetchOrders,
        fetchOrder,
        placeOrder,
        cancelUserOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () =>
  useContext(OrderContext);