import { useCart } from "../context/CartContext";

import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import EmptyCart from "../components/cart/EmptyCart";
import CartSkeleton from "../components/cart/CartSkeleton";

const Cart = () => {
  const {
    cart,
    summary,
    loading,
  } = useCart();

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-12">
        <CartSkeleton />
      </main>
    );
  }

  if (!cart.length) {
    return <EmptyCart />;
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-12">

      <div className="mb-10">

        <h1 className="text-4xl font-bold">
          Shopping Cart
        </h1>

        <p className="mt-2 text-text-secondary">
          {summary.totalItems} Item
          {summary.totalItems !== 1 && "s"} in
          your cart
        </p>

      </div>

      <div
        className="
          grid
          gap-8
          lg:grid-cols-[1fr_360px]
        "
      >

        <div className="space-y-6">

          {cart.map((item) => (

            <CartItem
              key={item._id}
              item={item}
            />

          ))}

        </div>

        <CartSummary
          summary={summary}
        />

      </div>

    </main>
  );
};

export default Cart;