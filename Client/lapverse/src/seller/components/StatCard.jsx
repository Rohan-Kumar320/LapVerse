
const StatCard = ({
  title,
  value,
  icon,
  color = "bg-primary",
  subtitle,
}) => {

  return (

    <div
      className="
        rounded-3xl
        border
        border-border
        bg-card
        p-6
        shadow-sm
        transition
        hover:-translate-y-1
        hover:shadow-lg
      "
    >

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-text-secondary">

            {title}

          </p>

<h2 className="mt-4 text-3xl font-bold">
  {value.toLocaleString()}
</h2>
          {subtitle && (

            <p className="mt-2 text-sm text-text-secondary">

              {subtitle}

            </p>

          )}

        </div>

        <div
          className={`
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            text-white

            ${color}
          `}
        >

          {icon}

        </div>

      </div>

    </div>

  );

};

export default StatCard;