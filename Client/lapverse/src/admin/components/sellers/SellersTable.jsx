import {
    FiEye,
    FiSlash,
    FiMapPin,
    FiHome,
    FiCheck,
    FiUserX,
} from "react-icons/fi";

import ActionMenu from "../common/ActionMenu";

const roleStyles = {

    Individual:
        "bg-indigo-100 text-indigo-700",

    Business:
        "bg-purple-100 text-purple-700",

};

const statusStyles = {

    Active:
        "bg-green-100 text-green-700",

    Suspended:
        "bg-amber-100 text-amber-700",

    Deleted:
        "bg-red-100 text-red-700",

};

const SellersTable = ({

    sellers,

    onView,

    onSuspend,

    onReactivate,

    onRemoveRole,

    onRestore

}) => {

    return (

        <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-xl shadow-slate-200/40 text-black">

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="sticky top-0 bg-slate-50">

                        <tr className="border-b border-slate-200">

                            <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">

                                Seller

                            </th>

                            <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">

                                Store

                            </th>

                            <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">

                                Type

                            </th>

                            <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">

                                City

                            </th>

                            <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">

                                Status

                            </th>

                            <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">

                                Joined

                            </th>

                            <th className="px-6 py-5 text-right text-xs font-bold uppercase tracking-wider text-slate-500">

                                Actions

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {sellers.map((seller, index) => (

                            <tr

                                key={seller._id}

                                className={`transition hover:bg-slate-50 ${
                                    index % 2 === 0
                                        ? "bg-white"
                                        : "bg-slate-50/30"
                                }`}

                            >

                                {/* Seller */}

                                <td className="px-6 py-6">

                                    <div className="flex items-center gap-4">

                                        <img

                                            src={

                                                seller.avatar?.url ||

                                                "/default-avatar.png"

                                            }

                                            className="h-14 w-14 rounded-2xl object-cover border"

                                            alt=""

                                        />

                                        <div>

                                            <h3 className="font-bold">

                                                {seller.name}

                                            </h3>

                                            <p className="text-sm text-slate-500">

                                                {seller.email}

                                            </p>

                                        </div>

                                    </div>

                                </td>

                                {/* Store */}

                                <td className="px-6 py-6">

                                    <div className="flex items-center gap-2">

                                        <FiHome />

                                        {seller.application?.storeName || "-"}

                                    </div>

                                </td>

                                {/* Type */}

                                <td className="px-6 py-6">

                                    <span

                                        className={`rounded-full px-4 py-2 text-xs font-bold ${
                                            roleStyles[
                                                seller.application?.sellerType
                                            ]
                                        }`}

                                    >

                                        {seller.application?.sellerType}

                                    </span>

                                </td>

                                {/* City */}

                                <td className="px-6 py-6">

                                    <div className="flex items-center gap-2">

                                        <FiMapPin />

                                        {seller.application?.city}

                                    </div>

                                </td>

                                {/* Status */}

                                <td className="px-6 py-6">

                                    <span

                                        className={`rounded-full px-4 py-2 text-xs font-bold ${
                                            statusStyles[
                                                seller.accountStatus
                                            ]
                                        }`}

                                    >

                                        {seller.accountStatus}

                                    </span>

                                </td>

                                {/* Joined */}

                                <td className="px-6 py-6">

                                    {new Date(

                                        seller.createdAt

                                    ).toLocaleDateString()}

                                </td>

                                {/* Actions */}

                                <td className="px-6 py-6">

                                    <div className="flex justify-end">

                                        <ActionMenu

                                            items={[

                                                {

                                                    label: "View Seller",

                                                    icon: FiEye,

                                                    onClick: () =>

                                                        onView?.(seller),

                                                },

                                                ...(seller.accountStatus === "Suspended"

    ? [

        {

            label: "Reactivate Seller",

            icon: FiCheck,

            onClick: () => onReactivate(seller),

        },

    ]

    : [

        {

            label: "Suspend Seller",

            icon: FiSlash,

            onClick: () => onSuspend(seller),

        },

    ]),

...(seller.application?.status === "revoked"

    ? [

        {

            label: "Restore Seller Role",

            icon: FiCheck,

            onClick: () => onRestore(seller),

        },

    ]

    : [

        {

            label: "Revoke Seller Role",

            icon: FiSlash,

            danger: true,

            onClick: () => onRemoveRole(seller),

        },

    ]),

]}

                                        />

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default SellersTable;