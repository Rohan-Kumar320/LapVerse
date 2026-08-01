import { FiSearch, FiStar } from "react-icons/fi";

const ReviewFilters = ({
  search,
  setSearch,
  ratingFilter,
  setRatingFilter,
}) => {
  return (

    <div
      className="
      rounded-[28px]
      bg-white
      p-5
      shadow-sm
      "
    >

      <div
        className="
        flex
        flex-col
        gap-5
        lg:flex-row
        lg:items-center
        lg:justify-between
        "
      >

        {/* Search */}

        <div
          className="
          relative
          w-full
          lg:max-w-md
          "
        >

          <FiSearch
            className="
            absolute
            left-5
            top-1/2
            -translate-y-1/2
            text-[#A56F63]
            "
            size={20}
          />

          <input
            type="text"
            value={search}
            onChange={(e)=>
              setSearch(e.target.value)
            }
            placeholder="Search customer or product..."
            className="
            w-full
            rounded-2xl
            border
            border-[#E8E5E2]
            bg-[#FAFAFA]
            py-4
            pl-14
            pr-5
            outline-none
            transition-all
            duration-300
            text-slate-600
            focus:border-[#D99B7F]
            focus:bg-white
            focus:ring-4
            focus:ring-[#D99B7F]/20
            "
          />

        </div>

        {/* Rating Filter */}

        <div
          className="
          flex
          items-center
          gap-3
          "
        >

          <div
            className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-[#FFF6F1]
            "
          >

            <FiStar
              className="text-[#D99B7F]"
              size={20}
            />

          </div>

          <select

            value={ratingFilter}

            onChange={(e)=>
              setRatingFilter(
                e.target.value
              )
            }

            className="
            rounded-2xl
            border
            border-[#E8E5E2]
            bg-white
            px-5
            py-3
            font-medium
            text-[#0F3040]
            outline-none
            transition-all
            duration-300
            focus:border-[#A56F63]
            focus:ring-4
            focus:ring-[#A56F63]/15
            "

          >

            <option value="All">

              All Ratings

            </option>

            <option value="5">

              ⭐⭐⭐⭐⭐

            </option>

            <option value="4">

              ⭐⭐⭐⭐☆

            </option>

            <option value="3">

              ⭐⭐⭐☆☆

            </option>

            <option value="2">

              ⭐⭐☆☆☆

            </option>

            <option value="1">

              ⭐☆☆☆☆

            </option>

          </select>

        </div>

      </div>

    </div>

  );

};

export default ReviewFilters;