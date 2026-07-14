import { Link } from "react-router-dom";
import {
  FiTrash2,
  FiStar,
} from "react-icons/fi";

import placeholderImg from "../../assets/images/placeholderimg.png";
import CartQuantitySelector from "./CartQuantitySelector";
import { useCart } from "../../context/CartContext";

const CartItem = ({ item }) => {
  const { updateQuantity, removeProduct } = useCart();

  const product = item.product;

  if (!product) return null;

  const discountedPrice =
    product.price -
    (product.price * (product.discount || 0)) / 100;

  const handleIncrease = async () => {
    await updateQuantity(
      product._id,
      item.quantity + 1
    );
  };

  const handleDecrease = async () => {
    if (item.quantity === 1) return;

    await updateQuantity(
      product._id,
      item.quantity - 1
    );
  };

  const handleRemove = async () => {
    await removeProduct(product._id);
  };

  return (
    <div
      className="
        flex
        flex-col
        gap-6
        rounded-2xl
        border
        border-border
        bg-card
        p-5
        transition
        hover:border-primary/40
      "
    >
      <div className="flex gap-5">

        {/* Image */}

        <Link
          to={`/products/${product._id}`}
          className="
            flex
            h-36
            w-36
            shrink-0
            items-center
            justify-center
            overflow-hidden
            rounded-xl
            bg-white
            dark:bg-[#18181B]
          "
        >
          <img
            src={
              product.images?.[0]?.url ||
              placeholderImg
            }
            alt={product.title}
            className="
              h-[88%]
              w-[88%]
              object-contain
            "
          />
        </Link>

        {/* Product */}

        <div className="flex flex-1 flex-col">

          <p className="text-xs uppercase tracking-widest text-primary">

            {product.brand}

          </p>

          <Link
            to={`/products/${product._id}`}
            className="
              mt-2
              text-xl
              font-bold
              transition
              hover:text-primary
            "
          >
            {product.title}
          </Link>

          <p className="mt-2 text-text-secondary">

            {product.processor}

          </p>

          <p className="text-text-secondary">

            {product.ram} GB RAM •{" "}
            {product.storage} GB SSD

          </p>

          <div className="mt-3 flex items-center gap-2">

            <FiStar
              className="
                fill-yellow-400
                text-yellow-400
              "
            />

            <span>

              {Number(
                product.averageRating || 0
              ).toFixed(1)}

            </span>

            <span className="text-sm text-text-secondary">

              ({product.numReviews || 0})

            </span>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div
        className="
          flex
          flex-wrap
          items-center
          justify-between
          gap-5
          border-t
          border-border
          pt-5
        "
      >

        <CartQuantitySelector
          quantity={item.quantity}
          stock={product.stock}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
        />

        <div className="text-right">

          <p className="text-sm text-text-secondary">

            Item Total

          </p>

          <p className="text-2xl font-bold text-primary">

            Rs. {item.itemTotal.toLocaleString()}

          </p>

        </div>

        <button
          onClick={handleRemove}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-red-500
            px-4
            py-2
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
  );
};

export default CartItem;