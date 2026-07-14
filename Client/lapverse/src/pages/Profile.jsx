import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiMenu,
} from "react-icons/fi";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import Dashboard from "../components/profile/Dashboard";


const Profile = () => {
  const [activeTab, setActiveTab] =
    useState("dashboard");

  const [showMenu, setShowMenu] =
    useState(false);

    useEffect(() => {
  document.body.style.overflow =
    showMenu ? "hidden" : "auto";

  return () => {
    document.body.style.overflow =
      "auto";
  };
}, [showMenu]);

  return (
    <main className="min-h-screen bg-background">

      {/* Top Header */}

      <section className="border-b border-border bg-card">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6">

          <div>

            <Link
              to="/products"
              className="mb-3 inline-flex items-center gap-2 text-primary hover:underline"
            >
              <FiArrowLeft />

              Continue Shopping

            </Link>

            <h1 className="text-4xl font-bold">

              My Account

            </h1>

            <p className="mt-2 text-text-secondary">

              Manage your profile, orders, addresses,
              wishlist and account settings.

            </p>

          </div>

          {/* Mobile Menu */}

          <button
            onClick={() =>
              setShowMenu(true)
            }
            className="
              flex
              lg:hidden
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-card
              border
              border-border
            "
          >
            <FiMenu size={22} />
          </button>

        </div>

      </section>

      {/* Main */}

      <div className="mx-auto flex max-w-7xl gap-8 px-5 py-10">

        {/* Desktop Sidebar */}

        <div className="hidden lg:block">

          <ProfileSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

        </div>

        {/* Mobile Drawer */}

        {showMenu && (

<div
  className={`
    fixed
    inset-0
    z-[200]
    bg-black/60
    transition-opacity
    duration-300

    ${
      showMenu
        ? "visible opacity-100"
        : "invisible opacity-0"
    }
  `}
  onClick={() => setShowMenu(false)}
>

  <div
    onClick={(e) => e.stopPropagation()}
    className={`
      h-full
      w-80
      overflow-y-auto
      bg-card
      transition-transform
      duration-300

      ${
        showMenu
          ? "translate-x-0"
          : "-translate-x-full"
      }
    `}
  >

    <ProfileSidebar
      mobile
      activeTab={activeTab}
      setActiveTab={(tab) => {
        setActiveTab(tab);
        setShowMenu(false);
      }}
    />

  </div>

</div>
        )}

        {/* Content */}

        <section className="flex-1">

          {activeTab === "dashboard" && (
            <Dashboard />
          )}

          {/* We'll add the remaining tabs here */}

        </section>

      </div>

    </main>
  );
};

export default Profile;