import { useState } from "react";
import {
  FiTrash2,
  FiAlertTriangle,
} from "react-icons/fi";

import DeleteAccountModal from "./DeleteAccountModal";

const DangerZone = () => {

  const [open, setOpen] = useState(false);

  return (

    <>

      <div
        className="
          rounded-3xl
          border
          border-red-500/30
          bg-card
          shadow-xl
        "
      >

        {/* Header */}

        <div
          className="
            flex
            items-center
            gap-4
            border-b
            border-red-500/20
            px-6
            py-5
          "
        >

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

            <FiAlertTriangle size={22} />

          </div>

          <div>

            <h2 className="text-lg font-semibold text-red-400">

              Danger Zone

            </h2>

            <p className="mt-1 text-sm text-text-secondary">

              Permanent actions related to your account.

            </p>

          </div>

        </div>

        {/* Body */}

        <div className="space-y-5 p-6">

          <p className="text-sm leading-7 text-text-secondary">

            Requesting account deletion will schedule your
            account for permanent removal after <b>30 days</b>.
            During this period you can still log in and cancel
            the deletion request.

          </p>

          <button
            onClick={() => setOpen(true)}
            className="
              flex
              items-center
              gap-2
              rounded-2xl
              border
              border-red-500
              px-6
              py-3
              text-sm
              font-semibold
              text-red-500
              transition-all
              duration-300
              hover:bg-red-500
              hover:text-white
            "
          >

            <FiTrash2 />

            Delete Account

          </button>

        </div>

      </div>

      <DeleteAccountModal
        open={open}
        onClose={() => setOpen(false)}
      />

    </>

  );

};

export default DangerZone;