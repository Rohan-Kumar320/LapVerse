import {
  FiTrendingUp,
  FiClock,
  FiDollarSign,
  FiAlertCircle,
} from "react-icons/fi";

const BusinessPerformance = ({ analytics }) => {

  const items = [

    {
      title: "Current Month Revenue",
      value: `Rs. ${analytics.currentMonthRevenue.toLocaleString()}`,
      subtitle:
        analytics.revenueGrowth >= 0
          ? `↑ ${analytics.revenueGrowth}% vs last month`
          : `↓ ${Math.abs(analytics.revenueGrowth)}% vs last month`,
      icon: <FiTrendingUp size={22} />,
      color: "#659287",
      bg: "#EAF5EF",
    },

    {
      title: "Pending Revenue",
      value: `Rs. ${analytics.pendingRevenue.toLocaleString()}`,
      subtitle: "Orders awaiting completion",
      icon: <FiClock size={22} />,
      color: "#88BDA4",
      bg: "#EEF8F2",
    },

    {
      title: "Average Order Value",
      value: `Rs. ${analytics.averageOrderValue.toLocaleString()}`,
      subtitle: "Per delivered order",
      icon: <FiDollarSign size={22} />,
      color: "#0F3040",
      bg: "#EEF4F7",
    },

    {
      title: "Lost Revenue",
      value: `Rs. ${analytics.cancelledRevenue.toLocaleString()}`,
      subtitle: "Cancelled orders",
      icon: <FiAlertCircle size={22} />,
      color: "#A56F63",
      bg: "#FAF0ED",
    },

  ];

  return (

    <section className="space-y-6">

      <div>

        <h2 className="text-2xl font-bold text-[#659fbc]">

          Business Performance

        </h2>

        <p className="mt-2 text-[#81849f]">

          Monitor your financial performance and business health.

        </p>

      </div>

      <div
        className="
        grid
        gap-6
        md:grid-cols-2
        xl:grid-cols-4
        "
      >

        {items.map((item) => (

          <div
            key={item.title}
            className="
            rounded-[28px]
            border
            border-[#ECE7E4]
            bg-white
            p-6
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-lg
            "
          >

            <div className="flex items-start justify-between">

              <div>

                <p
                  className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-[#464858]
                  "
                >

                  {item.title}

                </p>

                <h3
                  className="
                  mt-4
                  text-3xl
                  font-black
                  text-[#0F3040]
                  "
                >

                  {item.value}

                </h3>

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
                  backgroundColor: item.bg,
                  color: item.color,
                }}
              >

                {item.icon}

              </div>

            </div>

            <div
              className="mt-6 h-[2px] rounded-full"
              style={{
                backgroundColor: item.color,
              }}
            />

            <p
              className="
              mt-4
              text-sm
              font-medium
              text-[#464858]
              "
            >

              {item.subtitle}

            </p>

          </div>

        ))}

      </div>

    </section>

  );

};

export default BusinessPerformance;