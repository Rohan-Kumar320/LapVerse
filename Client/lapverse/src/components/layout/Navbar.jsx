import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import MobileDrawer from "./MobileDrawer";
import {
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiSearch,
  FiMenu,
} from "react-icons/fi";
import logo from "../../assets/logo/lapverselogo.png";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isDrawerOpen]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-[#030712]/90 border-b border-gray-800">
      <div className="max-w-7xl mx-auto h-20 px-5 flex items-center justify-between">
        {/* Logo */}

        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="LapVerse"
            className="w-14 h-14 transition duration-300 group-hover:scale-110"
          />

          <div>
            <h1 className="text-2xl font-bold tracking-wide text-white">
              LapVerse
            </h1>

            <p className="text-xs text-gray-400 -mt-1">Explore Beyond Limits</p>
          </div>
        </Link>

        {/* Search */}

        <div className="hidden lg:flex w-full max-w-xl mx-10 relative">
          <input
            type="text"
            placeholder="Search laptops..."
            className="w-full rounded-full bg-[#111827] border border-gray-700 py-3 px-6 pr-12 text-white placeholder:text-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-600 outline-none transition"
          />

          <FiSearch
            size={20}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>

        {/* Desktop Menu */}

        <nav className="hidden lg:flex items-center gap-7 text-gray-300">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition font-medium ${
                isActive
                  ? "text-indigo-400"
                  : "text-gray-300 hover:text-indigo-400"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `transition font-medium ${
                isActive
                  ? "text-indigo-400"
                  : "text-gray-300 hover:text-indigo-400"
              }`
            }
          >
            Products
          </NavLink>

          <div className="relative cursor-pointer hover:text-pink-500 transition hover:scale-110">
            <FiHeart size={22} />
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-pink-600 text-xs text-white flex items-center justify-center font-semibold">
              1
            </span>
          </div>

          <div className="relative cursor-pointer hover:text-amber-400 transition hover:scale-110">
            <FiShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-amber-500 text-xs text-black flex items-center justify-center font-semibold">
              2
            </span>
          </div>

          <button className="hover:text-indigo-400 transition hover:scale-110">
            <FiUser size={22} />
          </button>
        </nav>

        {/* Mobile */}

        <div className="flex lg:hidden gap-4 text-white">
          <button onClick={() => setShowMobileSearch(!showMobileSearch)}>
            <FiSearch size={22} />
          </button>

          <div className="relative cursor-pointer hover:text-amber-400 transition hover:scale-110">
            <FiShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-amber-500 text-xs text-black flex items-center justify-center font-semibold">
              2
            </span>
          </div>

          <button onClick={() => setIsDrawerOpen(true)}>
            <FiMenu size={24} />
          </button>
        </div>
      </div>

      {/* For Mobile Search Bar */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          showMobileSearch ? "max-h-24 opacity-100 pb-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 relative">
          <input
            type="text"
            placeholder="Search laptops..."
            className="w-full rounded-full bg-[#111827] border border-gray-700 py-3 px-5 pr-12 text-white placeholder:text-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-600 outline-none"
          />

          <FiSearch
            size={20}
            className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      {/* For Mobile Drawer */}
      <MobileDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
    </header>
  );
};

export default Navbar;
