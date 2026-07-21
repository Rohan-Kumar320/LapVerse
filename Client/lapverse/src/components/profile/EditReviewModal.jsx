import { useEffect, useState } from "react";
import { FiStar, FiX } from "react-icons/fi";

const EditReviewModal = ({
  isOpen,
  review,
  loading,
  onClose,
  onSave,
}) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (review) {
      setRating(review.rating);
      setComment(review.comment);
    }
  }, [review]);

  if (!isOpen || !review) return null;

  return (
    <div
      className="
      fixed
      inset-0
      z-[999]
      flex
      items-center
      justify-center
      bg-black/70
      backdrop-blur-sm
      px-4
      "
    >
      <div
        className="
        w-full
        max-w-xl
        rounded-3xl
        border
        border-border
        bg-card
        shadow-2xl
        overflow-hidden
        "
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-border px-6 py-5">

          <h2 className="text-2xl font-bold">
            Edit Review
          </h2>

          <button
            onClick={onClose}
            className="rounded-xl p-2 hover:bg-background"
          >
            <FiX size={20} />
          </button>

        </div>

        {/* Body */}

        <div className="space-y-8 p-6">

          <div>

            <label className="mb-4 block font-semibold">
              Rating
            </label>

            <div className="flex gap-3">

              {[1, 2, 3, 4, 5].map((star) => (

                <button
                  key={star}
                  onClick={() => setRating(star)}
                  type="button"
                >
                  <FiStar
                    size={34}
                    className={
                      star <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-500"
                    }
                  />
                </button>

              ))}

            </div>

          </div>

          <div>

            <label className="mb-3 block font-semibold">
              Comment
            </label>

            <textarea
              rows={6}
              value={comment}
              onChange={(e) =>
                setComment(e.target.value)
              }
              className="
              w-full
              rounded-2xl
              border
              border-border
              bg-background
              p-4
              outline-none
              focus:border-primary
              "
            />

          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-4 border-t border-border px-6 py-5">

          <button
            onClick={onClose}
            className="
            rounded-xl
            border
            border-border
            px-6
            py-3
            font-semibold
            hover:bg-background
            "
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={() =>
              onSave({
                rating,
                comment,
              })
            }
            className="
            rounded-xl
            bg-primary
            px-6
            py-3
            font-semibold
            text-white
            hover:opacity-90
            disabled:opacity-60
            "
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default EditReviewModal;