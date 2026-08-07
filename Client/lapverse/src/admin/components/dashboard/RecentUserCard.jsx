import {
  FiUsers,
} from "react-icons/fi";

const roleColor = {

  admin:
    "bg-red-100 text-red-700",

  seller:
    "bg-emerald-100 text-emerald-700",

  user:
    "bg-blue-100 text-blue-700",

};

const RecentUsersCard = ({
  users = [],
}) => {

  return (

    <div
      className="
      rounded-[30px]
      border
      border-neutral-200
      bg-white
      shadow-lg
      shadow-black/5
      overflow-hidden
    "
    >

      <div
        className="
        flex
        items-center
        justify-between
        border-b
        border-neutral-100
        p-7
      "
      >

        <div>

          <h2
            className="
            text-2xl
            font-black
            text-neutral-900
          "
          >

            Recent Users

          </h2>

          <p
            className="
            mt-2
            text-sm
            text-neutral-500
          "
          >

            Latest registered accounts

          </p>

        </div>

        <div
          className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-emerald-50
          text-emerald-600
        "
        >

          <FiUsers size={26} />

        </div>

      </div>

      {users.length === 0 ? (

        <div
          className="
          p-16
          text-center
          text-neutral-500
        "
        >

          No users found.

        </div>

      ) : (

        <div className="divide-y divide-neutral-100">

          {users.map((user) => {

            const role =
              user.roles?.includes("admin")

                ? "admin"

                : user.roles?.includes("seller")

                ? "seller"

                : "user";

            return (

              <div

                key={user._id}

                className="
                flex
                items-center
                justify-between
                p-6
                transition
                hover:bg-neutral-50
              "

              >

                <div
                  className="
                  flex
                  items-center
                  gap-4
                "
                >

                  <img

                    src={
                      user.avatar?.url ||
                      "/default-avatar.png"
                    }

                    alt={user.name}

                    className="
                    h-12
                    w-12
                    rounded-full
                    border
                    border-neutral-200
                    object-cover
                  "

                  />

                  <div>

                    <h3
                      className="
                      font-semibold
                      text-neutral-900
                    "
                    >

                      {user.name}

                    </h3>

                    <p
                      className="
                      text-sm
                      text-neutral-500
                    "
                    >

                      {user.email}

                    </p>

                  </div>

                </div>

                <div className="text-right">

                  <span
                    className={`
                    rounded-full
                    px-4
                    py-2
                    text-xs
                    font-bold
                    ${roleColor[role]}
                  `}
                  >

                    {role}

                  </span>

                  <p
                    className="
                    mt-2
                    text-xs
                    text-neutral-500
                  "
                  >

                    {new Date(
                      user.createdAt
                    ).toLocaleDateString()}

                  </p>

                </div>

              </div>

            );

          })}

        </div>

      )}

    </div>

  );

};

export default RecentUsersCard;