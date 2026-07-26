import { useLocation } from "react-router-dom";

import {
  FiBell,
  FiSearch,
} from "react-icons/fi";

import { useAuth } from "../../context/AuthContext";

const SellerNavbar = () => {

  const location = useLocation();

  const { user } = useAuth();

  const pageTitles = {

    "/seller":
      "Dashboard",

    "/seller/products":
      "Products",

    "/seller/add-product":
      "Add Product",

    "/seller/orders":
      "Orders",

    "/seller/reviews":
      "Reviews",

    "/seller/analytics":
      "Analytics",

    // "/seller/settings":
    //   "Settings",

  };

  const title =
    pageTitles[location.pathname] ||
    "Seller Workspace";

  return (

    <header
      className="
        flex
        items-center
        justify-between
        border-b
        border-border
        bg-card
        px-8
        py-5
      "
    >

      {/* Left */}

      <div>

        <h1
          className="
            text-2xl
            font-bold
          "
        >

          {title}

        </h1>

        <p
          className="
            mt-1
            text-sm
            text-text-secondary
          "
        >

          Welcome back,
          {" "}
          <span className="font-medium">

            {user?.name}

          </span>

        </p>

      </div>

      {/* Right */}

      <div
        className="
          flex
          items-center
          gap-5
        "
      >

        {/* Search */}

        <div
          className="
            hidden
            items-center
            gap-3
            rounded-2xl
            border
            border-border
            bg-background
            px-4
            py-3
            lg:flex
          "
        >

          <FiSearch
            className="text-gray-400"
          />

          <input

            placeholder="Search..."

            className="
              w-64
              bg-transparent
              text-sm
              outline-none
            "

          />

        </div>

        {/* Notification */}

        <button
          className="
            relative
            rounded-2xl
            border
            border-border
            p-3
            transition
            hover:bg-background
          "
        >

          <FiBell size={20} />

          <span
            className="
              absolute
              right-2
              top-2
              h-2.5
              w-2.5
              rounded-full
              bg-red-500
            "
          />

        </button>

        {/* Avatar */}

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <img

            src={
              user?.avatar?.url ||
              "/default-avatar.png"
            }

            alt="avatar"

            className="
              h-11
              w-11
              rounded-full
              object-cover
              border
              border-border
            "

          />

          <div
            className="
              hidden
              md:block
            "
          >

            <h3
              className="
                text-sm
                font-semibold
              "
            >

              {user?.name}

            </h3>

            <p
              className="
                text-xs
                text-text-secondary
              "
            >

              Seller

            </p>

          </div>

        </div>

      </div>

    </header>

  );

};

export default SellerNavbar;