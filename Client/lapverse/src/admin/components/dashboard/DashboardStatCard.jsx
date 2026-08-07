import {
  FiArrowUpRight,
  FiArrowDownRight,
} from "react-icons/fi";

const colors = {

  blue: {

    border: "border-blue-100",

    bg: "bg-blue-50",

    icon: "text-blue-600",

    badge: "bg-blue-100 text-blue-700",

  },

  emerald: {

    border: "border-emerald-100",

    bg: "bg-emerald-50",

    icon: "text-emerald-600",

    badge: "bg-emerald-100 text-emerald-700",

  },

  orange: {

    border: "border-orange-100",

    bg: "bg-orange-50",

    icon: "text-orange-600",

    badge: "bg-orange-100 text-orange-700",

  },

  violet: {

    border: "border-violet-100",

    bg: "bg-violet-50",

    icon: "text-violet-600",

    badge: "bg-violet-100 text-violet-700",

  },

  rose: {

    border: "border-rose-100",

    bg: "bg-rose-50",

    icon: "text-rose-600",

    badge: "bg-rose-100 text-rose-700",

  },

};

const DashboardStatCard = ({

  title,

  value,

  subtitle,

  icon,

  accent = "blue",

  trend,

  trendLabel,

}) => {

  const style = colors[accent];

  const positive = trend >= 0;

  return (

    <div
      className={`
      group
      rounded-3xl
      border
      ${style.border}
      bg-white
      p-6
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
    `}
    >

      <div className="flex items-start justify-between">

        <div>

          <p
            className="
            text-sm
            font-medium
            text-slate-500
          "
          >

            {title}

          </p>

          <h2
            className="
            mt-4
            text-4xl
            font-black
            tracking-tight
            text-slate-900
          "
          >

            {value}

          </h2>

          {

            subtitle && (

              <p
                className="
                mt-2
                text-sm
                text-slate-500
              "
              >

                {subtitle}

              </p>

            )

          }

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
        `}
        >

          {icon}

        </div>

      </div>

      {

        trend !== undefined && (

          <div className="mt-6">

            <span
              className={`
              inline-flex
              items-center
              gap-2
              rounded-full
              px-3
              py-1.5
              text-xs
              font-semibold
              ${style.badge}
            `}
            >

              {

                positive

                  ? <FiArrowUpRight />

                  : <FiArrowDownRight />

              }

              {Math.abs(trend)}%

            </span>

            {

              trendLabel && (

                <span
                  className="
                  ml-3
                  text-sm
                  text-slate-500
                "
                >

                  {trendLabel}

                </span>

              )

            }

          </div>

        )

      }

    </div>

  );

};

export default DashboardStatCard;