import {
  FiAlertTriangle,
  FiRotateCcw,
} from "react-icons/fi";

import { format } from "date-fns";
import { toast } from "react-toastify";

import { useAuth } from "../../../context/AuthContext";

const DeletionBanner = () => {

  const {
    user,
    restoreUserAccount,
    loading,
  } = useAuth();

  if (!user?.deletionRequested)
    return null;

  const handleRestore = async () => {

    const result = await restoreUserAccount();

    if (result.success) {

      toast.success(result.message);

    } else {

      toast.error(result.message);

    }

  };

  return (

    <div
      className="
        mb-8
        overflow-hidden
        rounded-3xl
        border
        border-yellow-500/30
        bg-yellow-500/5
        shadow-lg
      "
    >

      <div className="flex gap-5 p-6">

        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-yellow-500/10
            text-yellow-400
          "
        >

          <FiAlertTriangle size={26} />

        </div>

        <div className="flex-1">

          <h2 className="text-lg font-semibold">

            Your account is scheduled for deletion

          </h2>

          <p className="mt-3 text-sm leading-7 text-text-secondary">

            Your account will be permanently deleted on

            <span className="mx-1 font-semibold text-white">

              {format(
                new Date(user.deletionDate),
                "dd MMMM yyyy"
              )}

            </span>

            unless you restore it before then.

          </p>

        </div>

        <button
          disabled={loading}
          onClick={handleRestore}
          className="
            flex
            items-center
            gap-2
            self-center
            rounded-2xl
            bg-primary
            px-6
            py-3
            text-sm
            font-semibold
            text-white
            transition
            hover:scale-[1.02]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >

          <FiRotateCcw />

          Restore Account

        </button>

      </div>

    </div>

  );

};

export default DeletionBanner;