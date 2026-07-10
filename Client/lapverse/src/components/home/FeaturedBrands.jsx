import {
  SiLenovo,
  SiDell,
  SiHp,
  SiAsus,
  SiAcer,
  SiMsi,
  SiApple,
} from "react-icons/si";

const brands = [
  { name: "Lenovo", icon: SiLenovo },
  { name: "ASUS", icon: SiAsus },
  { name: "Dell", icon: SiDell },
  { name: "HP", icon: SiHp },
  { name: "MSI", icon: SiMsi },
  { name: "Acer", icon: SiAcer },
  { name: "Apple", icon: SiApple },
];

const FeaturedBrands = () => {
  return (
    <section className="bg-[#030712] py-14 border-y border-gray-800">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-center text-gray-400 uppercase tracking-[0.3em] text-sm mb-10">
          Trusted Brands
        </h2>

        <div className="flex flex-wrap justify-center gap-6">

          {brands.map((brand) => {
            const Icon = brand.icon;

            return (
              <div
                key={brand.name}
                className="group flex items-center gap-3 rounded-2xl border border-gray-800 bg-[#111827] px-6 py-4 hover:border-indigo-500 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <Icon
                  size={28}
                  className="text-gray-400 group-hover:text-indigo-400 transition"
                />

                <span className="text-gray-300 font-medium group-hover:text-white transition">
                  {brand.name}
                </span>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default FeaturedBrands;