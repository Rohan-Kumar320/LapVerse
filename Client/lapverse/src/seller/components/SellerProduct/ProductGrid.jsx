import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import ProductCard from "./ProductCard";
import DeleteConfirmationModal from "../../../components/common/DeleteConfirmationModal";
import { useState } from "react";
import { deleteSellerProduct } from "../../../services/sellerProductService";

const ProductGrid = ({
  products,
  reload,
}) => {
const [selectedProduct, setSelectedProduct] = useState(null);
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();

  //----------------------------------------------------

  const handleView = (product) => {

navigate(`/seller/products/${product._id}`);
  };

  //----------------------------------------------------

  const handleEdit = (product) => {

     navigate(`/seller/products/${product._id}/edit`);

  };

  //----------------------------------------------------
const handleDeleteClick = (product) => {
  setSelectedProduct(product);
  setShowDeleteModal(true);
};

const handleDelete = async () => {
  try {
    setDeleteLoading(true);

await deleteSellerProduct(selectedProduct._id);

toast.success("Product deleted successfully.");

setShowDeleteModal(false);
setSelectedProduct(null);

reload();

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Unable to delete product."
    );
  } finally {
    setDeleteLoading(false);
  }
};

//----------------------------------------------------

  return (

    <div
      className="
        grid
        gap-7
        sm:grid-cols-2
        xl:grid-cols-3
      "
    >

      {products.map((product) => (

        <ProductCard

          key={product._id}

          product={product}

          onView={handleView}

          onEdit={handleEdit}

          onDelete={handleDeleteClick}

        />

      ))}
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
    </div>
    

  );

};

export default ProductGrid;