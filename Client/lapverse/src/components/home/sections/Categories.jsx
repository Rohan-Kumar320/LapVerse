import { Link } from "react-router-dom";
import {
  FiMonitor,
  FiBriefcase,
  FiBookOpen,
  FiCode,
} from "react-icons/fi";

const categories = [
  {
    title: "Gaming",
    icon: FiMonitor,
    color: "from-purple-600 to-indigo-600",
  },
  {
    title: "Business",
    icon: FiBriefcase,
    color: "from-blue-600 to-cyan-600",
  },
  {
    title: "Student",
    icon: FiBookOpen,
    color: "from-green-600 to-emerald-600",
  },
  {
    title: "Programming",
    icon: FiCode,
    color: "from-orange-500 to-red-500",
  },
];

const Categories = () => {
  return (
    <section className="py-20 bg-surface">

      <div className="max-w-7xl mx-auto px-6">

        <div className="mb-12 text-center">

          <p className="text-primary uppercase tracking-[0.3em] text-sm">
            Browse
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Shop By Category
          </h2>

        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.title}
                to="/products"
                className={`group rounded-3xl bg-linear-to-br ${category.color} p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
              >
                <Icon
                  size={42}
                  className="text-white mb-6 transition group-hover:scale-110"
                />

                <h3 className="text-2xl font-semibold text-white">
                  {category.title}
                </h3>

                <p className="mt-3 text-white/80">
                  Explore the latest {category.title.toLowerCase()} laptops.
                </p>

              </Link>
            );
          })}

        </div>

      </div>

    </section>
  );
};

export default Categories;