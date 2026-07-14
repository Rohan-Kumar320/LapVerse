import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const value = keyword.trim();

    if (!value) return;

    navigate(`/products?search=${encodeURIComponent(value)}`);

    setKeyword("");
  };

  return (
    <div className="border-t border-gray-800 bg-[#030712]/95 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-5 py-4">

        <form
          onSubmit={handleSubmit}
          className="relative"
        >
          <input
            type="text"
            value={keyword}
            onChange={(e) =>
              setKeyword(e.target.value)
            }
            placeholder="Search laptops..."
            className="
              w-full
              rounded-full
              border
              border-gray-700
              bg-[#111827]
              py-3
              pl-6
              pr-14
              text-white
              placeholder:text-gray-500
              outline-none
              transition
              focus:border-indigo-500
              focus:ring-2
              focus:ring-indigo-500
            "
          />

          <button
            type="submit"
            className="
              absolute
              right-5
              top-1/2
              -translate-y-1/2
              text-gray-400
              transition
              hover:text-indigo-400
            "
          >
            <FiSearch size={20} />
          </button>

        </form>

      </div>
    </div>
  );
};

export default SearchBar;