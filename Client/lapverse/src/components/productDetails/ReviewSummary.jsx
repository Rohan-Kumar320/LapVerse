import { useEffect, useMemo, useState } from "react";
import { FiStar } from "react-icons/fi";

import { getProductReviews } from "../../services/reviewServices";
import RatingProgress from "./RatingProgress";
import ReviewCard from "./ReviewCard";

const ReviewSummary = ({ product }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleReviews, setVisibleReviews] = useState(4);


  useEffect(() => {
    if (product?._id) {
      fetchReviews();
    }
  }, [product]);

  const fetchReviews = async () => {
    try {
      setLoading(true);

      const data = await getProductReviews(product._id);

      setReviews(data.reviews || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Rating Statistics

  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;

    const total = reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );

    return total / reviews.length;
  }, [reviews]);

  const distribution = useMemo(() => {
    return {
      5: reviews.filter((r) => r.rating === 5).length,
      4: reviews.filter((r) => r.rating === 4).length,
      3: reviews.filter((r) => r.rating === 3).length,
      2: reviews.filter((r) => r.rating === 2).length,
      1: reviews.filter((r) => r.rating === 1).length,
    };
  }, [reviews]);

  if (loading) {
    return (
      <section>
        <h2 className="text-3xl font-bold mb-8">
          Customer Reviews
        </h2>

        <div className="rounded-3xl border border-border bg-card p-10">
          Loading Reviews...
        </div>
      </section>
    );
  }

  return (
    <section>

      <div className="mb-10">

        <h2 className="text-3xl font-bold">
          Customer Reviews
        </h2>

        <p className="mt-2 text-text-secondary">
          Read genuine experiences shared by our customers.
        </p>

      </div>

      <div className="grid lg:grid-cols-[340px,1fr] gap-10">

        {/* Left Summary */}

        <div className="rounded-3xl border border-border bg-card p-8 h-fit">

          <div className="text-center">

            <h1 className="text-6xl font-bold">
              {averageRating.toFixed(1)}
            </h1>

            <div className="flex justify-center gap-1 mt-3 text-yellow-400">

              {[1,2,3,4,5].map((star)=>(

                <FiStar
                  key={star}
                  size={20}
                  className={
                    star <= Math.round(averageRating)
                      ? "fill-yellow-400"
                      : ""
                  }
                />

              ))}

            </div>

            <p className="mt-3 text-text-secondary">
              Based on {reviews.length} Reviews
            </p>

          </div>

          <div className="mt-8 space-y-4">

            <RatingProgress
              stars={5}
              count={distribution[5]}
              total={reviews.length}
            />

            <RatingProgress
              stars={4}
              count={distribution[4]}
              total={reviews.length}
            />

            <RatingProgress
              stars={3}
              count={distribution[3]}
              total={reviews.length}
            />

            <RatingProgress
              stars={2}
              count={distribution[2]}
              total={reviews.length}
            />

            <RatingProgress
              stars={1}
              count={distribution[1]}
              total={reviews.length}
            />

          </div>

          <button
            className="
              mt-8
              w-full
              rounded-2xl
              bg-primary
              py-3
              font-semibold
              text-white
              transition
              hover:scale-[1.02]
            "
          >
            Write a Review
          </button>

        </div>

        {/* Reviews */}

        <div>

          {reviews.length === 0 ? (

            <div className="rounded-3xl border border-border bg-card py-20 text-center">

              <div className="text-6xl">
                ⭐
              </div>

              <h3 className="mt-5 text-2xl font-semibold">
                No Reviews Yet
              </h3>

              <p className="mt-3 text-text-secondary">
                Be the first customer to review this laptop.
              </p>

            </div>

          ) : (

            <div className="space-y-6">

              {reviews.slice(0,visibleReviews).map((review)=>(

                <ReviewCard
                  key={review._id}
                  review={review}
                />

              ))}

            </div>

          )}

        </div>
{
  reviews.length > visibleReviews && (

    <div className="flex justify-center mt-10">

      <button
        onClick={() =>
          setVisibleReviews((prev) => prev + 6)
        }
        className="
          rounded-2xl
          border
          border-primary
          px-8
          py-3
          font-semibold
          text-primary
          transition
          hover:bg-primary
          hover:text-white
        "
      >

        Load More Reviews

      </button>

    </div>

  )
}
      </div>

    </section>
  );
};

export default ReviewSummary;