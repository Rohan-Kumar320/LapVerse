import { FiX } from "react-icons/fi";

const SellerProfileDrawer = ({
    open,
    seller,
    onClose,
}) => {

    if (!open || !seller) return null;

    const application = seller.application;

    return (

        <div className="fixed inset-0 z-[120] bg-black/40 backdrop-blur-sm text-black">

            <div className="absolute right-0 top-0 h-full w-full max-w-3xl overflow-y-auto bg-slate-50 shadow-2xl">

                {/* Header */}

                <div className="sticky top-0 z-20 bg-gradient-to-r from-slate-700 to-green-400 px-8 py-7 text-white">

                    <div className="flex items-center justify-between">

                        <div>

                            <h2 className="text-3xl font-black">

                                Seller Profile

                            </h2>

                            <p className="mt-1 text-indigo-100">

                                Approved Seller Details

                            </p>

                        </div>

                        <button onClick={onClose}>

                            <FiX size={28} />

                        </button>

                    </div>

                </div>

                <div className="space-y-8 p-8">

                    {/* Profile Card */}
                    <div className="rounded-[30px] bg-white p-8 shadow-lg">

    <div className="flex items-center gap-6">

        <img

            src={

                seller.avatar?.url ||

                "/default-avatar.png"

            }

            className="h-28 w-28 rounded-3xl border object-cover"

            alt=""

        />

        <div className="space-y-2">

            <h2 className="text-3xl font-black">

                {seller.name}

            </h2>

            <p className="text-slate-500">

                {seller.email}

            </p>

            <div className="flex gap-3">

                <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">

                    {application?.sellerType}

                </span>

                <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">

                    {seller.accountStatus}

                </span>

            </div>

        </div>

    </div>

</div>

                    {/* Store Information */}

                    <div className="rounded-[30px] bg-white p-8 shadow-lg">

    <h3 className="mb-6 text-xl font-black text-slate-900">

        Store Information

    </h3>

    <div className="grid gap-6 md:grid-cols-2">

        <InfoItem

            label="Store Name"

            value={application?.storeName}

        />

        <InfoItem

            label="City"

            value={application?.city}

        />

        <InfoItem

            label="Phone"

            value={application?.phone}

        />

        <InfoItem

            label="Store Address"

            value={application?.storeAddress}

        />

    </div>

</div>

                    {/* Business Information */}

                    <div className="rounded-[30px] bg-white p-8 shadow-lg">

    <h3 className="mb-6 text-xl font-black">

        Business Information

    </h3>

    <div className="space-y-6">

        <InfoItem

            label="Business Description"

            value={application?.businessDescription}

        />

        <InfoItem

            label="CNIC"

            value={application?.cnic}

        />

        <InfoItem

            label="Applied"

            value={new Date(

                application?.submittedAt

            ).toLocaleDateString()}

        />

        <InfoItem

            label="Approved"

            value={

                application?.reviewedAt

                    ? new Date(

                        application.reviewedAt

                    ).toLocaleDateString()

                    : "-"

            }

        />

    </div>

</div>

                    {/* Seller Statistics */}

                    <div className="rounded-[30px] bg-white p-8 shadow-lg">

    <h3 className="mb-6 text-xl font-black">

        Seller Statistics

    </h3>

    <div className="grid grid-cols-2 gap-5 md:grid-cols-4">

        <StatCard
    title="Products"
    value={seller.stats?.products || 0}
/>

<StatCard
    title="Orders"
    value={seller.stats?.orders || 0}
/>

<StatCard
    title="Reviews"
    value={seller.stats?.reviews || 0}
/>

<StatCard
    title="Rating"
    value={seller.stats?.rating || 0}
/>

    </div>

</div>

                </div>

            </div>

        </div>

    );

};

export default SellerProfileDrawer;


const InfoItem = ({ label, value }) => (

    <div>

        <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">

            {label}

        </p>

        <p className="mt-2 text-base font-medium text-slate-800">

            {value || "-"}

        </p>

    </div>

);

const StatCard = ({ title, value }) => (

    <div className="rounded-2xl bg-slate-100 p-5 text-center">

        <p className="text-sm text-slate-500">

            {title}

        </p>

        <h2 className="mt-2 text-3xl font-black text-slate-900">

            {value}

        </h2>

    </div>

);