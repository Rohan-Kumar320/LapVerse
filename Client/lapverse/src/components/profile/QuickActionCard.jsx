import { Link } from "react-router-dom";

const QuickActionCard = ({
  to,
  title,
  subtitle,
  icon,
}) => {
  return (
    <Link
      to={to}
      className="
        group
        rounded-3xl
        border
        border-border
        bg-card
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-primary
        hover:shadow-xl
      "
    >
      <div
        className="
          mb-5
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-primary/10
          text-2xl
          text-primary
          transition
          group-hover:bg-primary
          group-hover:text-white
        "
      >
        {icon}
      </div>

      <h3 className="text-lg font-semibold">

        {title}

      </h3>

      <p className="mt-2 text-sm leading-6 text-text-secondary">

        {subtitle}

      </p>
    </Link>
  );
};

export default QuickActionCard;
