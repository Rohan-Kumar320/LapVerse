import { useAuth } from "../../../context/AuthContext";
import { format } from "date-fns";

import ChangePasswordCard from "./ChangePasswordCard";
import DangerZone from "./DangerZone";

const Security = () => {

  const { user } = useAuth();

  return (

    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold">
          Security
        </h1>

        <p className="mt-2 text-text-secondary">
          Manage your password and account security.
        </p>

      </div>

      {/* Change Password */}

      <ChangePasswordCard />

      {/* Danger Zone */}

      {user?.deletionRequested ? (

        <div
          className="
            rounded-3xl
            border
            border-yellow-500/30
            bg-yellow-500/5
            p-8
          "
        >

          <h2 className="text-xl font-semibold text-yellow-400">

            Account Scheduled For Deletion

          </h2>

          <p className="mt-4 text-sm leading-7 text-text-secondary">

            Your account has already been scheduled for deletion.

            <br /><br />

            Scheduled deletion date:

            <span className="ml-2 font-semibold text-white">

              {format(
                new Date(user.deletionDate),
                "dd MMMM yyyy"
              )}

            </span>

            <br /><br />

            You can restore your account anytime before this date using
            the Restore Account button shown in the banner above.

          </p>

          <button
            disabled
            className="
              mt-6
              w-full
              rounded-2xl
              bg-red-600
              py-4
              font-semibold
              text-white
              opacity-40
              cursor-not-allowed
            "
          >

            Account Scheduled For Deletion

          </button>

        </div>

      ) : (

        <DangerZone />

      )}

    </div>

  );

};

export default Security;