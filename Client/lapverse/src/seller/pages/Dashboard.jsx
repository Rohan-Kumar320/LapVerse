import {
  FiPackage,
  FiShoppingBag,
  FiDollarSign,
  FiClock,
} from "react-icons/fi";

import StatCard from "../components/StatCard";

const Dashboard = () => {

  return (

    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold">

          Seller Dashboard

        </h1>

        <p className="mt-2 text-text-secondary">

          Here's what's happening with your store today.

        </p>

      </div>

      {/* Statistics */}

      <div
        className="
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-4
        "
      >

        <StatCard

          title="Products"

          value={28}

          subtitle="Active Listings"

          icon={<FiPackage size={28} />}

          color="bg-blue-600"

        />

        <StatCard

          title="Orders"

          value={14}

          subtitle="Today's Orders"

          icon={<FiShoppingBag size={28} />}

          color="bg-green-600"

        />

        <StatCard

          title="Revenue"

          value={126540}

          subtitle="PKR"

          icon={<FiDollarSign size={28} />}

          color="bg-purple-600"

        />

        <StatCard

          title="Pending"

          value={6}

          subtitle="Need Processing"

          icon={<FiClock size={28} />}

          color="bg-orange-500"

        />

      </div>

      {/* Placeholder Sections */}

      <div
        className="
          grid
          gap-6
          xl:grid-cols-3
        "
      >

        {/* Sales */}

        <div
          className="
            col-span-2
            rounded-3xl
            border
            border-border
            bg-card
            p-8
          "
        >

          <h2 className="text-xl font-bold">

            Sales Overview

          </h2>

          <div
            className="
              mt-8
              flex
              h-80
              items-center
              justify-center
              rounded-2xl
              border
              border-dashed
              border-border
              text-text-secondary
            "
          >

            Sales Chart Coming Soon

          </div>

        </div>

        {/* Quick Actions */}

        <div
          className="
            rounded-3xl
            border
            border-border
            bg-card
            p-8
          "
        >

          <h2 className="text-xl font-bold">

            Quick Actions

          </h2>

          <div className="mt-8 space-y-4">

            <button
              className="
                w-full
                rounded-2xl
                bg-primary
                py-3
                font-semibold
                text-white
              "
            >

              Add Product

            </button>

            <button
              className="
                w-full
                rounded-2xl
                border
                border-border
                py-3
              "
            >

              View Orders

            </button>

            <button
              className="
                w-full
                rounded-2xl
                border
                border-border
                py-3
              "
            >

              Store Analytics

            </button>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Dashboard;