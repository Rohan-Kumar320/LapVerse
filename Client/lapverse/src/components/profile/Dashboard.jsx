import {
  FiPackage,
  FiHeart,
  FiShoppingCart,
  FiClock,
  FiMapPin,
  FiUser,
} from "react-icons/fi";
import DashboardHeader from "./DashboardHeader";
import StatCard from "./StatCard";
import QuickActionCard from "./QuickActionCard";
import RecentOrderCard from "./RecentOrderCard";


const Dashboard = () => {
  /*
    Temporary Data

    Will be replaced with API later
  */

  const recentOrders = [
    {
      _id: "6874abc1ff22345",
      status: "Pending",
      total: 215000,
      createdAt: new Date(),
    },
    {
      _id: "6874abc1ff22346",
      status: "Delivered",
      total: 148000,
      createdAt: new Date(),
    },
  ];

  return (
    <div className="space-y-8">

      <DashboardHeader />

      {/* Statistics */}

      <section>

        <div className="mb-5">

          <h2 className="text-2xl font-bold">

            Overview

          </h2>

        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="Orders"
            value="18"
            icon={<FiPackage />}
            color="from-indigo-500 to-indigo-700"
          />

          <StatCard
            title="Wishlist"
            value="8"
            icon={<FiHeart />}
            color="from-pink-500 to-rose-600"
          />

          <StatCard
            title="Cart"
            value="2"
            icon={<FiShoppingCart />}
            color="from-amber-500 to-orange-600"
          />

          <StatCard
            title="Pending"
            value="3"
            icon={<FiClock />}
            color="from-yellow-500 to-yellow-700"
          />

        </div>

      </section>

      {/* Quick Actions */}

      <section>

        <div className="mb-5">

          <h2 className="text-2xl font-bold">

            Quick Actions

          </h2>

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <QuickActionCard
            to="/orders"
            title="My Orders"
            subtitle="Track and manage all your orders."
            icon={<FiPackage />}
          />

          <QuickActionCard
            to="/profile"
            title="Edit Profile"
            subtitle="Update your personal information."
            icon={<FiUser />}
          />

          <QuickActionCard
            to="/profile/address"
            title="Saved Addresses"
            subtitle="Manage delivery addresses."
            icon={<FiMapPin />}
          />

          <QuickActionCard
            to="/wishlist"
            title="Wishlist"
            subtitle="Products you saved for later."
            icon={<FiHeart />}
          />

        </div>

      </section>

      {/* Recent Orders */}

      <section>

        <div className="mb-5 flex items-center justify-between">

          <h2 className="text-2xl font-bold">

            Recent Orders

          </h2>

        </div>

        <div className="space-y-5">

          {recentOrders.map((order) => (
            <RecentOrderCard
              key={order._id}
              order={order}
            />
          ))}

        </div>

      </section>

    </div>
  );
};

export default Dashboard;