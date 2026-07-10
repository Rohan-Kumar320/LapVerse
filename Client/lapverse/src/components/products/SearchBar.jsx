import { FiSearch } from "react-icons/fi";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative">

      <input
        type="text"
        placeholder="Search laptops..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-border bg-surface py-4 pl-14 pr-5 outline-none focus:border-primary"
      />

      <FiSearch
        className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
        size={20}
      />

    </div>
  );
};

export default SearchBar;