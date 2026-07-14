// import { Link, NavLink } from "react-router-dom";
// import { useState, useEffect } from "react";

// import {
//   FiHeart,
//   FiShoppingCart,
//   FiSearch,
//   FiMenu,
//   FiLogIn,
//   FiUserPlus,
// } from "react-icons/fi";

// import logo from "../../assets/logo/lapverselogo.png";

// import MobileDrawer from "./MobileDrawer";
// import UserDropdown from "./UserDropdown";

// import { useWishlist } from "../../context/WishlistContext";
// import { useCart } from "../../context/CartContext";
// import { useAuth } from "../../context/AuthContext";

// const Navbar = () => {
// const [isDrawerOpen, setIsDrawerOpen] = useState(false);

// const [showMobileSearch, setShowMobileSearch] =
//   useState(false);

// const { wishlistCount } = useWishlist();

// const { cartCount } = useCart();

// const { isAuthenticated } = useAuth();

//   useEffect(() => {
//     document.body.style.overflow = isDrawerOpen ? "hidden" : "auto";

//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isDrawerOpen]);

//   return (
//     <header className="sticky top-0 z-50 backdrop-blur-lg bg-[#030712]/90 border-b border-gray-800">
//       <div className="max-w-7xl mx-auto h-20 px-5 flex items-center justify-between">
//         {/* Logo */}

//         <Link to="/" className="flex items-center gap-3 group">
//           <img
//             src={logo}
//             alt="LapVerse"
//             className="w-14 h-14 transition duration-300 group-hover:scale-110"
//           />

//           <div>
//             <h1 className="text-2xl font-bold tracking-wide text-white">
//               LapVerse
//             </h1>

//             <p className="text-xs text-gray-400 -mt-1">Explore Beyond Limits</p>
//           </div>
//         </Link>

//         {/* Search */}

//         <div className="hidden lg:flex w-full max-w-xl mx-10 relative">
//           <input
//             type="text"
//             placeholder="Search laptops..."
//             className="w-full rounded-full bg-[#111827] border border-gray-700 py-3 px-6 pr-12 text-white placeholder:text-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-600 outline-none transition"
//           />

//           <FiSearch
//             size={20}
//             className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
//           />
//         </div>

//         {/* Desktop Menu */}

// <nav className="hidden lg:flex items-center justify-end gap-7 min-w-[340px]">
//   <NavLink
//     to="/"
//     className={({ isActive }) =>
//       isActive
//         ? "text-indigo-400 font-medium"
//         : "font-medium hover:text-indigo-400 transition"
//     }
//   >
//     Home
//   </NavLink>

//   <NavLink
//     to="/products"
//     className={({ isActive }) =>
//       isActive
//         ? "text-indigo-400 font-medium"
//         : "font-medium hover:text-indigo-400 transition"
//     }
//   >
//     Products
//   </NavLink>

//   {/* Wishlist */}

//   <Link
//     to={
//       isAuthenticated
//         ? "/wishlist"
//         : "/login"
//     }
//     className="relative hover:text-pink-500 transition"
//   >
//     <FiHeart size={22} />

//     {wishlistCount > 0 && (
//       <span
//         className="
//           absolute
//           -top-2
//           -right-2
//           flex
//           h-5
//           w-5
//           items-center
//           justify-center
//           rounded-full
//           bg-pink-600
//           text-[10px]
//           font-bold
//           text-white
//         "
//       >
//         {wishlistCount}
//       </span>
//     )}
//   </Link>

//   {/* Cart */}

//   <Link
//     to={
//       isAuthenticated
//         ? "/cart"
//         : "/login"
//     }
//     className="relative hover:text-amber-400 transition"
//   >
//     <FiShoppingCart size={22} />

//     {cartCount > 0 && (
//       <span
//         className="
//           absolute
//           -top-2
//           -right-2
//           flex
//           h-5
//           w-5
//           items-center
//           justify-center
//           rounded-full
//           bg-amber-500
//           text-[10px]
//           font-bold
//           text-black
//         "
//       >
//         {cartCount}
//       </span>
//     )}
//   </Link>

//   {/* User */}

//   {isAuthenticated ? (
//     <UserDropdown />
//   ) : (
//     <div className="flex items-center gap-3">

//       <Link
//         to="/login"
//         className="
//           flex
//           items-center
//           gap-2
//           rounded-xl
//           border
//           border-gray-700
//           px-4
//           py-2
//           transition
//           hover:border-indigo-500
//         "
//       >
//         <FiLogIn />

//         Login
//       </Link>

//       <Link
//         to="/register"
//         className="
//           flex
//           items-center
//           gap-2
//           rounded-xl
//           bg-indigo-600
//           px-4
//           py-2
//           font-medium
//           text-white
//           transition
//           hover:bg-indigo-500
//         "
//       >
//         <FiUserPlus />

//         Register
//       </Link>

//     </div>
//   )}

// </nav>
//         {/* Mobile */}

// <div className="flex lg:hidden items-center gap-4 text-white">

//   <button
//     onClick={() =>
//       setShowMobileSearch(
//         !showMobileSearch
//       )
//     }
//   >
//     <FiSearch size={22} />
//   </button>

//   <Link
//     to={
//       isAuthenticated
//         ? "/cart"
//         : "/login"
//     }
//     className="relative"
//   >
//     <FiShoppingCart size={22} />

//     {cartCount > 0 && (
//       <span
//         className="
//           absolute
//           -top-2
//           -right-2
//           flex
//           h-5
//           w-5
//           items-center
//           justify-center
//           rounded-full
//           bg-amber-500
//           text-[10px]
//           font-bold
//           text-black
//         "
//       >
//         {cartCount}
//       </span>
//     )}
//   </Link>

//   <button
//     onClick={() =>
//       setIsDrawerOpen(true)
//     }
//   >
//     <FiMenu size={24} />
//   </button>

// </div>
//       </div>

//       {/* For Mobile Search Bar */}
//       <div
//         className={`lg:hidden overflow-hidden transition-all duration-300 ${
//           showMobileSearch ? "max-h-24 opacity-100 pb-4" : "max-h-0 opacity-0"
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-5 relative">
//           <input
//             type="text"
//             placeholder="Search laptops..."
//             className="w-full rounded-full bg-[#111827] border border-gray-700 py-3 px-5 pr-12 text-white placeholder:text-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-600 outline-none"
//           />

//           <FiSearch
//             size={20}
//             className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400"
//           />
//         </div>
//       </div>

//       {/* For Mobile Drawer */}
//       <MobileDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
//     </header>
//   );
// };

// export default Navbar;


// new code starts here

import { Link, NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import {
  FiHeart,
  FiShoppingCart,
  FiSearch,
  FiMenu,
  FiLogIn,
  FiUserPlus,
} from "react-icons/fi";

import logo from "../../assets/logo/lapverselogo.png";

import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

import MobileDrawer from "./MobileDrawer";
import UserDropdown from "./UserDropdown";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { wishlistCount } = useWishlist();
  const { cartCount } = useCart();

  const {
    user,
    isAuthenticated,
  } = useAuth();

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [showSearch, setShowSearch] =
    useState(false);

  const [showUserMenu, setShowUserMenu] =
    useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow =
      drawerOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [drawerOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handler
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handler
      );
  }, []);

  return (
    <>
    <header className="sticky top-0 z-50 bg-[#030712]/90 backdrop-blur-xl border-b border-gray-800">

      <div className="max-w-7xl mx-auto h-20 px-5 flex items-center justify-between">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3 shrink-0"
        >
          <img
            src={logo}
            alt="LapVerse"
            className="w-14 h-14"
          />

          <div>

            <h1 className="text-2xl font-bold text-white">

              LapVerse

            </h1>

            <p className="text-xs text-gray-400">

              Explore Beyond Limits

            </p>

          </div>

        </Link>

        {/* Desktop Navigation */}

        <nav className="hidden lg:flex items-center gap-7">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-400 font-semibold"
                : "text-gray-300 hover:text-indigo-400 transition"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-400 font-semibold"
                : "text-gray-300 hover:text-indigo-400 transition"
            }
          >
            Products
          </NavLink>

          {/* Search */}

          <button
            onClick={() =>
              setShowSearch(!showSearch)
            }
            className="hover:text-indigo-400 transition"
          >
            <FiSearch size={22} />
          </button>

          {/* Wishlist */}

          <Link
            to={
              isAuthenticated
                ? "/wishlist"
                : "/login"
            }
            className="relative hover:text-pink-500 transition"
          >
            <FiHeart size={22} />

            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-pink-600 text-white text-[10px] flex items-center justify-center">

                {wishlistCount}

              </span>
            )}

          </Link>
                    {/* Cart */}

          <Link
            to={isAuthenticated ? "/cart" : "/login"}
            className="relative hover:text-amber-400 transition"
          >
            <FiShoppingCart size={22} />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-black">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Guest Buttons */}

          {!isAuthenticated ? (
            <div className="flex items-center gap-3">

              <Link
                to="/login"
                className="flex items-center gap-2 rounded-xl border border-gray-700 px-4 py-2 transition hover:border-indigo-500 hover:text-indigo-400"
              >
                <FiLogIn />
                Login
              </Link>

              <Link
                to="/register"
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-500"
              >
                <FiUserPlus />
                Register
              </Link>

            </div>
          ) : (

<div
  ref={dropdownRef}
  className="relative"
>
  <button
    onClick={() =>
      setShowUserMenu(!showUserMenu)
    }
    className="
      group
      flex
      items-center
      gap-3
      rounded-full
      border
      border-gray-700
      bg-[#111827]
      px-2
      py-2
      transition-all
      duration-300
      hover:border-indigo-500
      hover:bg-[#1a2235]
      hover:shadow-lg
      hover:shadow-indigo-500/20
    "
  >
    <img
      src={
        user?.avatar ||
        `https://ui-avatars.com/api/?background=4f46e5&color=fff&name=${encodeURIComponent(
          user?.name || "User"
        )}`
      }
      alt="avatar"
      className="
        h-11
        w-11
        rounded-full
        object-cover
        border-2
        border-indigo-500
      "
    />

    <div className="hidden xl:block text-left">

      <p className="max-w-[130px] truncate text-sm font-semibold text-white">

        {user?.name}

      </p>

      <p className="text-xs text-gray-400">
        Manage Account
      </p>

    </div>

    <svg
      className={`
        h-4
        w-4
        text-gray-400
        transition-transform
        duration-300
        ${showUserMenu ? "rotate-180" : ""}
      `}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 9l-7 7-7-7"
      />
    </svg>

  </button>

  {showUserMenu && (
    <UserDropdown
      close={() =>
        setShowUserMenu(false)
      }
    />
  )}

</div>
          )}

        </nav>

        {/* Mobile */}

        <div className="flex lg:hidden items-center gap-5">

          <button
            onClick={() =>
              setShowSearch(!showSearch)
            }
          >
            <FiSearch size={22} />
          </button>

          <Link
            to={
              isAuthenticated
                ? "/cart"
                : "/login"
            }
            className="relative"
          >
            <FiShoppingCart size={22} />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-black">
                {cartCount}
              </span>
            )}

          </Link>

          <button
            onClick={() =>
              setDrawerOpen(true)
            }
          >
            <FiMenu size={24} />
          </button>

        </div>

      </div>

      {/* Expandable Search */}

      {showSearch && (
        <SearchBar />
      )}


    </header>
      <MobileDrawer
        isOpen={drawerOpen}
        setIsOpen={setDrawerOpen}
      />
    </>
  );
};

export default Navbar;