import {
  FiTrendingUp,
  FiStar,
  FiPackage,
  FiAlertTriangle,
  FiBarChart2,
} from "react-icons/fi";

const BusinessInsights = ({ insights }) => {

  const items = [

    {
      title: "Top Performer",

      description: insights.topPerformer
        ? `${insights.topPerformer.title} generated Rs. ${insights.topPerformer.revenue.toLocaleString()} revenue.`
        : "No sales yet.",

      icon: <FiTrendingUp size={22} />,

      bg: "bg-[#EAF7F0]",

      color: "text-[#659287]",
    },

    {
      title: "Highest Rated",

      description: insights.highestRated
        ? `${insights.highestRated.title} has ${insights.highestRated.rating} ★ from ${insights.highestRated.reviews} reviews.`
        : "No reviews available.",

      icon: <FiStar size={22} />,

      bg: "bg-[#FFF5EE]",

      color: "text-[#D99B7F]",
    },

    {
      title: "Low Stock",

      description: `${insights.lowStockCount} product(s) require restocking.`,

      icon: <FiPackage size={22} />,

      bg: "bg-[#EEF8F2]",

      color: "text-[#88BDA4]",
    },

    {
      title: "Out of Stock",

      description: `${insights.outOfStockCount} product(s) are unavailable.`,

      icon: <FiAlertTriangle size={22} />,

      bg: "bg-[#FCEAEA]",

      color: "text-[#A56F63]",
    },

    {
      title: "No Sales",

      description: `${insights.noSalesCount} product(s) have never been sold.`,

      icon: <FiBarChart2 size={22} />,

      bg: "bg-[#F4F6F8]",

      color: "text-[#464858]",
    },

  ];

  return (

    <section className="space-y-6">

      <div>

        <h2 className="text-2xl font-bold text-[#0F3040]">

          Business Insights

        </h2>

        <p className="mt-2 text-[#464858]">

          Important observations from your store.

        </p>

      </div>

      <div
        className="
        overflow-hidden
        rounded-[30px]
        border
        border-[#ECE7E4]
        bg-white
        shadow-sm
        "
      >

        {items.map((item, index) => (

          <div

            key={item.title}

            className={`
            flex
            items-center
            gap-6
            p-6
            transition-all
            duration-300
            hover:bg-[#FAFBFA]
            ${
              index !== items.length - 1
                ? "border-b border-[#F2EFEC]"
                : ""
            }
            `}
          >

            {/* Icon */}

            <div
              className={`
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              ${item.bg}
              ${item.color}
              `}
            >

              {item.icon}

            </div>

            {/* Text */}

            <div className="flex-1">

              <h3
                className="
                text-lg
                font-bold
                text-[#0F3040]
                "
              >

                {item.title}

              </h3>

              <p
                className="
                mt-1
                text-[#464858]
                "
              >

                {item.description}

              </p>

            </div>

          </div>

        ))}

      </div>

    </section>

  );

};

export default BusinessInsights;