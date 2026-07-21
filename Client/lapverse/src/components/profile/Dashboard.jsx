import {
  FiPackage,
  FiHeart,
  FiMapPin,
  FiCalendar,
} from "react-icons/fi";

import { useAuth } from "../../context/AuthContext";

import ProfileHeader from "./ProfileHeader";
import StatsCard from "./StatsCard";
import CompletionCard from "./CompleteCard";
import QuickActions from "./QuickActions";
import RecentOrders from "./RecentOrders";

const Dashboard = ({ setActiveTab }) => {
  const { user } = useAuth();

  // Temporary data
  // Will be replaced with API data later
  const hour = new Date().getHours();

const greeting =
  hour < 12
    ? "Good Morning"
    : hour < 18
    ? "Good Afternoon"
    : "Good Evening";

  const recentOrders = [];

  const totalOrders = 0;
  const wishlistCount = 0;
  const addressCount = 0;

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(
        "en-US",
        {
          month: "short",
          year: "numeric",
        }
      )
    : "--";

  return (
    <div className="mx-auto max-w-7xl space-y-8">

      {/* ====================================================== */}
      {/* Profile Header */}
      {/* ====================================================== */}

      <ProfileHeader user={user}  greeting={greeting} setActiveTab={setActiveTab} />

      {/* ====================================================== */}
      {/* Dashboard Overview */}
      {/* ====================================================== */}

      <section>

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-white">
              Dashboard Overview
            </h2>

            <p className="mt-1 text-gray-400">
              Here's a quick summary of your account.
            </p>

          </div>

        </div>

        <div
          className="
            grid
            grid-cols-1
            gap-6
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >

          <StatsCard
            title="Orders"
            value={totalOrders}
            subtitle="Start Shopping"
            icon={<FiPackage />}
            color="indigo"
            link="/profile/orders"
          />

          <StatsCard
            title="Wishlist"
            value={wishlistCount}
            subtitle="Products Saved"
            icon={<FiHeart />}
            color="pink"
            link="/wishlist"
          />

          <StatsCard
            title="Addresses"
            value={addressCount}
            subtitle="Manage Delivery"
            icon={<FiMapPin />}
            color="emerald"
            link="/profile/address"
          />

          <StatsCard
            title="Member Since"
            value={memberSince}
            subtitle="Trusted Member"
            icon={<FiCalendar />}
            color="amber"
          />

        </div>

      </section>

            {/* ====================================================== */}
      {/* Profile Completion & Quick Actions */}
      {/* ====================================================== */}

      <section>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* Profile Completion */}

          <div className="xl:col-span-2">

            <CompletionCard user={user} />

          </div>

          {/* Quick Actions */}

          <QuickActions setActiveTab={setActiveTab} />

        </div>

      </section>

      {/* ====================================================== */}
      {/* Recent Orders */}
      {/* ====================================================== */}

      <section>

        <RecentOrders
          orders={recentOrders}
        />

      </section>

    </div>
  );
};

export default Dashboard;