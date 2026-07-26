import {
  FiDollarSign,
  FiPackage,
  FiMinus,
  FiPlus,
  FiCheck,
} from "react-icons/fi";

const conditions = [
  {
    value: "New",
    emoji: "✨",
    color: "border-emerald-500",
    bg: "bg-emerald-500/10",
    description: "Factory sealed or unused",
  },
  {
    value: "Like New",
    emoji: "🌟",
    color: "border-sky-500",
    bg: "bg-sky-500/10",
    description: "Almost no signs of use",
  },
  {
    value: "Excellent",
    emoji: "👍",
    color: "border-violet-500",
    bg: "bg-violet-500/10",
    description: "Very minor cosmetic wear",
  },
  {
    value: "Good",
    emoji: "👌",
    color: "border-orange-500",
    bg: "bg-orange-500/10",
    description: "Visible wear but fully working",
  },
  {
    value: "Fair",
    emoji: "🛠",
    color: "border-red-500",
    bg: "bg-red-500/10",
    description: "Heavy wear but functional",
  },
];

const ProductPricing = ({
  formData,
  handleChange,
  errors
}) => {

  const price =
    Number(formData.price) || 0;

  const discount =
    Number(formData.discount) || 0;

  const finalPrice =
    price - (price * discount) / 100;

  const increaseStock = () => {

    handleChange({

      target: {

        name: "stock",

        value:
          Number(formData.stock || 1) + 1,

      },

    });

  };

  const decreaseStock = () => {

    if (formData.stock <= 1) return;

    handleChange({

      target: {

        name: "stock",

        value:
          Number(formData.stock) - 1,

      },

    });

  };

  return (

    <div className="space-y-8">

      {/* Price */}

      <div className="grid gap-6 md:grid-cols-2">

        <div>

          <label className="mb-2 flex items-center gap-2 font-medium">

            <FiDollarSign />

            Selling Price

          </label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="100000"
className={`
  w-full
  rounded-2xl
  border
  bg-background
  px-5
  py-3
  outline-none
  transition

  ${
    errors.price
      ? "border-red-500 focus:ring-4 focus:ring-red-500/20"
      : "border-border focus:border-primary focus:ring-4 focus:ring-primary/10"
  }
`}          />

          {errors.price && (

  <p className="mt-1 text-sm text-red-500">

    {errors.price}

  </p>

)}

        </div>

        <div>

          <label className="mb-2 flex items-center gap-2 font-medium">

            %

            Discount

          </label>

          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            placeholder="0"
            className="
              w-full
              rounded-2xl
              border
              border-border
              bg-background
              px-5
              py-3
              outline-none
              transition
              focus:border-primary
              focus:ring-4
              focus:ring-primary/10
            "
          />

        </div>

      </div>

      {/* Stock */}

      <div>

        <label className="mb-4 flex items-center gap-2 font-medium">

          <FiPackage />

          Stock

        </label>

        <div className="flex w-fit items-center gap-4 rounded-2xl border border-border p-2">

          <button
            type="button"
            onClick={decreaseStock}
            className="
              rounded-xl
              bg-background
              p-3
              transition
              hover:bg-primary
              hover:text-white
            "
          >

            <FiMinus />

          </button>

          <span className="w-10 text-center text-xl font-bold">

            {formData.stock}

          </span>

          <button
            type="button"
            onClick={increaseStock}
            className="
              rounded-xl
              bg-primary
              p-3
              text-white
              transition
              hover:scale-105
            "
          >

            <FiPlus />

          </button>

        </div>

      </div>

      {/* Condition */}

      <div>

        <label className="mb-4 font-medium">

          Laptop Condition

        </label>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {conditions.map((condition) => (

            <button
              key={condition.value}
              type="button"
              onClick={() =>
                handleChange({

                  target: {

                    name: "condition",

                    value: condition.value,

                  },

                })
              }
              className={`
                relative
                rounded-3xl
                border
                p-5
                text-left
                transition-all
                hover:-translate-y-1
                hover:shadow-lg

                ${
                  formData.condition === condition.value

                    ? `${condition.color} ${condition.bg}`

                    : "border-border"
                }
              `}
            >

              {formData.condition ===
                condition.value && (

                <div className="absolute right-4 top-4">

                  <FiCheck />

                </div>

              )}

              <div className="text-3xl">

                {condition.emoji}

              </div>

              <h3 className="mt-4 font-bold">

                {condition.value}

              </h3>

              <p className="mt-2 text-sm text-text-secondary">

                {condition.description}

              </p>

            </button>

          ))}

        </div>

      </div>

      {/* Summary */}

      <div
        className="
          rounded-3xl
          bg-gradient-to-r
          from-primary
          to-blue-600
          p-7
          text-white
        "
      >

        <h3 className="text-xl font-bold">

          Pricing Summary

        </h3>

        <div className="mt-6 space-y-3">

          <div className="flex justify-between">

            <span>

              Original Price

            </span>

            <strong>

{price > 0
  ? `Rs. ${price.toLocaleString()}`
  : "--"}
            </strong>

          </div>

          <div className="flex justify-between">

            <span>

              Discount

            </span>

            <strong>

              {discount}%

            </strong>

          </div>

          <div className="border-t border-white/20 pt-4">

            <div className="flex justify-between text-xl font-bold">

              <span>

                Customer Pays

              </span>

              <span>

{price > 0
  ? `Rs. ${finalPrice.toLocaleString()}`
  : "--"}
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default ProductPricing;