import { FiSearch } from "react-icons/fi";

const EmptyProducts = ({ clearFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card py-24 text-center">

      <div className="rounded-full bg-primary/10 p-5">

        <FiSearch
          size={40}
          className="text-primary"
        />

      </div>

      <h2 className="mt-8 text-3xl font-bold">

        No Products Found

      </h2>

      <p className="mt-3 max-w-md text-text-secondary">

        We couldn't find any laptops matching your search or filters.
        Try broadening your search or clearing the filters.

      </p>

      <button
        onClick={clearFilters}
        className="
          mt-8
          rounded-xl
          bg-primary
          px-6
          py-3
          text-white
          transition
          hover:opacity-90
        "
      >

        Clear Filters

      </button>

    </div>
  );
};

export default EmptyProducts;