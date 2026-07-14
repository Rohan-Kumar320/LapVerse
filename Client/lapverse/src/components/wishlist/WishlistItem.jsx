import { Link } from "react-router-dom";
import {
  FiTrash2,
  FiShoppingCart,
  FiArrowRight,
  FiStar,
} from "react-icons/fi";

import placeholderImg from "../../assets/images/placeholderimg.png";
import { useWishlist } from "../../context/WishlistContext";

const WishlistItem = ({ item }) => {
  const { toggleWishlist } = useWishlist();

  const product = item.product;

  if (!product) return null;

  const discountedPrice =
    product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;

  return (
    <article
      className="
        rounded-3xl
        border
        border-border
        bg-card
        p-6
        transition-all
        duration-300
        hover:border-primary/40
        hover:shadow-xl
      "
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">

        {/* Image */}

        <Link
          to={`/products/${product._id}`}
          className="
            flex
            h-44
            w-full
            shrink-0
            items-center
            justify-center
            overflow-hidden
            rounded-2xl
            bg-white
            dark:bg-[#18181B]
            lg:w-56
          "
        >
          <img
            src={product.images?.[0]?.url || placeholderImg}
            alt={product.title}
            className="
              h-[90%]
              w-[90%]
              object-contain
              transition
              duration-300
              hover:scale-105
            "
          />
        </Link>

        {/* Details */}

        <div className="flex-1">

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            {product.brand}
          </p>

          <Link to={`/products/${product._id}`}>
            <h2 className="mt-2 text-2xl font-bold hover:text-primary transition">
              {product.title}
            </h2>
          </Link>

          <p className="mt-3 text-text-secondary">
            {product.processor}
          </p>

          <p className="mt-1 text-text-secondary">
            {product.gpu}
          </p>

          <div className="mt-4 flex flex-wrap gap-3">

            <span className="rounded-full bg-background px-3 py-1 text-sm">
              {product.ram} GB RAM
            </span>

            <span className="rounded-full bg-background px-3 py-1 text-sm">
              {product.storage} GB SSD
            </span>

          </div>

          <div className="mt-5 flex items-center gap-2">

            <FiStar className="fill-yellow-400 text-yellow-400" />

            <span className="font-medium">
              {Number(product.averageRating || 0).toFixed(1)}
            </span>

            <span className="text-sm text-text-secondary">
              ({product.numReviews || 0} Reviews)
            </span>

          </div>

        </div>

        {/* Price & Actions */}

        <div className="flex w-full flex-col gap-3 lg:w-64">

          <div>

            <p className="text-3xl font-bold text-primary">
              Rs. {Math.round(discountedPrice).toLocaleString()}
            </p>

            {product.discount > 0 && (
              <p className="text-sm text-gray-500 line-through">
                Rs. {product.price.toLocaleString()}
              </p>
            )}

          </div>

          <button
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-primary
              py-3
              font-semibold
              text-white
              transition
              hover:scale-[1.02]
            "
          >
            <FiShoppingCart />

            Add To Cart
          </button>

          <Link
            to={`/products/${product._id}`}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-primary
              py-3
              font-semibold
              text-primary
              transition
              hover:bg-primary
              hover:text-white
            "
          >
            View Product

            <FiArrowRight />
          </Link>

          <button
            onClick={() => toggleWishlist(product._id)}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-red-500
              py-3
              font-semibold
              text-red-500
              transition
              hover:bg-red-500
              hover:text-white
            "
          >
            <FiTrash2 />

            Remove
          </button>

        </div>

      </div>
    </article>
  );
};

export default WishlistItem;