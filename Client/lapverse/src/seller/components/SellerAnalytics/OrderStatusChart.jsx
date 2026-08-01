import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const OrderStatusChart = ({ statusCount }) => {

  const data = [

    {
      name: "Pending",
      value: statusCount.Pending,
      color: "#D99B7F",
    },

    {
      name: "Confirmed",
      value: statusCount.Confirmed,
      color: "#88BDA4",
    },

    {
      name: "Shipped",
      value: statusCount.Shipped,
      color: "#659287",
    },

    {
      name: "Delivered",
      value: statusCount.Delivered,
      color: "#0F3040",
    },

    {
      name: "Cancelled",
      value: statusCount.Cancelled,
      color: "#A56F63",
    },

  ];

  const totalOrders = data.reduce(

    (sum, item) => sum + item.value,

    0

  );

    return (

    <section className="space-y-6">

      <div>

        <h2 className="text-2xl font-bold text-[#0F3040]">

          Order Status

        </h2>

        <p className="mt-2 text-[#464858]">

          Distribution of your seller orders.

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

        <div
          className="
          flex
          flex-col
          items-center
          "
        >

          <div
            className="
            relative
            h-[260px]
            w-full
            "
          >

            <ResponsiveContainer>

              <PieChart>

                <Pie

                  data={data}

                  dataKey="value"

                  innerRadius={78}

                  outerRadius={105}

                  paddingAngle={3}

                  stroke="white"

                  strokeWidth={4}

                >

                  {data.map((entry) => (

                    <Cell

                      key={entry.name}

                      fill={entry.color}

                    />

                  ))}

                </Pie>

              </PieChart>

            </ResponsiveContainer>

            {/* Center Text */}

            <div
              className="
              absolute
              inset-0
              flex
              flex-col
              items-center
              justify-center
              pointer-events-none
              "
            >

              <p
                className="
                text-sm
                font-medium
                text-[#7A7D86]
                "
              >

                Total Orders

              </p>

              <h2
                className="
                mt-1
                text-4xl
                font-black
                text-[#0F3040]
                "
              >

                {totalOrders}

              </h2>

            </div>

          </div>
                  {/* Legend */}

        <div className="mt-6 space-y-4">

          {data.map((item) => {

            const percentage =
              totalOrders === 0
                ? 0
                : (
                    (item.value / totalOrders) *
                    100
                  ).toFixed(0);

            return (

              <div
                key={item.name}
                className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-[#F2EFEC]
                px-5
                py-4
                transition-all
                duration-300
                hover:bg-[#FAFBFA]
                "
              >

                <div
                  className="
                  flex
                  items-center
                  gap-4
                  "
                >

                  <span
                    className="
                    h-4
                    w-4
                    rounded-full
                    "
                    style={{
                      backgroundColor:
                        item.color,
                    }}
                  />

                  <span
                    className="
                    font-semibold
                    text-[#0F3040]
                    "
                  >

                    {item.name}

                  </span>

                </div>

                <div
                  className="
                  flex
                  items-center
                  gap-5
                  "
                >

                  <span
                    className="
                    font-bold
                    text-[#464858]
                    "
                  >

                    {item.value}

                  </span>

                  <span
                    className="
                    min-w-[48px]
                    text-right
                    text-sm
                    font-medium
                    text-[#7A7D86]
                    "
                  >

                    {percentage}%

                  </span>

                </div>

              </div>

            );

          })}

        </div>

      </div>
      </div>

    </section>

  );

};

export default OrderStatusChart;