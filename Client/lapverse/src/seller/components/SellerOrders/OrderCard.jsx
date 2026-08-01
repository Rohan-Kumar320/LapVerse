import {
  FiUser,
  FiPackage,
  FiCalendar,
  FiArrowRight,
} from "react-icons/fi";

const OrderCard = ({
  order,
  onView,
}) => {

  const statusConfig = {

    Pending: {
      color:
        "bg-amber-100 text-amber-700 border-amber-200",
      dot: "bg-amber-500",
    },

    Confirmed: {
      color:
        "bg-indigo-100 text-indigo-700 border-indigo-200",
      dot: "bg-indigo-500",
    },

    Shipped: {
      color:
        "bg-violet-100 text-violet-700 border-violet-200",
      dot: "bg-violet-500",
    },

    Delivered: {
      color:
        "bg-emerald-100 text-emerald-700 border-emerald-200",
      dot: "bg-emerald-500",
    },

    Cancelled: {
      color:
        "bg-red-100 text-red-700 border-red-200",
      dot: "bg-red-500",
    },

  };

  const initials = order.user.name
    .split(" ")
    .map((x) => x[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const progress = [

    "Pending",

    "Confirmed",

    "Shipped",

    "Delivered",

  ];

  const currentStep =
    progress.indexOf(order.status);

  return (

    <div
      className="
      rounded-3xl
      border
      border-border
      bg-card
      p-6
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
      "
    >

      {/* Top */}

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-3">

          <span

            className={`
            h-3
            w-3
            rounded-full

            ${statusConfig[order.status].dot}
            `}

          />

          <span

            className={`
            rounded-full
            border
            px-3
            py-1
            text-xs
            font-semibold

            ${statusConfig[order.status].color}
            `}

          >

            {order.status}

          </span>

        </div>

        <div className="text-right">

          <p
            className="
            text-xs
            text-text-secondary
            "
          >

            Order

          </p>

          <h4 className="font-bold">

            #

            {order._id
              .slice(-8)
              .toUpperCase()}

          </h4>

        </div>

      </div>

      {/* Customer */}

      <div className="mt-6 flex items-center gap-4">

        <div
          className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-br
          from-indigo-500
          to-violet-600
          font-bold
          text-white
          shadow-md
          "
        >

          {initials}

        </div>

        <div className="min-w-0 flex-1">

          <h3
            className="
            truncate
            font-semibold
            "
          >

            {order.user.name}

          </h3>

          <p
            className="
            truncate
            text-sm
            text-text-secondary
            "
          >

            {order.user.email}

          </p>

        </div>

        <div className="text-right">

          <p
            className="
            text-xs
            text-text-secondary
            "
          >

            Total

          </p>

          <h2
            className="
            text-2xl
            font-bold
            text-emerald-600
            "
          >

            Rs.

            {" "}

            {order.total.toLocaleString()}

          </h2>

        </div>

      </div>

      {/* Info Chips */}

      <div
        className="
        mt-6
        flex
        flex-wrap
        gap-3
        "
      >

        <div
          className="
          flex
          items-center
          gap-2
          rounded-xl
          font-bold
          bg-amber-500
          px-3
          py-2
          text-sm
          "
        >

          <FiPackage />

          {order.items.length}  

           -Products

        </div>

        <div
          className="
          flex
          items-center
          gap-2
          rounded-xl
          font-bold
          bg-slate-600
          px-3
          py-2
          text-sm
          "
        >

          <FiCalendar />

          {new Date(
            order.createdAt
          ).toLocaleDateString()}

        </div>

        <div
          className="
          rounded-xl
          bg-cyan-700
          font-bold
          px-3
          py-2
          text-sm
          "
        >

          {order.paymentMethod}

        </div>

      </div>

      {/* Progress */}

      <div className="mt-6">

        <div className="flex items-center">

          {progress.map((step, index) => (

            <div
              key={step}
              className="
              flex
              flex-1
              items-center
              "
            >

              <div

                className={`
                h-4
                w-4
                rounded-full

                ${
                  index <= currentStep

                    ? "bg-emerald-500"

                    : "bg-slate-300"

                }
                `}

              />

              {index !==
                progress.length - 1 && (

                <div

                  className={`
                  h-1
                  flex-1

                  ${
                    index < currentStep

                      ? "bg-emerald-500"

                      : "bg-slate-300"

                  }
                  `}

                />

              )}

            </div>

          ))}

        </div>

      </div>

      {/* Button */}

      <button

        onClick={() => onView(order)}

        className="
        mt-7
        flex
        w-full
        items-center
        justify-center
        gap-3
        rounded-2xl
        bg-gradient-to-r
        from-indigo-600
        via-violet-600
        to-purple-700
        py-3.5
        font-semibold
        text-white
        shadow-lg
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:shadow-xl
        "

      >

        Manage Order

        <FiArrowRight />

      </button>

    </div>

  );

};

export default OrderCard;