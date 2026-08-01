const TopProducts = ({ products }) => {

  const medals = [

    "🥇",

    "🥈",

    "🥉",

    "#4",

    "#5",

  ];

  return (

    <section className="space-y-6">

      <div>

        <h2 className="text-2xl font-bold text-[#0F3040]">

          Top Selling Products

        </h2>

        <p className="mt-2 text-[#464858]">

          Highest revenue generating products.

        </p>

      </div>

      <div
        className="
        overflow-hidden
        rounded-[30px]
        border
        border-[#ECE7E4]
        bg-white
        shadow-sm
        "
      >

                {products.map((product, index) => (

          <div

            key={product._id}

            className="
            flex
            items-center
            justify-between
            border-b
            border-[#F2EFEC]
            p-6
            transition-all
            duration-300
            hover:bg-[#FAFBFA]
            last:border-b-0
            "

          >

            {/* Left */}

            <div
              className="
              flex
              items-center
              gap-5
              "
            >

              <div
                className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-[#EEF8F2]
                text-xl
                font-bold
                "
              >

                {medals[index]}

              </div>

              <img

                src={product.image}

                alt={product.title}

                className="
                h-16
                w-16
                rounded-2xl
                border
                border-[#ECE7E4]
                object-cover
                "

              />

              <div>

                <h3
                  className="
                  font-bold
                  text-[#0F3040]
                  "
                >

                  {product.title}

                </h3>

                <p
                  className="
                  mt-1
                  text-sm
                  text-[#464858]
                  "
                >

                  {product.brand}

                  {" • "}

                  {product.model}

                </p>

              </div>

            </div>
                        {/* Right */}

{/* Right */}

<div
  className="
  w-[420px]
  "
>

  {/* Revenue Contribution */}

  <div className="mb-5">

    <div
      className="
      mb-2
      flex
      items-center
      justify-between
      "
    >

      <span
        className="
        text-xs
        font-semibold
        uppercase
        tracking-wider
        text-[#7A7D86]
        "
      >

        Revenue Contribution

      </span>

      <span
        className="
        text-sm
        font-bold
        text-[#659287]
        "
      >

        {product.revenuePercentage}%

      </span>

    </div>

    <div
      className="
      h-3
      overflow-hidden
      rounded-full
      bg-[#EEF4EF]
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

          width: `${product.revenuePercentage}%`,

          background:
            "linear-gradient(90deg,#659287,#88BDA4)",

        }}

      />

    </div>

  </div>

  {/* Statistics */}

  <div
    className="
    grid
    grid-cols-3
    gap-8
    "
  >

    <div>

      <p
        className="
        text-xs
        uppercase
        tracking-wider
        text-[#7A7D86]
        "
      >

        Revenue

      </p>

      <h4
        className="
        mt-2
        font-bold
        text-[#0F3040]
        "
      >

        Rs. {product.revenue.toLocaleString()}

      </h4>

    </div>

    <div>

      <p
        className="
        text-xs
        uppercase
        tracking-wider
        text-[#7A7D86]
        "
      >

        Sold

      </p>

      <h4
        className="
        mt-2
        font-bold
        text-[#659287]
        "
      >

        {product.sold}

      </h4>

    </div>

    <div>

      <p
        className="
        text-xs
        uppercase
        tracking-wider
        text-[#7A7D86]
        "
      >

        Rating

      </p>

      <h4
        className="
        mt-2
        font-bold
        text-[#D99B7F]
        "
      >

        ⭐ {product.rating}

      </h4>

    </div>

  </div>

</div>
          </div>

        ))}
              </div>

    </section>

  );

};

export default TopProducts;