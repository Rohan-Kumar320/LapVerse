import Drawer from "../ui/Drawer";

const options = [
  {
    label: "Newest",
    value: "latest",
  },
  {
    label: "Price: Low → High",
    value: "price-low",
  },
  {
    label: "Price: High → Low",
    value: "price-high",
  },
  {
    label: "Highest Rated",
    value: "rating",
  },
  {
    label: "A - Z",
    value: "name",
  },
];

const SortDrawer = ({
  open,
  onClose,
  sortBy,
  setSortBy,
}) => {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Sort Products"
    >
      <div className="space-y-4">

        {options.map((option) => (

          <button
            key={option.value}
            onClick={() => {
              setSortBy(option.value);
              onClose();
            }}
            className={`
              w-full
              rounded-xl
              border
              px-5
              py-4
              text-left
              transition-all

              ${
                sortBy === option.value
                  ? "border-primary bg-primary text-white"
                  : "border-border hover:border-primary"
              }
            `}
          >

            {option.label}

          </button>

        ))}

      </div>
    </Drawer>
  );
};

export default SortDrawer;