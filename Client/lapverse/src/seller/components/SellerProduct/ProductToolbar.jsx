import { useEffect, useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiGrid,
  FiList,
} from "react-icons/fi";

const ProductToolbar = ({
  products,
  setFilteredProducts,
}) => {

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("Newest");

  //----------------------------------------------------

  useEffect(() => {

    let list = [...products];

    // Search

    if (search.trim()) {

      list = list.filter((product) => {

        const keyword =
          search.toLowerCase();

        return (

          product.title
            ?.toLowerCase()
            .includes(keyword) ||

          product.brand
            ?.toLowerCase()
            .includes(keyword) ||

          product.model
            ?.toLowerCase()
            .includes(keyword)

        );

      });

    }

    // Category

    if (category !== "All") {

      list = list.filter(

        (product) =>
          product.category ===
          category

      );

    }

    // Sorting

    switch (sortBy) {

      case "Price Low":

        list.sort(
          (a, b) =>
            a.price - b.price
        );

        break;

      case "Price High":

        list.sort(
          (a, b) =>
            b.price - a.price
        );

        break;

      case "Stock":

        list.sort(
          (a, b) =>
            b.stock - a.stock
        );

        break;

      case "Oldest":

        list.sort(

          (a, b) =>

            new Date(
              a.createdAt
            ) -

            new Date(
              b.createdAt
            )

        );

        break;

      default:

        list.sort(

          (a, b) =>

            new Date(
              b.createdAt
            ) -

            new Date(
              a.createdAt
            )

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

  //----------------------------------------------------

  const categories = [

    "All",

    ...new Set(
      products.map(
        (p) => p.category
      )
    ),

  ];

  //----------------------------------------------------

  return (

    <div
      className="
        rounded-3xl
        border
        border-border
        bg-card
        p-6
        shadow-sm
      "
    >

      <div
        className="
          flex
          flex-col
          gap-5
          xl:flex-row
          xl:items-center
          xl:justify-between
        "
      >

        {/* Search */}

        <div
          className="
            relative
            w-full
            xl:max-w-md
          "
        >

          <FiSearch
            className="
              absolute
              left-5
              top-1/2
              -translate-y-1/2
              text-text-secondary
            "
          />

          <input

            value={search}

            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }

            placeholder="Search products..."

            className="
              w-full
              rounded-2xl
              border
              border-border
              bg-background
              py-3
              pl-14
              pr-5
              outline-none
              transition
              focus:border-primary
              focus:ring-4
              focus:ring-primary/10
            "

          />

        </div>

        {/* Right Controls */}

        <div className="flex flex-wrap gap-4">

          {/* Category */}

          <div className="relative">

            <FiFilter
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-text-secondary
              "
            />

            <select

              value={category}

              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }

              className="
                rounded-2xl
                border
                border-border
                bg-background
                py-3
                pl-11
                pr-6
                outline-none
                transition
                focus:border-primary
              "

            >

              {categories.map(
                (item) => (

                  <option
                    key={item}
                    value={item}
                  >

                    {item}

                  </option>

                )
              )}

            </select>

          </div>

          {/* Sort */}

          <select

            value={sortBy}

            onChange={(e) =>
              setSortBy(
                e.target.value
              )
            }

            className="
              rounded-2xl
              border
              border-border
              bg-background
              px-5
              py-3
              outline-none
              transition
              focus:border-primary
            "

          >

            <option>
              Newest
            </option>

            <option>
              Oldest
            </option>

            <option>
              Price Low
            </option>

            <option>
              Price High
            </option>

            <option>
              Stock
            </option>

          </select>

          {/* Grid/List */}

          <div
            className="
              flex
              overflow-hidden
              rounded-2xl
              border
              border-border
            "
          >

            <button
              className="
                bg-primary
                p-3
                text-white
              "
            >

              <FiGrid />

            </button>

            <button
              className="
                bg-background
                p-3
              "
            >

              <FiList />

            </button>

          </div>

        </div>

      </div>

    </div>

  );

};

export default ProductToolbar;