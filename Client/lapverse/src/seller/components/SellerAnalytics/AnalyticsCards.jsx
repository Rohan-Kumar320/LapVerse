import {
  FiDollarSign,
  FiShoppingBag,
  FiPackage,
  FiStar,
} from "react-icons/fi";

const AnalyticsCards = ({ analytics }) => {

  const cards = [

    {
      title: "Total Revenue",
      value: `Rs. ${analytics.revenue.toLocaleString()}`,
      subtitle: "From delivered orders",
      icon: <FiDollarSign size={26} />,
      accent: "#659287",
      iconBg: "#E6F2DD",
    },

    {
      title: "Orders",
      value: analytics.totalOrders,
      subtitle: "Orders received",
      icon: <FiShoppingBag size={26} />,
      accent: "#0F3040",
      iconBg: "#EAF2F4",
    },

    {
      title: "Products Sold",
      value: analytics.productsSold,
      subtitle: "Units sold",
      icon: <FiPackage size={26} />,
      accent: "#88BDA4",
      iconBg: "#EEF7F2",
    },

    {
      title: "Average Rating",
      value: `${analytics.averageRating}`,
      subtitle: `${analytics.totalReviews} Reviews`,
      icon: <FiStar size={26} />,
      accent: "#D99B7F",
      iconBg: "#FDF1EB",
    },

  ];

  return (

    <div
      className="
      grid
      gap-6
      sm:grid-cols-2
      xl:grid-cols-4
      "
    >

      {cards.map((card) => (

        <div

          key={card.title}

          className="
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-[#ECE7E4]
          bg-white
          p-7
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
          "

        >

          {/* Accent Line */}

          <div

            className="
            absolute
            left-0
            top-0
            h-1.5
            w-full
            rounded-full
            "

            style={{
              background: card.accent,
            }}

          />

          {/* Header */}

          <div className="flex items-center justify-between">

            <div>

              <p
                className="
                text-xs
                font-bold
                uppercase
                tracking-[0.25em]
                text-[#7D7D7D]
                "
              >

                {card.title}

              </p>

            </div>

            <div

              className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              "

              style={{
                background: card.iconBg,
                color: card.accent,
              }}

            >

              {card.icon}

            </div>

          </div>

          {/* Value */}

          <h2
            className="
            mt-7
            break-words
            text-4xl
            font-black
            text-[#0F3040]
            "
          >

            {card.value}

          </h2>

          {/* Footer */}

          <div
            className="
            mt-5
            flex
            items-center
            justify-between
            "
          >

            <span
              className="
              text-sm
              text-[#464858]
              "
            >

              {card.subtitle}

            </span>

            <div

              className="
              h-2
              w-2
              rounded-full
              "

              style={{
                background: card.accent,
              }}

            />

          </div>

        </div>

      ))}

    </div>

  );

};

export default AnalyticsCards;