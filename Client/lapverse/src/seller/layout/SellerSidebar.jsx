import { useState } from "react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  FiMenu,
  FiHome,
  FiPackage,
  FiPlusSquare,
  FiShoppingBag,
  FiStar,
  FiBarChart2,
  FiSettings,
  FiArrowLeft,
} from "react-icons/fi";

import { FaStore } from "react-icons/fa";

import { useSeller } from "../../context/SellerContext";

const SellerSidebar = () => {

  const navigate = useNavigate();

  const {
    changeMode,
  } = useSeller();

  const [collapsed, setCollapsed] =
    useState(false);

  const menuItems = [

    {
      title: "Dashboard",
      icon: <FiHome size={20} />,
      path: "/seller",
    },

    {
      title: "Products",
      icon: <FiPackage size={20} />,
      path: "/seller/products",
    },

    {
      title: "Add Product",
      icon: <FiPlusSquare size={20} />,
      path: "/seller/add-product",
    },

    {
      title: "Orders",
      icon: <FiShoppingBag size={20} />,
      path: "/seller/orders",
    },

    {
      title: "Reviews",
      icon: <FiStar size={20} />,
      path: "/seller/reviews",
    },

    {
      title: "Analytics",
      icon: <FiBarChart2 size={20} />,
      path: "/seller/analytics",
    },

    // {
    //   title: "Settings",
    //   icon: <FiSettings size={20} />,
    //   path: "/seller/settings",
    // },

  ];

  const handleBackToUser =
    async () => {

      await changeMode("user");

      navigate("/");

    };

  return (

    <aside
      className={`
        flex
        h-screen
        flex-col
        border-r
        border-border
        bg-card
        transition-all
        duration-300

        ${
          collapsed
            ? "w-24"
            : "w-72"
        }
      `}
    >

      {/* Logo */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-border
          p-6
        "
      >

        {!collapsed && (

          <div>

            <h1
              className="
                flex
                items-center
                gap-3
                text-xl
                font-bold
              "
            >

              <FaStore
                className="text-primary"
              />

              LapVerse

            </h1>

            <p
              className="
                mt-2
                text-xs
                text-text-secondary
              "
            >

              Seller Workspace

            </p>

          </div>

        )}

        <button

          onClick={() =>
            setCollapsed(
              !collapsed
            )
          }

          className="
            rounded-xl
            p-2
            transition
            hover:bg-background
          "

        >

          <FiMenu size={20} />

        </button>

      </div>

      {/* Navigation */}

      <nav
        className="
          flex-1
          space-y-2
          p-4
        "
      >

        {menuItems.map((item) => (

          <NavLink

            key={item.path}

            to={item.path}

            end={item.path === "/seller"}

            className={({ isActive }) => `
              flex
              items-center
              gap-4
              rounded-2xl
              px-4
              py-3
              transition

              ${
                isActive

                  ? "bg-primary text-white"

                  : "hover:bg-background"
              }
            `}

          >

            {item.icon}

            {!collapsed && (

              <span>

                {item.title}

              </span>

            )}

          </NavLink>

        ))}

      </nav>

      {/* Footer */}

      <div
        className="
          border-t
          border-border
          p-4
        "
      >

        <button

          onClick={handleBackToUser}

          className="
            flex
            w-full
            items-center
            gap-4
            rounded-2xl
            px-4
            py-3
            transition
            hover:bg-background
          "

        >

          <FiArrowLeft />

          {!collapsed && (

            <span>

              Back To User

            </span>

          )}

        </button>

      </div>

    </aside>

  );

};

export default SellerSidebar;