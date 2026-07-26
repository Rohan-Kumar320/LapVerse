import {
  FiEdit2,
  FiEye,
  FiTrash2,
} from "react-icons/fi";

const SellerProductCard = ({
  product,
}) => {

  return (

    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-border
        bg-card
        shadow-sm
        transition
        hover:-translate-y-1
        hover:shadow-lg
      "
    >

      {/* Product Image */}

      <div
        className="
          aspect-square
          overflow-hidden
          bg-background
        "
      >

        <img

          src={
            product.images?.[0]?.url ||
            "/placeholder-product.png"
          }

          alt={product.title}

          className="
            h-full
            w-full
            object-cover
          "

        />

      </div>

      {/* Body */}

      <div className="p-5">

        {/* Status */}

<span
  className={`
    rounded-full
    px-3
    py-1
    text-xs
    font-semibold

    ${
      product.status === "Available"

        ? "bg-green-500/10 text-green-500"

        : product.status === "Reserved"

        ? "bg-yellow-500/10 text-yellow-500"

        : "bg-red-500/10 text-red-500"
    }
  `}
>

  {product.status}

</span>
        <h3
          className="
            mt-4
            line-clamp-2
            text-lg
            font-bold
          "
        >

          {product.title}

        </h3>

        <p
          className="
            mt-2
            text-text-secondary
          "
        >

          PKR {product.price?.toLocaleString()}

        </p>
        <p className="mt-2 text-sm text-text-secondary">

  Stock: {product.stock}

</p>

        {/* Footer */}

        <div
          className="
            mt-6
            flex
            justify-between
          "
        >

          <button
            className="
              rounded-xl
              p-3
              transition
              hover:bg-background
            "
          >

            <FiEye size={20} />

          </button>

          <button
            className="
              rounded-xl
              p-3
              transition
              hover:bg-background
            "
          >

            <FiEdit2 size={20} />

          </button>

          <button
            className="
              rounded-xl
              p-3
              text-red-500
              transition
              hover:bg-red-500/10
            "
          >

            <FiTrash2 size={20} />

          </button>

        </div>

      </div>

    </div>

  );

};

export default SellerProductCard;