const colors = {
  emerald: {
    bg: "bg-emerald-50",
    icon: "text-emerald-600",
    line: "bg-emerald-500",
  },

  orange: {
    bg: "bg-orange-50",
    icon: "text-orange-600",
    line: "bg-orange-500",
  },

  purple: {
    bg: "bg-violet-50",
    icon: "text-violet-600",
    line: "bg-violet-500",
  },

  rose: {
    bg: "bg-rose-50",
    icon: "text-rose-600",
    line: "bg-rose-500",
  },
};

const DashboardStatCard = ({
  title,
  value,
  subtitle,
  icon,
  accent = "emerald",
}) => {

  const style = colors[accent];

  return (

    <div
      className="
      group
      relative
      overflow-hidden
      rounded-[28px]
      border
      border-neutral-200
      bg-white
      p-7
      shadow-lg
      shadow-black/5
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
    "
    >

      <div
        className={`
        absolute
        left-0
        top-0
        h-full
        w-1
        ${style.line}
      `}
      />

      <div className="flex items-start justify-between">

        <div>

          <p
            className="
            text-sm
            font-medium
            text-neutral-500
          "
          >
            {title}
          </p>

          <h2
            className="
            mt-3
            text-4xl
            font-black
            tracking-tight
            text-neutral-900
          "
          >
            {value}
          </h2>

          <p
            className="
            mt-3
            text-sm
            text-neutral-500
          "
          >
            {subtitle}
          </p>

        </div>

        <div
          className={`
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          ${style.bg}
          ${style.icon}
          transition
          duration-300
          group-hover:rotate-6
        `}
        >
          {icon}
        </div>

      </div>

    </div>

  );

};

export default DashboardStatCard;