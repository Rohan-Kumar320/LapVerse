import {
  FiEye,
  FiCheck,
  FiX,
} from "react-icons/fi";
import ActionMenu from "../common/ActionMenu";


const statusStyles = {

  pending:
    "bg-amber-100 text-amber-700",

  approved:
    "bg-green-100 text-green-700",

  rejected:
    "bg-red-100 text-red-700",

    revoked:
"bg-violet-100 text-violet-700",

};

const SellerApplicationsTable = ({

  applications,

  onView,

  onApprove,

  onReject,

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
      text-black
    "
    >

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead
            className="
            sticky
            top-0
            bg-slate-50
            z-10
          "
          >

            <tr className="border-b border-slate-200">

              <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">

                Applicant

              </th>

              <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">

                Store

              </th>

              <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">

                Seller Type

              </th>

              <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">

                City

              </th>

              <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">

                Status

              </th>

              <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">

                Submitted

              </th>

              <th className="px-6 py-5 text-right text-xs font-bold uppercase tracking-wider text-slate-500">

                Actions

              </th>

            </tr>

          </thead>

          <tbody>

            {applications.map((application,index)=>{

              return(

                <tr

                  key={application._id}

                  className={`
                    transition-all
                    hover:bg-blue-50/40
                    ${
                      index % 2 === 0
                        ? "bg-white"
                        : "bg-slate-50/30"
                    }
                  `}
                >

                  <td className="px-6 py-6">

                    <div className="flex items-center gap-4">

                      <img

                        src={
                          application.user?.avatar?.url ||
                          "/default-avatar.png"
                        }

                        className="
                          h-14
                          w-14
                          rounded-2xl
                          object-cover
                          border
                        "

                      />

                      <div>

                        <h3 className="font-bold text-slate-900">

                          {application.user?.name}

                        </h3>

                        <p className="text-sm text-slate-500">

                          {application.user?.email}

                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="px-6 py-6 font-semibold">

                    {application.storeName}

                  </td>

                  <td className="px-6 py-6">

                    {application.sellerType}

                  </td>

                  <td className="px-6 py-6">

                    {application.city}

                  </td>

                  <td className="px-6 py-6">

                    <span
                      className={`
                        rounded-full
                        px-4
                        py-2
                        text-xs
                        font-bold
                        capitalize
                        ${statusStyles[application.status]}
                      `}
                    >

                      {application.status}

                    </span>

                  </td>

                  <td className="px-6 py-6">

                    {new Date(

                      application.submittedAt

                    ).toLocaleDateString()}

                  </td>

                  <td className="px-6 py-6">

                    <div className="flex justify-end">

                      <ActionMenu

                        items={[

                          {

                            label:"View",

                            icon:FiEye,

                            onClick:()=>onView(application),

                          },

...(application.status === "pending"

    ? [

        {

            label: "Approve",

            icon: FiCheck,

            onClick: () => onApprove(application),

        },

        {

            label: "Reject",

            icon: FiX,

            danger: true,

            onClick: () => onReject(application),

        },

    ]

    : application.status === "revoked"

    ? [

        {

            label: "Restore Seller Role",

            icon: FiCheck,

            onClick: () => onRestore(application),

        },

    ]

    : []),
                        ]}

                      />

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

export default SellerApplicationsTable;