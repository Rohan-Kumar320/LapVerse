import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const RevenueChart = ({ monthlyRevenue }) => {

  return (

    <section className="space-y-6">

      <div>

        <h2 className="text-2xl font-bold text-[#599abb]">

          Revenue Trend

        </h2>

        <p className="mt-2 text-[#787981]">

          Monthly revenue generated from delivered orders.

        </p>

      </div>

      <div
        className="
        rounded-[30px]
        border
        border-[#ECE7E4]
        bg-white
        p-8
        shadow-sm
        "
      >

        <ResponsiveContainer
          width="100%"
          height={380}
        >

          <AreaChart
            data={monthlyRevenue}
          >

            <defs>

              <linearGradient
                id="revenueGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#659287"
                  stopOpacity={0.45}
                />

                <stop
                  offset="95%"
                  stopColor="#659287"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              stroke="#ECE7E4"
              strokeDasharray="4 4"
            />

            <XAxis

              dataKey="month"

              tick={{
                fill: "#464858",
                fontSize: 13,
              }}

              tickLine={false}

              axisLine={false}

            />

            <YAxis

              tick={{
                fill: "#464858",
                fontSize: 13,
              }}

              tickFormatter={(value) =>
                `${value / 1000}k`
              }

              tickLine={false}

              axisLine={false}

            />

            <Tooltip

              contentStyle={{
                borderRadius: 16,
                border: "1px solid #ECE7E4",
                boxShadow:
                  "0 8px 20px rgba(0,0,0,.08)",
              }}

              formatter={(value) => [
                `Rs. ${value.toLocaleString()}`,
                "Revenue",
              ]}

            />

            <Area

              type="monotone"

              dataKey="revenue"

              stroke="#659287"

              strokeWidth={4}

              fill="url(#revenueGradient)"

              activeDot={{
                r: 7,
                fill: "#659287",
              }}

            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </section>

  );

};

export default RevenueChart;