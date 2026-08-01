import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import ProductPerformanceTable from "./ProductPerformanceTable";

const ProductPerformance = ({ products }) => {

  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState("revenue");

  const filteredProducts = useMemo(() => {

    let data = [...products];

    if (search.trim()) {

      const keyword = search.toLowerCase();

      data = data.filter((product) =>

        product.title.toLowerCase().includes(keyword) ||

        product.brand.toLowerCase().includes(keyword) ||

        product.model.toLowerCase().includes(keyword)

      );

    }

    switch (sortBy) {

      case "sold":

        data.sort((a, b) => b.sold - a.sold);

        break;

      case "rating":

        data.sort((a, b) => b.rating - a.rating);

        break;

      case "stock":

        data.sort((a, b) => a.stock - b.stock);

        break;

      case "name":

        data.sort((a, b) =>

          a.title.localeCompare(b.title)

        );

        break;

      default:

        data.sort((a, b) =>

          b.revenue - a.revenue

        );

    }

    return data;

  }, [products, search, sortBy]);

  return (

    <section className="space-y-6">

      <div>

        <h2 className="text-2xl font-bold text-[#0F3040]">

          Product Performance

        </h2>

        <p className="mt-2 text-[#464858]">

          Monitor how each product is performing.

        </p>

      </div>

      {/* Toolbar */}

      <div
        className="
        flex
        flex-col
        gap-4
        md:flex-row
        md:items-center
        md:justify-between
        "
      >

        {/* Search */}

        <div
          className="
          flex
          w-full
          items-center
          gap-3
          rounded-2xl
          border
          border-[#ECE7E4]
          bg-white
          px-5
          py-3
          shadow-sm
          md:max-w-md
          "
        >

          <FiSearch
            className="text-[#659287]"
          />

          <input

            type="text"

            placeholder="Search products..."

            value={search}

            onChange={(e) =>
              setSearch(e.target.value)
            }

            className="
            w-full
            bg-transparent
            outline-none
            "

          />

        </div>

        {/* Sort */}

        <select

          value={sortBy}

          onChange={(e) =>
            setSortBy(e.target.value)
          }

          className="
          rounded-2xl
          border
          border-[#ECE7E4]
          bg-white
          px-5
          py-3
          shadow-sm
          "

        >

          <option value="revenue">

            Revenue

          </option>

          <option value="sold">

            Units Sold

          </option>

          <option value="rating">

            Rating

          </option>

          <option value="stock">

            Stock

          </option>

          <option value="name">

            Alphabetical

          </option>

        </select>

      </div>

      <ProductPerformanceTable

        products={filteredProducts}

      />

    </section>

  );

};

export default ProductPerformance;