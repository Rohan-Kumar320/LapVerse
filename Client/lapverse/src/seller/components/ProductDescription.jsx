import { FiFileText } from "react-icons/fi";

const MAX_LENGTH = 1500;

const tips = [
  "Mention battery health (if used).",
  "State whether the original charger is included.",
  "Mention any scratches or cosmetic wear.",
  "Include warranty information if available.",
  "Tell buyers about accessories (box, sleeve, mouse, etc.).",
  "Highlight upgrades such as extra RAM or SSD.",
];

const ProductDescription = ({
  formData,
  handleChange,
  errors
}) => {

  const length =
    formData.description.length;

  return (

    <div className="space-y-7">

      {/* Description */}

      <div>

        <label className="mb-3 flex items-center gap-2 font-medium">

          <FiFileText />

          Product Description

        </label>

        <textarea

          name="description"

          value={formData.description}

          onChange={handleChange}

          maxLength={MAX_LENGTH}

          rows={8}

          placeholder="Describe your laptop in detail..."

className={`
  w-full
  resize-none
  rounded-3xl
  border
  bg-background
  p-5
  leading-7
  outline-none
  transition

  ${
    errors.description
      ? "border-red-500 focus:ring-4 focus:ring-red-500/20"
      : "border-border focus:border-primary focus:ring-4 focus:ring-primary/10"
  }
`}
        />

        {errors.description && (
  <p className="mt-2 text-sm text-red-500">
    {errors.description}
  </p>
)}

        <div className="mt-3 flex justify-between">

          <p className="text-sm text-text-secondary">

            A detailed description increases buyer confidence.

          </p>

          <span
            className={`
              text-sm
              font-semibold

              ${
                length > 1200

                  ? "text-orange-500"

                  : "text-text-secondary"
              }
            `}
          >

            {length}/{MAX_LENGTH}

          </span>

        </div>

      </div>

      {/* Tips */}

      <div
        className="
          rounded-3xl
          border
          border-blue-500/20
          bg-blue-500/5
          p-6
        "
      >

        <h3 className="font-bold">

          💡 Writing Tips

        </h3>

        <p className="mt-2 text-sm text-text-secondary">

          Good listings sell faster.

        </p>

        <div className="mt-5 grid gap-3 md:grid-cols-2">

          {tips.map((tip) => (

            <div
              key={tip}
              className="flex gap-3"
            >

              <div className="mt-1 text-primary">

                ✓

              </div>

              <p className="text-sm leading-6">

                {tip}

              </p>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

};

export default ProductDescription;