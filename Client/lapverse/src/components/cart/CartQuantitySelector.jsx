import { FiMinus, FiPlus } from "react-icons/fi";

const CartQuantitySelector = ({
  quantity,
  stock,
  onIncrease,
  onDecrease,
}) => {
  return (
    <div
      className="
        inline-flex
        items-center
        overflow-hidden
        rounded-xl
        border
        border-border
      "
    >
      <button
        onClick={onDecrease}
        disabled={quantity <= 1}
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          transition
          hover:bg-primary
          hover:text-white
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        <FiMinus />
      </button>

      <div
        className="
          flex
          h-11
          w-12
          items-center
          justify-center
          border-x
          border-border
          font-semibold
        "
      >
        {quantity}
      </div>

      <button
        onClick={onIncrease}
        disabled={quantity >= stock}
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          transition
          hover:bg-primary
          hover:text-white
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        <FiPlus />
      </button>
    </div>
  );
};

export default CartQuantitySelector;