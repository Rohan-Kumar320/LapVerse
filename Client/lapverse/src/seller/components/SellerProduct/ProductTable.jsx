import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiEye,
  FiEdit2,
  FiTrash2,
  FiPackage,
} from "react-icons/fi";

import { toast } from "react-toastify";
import DeleteConfirmationModal from "../../../components/common/DeleteConfirmationModal";
import { deleteSellerProduct } from "../../../services/sellerProductService";

const ProductTable = ({
  products,
  reload,
}) => {

  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  //--------------------------------------------

  const handleView = (product) => {

    navigate(`/seller/products/${product._id}`);

  };

  //--------------------------------------------

  const handleEdit = (product) => {

    navigate(`/seller/products/${product._id}/edit`);

  };

  //--------------------------------------------

  const handleDeleteClick = (product) => {

    setSelectedProduct(product);

    setShowDeleteModal(true);

  };

  //--------------------------------------------

  const handleDelete = async () => {

    try {

      setDeleteLoading(true);

      await deleteSellerProduct(selectedProduct._id);

      toast.success("Product deleted successfully.");

      reload();

      setShowDeleteModal(false);

      setSelectedProduct(null);

    }

    catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Unable to delete product."

      );

    }

    finally {

      setDeleteLoading(false);

    }

  };

  //--------------------------------------------

  return (

    <>

      <div
        className="
          overflow-hidden
          rounded-3xl
          border
          border-border
          bg-card
          shadow-sm
        "
      >

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead>

              <tr
                className="
                  border-b
                  border-border
                  bg-background
                "
              >

                <th className="px-6 py-5 text-left font-semibold">

                  Product

                </th>

                <th className="px-6 py-5 text-left font-semibold">

                  Category

                </th>

                <th className="px-6 py-5 text-left font-semibold">

                  Price

                </th>

                <th className="px-6 py-5 text-left font-semibold">

                  Stock

                </th>

                <th className="px-6 py-5 text-center font-semibold">

                  Actions

                </th>

              </tr>

            </thead>

            <tbody>

              {products.map((product) => {

                const finalPrice =

                  product.discount > 0

                    ? product.price -

                      (product.price * product.discount) / 100

                    : product.price;

                return (

                  <tr

                    key={product._id}

                    className="
                      border-b
                      border-border
                      transition-all
                      hover:bg-background
                    "

                  >

                    {/* Product */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-5">

                        <img

                          src={
                            product.images?.[0]?.url ||

                            "https://placehold.co/120x120?text=No+Image"
                          }

                          alt={product.title}

                          className="
                            h-20
                            w-20
                            rounded-2xl
                            object-cover
                            transition
                            duration-300
                            hover:scale-105
                          "

                        />

                        <div className="space-y-2">

                          <h3 className="font-bold">

                            {product.title}

                          </h3>

                          <p className="text-sm text-text-secondary">

                            {product.brand} • {product.model}

                          </p>

                          <span
                            className="
                              inline-flex
                              rounded-full
                              bg-amber-900
                              px-3
                              py-1
                              text-xs
                              font-semibold
                              text-white
                            "
                          >

                            {product.condition}

                          </span>

                        </div>

                      </div>

                    </td>

                    {/* Category */}

                    <td className="px-6">

                      <span
                        className="
                          inline-flex
                          rounded-full
                          bg-primary/10
                          px-3
                          py-1
                          text-xs
                          font-semibold
                          text-emerald-500
                        "
                      >

                        {product.category}

                      </span>

                    </td>

                    {/* Price */}

                    <td className="px-6">

                      <div className="space-y-1">

                        <div className="font-bold text-mauve-500">

                          Rs. {finalPrice.toLocaleString()}

                        </div>

                        {product.discount > 0 && (

                          <div className="flex items-center gap-2">

                            <span
                              className="
                                text-sm
                                text-text-secondary
                                line-through
                              "
                            >

                              Rs. {product.price.toLocaleString()}

                            </span>

                            <span
                              className="
                                rounded-full
                                bg-red-100
                                px-2
                                py-0.5
                                text-xs
                                font-bold
                                text-red-600
                              "
                            >

                              -{product.discount}%

                            </span>

                          </div>

                        )}

                      </div>

                    </td>

                    {/* Stock */}

                    <td className="px-6">

                      <div className="space-y-2">

                        <div className="flex items-center gap-2">

                          <FiPackage />

                          <span>

                            {product.stock} in stock

                          </span>

                        </div>

                        <span

                          className={`
                            inline-flex
                            rounded-full
                            px-3
                            py-1
                            text-xs
                            font-semibold

                            ${
                              product.stock === 0

                                ? "bg-red-100 text-red-600"

                                : product.stock <= 5

                                ? "bg-orange-100 text-orange-600"

                                : "bg-green-100 text-green-600"

                            }

                          `}
                        >

                          {product.stock === 0

                            ? "Sold Out"

                            : product.stock <= 5

                            ? "Low"

                            : "Available"}

                        </span>

                      </div>

                    </td>

                    {/* Actions */}

                    <td className="px-6">

                      <div className="flex justify-center gap-3">

                        <button

                          onClick={() => handleView(product)}

                          className="
                            rounded-2xl
                            border
                            border-border
                            p-3
                            transition
                            hover:bg-background
                          "

                        >

                          <FiEye />

                        </button>

                        <button

                          onClick={() => handleEdit(product)}

                          className="
                            rounded-2xl
                            bg-primary
                            p-3
                            text-white
                            transition
                            hover:opacity-90
                          "

                        >

                          <FiEdit2 />

                        </button>

                        <button

                          onClick={() => handleDeleteClick(product)}

                          className="
                            rounded-2xl
                            bg-red-500
                            p-3
                            text-white
                            transition
                            hover:opacity-90
                          "

                        >

                          <FiTrash2 />

                        </button>

                      </div>

                    </td>

                  </tr>

                );

              })}

            </tbody>

          </table>

        </div>

      </div>

      <DeleteConfirmationModal

        isOpen={showDeleteModal}

        loading={deleteLoading}

        title="Delete Product"

        message={`Are you sure you want to delete "${selectedProduct?.title}"? This action cannot be undone.`}

        onClose={() => {

          setShowDeleteModal(false);

          setSelectedProduct(null);

        }}

        onConfirm={handleDelete}

      />

    </>

  );

};

export default ProductTable;