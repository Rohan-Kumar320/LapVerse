const colorThemes = {
  emerald: {
    border: "hover:border-emerald-300",
    glow: "bg-emerald-200/50",
    icon: "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white",
    badge: "bg-emerald-50 text-emerald-700",
  },

  orange: {
    border: "hover:border-orange-300",
    glow: "bg-orange-200/50",
    icon: "bg-gradient-to-br from-orange-400 to-orange-600 text-white",
    badge: "bg-orange-50 text-orange-700",
  },

  violet: {
    border: "hover:border-violet-300",
    glow: "bg-violet-200/50",
    icon: "bg-gradient-to-br from-violet-400 to-violet-600 text-white",
    badge: "bg-violet-50 text-violet-700",
  },

  rose: {
    border: "hover:border-rose-300",
    glow: "bg-rose-200/50",
    icon: "bg-gradient-to-br from-rose-400 to-rose-600 text-white",
    badge: "bg-rose-50 text-rose-700",
  },
};

const QuickActionCard = ({
  icon,
  title,
  description,
  onClick,
  color = "emerald",
}) => {

  const theme = colorThemes[color];

  return (

    <button

      onClick={onClick}

      className={`
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-neutral-200
        bg-white
        p-8
        text-left
        shadow-lg
        shadow-black/5
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-2xl
        ${theme.border}
      `}
    >

      <div
        className={`
          absolute
          -right-10
          -top-10
          h-40
          w-40
          rounded-full
          blur-3xl
          transition-all
          duration-500
          group-hover:scale-125
          ${theme.glow}
        `}
      />

      <div className="relative z-10">

        <div className="flex items-center justify-between">

          <div
            className={`
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-3xl
              shadow-lg
              transition-all
              duration-300
              group-hover:rotate-6
              group-hover:scale-110
              ${theme.icon}
            `}
          >
            {icon}
          </div>

          <span
            className={`
              rounded-full
              px-3
              py-1
              text-xs
              font-semibold
              ${theme.badge}
            `}
          >
            Quick
          </span>

        </div>

        <h3
          className="
            mt-8
            text-xl
            font-bold
            text-neutral-900
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-3
            leading-7
            text-neutral-500
          "
        >
          {description}
        </p>

        <div
          className="
            mt-8
            flex
            items-center
            font-semibold
            text-neutral-700
            transition-all
            duration-300
            group-hover:translate-x-1
          "
        >
          Open

          <span className="ml-2 text-lg transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>

        </div>

      </div>

    </button>

  );

};

export default QuickActionCard;