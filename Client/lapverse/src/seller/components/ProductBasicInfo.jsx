import {
  FiPackage,
  FiTag,
  FiLayers,
  FiGrid,
} from "react-icons/fi";
import categories from "./productCategories";

const ProductBasicInfo = ({
  formData,
  handleChange,
  errors
}) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">

      {/* Product Title */}

      <div className="md:col-span-2">

        <label className="mb-2 flex items-center gap-2 font-medium">

          <FiPackage />

          Product Title

        </label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Example: Lenovo Legion 5 Pro"
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
  errors.title
    ? "border-red-500 focus:ring-red-500/20"
    : "border-border focus:border-primary focus:ring-4 focus:ring-primary/10"
}
`}        />

        {errors.title && (

  <p className="mt-1 text-sm text-red-500">

    {errors.title}

  </p>

)}

      </div>

      {/* Brand */}

      <div>

        <label className="mb-2 flex items-center gap-2 font-medium">

          <FiTag />

          Brand

        </label>

        <select
          name="brand"
          value={formData.brand}
          onChange={handleChange}
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
  errors.brand
    ? "border-red-500 focus:ring-red-500/20"
    : "border-border focus:border-primary focus:ring-4 focus:ring-primary/10"
}
`}        >

          <option value="">

            Select Brand

          </option>

          <option>Lenovo</option>

          <option>Dell</option>

          <option>HP</option>

          <option>Asus</option>

          <option>Acer</option>

          <option>MSI</option>

          <option>Apple</option>

          <option>Samsung</option>

          <option>Huawei</option>

          <option>Razer</option>

        </select>
        {errors.brand && (

  <p className="mt-1 text-sm text-red-500">

    {errors.brand}

  </p>

)}

      </div>

      {/* Model */}

      <div>

        <label className="mb-2 flex items-center gap-2 font-medium">

          <FiLayers />

          Model

        </label>

        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
          placeholder="Legion 5 Pro"
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
  errors.model
    ? "border-red-500 focus:ring-red-500/20"
    : "border-border focus:border-primary focus:ring-4 focus:ring-primary/10"
}
`}        />
{errors.model && (
  <p className="mt-1 text-sm text-red-500">
    {errors.model}
  </p>
)}
        

      </div>

      {/* Category */}

{/* Category */}

<div className="md:col-span-2">

  <label className="mb-4 flex items-center gap-2 font-medium">

    <FiGrid />

    Choose Category

  </label>

  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

    {categories.map((category) => (

      <button
        key={category.value}
        type="button"
        onClick={() =>
          handleChange({
            target: {
              name: "category",
              value: category.value,
            },
          })
        }
        className={`
          relative
          rounded-3xl
          border
          p-6
          text-left
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-lg

${
  formData.category === category.value
    ? "border-primary bg-primary/5 shadow-lg"
    : errors.category
    ? "border-red-500"
    : "border-border hover:border-primary"
}        `}
      >

        {formData.category === category.value && (

          <div
            className="
              absolute
              right-4
              top-4
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              bg-primary
              text-xs
              text-white
            "
          >
            ✓
          </div>

        )}

        <div className="text-4xl">

          {category.icon}

        </div>

        <h3 className="mt-5 text-lg font-bold">

          {category.title}

        </h3>

        <p className="mt-2 text-sm leading-6 text-text-secondary">

          {category.description}

        </p>

      </button>

    ))}

  </div>
  {errors.category && (
  <p className="mt-3 text-sm text-red-500">
    {errors.category}
  </p>
)}

</div>
    </div>
  );
};

export default ProductBasicInfo;