import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

const themes = {
  indigo: {
    gradient:
      "from-indigo-500/20 via-indigo-500/5 to-transparent",
    glow: "bg-indigo-500/20",
    icon:
      "from-indigo-500 to-indigo-600",
    border: "hover:border-indigo-500",
    text: "text-indigo-400",
  },

  pink: {
    gradient:
      "from-pink-500/20 via-pink-500/5 to-transparent",
    glow: "bg-pink-500/20",
    icon:
      "from-pink-500 to-rose-500",
    border: "hover:border-pink-500",
    text: "text-pink-400",
  },

  emerald: {
    gradient:
      "from-emerald-500/20 via-emerald-500/5 to-transparent",
    glow: "bg-emerald-500/20",
    icon:
      "from-emerald-500 to-green-600",
    border:
      "hover:border-emerald-500",
    text: "text-emerald-400",
  },

  amber: {
    gradient:
      "from-amber-500/20 via-amber-500/5 to-transparent",
    glow: "bg-amber-500/20",
    icon:
      "from-amber-400 to-orange-500",
    border: "hover:border-amber-500",
    text: "text-amber-400",
  },
};

const StatsCard = ({
  title,
  value,
  subtitle,
  icon,
  color = "indigo",
  link = "#",
}) => {
  const theme = themes[color];

  return (
    <Link
      to={link}
      className={`
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-gray-800
        bg-[#111827]
        p-6
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-2xl
        ${theme.border}
      `}
    >
      {/* Background Glow */}

      <div
        className={`
          absolute
          -right-10
          -top-10
          h-40
          w-40
          rounded-full
          blur-3xl
          ${theme.glow}
          opacity-60
        `}
      />

      {/* Gradient Overlay */}

      <div
        className={`
          absolute
          inset-0
          bg-gradient-to-br
          ${theme.gradient}
          opacity-70
        `}
      />

      {/* Content */}

      <div className="relative z-10">

        {/* Top */}

        <div className="flex items-start justify-between">

          <div
            className={`
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              ${theme.icon}
              text-white
              shadow-lg
              transition
              duration-300
              group-hover:scale-110
              group-hover:rotate-6
            `}
          >
            <span className="text-2xl">
              {icon}
            </span>
          </div>

          <FiArrowUpRight
            size={22}
            className="
              text-gray-500
              transition
              duration-300
              group-hover:text-white
              group-hover:translate-x-1
              group-hover:-translate-y-1
            "
          />

        </div>

        {/* Middle */}

        <div className="mt-8">

          <p className="text-sm text-gray-400">
            {title}
          </p>

          <h2 className="mt-2 text-4xl font-bold text-white">
            {value}
          </h2>

          {subtitle && (
            <p
              className={`
                mt-3
                text-sm
                font-medium
                ${theme.text}
              `}
            >
              {subtitle}
            </p>
          )}

        </div>

        {/* Bottom */}

        <div
          className="
            mt-8
            flex
            items-center
            justify-between
            border-t
            border-gray-800
            pt-4
          "
        >
          <span className="text-sm text-gray-400">

            View Details

          </span>

          <span
            className={`
              text-xs
              font-semibold
              ${theme.text}
            `}
          >
            →
          </span>

        </div>

      </div>

    </Link>
  );
};

export default StatsCard;