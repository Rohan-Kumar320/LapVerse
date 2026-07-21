import { Link } from "react-router-dom";
import {
  FiPackage,
  FiArrowRight,
} from "react-icons/fi";

const RecentOrders = ({
  orders = [],
}) => {
  return (
    <div className="rounded-3xl border border-gray-800 bg-[#111827] p-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-white">
            Recent Orders
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Track your latest purchases.
          </p>

        </div>

        <Link
          to="/profile/orders"
          className="
            hidden
            items-center
            gap-2
            text-sm
            font-medium
            text-indigo-400
            transition
            hover:text-indigo-300
            sm:flex
          "
        >
          View All

          <FiArrowRight />
        </Link>

      </div>

      {/* Empty */}

      {orders.length === 0 ? (
        <div className="py-14 text-center">

          <div
            className="
              mx-auto
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              bg-indigo-500/10
            "
          >
            <FiPackage
              className="text-indigo-400"
              size={34}
            />
          </div>

          <h3 className="mt-6 text-xl font-semibold text-white">
            No Orders Yet
          </h3>

          <p className="mx-auto mt-3 max-w-md text-gray-400">
            Looks like you haven't placed your first
            order yet. Browse our latest laptops and
            accessories.
          </p>

          <Link
            to="/products"
            className="
              mt-8
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-indigo-600
              px-6
              py-3
              font-semibold
              text-white
              transition
              hover:bg-indigo-500
            "
          >
            Explore Products

            <FiArrowRight />
          </Link>

        </div>
      ) : (
        <div className="mt-6 space-y-4">

          {orders.map((order) => (
            <div
              key={order._id}
              className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-gray-800
                p-4
              "
            >
              <div className="flex items-center gap-4">

                <img
                  src={order.image}
                  alt={order.title}
                  className="
                    h-16
                    w-16
                    rounded-xl
                    object-cover
                  "
                />

                <div>

                  <h3 className="font-semibold text-white">
                    {order.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">
                    {order.date}
                  </p>

                </div>

              </div>

              <div className="text-right">

                <span
                  className="
                    rounded-full
                    bg-green-500/15
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-green-400
                  "
                >
                  {order.status}
                </span>

                <p className="mt-3 font-bold text-white">
                  Rs. {order.total}
                </p>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default RecentOrders;