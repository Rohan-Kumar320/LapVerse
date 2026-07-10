const PriceSlider = ({ filters, setFilters }) => {
  return (
    <div>

      <div className="mb-4 flex items-center justify-between">

        <span className="font-medium">
          Max Price
        </span>

        <span className="text-primary font-semibold">

          Rs. {filters.price.toLocaleString()}

        </span>

      </div>

      <input
        type="range"
        min={20000}
        max={500000}
        step={5000}
        value={filters.price}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            price: Number(e.target.value),
          }))
        }
        className="w-full accent-primary cursor-pointer"
      />

    </div>
  );
};

export default PriceSlider;