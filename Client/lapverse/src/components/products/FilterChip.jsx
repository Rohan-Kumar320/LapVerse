const FilterChip = ({ active, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        rounded-xl
        border
        px-4
        py-2
        text-sm
        font-medium
        transition-all
        duration-300

        ${
          active
            ? "border-primary bg-primary text-white shadow-lg shadow-primary/20"
            : "border-border bg-card hover:border-primary hover:text-primary"
        }
      `}
    >
      {active ? `✓ ${label}` : label}
    </button>
  );
};

export default FilterChip;