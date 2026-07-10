import { Link } from "react-router-dom";
import { FiHeart, FiStar, FiArrowRight } from "react-icons/fi";

import placeholderImg from "../../assets/images/placeholderimg.png";

const ProductCard = ({ product }) => {
  const discountedPrice =
    product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;

  const isNew =
    new Date(product.createdAt) >
    new Date(Date.now() - 1000 * 60 * 60 * 24 * 30);

  return (
    <article
      className="
        group
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-border
        bg-card
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-primary/50
        hover:shadow-2xl
      "
    >
      {/* Image */}

      <div
        className="
          relative
          flex
          h-52
          items-center
          justify-center
          overflow-hidden
          bg-white
          dark:bg-[#18181B]
        "
      >
        {/* Discount */}

        {product.discount > 0 && (
          <span
            className="
            z-1
              absolute
              left-3
              top-3
              rounded-full
              bg-red-600
              px-2.5
              py-1
              text-[11px]
              font-semibold
              text-white
            "
          >
            -{product.discount}%
          </span>
        )}

        {/* New */}

        {isNew && (
          <span
            className="
            z-1
              absolute
              left-3
              top-12
              rounded-full
              bg-green-600
              px-2.5
              py-1
              text-[11px]
              font-semibold
              text-white
            "
          >
            NEW
          </span>
        )}

        {/* Wishlist */}

        <button
          className="
          z-1
            absolute
            right-3
            top-3
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-black/70
            text-white
            transition
            hover:bg-pink-600
          "
        >
          <FiHeart size={16} />
        </button>

        {/* Product Image */}

        <img
          src={product.images?.[0]?.url || placeholderImg}
          alt={product.title}
          className="
            h-[88%]
            w-[92%]
            object-contain
            transition-transform
            duration-300
            group-hover:scale-105
          "
        />

      </div>

      {/* Content */}

      <div className="flex flex-1 flex-col p-4">

                {/* Brand */}

        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
          {product.brand}
        </p>

        {/* Title */}

        <h3
          className="
            mt-2
            min-h-[48px]
            text-lg
            font-bold
            leading-snug
            text-text-primary
            line-clamp-2
          "
        >
          {product.title}
        </h3>

        {/* Processor */}

        <p className="mt-3 text-sm text-text-secondary line-clamp-1">
          {product.processor}
        </p>

        {/* GPU */}

        <p className="mt-1 text-sm text-text-secondary line-clamp-1">
          {product.gpu}
        </p>

        {/* RAM & Storage */}

        <p className="mt-3 text-sm font-medium text-text-primary">
          {product.ram} GB RAM • {product.storage} GB SSD
        </p>

        {/* Rating */}

        <div className="mt-4 flex items-center justify-between">

          <div className="flex items-center gap-1">

            <FiStar
              className="fill-yellow-400 text-yellow-400"
              size={15}
            />

            <span className="text-sm font-medium">
              {Number(product.averageRating || 0).toFixed(1)}
            </span>

          </div>

          <span className="text-xs text-text-secondary">
            ({product.numReviews || 0} Reviews)
          </span>

        </div>

        {/* Price */}

        <div className="mt-5">

          <div className="flex items-center gap-2 flex-wrap">

            <span className="text-2xl font-extrabold text-primary">

              Rs. {Math.round(discountedPrice).toLocaleString()}

            </span>

            {product.discount > 0 && (

              <span className="text-sm line-through text-gray-500">

                Rs. {product.price.toLocaleString()}

              </span>

            )}

          </div>

        </div>

        {/* Button */}

        <div className="mt-auto pt-5">

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
              text-sm
              font-semibold
              text-primary
              transition-all
              duration-300
              hover:bg-primary
              hover:text-white
            "
          >
            View Details

            <FiArrowRight size={16} />

          </Link>

        </div>

      </div>

    </article>
  );
};

export default ProductCard;