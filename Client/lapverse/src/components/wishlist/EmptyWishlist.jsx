import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";

const EmptyWishlist = () => {
  return (
    <div
      className="
        flex
        min-h-[60vh]
        flex-col
        items-center
        justify-center
        rounded-3xl
        border
        border-border
        bg-card
        px-6
        text-center
      "
    >
      {/* Icon */}

      <div
        className="
          flex
          h-24
          w-24
          items-center
          justify-center
          rounded-full
          bg-primary/10
        "
      >
        <FiHeart
          size={42}
          className="text-primary"
        />
      </div>

      {/* Heading */}

      <h2 className="mt-8 text-3xl font-bold">
        Your Wishlist is Empty
      </h2>

      {/* Description */}

      <p
        className="
          mt-4
          max-w-md
          leading-7
          text-text-secondary
        "
      >
        Save your favourite laptops to compare them later,
        track price drops, and purchase whenever you're
        ready.
      </p>

      {/* Button */}

      <Link
        to="/products"
        className="
          mt-10
          rounded-2xl
          bg-primary
          px-8
          py-4
          font-semibold
          text-white
          transition-all
          duration-300
          hover:scale-105
          hover:shadow-xl
        "
      >
        Browse Products
      </Link>
    </div>
  );
};

export default EmptyWishlist;