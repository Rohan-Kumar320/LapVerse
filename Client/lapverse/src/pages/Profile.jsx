import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiMenu,
} from "react-icons/fi";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import Dashboard from "../components/profile/Dashboard";
import EditProfile from "../components/profile/EditProfile";
import Addresses from "../components/profile/Addresses";
import Orders from "./Orders";
import ProfileReviewCard from "../components/profile/ProfileReviewCard";
import { useReviews } from "../context/ReviewContext";
import DeleteConfirmationModal from "../components/common/DeleteConfirmationModal";
import EditReviewModal from "../components/profile/EditReviewModal";
import ProfileWishlist from "../components/profile/ProfileWishlist";
import Security from "../components/profile/security/Security";
import DeletionBanner from "../components/profile/security/DeletionBanner";

const Profile = () => {
  const [activeTab, setActiveTab] =
    useState("dashboard");

  const [showMenu, setShowMenu] =
    useState(false);

    useEffect(() => {
  document.body.style.overflow =
    showMenu ? "hidden" : "auto";

  return () => {
    document.body.style.overflow =
      "auto";
  };
}, [showMenu]);

const location = useLocation();

const {
  myReviews,
  fetchMyReviews,
  removeReview,
  updateUserReview,
} = useReviews();

const [deleting, setDeleting] = useState(null);
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedReview, setSelectedReview] = useState(null);
const [showEditModal, setShowEditModal] = useState(false);
const [updatingReview, setUpdatingReview] = useState(false);

useEffect(() => {
  if (location.state?.tab) {
    setActiveTab(location.state.tab);
  }
}, [location.state]);

useEffect(() => {
  if (activeTab === "reviews") {
    fetchMyReviews();
  }
}, [activeTab]);

const handleDelete = (review) => {

  setSelectedReview(review);

  setShowDeleteModal(true);

};

const confirmDelete = async () => {

  if (!selectedReview) return;

  setDeleting(selectedReview._id);

  const result = await removeReview(selectedReview._id);

  if (result.success) {

    setShowDeleteModal(false);

    setSelectedReview(null);

  }

  setDeleting(null);

};

const handleEdit = (review) => {

  setSelectedReview(review);

  setShowEditModal(true);

};
const saveReview = async (reviewData) => {

  if (!selectedReview) return;

  setUpdatingReview(true);

  const result = await updateUserReview(
    selectedReview._id,
    reviewData
  );

  if (result.success) {

    setShowEditModal(false);

    setSelectedReview(null);

    await fetchMyReviews();

  }

  setUpdatingReview(false);

};


  return (
    <main className="min-h-screen bg-background">

      {/* Top Header */}

      <section className="border-b border-border bg-card">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6">

          <div>

            <Link
              to="/products"
              className="mb-3 inline-flex items-center gap-2 text-primary hover:underline"
            >
              <FiArrowLeft />

              Continue Shopping

            </Link>

            <h1 className="text-4xl font-bold">

              My Account

            </h1>

            <p className="mt-2 text-text-secondary">

              Manage your profile, orders, addresses,
              wishlist and account settings.

            </p>

          </div>

          {/* Mobile Menu */}

          <button
            onClick={() =>
              setShowMenu(true)
            }
            className="
              flex
              lg:hidden
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-card
              border
              border-border
            "
          >
            <FiMenu size={22} />
          </button>

        </div>

      </section>

      {/* Main */}

      <div className="mx-auto flex max-w-7xl gap-8 px-5 py-10">

        {/* Desktop Sidebar */}

        <div className="hidden lg:block">

          <ProfileSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

        </div>

        {/* Mobile Drawer */}

        {showMenu && (

<div
  className={`
    fixed
    inset-0
    z-[200]
    bg-black/60
    transition-opacity
    duration-300

    ${
      showMenu
        ? "visible opacity-100"
        : "invisible opacity-0"
    }
  `}
  onClick={() => setShowMenu(false)}
>

  <div
    onClick={(e) => e.stopPropagation()}
    className={`
      h-full
      w-80
      overflow-y-auto
      bg-card
      transition-transform
      duration-300

      ${
        showMenu
          ? "translate-x-0"
          : "-translate-x-full"
      }
    `}
  >

    <ProfileSidebar
      mobile
      activeTab={activeTab}
      setActiveTab={(tab) => {
        setActiveTab(tab);
        setShowMenu(false);
      }}
    />

  </div>

</div>
        )}

        {/* Content */}

        <section className="flex-1">

          <DeletionBanner />

          {activeTab === "dashboard" && (
            <Dashboard setActiveTab={setActiveTab} />
          )}

{activeTab === "edit-profile" && (
  <EditProfile setActiveTab={setActiveTab} />
)}
{activeTab === "addresses" && (
    <Addresses />
)}
{activeTab === "orders" && (
  <Orders />
)}

{activeTab === "security" && (
  <Security />
)}


{activeTab === "wishlist" && (
  <ProfileWishlist />
)}

{activeTab === "reviews" && (

<div className="space-y-6">

  {myReviews.length === 0 ? (

    <div className="rounded-3xl border border-border bg-card py-20 text-center">

      <h2 className="text-2xl font-bold">
        No Reviews Yet
      </h2>

      <p className="mt-3 text-text-secondary">
        Your reviews will appear here.
      </p>

    </div>

  ) : (

    myReviews.map((review) => (

      <ProfileReviewCard
        key={review._id}
        review={review}
        onEdit={handleEdit}
        onDelete={handleDelete}
        deleting={deleting}
      />

    ))

  )}

</div>

)}
        </section>

      </div>
      <DeleteConfirmationModal
  isOpen={showDeleteModal}
  title="Delete Review"
  message="Are you sure you want to permanently delete this review? This action cannot be undone."
  loading={!!deleting}
  onClose={() => {

    setShowDeleteModal(false);

    setSelectedReview(null);

  }}
  onConfirm={confirmDelete}
/>

<EditReviewModal
  isOpen={showEditModal}
  review={selectedReview}
  loading={updatingReview}
  onClose={() => {

    setShowEditModal(false);

    setSelectedReview(null);

  }}
  onSave={saveReview}
/>
    </main>
  );
};

export default Profile;