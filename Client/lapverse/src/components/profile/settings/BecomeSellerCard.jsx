import { useState } from "react";

import {
  FiArrowRight,
  FiCheckCircle,
  FiShield,
  FiTrendingUp,
} from "react-icons/fi";

import SellerApplicationModal from "./SellerApplicationModal";

const BecomeSellerCard = () => {

  const [openModal, setOpenModal] =
    useState(false);

  return (

    <>

      <div
        className="
          overflow-hidden
          rounded-3xl
          border
          border-border
          bg-card
          shadow-lg
        "
      >

        {/* Header */}

        <div
          className="
            border-b
            border-border
            px-8
            py-7
          "
        >

          <h2 className="text-2xl font-bold">

            Become a Seller

          </h2>

          <p className="mt-2 text-sm leading-7 text-text-secondary">

            Start selling laptops and accessories on
            LapVerse. Submit your application for
            verification and join our trusted seller
            community.

          </p>

        </div>

        {/* Benefits */}

        <div className="grid gap-6 px-8 py-8 md:grid-cols-3">

          <div
            className="
              rounded-2xl
              border
              border-border
              bg-background
              p-6
            "
          >

            <FiTrendingUp
              size={30}
              className="text-primary"
            />

            <h3 className="mt-5 font-semibold">

              Grow Your Business

            </h3>

            <p className="mt-3 text-sm leading-7 text-text-secondary">

              Reach thousands of buyers looking for
              laptops and computer accessories.

            </p>

          </div>

          <div
            className="
              rounded-2xl
              border
              border-border
              bg-background
              p-6
            "
          >

            <FiShield
              size={30}
              className="text-primary"
            />

            <h3 className="mt-5 font-semibold">

              Verified Marketplace

            </h3>

            <p className="mt-3 text-sm leading-7 text-text-secondary">

              Every seller is manually reviewed to
              maintain a trusted buying experience.

            </p>

          </div>

          <div
            className="
              rounded-2xl
              border
              border-border
              bg-background
              p-6
            "
          >

            <FiCheckCircle
              size={30}
              className="text-primary"
            />

            <h3 className="mt-5 font-semibold">

              Easy Approval

            </h3>

            <p className="mt-3 text-sm leading-7 text-text-secondary">

              Submit your information once and receive
              approval after a quick manual review.

            </p>

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

              Ready to start selling?

            </h3>

            <p className="mt-2 text-sm text-text-secondary">

              Complete a short application and our
              team will review your account.

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

            Apply Now

            <FiArrowRight />

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

export default BecomeSellerCard;