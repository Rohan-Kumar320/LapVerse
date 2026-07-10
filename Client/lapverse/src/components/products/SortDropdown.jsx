import { FiChevronDown } from "react-icons/fi";

const SortDropdown = ({ sortBy, setSortBy }) => {
  return (
    <div className="relative">
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="
          appearance-none
          rounded-xl
          border
          border-border
          bg-card
          px-5
          py-3
          pr-10
          text-sm
          outline-none
          transition-all
          hover:border-primary
          focus:border-primary
          focus:ring-2
          focus:ring-primary/20
        "
      >
        <option value="latest">Newest</option>
        <option value="price-low">Price : Low to High</option>
        <option value="price-high">Price : High to Low</option>
        <option value="rating">Highest Rated</option>
        <option value="name">A - Z</option>
      </select>

      <FiChevronDown
        size={18}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary"
      />
    </div>
  );
};

export default SortDropdown;