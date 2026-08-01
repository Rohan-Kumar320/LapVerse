import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getSellerOrders } from "../../services/sellerOrderService";
import OrderStatistics from "../components/SellerOrders/OrderStatistics";
import OrderFilters from "../components/SellerOrders/OrderFilters";
import OrderCard from "../components/SellerOrders/OrderCard";
import OrderDetailsModal from "../components/SellerOrders/OrderDetailsModal";
import { updateOrderStatus } from "../../services/orderService";


const SellerOrders = () => {

  const [loading, setLoading] = useState(true);

  const [orders, setOrders] = useState([]);

  const [search, setSearch] =
  useState("");

const [statusFilter,
setStatusFilter] =
  useState("All");

  const [selectedOrder, setSelectedOrder] =
  useState(null);

const [showOrderModal, setShowOrderModal] =
  useState(false);

const filteredOrders = orders.filter((order) => {

  const matchesSearch =

    order.user?.name
      ?.toLowerCase()
      .includes(search.toLowerCase())

    ||

    order.user?.email
      ?.toLowerCase()
      .includes(search.toLowerCase())

    ||

    order._id
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesStatus =

    statusFilter === "All"

    ||

    order.status === statusFilter;

  return matchesSearch && matchesStatus;

});
  useEffect(() => {

    loadOrders();

  }, []);

  //------------------------------------

  const loadOrders = async () => {

    try {

      const response =
        await getSellerOrders();

      setOrders(response.orders);

    }

    catch (error) {

      toast.error(
        "Unable to load orders."
      );

    }

    finally {

      setLoading(false);

    }

  };

  //------------------------------------

  if (loading) {

    return (
      <div className="p-10">
        Loading...
      </div>
    );

  }

  const handleView = (order) => {

  setSelectedOrder(order);

  setShowOrderModal(true);

};

const handleUpdateStatus = async (order, status) => {
  try {
    const response = await updateOrderStatus(
      order._id,
      status
    );

    toast.success(response.message);

    setOrders((prev) =>
      prev.map((item) =>
        item._id === order._id
          ? { ...item, status }
          : item
      )
    );

    setSelectedOrder((prev) =>
      prev
        ? { ...prev, status }
        : null
    );

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Unable to update order status."
    );
  }
};
  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">

          Seller Orders

        </h1>

        <p className="mt-2 text-text-secondary">

          Manage customer orders.

        </p>

      </div>

<OrderStatistics
    orders={orders}
/>

<OrderFilters

    search={search}

    setSearch={setSearch}

    statusFilter={statusFilter}

    setStatusFilter={setStatusFilter}

/>

<div
  className="
  grid
  gap-6
  lg:grid-cols-2
  "
>

  {filteredOrders.map((order)=>(

    <OrderCard

      key={order._id}

      order={order}

      onView={handleView}

      onUpdateStatus={handleUpdateStatus}

    />

  ))}

  <OrderDetailsModal

    order={selectedOrder}

    isOpen={showOrderModal}

    onClose={() => {

        setShowOrderModal(false);

        setSelectedOrder(null);

    }}

    onUpdateStatus={handleUpdateStatus}

/>

</div>

    </div>

  );

};

export default SellerOrders;