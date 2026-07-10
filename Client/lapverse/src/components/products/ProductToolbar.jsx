import { FiFilter, FiSearch, FiSliders } from "react-icons/fi";
import SortDropdown from "./SortDropdown";

const ProductToolbar = ({
  totalProducts,
  search,
  setSearch,
  sortBy,
  setSortBy,
  setShowFilters,
  setShowSort,
}) => {
  return (
    <div className="space-y-6">

      {/* Search */}

      <div className="relative">

        <FiSearch
          size={20}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-text-secondary"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search laptops, brands, processors..."
          className="
            w-full
            rounded-2xl
            border
            border-border
            bg-card
            py-4
            pl-14
            pr-5
            text-sm
            outline-none
            transition-all
            focus:border-primary
            focus:ring-4
            focus:ring-primary/10
          "
        />

      </div>

      {/* Bottom Row */}

      <div className="flex flex-wrap items-center justify-between gap-4">

        <div>

          <h3 className="text-xl font-semibold">
            {totalProducts} Products
          </h3>

          <p className="text-sm text-text-secondary">
            Browse our latest collection
          </p>

        </div>

        {/* Desktop */}

        <div className="hidden items-center gap-4 lg:flex">

          <SortDropdown
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

        </div>

        {/* Mobile */}

        <div className="flex gap-3 lg:hidden">

          <button
            onClick={() => setShowFilters(true)}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-border
              bg-card
              px-5
              py-3
              transition-all
              hover:border-primary
            "
          >
            <FiFilter />
            Filters
          </button>

          <button
            onClick={() => setShowSort(true)}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-border
              bg-card
              px-5
              py-3
              transition-all
              hover:border-primary
            "
          >
            <FiSliders />
            Sort
          </button>

        </div>

      </div>

    </div>
  );
};

export default ProductToolbar;