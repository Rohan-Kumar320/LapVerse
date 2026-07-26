import {
  FiPackage,
  FiCheckCircle,
  FiAlertTriangle,
  FiXCircle,
} from "react-icons/fi";

const cards = [
  {
    key: "total",
    title: "Total Products",
    icon: FiPackage,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    key: "active",
    title: "Active Listings",
    icon: FiCheckCircle,
    gradient: "from-emerald-500 to-green-600",
  },
  {
    key: "lowStock",
    title: "Low Stock",
    icon: FiAlertTriangle,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    key: "outOfStock",
    title: "Out of Stock",
    icon: FiXCircle,
    gradient: "from-red-500 to-rose-600",
  },
];

const ProductStats = ({ stats }) => {

  return (

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {cards.map((card) => {

        const Icon = card.icon;

        return (

          <div
            key={card.key}
            className="
              overflow-hidden
              rounded-3xl
              border
              border-border
              bg-card
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
            "
          >

            <div
              className={`
                bg-gradient-to-r
                ${card.gradient}
                p-5
                text-white
              `}
            >

              <div className="flex items-center justify-between">

                <Icon size={28} />

                <span className="text-sm font-medium opacity-90">
                  Inventory
                </span>

              </div>

            </div>

            <div className="p-6">

              <p className="text-sm text-text-secondary">
                {card.title}
              </p>

              <h2 className="mt-2 text-4xl font-bold">
                {stats[card.key]}
              </h2>

            </div>

          </div>

        );

      })}

    </div>

  );

};

export default ProductStats;