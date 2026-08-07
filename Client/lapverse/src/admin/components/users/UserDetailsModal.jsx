import {
  FiX,
  FiMail,
  FiPhone,
  FiCalendar,
  FiShield,
  FiCrosshair,
} from "react-icons/fi";

import {
  useEffect,
  useState,
} from "react";

import { getUserDetails } from "../../services/adminUserService";

const roleColors = {
  admin: "bg-violet-100 text-violet-700",
  seller: "bg-emerald-100 text-emerald-700",
  user: "bg-sky-100 text-sky-700",
};

const UserDetailsModal = ({
  open,
  user,
  onClose,
  onEdit
}) => {

  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState(null);

  // -------------------------
  // Fetch Details
  // -------------------------

  useEffect(() => {

    if (!open || !user) return;

    const fetchDetails = async () => {

      try {

        setLoading(true);

        const data =
          await getUserDetails(user._id);

        setUserData(data);

      }

      catch (err) {

        console.error(err);

      }

      finally {

        setLoading(false);

      }

    };

    fetchDetails();

  }, [open, user]);

  // -------------------------
  // Prevent Body Scroll
  // -------------------------

  useEffect(() => {

    if (!open) return;

    document.body.style.overflow = "hidden";

    return () => {

      document.body.style.overflow = "auto";

    };

  }, [open]);

  // -------------------------
  // ESC Close
  // -------------------------

  useEffect(() => {

    const handleKey = (e) => {

      if (e.key === "Escape") {

        onClose();

      }

    };

    if (open) {

      window.addEventListener(
        "keydown",
        handleKey
      );

    }

    return () => {

      window.removeEventListener(
        "keydown",
        handleKey
      );

    };

  }, [open]);

  if (!open) return null;

  if (loading || !userData) {

    return (

      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">

        <div className="rounded-3xl bg-white px-10 py-8 shadow-2xl">

          <p className="font-semibold text-slate-700">

            Loading user details...

          </p>

        </div>

      </div>

    );

  }

  return (

    <div

      onClick={onClose}

      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"

    >

      <div

        onClick={(e)=>e.stopPropagation()}

        className="
          w-full
          max-w-5xl
          max-h-[92vh]
          rounded-[32px]
          bg-white
          shadow-[0_30px_80px_rgba(0,0,0,.18)]
          flex
          flex-col
          overflow-hidden
        "

      >

        {/* Header */}

        <div className="
          sticky
          top-0
          z-20
          bg-white
          border-b
          border-slate-200
          px-8
          py-6
          flex
          items-center
          justify-between
        ">

          <div>

            <h2 className="text-3xl font-black text-slate-900">

              User Details

            </h2>

            <p className="mt-1 text-sm text-slate-500">

              Complete profile information

            </p>

          </div>

          <button

            onClick={onClose}

            className="
              h-11
              w-11
              rounded-xl
              flex
              items-center
              justify-center
              hover:bg-slate-100
              transition
            "

          >

            <FiX
              className="text-slate-700"
              size={22}
            />

          </button>

        </div>

        {/* Scrollable Body */}

        <div className="
          flex-1
          overflow-y-auto
          p-8
        ">

          <div className="
            flex
            flex-col
            xl:flex-row
            gap-10
          ">

            {/* Left Profile */}

            <div className="
              xl:w-72
              flex
              flex-col
              items-center
              shrink-0
            ">

              <img

                src={
                  userData.avatar?.url ||

                  "/default-avatar.png"
                }

                alt={userData.name}

                className="
                  h-40
                  w-40
                  rounded-full
                  border-4
                  border-slate-200
                  object-cover
                "

              />

              <h3 className="
                mt-6
                text-3xl
                font-black
                text-slate-900
                text-center
              ">

                {userData.name}

              </h3>

              <p className="
                mt-2
                text-slate-500
                text-center
              ">

                {userData.email}

              </p>

              <div className="
                mt-6
                flex
                flex-wrap
                justify-center
                gap-2
              ">

                {userData.roles.map(role=>(

                  <span

                    key={role}

                    className={`

                      rounded-full

                      px-4

                      py-2

                      text-xs

                      font-bold

                      capitalize

                      ${roleColors[role]}

                    `}

                  >

                    {role}

                  </span>

                ))}

              </div>

            </div>

            {/* Right Section Starts Here */}

            {/* Right Side */}

<div className="flex-1 space-y-8">

  {/* Information */}

  <div>

    <h3 className="mb-5 text-xl font-black text-slate-900">

      Personal Information

    </h3>

    <div className="grid gap-5 md:grid-cols-2">

      <InfoCard
        icon={<FiMail />}
        title="Email"
        value={userData.email}
      />

      <InfoCard
        icon={<FiPhone />}
        title="Phone"
        value={userData.phone || "Not Added"}
      />

      <InfoCard
        icon={<FiCalendar />}
        title="Joined"

        value={new Date(
          userData.createdAt
        ).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}

      />

      <InfoCard
        icon={<FiCrosshair />}
        title="Status"

        value={
          userData.deletionRequested
            ? "Deletion Requested"
            : "Active"
        }

      />

      <InfoCard

    icon={<FiShield />}

    title="Account Status"

    value={userData?.accountStatus || "Active"}

/>

    </div>

  </div>

  {/* Addresses */}

  <div>

    <div className="mb-5 flex items-center justify-between">

      <h3 className="text-xl font-black text-slate-900">

        Addresses

      </h3>

      <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">

        {userData.addresses?.length || 0}

      </span>

    </div>

    {

      userData.addresses?.length > 0 ?

      <div className="grid gap-4">

        {

          userData.addresses.map(address => (

            <div

              key={address._id}

              className="
                rounded-3xl
                border
                border-slate-200
                bg-slate-50
                p-5
                transition
                hover:border-blue-300
                hover:bg-blue-50
              "

            >

              <div className="flex items-center justify-between">

                <h4 className="font-bold text-slate-900">

                  {address.label || "Address"}

                </h4>

              </div>

              <p className="mt-3 text-slate-700">

                {address.addressLine}

              </p>

              <p className="mt-2 text-sm text-slate-500">

                {address.area}, {address.city}, {address.country}

              </p>

            </div>

          ))

        }

      </div>

      :

      <div className="
        rounded-3xl
        border-2
        border-dashed
        border-slate-300
        py-12
        text-center
        text-slate-500
      ">

        No Address Added

      </div>

    }

  </div>

</div>

</div>

</div>

{/* Footer */}

<div

  className="
    sticky
    bottom-0
    z-20
    flex
    flex-wrap
    justify-end
    gap-3
    border-t
    border-slate-200
    bg-white
    px-8
    py-5
  "

>

<button

    onClick={() => {

        onClose();

        onEdit(userData);

    }}

    className="
    rounded-xl
    bg-blue-600
    px-5
    py-3
    font-semibold
    text-white
"

>

    Edit User

</button>
  <button

    className="
      rounded-2xl
      bg-amber-500
      px-6
      py-3
      font-semibold
      text-white
      transition
      hover:bg-amber-600
    "

  >

    Suspend

  </button>

  <button

    className="
      rounded-2xl
      bg-red-600
      px-6
      py-3
      font-semibold
      text-white
      transition
      hover:bg-red-700
    "

  >

    Delete

  </button>

</div>

</div>

</div>
  )};
  export default UserDetailsModal


const InfoCard = ({ icon, title, value }) => (

  <div
    className="
      rounded-3xl
      border
      border-slate-200
      bg-slate-50
      p-5
      transition
      hover:border-blue-300
      hover:bg-blue-50
    "
  >

    <div className="flex items-center gap-3">

      <div
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-2xl
          bg-white
          text-blue-600
          shadow-sm
        "
      >

        {icon}

      </div>

      <div>

        <p className="text-sm font-medium text-slate-500">

          {title}

        </p>

        <h4 className="mt-1 break-all font-bold text-slate-900">

          {value}

        </h4>

      </div>

    </div>

  </div>

);