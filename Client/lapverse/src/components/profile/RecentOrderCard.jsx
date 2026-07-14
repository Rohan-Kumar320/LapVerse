import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiPackage,
} from "react-icons/fi";

const statusColor = {
  Pending:
    "bg-yellow-500/15 text-yellow-400",

  Confirmed:
    "bg-blue-500/15 text-blue-400",

  Shipped:
    "bg-indigo-500/15 text-indigo-400",

  Delivered:
    "bg-green-500/15 text-green-400",

  Cancelled:
    "bg-red-500/15 text-red-400",
};

const RecentOrderCard = ({
  order,
}) => {
  return (
    <div
      className="
        rounded-3xl
        border
        border-border
        bg-card
        p-6
        transition-all
        duration-300
        hover:shadow-xl
      "
    >
      <div className="flex items-start justify-between">

        <div>

          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-primary/10
                text-primary
              "
            >
              <FiPackage size={22} />
            </div>

            <div>

              <h3 className="font-bold">

                #{order._id.slice(-8)}

              </h3>

              <p className="text-sm text-text-secondary">

                {new Date(
                  order.createdAt
                ).toLocaleDateString()}

              </p>

            </div>

          </div>

        </div>

        <span
          className={`
            rounded-full
            px-4
            py-2
            text-xs
            font-semibold
            ${statusColor[order.status]}
          `}
        >
          {order.status}
        </span>

      </div>

      <div className="mt-6 flex items-center justify-between">

        <div>

          <p className="text-sm text-text-secondary">

            Total

          </p>

          <h2 className="text-2xl font-bold">

            Rs. {order.total.toLocaleString()}

          </h2>

        </div>

        <Link
          to={`/orders/${order._id}`}
          className="
            flex
            items-center
            gap-2
            font-semibold
            text-primary
          "
        >
          View

          <FiArrowRight />

        </Link>

      </div>
    </div>
  );
};

export default RecentOrderCard;