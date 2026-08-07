import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  FiTrendingUp,
} from "react-icons/fi";

const RevenueChart = ({ data = [] }) => {

  const chartData = data.map((item) => ({

    date: item._id,

    revenue: item.revenue,

  }));

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

      {/* Header */}

      <div
        className="
        mb-8
        flex
        items-center
        justify-between
      "
      >

        <div>

          <p
            className="
            text-sm
            font-medium
            uppercase
            tracking-[0.25em]
            text-neutral-500
          "
          >

            Revenue Analytics

          </p>

          <h2
            className="
            mt-2
            text-3xl
            font-black
            text-neutral-900
          "
          >

            Sales Overview

          </h2>

        </div>

        <div
          className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-blue-50
          text-blue-600
        "
        >

          <FiTrendingUp size={28} />

        </div>

      </div>

      {chartData.length === 0 ? (

        <div
          className="
          flex
          h-[320px]
          items-center
          justify-center
          rounded-2xl
          border
          border-dashed
          border-neutral-200
        "
        >

          <div className="text-center">

            <h3
              className="
              text-xl
              font-bold
              text-neutral-800
            "
            >

              No Revenue Yet

            </h3>

            <p
              className="
              mt-3
              text-neutral-500
            "
            >

              Revenue chart will appear once
              delivered orders start coming in.

            </p>

          </div>

        </div>

      ) : (

        <div className="h-[340px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <LineChart
              data={chartData}
            >

              <CartesianGrid
                strokeDasharray="4 4"
                stroke="#ECECEC"
              />

              <XAxis
                dataKey="date"
                tick={{
                  fill: "#737373",
                  fontSize: 12,
                }}
              />

              <YAxis
                tick={{
                  fill: "#737373",
                  fontSize: 12,
                }}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "16px",
                  border: "none",
                  boxShadow:
                    "0 12px 40px rgba(0,0,0,.08)",
                }}
              />

              <Line

                type="monotone"

                dataKey="revenue"

                stroke="#2563eb"

                strokeWidth={4}

                dot={{
                  r: 5,
                }}

                activeDot={{
                  r: 8,
                }}

              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      )}

    </div>

  );

};

export default RevenueChart;