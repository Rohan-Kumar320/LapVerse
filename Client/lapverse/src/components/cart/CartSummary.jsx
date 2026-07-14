import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";


const CartSummary = ({ summary }) => {
  const delivery =
    summary.total > 50000 ? 0 : 250;

  const grandTotal =
    summary.total + delivery;

    const { cart } = useCart();
    const navigate = useNavigate();

  return (
    <div
      className="
        sticky
        top-28
        rounded-2xl
        border
        border-border
        bg-card
        p-6
      "
    >
      <h2 className="text-2xl font-bold">
        Order Summary
      </h2>

      <div className="mt-8 space-y-5">

        <div className="flex justify-between">
          <span className="text-text-secondary">
            Items
          </span>

          <span className="font-semibold">
            {summary.totalItems}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-text-secondary">
            Subtotal
          </span>

          <span className="font-semibold">
            Rs. {summary.subtotal.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-text-secondary">
            Discount
          </span>

          <span className="font-semibold text-green-500">
            - Rs. {summary.discount.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-text-secondary">
            Delivery
          </span>

          <span className="font-semibold">
            {delivery === 0
              ? "FREE"
              : `Rs. ${delivery}`}
          </span>
        </div>

        <hr className="border-border" />

        <div className="flex justify-between">

          <span className="text-lg font-bold">
            Total
          </span>

          <span className="text-2xl font-bold text-primary">
            Rs. {grandTotal.toLocaleString()}
          </span>

        </div>

      </div>

      <button
      onClick={() => navigate("/checkout")}
      disabled={cart.length === 0}
        className="
          mt-8
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-primary
          py-4
          font-semibold
          text-white
          transition
          duration-300
          hover:scale-[1.02]
        "
      >
        Proceed to Checkout

        <FiArrowRight />

      </button>

      <p className="mt-4 text-center text-xs text-text-secondary">
        Taxes calculated during checkout.
      </p>

    </div>
  );
};

export default CartSummary;