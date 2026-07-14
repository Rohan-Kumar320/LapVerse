import { FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const DashboardHeader = () => {
  const { user } = useAuth();

  return (
    <div
      className="
        rounded-3xl
        border
        border-border
        bg-card
        p-8
        shadow-xl
      "
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <p className="text-text-secondary">

            Welcome back,

          </p>

          <h1 className="mt-2 text-4xl font-bold">

            {user?.name} 👋

          </h1>

          <p className="mt-4 max-w-xl leading-8 text-text-secondary">

            Manage your orders, addresses,
            wishlist and account settings
            from one place.

          </p>

        </div>

        <Link
          to="/products"
          className="
            inline-flex
            items-center
            gap-3
            rounded-2xl
            bg-primary
            px-7
            py-4
            font-semibold
            text-white
            transition
            hover:scale-105
          "
        >
          <FiShoppingBag />

          Continue Shopping

        </Link>

      </div>
    </div>
  );
};

export default DashboardHeader;