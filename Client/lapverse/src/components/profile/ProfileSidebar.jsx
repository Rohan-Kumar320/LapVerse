import {
  FiHome,
  FiPackage,
  FiHeart,
  FiMapPin,
  FiLock,
  FiSettings,
  FiLogOut,
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
            : "sticky top-24 w-80 max-h-[calc(100vh-7rem)]"
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

      <div
        className="
          relative
          overflow-hidden
          bg-gradient-to-br
          from-primary
          via-indigo-600
          to-blue-700
          p-8
          text-white
        "
      >
        <div
          className="
            absolute
            -right-10
            -top-10
            h-40
            w-40
            rounded-full
            bg-white/10
          "
        />

        <div
          className="
            relative
            flex
            flex-col
            items-center
          "
        >
          <img
            src={
              user?.avatar ||
              `https://ui-avatars.com/api/?background=ffffff&color=4f46e5&name=${encodeURIComponent(
                user?.name || "User"
              )}`
            }
            alt="avatar"
            className="
              h-24
              w-24
              rounded-full
              border-4
              border-white
              object-cover
              shadow-xl
            "
          />

          <h2 className="mt-5 text-xl font-bold">
            {user?.name}
          </h2>

          <p className="mt-1 text-sm text-white/80">
            {user?.email}
          </p>
        </div>
      </div>

      {/* Navigation */}

      <div className="p-4">

        <div className="space-y-2">

          {menu.map((item) => (
            <button
              key={item.key}
              onClick={() =>
                setActiveTab(item.key)
              }
              className={`
                flex
                w-full
                items-center
                gap-4
                rounded-2xl
                px-5
                py-4
                text-left
                transition-all
                duration-300

                ${
                  activeTab === item.key
                    ? "bg-primary text-white shadow-lg"
                    : "hover:bg-primary/10"
                }
              `}
            >
              <div
                className={`
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl

                  ${
                    activeTab === item.key
                      ? "bg-white/20"
                      : "bg-primary/10 text-primary"
                  }
                `}
              >
                {item.icon}
              </div>

              <span className="font-medium">
                {item.title}
              </span>
            </button>
          ))}

        </div>

        <div className="my-6 border-t border-border" />

        <button
          onClick={handleLogout}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-3
            rounded-2xl
            border
            border-red-500
            py-4
            font-semibold
            text-red-500
            transition-all
            duration-300
            hover:bg-red-500
            hover:text-white
          "
        >
          <FiLogOut />

          Logout
        </button>

      </div>
    </aside>
  );
};

export default ProfileSidebar;