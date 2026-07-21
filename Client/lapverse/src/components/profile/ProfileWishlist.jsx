import { useState } from "react";

import { toast } from "react-toastify";

import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

import DeleteConfirmationModal from "../common/DeleteConfirmationModal";
import ProfileWishlistCard from "./ProfileWishlistCard";

const ProfileWishlist = () => {

  const {
    wishlist,
    toggleWishlist,
  } = useWishlist();

  const {
    addProduct,
  } = useCart();

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [removing, setRemoving] =
    useState(false);

  const moveToCart = async (
    productId
  ) => {

    const result = await addProduct(
      productId,
      1
    );

    if (result.success) {

      await toggleWishlist(productId);

      toast.success(
        "Moved to cart."
      );

    }

  };

  const handleRemove = (
    productId
  ) => {

    setSelectedProduct(productId);

    setShowDeleteModal(true);

  };

  const confirmRemove = async () => {

    if (!selectedProduct) return;

    setRemoving(true);

    await toggleWishlist(selectedProduct);

    toast.success(
      "Removed from wishlist."
    );

    setRemoving(false);

    setSelectedProduct(null);

    setShowDeleteModal(false);

  };

  if (wishlist.length === 0) {

    return (

      <div
        className="
        rounded-3xl
        border
        border-border
        bg-card
        py-24
        text-center
        "
      >

        <h2 className="text-3xl font-bold">

          Your Wishlist is Empty

        </h2>

        <p className="mt-4 text-text-secondary">

          Save your favourite laptops to access them later.

        </p>

      </div>

    );

  }

  return (

    <>

      <div className="space-y-6">

        {wishlist.map((item) => (

          <ProfileWishlistCard
            key={item._id}
            item={item}
            onMoveToCart={moveToCart}
            onRemove={handleRemove}
          />

        ))}

      </div>

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        title="Remove from Wishlist"
        message="Remove this product from your wishlist?"
        loading={removing}
        onClose={() => {

          setShowDeleteModal(false);

          setSelectedProduct(null);

        }}
        onConfirm={confirmRemove}
      />

    </>

  );

};

export default ProfileWishlist;