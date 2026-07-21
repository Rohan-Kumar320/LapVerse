import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiPackage,
  FiCalendar,
  FiArrowRight,
  FiXCircle,
  FiSearch,
  FiShoppingCart,
} from "react-icons/fi";



import { useOrders } from "../context/OrderContext";
import CancelOrderModal from "../components/orders/CancelOrderModel";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";





const FILTERS = [
  "All",
  "Pending",
  "Confirmed",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const Orders = () => {

  const [showCancelModal, setShowCancelModal] =
  useState(false);

const [selectedOrder, setSelectedOrder] =
  useState(null);

const [cancelLoading, setCancelLoading] =
  useState(false);

const { addProduct } = useCart();

const navigate = useNavigate();

  const {
    orders,
    loading,
    fetchOrders,
    cancelUserOrder,
  } = useOrders();

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("All");

  useEffect(() => {

    fetchOrders();

  }, []);

  const filteredOrders =
    useMemo(() => {

      return orders.filter((order) => {

        const matchesStatus =
          filter === "All"
            ? true
            : order.status === filter;

        const matchesSearch =
          order._id
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        return (
          matchesStatus &&
          matchesSearch
        );

      });

    }, [
      orders,
      filter,
      search,
    ]);

const handleCancel = (order) => {

  setSelectedOrder(order);

  setShowCancelModal(true);

};

const confirmCancelOrder = async () => {

  if (!selectedOrder) return;

  try {

    setCancelLoading(true);

    await cancelUserOrder(
      selectedOrder._id
    );

    toast.success(
      "Order cancelled successfully."
    );

    await fetchOrders();

    setShowCancelModal(false);

    setSelectedOrder(null);

  } catch (error) {

    toast.error(

      error?.response?.data?.message ||

      "Unable to cancel order."

    );

  } finally {

    setCancelLoading(false);

  }

};

const handleBuyAgain = async (order) => {

  try {

    let addedItems = 0;

    for (const item of order.items) {

      if (!item.product?._id) continue;

      const result = await addProduct(
        item.product._id,
        item.quantity
      );

      if (result.success) {
        addedItems++;
      }

    }

    if (addedItems === 0) {

      toast.error(
        "No products could be added to the cart. Item is out of Stock!"
      );

      return;

    }

    toast.success(
      `${addedItems} item${addedItems > 1 ? "s" : ""} added to your cart.`
    );

    navigate("/cart");

  } catch (error) {

    toast.error(
      "Unable to add products to cart."
    );

  }

};

  if (loading) {

    return (

<section className="max-w-7xl mx-auto px-5 py-12">

<div className="space-y-6">

{[1,2,3].map((item)=>(

<div
key={item}
className="
animate-pulse
rounded-3xl
border
border-border
bg-card
p-8
"
>

<div className="h-6 w-48 rounded bg-muted"/>

<div className="mt-4 h-4 w-72 rounded bg-muted"/>

<div className="mt-8 h-24 rounded bg-muted"/>

</div>

))}

</div>

</section>

);

  }

  if (!orders.length) {

    return (

<section className="max-w-6xl mx-auto px-5 py-20">

<div
className="
rounded-3xl
border
border-border
bg-card
p-16
text-center
"
>

<FiPackage
size={80}
className="
mx-auto
text-primary
"
/>

<h2 className="mt-8 text-4xl font-bold">

No Orders Yet

</h2>

<p className="mt-4 text-lg text-text-secondary">

Looks like you haven't placed your first order.

</p>

<Link
to="/products"
className="
mt-10
inline-flex
items-center
gap-2
rounded-2xl
bg-primary
px-8
py-4
font-semibold
text-white
transition
hover:scale-105
"
>

<FiShoppingCart />

Start Shopping

</Link>

</div>

</section>

);

  }

  return (

<section className="max-w-7xl mx-auto px-5 py-12">

<div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

<div>

<div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

  <div>

    <button
      onClick={() => navigate("/profile")}
      className="
        mb-5
        inline-flex
        items-center
        gap-2
        rounded-xl
        border
        border-border
        bg-card
        px-4
        py-2
        text-sm
        font-medium
        transition
        hover:border-primary
        hover:text-primary
      "
    >
      ← Back to Profile
    </button>

    <h1 className="text-4xl font-bold">

      My Orders

    </h1>

    <p className="mt-2 text-text-secondary">

      View, track and manage all your purchases.

    </p>

  </div>

</div>
<p className="mt-2 text-text-secondary">

Track and manage your purchases.

</p>

</div>

<div
className="
flex
flex-col
gap-4
sm:flex-row
"
>

<div
className="
relative
"
>

<FiSearch
className="
absolute
left-4
top-1/2
-translate-y-1/2
text-text-secondary
"
/>

<input
value={search}
onChange={(e)=>
setSearch(
e.target.value
)
}
placeholder="Search Order ID..."
className="
w-72
rounded-xl
border
border-border
bg-card
py-3
pl-11
pr-4
outline-none
focus:border-primary
"
/>

</div>

</div>

</div>

<div className="mt-8 flex flex-wrap gap-3">

{FILTERS.map((item)=>(

<button
key={item}
onClick={()=>
setFilter(item)
}
className={`
rounded-full
px-5
py-2
font-medium
transition

${
filter===item

? "bg-primary text-white"

: "bg-card border border-border hover:border-primary"
}
`}
>

{item}

</button>

))}

</div>

<div className="mt-10 space-y-6">
  {filteredOrders.map((order) => (

  <div
    key={order._id}
    className="
      overflow-hidden
      rounded-3xl
      border
      border-border
      bg-card
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
    "
  >

    {/* Header */}

    <div
      className="
        flex
        flex-col
        gap-5
        border-b
        border-border
        bg-muted/20
        p-6
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >

      <div>

        <h2 className="text-xl font-bold">

          Order #{order._id.slice(-8)}

        </h2>

        <div className="mt-3 flex flex-wrap gap-6 text-sm text-text-secondary">

          <span className="flex items-center gap-2">

            <FiCalendar />

            {new Date(
              order.createdAt
            ).toLocaleDateString()}

          </span>

          <span>

            {order.items.length} Item(s)

          </span>

        </div>

      </div>

      <StatusBadge
        status={order.status}
      />

    </div>

    {/* Products */}

    <div className="divide-y divide-border">

      {order.items.map((item) => (

        <div
          key={item._id}
          className="
            flex
            flex-col
            gap-5
            p-6
            md:flex-row
            md:items-center
          "
        >

          {/* Image */}

          <div
            className="
              h-28
              w-28
              overflow-hidden
              rounded-2xl
              border
              border-border
              bg-background
              shrink-0
            "
          >

            <img
              src={
                item.product?.images?.[0]
                  ?.url ||
                "https://placehold.co/200x200?text=Laptop"
              }
              alt={
                item.product?.title
              }
              className="
                h-full
                w-full
                object-cover
              "
            />

          </div>

          {/* Info */}

          <div className="flex-1">

            <h3 className="text-lg font-semibold">

              {item.product?.title}

            </h3>

            <p className="mt-2 text-sm text-text-secondary">

              Seller:{" "}

              <span className="font-medium">

                {item.product?.seller
                  ?.name ||
                  "LapVerse Seller"}

              </span>

            </p>

            <p className="mt-1 text-sm text-text-secondary">

              Quantity:

              <span className="ml-1 font-semibold">

                {item.quantity}

              </span>

            </p>

          </div>

          {/* Price */}

          <div className="text-right">

            <p className="text-sm text-text-secondary">

              Total

            </p>

            <p className="mt-2 text-2xl font-bold text-primary">

              Rs.

              {(
                item.price *
                item.quantity
              ).toLocaleString()}

            </p>

          </div>

        </div>

      ))}

    </div>

    {/* Footer */}

    <div
      className="
        flex
        flex-col
        gap-6
        border-t
        border-border
        p-6
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >

      <div>

        <p className="text-sm text-text-secondary">

          Order Total

        </p>

        <h2 className="mt-1 text-3xl font-bold text-primary">

          Rs.

          {order.total.toLocaleString()}

        </h2>

      </div>

      <div className="flex flex-wrap gap-3">

        <Link
          to={`/orders/${order._id}`}
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-primary
            px-5
            py-3
            font-semibold
            text-primary
            transition
            hover:bg-primary
            hover:text-white
          "
        >

          View Details

          <FiArrowRight />

        </Link>

        <button
        onClick={() => handleBuyAgain(order)}
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-emerald-600
            px-5
            py-3
            font-semibold
            text-white
            transition
            hover:bg-emerald-700
          "
        >

          <FiShoppingCart />

          Buy Again

        </button>

        {["Pending", "Confirmed"].includes(order.status) && (

          <button
            onClick={() =>
              handleCancel(
                order
              )
            }
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-red-600
              px-5
              py-3
              font-semibold
              text-white
              transition
              hover:bg-red-700
            "
          >

            <FiXCircle />

            Cancel

          </button>

        )}

      </div>

    </div>

  </div>

))}
      {filteredOrders.length === 0 && (

        <div
          className="
            rounded-3xl
            border
            border-border
            bg-card
            py-20
            text-center
          "
        >

          <FiPackage
            size={60}
            className="mx-auto text-primary"
          />

          <h2 className="mt-6 text-2xl font-bold">

            No Matching Orders

          </h2>

          <p className="mt-2 text-text-secondary">

            Try changing your search or filter.

          </p>

        </div>

      )}

    </div>

    <CancelOrderModal

  open={showCancelModal}

  orderId={selectedOrder?._id}

  loading={cancelLoading}

  onClose={() => {

    if (cancelLoading) return;

    setShowCancelModal(false);

    setSelectedOrder(null);

  }}

  onConfirm={confirmCancelOrder}

/>

  </section>

  );

};

const StatusBadge = ({ status }) => {

  const styles = {

    Pending:
      "bg-yellow-100 text-yellow-700 border-yellow-300",

    Confirmed:
      "bg-blue-100 text-blue-700 border-blue-300",

    Shipped:
      "bg-violet-100 text-violet-700 border-violet-300",

    Delivered:
      "bg-green-100 text-green-700 border-green-300",

    Cancelled:
      "bg-red-100 text-red-700 border-red-300",

  };

  return (

    <span
      className={`
        inline-flex
        items-center
        rounded-full
        border
        px-4
        py-2
        text-sm
        font-semibold
        ${styles[status]}
      `}
    >

      {status}

    </span>

  );

};

export default Orders;