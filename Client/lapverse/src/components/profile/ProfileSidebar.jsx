import {
  FiHome,
  FiPackage,
  FiHeart,
  FiMapPin,
  FiLock,
  FiSettings,
  FiLogOut,
  FiMessageSquare,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const menu = [
  {
    key: "dashboard",
    title: "Dashboard",
    icon: <FiHome />,
  },
  {
    key: "orders",
    title: "My Orders",
    icon: <FiPackage />,
  },
  {
    key: "reviews",
    title: "My Reviews",
    icon: <FiMessageSquare />,
  },
  {
    key: "wishlist",
    title: "Wishlist",
    icon: <FiHeart />,
  },
  {
    key: "addresses",
    title: "Addresses",
    icon: <FiMapPin />,
  },
  {
    key: "security",
    title: "Security",
    icon: <FiLock />,
  },
  {
    key: "settings",
    title: "Settings",
    icon: <FiSettings />,
  },
];
const ProfileSidebar = ({
  activeTab,
  setActiveTab,
  mobile = false,
}) => {
  const navigate = useNavigate();

  const {
    user,
    logout,
  } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside
      className={`
        ${
          mobile
            ? "w-full h-full"
            : "sticky top-24 w-72 max-h-[calc(100vh-7rem)]"
        }

         overflow-y-auto
  rounded-3xl
  border
  border-border
  bg-card
  shadow-xl
      `}
    >
      {/* Profile */}

{/* Navigation Header */}

<div className="border-b border-border px-6 py-5">

  <h2 className="text-lg font-bold text-white">
    My Account
  </h2>

  <p className="mt-1 text-sm text-gray-400">
    Manage your account and preferences
  </p>

</div>
      {/* Navigation */}

      <div className="p-4">

        <div className="space-y-2">

          {menu.map((item) => (
<button
  key={item.key}
  onClick={() => setActiveTab(item.key)}
  className={`
    group
    relative
    flex
    w-full
    items-center
    gap-4
    overflow-hidden
    rounded-2xl
    px-5
    py-4
    transition-all
    duration-300

    ${
      activeTab === item.key
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
        : "text-gray-300 hover:bg-[#1a2235] hover:text-white"
    }
  `}
>

  {activeTab === item.key && (
    <div
      className="
        absolute
        left-0
        top-2
        bottom-2
        w-1
        rounded-r-full
        bg-white
      "
    />
  )}

  <div
    className={`
      flex
      h-11
      w-11
      items-center
      justify-center
      rounded-xl
      transition-all

      ${
        activeTab === item.key
          ? "bg-white/20"
          : "bg-[#1f2937] group-hover:bg-indigo-500/20"
      }
    `}
  >
    {item.icon}
  </div>

  <span className="font-medium">
    {item.title}
  </span>

</button>          ))}

        </div>

        <div className="my-6 border-t border-border" />

<button
  onClick={handleLogout}
  className="
    flex
    w-full
    items-center
    gap-4
    rounded-2xl
    border
    border-red-500/40
    px-5
    py-4
    font-medium
    text-red-400
    transition-all
    duration-300
    hover:border-red-500
    hover:bg-red-500
    hover:text-white
  "
>

  <div
    className="
      flex
      h-11
      w-11
      items-center
      justify-center
      rounded-xl
      bg-red-500/10
    "
  >
    <FiLogOut />
  </div>

  Logout

</button>
      </div>
    </aside>
  );
};

export default ProfileSidebar;