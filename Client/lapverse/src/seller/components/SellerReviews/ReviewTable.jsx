import ReviewTableRow from "./ReviewTableRow";

const ReviewTable = ({
  reviews,
}) => {

  if (reviews.length === 0) {

    return (

      <div
        className="
        rounded-[28px]
        border
        border-[#B1D3B9]
        bg-white
        p-20
        text-center
        shadow-sm
        "
      >

        <div className="text-6xl">

          ⭐

        </div>

        <h2
          className="
          mt-6
          text-3xl
          font-black
          text-[#659287]
          "
        >

          No Reviews Yet

        </h2>

        <p
          className="
          mx-auto
          mt-4
          max-w-md
          leading-8
          text-[#6E7377]
          "
        >

          Reviews from customers who purchase your
          products will automatically appear here.

        </p>

      </div>

    );

  }

  return (

    <div
      className="
      overflow-hidden
      rounded-[28px]
      border
      border-[#DCE8E1]
      bg-white
      shadow-sm
      "
    >

      {/* Header */}

      <div
        className="
        grid
        grid-cols-12
        bg-[#E6F2DD]
        px-7
        py-5
        text-sm
        font-bold
        uppercase
        tracking-wider
        text-[#659287]
        "
      >

        <div className="col-span-4">

          Product

        </div>

        <div className="col-span-3">

          Customer

        </div>

        <div className="col-span-2">

          Rating

        </div>

        <div className="col-span-3">

          Review

        </div>

      </div>

      {/* Rows */}

      <div>

        {reviews.map((review)=>(

          <ReviewTableRow

            key={review._id}

            review={review}

          />

        ))}

      </div>

    </div>

  );

};

export default ReviewTable;