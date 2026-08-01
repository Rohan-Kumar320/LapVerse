const ReviewTableRow = ({
  review,
}) => {

  const stars = [...Array(5)];

  return (

    <div
      className="
      grid
      grid-cols-12
      items-center
      border-b
      border-[#EDF3EE]
      px-7
      py-4
      transition-all
      duration-300
      hover:bg-[#F8FCF8]
      "
    >

      {/* Product */}

      <div
        className="
        col-span-4
        flex
        items-center
        gap-4
        "
      >

        <img

          src={
            review.product.images?.[0]?.url ||

            "https://placehold.co/80x80"
          }

          alt={review.product.title}

          className="
          h-14
          w-14
          rounded-2xl
          border-2
          border-[#B1D3B9]
          object-cover
          "

        />

        <div className="min-w-0">

          <h3
            className="
            truncate
            font-semibold
            text-[#2C4541]
            "
          >

            {review.product.title}

          </h3>

          <p
            className="
            mt-1
            truncate
            text-xs
            text-[#6C7572]
            "
          >

            {review.product.brand}

            {" • "}

            {review.product.model}

          </p>

        </div>

      </div>

      {/* Customer */}

      <div
        className="
        col-span-3
        flex
        items-center
        gap-3
        "
      >

        <div
          className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          bg-[#659287]
          font-bold
          text-white
          shadow-sm
          "
        >

          {review.user.name
            ?.charAt(0)
            ?.toUpperCase()}

        </div>

        <div className="min-w-0">

          <h4
            className="
            truncate
            font-semibold
            text-[#2C4541]
            "
          >

            {review.user.name}

          </h4>

          <p
            className="
            truncate
            text-xs
            text-[#7B8582]
            "
          >

            {review.user.email}

          </p>

        </div>

      </div>

      {/* Rating */}

      <div className="col-span-2">

        <div className="flex gap-1">

          {stars.map((_, index)=>(

            <span

              key={index}

              className={

                index < review.rating

                  ? "text-[#88BDA4] text-lg"

                  : "text-[#D8E5DD] text-lg"

              }

            >

              ★

            </span>

          ))}

        </div>

        <span
          className="
          mt-2
          inline-flex
          rounded-full
          bg-[#E6F2DD]
          px-3
          py-1
          text-xs
          font-semibold
          text-[#659287]
          "
        >

          {review.rating}.0 / 5

        </span>

      </div>

      {/* Review */}

      <div className="col-span-3">

        <p
          className="
          line-clamp-3
          text-sm
          leading-7
          text-[#5C6664]
          "
        >

          {review.comment}

        </p>

        <p
          className="
          mt-3
          text-xs
          font-medium
          text-[#9AA5A1]
          "
        >

          {new Date(

            review.createdAt

          ).toLocaleDateString(

            "en-US",

            {

              day: "numeric",

              month: "short",

              year: "numeric",

            }

          )}

        </p>

      </div>

    </div>

  );

};

export default ReviewTableRow;