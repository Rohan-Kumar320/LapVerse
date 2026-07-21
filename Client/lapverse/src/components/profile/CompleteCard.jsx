import { Link } from "react-router-dom";
import {
  FiCheckCircle,
  FiCircle,
  FiArrowRight,
} from "react-icons/fi";

const CompletionCard = ({ user }) => {
  const items = [
    {
      label: "Profile Picture",
      completed: !!user?.avatar?.url,
    },
    {
      label: "Full Name",
      completed: !!user?.name,
    },
    {
      label: "Email Address",
      completed: !!user?.email,
    },
    {
      label: "Phone Number",
      completed: !!user?.phone,
    },
    {
      label: "Shipping Address",
      completed: !!user?.defaultShippingAddress,
    },
  ];

  const completedCount = items.filter(
    (item) => item.completed
  ).length;

  const percentage = Math.round(
    (completedCount / items.length) * 100
  );

  return (
    <div className="rounded-3xl border border-gray-800 bg-[#111827] p-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-white">
            Profile Completion
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Complete your profile to unlock the best experience.
          </p>

        </div>

        <span className="text-2xl font-bold text-indigo-400">
          {percentage}%
        </span>

      </div>

      {/* Progress */}

      <div className="mt-6 h-3 overflow-hidden rounded-full bg-gray-800">

        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-700"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

      {/* Checklist */}

      <div className="mt-7 space-y-4">

        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">

              {item.completed ? (
                <FiCheckCircle
                  className="text-green-500"
                  size={19}
                />
              ) : (
                <FiCircle
                  className="text-gray-500"
                  size={19}
                />
              )}

              <span
                className={
                  item.completed
                    ? "text-gray-200"
                    : "text-gray-500"
                }
              >
                {item.label}
              </span>

            </div>

          </div>
        ))}

      </div>

      {/* Button */}

      {percentage !== 100 && (
        <Link
          to="/profile/edit"
          className="
            mt-8
            flex
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-indigo-600
            py-3
            font-semibold
            text-white
            transition
            hover:bg-indigo-500
          "
        >
          Complete Profile

          <FiArrowRight />
        </Link>
      )}

    </div>
  );
};

export default CompletionCard;