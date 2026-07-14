import { Link } from "react-router-dom";
import { FiCheckCircle, FiShoppingBag } from "react-icons/fi";

const OrderSuccess = () => {
  return (
    <section className="max-w-4xl mx-auto px-5 py-20">

      <div className="rounded-3xl border border-border bg-card p-12 text-center">

        <FiCheckCircle
          className="mx-auto text-green-500"
          size={90}
        />

        <h1 className="mt-8 text-4xl font-bold">
          Order Placed Successfully!
        </h1>

        <p className="mt-4 text-lg text-text-secondary">
          Thank you for shopping with LapVerse.
          Your order has been received and is now
          waiting for confirmation.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">

          <Link
            to="/orders"
            className="
              rounded-2xl
              bg-primary
              px-8
              py-4
              font-semibold
              text-white
              transition
              hover:scale-105
            "
          >
            <span className="flex items-center gap-2">
              <FiShoppingBag />
              View My Orders
            </span>
          </Link>

          <Link
            to="/products"
            className="
              rounded-2xl
              border
              border-primary
              px-8
              py-4
              font-semibold
              text-primary
              transition
              hover:bg-primary
              hover:text-white
            "
          >
            Continue Shopping
          </Link>

        </div>

      </div>

    </section>
  );
};

export default OrderSuccess;