import { useNavigate } from "react-router-dom";

import {
  FiCheckCircle,
  FiArrowRight,
  FiUser,
} from "react-icons/fi";

import { useSeller } from "../../../context/SellerContext";
import { FaStore } from "react-icons/fa";

const ApprovedSellerCard = () => {

  const navigate = useNavigate();

  const {
    activeMode,
    changeMode,
  } = useSeller();

  return (

    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-green-500/20
        bg-card
        shadow-lg
      "
    >

      {/* Header */}

      <div
        className="
          border-b
          border-green-500/20
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
              bg-green-500/10
              text-green-500
            "
          >

            <FiCheckCircle size={30} />

          </div>

          <div>

            <h2 className="text-2xl font-bold">

              Seller Account Approved

            </h2>

            <p className="mt-2 text-sm text-text-secondary">

              Your seller account has been verified.
              You can now switch between shopping
              and managing your store.

            </p>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="space-y-8 px-8 py-8">

        {/* Status */}

        <div
          className="
            rounded-2xl
            border
            border-green-500/20
            bg-green-500/5
            p-6
          "
        >

          <h3 className="font-semibold">

            Account Status

          </h3>

          <p className="mt-3 text-sm leading-7 text-text-secondary">

            Congratulations! Your seller account has
            been approved and verified by the
            LapVerse team.

          </p>

        </div>

        {/* Toggle */}

        <div>

          <h3 className="font-semibold">

            Active Mode

          </h3>

          <p className="mt-2 text-sm text-text-secondary">

            Choose how you'd like to use LapVerse.

          </p>

          <div className="mt-6 flex gap-5">

            {/* User */}

            <button

              onClick={() =>
                changeMode("user")
              }
              disabled={activeMode === "user"}
              

              className={`
                flex-1
                rounded-2xl
                border
                p-6
                transition
                            disabled:cursor-not-allowed
disabled:opacity-60


                ${
                  activeMode === "user"

                    ? "border-primary bg-primary/5"

                    : "border-border hover:border-primary"
                }
              `}

            >

              <FiUser
                size={28}
                className="mx-auto text-primary"
              />

              <h4 className="mt-4 font-semibold">

                User Mode

              </h4>

              <p className="mt-3 text-sm leading-7 text-text-secondary">

                Browse products, wishlist,
                purchase laptops and manage
                your orders.

              </p>

            </button>

            {/* Seller */}

            <button

              onClick={() =>
                changeMode("seller")
              }
              disabled={activeMode === "seller"}

              className={`
                flex-1
                rounded-2xl
                border
                p-6
                transition
                            disabled:cursor-not-allowed
disabled:opacity-60


                ${
                  activeMode === "seller"

                    ? "border-primary bg-primary/5"

                    : "border-border hover:border-primary"
                }
              `}

            >

              <FaStore
                size={28}
                className="mx-auto text-primary"
              />

              <h4 className="mt-4 font-semibold">

                Seller Mode

              </h4>

              <p className="mt-3 text-sm leading-7 text-text-secondary">

                Manage products,
                orders,
                customers
                and store analytics.

              </p>

            </button>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div
        className="
          flex
          justify-end
          border-t
          border-border
          px-8
          py-6
        "
      >

        <button

          onClick={() =>
            navigate("/seller")
          }
           disabled={activeMode !== "seller"}

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
            disabled:cursor-not-allowed
disabled:opacity-60
          "

        >

          Go To Seller Dashboard

          <FiArrowRight />

        </button>

      </div>

    </div>

  );

};

export default ApprovedSellerCard;