import {
  FiCpu,
  FiMonitor,
  FiHardDrive,
  FiBatteryCharging,
  FiPackage,
  FiCheckCircle,
} from "react-icons/fi";

const SpecCard = ({ icon, title, children }) => (
  <div className="rounded-3xl border border-border bg-card p-6 shadow-sm hover:shadow-lg transition">

    <div className="flex items-center gap-3 mb-6">

      <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-xl">
        {icon}
      </div>

      <h3 className="text-xl font-semibold">
        {title}
      </h3>

    </div>

    <div className="space-y-4">
      {children}
    </div>

  </div>
);

const Row = ({ label, value }) => (
  <div className="flex items-center justify-between border-b border-border pb-3">

    <span className="text-text-secondary">
      {label}
    </span>

    <span className="font-semibold text-right">
      {value}
    </span>

  </div>
);

const ProductSpecs = ({ product }) => {
  return (
    <section>

      <div className="mb-10">

        <h2 className="text-3xl font-bold">
          Technical Specifications
        </h2>

        <p className="text-text-secondary mt-2">
          Complete hardware and product information.
        </p>

      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Performance */}

        <SpecCard
          icon={<FiCpu />}
          title="Performance"
        >

          <Row
            label="Processor"
            value={product.processor}
          />

          <Row
            label="Graphics"
            value={product.gpu}
          />

        </SpecCard>

        {/* Memory */}

        <SpecCard
          icon={<FiHardDrive />}
          title="Memory & Storage"
        >

          <Row
            label="RAM"
            value={`${product.ram} GB`}
          />

          <Row
            label="Storage"
            value={`${product.storage} GB SSD`}
          />

        </SpecCard>

        {/* Display */}

        <SpecCard
          icon={<FiMonitor />}
          title="Display"
        >

          <Row
            label="Screen Size"
            value={`${product.screenSize}"`}
          />

        </SpecCard>

        {/* Battery */}

        <SpecCard
          icon={<FiBatteryCharging />}
          title="Battery"
        >

          <Row
            label="Capacity"
            value={`${product.battery} Wh`}
          />

        </SpecCard>

        {/* General */}

        <div className="lg:col-span-2">

          <SpecCard
            icon={<FiPackage />}
            title="General Information"
          >

            <div className="grid md:grid-cols-2 gap-x-10 gap-y-4">

              <Row
                label="Brand"
                value={product.brand}
              />

              <Row
                label="Model"
                value={product.model}
              />

              <Row
                label="Category"
                value={product.category}
              />

              <Row
                label="Condition"
                value={product.condition}
              />

              <Row
                label="Stock"
                value={product.stock}
              />

              <Row
                label="Status"
                value={
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                      product.status === "Available"
                        ? "bg-green-500/10 text-green-500"
                        : product.status === "Reserved"
                        ? "bg-yellow-500/10 text-yellow-500"
                        : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    <FiCheckCircle />
                    {product.status}
                  </span>
                }
              />

            </div>

          </SpecCard>

        </div>

      </div>

    </section>
  );
};

export default ProductSpecs;