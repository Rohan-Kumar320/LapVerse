import {
  FiCpu,
  FiHardDrive,
  FiMonitor,
  FiBatteryCharging,
} from "react-icons/fi";

import { MdMemory } from "react-icons/md";

import { PiGraphicsCard } from "react-icons/pi";

const SellerProductSpecifications = ({
  product,
}) => {

  const specs = [

    {
      title: "Processor",
      value: product.processor,
      icon: <FiCpu size={26} />,
      color: "text-sky-500",
      bg: "bg-sky-500/10",
    },

    {
      title: "Graphics",
      value: product.gpu,
      icon: <PiGraphicsCard size={26} />,
      color: "text-violet-500",
      bg: "bg-violet-500/10",
    },

    {
      title: "RAM",
      value: `${product.ram} GB`,
      icon: <MdMemory size={26} />,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },

    {
      title: "Storage",
      value: `${product.storage} GB`,
      icon: <FiHardDrive size={26} />,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },

    {
      title: "ScreenSize",
      value: `${product.screenSize}"`,
      icon: <FiMonitor size={26} />,
      color: "text-pink-500",
      bg: "bg-pink-500/10",
    },

    {
      title: "Battery",
      value: `${product.battery} Wh`,
      icon: <FiBatteryCharging size={26} />,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },

  ];

  return (

    <section
      className="
        rounded-3xl
        border
        border-border
        bg-card
        p-8
      "
    >

      <h2 className="text-2xl font-bold">

        Specifications

      </h2>

      <div
        className="
          mt-8
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-3
        "
      >

        {specs.map((spec) => (

          <div
            key={spec.title}
            className="
              rounded-3xl
              border
              border-border
              bg-background
              p-6
              transition
              duration-300
              hover:-translate-y-1
              hover:shadow-lg
            "
          >

            <div
              className={`
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl

                ${spec.bg}

                ${spec.color}
              `}
            >

              {spec.icon}

            </div>

            <p
              className="
                mt-5
                text-sm
                text-text-secondary
              "
            >

              {spec.title}

            </p>

            <h3
              className="
                mt-2
                text-lg
                font-bold
              "
            >

              {spec.value}

            </h3>

          </div>

        ))}

      </div>

    </section>

  );

};

export default SellerProductSpecifications;