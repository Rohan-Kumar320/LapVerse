import { useState } from "react";
import { FiCheckCircle, FiX } from "react-icons/fi";
import { toast } from "react-toastify";

import { approveSellerApplication } from "../../services/adminSellerService";

const ApproveSellerModal = ({
  open,
  application,
  onClose,
  onUpdated,
}) => {

  const [loading, setLoading] = useState(false);

  if (!open || !application) return null;

  const handleApprove = async () => {

    try {

      setLoading(true);

      const updatedApplication =
        await approveSellerApplication(
          application._id
        );

      toast.success(
        "Seller approved successfully."
      );

      onUpdated(updatedApplication);

      onClose();

    }

    catch (err) {

      toast.error(

        err.response?.data?.message ||

        "Unable to approve seller."

      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="fixed inset-0 z-[130] bg-black/40 backdrop-blur-sm">

      <div className="flex h-full items-center justify-center">

        <div
          className="
            w-full
            max-w-lg
            overflow-hidden
            rounded-[32px]
            bg-white
            shadow-2xl
          "
        >

          {/* Header */}

          <div
            className="
              bg-gradient-to-r
              from-emerald-600
              to-teal-600
              px-8
              py-7
              text-white
            "
          >

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-black">

                  Approve Seller

                </h2>

                <p className="mt-1 text-sm text-emerald-100">

                  Grant seller privileges

                </p>

              </div>

              <button onClick={onClose}>

                <FiX size={24} />

              </button>

            </div>

          </div>

          {/* Body */}

          <div className="space-y-6 p-8">

            <div
              className="
                rounded-3xl
                bg-emerald-50
                p-6
              "
            >

              <div className="flex gap-4">

                <FiCheckCircle
                  size={40}
                  className="text-emerald-600"
                />

                <div>

                  <h3 className="font-bold text-slate-900">

                    {application.user?.name}

                  </h3>

                  <p className="text-slate-600">

                    {application.storeName}

                  </p>

                </div>

              </div>

            </div>

            <p className="leading-7 text-slate-600">

              Approving this application will immediately
              grant this user Seller privileges.

            </p>

          </div>

          {/* Footer */}

          <div className="border-t px-8 py-6 flex justify-end gap-4">

            <button

              onClick={onClose}

              className="
                rounded-xl
                border
                px-6
                py-3
                font-semibold
              "

            >

              Cancel

            </button>

            <button

              onClick={handleApprove}

              disabled={loading}

              className="
                rounded-xl
                bg-emerald-600
                px-6
                py-3
                font-semibold
                text-white
                hover:bg-emerald-700
              "

            >

              {loading

                ? "Approving..."

                : "Approve Seller"}

            </button>

          </div>

        </div>

      </div>

    </div>

  );

};

export default ApproveSellerModal;