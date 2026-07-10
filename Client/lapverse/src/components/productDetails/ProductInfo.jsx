import { useState } from "react";
import {
  FiCheckCircle,
  FiTruck,
  FiShield,
  FiRefreshCcw,
  FiHeart,
  FiShare2,
  FiStar,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

import QuantitySelector from "./QuantitySelector";

const ProductInfo = ({ product }) => {
  const [expanded, setExpanded] = useState(false);

  const originalPrice =
    product.discount > 0
      ? Math.round(product.price / (1 - product.discount / 100))
      : product.price;

  const description =
    product.description || "No description available.";

  const shouldCollapse = description.length > 180;

  const shortDescription = shouldCollapse
    ? description.substring(0, 180)
    : description;

  return (
    <div className="space-y-8">

      {/* Brand & Category */}

      <div className="flex flex-wrap items-center gap-3">

        <span className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
          {product.brand}
        </span>

        <span className="rounded-full border border-border px-4 py-1.5 text-sm">
          {product.category}
        </span>

      </div>

      {/* Product Title */}

      <div>

        <h1 className="text-4xl font-bold leading-tight">
          {product.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-4">

          <div className="flex items-center gap-1 text-yellow-500">

            <FiStar className="fill-yellow-500" />

            <span className="font-semibold">
              {Number(product.averageRating || 0).toFixed(1)}
            </span>

          </div>

          <span className="text-text-secondary">

            ({product.numReviews || 0} Reviews)

          </span>

        </div>

      </div>

      {/* Price */}

      <div className="border-y border-border py-6">

        <div className="flex flex-wrap items-end gap-4">

          <span className="text-5xl font-extrabold text-primary">

            Rs. {product.price.toLocaleString()}

          </span>

          {product.discount > 0 && (
            <>
              <span className="mb-2 text-2xl line-through text-gray-500">

                Rs. {originalPrice.toLocaleString()}

              </span>

              <span className="mb-2 rounded-full bg-red-600 px-4 py-1 text-sm font-semibold text-white">

                SAVE {product.discount}%

              </span>
            </>
          )}

        </div>

      </div>

      {/* Stock */}

      <div className="flex items-center gap-3">

        <FiCheckCircle
          className={`text-xl ${
            product.stock > 0
              ? "text-green-500"
              : "text-red-500"
          }`}
        />

        <span
          className={`font-semibold ${
            product.stock > 0
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {product.stock > 0
            ? `${product.stock} Items Available`
            : "Out of Stock"}
        </span>

      </div>

      {/* Description */}

      <div>

        <h3 className="mb-3 text-xl font-semibold">
          Description
        </h3>

        <p className="leading-8 text-text-secondary">

          {expanded
            ? description
            : shortDescription}

          {!expanded && shouldCollapse && "..."}

        </p>

        {shouldCollapse && (

          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 flex items-center gap-2 font-medium text-primary hover:underline"
          >

            {expanded ? "See Less" : "See More"}

            {expanded
              ? <FiChevronUp />
              : <FiChevronDown />}

          </button>

        )}

      </div>

      {/* Quantity */}

      <div>

        <h3 className="mb-4 text-lg font-semibold">

          Quantity

        </h3>

        <QuantitySelector
          max={product.stock}
        />

      </div>

      {/* Purchase Buttons */}

      <div className="grid gap-4 sm:grid-cols-2">

        <button
          disabled={product.stock === 0}
          className="
            rounded-2xl
            bg-primary
            py-4
            text-lg
            font-semibold
            text-white
            transition-all
            duration-300
            hover:scale-[1.02]
            hover:shadow-xl
            disabled:opacity-50
          "
        >

          Add To Cart

        </button>

        <button
          disabled={product.stock === 0}
          className="
            rounded-2xl
            border-2
            border-primary
            py-4
            text-lg
            font-semibold
            text-primary
            transition-all
            duration-300
            hover:bg-primary
            hover:text-white
            disabled:opacity-50
          "
        >

          Buy Now

        </button>

      </div>

      {/* Wishlist & Share */}

      <div className="grid grid-cols-2 gap-4">

        <button
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-2xl
            border
            border-border
            py-3
            transition
            hover:border-primary
            hover:text-primary
          "
        >

          <FiHeart />

          Wishlist

        </button>

        <button
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-2xl
            border
            border-border
            py-3
            transition
            hover:border-primary
            hover:text-primary
          "
        >

          <FiShare2 />

          Share

        </button>

      </div>

      {/* Services */}

      <div className="rounded-3xl border border-border bg-card p-6">

        <div className="space-y-6">

          <ServiceItem
            icon={<FiTruck />}
            title="Free Delivery"
            subtitle="Estimated delivery in 2–5 working days."
          />

          <ServiceItem
            icon={<FiShield />}
            title="Secure Payment"
            subtitle="SSL encrypted secure checkout."
          />

          <ServiceItem
            icon={<FiRefreshCcw />}
            title="Easy Returns"
            subtitle="7-day return policy."
          />

          <ServiceItem
            icon={<FiCheckCircle />}
            title="Official Warranty"
            subtitle="Covered by seller warranty."
          />

        </div>

      </div>

      {/* Seller */}

      <div className="rounded-3xl border border-border bg-card p-6">

        <h3 className="mb-5 text-lg font-semibold">

          Seller Information

        </h3>

        <div className="flex items-center justify-between">

          <div>

            <p className="font-semibold">

              {product.seller?.name || "LapVerse Official"}

            </p>

            <p className="text-sm text-text-secondary">

              Verified Seller

            </p>

          </div>

          <div className="flex items-center gap-1 text-yellow-500">

            <FiStar className="fill-yellow-500" />

            <span className="font-semibold">

              4.9

            </span>

          </div>

        </div>

      </div>

    </div>
  );
};

const ServiceItem = ({
  icon,
  title,
  subtitle,
}) => (
  <div className="flex items-start gap-4">

    <div className="mt-1 text-xl text-primary">
      {icon}
    </div>

    <div>

      <p className="font-semibold">
        {title}
      </p>

      <p className="text-sm text-text-secondary">
        {subtitle}
      </p>

    </div>

  </div>
);

export default ProductInfo;