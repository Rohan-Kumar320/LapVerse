import { useEffect, useState } from "react";
import { FiPackage, FiX } from "react-icons/fi";

const UpdateStockModal = ({
  isOpen,
  onClose,
  currentStock,
  onSave,
  loading,
}) => {
  const [stock, setStock] = useState(currentStock);

  useEffect(() => {
    setStock(currentStock);
  }, [currentStock]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          border
          border-border
          bg-card
          p-8
          shadow-2xl
          animate-in
          fade-in
          zoom-in-95
        "
      >

        <div className="mb-6 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="rounded-2xl bg-primary/10 p-3 text-primary">
              <FiPackage size={24} />
            </div>

            <div>

              <h2 className="text-xl font-bold">
                Update Stock
              </h2>

              <p className="text-sm text-text-secondary">
                Change available quantity
              </p>

            </div>

          </div>

          <button onClick={onClose}>
            <FiX size={22} />
          </button>

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Stock Quantity
          </label>

          <input
            type="number"
            min="0"
            value={stock}
            onChange={(e) =>
              setStock(e.target.value)
            }
            className="
              w-full
              rounded-2xl
              border
              border-border
              bg-background
              px-5
              py-3
              outline-none
              focus:border-primary
            "
          />

        </div>

        <div className="mt-8 flex justify-end gap-4">

          <button
            onClick={onClose}
            className="
              rounded-2xl
              border
              border-border
              px-6
              py-3
              font-semibold
            "
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={() => onSave(Number(stock))}
            className="
              rounded-2xl
              bg-primary
              px-7
              py-3
              font-semibold
              text-white
            "
          >
            {loading ? "Updating..." : "Save"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default UpdateStockModal;