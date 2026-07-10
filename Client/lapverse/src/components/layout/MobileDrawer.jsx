import { Link } from "react-router-dom";
import { useEffect } from "react";
import {
  FiX,
  FiHome,
  FiMonitor,
  FiHeart,
  FiShoppingCart,
  FiPackage,
  FiUser,
  FiLogIn,
} from "react-icons/fi";

const MobileDrawer = ({ isOpen, setIsOpen }) => {
    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        window.addEventListener("keydown", handleKeyDown);
      }

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOpen, setIsOpen]);
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300 z-40
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-[#030712] border-r border-gray-800 shadow-2xl z-50
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}

        <div className="flex items-center justify-between p-5 border-b border-gray-800">

          <div>

            <h2 className="text-white text-2xl font-bold">
              LapVerse
            </h2>

            <p className="text-gray-400 text-sm">
              Explore Beyond Limits
            </p>

          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            <FiX size={26} />
          </button>

        </div>

        {/* Links */}

        <nav className="flex flex-col mt-6 bg-black opacity-80">

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
            setIsOpen={setIsOpen}
          />

          <DrawerItem
            to="/cart"
            icon={<FiShoppingCart />}
            title="Cart"
            setIsOpen={setIsOpen}
          />

          <DrawerItem
            to="/orders"
            icon={<FiPackage />}
            title="Orders"
            setIsOpen={setIsOpen}
          />

          <DrawerItem
            to="/profile"
            icon={<FiUser />}
            title="Profile"
            setIsOpen={setIsOpen}
          />

          <DrawerItem
            to="/login"
            icon={<FiLogIn />}
            title="Login"
            setIsOpen={setIsOpen}
          />

        </nav>
      </aside>
    </>
  );
};

const DrawerItem = ({ to, icon, title, setIsOpen }) => (
  <Link
    to={to}
    onClick={() => setIsOpen(false)}
    className="flex items-center gap-4 mx-3 my-1 rounded-xl px-5 py-4 text-gray-300 hover:bg-indigo-600 hover:text-white transition-all duration-300"
  >
    <span className="text-xl">{icon}</span>
    <span>{title}</span>
  </Link>
);

export default MobileDrawer;