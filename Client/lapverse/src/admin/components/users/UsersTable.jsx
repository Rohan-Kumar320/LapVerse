import {
  FiEye,
  FiEdit,
  FiSlash,
  FiTrash2,
  FiMail,
  FiCheck
} from "react-icons/fi";
import ActionMenu from "../common/ActionMenu";

const roleStyles = {

  admin:
    "bg-violet-100 text-violet-700",

  seller:
    "bg-emerald-100 text-emerald-700",

  user:
    "bg-sky-100 text-sky-700",

};

const statusStyles = {

  Active: "bg-green-100 text-green-700",

  Suspended: "bg-amber-100 text-amber-700",

  Deleted: "bg-red-100 text-red-700",

  Banned: "bg-violet-100 text-violet-700",

};

const deletionStyles = {

  false: "bg-green-100 text-green-700",

  true: "bg-red-100 text-red-700",

};

const UsersTable = ({
  users,
  onView,
  onEdit,
  refreshUsers,
  onSuspend,
  onReactivate,
  onDelete,
  onRestore
}) => {

  return (

    <div
      className="
      overflow-hidden
      rounded-[30px]
      border
      border-slate-200
      bg-white
      shadow-xl
      shadow-slate-200/40
    "
    >

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead
            className="
            sticky
            top-0
            z-10
            bg-slate-50
          "
          >

            <tr
              className="
              border-b
              border-slate-200
            "
            >

              <th className="w-14 px-6 py-5">

                <input
                  type="checkbox"
                  className="
                  h-4
                  w-4
                  accent-blue-600
                "
                />

              </th>

              <th
                className="
                px-6
                py-5
                text-left
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-slate-500
              "
              >

                User

              </th>

              <th
                className="
                px-6
                py-5
                text-left
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-slate-500
              "
              >

                Role

              </th>

              <th
                className="
                px-6
                py-5
                text-left
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-slate-500
              "
              >

                Deletion Status

              </th>

              <th
                className="
                px-6
                py-5
                text-left
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-slate-500
              "
              >

                Account Status

              </th>

              <th
                className="
                px-6
                py-5
                text-left
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-slate-500
              "
              >

                Joined

              </th>

              

              <th
                className="
                px-6
                py-5
                text-right
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-slate-500
              "
              >

                Actions

              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user,index)=>{

              const role =

                user.roles.includes("admin")

                  ? "admin"

                  : user.roles.includes("seller")

                  ? "seller"

                  : "user";

              const accountStatus = user.accountStatus || "Active";

const deletionStatus = user.deletionRequested;

              return(

                <tr

                  key={user._id}

                  className={`
                  transition-all
                  hover:bg-blue-50/50
                  ${
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-slate-50/30"
                  }
                `}

                >

                  {/* Checkbox */}

                  <td className="px-6 py-6">

                    <input

                      type="checkbox"

                      className="
                      h-4
                      w-4
                      accent-blue-600
                    "

                    />

                  </td>

                  {/* User */}

                  <td className="px-6 py-6">

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
                        h-14
                        w-14
                        rounded-2xl
                        border
                        border-slate-200
                        object-cover
                      "

                      />

                      <div>

                        <h3
                          className="
                          font-bold
                          text-slate-900
                        "
                        >

                          {user.name}

                        </h3>

                        <div
                          className="
                          mt-1
                          flex
                          items-center
                          gap-2
                          text-sm
                          text-slate-500
                        "
                        >

                          <FiMail size={14}/>

                          {user.email}

                        </div>

                      </div>

                    </div>

                  </td>

                  {/* Role */}

                  <td className="px-6 py-6">

                    <span
                      className={`
                      rounded-full
                      px-4
                      py-2
                      text-xs
                      font-bold
                      capitalize
                      ${roleStyles[role]}
                    `}
                    >

                      {role}

                    </span>

                  </td>

                  {/* Status */}

<td className="px-6 py-6">

  <span
    className={`
      rounded-full
      px-4
      py-2
      text-xs
      font-bold
      ${deletionStyles[deletionStatus]}
    `}
  >
    {deletionStatus ? "Requested" : "None"}
  </span>

</td>
<td className="px-6 py-6">

  <span
    className={`
      rounded-full
      px-4
      py-2
      text-xs
      font-bold
      ${statusStyles[accountStatus]}
    `}
  >
    {accountStatus}
  </span>

</td>
                  {/* Joined */}

                  <td
                    className="
                    px-6
                    py-6
                    font-medium
                    text-slate-700
                  "
                  >

                    {

                      new Date(

                        user.createdAt

                      ).toLocaleDateString()

                    }

                  </td>

                  {/* Actions */}

                  <td className="px-6 py-6">

                    <div className="flex justify-end">


                        <ActionMenu

items={[

  {
    label: "View",
    icon: FiEye,
    onClick: () => onView(user),
  },

  {
    label: "Edit",
    icon: FiEdit,
    onClick: () => onEdit(user),
  },

  ...(user.accountStatus === "Deleted"

    ? [

        {
          label: "Restore Account",
          icon: FiCheck,
          onClick: () => onRestore(user),
        },

      ]

    : [

        ...(user.accountStatus === "Suspended"

          ? [

              {
                label: "Reactivate Account",
                icon: FiCheck,
                onClick: () => onReactivate(user),
              },

            ]

          : [

              {
                label: "Suspend Account",
                icon: FiSlash,
                onClick: () => onSuspend(user),
              },

            ]),

        {
          label: "Delete",
          icon: FiTrash2,
          danger: true,
          onClick: () => onDelete(user),
        },

      ]),

]}/>
                    </div>

                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default UsersTable;