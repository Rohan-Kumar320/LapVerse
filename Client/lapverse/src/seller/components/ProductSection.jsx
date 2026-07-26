import React from "react";

const colors = {
  blue: {
    bg: "from-sky-500 to-blue-600",
    icon: "bg-sky-500/15 text-sky-500",
  },

  indigo: {
    bg: "from-indigo-500 to-violet-600",
    icon: "bg-indigo-500/15 text-indigo-500",
  },

  purple: {
    bg: "from-violet-500 to-purple-600",
    icon: "bg-violet-500/15 text-violet-500",
  },

  emerald: {
    bg: "from-emerald-500 to-green-600",
    icon: "bg-emerald-500/15 text-emerald-500",
  },

  orange: {
    bg: "from-orange-500 to-amber-500",
    icon: "bg-orange-500/15 text-orange-500",
  },
};

const ProductSection = ({
  title,
  subtitle,
  icon,
  color = "blue",
  children,
}) => {
  const style = colors[color] || colors.blue;

  return (
    <section
      className="
        overflow-hidden
        rounded-3xl
        border
        border-border
        bg-card
        shadow-sm
        transition
        hover:shadow-lg
      "
    >
      {/* Header */}

      <div
        className={`
          bg-gradient-to-r
          ${style.bg}
          px-7
          py-5
          text-white
        `}
      >
        <div className="flex items-center gap-4">
          <div
            className={`
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-white/15
              backdrop-blur
            `}
          >
            {icon}
          </div>

          <div>
            <h2 className="text-xl font-bold">
              {title}
            </h2>
            

            {subtitle && (
              <p className="mt-1 text-sm text-white/80">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Body */}

      <div className="p-7">
        {children}
      </div>
    </section>
  );
};

export default ProductSection;