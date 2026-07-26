import { useEffect, useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { getMyProducts } from "../../services/sellerProductService";
import ProductStats from "../components/SellerProduct/ProductStats";
import ProductToolbar from "../components/SellerProduct/ProductToolbar";
import EmptyProducts from "../components/SellerProduct/EmptyProducts";
import ProductGrid from "../components/SellerProduct/ProductGrid";


const SellerProducts = () => {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [filteredProducts, setFilteredProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  //----------------------------------------------------

  useEffect(() => {

    loadProducts();

  }, []);

  //----------------------------------------------------

  const loadProducts = async () => {

    try {

      setLoading(true);

      const data =
        await getMyProducts();

      const list =
        data.products || [];

      setProducts(list);

      setFilteredProducts(list);

    }

    catch (error) {

      console.error(error);

    }

    finally {

      setLoading(false);

    }

  };

  //----------------------------------------------------

  const stats = useMemo(() => {

    return {

      total: products.length,

      active:
        products.filter(
          (p) => p.stock > 0
        ).length,

      lowStock:
        products.filter(
          (p) =>
            p.stock > 0 &&
            p.stock <= 5
        ).length,

      outOfStock:
        products.filter(
          (p) => p.stock === 0
        ).length,

    };

  }, [products]);

  //----------------------------------------------------

  return (

    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">

            My Products

          </h1>

          <p className="mt-2 text-text-secondary">

            Manage all your laptop listings.

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
            bg-gradient-to-r
            from-primary
            to-blue-600
            px-6
            py-3
            font-semibold
            text-white
            shadow-lg
            transition
            hover:scale-[1.02]
          "

        >

          <FiPlus />

          Add Product

        </button>

      </div>

      <ProductStats stats={stats} />

      <ProductToolbar

        products={products}

        setFilteredProducts={
          setFilteredProducts
        }

      />

      {loading ? (

        <div className="py-24 text-center">

          Loading products...

        </div>

      ) : filteredProducts.length === 0 ? (

        <EmptyProducts />

      ) : (

        <ProductGrid

          products={filteredProducts}

          reload={loadProducts}

        />

      )}

    </div>

  );

};

export default SellerProducts;