import { Link } from "react-router-dom";
import {
  FiStar,
  FiCheckCircle,
  FiExternalLink,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";

const ProfileReviewCard = ({
  review,
  onEdit,
  onDelete,
  deleting,
}) => {
  const initials =
    review.user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase() || "U";

  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-border
        bg-card
        transition-all
        duration-300
        hover:border-primary/30
        hover:shadow-xl
      "
    >
      <div className="flex flex-col gap-6 p-6 lg:flex-row">

        {/* Product Image */}

        <Link
          to={`/products/${review.product?._id}`}
          className="shrink-0"
        >
          <img
            src={
              review.product?.images?.[0]?.url ||
              "https://placehold.co/160x160?text=Laptop"
            }
            alt={review.product?.title}
            className="
              h-32
              w-32
              rounded-2xl
              border
              border-border
              object-cover
            "
          />
        </Link>

        {/* Content */}

        <div className="flex-1">

          {/* Header */}

          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

            <div className="flex gap-4">

              {/* Avatar */}

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">

                {review.user?.avatar ? (

                  <img
                    src={review.user.avatar}
                    alt=""
                    className="h-full w-full rounded-full object-cover"
                  />

                ) : (

                  initials

                )}

              </div>

              <div>

                <div className="flex items-center gap-2">

                  <h3 className="text-lg font-bold">

                    {review.product?.title}

                  </h3>

                  <FiCheckCircle className="text-green-500" />

                </div>

                <p className="text-sm text-text-secondary">

                  Reviewed{" "}
                  {formatDistanceToNow(
                    new Date(review.createdAt),
                    {
                      addSuffix: true,
                    }
                  )}

                </p>

              </div>

            </div>

            {/* Rating */}

            <div className="flex text-yellow-400">

              {[1, 2, 3, 4, 5].map((star) => (

                <FiStar
                  key={star}
                  className={
                    star <= review.rating
                      ? "fill-yellow-400"
                      : ""
                  }
                />

              ))}

            </div>

          </div>

          {/* Comment */}

          <p className="mt-6 leading-8 text-text-secondary">

            {review.comment}

          </p>

          {/* Footer */}

          <div className="mt-8 flex flex-wrap gap-3">

            <Link
              to={`/products/${review.product?._id}`}
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-primary
                px-5
                py-3
                font-semibold
                text-primary
                transition
                hover:bg-primary
                hover:text-white
              "
            >

              <FiExternalLink />

              View Product

            </Link>

            <button
              onClick={() => onEdit(review)}
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-blue-600
                px-5
                py-3
                font-semibold
                text-white
                transition
                hover:bg-blue-700
              "
            >

              <FiEdit2 />

              Edit

            </button>

            <button
              onClick={() => onDelete(review)}
              disabled={deleting === review._id}
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-red-600
                px-5
                py-3
                font-semibold
                text-white
                transition
                hover:bg-red-700
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >

              <FiTrash2 />

              {deleting === review._id
                ? "Deleting..."
                : "Delete"}

            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProfileReviewCard;