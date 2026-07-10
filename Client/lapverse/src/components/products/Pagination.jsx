import {
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  if (totalPages <= 1) return null;

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="mt-14 flex flex-wrap items-center justify-center gap-3">

      <button
        disabled={currentPage === 1}
        onClick={() =>
          setCurrentPage((prev) => prev - 1)
        }
        className="
          flex items-center gap-2 rounded-xl border
          border-border bg-card px-5 py-3
          disabled:cursor-not-allowed
          disabled:opacity-40
          hover:border-primary
        "
      >
        <FiChevronLeft />
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`
            h-11 w-11 rounded-xl transition

            ${
              currentPage === page
                ? "bg-primary text-white"
                : "border border-border bg-card hover:border-primary"
            }
          `}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() =>
          setCurrentPage((prev) => prev + 1)
        }
        className="
          flex items-center gap-2 rounded-xl border
          border-border bg-card px-5 py-3
          disabled:cursor-not-allowed
          disabled:opacity-40
          hover:border-primary
        "
      >
        Next
        <FiChevronRight />
      </button>

    </div>
  );
};

export default Pagination;