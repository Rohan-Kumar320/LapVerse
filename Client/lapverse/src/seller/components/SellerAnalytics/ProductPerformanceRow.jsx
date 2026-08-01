const ProductPerformanceRow = ({ product }) => {

  let status = {

    label: "Best Seller",

    color:
      "bg-[#EAF7F0] text-[#659287]",

  };

  if (product.stock === 0) {

    status = {

      label: "Out of Stock",

      color:
        "bg-[#FCEAEA] text-[#A56F63]",

    };

  }

  else if (product.stock <= 5) {

    status = {

      label: "Low Stock",

      color:
        "bg-[#FFF3E9] text-[#D99B7F]",

    };

  }

  else if (product.sold === 0) {

    status = {

      label: "No Sales",

      color:
        "bg-[#F3F5F6] text-[#7A7D86]",

    };

  }

  return (

    <div
      className="
      grid
      grid-cols-12
      items-center
      border-b
      border-[#F2EFEC]
      px-8
      py-5
      transition-all
      duration-300
      hover:bg-[#FAFBFA]
      last:border-b-0
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
            product.image ||

            "https://placehold.co/80x80"
          }

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

          <p
            className="
            mt-1
            text-xs
            text-[#7A7D86]
            "
          >

            Rs. {product.price.toLocaleString()}

          </p>

        </div>

      </div>

      {/* Revenue */}

      <div
        className="
        col-span-2
        text-center
        "
      >

        <h4
          className="
          font-bold
          text-[#0F3040]
          "
        >

          Rs. {product.revenue.toLocaleString()}

        </h4>

      </div>

      {/* Sold */}

      <div
        className="
        col-span-1
        text-center
        font-bold
        text-[#659287]
        "
      >

        {product.sold}

      </div>

      {/* Stock */}

      <div
        className="
        col-span-1
        text-center
        font-bold
        text-[#464858]
        "
      >

        {product.stock}

      </div>

      {/* Rating */}

      <div
        className="
        col-span-1
        text-center
        font-bold
        text-[#D99B7F]
        "
      >

        ⭐ {product.rating}

      </div>

      {/* Contribution */}

      <div
        className="
        col-span-2
        px-3
        "
      >

        <div
          className="
          mb-2
          flex
          justify-between
          text-xs
          "
        >

          <span
            className="
            text-[#7A7D86]
            "
          >

            Contribution

          </span>

          <span
            className="
            font-bold
            text-[#659287]
            "
          >

            {product.revenuePercentage}%

          </span>

        </div>

        <div
          className="
          h-2.5
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

      {/* Status */}

      <div
        className="
        col-span-1
        flex
        justify-end
        "
      >

        <span
          className={`
          rounded-full
          px-4
          py-2
          text-xs
          font-semibold
          ${status.color}
          `}
        >

          {status.label}

        </span>

      </div>

    </div>

  );

};

export default ProductPerformanceRow;