import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import {
  FiX,
  FiHome,
  FiMonitor,
  FiHeart,
  FiShoppingCart,
  FiPackage,
  FiUser,
  FiSettings,
  FiMapPin,
  FiLogOut,
  FiLogIn,
  FiUserPlus,
} from "react-icons/fi";

import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const DrawerItem = ({
  to,
  icon,
  title,
  badge,
  protectedRoute = false,
  isAuthenticated = false,
  setIsOpen,
}) => {
  const destination =
    protectedRoute && !isAuthenticated
      ? "/login"
      : to;

  return (
    <Link
      to={destination}
      onClick={() => setIsOpen(false)}
      className="
        group
        flex
        items-center
        justify-between
        rounded-2xl
        px-4
        py-3
        text-gray-300
        transition-all
        duration-300
        hover:bg-indigo-600
        hover:text-white
      "
    >
      <div className="flex items-center gap-4">

        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-[#1f2937]
            transition
            group-hover:bg-white/20
          "
        >
          {icon}
        </div>

        <span className="font-medium">
          {title}
        </span>

      </div>

      {badge > 0 && (
        <Badge value={badge} />
      )}
    </Link>
  );
};

const Badge = ({ value }) => (
  <span
    className="
      flex
      h-6
      min-w-[24px]
      items-center
      justify-center
      rounded-full
      bg-pink-600
      px-2
      text-xs
      font-bold
      text-white
    "
  >
    {value > 99 ? "99+" : value}
  </span>
)


const MobileDrawer = ({
  isOpen,
  setIsOpen,
}) => {
  const navigate = useNavigate();

  const { wishlistCount } =
    useWishlist();

  const { cartCount } =
    useCart();

  const {
    user,
    logout,
    isAuthenticated,
  } = useAuth();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener(
        "keydown",
        handleKeyDown
      );
    }

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isOpen, setIsOpen]);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  return (
    <>
      {/* Backdrop */}

      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-99 bg-black/70 backdrop-blur-sm transition-all duration-300 ${
          isOpen
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      />

      {/* Drawer */}

      <aside
        className={`fixed left-0 top-0 z-100 h-full w-80 overflow-y-auto bg-[#030712] shadow-2xl transition-transform duration-300 ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        {/* Header */}

        <div className="border-b border-gray-800 p-6">

          {isAuthenticated ? (

            <div className="flex items-center gap-4">

              <img
                src={
                  user?.avatar ||
                  `https://ui-avatars.com/api/?background=4f46e5&color=fff&name=${encodeURIComponent(
                    user?.name || "User"
                  )}`
                }
                alt="avatar"
                className="h-16 w-16 rounded-full border-2 border-indigo-500"
              />

              <div className="flex-1">

                <h2 className="font-bold text-white">
                  {user?.name}
                </h2>

                <p className="text-sm text-gray-400">
                  {user?.email}
                </p>

              </div>

              <button
                onClick={() =>
                  setIsOpen(false)
                }
                className="text-gray-400 hover:text-white"
              >
                <FiX size={26} />
              </button>

            </div>

          ) : (

            <>
              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-2xl font-bold text-white">
                    LapVerse
                  </h2>

                  <p className="text-sm text-gray-400">
                    Explore Beyond Limits
                  </p>

                </div>

                <button
                  onClick={() =>
                    setIsOpen(false)
                  }
                  className="text-gray-400 hover:text-white"
                >
                  <FiX size={26} />
                </button>

              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">

                <Link
                  to="/login"
                  onClick={() =>
                    setIsOpen(false)
                  }
                  className="flex items-center justify-center gap-2 rounded-xl border border-gray-700 py-3 text-white transition hover:border-indigo-500"
                >
                  <FiLogIn />

                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() =>
                    setIsOpen(false)
                  }
                  className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-white transition hover:bg-indigo-500"
                >
                  <FiUserPlus />

                  Register
                </Link>

              </div>

            </>
          )}

        </div>

        {/* Navigation */}

        <div className="mt-5 px-4 space-y-2">
                  {/* Main Navigation */}

        <DrawerItem
          to="/"
          icon={<FiHome />}
          title="Home"
          setIsOpen={setIsOpen}
        />

        <DrawerItem
          to="/products"
          icon={<FiMonitor />}
          title="Products"
          setIsOpen={setIsOpen}
        />

        <DrawerItem
          to="/wishlist"
          icon={<FiHeart />}
          title="Wishlist"
          badge={wishlistCount}
          protectedRoute
          isAuthenticated={isAuthenticated}
          setIsOpen={setIsOpen}
        />

        <DrawerItem
          to="/cart"
          icon={<FiShoppingCart />}
          title="Cart"
          badge={cartCount}
          protectedRoute
          isAuthenticated={isAuthenticated}
          setIsOpen={setIsOpen}
        />

        {isAuthenticated && (
          <>
            <div className="my-5 border-t border-gray-800" />

            <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
              My Account
            </p>

            <DrawerItem
              to="/profile"
              icon={<FiUser />}
              title="Profile"
              setIsOpen={setIsOpen}
            />

            <DrawerItem
              to="/orders"
              icon={<FiPackage />}
              title="My Orders"
              setIsOpen={setIsOpen}
            />

            <DrawerItem
              to="/profile/address"
              icon={<FiMapPin />}
              title="Saved Addresses"
              setIsOpen={setIsOpen}
            />

            <DrawerItem
              to="/profile/settings"
              icon={<FiSettings />}
              title="Account Settings"
              setIsOpen={setIsOpen}
            />
          </>
        )}

        <div className="my-5 border-t border-gray-800" />

        <div className="rounded-2xl bg-[#111827] p-4">

          <h3 className="font-semibold text-white">
            LapVerse
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-400">
            Discover premium laptops,
            accessories and unbeatable
            deals.
          </p>

        </div>

        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="
              mt-5
              mb-3
              flex
              w-full
              items-center
              justify-center
              gap-3
              rounded-2xl
              border
              border-red-500
              py-3
              font-semibold
              text-red-400
              transition-all
              duration-300
              hover:bg-red-500
              hover:text-white
            "
          >
            <FiLogOut />

            Logout
          </button>
        )}

      </div>

    </aside>

  </>
);
}
export default MobileDrawer