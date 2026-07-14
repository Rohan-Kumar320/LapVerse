const CartSkeleton = () => {
  return (
    <div className="animate-pulse space-y-5">

      {[1, 2, 3].map((item) => (

        <div
          key={item}
          className="
            flex
            gap-5
            rounded-2xl
            border
            border-border
            bg-card
            p-5
          "
        >

          <div className="h-32 w-32 rounded-xl bg-gray-700" />

          <div className="flex-1 space-y-4">

            <div className="h-6 w-2/3 rounded bg-gray-700" />

            <div className="h-4 w-40 rounded bg-gray-700" />

            <div className="h-4 w-28 rounded bg-gray-700" />

            <div className="mt-8 h-10 w-32 rounded bg-gray-700" />

          </div>

        </div>

      ))}

    </div>
  );
};

export default CartSkeleton;