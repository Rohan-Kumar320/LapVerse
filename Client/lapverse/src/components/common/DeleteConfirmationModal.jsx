import {
  FiTrash2,
  FiX,
} from "react-icons/fi";

const DeleteConfirmationModal = ({
  isOpen,
  title = "Delete Item",
  message = "Are you sure?",
  loading = false,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="
      fixed
      inset-0
      z-[999]
      flex
      items-center
      justify-center
      bg-black/70
      backdrop-blur-sm
      px-4
      "
    >
      <div
        className="
        w-full
        max-w-md
        overflow-hidden
        rounded-3xl
        border
        border-border
        bg-card
        shadow-2xl
        animate-[fadeIn_.2s_ease]
        "
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-border px-6 py-5">

          <div className="flex items-center gap-3">

            <div
              className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-red-500/10
              text-red-500
              "
            >
              <FiTrash2 size={22} />
            </div>

            <h2 className="text-xl font-bold">
              {title}
            </h2>

          </div>

          <button
            onClick={onClose}
            className="
            rounded-xl
            p-2
            transition
            hover:bg-background
            "
          >
            <FiX />
          </button>

        </div>

        {/* Body */}

        <div className="px-6 py-6">

          <p className="leading-8 text-text-secondary">

            {message}

          </p>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t border-border px-6 py-5">

          <button
            onClick={onClose}
            disabled={loading}
            className="
            rounded-xl
            border
            border-border
            px-5
            py-3
            font-semibold
            transition
            hover:bg-background
            "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="
            rounded-xl
            bg-red-600
            px-5
            py-3
            font-semibold
            text-white
            transition
            hover:bg-red-700
            disabled:opacity-60
            "
          >
            {loading
              ? "Deleting..."
              : "Delete"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default DeleteConfirmationModal;