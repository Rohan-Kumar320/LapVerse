import { useEffect, useState } from "react";
import {
  FiAlertTriangle,
  FiX,
  FiTrash2,
  FiClock,
} from "react-icons/fi";

import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";

const CONFIRM_TEXT = "DELETE MY ACCOUNT";

const DeleteAccountModal = ({
  open,
  onClose,
}) => {

const {
  deleteAccountRequest,
  logout,
} = useAuth();

  const [text, setText] = useState("");
  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    if (open) {
      setText("");
    }

  }, [open]);

  if (!open) return null;

  const handleDelete = async () => {

    try {

      setLoading(true);

      const result =
        await deleteAccountRequest();

if (result.success) {

  toast.success(result.message);

  onClose();

}      else {

        toast.error(result.message);

      }

    } finally {

      setLoading(false);

    }

  };

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
        backdrop-blur-md
        p-5
      "
    >

      <div
        className="
          w-full
          max-w-xl
          overflow-hidden
          rounded-3xl
          border
          border-red-500/30
          bg-card
          shadow-2xl
        "
      >

        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-red-500/20
            px-7
            py-6
          "
        >

          <div className="flex items-center gap-4">

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-red-500/10
                text-red-500
              "
            >

              <FiAlertTriangle size={28} />

            </div>

            <div>

              <h2 className="text-xl font-bold text-red-400">

                Delete Account

              </h2>

              <p className="mt-1 text-sm text-text-secondary">

                This action cannot be easily undone.

              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="
              rounded-xl
              p-2
              text-gray-400
              transition
              hover:bg-background
              hover:text-white
            "
          >

            <FiX size={20} />

          </button>

        </div>

        {/* Body */}

        <div className="space-y-6 p-7">

          <div
            className="
              rounded-2xl
              border
              border-yellow-500/30
              bg-yellow-500/5
              p-5
            "
          >

            <div className="flex gap-3">

              <FiClock
                className="mt-1 text-yellow-400"
                size={20}
              />

              <div>

                <h3 className="font-semibold">

                  30-Day Recovery Period

                </h3>

                <p className="mt-2 text-sm leading-7 text-text-secondary">

                  Your account will not be deleted immediately.

                  <br /><br />

                  It will enter a 30-day review period.

                  <br /><br />

                  During those 30 days you can log back in and cancel the deletion request.

                  <br /><br />

                  After 30 days your account and all associated data will be permanently removed.

                </p>

              </div>

            </div>

          </div>

          <div>

            <label className="text-sm font-medium">

              Type

              <span className="ml-2 rounded-lg bg-background px-2 py-1 font-bold text-red-400">

                {CONFIRM_TEXT}

              </span>

            </label>

            <input
              value={text}
              onChange={(e) =>
                setText(e.target.value)
              }
              className="
                mt-3
                w-full
                rounded-2xl
                border
                border-border
                bg-background
                px-5
                py-4
                text-sm
                outline-none
                transition
                focus:border-red-500
              "
            />

          </div>

        </div>

        {/* Footer */}

        <div
          className="
            flex
            justify-end
            gap-3
            border-t
            border-border
            px-7
            py-5
          "
        >

          <button
            onClick={onClose}
            className="
              rounded-2xl
              border
              border-border
              px-6
              py-3
              font-medium
              transition
              hover:bg-background
            "
          >

            Cancel

          </button>

          <button
            disabled={
              text !== CONFIRM_TEXT ||
              loading
            }
            onClick={handleDelete}
            className="
              flex
              items-center
              gap-2
              rounded-2xl
              bg-red-600
              px-6
              py-3
              font-semibold
              text-white
              transition
              hover:bg-red-700
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >

            <FiTrash2 />

            {loading
              ? "Submitting..."
              : "Request Deletion"}

          </button>

        </div>

      </div>

    </div>

  );

};

export default DeleteAccountModal;