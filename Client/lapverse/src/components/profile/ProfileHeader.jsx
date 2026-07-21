import { Link } from "react-router-dom";
import { FiEdit2, FiCamera } from "react-icons/fi";

const ProfileHeader = ({ user, greeting, setActiveTab }) => {

  
  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Recently";

  const role =
    user?.roles?.includes("admin")
      ? "Administrator"
      : user?.roles?.includes("seller")
      ? "Seller"
      : "Customer";

  return (
    <div
      className="
        rounded-2xl
        border
        border-gray-800
        bg-[#111827]
        p-6
        lg:p-8
      "
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">

          {/* Avatar */}

          <div className="relative">

            <img
              src={
                user?.avatar?.url ||
                `https://ui-avatars.com/api/?background=4f46e5&color=fff&name=${encodeURIComponent(
                  user?.name || "User"
                )}`
              }
              alt={user?.name}
              className="
                h-28
                w-28
                rounded-full
                border-4
                border-indigo-500
                object-cover
              "
            />

            <div
              className="
                absolute
                bottom-1
                right-1
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-indigo-600
                text-white
                shadow-lg
              "
            >
              <FiCamera size={17} />
            </div>

          </div>

          {/* Info */}

          <div>

            <p className="text-sm text-indigo-400">
             {greeting} and Welcome Back 👋
            </p>

            <h1 className="mt-2 text-3xl font-bold text-white">
              {user?.name}
            </h1>

            <p className="mt-2 text-gray-400">
              {user?.email}
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:justify-start">

              <span
                className="
                  rounded-full
                  bg-indigo-500/10
                  px-4
                  py-1
                  text-sm
                  font-medium
                  text-indigo-400
                "
              >
                {role}
              </span>

              <span className="text-sm text-gray-500">
                Member since {joinDate}
              </span>

            </div>

          </div>

        </div>

        {/* Right */}

<button
  onClick={() => setActiveTab("edit-profile")}
  className="
    inline-flex
    items-center
    justify-center
    gap-2
    rounded-xl
    bg-indigo-600
    px-6
    py-3
    font-semibold
    text-white
    transition-all
    duration-300
    hover:bg-indigo-500
    hover:shadow-lg
  "
>
  <FiEdit2 />

  Edit Profile
</button>
      </div>

    </div>
  );
};

export default ProfileHeader;