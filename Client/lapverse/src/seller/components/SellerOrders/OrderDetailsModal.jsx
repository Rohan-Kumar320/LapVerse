import {
  FiX,
  FiUser,
  FiMapPin,
  FiCreditCard,
  FiCalendar,
  FiPackage,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";

const OrderDetailsModal = ({
  order,
  isOpen,
  onClose,
  onUpdateStatus,
}) => {
  const nextStatus = {
    Pending: "Confirmed",
    Confirmed: "Shipped",
    Shipped: "Delivered",
  };

  if (!isOpen || !order) return null;

  const badge = {
    Pending:
      "bg-[#D99B7F]/20 text-[#A56F63] border border-[#D99B7F]/40",

    Confirmed:
      "bg-[#0F3040]/10 text-[#0F3040] border border-[#0F3040]/20",

    Shipped:
      "bg-[#A56F63]/15 text-[#A56F63] border border-[#A56F63]/30",

    Delivered:
      "bg-emerald-100 text-emerald-700 border border-emerald-200",

    Cancelled:
      "bg-red-100 text-red-600 border border-red-200",
  };

  return (
    <div
      className="
      fixed
      inset-0
      z-[999]
      flex
      items-center
      justify-center
      bg-black/70
      backdrop-blur-md
      p-4
      "
    >

      <div
        className="
        flex
        h-[92vh]
        w-full
        max-w-6xl
        flex-col
        overflow-hidden
        rounded-[32px]
        bg-white
        shadow-[0_30px_90px_rgba(0,0,0,.45)]
        "
      >

        {/* HEADER */}

        <div
          className="
          relative
          overflow-hidden
          px-8
          py-7
          text-white
          "
          style={{
            background:
              "linear-gradient(135deg,#0F3040 0%,#1C4658 100%)",
          }}
        >

          {/* Decoration */}

          <div
            className="
            absolute
            -right-24
            -top-24
            h-72
            w-72
            rounded-full
            bg-white/5
            "
          />

          <div
            className="
            absolute
            -left-16
            bottom-0
            h-48
            w-48
            rounded-full
            bg-[#D99B7F]/10
            blur-2xl
            "
          />

          <div
            className="
            relative
            flex
            flex-col
            gap-6
            lg:flex-row
            lg:items-center
            lg:justify-between
            "
          >

            {/* LEFT */}

            <div>

              <p
                className="
                text-xs
                uppercase
                tracking-[5px]
                text-[#D99B7F]
                "
              >
                Seller Dashboard
              </p>

              <h1
                className="
                mt-3
                text-4xl
                font-black
                "
              >
                Order #

                {order._id
                  .slice(-8)
                  .toUpperCase()}
              </h1>

              <div
                className="
                mt-5
                flex
                flex-wrap
                items-center
                gap-5
                text-sm
                text-white/80
                "
              >

                <div className="flex items-center gap-2">

                  <FiCalendar />

                  {new Date(
                    order.createdAt
                  ).toLocaleString()}

                </div>

                <div className="flex items-center gap-2">

                  <FiPackage />

                  {order.items.length} Products

                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div
              className="
              flex
              items-center
              gap-4
              "
            >

              <span
                className={`
                rounded-full
                px-5
                py-2
                text-sm
                font-bold
                backdrop-blur-xl
                bg-gray-800
                text-white

                ${badge[order.status]}
                `}
              >
                {order.status}
              </span>

              <button

                onClick={onClose}

                className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-white/10
                transition
                hover:bg-white/20
                "

              >

                <FiX size={22} />

              </button>

            </div>

          </div>

        </div>

        {/* BODY */}

        <div
          className="
          flex-1
          overflow-y-auto
          bg-[#F7F6F5]
          p-7
          "
        >

          <div
            className="
            grid
            gap-7
            xl:grid-cols-[320px_1fr]
            "
          >
            {/* LEFT COLUMN */}

<div className="space-y-5">

  {/* ================= CUSTOMER ================= */}

  <div
    className="
    overflow-hidden
    rounded-[28px]
    bg-white
    shadow-md
    "
  >

    {/* Top */}

    <div
      className="
      flex
      items-center
      gap-4
      bg-[#0F3040]
      px-6
      py-5
      text-white
      "
    >

      <div
        className="
        flex
        h-16
        w-16
        items-center
        justify-center
        rounded-2xl
        bg-[#D99B7F]
        text-2xl
        font-black
        text-[#0F3040]
        "
      >

        {order.user?.name
          ?.charAt(0)
          ?.toUpperCase()}

      </div>

      <div>

        <p
          className="
          text-xs
          uppercase
          tracking-[3px]
          text-[#D99B7F]
          "
        >
          Customer
        </p>

        <h3 className="text-xl font-bold">

          {order.user?.name}

        </h3>

      </div>

    </div>

    {/* Body */}

    <div className="space-y-5 p-6">

      <div>

        <p className="text-xs uppercase text-[#464858]">

          Email

        </p>

        <p className="mt-1 break-all font-medium text-[#464858]">

          {order.user?.email}

        </p>

      </div>

    </div>

  </div>

  {/* ================= SHIPPING ================= */}

  <div
    className="
    rounded-[28px]
    bg-white
    p-6
    shadow-md
    "
  >

    <div className="mb-5 flex items-center gap-3">

      <div
        className="
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-2xl
        bg-[#D99B7F]/20
        text-[#A56F63]
        "
      >

        <FiMapPin size={22} />

      </div>

      <div>

        <h3 className="font-bold">

          Shipping Address

        </h3>

        <p className="text-sm text-[#464858]">

          Delivery destination

        </p>

      </div>

    </div>

    <div
      className="
      rounded-2xl
      bg-[#F8F6F5]
      p-4
      "
    >

      <p
        className="
        whitespace-pre-line
        leading-7
        text-[#464858]
        "
      >

        {order.shippingAddress}

      </p>

    </div>

  </div>

  {/* ================= PAYMENT ================= */}

  <div
    className="
    rounded-[28px]
    bg-white
    p-6
    shadow-md
    "
  >

    <div className="mb-5 flex items-center gap-3">

      <div
        className="
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-2xl
        bg-[#0F3040]/10
        text-[#0F3040]
        "
      >

        <FiCreditCard size={22} />

      </div>

      <div>

        <h3 className="font-bold">

          Payment

        </h3>

        <p className="text-sm text-[#464858]">

          Transaction

        </p>

      </div>

    </div>

    <div className="space-y-4">

      <div className="flex justify-between">

        <span className="text-[#464858]">

          Method

        </span>

        <strong className="text-[#464858]">

          {order.paymentMethod}

        </strong>

      </div>

      <div className="flex justify-between">

        <span className="text-[#464858]">

          Ordered

        </span>

        <strong className="text-[#464858]">

          {new Date(
            order.createdAt
          ).toLocaleDateString()}

        </strong>

      </div>

    </div>

  </div>
  {/* ================= ORDER TIMELINE ================= */}

<div
  className="
  rounded-[28px]
  bg-white
  p-6
  shadow-md
  "
>

  <div className="mb-6">

    <h3 className="text-lg font-bold text-[#0F3040]">

      Order Progress

    </h3>

    <p className="mt-1 text-sm text-[#464858]">

      Track the current fulfillment stage.

    </p>

  </div>

  {[
    {
      title: "Pending",
      description: "Waiting for seller confirmation.",
    },

    {
      title: "Confirmed",
      description: "Order accepted by seller.",
    },

    {
      title: "Shipped",
      description: "Package dispatched to customer.",
    },

    {
      title: "Delivered",
      description: "Order completed successfully.",
    },

  ].map((step, index) => {

    const currentIndex = [

      "Pending",

      "Confirmed",

      "Shipped",

      "Delivered",

      "Cancelled",

    ].indexOf(order.status);

    const completed = index <= currentIndex;

    const active = index === currentIndex;

    return (

      <div
        key={step.title}
        className="
        relative
        flex
        gap-4
        pb-7
        last:pb-0
        "
      >

        {/* Vertical Line */}

        {index !== 3 && (

          <div
            className={`
            absolute
            left-[18px]
            top-10
            h-full
            w-[3px]
            rounded-full

            ${
              completed

                ? "bg-[#A56F63]"

                : "bg-gray-200"

            }
            `}
          />

        )}

        {/* Circle */}

        <div
          className={`
          relative
          z-10
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          transition-all

          ${
            completed
              ? "bg-[#A56F63] text-white"
              : "bg-gray-200 text-gray-400"
          }

          ${
            active
              ? "ring-4 ring-[#D99B7F]/40"
              : ""
          }
          `}
        >

          {completed ? (

            <FiCheckCircle size={18} />

          ) : (

            <FiClock size={16} />

          )}

        </div>

        {/* Text */}

        <div className="flex-1 pb-1">

          <div className="flex items-center gap-3">

            <h4
              className={`
              font-bold

              ${
                active
                  ? "text-[#A56F63]"
                  : "text-[#0F3040]"
              }
              `}
            >

              {step.title}

            </h4>

            {active && (

              <span
                className="
                rounded-full
                bg-[#D99B7F]/20
                px-3
                py-1
                text-xs
                font-semibold
                text-[#A56F63]
                "
              >

                Current

              </span>

            )}

          </div>

          <p
            className="
            mt-1
            text-sm
            leading-6
            text-[#464858]
            "
          >

            {step.description}

          </p>

        </div>

      </div>

    );

  })}

</div>

</div>
{/* END LEFT COLUMN */}

{/* ================= RIGHT COLUMN ================= */}

<div className="space-y-6">

  {/* Products */}

  <div
    className="
    rounded-[30px]
    bg-white
    shadow-md
    overflow-hidden
    "
  >

    {/* Header */}

    <div
      className="
      flex
      items-center
      justify-between
      border-b
      border-[#ECE7E4]
      px-7
      py-5
      "
    >

      <div>

        <h3
          className="
          text-2xl
          font-bold
          text-[#0F3040]
          "
        >

          Ordered Products

        </h3>

        <p
          className="
          mt-1
          text-sm
          text-[#464858]
          "
        >

          {order.items.length} item(s) in this order

        </p>

      </div>

      <div
        className="
        rounded-2xl
        bg-[#0F3040]
        px-5
        py-2
        text-sm
        font-semibold
        text-white
        "
      >

        Seller View

      </div>

    </div>

    {/* Product List */}

    <div className="divide-y divide-[#ECE7E4]">

      {order.items.map((item) => (

        <div

          key={item._id}

          className="
          p-6
          transition
          hover:bg-[#F8F6F5]
          "

        >

          <div
            className="
            flex
            flex-col
            gap-5
            lg:flex-row
            "
          >

            {/* Image */}

            <img

              src={
                item.product.images?.[0]?.url ||
                "https://placehold.co/120x120"
              }

              alt={item.product.title}

              className="
              h-28
              w-28
              rounded-3xl
              border
              border-[#ECE7E4]
              object-cover
              "

            />

            {/* Information */}

            <div className="flex-1">

              <div
                className="
                flex
                flex-col
                gap-5
                lg:flex-row
                lg:justify-between
                "
              >

                {/* LEFT */}

                <div>

                  <h4
                    className="
                    text-xl
                    font-bold
                    text-[#0F3040]
                    "
                  >

                    {item.product.title}

                  </h4>

                  <p
                    className="
                    mt-2
                    text-[#464858]
                    "
                  >

                    {item.product.brand}

                    {" • "}

                    {item.product.model}

                  </p>

                  <div
                    className="
                    mt-4
                    flex
                    flex-wrap
                    gap-2
                    "
                  >

                    <span
                      className="
                      rounded-full
                      bg-[#0F3040]/8
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      text-[#0F3040]
                      "
                    >

                      {item.product.processor}

                    </span>

                    <span
                      className="
                      rounded-full
                      bg-[#A56F63]/15
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      text-[#A56F63]
                      "
                    >

                      {item.product.ram} GB RAM

                    </span>

                    <span
                      className="
                      rounded-full
                      bg-[#D99B7F]/20
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      text-[#A56F63]
                      "
                    >

                      {item.product.storage} GB SSD

                    </span>

                  </div>

                </div>

                {/* RIGHT */}

                <div
                  className="
                  grid
                  grid-cols-2
                  gap-4
                  lg:w-[270px]
                  "
                >

                  <div
                    className="
                    rounded-2xl
                    bg-[#F8F6F5]
                    p-4
                    text-center
                    "
                  >

                    <p
                      className="
                      text-xs
                      uppercase
                      text-[#464858]
                      "
                    >

                      Quantity

                    </p>

                    <h3
                      className="
                      mt-2
                      text-2xl
                      font-black
                      text-[#0F3040]
                      "
                    >

                      {item.quantity}

                    </h3>

                  </div>

                  <div
                    className="
                    rounded-2xl
                    bg-[#F8F6F5]
                    p-4
                    text-center
                    "
                  >

                    <p
                      className="
                      text-xs
                      uppercase
                      text-[#464858]
                      "
                    >

                      Unit Price

                    </p>

                    <h3
                      className="
                      mt-2
                      font-bold
                      text-[#A56F63]
                      "
                    >

                      Rs. {item.price.toLocaleString()}

                    </h3>

                  </div>

                  <div
                    className="
                    col-span-2
                    rounded-2xl
                    bg-[#0F3040]
                    p-4
                    text-center
                    "
                  >

                    <p
                      className="
                      text-xs
                      uppercase
                      text-[#D99B7F]
                      "
                    >

                      Line Total

                    </p>

                    <h2
                      className="
                      mt-2
                      text-3xl
                      font-black
                      text-white
                      "
                    >

                      Rs.

                      {(item.price * item.quantity).toLocaleString()}

                    </h2>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      ))}

    </div>

  </div>
    {/* ================= ORDER SUMMARY ================= */}

  <div
    className="
    rounded-[30px]
    overflow-hidden
    bg-white
    shadow-md
    "
  >

    {/* Header */}

    <div
      className="
      border-b
      border-[#ECE7E4]
      px-7
      py-5
      "
    >

      <h3
        className="
        text-2xl
        font-bold
        text-[#0F3040]
        "
      >
        Order Summary
      </h3>

      <p
        className="
        mt-1
        text-sm
        text-[#464858]
        "
      >
        Financial breakdown
      </p>

    </div>

    {/* Body */}

    <div className="p-7">

      <div className="space-y-5">

        <div className="flex justify-between">

          <span className="text-[#464858]">

            Products

          </span>

          <strong className="text-[#464858]">

            {order.items.length}

          </strong>

        </div>

        <div className="flex justify-between">

          <span className="text-[#464858]">

            Quantity

          </span>

          <strong className="text-[#464858]">

            {order.items.reduce(
              (total, item) =>
                total + item.quantity,
              0
            )}

          </strong>

        </div>

        <div className="flex justify-between">

          <span className="text-[#464858]">

            Subtotal

          </span>

          <strong className="text-[#464858]">

            Rs. {order.subtotal.toLocaleString()}

          </strong>

        </div>

        <div className="flex justify-between">

          <span className="text-[#464858]">

            Discount

          </span>

          <strong className="text-[#A56F63]">

            - Rs. {order.discount.toLocaleString()}

          </strong>

        </div>

      </div>

      {/* Grand Total */}

      <div
        className="
        mt-8
        rounded-[26px]
        p-7
        text-white
        "
        style={{
          background:
            "linear-gradient(135deg,#0F3040,#1E4B5F)",
        }}
      >

        <p
          className="
          uppercase
          tracking-[3px]
          text-[#D99B7F]
          text-sm
          "
        >

          Grand Total

        </p>

        <h1
          className="
          mt-3
          text-5xl
          font-black
          "
        >

          Rs.

          {order.total.toLocaleString()}

        </h1>

      </div>

    </div>

  </div>

</div>

{/* END RIGHT COLUMN */}

</div>

{/* END GRID */}

</div>

{/* ================= FOOTER ================= */}

<div
  className="
  border-t
  border-[#ECE7E4]
  bg-white
  px-8
  py-5
  "
>

  <div
    className="
    flex
    flex-col
    gap-4
    sm:flex-row
    sm:justify-between
    sm:items-center
    "
  >

    <div>

      <p
        className="
        text-sm
        text-[#464858]
        "
      >

        Current Status

      </p>

      <h3
        className="
        mt-1
        text-xl
        font-bold
        text-[#0F3040]
        "
      >

        {order.status}

      </h3>

    </div>

    <div
      className="
      flex
      flex-wrap
      gap-4
      "
    >

      {nextStatus[order.status] && (

        <button

          onClick={() =>
            onUpdateStatus(
              order,
              nextStatus[order.status]
            )
          }

          className="
          rounded-2xl
          px-8
          py-4
          font-semibold
          text-white
          shadow-lg
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
          "

          style={{
            background:
              "linear-gradient(135deg,#A56F63,#D99B7F)",
          }}

        >

          {

            order.status === "Pending"

              ? "Confirm Order"

              : order.status === "Confirmed"

              ? "Dispatch Order"

              : "Mark Delivered"

          }

        </button>

      )}

      <button

        onClick={onClose}

        className="
        rounded-2xl
        border-2
        border-[#0F3040]
        px-8
        py-4
        font-semibold
        text-[#0F3040]
        transition
        hover:bg-[#0F3040]
        hover:text-white
        "

      >

        Close

      </button>

    </div>

  </div>

</div>

</div>

</div>
  )
}
export default OrderDetailsModal
            