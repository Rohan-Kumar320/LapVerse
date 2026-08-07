import {
  FiClock,
  FiCheckCircle,
  FiTruck,
  FiPackage,
  FiXCircle,
} from "react-icons/fi";

const OrderStatusCard = ({ overview }) => {

  const total = overview.totalOrders || 1;

  const statuses = [

    {
      title: "Pending",
      value: overview.pendingOrders,
      color: "bg-amber-500",
      bg: "bg-amber-50",
      text: "text-amber-600",
      icon: <FiClock size={18} />,
    },

    {
      title: "Confirmed",
      value: overview.confirmedOrders,
      color: "bg-sky-500",
      bg: "bg-sky-50",
      text: "text-sky-600",
      icon: <FiCheckCircle size={18} />,
    },

    {
      title: "Shipped",
      value: overview.shippedOrders,
      color: "bg-violet-500",
      bg: "bg-violet-50",
      text: "text-violet-600",
      icon: <FiTruck size={18} />,
    },

    {
      title: "Delivered",
      value: overview.deliveredOrders,
      color: "bg-emerald-500",
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      icon: <FiPackage size={18} />,
    },

    {
      title: "Cancelled",
      value: overview.cancelledOrders,
      color: "bg-rose-500",
      bg: "bg-rose-50",
      text: "text-rose-600",
      icon: <FiXCircle size={18} />,
    },

  ];

  return (

    <div
      className="
      rounded-[30px]
      border
      border-neutral-200
      bg-white
      p-7
      shadow-lg
      shadow-black/5
    "
    >

      <h2
        className="
        text-2xl
        font-black
        text-neutral-900
      "
      >

        Order Status

      </h2>

      <p
        className="
        mt-2
        text-sm
        text-neutral-500
      "
      >

        Distribution of all marketplace orders

      </p>

      <div className="mt-8 space-y-6">

        {statuses.map((item) => {

          const percent =
            total > 0
              ? (item.value / total) * 100
              : 0;

          return (

            <div key={item.title}>

              <div
                className="
                mb-2
                flex
                items-center
                justify-between
              "
              >

                <div
                  className="
                  flex
                  items-center
                  gap-3
                "
                >

                  <div
                    className={`
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    ${item.bg}
                    ${item.text}
                  `}
                  >

                    {item.icon}

                  </div>

                  <span
                    className="
                    font-semibold
                    text-neutral-800
                  "
                  >

                    {item.title}

                  </span>

                </div>

                <div className="text-right">

                  <p
                    className="
                    font-bold
                    text-neutral-900
                  "
                  >

                    {item.value}

                  </p>

                  <p
                    className="
                    text-xs
                    text-neutral-500
                  "
                  >

                    {percent.toFixed(1)}%

                  </p>

                </div>

              </div>

              <div
                className="
                h-2.5
                overflow-hidden
                rounded-full
                bg-neutral-100
              "
              >

                <div
                  className={`
                  h-full
                  rounded-full
                  transition-all
                  duration-700
                  ${item.color}
                `}
                  style={{
                    width: `${percent}%`,
                  }}
                />

              </div>

            </div>

          );

        })}

      </div>

      <div
        className="
        mt-8
        rounded-2xl
        bg-neutral-100
        p-5
      "
      >

        <p
          className="
          text-sm
          text-neutral-500
        "
        >

          Total Orders

        </p>

        <h2
          className="
          mt-2
          text-4xl
          font-black
          text-neutral-900
        "
        >

          {overview.totalOrders}

        </h2>

      </div>

    </div>

  );

};

export default OrderStatusCard;