import { Link, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiPackage,
  FiHeart,
  FiShoppingCart,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import { useAuth } from "../../context/AuthContext";

const UserDropdown = ({ close }) => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    close();
    navigate("/");
  };

  return (
    <div
      className="
        absolute
        right-0
        mt-3
        w-72
        overflow-hidden
        rounded-2xl
        border
        border-gray-700
        bg-[#111827]
        shadow-2xl
        z-50
      "
    >
      {/* User Info */}

      <div className="border-b border-gray-700 p-5">

        <div className="flex items-center gap-4">

          <img
            src={
              user?.avatar ||
              `https://ui-avatars.com/api/?background=4f46e5&color=fff&name=${encodeURIComponent(
                user?.name || "User"
              )}`
            }
            alt="avatar"
            className="h-14 w-14 rounded-full"
          />

          <div>

            <h3 className="font-semibold text-white">
              {user?.name}
            </h3>

            <p className="text-sm text-gray-400">
              {user?.email}
            </p>

          </div>

        </div>

      </div>

      {/* Links */}

      <div className="py-2">

        <DropdownItem
          to="/profile"
          icon={<FiUser />}
          title="My Profile"
          close={close}
        />

        <DropdownItem
          to="/orders"
          icon={<FiPackage />}
          title="My Orders"
          close={close}
        />

        <DropdownItem
          to="/wishlist"
          icon={<FiHeart />}
          title="Wishlist"
          close={close}
        />

        <DropdownItem
          to="/cart"
          icon={<FiShoppingCart />}
          title="Cart"
          close={close}
        />

        <DropdownItem
          to="/profile/settings"
          icon={<FiSettings />}
          title="Account Settings"
          close={close}
        />

      </div>

      <div className="border-t border-gray-700 p-3">

        <button
          onClick={handleLogout}
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            text-red-400
            transition
            hover:bg-red-500
            hover:text-white
          "
        >
          <FiLogOut />

          Logout

        </button>

      </div>

    </div>
  );
};

const DropdownItem = ({
  to,
  icon,
  title,
  close,
}) => (
  <Link
    to={to}
    onClick={close}
    className="
      mx-2
      flex
      items-center
      gap-3
      rounded-xl
      px-4
      py-3
      text-gray-300
      transition
      hover:bg-indigo-600
      hover:text-white
    "
  >
    {icon}

    {title}
  </Link>
);

export default UserDropdown;