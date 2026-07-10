import Drawer from "../ui/Drawer";
import FilterSidebar from "./FilterSidebar";

const FilterDrawer = ({
  open,
  onClose,
  filters,
  setFilters,
}) => {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Filters"
    >
      <FilterSidebar
        filters={filters}
        setFilters={setFilters}
        isDrawer
      />

      <button
        onClick={onClose}
        className="
          mt-8
          w-full
          rounded-xl
          bg-primary
          py-3
          font-medium
          text-white
          transition
          hover:opacity-90
        "
      >
        Apply Filters
      </button>
    </Drawer>
  );
};

export default FilterDrawer;