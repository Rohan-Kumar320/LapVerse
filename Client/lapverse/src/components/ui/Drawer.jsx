import { FiX } from "react-icons/fi";

const Drawer = ({
  open,
  onClose,
  title,
  children,
}) => {
  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300
          ${
            open
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }
        `}
      />

      {/* Drawer */}

      <div
        className={`
          fixed top-0 right-0 z-50 h-screen w-[340px] max-w-full
          bg-card shadow-2xl transition-transform duration-300
          flex flex-col
          ${
            open
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >

        {/* Header */}

        <div className="flex items-center justify-between border-b border-border px-6 py-5">

          <h2 className="text-xl font-bold">

            {title}

          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-primary/10"
          >

            <FiX size={22} />

          </button>

        </div>

        {/* Content */}

        <div className="flex-1 overflow-y-auto premium-scrollbar p-6">

          {children}

        </div>

      </div>
    </>
  );
};

export default Drawer;