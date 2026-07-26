import {
  FiClock,
  FiShield,
  FiCheckCircle,
} from "react-icons/fi";

const PendingSellerCard = () => {

  return (

    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-yellow-500/20
        bg-card
        shadow-lg
      "
    >

      {/* Header */}

      <div
        className="
          border-b
          border-yellow-500/20
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
              bg-yellow-500/10
              text-yellow-400
            "
          >

            <FiClock size={28} />

          </div>

          <div>

            <h2 className="text-2xl font-bold">

              Application Under Review

            </h2>

            <p className="mt-2 text-sm text-text-secondary">

              Your seller application has been received
              and is currently being reviewed.

            </p>

          </div>

        </div>

      </div>

      {/* Content */}

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

          <FiCheckCircle
            size={28}
            className="text-green-500"
          />

          <h3 className="mt-4 font-semibold">

            Application Submitted

          </h3>

          <p className="mt-3 text-sm leading-7 text-text-secondary">

            Your application was successfully received
            by the LapVerse team.

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
            size={28}
            className="text-primary"
          />

          <h3 className="mt-4 font-semibold">

            Verification In Progress

          </h3>

          <p className="mt-3 text-sm leading-7 text-text-secondary">

            We are reviewing the information you
            provided to ensure marketplace trust and
            security.

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

          <FiClock
            size={28}
            className="text-yellow-400"
          />

          <h3 className="mt-4 font-semibold">

            Estimated Review Time

          </h3>

          <p className="mt-3 text-sm leading-7 text-text-secondary">

            Most seller applications are reviewed
            within 24–48 hours.

          </p>

        </div>

      </div>

      {/* Footer */}

      <div
        className="
          border-t
          border-border
          px-8
          py-6
        "
      >

        <div
          className="
            rounded-2xl
            border
            border-yellow-500/20
            bg-yellow-500/5
            p-5
          "
        >

          <p className="text-sm leading-7 text-text-secondary">

            No further action is required from you at
            this time. Once your application has been
            reviewed, your seller account status will
            be updated automatically.

          </p>

        </div>

      </div>

    </div>

  );

};

export default PendingSellerCard;