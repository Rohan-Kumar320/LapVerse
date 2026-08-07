import { useState } from "react";
import {
  FiRotateCcw,
  FiX,
} from "react-icons/fi";
import { toast } from "react-toastify";

import { reactivateUser } from "../../services/adminUserService";

const ReactivateUserModal = ({
  open,
  user,
  onClose,
  onUpdated,
}) => {

  const [loading, setLoading] = useState(false);

  if (!open || !user) return null;

  const handleReactivate = async () => {

    try {

      setLoading(true);

      const updatedUser = await reactivateUser(user._id);

      toast.success(
        "User account reactivated successfully."
      );

      onUpdated?.(updatedUser);

      onClose();

    }

    catch (err) {

      toast.error(

        err.response?.data?.message ||

        "Unable to reactivate account."

      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div
      className="
        fixed
        inset-0
        z-[130]
        flex
        items-center
        justify-center
        bg-black/50
        backdrop-blur-sm
        p-4
      "
    >

      <div
        className="
          w-full
          max-w-lg
          overflow-hidden
          rounded-[30px]
          bg-white
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
            border-slate-200
            px-8
            py-6
          "
        >

          <div>

            <h2
              className="
                text-2xl
                font-black
                text-slate-900
              "
            >

              Reactivate Account

            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >

              Restore this user's access.

            </p>

          </div>

          <button

            onClick={onClose}

            disabled={loading}

            className="
              rounded-xl
              p-2
              transition
              hover:bg-slate-100
            "

          >

            <FiX
              size={22}
              className="text-slate-600"
            />

          </button>

        </div>

        {/* Body */}

        <div className="px-8 py-8">

          <div
            className="
              flex
              items-start
              gap-5
            "
          >

            <div
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-emerald-100
              "
            >

              <FiRotateCcw
                size={28}
                className="text-emerald-600"
              />

            </div>

            <div className="flex-1">

              <h3
                className="
                  text-xl
                  font-bold
                  text-slate-900
                "
              >

                Reactivate

                <span className="text-emerald-600">

                  {" "}
                  {user.name}

                </span>

                ?

              </h3>

              <p
                className="
                  mt-3
                  leading-7
                  text-slate-600
                "
              >

                This will immediately restore the user's
                access to LapVerse.

              </p>

              <div
                className="
                  mt-6
                  rounded-2xl
                  border
                  border-emerald-200
                  bg-emerald-50
                  p-5
                "
              >

                <div className="space-y-2 text-sm">

                  <div>

                    <span className="font-semibold">

                      User:

                    </span>{" "}

                    {user.name}

                  </div>

                  <div>

                    <span className="font-semibold">

                      Email:

                    </span>{" "}

                    {user.email}

                  </div>

                  <div>

                    <span className="font-semibold">

                      Current Status:

                    </span>{" "}

                    <span className="font-bold text-red-600">

                      Suspended

                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div
          className="
            flex
            justify-end
            gap-4
            border-t
            border-slate-200
            bg-slate-50
            px-8
            py-5
          "
        >

          <button

            onClick={onClose}

            disabled={loading}

            className="
              rounded-xl
              border
              border-slate-300
              bg-white
              px-6
              py-3
              font-semibold
              text-slate-700
              transition
              hover:bg-slate-100
            "

          >

            Cancel

          </button>

          <button

            onClick={handleReactivate}

            disabled={loading}

            className="
              rounded-xl
              bg-emerald-600
              px-6
              py-3
              font-semibold
              text-white
              transition
              hover:bg-emerald-700
              disabled:cursor-not-allowed
              disabled:opacity-60
            "

          >

            {

              loading

                ? "Reactivating..."

                : "Reactivate Account"

            }

          </button>

        </div>

      </div>

    </div>

  );

};

export default ReactivateUserModal;