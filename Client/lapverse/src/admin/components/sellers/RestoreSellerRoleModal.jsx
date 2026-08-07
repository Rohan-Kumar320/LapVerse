import { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import { restoreSellerRole } from "../../services/adminSellerService";

const RestoreSellerRoleModal = ({
  open,
  seller,
  onClose,
  onUpdated,
}) => {

  const [reason, setReason] = useState("");

  const [loading, setLoading] = useState(false);

  if (!open || !seller) return null;

  const handleSubmit = async () => {

    if (!reason.trim()) {

      return toast.error(
        "Please provide a reason."
      );

    }

    try {

      setLoading(true);

      const updatedSeller =
        await restoreSellerRole(
          seller._id,
          reason
        );

      toast.success(
        "Seller role restored successfully."
      );

      onUpdated(updatedSeller);

      setReason("");

      onClose();

    }

    catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Unable to restore seller role."

      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 text-black">

      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">

        <div className="mb-6 flex items-center gap-4">

          <div className="rounded-2xl bg-emerald-100 p-3">

            <FiCheckCircle
              className="text-emerald-600"
              size={24}
            />

          </div>

          <div>

            <h2 className="text-2xl font-bold">

              Restore Seller Role

            </h2>

            <p className="text-slate-500">

              {seller.user.name}

            </p>

          </div>

        </div>

        <p className="mb-5 text-sm text-slate-600">

          This will restore the seller role for this account.
          The seller will remain in <strong>User Mode</strong> until they manually switch back.

        </p>

        <textarea

          rows={5}

          value={reason}

          onChange={(e) =>
            setReason(e.target.value)
          }

          placeholder="Reason for restoring seller role..."

          className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-emerald-500"

        />

        <div className="mt-8 flex justify-end gap-3">

          <button

            onClick={onClose}

            className="rounded-xl border border-slate-300 px-5 py-2"

          >

            Cancel

          </button>

          <button

            disabled={loading}

            onClick={handleSubmit}

            className="rounded-xl bg-emerald-600 px-6 py-2 font-semibold text-white hover:bg-emerald-700"

          >

            {loading

              ? "Restoring..."

              : "Restore Seller Role"}

          </button>

        </div>

      </div>

    </div>

  );

};

export default RestoreSellerRoleModal;