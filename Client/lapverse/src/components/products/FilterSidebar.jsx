import FilterChip from "./FilterChip";
import PriceSlider from "./PriceSlider";

const brands = ["Lenovo", "ASUS", "Dell", "HP", "MSI", "Acer", "Apple"];

const rams = [8, 16, 32, 64];

const storages = [256, 512, 1024, 2048];

const FilterSidebar = ({ filters, setFilters, isDrawer = false }) => {
  const toggleValue = (field, value) => {
    setFilters((prev) => ({
      ...prev,

      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  return (
    <aside
      className={`
    rounded-3xl
    border
    border-border
    bg-card
    p-7
    shadow-lg

    ${
      !isDrawer
        ? "sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto premium-scrollbar"
        : ""
    }
  `}
    >
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Filters</h2>

        <button
          onClick={() =>
            setFilters({
              brand: [],
              ram: [],
              storage: [],
              price: 500000,
            })
          }
          className="text-sm text-primary hover:underline"
        >
          Reset
        </button>
      </div>

      {/* Brand */}

      <div>
        <h3 className="mb-5 text-lg font-semibold">Brand</h3>

        <div className="flex flex-wrap gap-3">
          {brands.map((brand) => (
            <FilterChip
              key={brand}
              label={brand}
              active={filters.brand.includes(brand)}
              onClick={() => toggleValue("brand", brand)}
            />
          ))}
        </div>
      </div>

      <hr className="my-8 border-border" />

      {/* Price */}

      <PriceSlider filters={filters} setFilters={setFilters} />

      <hr className="my-8 border-border" />

      {/* RAM */}

      <div>
        <h3 className="mb-5 text-lg font-semibold">RAM</h3>

        <div className="flex flex-wrap gap-3">
          {rams.map((ram) => (
            <FilterChip
              key={ram}
              label={`${ram} GB`}
              active={filters.ram.includes(ram)}
              onClick={() => toggleValue("ram", ram)}
            />
          ))}
        </div>
      </div>

      <hr className="my-8 border-border" />

      {/* Storage */}

      <div>
        <h3 className="mb-5 text-lg font-semibold">Storage</h3>

        <div className="flex flex-wrap gap-3">
          {storages.map((storage) => (
            <FilterChip
              key={storage}
              label={storage >= 1024 ? `${storage / 1024} TB` : `${storage} GB`}
              active={filters.storage.includes(storage)}
              onClick={() => toggleValue("storage", storage)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
