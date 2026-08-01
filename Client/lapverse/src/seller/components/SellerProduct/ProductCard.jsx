import {
  FiEdit2,
  FiTrash2,
  FiEye,
  FiPackage,
} from "react-icons/fi";

const ProductCard = ({
  //Product Grid has ProductCard
  product,
  onEdit,
  onDelete,
  onView,
}) => {

  const finalPrice =
    product.discount > 0
      ? product.price -
        (product.price * product.discount) / 100
      : product.price;

  return (

    <div
      className="
        group
        overflow-hidden
        rounded-3xl
        border
        border-border
        bg-card
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-2xl
      "
    >

      {/* Image */}

      <div className="relative overflow-hidden">

        <img

          src={

            product.images?.[0]?.url ||

            "https://placehold.co/600x400?text=No+Image"

          }

          alt={product.title}

          className="
            h-60
            w-full
            object-cover
            transition
            duration-500
            group-hover:scale-105
          "

        />

        {/* Condition */}

        <div
          className="
            absolute
            left-4
            top-4
            rounded-full
            bg-amber-900
            px-3
            py-1
            text-xs
            font-semibold
            backdrop-blur
          "
        >

          {product.condition}

        </div>

        {/* Discount */}

        {product.discount > 0 && (

          <div
            className="
              absolute
              right-4
              top-4
              rounded-full
              bg-red-500
              px-3
              py-1
              text-xs
              font-bold
              text-white
            "
          >

            -{product.discount}%

          </div>

        )}

      </div>

      {/* Body */}

      <div className="space-y-5 p-6">

        <div>

          <h3
            className="
              line-clamp-2
              text-lg
              font-bold
            "
          >

            {product.title}

          </h3>

          <p className="mt-2 text-sm text-text-secondary">

            {product.brand} • {product.model}

          </p>

        </div>

        {/* Category */}

        <span
          className="
            inline-block
            rounded-full
            bg-primary/10
            px-3
            py-1
            text-xs
            font-semibold
            text-emerald-500
          "
        >

          {product.category}

        </span>

        {/* Price */}

        <div>

          <div className="flex items-center gap-3">

            <span className="text-2xl font-bold text-mauve-500">

              Rs. {finalPrice.toLocaleString()}

            </span>

            {product.discount > 0 && (

              <span
                className="
                  text-sm
                  text-text-secondary
                  line-through
                "
              >

                Rs. {product.price.toLocaleString()}

              </span>

            )}

          </div>

        </div>

        {/* Stock */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">

            <FiPackage />

            <span className="text-sm">

              {product.stock} in stock

            </span>

          </div>

          <span
            className={`
              rounded-full
              px-3
              py-1
              text-xs
              font-semibold

              ${
                product.stock === 0

                  ? "bg-red-100 text-red-600"

                  : product.stock <= 5

                  ? "bg-orange-100 text-orange-600"

                  : "bg-green-100 text-green-600"
              }
            `}
          >

            {product.stock === 0

              ? "Sold Out"

              : product.stock <= 5

              ? "Low"

              : "Available"}

          </span>

        </div>

        {/* Actions */}

        <div className="grid grid-cols-3 gap-3">

          <button

            onClick={() => onView(product)}

            className="
              flex
              items-center
              justify-center
              rounded-2xl
              border
              border-border
              py-3
              transition
              hover:bg-background
            "

          >

            <FiEye />

          </button>

          <button

            onClick={() => onEdit(product)}

            className="
              flex
              items-center
              justify-center
              rounded-2xl
              bg-primary
              py-3
              text-white
              transition
              hover:opacity-90
            "

          >

            <FiEdit2 />

          </button>

          <button

            onClick={() => onDelete(product)}

            className="
              flex
              items-center
              justify-center
              rounded-2xl
              bg-red-500
              py-3
              text-white
              transition
              hover:opacity-90
            "

          >

            <FiTrash2 />

          </button>

        </div>

      </div>

    </div>

  );

};

export default ProductCard;