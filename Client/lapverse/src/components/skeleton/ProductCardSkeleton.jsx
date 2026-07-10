const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse rounded-3xl overflow-hidden bg-surface border border-border">

      <div className="h-60 bg-card"></div>

      <div className="p-5 space-y-4">

        <div className="h-4 rounded bg-card w-20"></div>

        <div className="h-6 rounded bg-card w-full"></div>

        <div className="h-4 rounded bg-card w-2/3"></div>

        <div className="h-8 rounded bg-card w-32"></div>

      </div>

    </div>
  );
};

export default ProductCardSkeleton;