import { useState } from "react";
import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  FiBell,
  FiChevronDown,
  FiHome,
  FiUser,
  FiLogOut,
} from "react-icons/fi";

const titles = {
  "/admin": "Dashboard",
  "/admin/users": "Users",
  "/admin/sellers": "Seller Applications",
  "/admin/products": "Products",
  "/admin/orders": "Orders",
  "/admin/categories": "Categories",
  "/admin/reports": "Reports",
  "/admin/settings": "Settings",
};

const AdminNavbar = () => {

  const location = useLocation();

  const [showProfile, setShowProfile] = useState(false);

  const [showNotification, setShowNotification] =
    useState(false);

  const pageTitle =
    titles[location.pathname] ||
    "Admin Panel";

  const breadcrumbs =
    location.pathname
      .split("/")
      .filter(Boolean);

  return (

    <header
      className="
      sticky
      top-0
      z-30
      border-b
      border-slate-200
      bg-white/90
      backdrop-blur-xl
      px-6
      py-5
    "
    >

      <div
        className="
        flex
        items-center
        justify-between
      "
      >

        {/* Left */}

        <div>

          {/* Breadcrumb */}

          <div
            className="
            mb-2
            flex
            flex-wrap
            items-center
            gap-2
            text-sm
            text-slate-500
          "
          >

            <Link
              to="/admin"
              className="
              flex
              items-center
              gap-1
              hover:text-blue-600
            "
            >

              <FiHome size={14} />

              Dashboard

            </Link>

            {

              breadcrumbs
                .slice(1)
                .map((item, index) => (

                  <div
                    key={index}
                    className="
                    flex
                    items-center
                    gap-2
                  "
                  >

                    <span>/</span>

                    <span className="capitalize">

                      {item.replaceAll("-", " ")}

                    </span>

                  </div>

                ))

            }

          </div>

          <h1
            className="
            text-3xl
            font-black
            text-slate-800
          "
          >

            {pageTitle}

          </h1>

        </div>

        {/* Right */}

        <div
          className="
          flex
          items-center
          gap-5
        "
        >

          {/* Notification */}

          <div className="relative">

            <button

              onClick={() =>
                setShowNotification(
                  !showNotification
                )
              }

              className="
              relative
              rounded-2xl
              border
              border-slate-200
              p-3
              transition
              hover:bg-blue-50
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

            {

              showNotification && (

                <div
                  className="
                  absolute
                  right-0
                  mt-3
                  w-72
                  rounded-3xl
                  border
                  border-slate-200
                  bg-white
                  p-5
                  shadow-xl
                "
                >

                  <h3
                    className="
                    text-lg
                    font-bold
                  "
                  >

                    Notifications

                  </h3>

                  <p
                    className="
                    mt-3
                    text-sm
                    text-slate-500
                  "
                  >

                    🚀 Notification system is
                    coming soon.

                  </p>

                </div>

              )

            }

          </div>

          {/* Profile */}

          <div className="relative">

            <button

              onClick={() =>
                setShowProfile(
                  !showProfile
                )
              }

              className="
              flex
              items-center
              gap-3
            "

            >

              <img

                src="/default-avatar.png"

                alt="Admin"

                className="
                h-12
                w-12
                rounded-full
                border
                border-slate-200
              "

              />

              <div
                className="
                hidden
                text-left
                md:block
              "
              >

                <h3
                  className="
                  font-semibold
                  text-slate-800
                "
                >

                  Administrator

                </h3>

                <p
                  className="
                  text-xs
                  text-slate-500
                "
                >

                  Super Admin

                </p>

              </div>

              <FiChevronDown />

            </button>

            {

              showProfile && (

                <div
                  className="
                  absolute
                  right-0
                  mt-3
                  w-56
                  overflow-hidden
                  rounded-3xl
                  border
                  border-slate-200
                  bg-white
                  shadow-xl
                "
                >

                  <button
                    className="
                    flex
                    w-full
                    items-center
                    gap-3
                    px-5
                    py-4
                    hover:bg-slate-50
                  "
                  >

                    <FiUser />

                    Profile

                  </button>

                  <button
                    className="
                    flex
                    w-full
                    items-center
                    gap-3
                    px-5
                    py-4
                    text-red-500
                    hover:bg-red-50
                  "
                  >

                    <FiLogOut />

                    Logout

                  </button>

                </div>

              )

            }

          </div>

        </div>

      </div>

    </header>

  );

};

export default AdminNavbar;