import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getSellerReviews } from "../../services/sellerReviewService";

import ReviewStatistics from "../components/SellerReviews/ReviewStatistics";
import ReviewFilters from "../components/SellerReviews/ReviewFilters";
import ReviewTable from "../components/SellerReviews/ReviewTable";
// import ReviewDetailsModal from "../components/SellerReviews/ReviewDetailsModal";

const SellerReviews = () => {

  const [loading, setLoading] = useState(true);

  const [reviews, setReviews] = useState([]);

  const [search, setSearch] = useState("");

  const [ratingFilter, setRatingFilter] =
    useState("All");

  const [selectedReview, setSelectedReview] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

  //------------------------------------------------

  useEffect(() => {

    loadReviews();

  }, []);

  //------------------------------------------------

  const loadReviews = async () => {

    try {

      const response =
        await getSellerReviews();

      setReviews(response.reviews);

    }

    catch {

      toast.error(
        "Unable to load reviews."
      );

    }

    finally {

      setLoading(false);

    }

  };

  //------------------------------------------------

  const filteredReviews = reviews.filter(
    (review) => {

      const matchesSearch =

        review.product.title
          .toLowerCase()
          .includes(search.toLowerCase())

        ||

        review.user.name
          .toLowerCase()
          .includes(search.toLowerCase())

        ||

        review.user.email
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesRating =

        ratingFilter === "All"

        ||

        review.rating === Number(ratingFilter);

      return matchesSearch &&
             matchesRating;

    }

  );

  //------------------------------------------------

  if (loading) {

    return (
      <div className="p-10">
        Loading...
      </div>
    );

  }

  //------------------------------------------------

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">

          Product Reviews

        </h1>

        <p className="mt-2 text-text-secondary">

          Customer feedback for your products.

        </p>

      </div>

      <ReviewStatistics

        reviews={reviews}

      />

      <ReviewFilters

        search={search}

        setSearch={setSearch}

        ratingFilter={ratingFilter}

        setRatingFilter={setRatingFilter}

      />

      <ReviewTable

        reviews={filteredReviews}

        onView={(review)=>{

          setSelectedReview(review);

          setShowModal(true);

        }}

      />

      {/* <ReviewDetailsModal

        review={selectedReview}

        isOpen={showModal}

        onClose={()=>{

          setShowModal(false);

          setSelectedReview(null);

        }}

      /> */}

    </div>

  );

};

export default SellerReviews;