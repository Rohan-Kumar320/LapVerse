const RatingDistribution = ({ ratingDistribution }) => {

  const ratings = [

    {
      star: 5,
      count: ratingDistribution[5] || 0,
    },

    {
      star: 4,
      count: ratingDistribution[4] || 0,
    },

    {
      star: 3,
      count: ratingDistribution[3] || 0,
    },

    {
      star: 2,
      count: ratingDistribution[2] || 0,
    },

    {
      star: 1,
      count: ratingDistribution[1] || 0,
    },

  ];

  const totalReviews = ratings.reduce(

    (sum, item) => sum + item.count,

    0

  );

    return (

    <section className="space-y-6">

      <div>

        <h2 className="text-2xl font-bold text-[#0F3040]">

          Rating Distribution

        </h2>

        <p className="mt-2 text-[#464858]">

          Customer satisfaction across all products.

        </p>

      </div>

      <div
        className="
        rounded-[30px]
        border
        border-[#ECE7E4]
        bg-white
        p-8
        shadow-sm
        "
      >

        <div
          className="
          mb-8
          flex
          items-end
          justify-between
          "
        >

          <div>

            <h2
              className="
              text-5xl
              font-black
              text-[#0F3040]
              "
            >

              {totalReviews}

            </h2>

            <p
              className="
              mt-2
              text-[#464858]
              "
            >

              Total Reviews

            </p>

          </div>

          <div
            className="
            rounded-2xl
            bg-[#EEF8F2]
            px-5
            py-3
            "
          >

            <span
              className="
              text-lg
              font-bold
              text-[#659287]
              "
            >

              ⭐ Reviews

            </span>

          </div>

        </div>

                <div className="space-y-6">

          {ratings.map((rating) => {

            const percentage =

              totalReviews === 0

                ? 0

                : (

                    (rating.count / totalReviews) *

                    100

                  ).toFixed(0);

            return (

              <div key={rating.star}>

                <div
                  className="
                  mb-2
                  flex
                  items-center
                  justify-between
                  "
                >

                  {/* Left */}

                  <div
                    className="
                    flex
                    items-center
                    gap-3
                    "
                  >

                    <span
                      className="
                      w-12
                      font-bold
                      text-[#0F3040]
                      "
                    >

                      {rating.star} ★

                    </span>

                    <span
                      className="
                      text-sm
                      text-[#464858]
                      "
                    >

                      {rating.count} Reviews

                    </span>

                  </div>

                  {/* Right */}

                  <span
                    className="
                    font-semibold
                    text-[#659287]
                    "
                  >

                    {percentage}%

                  </span>

                </div>

                {/* Progress */}

                <div
                  className="
                  h-3
                  overflow-hidden
                  rounded-full
                  bg-[#EDF1ED]
                  "
                >

                  <div

                    className="
                    h-full
                    rounded-full
                    transition-all
                    duration-700
                    "

                    style={{

                      width: `${percentage}%`,

                      background:

                        "linear-gradient(90deg,#659287,#88BDA4)",

                    }}

                  />

                </div>

              </div>

            );

          })}

        </div>
              </div>

    </section>

  );

};

export default RatingDistribution;