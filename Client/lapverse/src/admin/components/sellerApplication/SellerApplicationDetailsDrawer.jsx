import { FiX, FiUser, FiMail, FiPhone } from "react-icons/fi";

const SellerApplicationDetailsDrawer = ({
  open,
  application,
  onClose,
  onApprove,
  onReject,
}) => {

  if (!open || !application) return null;

  const user = application.user;

  return (

    <div className="fixed inset-0 z-[120] bg-black/30 backdrop-blur-sm text-slate-700">

      <div
        className="
          absolute
          right-0
          top-0
          h-full
          w-full
          max-w-2xl
          bg-white
          shadow-2xl
          flex
          flex-col
        "
      >

        {/* Header */}

        <div className="flex items-center justify-between border-b px-8 py-6">

          <div>

            <h2 className="text-2xl font-black text-slate-900">

              Seller Application

            </h2>

            <p className="text-sm text-slate-500">

              Review seller request

            </p>

          </div>

          <button onClick={onClose}>

            <FiX size={26} />

          </button>

        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">

          {/* Applicant */}

          <div className="rounded-3xl border border-slate-200 p-6">

            <h3 className="mb-5 text-lg font-bold">

              Applicant Information

            </h3>

            <div className="flex gap-5">

              <img

                src={
                  user.avatar?.url ||
                  "/default-avatar.png"
                }

                className="
                  h-24
                  w-24
                  rounded-3xl
                  object-cover
                  border
                "

              />

              <div className="space-y-4">

                <div className="flex items-center gap-3">

                  <FiUser />

                  <span>{user.name}</span>

                </div>

                <div className="flex items-center gap-3">

                  <FiMail />

                  <span>{user.email}</span>

                </div>

                <div className="flex items-center gap-3">

                  <FiPhone />

                  <span>

                    {application.phone}

                  </span>

                </div>

              </div>

            </div>

          </div>

                    {/* Store */}

          <div className="rounded-3xl border border-slate-200 p-6">

            <h3 className="mb-5 text-lg font-bold">

              Store Information

            </h3>

            <div className="grid grid-cols-2 gap-6">

              <div>

                <p className="text-xs uppercase text-slate-500">

                  Store Name

                </p>

                <p className="mt-1 font-semibold">

                  {application.storeName}

                </p>

              </div>

              <div>

                <p className="text-xs uppercase text-slate-500">

                  Seller Type

                </p>

                <p className="mt-1 font-semibold">

                  {application.sellerType}

                </p>

              </div>

              <div>

                <p className="text-xs uppercase text-slate-500">

                  City

                </p>

                <p className="mt-1 font-semibold">

                  {application.city}

                </p>

              </div>

              <div>

                <p className="text-xs uppercase text-slate-500">

                  CNIC

                </p>

                <p className="mt-1 font-semibold">

                  {application.cnic}

                </p>

              </div>

            </div>

          </div>

                    <div className="rounded-3xl border border-slate-200 p-6">

            <h3 className="mb-5 text-lg font-bold">

              Store Address

            </h3>

            <p className="leading-7 text-slate-700">

              {application.storeAddress}

            </p>

          </div>

          <div className="rounded-3xl border border-slate-200 p-6">

            <h3 className="mb-5 text-lg font-bold">

              Business Description

            </h3>

            <p className="leading-7 text-slate-700">

              {application.businessDescription}

            </p>

          </div>

                    <div className="rounded-3xl border border-slate-200 p-6">

            <h3 className="mb-5 text-lg font-bold">

              Application Status

            </h3>

            <span
              className={`
                rounded-full
                px-5
                py-2
                text-sm
                font-bold
                capitalize

                ${
                  application.status === "pending"

                    ? "bg-amber-100 text-amber-700"

                    : application.status === "approved"

                    ? "bg-green-100 text-green-700"

                    : "bg-red-100 text-red-700"

                }
              `}
            >

              {application.status}

            </span>

          </div>

        </div>

        {/* Footer */}

        {application.status === "pending" && (

          <div className="border-t px-8 py-6 flex justify-end gap-4">

            <button

              onClick={() => onReject(application)}

              className="
                rounded-xl
                bg-red-600
                px-6
                py-3
                font-semibold
                text-white
              "

            >

              Reject

            </button>

            <button

              onClick={() => onApprove(application)}

              className="
                rounded-xl
                bg-green-600
                px-6
                py-3
                font-semibold
                text-white
              "

            >

              Approve

            </button>

          </div>

        )}

      </div>

    </div>

  );

};

export default SellerApplicationDetailsDrawer;