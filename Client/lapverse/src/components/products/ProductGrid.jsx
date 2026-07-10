import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
        />
      ))}

    </div>
  );
};

export default ProductGrid;