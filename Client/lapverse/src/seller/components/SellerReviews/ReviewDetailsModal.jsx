import {
  FiX,
  FiUser,
  FiPackage,
  FiCalendar,
  FiStar,
  FiMail,
} from "react-icons/fi";

const ReviewDetailsModal = ({
  review,
  isOpen,
  onClose,
}) => {

  if (!isOpen || !review) return null;

  const stars = [...Array(5)];

  return (

    <div
      className="
      fixed
      inset-0
      z-[999]
      flex
      items-center
      justify-center
      bg-black/60
      backdrop-blur-sm
      p-5
      "
    >

      <div
        className="
        flex
        max-h-[92vh]
        w-full
        max-w-4xl
        flex-col
        overflow-hidden
        rounded-[34px]
        bg-[#FDFCFB]
        shadow-[0_30px_80px_rgba(0,0,0,0.18)]
        "
      >

        {/* Header */}

        <div
          className="
          flex
          items-center
          justify-between
          border-b
          border-[#EFE9E5]
          bg-gradient-to-r
          from-[#0F3040]
          to-[#1A465C]
          px-8
          py-6
          "
        >

          <div>

            <p
              className="
              text-sm
              uppercase
              tracking-[4px]
              text-white/70
              "
            >

              Customer Review

            </p>

            <h2
              className="
              mt-2
              text-3xl
              font-black
              text-white
              "
            >

              Review Details

            </h2>

          </div>

          <button

            onClick={onClose}

            className="
            rounded-2xl
            bg-white/10
            p-3
            text-white
            transition-all
            duration-300
            hover:bg-[#D99B7F]
            "

          >

            <FiX size={22} />

          </button>

        </div>

        {/* Body */}

        <div
          className="
          flex-1
          overflow-y-auto
          p-8
          "
        >

          <div
            className="
            grid
            gap-7
            lg:grid-cols-[320px_1fr]
            "
          >

                      {/* Left Panel */}

            <div className="space-y-6">

              {/* Product */}

              <div
                className="
                overflow-hidden
                rounded-[28px]
                bg-white
                shadow-sm
                "
              >

                <img

                  src={
                    review.product.images?.[0]?.url ||
                    "https://placehold.co/600x350"
                  }

                  alt={review.product.title}

                  className="
                  h-56
                  w-full
                  object-cover
                  "

                />

                <div className="p-6">

                  <div className="flex items-center gap-2">

                    <FiPackage
                      className="text-[#A56F63]"
                    />

                    <span
                      className="
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      text-[#A56F63]
                      "
                    >

                      Product

                    </span>

                  </div>

                  <h2
                    className="
                    mt-4
                    text-2xl
                    font-black
                    text-[#0F3040]
                    "
                  >

                    {review.product.title}

                  </h2>

                  <p
                    className="
                    mt-2
                    text-[#464858]
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
                rounded-[28px]
                bg-white
                p-6
                shadow-sm
                "
              >

                <div className="flex items-center gap-2">

                  <FiUser
                    className="text-[#A56F63]"
                  />

                  <span
                    className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-wider
                    text-[#A56F63]
                    "
                  >

                    Customer

                  </span>

                </div>

                <div
                  className="
                  mt-5
                  flex
                  items-center
                  gap-4
                  "
                >

                  <div
                    className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    bg-[#0F3040]
                    text-xl
                    font-bold
                    text-white
                    "
                  >

                    {review.user.name
                      ?.charAt(0)
                      ?.toUpperCase()}

                  </div>

                  <div>

                    <h3
                      className="
                      font-bold
                      text-[#0F3040]
                      "
                    >

                      {review.user.name}

                    </h3>

                    <div
                      className="
                      mt-1
                      flex
                      items-center
                      gap-2
                      text-sm
                      text-[#464858]
                      "
                    >

                      <FiMail size={14} />

                      {review.user.email}

                    </div>

                  </div>

                </div>

              </div>

              {/* Rating & Date */}

              <div
                className="
                rounded-[28px]
                bg-white
                p-6
                shadow-sm
                "
              >

                <div
                  className="
                  flex
                  items-center
                  justify-between
                  "
                >

                  <div>

                    <div className="flex gap-1">

                      {stars.map((_, index) => (

                        <span

                          key={index}

                          className={
                            index < review.rating
                              ? "text-[#D99B7F] text-2xl"
                              : "text-[#DDD7D3] text-2xl"
                          }

                        >

                          ★

                        </span>

                      ))}

                    </div>

                    <p
                      className="
                      mt-2
                      font-semibold
                      text-[#464858]
                      "
                    >

                      {review.rating}.0 out of 5

                    </p>

                  </div>

                  <div
                    className="
                    rounded-2xl
                    bg-[#F8F2F0]
                    p-4
                    text-center
                    "
                  >

                    <FiCalendar
                      className="
                      mx-auto
                      text-[#A56F63]
                      "
                    />

                    <p
                      className="
                      mt-2
                      text-xs
                      text-[#464858]
                      "
                    >

                      {new Date(
                        review.createdAt
                      ).toLocaleDateString()}

                    </p>

                  </div>

                </div>

              </div>

            </div>

                        {/* Right Panel */}

            <div className="space-y-6">

              {/* Review Card */}

              <div
                className="
                rounded-[30px]
                bg-white
                p-8
                shadow-sm
                "
              >

                <div
                  className="
                  flex
                  items-center
                  justify-between
                  "
                >

                  <div>

                    <p
                      className="
                      text-xs
                      font-bold
                      uppercase
                      tracking-[3px]
                      text-[#A56F63]
                      "
                    >

                      Customer Feedback

                    </p>

                    <h2
                      className="
                      mt-2
                      text-3xl
                      font-black
                      text-[#0F3040]
                      "
                    >

                      Review

                    </h2>

                  </div>

                  <div
                    className="
                    rounded-2xl
                    bg-[#FFF4EE]
                    px-5
                    py-3
                    "
                  >

                    <span
                      className="
                      text-3xl
                      font-black
                      text-[#A56F63]
                      "
                    >

                      {review.rating}.0

                    </span>

                  </div>

                </div>

                <div
                  className="
                  my-8
                  h-[1px]
                  bg-[#EFE9E5]
                  "
                />

                <blockquote
                  className="
                  text-lg
                  leading-9
                  italic
                  text-[#464858]
                  "
                >

                  "

                  {review.comment}

                  "

                </blockquote>

              </div>

              {/* Product Review Summary */}

              <div
                className="
                rounded-[30px]
                bg-white
                p-8
                shadow-sm
                "
              >

                <h3
                  className="
                  text-xl
                  font-black
                  text-[#0F3040]
                  "
                >

                  Product Review Summary

                </h3>

                <div
                  className="
                  mt-8
                  grid
                  gap-5
                  sm:grid-cols-2
                  "
                >

                  <div
                    className="
                    rounded-2xl
                    bg-[#F8F6F5]
                    p-5
                    "
                  >

                    <p
                      className="
                      text-sm
                      text-[#464858]
                      "
                    >

                      Average Rating

                    </p>

                    <h2
                      className="
                      mt-3
                      text-3xl
                      font-black
                      text-[#0F3040]
                      "
                    >

                      {review.product.averageRating}

                    </h2>

                  </div>

                  <div
                    className="
                    rounded-2xl
                    bg-[#FFF4EE]
                    p-5
                    "
                  >

                    <p
                      className="
                      text-sm
                      text-[#A56F63]
                      "
                    >

                      Product Rating

                    </p>

                    <div
                      className="
                      mt-3
                      flex
                      gap-1
                      text-xl
                      "
                    >

                      {stars.map((_, index)=>(

                        <span

                          key={index}

                          className={

                            index < review.product.averageRating

                              ? "text-[#D99B7F]"

                              : "text-[#DDD7D3]"

                          }

                        >

                          ★

                        </span>

                      ))}

                    </div>

                  </div>

                </div>

              </div>

              {/* Seller Note */}

              <div
                className="
                rounded-[28px]
                border-l-4
                border-[#D99B7F]
                bg-[#FFF8F4]
                p-6
                "
              >

                <h4
                  className="
                  font-bold
                  text-[#0F3040]
                  "
                >

                  Seller Insight

                </h4>

                <p
                  className="
                  mt-3
                  leading-8
                  text-[#464858]
                  "
                >

                  Customer reviews cannot be modified or
                  removed by sellers. They are displayed to
                  help you understand customer satisfaction
                  and improve future product listings and
                  service quality.

                </p>

              </div>

            </div>
                    </div>

        {/* Footer */}

        <div
          className="
          flex
          flex-col
          gap-4
          border-t
          border-[#EFE9E5]
          bg-[#FAF7F5]
          px-8
          py-6
          sm:flex-row
          sm:items-center
          sm:justify-between
          "
        >

          <div>

            <p
              className="
              text-sm
              text-[#464858]
              "
            >

              Reviews are permanent and are shown to future
              customers.

            </p>

          </div>

          <button

            onClick={onClose}

            className="
            rounded-2xl
            bg-[#0F3040]
            px-8
            py-3
            font-semibold
            text-white
            transition-all
            duration-300
            hover:-translate-y-1
            hover:bg-[#A56F63]
            hover:shadow-lg
            "

          >

            Close

          </button>

        </div>

      </div>

    </div>
</div>
  )

};

export default ReviewDetailsModal;