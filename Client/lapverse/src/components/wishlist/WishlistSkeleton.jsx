const WishlistSkeleton = () => {
  return (
    <div className="space-y-6">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="
            animate-pulse
            rounded-3xl
            border
            border-border
            bg-card
            p-6
          "
        >
          <div className="flex flex-col gap-6 lg:flex-row">

            {/* Image */}

            <div className="h-44 w-full rounded-2xl bg-gray-700 lg:w-56" />

            {/* Content */}

            <div className="flex-1 space-y-4">

              <div className="h-4 w-24 rounded bg-gray-700" />

              <div className="h-8 w-3/4 rounded bg-gray-700" />

              <div className="h-4 w-full rounded bg-gray-700" />

              <div className="h-4 w-2/3 rounded bg-gray-700" />

              <div className="flex gap-3">

                <div className="h-8 w-28 rounded-full bg-gray-700" />

                <div className="h-8 w-28 rounded-full bg-gray-700" />

              </div>

            </div>

            {/* Right Side */}

            <div className="space-y-4 lg:w-64">

              <div className="h-8 w-36 rounded bg-gray-700" />

              <div className="h-12 rounded-xl bg-gray-700" />

              <div className="h-12 rounded-xl bg-gray-700" />

              <div className="h-12 rounded-xl bg-gray-700" />

            </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default WishlistSkeleton;