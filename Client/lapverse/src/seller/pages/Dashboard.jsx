import {
  FiPackage,
  FiShoppingBag,
  FiDollarSign,
  FiClock,
  FiPlus,
  FiBarChart2,
  FiBox,
  FiArrowRight,
  FiUsers,
} from "react-icons/fi";
import {  useEffect, useState } from "react";

import DashboardStatCard from "../components/DashboardStatCard";
import QuickActionCard from "../components/QuickActionCard";
import { useNavigate } from "react-router-dom";
import { getSellerDashboard } from "../../services/sellerDashboardService";
import { useAuth } from "../../context/AuthContext";


const Dashboard = () => {

  const { user } = useAuth();
  const navigate = useNavigate();
const [dashboard, setDashboard] = useState(null);

const [loading, setLoading] = useState(true);

useEffect(() => {

    loadDashboard();

}, []);

const loadDashboard = async () => {

    try {

        setLoading(true);

        const data =
            await getSellerDashboard();

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

        <div className="py-24 text-center">

            Loading Dashboard...

        </div>


    );

}

const overview = dashboard?.overview;

return (
  <div
    className="
      min-h-screen
      space-y-10
      bg-transparent
      p-2
    "
  >
    {/* ================= HERO ================= */}

<section
  className="
    relative
    overflow-hidden
    rounded-[36px]
    border
    border-neutral-200
    bg-gradient-to-br
    from-white
    via-orange-50/40
    to-emerald-50/40
    shadow-xl
    shadow-black/5
  "
>
  {/* Decorative Blobs */}

  <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-emerald-100/70 blur-3xl" />

  <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-orange-100/70 blur-3xl" />

  <div className="absolute top-1/3 right-1/3 h-48 w-48 rounded-full bg-violet-100/60 blur-3xl" />

  {/* Grid */}

  <div
    className="
      relative
      grid
      gap-12
      p-12
      xl:grid-cols-[1.3fr_.7fr]
    "
  >
    {/* ====================================== */}
    {/* LEFT SIDE */}
    {/* ====================================== */}

    <div className="flex flex-col justify-between">

      {/* Greeting */}

      <div>

        <span
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-white
            px-5
            py-2
            text-sm
            font-semibold
            shadow-md
            shadow-black/5
            text-slate-500
          "
        >
          👋 Good{" "}
          {new Date().getHours() < 12
            ? "Morning"
            : new Date().getHours() < 17
            ? "Afternoon"
            : "Evening"}
        </span>

        <h1
          className="
            mt-8
            text-5xl
            font-black
            leading-tight
            tracking-tight
            text-neutral-900
          "
        >
          Welcome Back,
          <br />

          <span
            className="
              bg-gradient-to-r
              from-emerald-600
              via-orange-500
              to-violet-600
              bg-clip-text
              text-transparent
            "
          >
            {user?.name || "Seller"}
          </span>
        </h1>

        <p
          className="
            mt-6
            max-w-xl
            text-lg
            leading-8
            text-neutral-600
          "
        >
          Manage your inventory, monitor orders, and grow your business
          from one beautiful dashboard.
        </p>

      </div>

      {/* Quick Stats */}

      <div className="mt-12 flex flex-wrap gap-4">

        <div
          className="
            rounded-2xl
            bg-white
            px-6
            py-4
            shadow-md
          "
        >
          <p className="text-sm text-neutral-500">
            Products
          </p>

          <h2 className="mt-2 text-3xl font-black text-slate-500">
            {overview?.totalProducts ?? 0}
          </h2>

        </div>

        <div
          className="
            rounded-2xl
            bg-white
            px-6
            py-4
            shadow-md
          "
        >
          <p className="text-sm text-neutral-500">
            Orders
          </p>

          <h2 className="mt-2 text-3xl font-black text-slate-500">
            {overview?.totalOrders ?? 0}
          </h2>

        </div>

        <div
          className="
            rounded-2xl
            bg-white
            px-6
            py-4
            shadow-md
          "
        >
          <p className="text-sm text-neutral-500 ">
            Revenue
          </p>

          <h2 className="mt-2 text-3xl font-black text-slate-500">
            Rs {(overview?.totalRevenue ?? 0).toLocaleString()}
          </h2>

        </div>

      </div>

      {/* Buttons */}

      <div className="mt-10 flex flex-wrap gap-4">

        <button
          onClick={() => navigate("/seller/add-product")}
          className="
            rounded-2xl
            bg-gradient-to-r
            from-emerald-500
            to-emerald-600
            px-8
            py-4
            font-semibold
            text-white
            shadow-lg
            transition-all
            duration-300
            hover:-translate-y-1
          "
        >
          + Add Product
        </button>

        <button
          onClick={() => navigate("/seller/orders")}
          className="
            rounded-2xl
            border
            border-neutral-200
            bg-white
            px-8
            py-4
            font-semibold
            shadow-md
            transition-all
            duration-300
            hover:-translate-y-1
            text-slate-500
          "
        >
          View Orders
        </button>

      </div>

    </div>

<div className="flex items-center justify-center">

  <div
    className="
      w-full
      rounded-[32px]
      bg-white/90
      backdrop-blur-xl
      border
      border-neutral-200
      p-8
      shadow-xl
      shadow-black/5
    "
  >

    {/* Header */}

    <div className="flex items-center justify-between">

      <div>

        <p className="text-sm text-neutral-500">

          Store Performance

        </p>

        <h2 className="mt-2 text-2xl font-black text-slate-500">

          Overview

        </h2>

      </div>

      <div
        className="
          rounded-2xl
          bg-emerald-50
          px-4
          py-2
          font-semibold
          text-emerald-600
        "
      >

        Healthy

      </div>

    </div>

    {/* Metrics */}

    <div className="mt-8 grid grid-cols-2 gap-5">

      <div className="rounded-3xl bg-orange-50 p-5">

        <p className="text-sm text-neutral-500">

          Pending

        </p>

        <h3 className="mt-2 text-3xl font-black text-slate-400">

          {overview.pendingOrders}

        </h3>

      </div>

      <div className="rounded-3xl bg-violet-50 p-5">

        <p className="text-sm text-neutral-500">

          Completed

        </p>

        <h3 className="mt-2 text-3xl font-black text-slate-400">

          {overview.completedOrders}

        </h3>

      </div>

      <div className="rounded-3xl bg-rose-50 p-5">

        <p className="text-sm text-neutral-500">

          Low Stock

        </p>

        <h3 className="mt-2 text-3xl font-black text-slate-400">

          {overview.lowStockProducts}

        </h3>

      </div>

      <div className="rounded-3xl bg-amber-50 p-5">

        <p className="text-sm text-neutral-500">

          Out of Stock

        </p>

        <h3 className="mt-2 text-3xl font-black text-slate-400">

          {overview.outOfStockProducts}

        </h3>

      </div>

    </div>

    {/* Revenue */}

    <div
      className="
        mt-8
        rounded-[28px]
        bg-gradient-to-r
        from-emerald-50
        via-orange-50
        to-violet-50
        p-7
      "
    >

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-neutral-500">

            Total Revenue

          </p>

          <h2 className="mt-2 text-4xl font-black text-slate-500">

            Rs {(overview.totalRevenue || 0).toLocaleString()}

          </h2>

        </div>

        <div
          className="
            rounded-2xl
            bg-white
            px-5
            py-3
            shadow-md
          "
        >

          📈

        </div>

      </div>

    </div>

    {/* Seller Insight */}

    <div
      className="
        mt-8
        rounded-[28px]
        border
        border-neutral-200
        bg-neutral-50
        p-6
      "
    >

      <h3 className="font-bold text-lg text-slate-500">

        Seller Insight

      </h3>

      <p className="mt-4 leading-8 text-neutral-600">

        {overview.lowStockProducts > 0
          ? `You have ${overview.lowStockProducts} product(s) running low on stock. Restocking them soon can help avoid missed sales.`
          : overview.pendingOrders > 0
          ? `You have ${overview.pendingOrders} pending order(s) waiting for confirmation.`
          : "Everything looks great! Keep adding products to grow your store."}

      </p>

    </div>

  </div>

</div>
</div>
</section>    
      
      
      
      
      {/* ================= KPI ================= */}

<div
  className="
    grid
    gap-6
    md:grid-cols-2
    xl:grid-cols-4
  "
>
  <DashboardStatCard
    title="Products"
    value={overview?.totalProducts ?? 0}
    subtitle={`${overview?.lowStockProducts ?? 0} low stock`}
    icon={<FiPackage size={28} />}
    accent="emerald"
  />

  <DashboardStatCard
    title="Orders"
    value={overview?.totalOrders ?? 0}
    subtitle={`${overview?.pendingOrders ?? 0} pending`}
    icon={<FiShoppingBag size={28} />}
    accent="orange"
  />

  <DashboardStatCard
    title="Revenue"
    value={`Rs ${(overview?.totalRevenue ?? 0).toLocaleString()}`}
    subtitle={`${overview?.completedOrders ?? 0} delivered`}
    icon={<FiDollarSign size={28} />}
    accent="purple"
  />

  <DashboardStatCard
    title="Customers"
    value={overview?.totalCustomers ?? 0}
    subtitle="Unique Buyers"
    icon={<FiUsers size={28} />}
    accent="rose"
  />
</div>
      {/* ================= QUICK ACTIONS ================= */}

      <section>

        <div className="mb-6">

          <h2 className="text-2xl font-bold">

            Quick Actions

          </h2>

          <p className="mt-2 text-neutral-500">

            Manage your store faster.

          </p>

        </div>

        <div
          className="
          grid
          gap-6
          sm:grid-cols-2
          xl:grid-cols-4
        "
        >

<QuickActionCard
  icon={<FiPlus size={28} />}
  title="Add Product"
  description="Create a new listing"
  onClick={() => navigate("/seller/add-product")}
/>

<QuickActionCard
  icon={<FiBox size={28} />}
  title="Manage Products"
  description="View inventory"
  onClick={() => navigate("/seller/products")}
/>

<QuickActionCard
  icon={<FiShoppingBag size={28} />}
  title="Orders"
  description="Manage customer orders"
  onClick={() => navigate("/seller/orders")}
/>

<QuickActionCard
  icon={<FiBarChart2 size={28} />}
  title="Analytics"
  description="Business insights"
  onClick={() => navigate("/seller/analytics")}
/>
        </div>

      </section>

      {/* ================= TIP ================= */}

      <section
        className="
        rounded-[28px]
        border
        border-neutral-200
        bg-white
        p-8
        shadow-lg
        shadow-black/5
      "
      >

<div
  className="
    relative
    overflow-hidden
    rounded-[32px]
    border
    border-amber-200
    bg-gradient-to-r
    from-amber-50
    via-yellow-50
    to-orange-50
    p-8
    shadow-lg
    shadow-amber-100/40
  "
>

  {/* Decorative Glow */}

  <div
    className="
      pointer-events-none
      absolute
      -right-12
      -top-12
      h-40
      w-40
      rounded-full
      bg-amber-200/40
      blur-3xl
    "
  />

  <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

    {/* Left */}

    <div className="max-w-3xl">

      <span
        className="
          inline-flex
          items-center
          rounded-full
          bg-white/80
          px-4
          py-2
          text-sm
          font-semibold
          text-amber-700
          shadow-sm
        "
      >
        ✨ Seller Success Tip
      </span>

      <h2 className="mt-5 text-3xl font-black tracking-tight text-neutral-900">

        Better Listings Sell Faster

      </h2>

      <p className="mt-4 leading-8 text-neutral-600">

        Products with <strong>4–5 clear, high-quality images</strong>,
        complete specifications, and an accurate description receive
        significantly more views and buyer inquiries. Keep your listings
        updated and maintain competitive pricing to improve visibility.

      </p>

    </div>

    {/* Right */}

    <button
      className="
        flex
        items-center
        gap-3
        rounded-2xl
        bg-white
        px-7
        py-4
        font-semibold
        text-neutral-800
        shadow-md
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >

      Listing Guide

      <FiArrowRight
        className="
          transition-transform
          duration-300
          group-hover:translate-x-1
        "
      />

    </button>

  </div>

</div>
      </section>

    </div>

  );

};

export default Dashboard;