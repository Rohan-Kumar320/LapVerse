import {
  FiArrowRight,
  FiHeart,
  FiShoppingCart,
  FiStar,
} from "react-icons/fi";

import placeholderImg from "../../assets/images/placeholderimg.png";
import { Link } from "react-router-dom";

const ProfileWishlistCard = ({
  item,
  onMoveToCart,
  onRemove,
}) => {
  const product = item.product;

  if (!product) return null;

  const price =
    product.discount > 0
      ? product.price -
        (product.price * product.discount) / 100
      : product.price;

  return (
    <div
      className="
      rounded-3xl
      border
      border-border
      bg-card
      p-5
      transition
      hover:border-primary/40
      hover:shadow-xl
      "
    >
      <div className="flex gap-5">

        {/* Image */}

        <img
          src={
            product.images?.[0]?.url ||
            placeholderImg
          }
          alt={product.title}
          className="
          h-32
          w-32
          rounded-2xl
          border
          border-border
          object-contain
          bg-white
          p-2
          "
        />

        {/* Details */}

        <div className="flex flex-1 flex-col">

          <p className="text-sm font-semibold uppercase tracking-widest text-primary">

            {product.brand}

          </p>

          <h2 className="mt-1 text-xl font-bold">

            {product.title}

          </h2>

          <div className="mt-2 flex items-center gap-2 text-yellow-400">

            <FiStar className="fill-yellow-400" />

            <span className="font-medium text-white">

              {Number(
                product.averageRating || 0
              ).toFixed(1)}

            </span>

            <span className="text-sm text-text-secondary">

              ({product.numReviews || 0} Reviews)

            </span>

          </div>
          <div className="mt-3 flex flex-wrap gap-2">

  <span
    className={`
      rounded-full
      px-3
      py-1
      text-xs
      font-semibold

      ${
        product.stock > 0
          ? "bg-green-500/15 text-green-400"
          : "bg-red-500/15 text-red-400"
      }
    `}
  >
    {product.stock > 0
      ? "In Stock"
      : "Out of Stock"}
  </span>

  <span className="rounded-full bg-background px-3 py-1 text-xs">

    {product.category}

  </span>

</div>

          <div className="mt-4">

            <p className="text-2xl font-bold text-primary">

              Rs. {Math.round(price).toLocaleString()}

            </p>

            {product.discount > 0 && (

              <p className="text-sm line-through text-text-secondary">

                Rs. {product.price.toLocaleString()}

              </p>

            )}

          </div>

          {/* Buttons */}

          <div className="mt-6 flex flex-wrap gap-3">

            <button
              onClick={() =>
                onMoveToCart(product._id)
              }
              disabled={product.stock <= 0}
className="
flex
items-center
gap-2
rounded-xl
bg-primary
px-5
py-3
font-semibold
text-white
transition
hover:opacity-90
disabled:cursor-not-allowed
disabled:bg-gray-700
disabled:text-gray-400
"            >
              <FiShoppingCart />

              Move to Cart

            </button>

            <button
              onClick={() =>
                onRemove(product._id)
              }
              className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-red-500
              px-5
              py-3
              font-semibold
              text-red-500
              transition
              hover:bg-red-500
              hover:text-white
              "
            >
              <FiHeart />

              Remove

            </button>

            <Link
              to={`/products/${product._id}`}
              className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-primary
              px-5
              py-3
              font-semibold
              text-primary
              transition
              hover:bg-primary
              hover:text-white
              "
            >
              View

              <FiArrowRight />

            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProfileWishlistCard;