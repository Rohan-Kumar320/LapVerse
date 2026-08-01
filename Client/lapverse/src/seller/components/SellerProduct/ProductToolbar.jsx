import { useEffect, useMemo, useState } from "react";
import {
  FiSearch,
  FiGrid,
  FiList,
  FiChevronDown,
} from "react-icons/fi";

const ProductToolbar = ({
  products,
  setFilteredProducts,
  view,
  setView,
}) => {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  //----------------------------------------

  const categories = useMemo(() => {

    return [
      "All",
      ...new Set(products.map((p) => p.category)),
    ];

  }, [products]);

  //----------------------------------------

  useEffect(() => {

    let list = [...products];

    //----------------------------------------
    // Search
    //----------------------------------------

    if (search.trim()) {

      const keyword = search.toLowerCase();

      list = list.filter((product) =>

        product.title?.toLowerCase().includes(keyword) ||

        product.brand?.toLowerCase().includes(keyword) ||

        product.model?.toLowerCase().includes(keyword)

      );

    }

    //----------------------------------------
    // Category
    //----------------------------------------

    if (category !== "All") {

      list = list.filter(

        (product) =>

          product.category === category

      );

    }

    //----------------------------------------
    // Sorting
    //----------------------------------------

    switch (sortBy) {

      case "Price Low":

        list.sort((a, b) => a.price - b.price);

        break;

      case "Price High":

        list.sort((a, b) => b.price - a.price);

        break;

      case "Stock":

        list.sort((a, b) => b.stock - a.stock);

        break;

      case "Oldest":

        list.sort(

          (a, b) =>

            new Date(a.createdAt) -

            new Date(b.createdAt)

        );

        break;

      default:

        list.sort(

          (a, b) =>

            new Date(b.createdAt) -

            new Date(a.createdAt)

        );

    }

    setFilteredProducts(list);

  }, [

    products,

    search,

    category,

    sortBy,

    setFilteredProducts,

  ]);

  //----------------------------------------

  return (

    <div

      className="

      rounded-3xl

      border

      border-border

      bg-card

      p-7

      shadow-sm

      "

    >

      {/* Search */}

      <div className="relative">

        <FiSearch

          className="

          absolute

          left-5

          top-1/2

          -translate-y-1/2

          text-lg

          text-text-secondary

          "

        />

        <input

          value={search}

          onChange={(e) =>

            setSearch(e.target.value)

          }

          placeholder="Search products, brand or model..."

          className="

          w-full

          rounded-2xl

          border

          border-border

          bg-background

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

      {/* Bottom Controls */}

      <div

        className="

        mt-7

        flex

        flex-col

        gap-6

        xl:flex-row

        xl:items-center

        xl:justify-between

        "

      >

        {/* Category Pills */}

        <div

          className="

          flex

          flex-wrap

          gap-3

          "

        >

          {categories.map((item) => (

            <button

              key={item}

              onClick={() =>

                setCategory(item)

              }

              className={`

                rounded-full

                px-5

                py-2.5

                text-sm

                font-semibold

                transition-all

                duration-200

                ${

                  category === item

                    ? "bg-primary text-white shadow-md"

                    : "border border-border bg-background hover:border-primary hover:text-primary"

                }

              `}

            >

              {item}

            </button>

          ))}

        </div>

        {/* Right Controls */}

        <div

          className="

          flex

          items-center

          gap-4

          "

        >

          {/* Sort */}

          <div className="relative">

            <select

              value={sortBy}

              onChange={(e) =>

                setSortBy(e.target.value)

              }

              className="

              appearance-none

              rounded-2xl

              border

              border-border

              bg-background

              px-5

              py-3

              pr-12

              text-sm

              outline-none

              transition

              focus:border-primary

              "

            >

              <option>Newest</option>

              <option>Oldest</option>

              <option>Price Low</option>

              <option>Price High</option>

              <option>Stock</option>

            </select>

            <FiChevronDown

              className="

              pointer-events-none

              absolute

              right-4

              top-1/2

              -translate-y-1/2

              text-text-secondary

              "

            />

          </div>

          {/* View Toggle */}

          <div

            className="

            flex

            overflow-hidden

            rounded-2xl

            border

            border-border

            bg-background

            "

          >

            <button

              onClick={() =>

                setView("grid")

              }

              className={`

                p-3

                transition

                ${

                  view === "grid"

                    ? "bg-primary text-white"

                    : "hover:bg-primary/10"

                }

              `}

            >

              <FiGrid size={20} />

            </button>

            <button

              onClick={() =>

                setView("list")

              }

              className={`

                p-3

                transition

                ${

                  view === "list"

                    ? "bg-primary text-white"

                    : "hover:bg-primary/10"

                }

              `}

            >

              <FiList size={20} />

            </button>

          </div>

        </div>

      </div>

    </div>

  );

};

export default ProductToolbar;