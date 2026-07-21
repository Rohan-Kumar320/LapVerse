import { useEffect, useState } from "react";
import { useParams, Link, useNavigate  } from "react-router-dom";

import {
  FiArrowLeft,
  FiCalendar,
  FiCreditCard,
  FiMapPin,
  FiPackage,
  FiShoppingBag,
} from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import {toast} from "react-toastify";
import { getOrderById } from "../../services/orderService";

const OrderDetails = () => {

const { addProduct, refreshCart } = useCart();

const navigate = useNavigate();

  const { id } = useParams();

  const [order, setOrder] = useState(null);

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    fetchOrder();

  }, []);

  const fetchOrder = async () => {

    try {

      const data =
        await getOrderById(id);

      setOrder(data.order);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <div className="py-32 text-center">

        <div
          className="
            mx-auto
            h-14
            w-14
            animate-spin
            rounded-full
            border-4
            border-primary
            border-t-transparent
          "
        />

        <p className="mt-6 text-lg text-text-secondary">

          Loading order details...

        </p>

      </div>

    );

  }

  if (!order) {

    return (

      <div className="py-32 text-center">

        <FiPackage
          className="mx-auto text-primary"
          size={70}
        />

        <h2 className="mt-6 text-3xl font-bold">

          Order not found

        </h2>

        <Link
          to="/orders"
          className="
            mt-8
            inline-flex
            rounded-xl
            bg-primary
            px-6
            py-3
            font-semibold
            text-white
          "
        >

          Back to Orders

        </Link>

      </div>

    );

  };

  const formattedDate =
    new Date(order.createdAt)
      .toLocaleString();

  const paymentMethod =
    order.paymentMethod ||
    "Cash on Delivery";

  const shipping =
    order.shippingAddress;

  const orderNumber =
    order._id.slice(-8);

const handleBuyAgain = async () => {
  try {
    for (const item of order.items) {
      await addProduct(item.product._id, item.quantity);
    }

    await refreshCart();

navigate("/checkout", {
  state: {
    buyNow: true,
    items: order.items,
  },
});

  } catch (error) {
    toast.error("Unable to buy again.");
  }
};

return (

<section className="max-w-7xl mx-auto px-5 py-10">

  {/* Header */}

  <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

    <div>

      <Link
        to="/orders"
        className="
          mb-6
          inline-flex
          items-center
          gap-2
          rounded-xl
          border
          border-border
          bg-card
          px-4
          py-2
          font-medium
          transition
          hover:border-primary
          hover:text-primary
        "
      >

        <FiArrowLeft />

        Back to Orders

      </Link>

      <h1 className="text-4xl font-bold">

        Order #{orderNumber}

      </h1>

      <p className="mt-2 text-text-secondary">

        Placed on {formattedDate}

      </p>

    </div>

    <StatusBadge
      status={order.status}
    />

  </div>

  <div className="grid gap-8 lg:grid-cols-3">

    {/* Left Side */}

    <div className="space-y-8 lg:col-span-2">

      {/* Order Information */}

      <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">

        <div className="mb-8 flex items-center gap-4">

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-primary/10
              text-primary
            "
          >

            <FiPackage size={28} />

          </div>

          <div>

            <h2 className="text-2xl font-bold">

              Order Information

            </h2>

            <p className="text-text-secondary">

              Overview of this purchase

            </p>

          </div>

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <p className="text-sm text-text-secondary">

              Order ID

            </p>

            <p className="mt-1 font-semibold break-all">

              {order._id}

            </p>

          </div>

          <div>

            <p className="text-sm text-text-secondary">

              Order Date

            </p>

            <p className="mt-1 flex items-center gap-2 font-semibold">

              <FiCalendar />

              {formattedDate}

            </p>

          </div>

          <div>

            <p className="text-sm text-text-secondary">

              Payment Method

            </p>

            <p className="mt-1 flex items-center gap-2 font-semibold">

              <FiCreditCard />

              {paymentMethod}

            </p>

          </div>

          <div>

            <p className="text-sm text-text-secondary">

              Order Status

            </p>

            <div className="mt-2">

              <StatusBadge
                status={order.status}
              />

            </div>

          </div>

        </div>

      </div>

      {/* Products */}

      <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">

        <div className="mb-8 flex items-center gap-4">

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-primary/10
              text-primary
            "
          >

            <FiShoppingBag size={26} />

          </div>

          <div>

            <h2 className="text-2xl font-bold">

              Ordered Products

            </h2>

            <p className="text-text-secondary">

              {order.items.length} item(s)

            </p>

          </div>

        </div>

        <div className="space-y-6">

          {order.items.map((item) => (

            <div
              key={item._id}
              className="
                flex
                flex-col
                gap-5
                rounded-2xl
                border
                border-border
                p-5
                transition
                hover:border-primary
              "
            >

              <div className="flex gap-5">

                <img
                  src={
                    item.product?.images?.[0]?.url ||
                    "https://placehold.co/120x120?text=Laptop"
                  }
                  alt={item.product?.title}
                  className="
                    h-28
                    w-28
                    rounded-2xl
                    border
                    border-border
                    object-cover
                  "
                />

                <div className="flex-1">

                  <h3 className="text-xl font-bold">

                    {item.product?.title}

                  </h3>

                  <p className="mt-2 text-text-secondary">

                    {item.product?.brand}

                    {" • "}

                    {item.product?.processor}

                  </p>

                  <div className="mt-5 flex flex-wrap gap-8">

                    <div>

                      <p className="text-sm text-text-secondary">

                        Quantity

                      </p>

                      <p className="font-semibold">

                        {item.quantity}

                      </p>

                    </div>

                    <div>

                      <p className="text-sm text-text-secondary">

                        Unit Price

                      </p>

                      <p className="font-semibold">

                        Rs. {item.price.toLocaleString()}

                      </p>

                    </div>

                    <div>

                      <p className="text-sm text-text-secondary">

                        Total

                      </p>

                      <p className="text-lg font-bold text-primary">

                        Rs. {(item.price * item.quantity).toLocaleString()}

                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
          </div>

    {/* Right Sidebar */}

    <div className="space-y-8">

      {/* Shipping */}

      <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">

        <div className="mb-6 flex items-center gap-4">

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-primary/10
              text-primary
            "
          >

            <FiMapPin size={22} />

          </div>

          <div>

            <h2 className="text-xl font-bold">

              Shipping Address

            </h2>

            <p className="text-sm text-text-secondary">

              Delivery destination

            </p>

          </div>

        </div>

        <div className="space-y-2 leading-7">

          {typeof shipping === "object" ? (

            <>

              <p className="font-semibold">

                {shipping.fullName}

              </p>

              <p>{shipping.phone}</p>

              <p>{shipping.addressLine}</p>

              <p>

                {shipping.area}, {shipping.city}

              </p>

              <p>

                {shipping.country}

              </p>

              <p>

                {shipping.postalCode}

              </p>

            </>

          ) : (

            <p className="leading-8">

              {shipping}

            </p>

          )}

        </div>

      </div>

      {/* Payment */}

      <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">

        <div className="mb-6 flex items-center gap-4">

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-primary/10
              text-primary
            "
          >

            <FiCreditCard size={22} />

          </div>

          <div>

            <h2 className="text-xl font-bold">

              Payment

            </h2>

            <p className="text-sm text-text-secondary">

              Transaction details

            </p>

          </div>

        </div>

        <div className="space-y-5">

          <div>

            <p className="text-sm text-text-secondary">

              Payment Method

            </p>

            <p className="mt-1 font-semibold">

              {paymentMethod}

            </p>

          </div>

          <div>

            <p className="text-sm text-text-secondary">

              Payment Status

            </p>

            <span
              className="
                mt-2
                inline-flex
                rounded-full
                bg-green-500/15
                px-4
                py-2
                text-sm
                font-semibold
                text-green-400
              "
            >

              Paid

            </span>

          </div>

        </div>

      </div>

      {/* Summary */}

      <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">

        <h2 className="mb-6 text-2xl font-bold">

          Order Summary

        </h2>

        <div className="space-y-5">

          <div className="flex justify-between">

            <span className="text-text-secondary">

              Subtotal

            </span>

            <span className="font-semibold">

              Rs. {order.subtotal.toLocaleString()}

            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-text-secondary">

              Discount

            </span>

            <span className="font-semibold text-green-500">

              - Rs. {order.discount.toLocaleString()}

            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-text-secondary">

              Shipping

            </span>

            <span className="font-semibold text-green-500">

              FREE

            </span>

          </div>

          <hr className="border-border" />

          <div className="flex justify-between text-2xl font-bold">

            <span>

              Total

            </span>

            <span className="text-primary">

              Rs. {order.total.toLocaleString()}

            </span>

          </div>

        </div>

      </div>

      {/* Actions */}

      <div className="space-y-4">

        <button
        onClick={handleBuyAgain}
          className="
            w-full
            rounded-2xl
            bg-primary
            px-6
            py-4
            font-semibold
            text-white
            transition
            hover:scale-[1.02]
          "
        >

          Buy Again

        </button>

        <Link
          to="/products"
          className="
            flex
            w-full
            items-center
            justify-center
            rounded-2xl
            border
            border-primary
            px-6
            py-4
            font-semibold
            text-primary
            transition
            hover:bg-primary
            hover:text-white
          "
        >

          Continue Shopping

        </Link>

      </div>

    </div>

  </div>

</section>

);

};

const StatusBadge = ({ status }) => {

  const colors = {

    Pending:
      "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",

    Confirmed:
      "bg-blue-500/15 text-blue-400 border-blue-500/30",

    Shipped:
      "bg-purple-500/15 text-purple-400 border-purple-500/30",

    Delivered:
      "bg-green-500/15 text-green-400 border-green-500/30",

    Cancelled:
      "bg-red-500/15 text-red-400 border-red-500/30",

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
        ${colors[status]}
      `}
    >

      {status}

    </span>

  );

};
export default OrderDetails;