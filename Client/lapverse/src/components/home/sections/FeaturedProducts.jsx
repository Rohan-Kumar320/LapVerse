import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../../services/productService";
import ProductCard from "../../products/ProductCard";
import ProductCardSkeleton from "../../skeleton/ProductCardSkeleton";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const data = await getProducts();

      setProducts(data.products.slice(0, 8));
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-background">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="flex items-center justify-between mb-12">

          <div>
            <p className="text-primary font-semibold uppercase tracking-widest">
              Featured Collection
            </p>

            <h2 className="text-4xl font-bold mt-2">
              Featured Products
            </h2>
          </div>

          <Link
            to="/products"
            className="hidden md:block rounded-full border border-border px-6 py-3 hover:bg-primary hover:text-white transition"
          >
            View All
          </Link>

        </div>

        {/* STEP 5 - Loading */}
        {loading && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        )}

        {/* STEP 6 - Error */}
        {!loading && error && (
          <div className="text-center text-danger text-lg">
            {error}
          </div>
        )}

        {/* STEP 7 - Products */}
        {!loading && !error && (
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

export default FeaturedProducts;