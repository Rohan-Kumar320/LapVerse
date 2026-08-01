import {
  FiClock,
  FiCheckCircle,
  FiTruck,
  FiPackage,
  FiXCircle,
} from "react-icons/fi";

const OrderStatistics = ({ orders }) => {

  const stats = {

    total: orders.length,

    pending: orders.filter(
      (o) => o.status === "Pending"
    ).length,

    confirmed: orders.filter(
      (o) => o.status === "Confirmed"
    ).length,

    shipped: orders.filter(
      (o) => o.status === "Shipped"
    ).length,

    delivered: orders.filter(
      (o) => o.status === "Delivered"
    ).length,

    cancelled: orders.filter(
      (o) => o.status === "Cancelled"
    ).length,

  };

  const cards = [

    {
      title: "Pending",
      value: stats.pending,
      icon: <FiClock size={22} />,
      color: "amber",
    },

    {
      title: "Confirmed",
      value: stats.confirmed,
      icon: <FiCheckCircle size={22} />,
      color: "blue",
    },

    {
      title: "Shipped",
      value: stats.shipped,
      icon: <FiTruck size={22} />,
      color: "purple",
    },

    {
      title: "Delivered",
      value: stats.delivered,
      icon: <FiPackage size={22} />,
      color: "emerald",
    },

    {
      title: "Cancelled",
      value: stats.cancelled,
      icon: <FiXCircle size={22} />,
      color: "red",
    },

  ];

  return (

    <div className="grid gap-6 md:grid-cols-3 xl:grid-cols-5">

      {cards.map((card) => (

        <div
          key={card.title}
          className="
            rounded-3xl
            border
            border-border
            bg-card
            p-6
            shadow-sm
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-text-secondary">

                {card.title}

              </p>

              <h2 className="mt-2 text-3xl font-bold">

                {card.value}

              </h2>

            </div>

            <div
              className={`
                rounded-2xl
                p-4

                ${
                  card.color === "amber"
                    ? "bg-amber-100 text-amber-600"

                  : card.color === "blue"
                    ? "bg-blue-100 text-blue-600"

                  : card.color === "purple"
                    ? "bg-purple-100 text-purple-600"

                  : card.color === "emerald"
                    ? "bg-emerald-100 text-emerald-600"

                  : "bg-red-100 text-red-600"
                }
              `}
            >

              {card.icon}

            </div>

          </div>

        </div>

      ))}

    </div>

  );

};

export default OrderStatistics;