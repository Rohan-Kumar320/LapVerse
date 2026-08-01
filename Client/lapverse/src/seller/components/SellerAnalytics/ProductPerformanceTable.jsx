import ProductPerformanceRow from "./ProductPerformanceRow";

const ProductPerformanceTable = ({ products }) => {

  if (!products.length) {

    return (

      <div
        className="
        rounded-[30px]
        border
        border-[#ECE7E4]
        bg-white
        p-16
        text-center
        shadow-sm
        "
      >

        <div className="text-6xl">

          📦

        </div>

        <h2
          className="
          mt-6
          text-2xl
          font-bold
          text-[#0F3040]
          "
        >

          No Products Found

        </h2>

        <p
          className="
          mt-3
          text-[#464858]
          "
        >

          Try changing the search or sorting.

        </p>

      </div>

    );

  }

  return (

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

      {/* Header */}

      <div
        className="
        grid
        grid-cols-12
        border-b
        border-[#ECE7E4]
        bg-[#F8F6F5]
        px-8
        py-5
        text-sm
        font-bold
        uppercase
        tracking-wider
        text-[#464858]
        "
      >

        <div className="col-span-4">

          Product

        </div>

        <div className="col-span-2 text-center">

          Revenue

        </div>

        <div className="col-span-1 text-center">

          Sold

        </div>

        <div className="col-span-1 text-center">

          Stock

        </div>

        <div className="col-span-1 text-center">

          Rating

        </div>

        <div className="col-span-2">

          Contribution

        </div>

        <div className="col-span-1 text-right">

          Status

        </div>

      </div>

      {/* Body */}

      <div>

        {products.map((product) => (

          <ProductPerformanceRow

            key={product._id}

            product={product}

          />

        ))}

      </div>

    </div>

  );

};

export default ProductPerformanceTable;