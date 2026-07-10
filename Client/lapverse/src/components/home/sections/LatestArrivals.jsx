import { useEffect, useState } from "react";

import ProductCard from "../../products/ProductCard";
import ProductCardSkeleton from "../../skeleton/ProductCardSkeleton";

import { getLatestProducts } from "../../../services/productService";

const LatestArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLatest();
  }, []);

  const loadLatest = async () => {
    try {
      const data = await getLatestProducts();
      setProducts(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-background">

      <div className="max-w-7xl mx-auto px-6">

        <div className="mb-12 text-center">

          <p className="text-primary uppercase tracking-[0.3em] text-sm">
            Fresh Stock
          </p>

          <h2 className="text-4xl font-bold">
            Latest Arrivals
          </h2>

        </div>

        {loading ? (

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

            {[...Array(8)].map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}

          </div>

        ) : (

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}

          </div>

        )}

      </div>

    </section>
  );
};

export default LatestArrivals;