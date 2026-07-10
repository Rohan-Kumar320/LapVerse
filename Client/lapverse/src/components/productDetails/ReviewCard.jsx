import {
  FiCheckCircle,
  FiThumbsUp,
  FiStar,
} from "react-icons/fi";

import { formatDistanceToNow } from "date-fns";

const ReviewCard = ({ review }) => {
  const initials =
    review.user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase() || "A";

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm hover:shadow-lg transition">

      {/* Header */}

      <div className="flex justify-between items-start">

        <div className="flex gap-4">

          {/* Avatar */}

          <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">

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

              <h4 className="font-semibold">
                {review.user?.name || "Anonymous"}
              </h4>

              <span className="text-green-500">
                <FiCheckCircle />
              </span>

            </div>

            <p className="text-sm text-text-secondary">
              {formatDistanceToNow(
                new Date(review.createdAt),
                { addSuffix: true }
              )}
            </p>

          </div>

        </div>

        {/* Stars */}

        <div className="flex text-yellow-400">

          {[1,2,3,4,5].map((star)=>(

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

      {/* Badge */}

      <div className="mt-4">

        <span className="rounded-full bg-green-500/10 text-green-500 px-3 py-1 text-xs font-medium">

          Verified Purchase

        </span>

      </div>

      {/* Comment */}

      <p className="mt-5 leading-8 text-text-secondary">

        {review.comment}

      </p>

      {/* Footer */}

      <div className="mt-6 flex items-center justify-between">

        <button
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-border
            px-4
            py-2
            transition
            hover:border-primary
            hover:text-primary
          "
        >

          <FiThumbsUp />

          Helpful

        </button>

      </div>

    </div>
  );
};

export default ReviewCard;