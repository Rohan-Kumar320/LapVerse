import { useNavigate } from "react-router-dom";

import {
  FiEdit,
  FiPackage,
  FiMapPin,
  FiLock,
  FiArrowRight,
} from "react-icons/fi";

const actions = [
  {
    title: "Edit Profile",
    description: "Update your personal information",
    icon: <FiEdit />,
    color: "bg-indigo-500",
    route: "/profile/edit",
  },
  {
    title: "My Orders",
    description: "Track your purchases",
    icon: <FiPackage />,
    color: "bg-blue-500",
    tab: "orders",
  },
  {
    title: "Addresses",
    description: "Manage delivery locations",
    icon: <FiMapPin />,
    color: "bg-emerald-500",
    tab: "addresses",
  },
  {
    title: "Password",
    description: "Keep your account secure",
    icon: <FiLock />,
    color: "bg-amber-500",
    tab: "security",
  },
];

const QuickActions = ({ setActiveTab }) => {
  const navigate = useNavigate();

  const handleClick = (action) => {
    if (action.tab) {
      setActiveTab(action.tab);
      return;
    }

    if (action.route) {
      navigate(action.route);
    }
  };

  return (
    <div className="rounded-3xl border border-gray-800 bg-[#111827] p-6">
      <h2 className="text-xl font-bold text-white">
        Quick Actions
      </h2>

      <p className="mt-1 text-sm text-gray-400">
        Frequently used account shortcuts.
      </p>

      <div className="mt-6 space-y-3">
        {actions.map((action) => (
          <button
            key={action.title}
            type="button"
            onClick={() => handleClick(action)}
            className="
              group
              flex
              w-full
              items-center
              justify-between
              rounded-2xl
              border
              border-gray-800
              p-4
              text-left
              transition-all
              duration-300
              hover:border-indigo-500
              hover:bg-[#1a2235]
            "
          >
            <div className="flex items-center gap-4">
              <div
                className={`
                  ${action.color}
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  text-white
                  shadow-lg
                `}
              >
                {action.icon}
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  {action.title}
                </h3>

                <p className="text-sm text-gray-400">
                  {action.description}
                </p>
              </div>
            </div>

            <FiArrowRight
              size={20}
              className="
                text-gray-500
                transition-all
                duration-300
                group-hover:translate-x-1
                group-hover:text-white
              "
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;