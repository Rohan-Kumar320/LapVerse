import {
  FiCpu,
  FiHardDrive,
  FiMonitor,
  FiBatteryCharging,
} from "react-icons/fi";
import { MdMemory } from "react-icons/md";
import { PiGraphicsCard } from "react-icons/pi";

const ProductSpecifications = ({
  formData,
  handleChange,
  errors
}) => {

  const inputStyle = `
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
  `;

const numberInput = (
  icon,
  label,
  name,
  unit,
  placeholder
) => (

  <div>

    <label className="mb-2 flex items-center gap-2 font-medium">

      {icon}

      {label}

    </label>

    <div className="relative">

      <input
        type="number"
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className={`
          w-full
          rounded-2xl
          border
          bg-background
          px-5
          py-3
          pr-16
          outline-none
          transition

          ${
            errors[name]
              ? "border-red-500 focus:ring-4 focus:ring-red-500/20"
              : "border-border focus:border-primary focus:ring-4 focus:ring-primary/10"
          }
        `}
      />

      <span
        className="
          absolute
          right-5
          top-1/2
          -translate-y-1/2
          text-sm
          font-semibold
          text-text-secondary
        "
      >
        {unit}
      </span>

    </div>

    {errors[name] && (
      <p className="mt-1 text-sm text-red-500">
        {errors[name]}
      </p>
    )}

  </div>

);
  return (

    <div className="grid gap-6 md:grid-cols-2">

      {/* Processor */}

      <div>

        <label className="mb-2 flex items-center gap-2 font-medium">

          <FiCpu />

          Processor

        </label>

        <input
          type="text"
          name="processor"
          value={formData.processor}
          onChange={handleChange}
          placeholder="Intel Core i7-14700HX"
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
    errors.processor
      ? "border-red-500 focus:ring-4 focus:ring-red-500/20"
      : "border-border focus:border-primary focus:ring-4 focus:ring-primary/10"
  }
`}        />
{errors.processor && (
  <p className="mt-1 text-sm text-red-500">
    {errors.processor}
  </p>
)}

      </div>

      {/* GPU */}

      <div>

        <label className="mb-2 flex items-center gap-2 font-medium">

          <PiGraphicsCard />

          Graphics Card

        </label>

        <input
          type="text"
          name="gpu"
          value={formData.gpu}
          onChange={handleChange}
          placeholder="RTX 4060"
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
    errors.gpu
      ? "border-red-500 focus:ring-4 focus:ring-red-500/20"
      : "border-border focus:border-primary focus:ring-4 focus:ring-primary/10"
  }
`}        />

{errors.gpu && (
  <p className="mt-1 text-sm text-red-500">
    {errors.gpu}
  </p>
)}

      </div>

      {numberInput(
        <MdMemory />,
        "RAM",
        "ram",
        "GB",
        "16"
      )}

      {numberInput(
        <FiHardDrive />,
        "Storage",
        "storage",
        "GB",
        "512"
      )}

      {numberInput(
        <FiMonitor />,
        "Screen Size",
        "screenSize",
        "inch",
        "15.6"
      )}

      {numberInput(
        <FiBatteryCharging />,
        "Battery",
        "battery",
        "Wh",
        "80"
      )}

    </div>

  );

};

export default ProductSpecifications;