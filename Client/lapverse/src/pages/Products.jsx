import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Breadcrumb from "../components/common/Breadcrumb";
import ProductToolbar from "../components/products/ProductToolbar";
import ProductGrid from "../components/products/ProductGrid";
import FilterSidebar from "../components/products/FilterSidebar";
import EmptyProducts from "../components/products/EmptyProducts";
import ProductCardSkeleton from "../components/skeleton/ProductCardSkeleton";
import { getProducts } from "../services/productService";
import FilterDrawer from "../components/products/FilterDrawer";
import SortDrawer from "../components/products/SortDrawer";
import Pagination from "../components/products/Pagination";

const Products = () => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    brand: [],
    ram: [],
    storage: [],
    price: 500000,
  });

  const [sortBy, setSortBy] = useState("latest");

  const [showFilters, setShowFilters] = useState(false);

  const [showSort, setShowSort] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
  setCurrentPage(1);
}, [search, filters, sortBy]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const data = await getProducts();

      setProducts(data.products);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = [
      product.title || "",
      product.brand || "",
      product.processor || "",
      product.gpu || "",
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesBrand =
      filters.brand.length === 0 || filters.brand.includes(product.brand);

    const matchesRam =
      filters.ram.length === 0 || filters.ram.includes(product.ram);

    const matchesStorage =
      filters.storage.length === 0 || filters.storage.includes(product.storage);

    const matchesPrice = Number(product.price) <= filters.price;

    return (
      matchesSearch &&
      matchesBrand &&
      matchesRam &&
      matchesStorage &&
      matchesPrice
    );
  });

  const sortedProducts = [...filteredProducts];

  switch (sortBy) {
    case "price-low":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;

    case "price-high":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;

    case "rating":
      sortedProducts.sort(
        (a, b) => (b.averageRating || 0) - (a.averageRating || 0),
      );
      break;

    case "name":
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
      break;

    default:
      sortedProducts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
  }

  const productsPerPage = 9;

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;

  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  return (
    <>
      <Navbar />

      <FilterDrawer
        open={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        setFilters={setFilters}
      />

      <SortDrawer
        open={showSort}
        onClose={() => setShowSort(false)}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <main className="min-h-screen bg-background">
        {/* Hero */}

        <section className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="mx-auto max-w-7xl px-6 py-14">
            <Breadcrumb
              items={[
                {
                  label: "Home",
                  link: "/",
                },
                {
                  label: "Products",
                },
              ]}
            />

            <h1 className="mt-6 text-5xl font-bold tracking-tight">
              Explore Laptops
            </h1>

            <p className="mt-5 max-w-2xl text-lg text-text-secondary">
              Browse premium gaming, creator, student and business laptops from
              the world's leading brands.
            </p>
          </div>
        </section>

        {/* Products */}

        <section className="mx-auto max-w-7xl px-6 py-12">
          <ProductToolbar
            totalProducts={filteredProducts.length}
            search={search}
            setSearch={setSearch}
            sortBy={sortBy}
            setSortBy={setSortBy}
            setShowFilters={setShowFilters}
            setShowSort={setShowSort}
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-4">
            {/* Sidebar */}

            <aside className="hidden lg:block">
              <FilterSidebar filters={filters} setFilters={setFilters} />
            </aside>

            {/* Grid */}

            <div className="lg:col-span-3">
              {loading ? (
                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                  {[...Array(9)].map((_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))}
                </div>
              ) : error ? (
                <div className="rounded-3xl border border-red-300 bg-red-50 p-8 text-center text-red-600">
                  {error}
                </div>
              ) : filteredProducts.length === 0 ? (
                <EmptyProducts
                  clearFilters={() => {
                    setSearch("");

                    setFilters({
                      brand: [],
                      ram: [],
                      storage: [],
                      price: 500000,
                    });
                  }}
                />
              ) : (
                <>
                  <ProductGrid products={currentProducts} />

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                  />
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Products;
