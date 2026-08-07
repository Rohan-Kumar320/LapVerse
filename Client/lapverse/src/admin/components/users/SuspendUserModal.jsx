import { useEffect, useState } from "react";

import {
  FiAlertTriangle,
  FiCalendar,
  FiFileText,
  FiUser,
  FiX,
} from "react-icons/fi";

import { toast } from "react-toastify";

import { suspendUser } from "../../services/adminUserService";

const reasons = [
  "Spam / Fake Listings",
  "Fraudulent Activity",
  "Terms of Service Violation",
  "Abuse / Harassment",
  "Copyright Violation",
  "Payment Fraud",
  "Multiple Violations",
  "Other",
];

const roleColors = {
  admin: "bg-violet-100 text-violet-700",
  seller: "bg-emerald-100 text-emerald-700",
  user: "bg-sky-100 text-sky-700",
};

const SuspendUserModal = ({
  open,
  user,
  onClose,
  onUpdated,
}) => {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({

    reason: "",

    note: "",

    reviewDate: "",

    customReason: "",

  });

  useEffect(() => {

    if (!open) return;

    setForm({

      reason: "",

      note: "",

      reviewDate: "",

      customReason: "",

    });

  }, [open]);

  if (!open || !user) return null;

  const updateField = (key, value) => {

    setForm((prev) => ({

      ...prev,

      [key]: value,

    }));

  };

const handleSuspend = async ()=>{
 if (!form.reason) {

        return toast.error(
            "Please select a suspension reason."
        );

    }

    if (
        form.reason === "Other" &&
        !form.customReason.trim()
    ) {

        return toast.error(
            "Please enter a custom suspension reason."
        );

    }

    if (!form.note.trim()) {

        return toast.error(
            "Please enter internal notes."
        );

    }
    try{

        setLoading(true);


        const updatedUser = await suspendUser(
          

            user._id,

            {

                reason:

                    form.reason==="Other"

                    ? form.customReason

                    : form.reason,

                note:form.note,

                reviewDate:form.reviewDate,

            }

        );

        toast.success("User suspended.");

        onUpdated(updatedUser);

        onClose();

    }

    catch(err){

        toast.error(

            err.response?.data?.message ||

            "Unable to suspend user."

        );

    }

    finally{

        setLoading(false);

    }

};
  return (

    <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/50 backdrop-blur-sm p-6">

      <div className="w-full max-w-3xl rounded-[32px] bg-white shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 px-8 py-6">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">

              <FiAlertTriangle
                size={28}
                className="text-red-600"
              />

            </div>

            <div>

              <h2 className="text-3xl font-black text-slate-900">

                Suspend Account

              </h2>

              <p className="mt-1 text-slate-500">

                This action temporarily restricts the user's access.

              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-slate-100"
          >

            <FiX
              size={24}
              className="text-slate-700"
            />

          </button>

        </div>

        {/* Body */}

        <div className="max-h-[70vh] overflow-y-auto p-8 space-y-8">

          {/* User Card */}

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">

            <div className="flex items-center gap-5">

              <img
                src={
                  user.avatar?.url ||
                  "/default-avatar.png"
                }
                alt={user.name}
                className="h-24 w-24 rounded-full border-4 border-white object-cover shadow"
              />

              <div className="flex-1">

                <h3 className="text-2xl font-bold text-slate-900">

                  {user.name}

                </h3>

                <p className="mt-1 text-slate-500">

                  {user.email}

                </p>

                <div className="mt-4 flex flex-wrap gap-2">

                  {user.roles?.map((role) => (

                    <span
                      key={role}
                      className={`rounded-full px-4 py-2 text-xs font-bold capitalize ${roleColors[role]}`}
                    >

                      {role}

                    </span>

                  ))}

                </div>

              </div>

            </div>

          </div>

                    {/* Suspension Reason */}

          <div>

            <label className="mb-4 block text-lg font-bold text-slate-900">

              Suspension Reason

            </label>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">

              {reasons.map((reason) => (

                <button

                  key={reason}

                  type="button"

                  onClick={() => updateField("reason", reason)}

className={`
rounded-2xl
border-2
p-4
text-left
transition-all
duration-200
${
    form.reason === reason
        ? "border-red-500 bg-red-50 shadow-lg shadow-red-100"
        : "border-slate-200 bg-white hover:border-red-300 hover:bg-red-50"
}
${
    !form.reason
        ? "animate-pulse"
        : ""
}
`}
                >

                  <div className="flex items-center gap-3">

                    <div

                      className={`

                        h-4

                        w-4

                        rounded-full

                        border-2

                        ${

                          form.reason === reason

                            ? "border-red-500 bg-red-500"

                            : "border-slate-300"

                        }

                      `}

                    />

                    <span className="font-semibold text-slate-800">

                      {reason}

                    </span>

                  </div>

                </button>

              ))}

            </div>

          </div>

          {/* Custom Reason */}

          {form.reason === "Other" && (

            <div>

              <label className="mb-3 block font-semibold text-slate-800">

                Custom Reason

              </label>

              <input

                type="text"

                value={form.customReason}

                onChange={(e) =>

                  updateField(

                    "customReason",

                    e.target.value

                  )

                }

                placeholder="Enter custom suspension reason..."

                className="

                  w-full

                  rounded-2xl

                  border

                  border-slate-300

                  px-5

                  py-4

                  text-slate-900

                  outline-none

                  transition

                  focus:border-red-500

                  focus:ring-4

                  focus:ring-red-100

                "

              />

            </div>

          )}

          {/* Internal Notes */}

          <div>

            <label className="mb-3 flex items-center gap-2 font-semibold text-slate-800">

              <FiFileText />

              Internal Notes

            </label>

            <textarea
            
    required
    maxLength={500}
    

              rows={5}

              value={form.note}

              onChange={(e) =>

                updateField(

                  "note",

                  e.target.value

                )

              }

              placeholder="These notes are only visible to administrators..."

              className="

                w-full

                resize-none

                rounded-2xl

                border

                border-slate-300

                px-5

                py-4

                text-slate-900

                outline-none

                transition

                focus:border-red-500

                focus:ring-4

                focus:ring-red-100

              "

            />
            <p className="mt-2 text-xs text-slate-500 text-right">
    {form.note.length}/500
</p>

          </div>

          {/* Review Date */}

          <div>

            <label className="mb-3 flex items-center gap-2 font-semibold text-slate-800">

              <FiCalendar />

              Review Date

            </label>

            <input

              type="date"

              value={form.reviewDate}

              min={new Date().toISOString().split("T")[0]}

              onChange={(e) =>

                updateField(

                  "reviewDate",

                  e.target.value

                )

              }

              className="

                w-full

                rounded-2xl

                border

                border-slate-300

                px-5

                py-4

                text-slate-900

                outline-none

                transition

                focus:border-red-500

                focus:ring-4

                focus:ring-red-100

              "

            />

          </div>

          {/* Warning */}

          <div

            className="

              rounded-3xl

              border

              border-red-200

              bg-red-50

              p-6

            "

          >

            <div className="flex gap-4">

              <FiAlertTriangle

                size={28}

                className="mt-1 text-red-600"

              />

              <div>

                <h4 className="font-bold text-red-700">

                  Suspension Notice

                </h4>

                <p className="mt-2 leading-7 text-red-600">

                  The selected user will lose access to marketplace
                  functionality until their account is reactivated.
                  Suspension details will be stored in the audit
                  history and can later be reviewed by administrators.

                </p>

              </div>

            </div>

          </div>
                  {/* Footer */}

        <div
          className="
            sticky
            bottom-0
            border-t
            border-slate-200
            bg-white/95
            backdrop-blur
            px-8
            py-5
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">

                This action will be logged in the audit history.

              </p>

            </div>

            <div className="flex gap-3">

              <button

                onClick={onClose}

                disabled={loading}

                className="
                  rounded-2xl
                  border
                  border-slate-300
                  bg-white
                  px-6
                  py-3
                  font-semibold
                  text-slate-700
                  transition
                  hover:bg-slate-100
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "

              >

                Cancel

              </button>

              <button

                onClick={handleSuspend}

                disabled={loading}

                className="
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  bg-gradient-to-r
                  from-red-600
                  to-red-500
                  px-7
                  py-3
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-red-300/40
                  transition
                  hover:scale-[1.02]
                  hover:shadow-xl
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "

              >

                {

                  loading &&

                  <div
                    className="
                      h-5
                      w-5
                      animate-spin
                      rounded-full
                      border-2
                      border-white
                      border-t-transparent
                    "
                  />

                }

                {

                  loading

                  ? "Suspending..."

                  : "Suspend Account"

                }

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
    </div>

  );

};

export default SuspendUserModal;