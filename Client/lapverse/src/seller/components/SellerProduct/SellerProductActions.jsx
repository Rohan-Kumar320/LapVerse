import {
  FiArrowLeft,
  FiEdit,
  FiTrash2,
  FiPackage,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import { updateStock } from "../../../services/sellerService";
import { useState } from "react";
import UpdateStockModal from "./UpdateStockModal";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "../../../components/common/DeleteConfirmationModal";
import { deleteSellerProduct } from "../../../services/sellerProductService";

const SellerProductActions = ({
  product,
  setProduct,
  onDelete,
}) => {

  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [deleteLoading, setDeleteLoading] = useState(false);
const [showStockModal, setShowStockModal] = useState(false);
const [stockLoading, setStockLoading] = useState(false);

  const navigate = useNavigate();

const handleUpdateStock = async (stock) => {
  try {
    setStockLoading(true);

    const response = await updateStock(product._id, stock);

    toast.success(response.message);

    setProduct((prev) => ({
      ...prev,
      stock,
    }));

    setShowStockModal(false);

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Unable to update stock."
    );
  } finally {
    setStockLoading(false);
  }
}; 

const handleDelete = async () => {

  try {

    setDeleteLoading(true);

    await deleteSellerProduct(product._id);

    toast.success("Product deleted successfully.");

    navigate("/seller/products");

  } catch (error) {

    toast.error("Unable to delete product.");

  } finally {

    setDeleteLoading(false);
    setShowDeleteModal(false);

  }

};

return (

    <section
      className="
        rounded-3xl
        border
        border-border
        bg-card
        p-8
      "
    >

      <h2 className="text-2xl font-bold">

        Product Actions

      </h2>

      <p className="mt-2 text-text-secondary">

        Manage this product from your seller dashboard.

      </p>

      <div
        className="
          mt-8
          grid
          gap-5
          md:grid-cols-2
        "
      >

        <button

          onClick={() =>
            navigate(
              `/seller/products/${product._id}/edit`
            )
          }

          className="
            flex
            items-center
            justify-center
            gap-3
            rounded-2xl
            bg-primary
            px-6
            py-4
            font-semibold
            text-white
            transition
            hover:scale-[1.02]
          "

        >

          <FiEdit />

          Edit Product

        </button>

<button
  onClick={() => setShowStockModal(true)}
  className="
    flex
    items-center
    justify-center
    gap-3
    rounded-2xl
    border
    border-border
    bg-background
    px-6
    py-4
    font-semibold
    transition
    hover:border-primary
  "
>

  <FiPackage />

  Update Stock

</button>

        <button

          onClick={() => setShowDeleteModal(true)}

          className="
            flex
            items-center
            justify-center
            gap-3
            rounded-2xl
            bg-red-500
            px-6
            py-4
            font-semibold
            text-white
            transition
            hover:bg-red-600
          "

        >

          <FiTrash2 />

          Delete Product

        </button>

        <button

          onClick={() =>
            navigate("/seller/products")
          }

          className="
            flex
            items-center
            justify-center
            gap-3
            rounded-2xl
            border
            border-border
            bg-background
            px-6
            py-4
            font-semibold
            transition
            hover:border-primary
          "

        >

          <FiArrowLeft />

          Back To Products

        </button>

      </div>
<UpdateStockModal
  isOpen={showStockModal}
  onClose={() => setShowStockModal(false)}
  currentStock={product.stock}
  loading={stockLoading}
  onSave={handleUpdateStock}
/>

<DeleteConfirmationModal
  isOpen={showDeleteModal}
  loading={deleteLoading}
  title="Delete Product"
  message={`Are you sure you want to permanently delete "${product.title}"? This action cannot be undone.`}
  onClose={() => setShowDeleteModal(false)}
  onConfirm={handleDelete}
/>
    </section>

  );

};

export default SellerProductActions;