import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";

const QuantitySelector = ({
  max = 99,
  onChange,
}) => {
  const [quantity, setQuantity] = useState(1);

  const increase = () => {
    if (quantity >= max) return;

    const value = quantity + 1;

    setQuantity(value);

    if (onChange) {
      onChange(value);
    }
  };

  const decrease = () => {
    if (quantity <= 1) return;

    const value = quantity - 1;

    setQuantity(value);

    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="inline-flex items-center rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
<button
  onClick={decrease}
  disabled={quantity <= 1}
  className="
    flex h-12 w-12 items-center justify-center
    transition
    hover:bg-primary hover:text-white
    disabled:opacity-40
    disabled:cursor-not-allowed
  "
>
  <FiMinus />
</button>

      <div className="flex h-12 min-w-[70px] items-center justify-center border-x border-border text-lg font-semibold">
        {quantity}
      </div>

<button
  onClick={increase}
  disabled={quantity >= max}
  className="
    flex h-12 w-12 items-center justify-center
    transition
    hover:bg-primary hover:text-white
    disabled:opacity-40
    disabled:cursor-not-allowed
  "
>
  <FiPlus />
</button>


    </div>
  );
};

export default QuantitySelector;