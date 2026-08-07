import { useEffect, useState } from "react";
import DashboardStatCard from "../components/dashboard/DashboardStatCard";

import {
  FiUsers,
  FiUserCheck,
  FiPackage,
  FiShoppingBag,
  FiDollarSign,
  FiClock,
} from "react-icons/fi";
import adminApi from "../services/adminApi";
import RevenueChart from "../components/dashboard/RevenueChart";
import OrderStatusCard from "../components/dashboard/OrderStatusCard";
import RecentOrdersTable from "../components/dashboard/RecentOrdersTable";
import RecentUsersCard from "../components/dashboard/RecentUserCard";

const Dashboard = () => {

  const [loading, setLoading] = useState(true);

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

    try {

      const { data } = await adminApi.get(
        "/admin/dashboard"
      );

      setDashboard(data);

    }

    catch (error) {

      console.error(error);

    }

    finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <div
        className="
        flex
        h-[70vh]
        items-center
        justify-center
        text-slate-700
        text-xl
        font-semibold
      "
      >

        Loading Dashboard...

      </div>

    );

  }

  const overview =
    dashboard?.overview || {};

  return (

    <div
      className="
      space-y-8
      text-slate-800
    "
    >

      {/* Heading */}

      <div>

        <h1
          className="
          text-4xl
          font-black
          text-slate-900
        "
        >

          Marketplace Overview

        </h1>

        <p
          className="
          mt-2
          text-slate-500
        "
        >

          Real-time statistics of the entire marketplace.

        </p>

      </div>

      {/* Stats */}

      <div
        className="
        grid
        gap-6
        sm:grid-cols-2
        xl:grid-cols-3
      "
      >

        <DashboardStatCard
          title="Users"
          value={overview.totalUsers ?? 0}
          subtitle="Registered users"
          icon={<FiUsers size={28} />}
          accent="blue"
        />

        <DashboardStatCard
          title="Sellers"
          value={overview.totalSellers ?? 0}
          subtitle="Approved sellers"
          icon={<FiUserCheck size={28} />}
          accent="emerald"
        />

        <DashboardStatCard
          title="Products"
          value={overview.totalProducts ?? 0}
          subtitle="Products listed"
          icon={<FiPackage size={28} />}
          accent="orange"
        />

        <DashboardStatCard
          title="Orders"
          value={overview.totalOrders ?? 0}
          subtitle="Orders received"
          icon={<FiShoppingBag size={28} />}
          accent="violet"
        />

        <DashboardStatCard
          title="Revenue"
          value={`Rs ${(overview.totalRevenue ?? 0).toLocaleString()}`}
          subtitle="Marketplace revenue"
          icon={<FiDollarSign size={28} />}
          accent="emerald"
        />

        <DashboardStatCard
          title="Pending Orders"
          value={overview.pendingOrders ?? 0}
          subtitle="Awaiting Completion"
          icon={<FiClock size={28} />}
          accent="rose"
        />

      </div>
<div
  className="
  mt-8
  grid
  gap-6
  xl:grid-cols-3
"
>

  <div className="xl:col-span-2">

    <RevenueChart
      data={dashboard.revenueChart}
    />

  </div>

  <OrderStatusCard
    overview={dashboard.overview}
/>

<div
  className="
  mt-8
  grid
  gap-6
  xl:grid-cols-2
"
>

  <RecentOrdersTable
    orders={dashboard.recentOrders}
  />

  <RecentUsersCard
    users={dashboard.recentUsers}
  />

</div>

</div>

      

    </div>

  );

};

export default Dashboard;