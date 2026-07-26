import { useState } from "react";

import {
  FiTag,
  FiCpu,
  FiHardDrive,
  FiMonitor,
  FiBatteryCharging,
  FiPackage,
  FiLayers,
  FiBox,
  FiPercent,
  FiCheckCircle,
  FiAlertTriangle,
  FiXCircle,
} from "react-icons/fi";

const SellerProductInfo = ({ product }) => {

  const [expanded, setExpanded] = useState(false);

  //-----------------------------------------------------

  const finalPrice =
    product.discount > 0
      ? product.price -
        (product.price * product.discount) / 100
      : product.price;

  //-----------------------------------------------------

  const stockStatus = () => {

    if (product.stock === 0) {

      return {
        text: "Out of Stock",
        color: "bg-red-500/10 text-red-500",
        icon: <FiXCircle size={16} />,
      };

    }

    if (product.stock <= 5) {

      return {
        text: "Low Stock",
        color: "bg-orange-500/10 text-orange-500",
        icon: <FiAlertTriangle size={16} />,
      };

    }

    return {

      text: "In Stock",

      color:
        "bg-emerald-500/10 text-emerald-600",

      icon: <FiCheckCircle size={16} />,

    };

  };

  const stock = stockStatus();

  //-----------------------------------------------------

  const InfoRow = ({
    icon,
    label,
    value,
  }) => (

    <div
      className="
        flex
        items-center
        justify-between
        rounded-xl
        border
        border-border
        bg-background
        px-4
        py-3
      "
    >

      <div
        className="
          flex
          items-center
          gap-3
          text-text-secondary
        "
      >

        {icon}

        <span className="text-xs">

          {label}

        </span>

      </div>

      <span
        className="
          text-sm
          font-semibold
          text-right
        "
      >

        {value}

      </span>

    </div>

  );

  //-----------------------------------------------------

  return (

    <section
      className="
        rounded-3xl
        border
        border-border
        bg-card
        p-6
        shadow-sm
      "
    >

      {/* Header */}

      <div
        className="
          flex
          flex-col
          gap-4
          lg:flex-row
          lg:items-start
          lg:justify-between
        "
      >

        <div>

          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-widest
              text-primary
            "
          >

            {product.brand}

          </p>

          <h1
            className="
              mt-2
              text-2xl
              font-bold
              leading-tight
            "
          >

            {product.title}

          </h1>

          <p
            className="
              mt-2
              text-sm
              text-text-secondary
            "
          >

            {product.model}

          </p>

        </div>

        <div className="flex flex-wrap gap-3">

          <span
            className={`
              flex
              items-center
              gap-2
              rounded-full
              px-4
              py-2
              text-xs
              font-semibold

              ${stock.color}
            `}
          >

            {stock.icon}

            {stock.text}

          </span>

          <span
            className="
              rounded-full
              bg-primary/10
              px-4
              py-2
              text-xs
              font-semibold
              text-primary
            "
          >

            {product.condition}

          </span>

          <span
            className="
              rounded-full
              bg-blue-500/10
              px-4
              py-2
              text-xs
              font-semibold
              text-blue-600
            "
          >

            {product.category}

          </span>

        </div>

      </div>

      {/* Price */}

      <div
        className="
          mt-8
          rounded-2xl
          border
          border-border
          bg-background
          p-5
        "
      >

        <p
          className="
            text-xs
            uppercase
            tracking-wider
            text-text-secondary
          "
        >

          Selling Price

        </p>

        <div
          className="
            mt-2
            flex
            flex-wrap
            items-end
            gap-4
          "
        >

          <h2
            className="
              text-3xl
              font-bold
              text-primary
            "
          >

            Rs. {finalPrice.toLocaleString()}

          </h2>

          {product.discount > 0 && (

            <>
              <span
                className="
                  text-lg
                  line-through
                  text-text-secondary
                "
              >

                Rs. {product.price.toLocaleString()}

              </span>

              <span
                className="
                  rounded-full
                  bg-red-500
                  px-3
                  py-1
                  text-xs
                  font-bold
                  text-white
                "
              >

                {product.discount}% OFF

              </span>
            </>
          )}

        </div>

      </div>

            {/* Specifications */}

      <div className="mt-8">

        <h2 className="mb-5 text-lg font-bold">

          Product Specifications

        </h2>

        <div
          className="
            grid
            gap-4
            md:grid-cols-2
            xl:grid-cols-3
          "
        >

          <InfoRow
            icon={<FiTag />}
            label="Brand"
            value={product.brand}
          />

          <InfoRow
            icon={<FiTag />}
            label="Model"
            value={product.model}
          />

          {/* <InfoRow
            icon={<FiCpu />}
            label="Processor"
            value={product.processor}
          /> */}

          {/* <InfoRow
            icon={<FiPackage />}
            label="RAM"
            value={`${product.ram} GB`}
          /> */}

          {/* <InfoRow
            icon={<FiHardDrive />}
            label="Storage"
            value={`${product.storage} GB`}
          /> */}

          {/* <InfoRow
            icon={<FiMonitor />}
            label="GPU"
            value={product.gpu}
          /> */}

          {/* <InfoRow
            icon={<FiMonitor />}
            label="Screen Size"
            value={`${product.screenSize}"`}
          /> */}

          {/* <InfoRow
            icon={<FiBatteryCharging />}
            label="Battery"
            value={`${product.battery} Wh`}
          /> */}

          <InfoRow
            icon={<FiLayers />}
            label="Category"
            value={product.category}
          />

          <InfoRow
            icon={<FiBox />}
            label="Condition"
            value={product.condition}
          />

          <InfoRow
            icon={<FiPackage />}
            label="Available Stock"
            value={`${product.stock} Units`}
          />

          <InfoRow
            icon={<FiPercent />}
            label="Discount"
            value={`${product.discount}%`}
          />

        </div>

      </div>

      {/* Description */}

      <div className="mt-10">

        <div className="mb-4 flex items-center justify-between">

          <h2 className="text-lg font-bold">

            Product Description

          </h2>

          <span
            className="
              rounded-full
              bg-primary/10
              px-3
              py-1
              text-xs
              font-semibold
              text-primary
            "
          >

            Seller Notes

          </span>

        </div>

        <div
          className="
            rounded-2xl
            border
            border-border
            bg-background
            p-6
          "
        >

          <p
            className={`
              whitespace-pre-line
              leading-8
              text-sm
              text-text-secondary
              transition-all

              ${
                expanded
                  ? ""
                  : "line-clamp-6"
              }
            `}
          >

            {product.description}

          </p>

          {product.description &&
            product.description.length > 350 && (

              <button
                onClick={() =>
                  setExpanded(
                    !expanded
                  )
                }
                className="
                  mt-5
                  text-sm
                  font-semibold
                  text-primary
                  transition
                  hover:underline
                "
              >

                {expanded
                  ? "Show Less"
                  : "Read More"}

              </button>

          )}

        </div>

      </div>
            {/* Footer */}

      {product.updatedAt && (

        <div
          className="
            mt-8
            flex
            items-center
            justify-between
            border-t
            border-border
            pt-5
            text-xs
            text-text-secondary
          "
        >

          <span>

            Product ID

          </span>

          <span className="font-medium">

            {product._id}

          </span>

        </div>

      )}

    </section>

  );

};

export default SellerProductInfo;