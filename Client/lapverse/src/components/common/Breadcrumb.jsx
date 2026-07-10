import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className="flex flex-wrap items-center gap-2 text-sm text-text-secondary">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-2"
        >
          {index !== 0 && <FiChevronRight size={15} />}

          {item.link ? (
            <Link
              to={item.link}
              className="transition hover:text-primary"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-text">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;