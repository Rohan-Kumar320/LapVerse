import {
  FiStar,
  FiMessageSquare,
  FiPackage,
  FiAward,
} from "react-icons/fi";

const ReviewStatistics = ({ reviews }) => {

  const averageRating =
    reviews.length === 0
      ? 0
      : (
          reviews.reduce(
            (sum, review) => sum + review.rating,
            0
          ) / reviews.length
        ).toFixed(1);

  const reviewedProducts = new Set(
    reviews.map(
      (review) => review.product._id
    )
  ).size;

  const fiveStarReviews =
    reviews.filter(
      (review) => review.rating === 5
    ).length;

  const statistics = [
    {
      title: "Average Rating",
      value: averageRating,
      suffix: "★",
      icon: FiStar,
      color: "#D99B7F",
      bg: "#FFF6F1",
    },
    {
      title: "Total Reviews",
      value: reviews.length,
      icon: FiMessageSquare,
      color: "#0F3040",
      bg: "#EEF5F8",
    },
    {
      title: "Products Reviewed",
      value: reviewedProducts,
      icon: FiPackage,
      color: "#A56F63",
      bg: "#F8F2F0",
    },
    {
      title: "5 Star Reviews",
      value: fiveStarReviews,
      icon: FiAward,
      color: "#C58A2A",
      bg: "#FFF9EB",
    },
  ];

  return (

    <div
      className="
      grid
      gap-5
      sm:grid-cols-2
      xl:grid-cols-4
      "
    >

      {statistics.map((item) => {

        const Icon = item.icon;

        return (

          <div
            key={item.title}
            className="
            rounded-[26px]
            bg-white
            p-5
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-lg
            "
          >

            <div className="flex items-center justify-between">

              <div>

                <p
                  className="
                  text-sm
                  text-[#464858]
                  "
                >

                  {item.title}

                </p>

                <h2
                  className="
                  mt-3
                  text-3xl
                  font-black
                  text-[#0F3040]
                  "
                >

                  {item.value}

                  {item.suffix || ""}

                </h2>

              </div>

              <div
                className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                "
                style={{
                  background: item.bg,
                }}
              >

                <Icon
                  size={28}
                  style={{
                    color: item.color,
                  }}
                />

              </div>

            </div>

          </div>

        );

      })}

    </div>

  );

};

export default ReviewStatistics;