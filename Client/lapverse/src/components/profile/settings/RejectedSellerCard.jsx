import { useState } from "react";

import {
  FiAlertCircle,
  FiRefreshCw,
  FiFileText,
} from "react-icons/fi";

import { useSeller } from "../../../context/SellerContext";

import SellerApplicationModal from "./SellerApplicationModal";

const RejectedSellerCard = () => {

  const {
    application,
  } = useSeller();

  const [openModal, setOpenModal] =
    useState(false);

  return (

    <>

      <div
        className="
          overflow-hidden
          rounded-3xl
          border
          border-red-500/20
          bg-card
          shadow-lg
        "
      >

        {/* Header */}

        <div
          className="
            border-b
            border-red-500/20
            px-8
            py-7
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

              <FiAlertCircle size={28} />

            </div>

            <div>

              <h2 className="text-2xl font-bold">

                Application Rejected

              </h2>

              <p className="mt-2 text-sm text-text-secondary">

                Your seller application could not be
                approved.

              </p>

            </div>

          </div>

        </div>

        {/* Reason */}

        <div className="px-8 py-8">

          <div
            className="
              rounded-2xl
              border
              border-border
              bg-background
              p-6
            "
          >

            <div className="flex gap-4">

              <FiFileText
                size={26}
                className="text-primary mt-1"
              />

              <div>

                <h3 className="font-semibold">

                  Review Notes

                </h3>

                <p className="mt-4 text-sm leading-7 text-text-secondary">

                  {application?.rejectionReason ||

                    "Your application requires additional information before it can be approved. Please review your details and submit a new application."}

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div
          className="
            flex
            flex-col
            items-start
            justify-between
            gap-5
            border-t
            border-border
            px-8
            py-7
            md:flex-row
            md:items-center
          "
        >

          <div>

            <h3 className="font-semibold">

              You can apply again

            </h3>

            <p className="mt-2 text-sm text-text-secondary">

              Update your information and submit a
              new application for another review.

            </p>

          </div>

          <button

            onClick={() =>
              setOpenModal(true)
            }

            className="
              flex
              items-center
              gap-2
              rounded-2xl
              bg-primary
              px-6
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:scale-[1.02]
            "

          >

            <FiRefreshCw />

            Apply Again

          </button>

        </div>

      </div>

      <SellerApplicationModal

        open={openModal}

        onClose={() =>
          setOpenModal(false)
        }

        onSuccess={() => {

          setOpenModal(false);

        }}

      />

    </>

  );

};

export default RejectedSellerCard;