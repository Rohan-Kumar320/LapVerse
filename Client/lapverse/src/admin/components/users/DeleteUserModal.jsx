import { useState } from "react";
import {
  FiTrash2,
  FiAlertTriangle,
  FiX,
} from "react-icons/fi";
import { toast } from "react-toastify";

import { deleteUser } from "../../services/adminUserService";

const DeleteUserModal = ({
  open,
  user,
  onClose,
  onUpdated,
}) => {

  const [loading, setLoading] = useState(false);

  if (!open || !user) return null;

  const handleDelete = async () => {

    try {

      setLoading(true);

      const updatedUser = await deleteUser(user._id);

      toast.success("User deleted successfully.");

      onUpdated?.(updatedUser);

      onClose();

    }

    catch (err) {

      toast.error(

        err.response?.data?.message ||

        "Unable to delete user."

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
          max-w-xl
          overflow-hidden
          rounded-[32px]
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

            <h2 className="text-2xl font-black text-slate-900">

              Delete User

            </h2>

            <p className="mt-1 text-sm text-slate-500">

              Archive this account safely.

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

          <div className="flex gap-5">

            <div
              className="
                flex
                h-16
                w-16
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-red-100
              "
            >

              <FiAlertTriangle
                size={30}
                className="text-red-600"
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

                Delete

                <span className="text-red-600">

                  {" "}
                  {user.name}

                </span>

                ?

              </h3>

              <p className="mt-4 leading-7 text-slate-600">

                This action will archive the user's account.

                The account will no longer be able to log in,

                but all orders, reviews, products and records

                will remain safely stored.

              </p>

              <div
                className="
                  mt-6
                  rounded-2xl
                  border
                  border-red-200
                  bg-red-50
                  p-5
                "
              >

                <div className="space-y-3 text-sm text-black">

                  <div>

                    <span className="font-semibold">

                      User

                    </span>

                    <div className="mt-1">

                      {user.name}

                    </div>

                  </div>

                  <div>

                    <span className="font-semibold">

                      Email

                    </span>

                    <div className="mt-1 break-all">

                      {user.email}

                    </div>

                  </div>

                  <div>

                    <span className="font-semibold">

                      Current Status

                    </span>

                    <div className="mt-1">

                      {user.accountStatus}

                    </div>

                  </div>

                </div>

              </div>

              <div
                className="
                  mt-6
                  rounded-2xl
                  bg-amber-50
                  p-5
                  text-sm
                  leading-7
                  text-amber-800
                "
              >

                <strong>

                  This is NOT a permanent deletion.

                </strong>

                <br />

                The account will be archived and can be restored later by an administrator.

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

            onClick={handleDelete}

            disabled={loading}

            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-red-600
              px-6
              py-3
              font-semibold
              text-white
              transition
              hover:bg-red-700
              disabled:cursor-not-allowed
              disabled:opacity-60
            "

          >

            <FiTrash2 size={18} />

            {

              loading

                ? "Deleting..."

                : "Delete User"

            }

          </button>

        </div>

      </div>

    </div>

  );

};

export default DeleteUserModal;