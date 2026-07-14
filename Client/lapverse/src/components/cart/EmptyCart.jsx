import { Link } from "react-router-dom";
import { FiShoppingCart, FiArrowRight } from "react-icons/fi";

const EmptyCart = () => {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-5">

      <div className="max-w-md text-center">

        <div
          className="
            mx-auto
            flex
            h-28
            w-28
            items-center
            justify-center
            rounded-full
            bg-primary/10
          "
        >
          <FiShoppingCart
            size={52}
            className="text-primary"
          />
        </div>

        <h2 className="mt-8 text-4xl font-bold">
          Your Cart is Empty
        </h2>

        <p className="mt-4 leading-7 text-text-secondary">
          Looks like you haven't added any laptops to
          your cart yet.
        </p>

        <Link
          to="/products"
          className="
            mt-10
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-primary
            px-8
            py-4
            font-semibold
            text-white
            transition
            duration-300
            hover:scale-105
          "
        >
          Continue Shopping

          <FiArrowRight size={18} />
        </Link>

      </div>

    </section>
  );
};

export default EmptyCart;