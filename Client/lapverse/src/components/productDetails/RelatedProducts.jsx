import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight, FiArrowRight } from "react-icons/fi";
import { getProducts } from "../../services/productService";
import ProductCard from "../products/ProductCard";

const RelatedProducts = ({ product }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const sliderRef = useRef(null);

  useEffect(() => {
    if (product?._id) {
      fetchRelatedProducts();
    }
  }, [product]);

  const fetchRelatedProducts = async () => {
    try {
      setLoading(true);

      const data = await getProducts();

      const relatedProducts = data.products.filter(
        (item) =>
          item._id !== product._id &&
          (item.brand === product.brand ||
            item.category === product.category)
      );

      setProducts(relatedProducts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -420,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: 420,
      behavior: "smooth",
    });
  };

  return (
    <section className="mt-24">

      <div className="border-t border-border pt-16">

        {/* Header */}

        <div className="flex items-center justify-between mb-10">

          <div>

            <h2 className="text-3xl font-bold">
              You May Also Like
            </h2>

            <p className="mt-2 text-text-secondary">
              Similar laptops based on brand and category.
            </p>

          </div>

          <Link
            to="/products"
            className="
              hidden
              md:flex
              items-center
              gap-2
              text-primary
              font-semibold
              hover:gap-3
              transition-all
            "
          >
            View All

            <FiArrowRight />
          </Link>

        </div>

        {/* Loading */}

        {loading && (
          <div className="flex gap-6 overflow-hidden">

            {[...Array(4)].map((_, index) => (

              <div
                key={index}
                className="min-w-[300px] h-[430px] rounded-3xl bg-card animate-pulse"
              />

            ))}

          </div>
        )}

        {/* Empty */}

        {!loading && products.length === 0 && (

          <div className="rounded-3xl border border-border bg-card py-20 text-center">

            <h3 className="text-2xl font-semibold">
              No Similar Products Found
            </h3>

            <p className="mt-3 text-text-secondary">
              We'll recommend products here as our catalog grows.
            </p>

          </div>

        )}

        {/* Products */}

        {!loading && products.length > 0 && (

          <div className="relative">

            {/* Left Arrow */}

            <button
              onClick={scrollLeft}
              className="
                hidden
                lg:flex
                absolute
                -left-6
                top-1/2
                -translate-y-1/2
                z-20
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-card
                border
                border-border
                shadow-xl
                hover:bg-primary
                hover:text-white
                transition
              "
            >
              <FiChevronLeft size={24} />
            </button>

            {/* Slider */}

            <div
              ref={sliderRef}
              className="
                flex
                gap-6
                overflow-x-auto
                premium-scrollbar
                snap-x
                snap-mandatory
                scroll-smooth
                pb-4
              "
            >

              {products.map((item) => (

                <div
                  key={item._id}
                  className="
                    snap-start
                    flex-shrink-0
                    w-[280px]
                    sm:w-[300px]
                    lg:w-[320px]
                  "
                >

                  <ProductCard product={item} />

                </div>

              ))}

            </div>

            {/* Right Arrow */}

            <button
              onClick={scrollRight}
              className="
                hidden
                lg:flex
                absolute
                -right-6
                top-1/2
                -translate-y-1/2
                z-20
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-card
                border
                border-border
                shadow-xl
                hover:bg-primary
                hover:text-white
                transition
              "
            >
              <FiChevronRight size={24} />
            </button>

          </div>

        )}

        {/* Mobile View All */}

        <div className="mt-8 flex justify-center md:hidden">

          <Link
            to="/products"
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-primary
              px-6
              py-3
              text-primary
              font-semibold
              hover:bg-primary
              hover:text-white
              transition
            "
          >
            View All Products

            <FiArrowRight />

          </Link>

        </div>

      </div>

    </section>
  );
};

export default RelatedProducts;