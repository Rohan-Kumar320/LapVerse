import { useEffect, useState } from "react";
import {
  FiStar,
  FiX,
  FiSend,
} from "react-icons/fi";

import { toast } from "react-toastify";
import { useReviews } from "../../context/ReviewContext";


const WriteReviewModal = ({
  open,
  onClose,
  productId,
  onSuccess,
}) => {

  const { addReview } = useReviews();

  const [rating, setRating] =
    useState(5);

  const [hover, setHover] =
    useState(0);

  const [comment, setComment] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    if (!open) return;

    const close = (e) => {

      if (e.key === "Escape") {

        onClose();

      }

    };

    window.addEventListener("keydown", close);

    return () =>
      window.removeEventListener(
        "keydown",
        close
      );

  }, [open]);

  if (!open) return null;

  const submitReview = async () => {

    if (!comment.trim()) {

      toast.error(
        "Please write your review."
      );

      return;

    }

    setLoading(true);

    const response =
      await addReview(productId, {
        rating,
        comment,
      });

    setLoading(false);

    if (response.success) {

      toast.success(
        "Review submitted successfully."
      );

      setComment("");

      setRating(5);

      onSuccess?.();

    }

  };

  return (

<div
className="
fixed
inset-0
z-[100]
flex
items-center
justify-center
bg-black/70
backdrop-blur-sm
p-5
"
onClick={onClose}
>

<div
onClick={(e)=>e.stopPropagation()}
className="
w-full
max-w-2xl
rounded-3xl
border
border-border
bg-card
shadow-2xl
overflow-hidden
"
>

<div
className="
flex
items-center
justify-between
border-b
border-border
px-8
py-6
"
>

<div>

<h2 className="text-2xl font-bold">

Write a Review

</h2>

<p className="mt-1 text-text-secondary">

Share your experience.

</p>

</div>

<button
onClick={onClose}
className="
rounded-xl
p-2
transition
hover:bg-background
"
>

<FiX size={22}/>

</button>

</div>

<div className="p-8">

<div className="flex justify-center gap-3">

{[1,2,3,4,5].map((star)=>(

<button
key={star}
type="button"
onClick={()=>
setRating(star)
}
onMouseEnter={()=>
setHover(star)
}
onMouseLeave={()=>
setHover(0)
}
>

<FiStar
size={38}
className={`transition ${
star <= (hover || rating)
? "fill-yellow-400 text-yellow-400"
: "text-gray-500"
}`}
/>

</button>

))}

</div>

<textarea

rows={6}

value={comment}

onChange={(e)=>
setComment(e.target.value)
}

placeholder="Tell others what you liked or disliked about this laptop..."

className="
mt-8
w-full
resize-none
rounded-2xl
border
border-border
bg-background
p-5
outline-none
transition
focus:border-primary
"

/>

<div className="mt-8 flex justify-end gap-4">

<button
onClick={onClose}
className="
rounded-2xl
border
border-border
px-6
py-3
font-semibold
transition
hover:bg-background
"
>

Cancel

</button>

<button
onClick={submitReview}
disabled={loading}
className="
inline-flex
items-center
gap-2
rounded-2xl
bg-primary
px-7
py-3
font-semibold
text-white
transition
hover:scale-105
disabled:opacity-60
"
>

<FiSend/>

{loading
? "Submitting..."
: "Submit Review"}

</button>

</div>

</div>

</div>

</div>

  );

};

export default WriteReviewModal;