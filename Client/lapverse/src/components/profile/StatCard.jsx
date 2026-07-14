const StatCard = ({
  title,
  value,
  icon,
  color = "from-indigo-500 to-indigo-700",
}) => {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-border
        bg-card
        p-6
        shadow-lg
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-2xl
      "
    >
      <div
        className={`
          absolute
          right-0
          top-0
          h-24
          w-24
          rounded-full
          bg-gradient-to-br
          ${color}
          opacity-10
          blur-2xl
        `}
      />

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-text-secondary">

            {title}

          </p>

          <h2 className="mt-2 text-4xl font-bold">

            {value}

          </h2>

        </div>

        <div
          className={`
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            ${color}
            text-3xl
            text-white
            shadow-lg
          `}
        >
          {icon}
        </div>

      </div>
    </div>
  );
};

export default StatCard;