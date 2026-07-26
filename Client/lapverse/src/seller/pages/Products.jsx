import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import {
  FiPlus,
  FiSearch,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

import { getMyProducts } from "../../services/sellerProductService";

import SellerProductCard from "../components/SellerProductCard";

const Products = () => {

  const navigate = useNavigate();

  const [search, setSearch] =
    useState("");

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const loadProducts = async () => {

    try {

      setLoading(true);

      const data =
        await getMyProducts();

      setProducts(data.products);

    }

    catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Unable to load products."

      );

    }

    finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadProducts();

  }, []);

  const filteredProducts =
    products.filter((product) =>

      product.title
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )

    );

  return (

    <div className="space-y-8">

      {/* Header */}

      <div
        className="
          flex
          flex-wrap
          items-center
          justify-between
          gap-5
        "
      >

        <div>

          <h1 className="text-3xl font-bold">

            Products

          </h1>

          <p className="mt-2 text-text-secondary">

            Manage your products.

          </p>

        </div>

        <button

          onClick={() =>
            navigate("/seller/add-product")
          }

          className="
            flex
            items-center
            gap-2
            rounded-2xl
            bg-primary
            px-6
            py-3
            font-semibold
            text-white
            transition
            hover:scale-[1.02]
          "

        >

          <FiPlus />

          Add Product

        </button>

      </div>

      {/* Search */}

      <div
        className="
          flex
          items-center
          gap-3
          rounded-2xl
          border
          border-border
          bg-card
          px-5
          py-4
        "
      >

        <FiSearch />

        <input

          value={search}

          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }

          placeholder="Search product..."

          className="
            w-full
            bg-transparent
            outline-none
          "

        />

      </div>

      {/* Products */}

      {loading ? (

        <div
          className="
            py-24
            text-center
            text-text-secondary
          "
        >

          Loading products...

        </div>

      ) : filteredProducts.length === 0 ? (

        <div
          className="
            rounded-3xl
            border
            border-dashed
            border-border
            py-24
            text-center
          "
        >

          <h2 className="text-2xl font-bold">

            No Products Found

          </h2>

          <p className="mt-3 text-text-secondary">

            Start selling by adding your first
            product.

          </p>

          <button

            onClick={() =>
              navigate("/seller/add-product")
            }

            className="
              mt-8
              rounded-2xl
              bg-primary
              px-6
              py-3
              font-semibold
              text-white
              transition
              hover:scale-[1.02]
            "

          >

            Add Product

          </button>

        </div>

      ) : (

        <div
          className="
            grid
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
          "
        >

          {filteredProducts.map((product) => (

            <SellerProductCard

              key={product._id}

              product={product}

            />

          ))}

        </div>

      )}

    </div>

  );

};

export default Products;