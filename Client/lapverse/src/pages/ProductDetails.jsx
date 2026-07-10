import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Breadcrumb from "../components/common/Breadcrumb";

import ProductGallery from "../components/productDetails/ProductGallery";
import ProductInfo from "../components/productDetails/ProductInfo";
import ProductSpecs from "../components/productDetails/ProductSpecs";
import ReviewSummary from "../components/productDetails/ReviewSummary";

import ProductCardSkeleton from "../components/skeleton/ProductCardSkeleton";

import { getProductById } from "../services/productService";
import RelatedProducts from "../components/productDetails/RelatedProducts";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const data = await getProductById(id);

      setProduct(data.product);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load product.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="max-w-7xl mx-auto py-20 px-6">
          <ProductCardSkeleton />
        </div>

        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
          {error}
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background">
        <section className="max-w-7xl mx-auto px-6 py-10">
          <Breadcrumb
            items={[
              {
                label: "Home",
                link: "/",
              },
              {
                label: "Products",
                link: "/products",
              },
              {
                label: product.title,
              },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            {/* Sticky Gallery */}

            <div className="lg:sticky lg:top-28 self-start">
              <ProductGallery product={product} />
            </div>

            {/* Product Information */}

            <div>
              <ProductInfo product={product} />
            </div>
          </div>

          <div className="mt-16">
            <ProductSpecs product={product} />
          </div>

          <div className="mt-16">
            <ReviewSummary product={product} />
          </div>

          <div className="mt-20">
            <RelatedProducts product={product} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ProductDetails;