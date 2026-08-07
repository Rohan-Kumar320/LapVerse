import { useState } from "react";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import { toast } from "react-toastify";

import { rejectSellerApplication } from "../../services/adminSellerService";

const RejectSellerModal = ({
    open,
    application,
    onClose,
    onUpdated,
}) => {

    const [loading, setLoading] = useState(false);

    const [reason, setReason] = useState("");

    if (!open || !application) return null;

    const handleReject = async () => {

        if (!reason.trim()) {

            toast.error("Please provide a rejection reason.");

            return;

        }

        try {

            setLoading(true);

            const updatedApplication =
                await rejectSellerApplication(

                    application._id,

                    reason

                );

            toast.success(

                "Application rejected successfully."

            );

            onUpdated(updatedApplication);

            setReason("");

            onClose();

        }

        catch (err) {

            toast.error(

                err.response?.data?.message ||

                "Unable to reject application."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 z-[130] bg-black/40 backdrop-blur-sm text-black">

            <div className="flex h-full items-center justify-center">

                <div className="w-full max-w-xl overflow-hidden rounded-[32px] bg-white shadow-2xl">

                    {/* Header */}

                    <div className="bg-gradient-to-r from-rose-600 to-pink-600 px-8 py-7 text-white">

                        <div className="flex items-center justify-between">

                            <div>

                                <h2 className="text-2xl font-black">

                                    Reject Application

                                </h2>

                                <p className="mt-1 text-sm text-rose-100">

                                    Reject seller verification request

                                </p>

                            </div>

                            <button onClick={onClose}>

                                <FiX size={24} />

                            </button>

                        </div>

                    </div>

                    {/* Body */}

                    <div className="space-y-6 p-8">

                        <div className="rounded-3xl bg-rose-50 p-6">

                            <div className="flex gap-4">

                                <FiAlertTriangle

                                    size={40}

                                    className="text-rose-600"

                                />

                                <div>

                                    <h3 className="font-bold text-slate-900">

                                        {application.user?.name}

                                    </h3>

                                    <p className="text-slate-600">

                                        {application.storeName}

                                    </p>

                                </div>

                            </div>

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">

                                Rejection Reason

                            </label>

                            <textarea

                                rows={5}

                                value={reason}

                                onChange={(e) =>

                                    setReason(e.target.value)

                                }

                                maxLength={300}

                                placeholder="Explain why this application was rejected..."

                                className="w-full rounded-2xl border border-slate-300 p-4 outline-none transition focus:border-rose-500"

                            />

                            <div className="mt-2 text-right text-xs text-slate-400">

                                {reason.length}/300

                            </div>

                        </div>

                    </div>

                    {/* Footer */}

                    <div className="flex justify-end gap-4 border-t px-8 py-6">

                        <button

                            onClick={onClose}

                            className="rounded-xl border px-6 py-3 font-semibold"

                        >

                            Cancel

                        </button>

                        <button

                            disabled={loading}

                            onClick={handleReject}

                            className="rounded-xl bg-rose-600 px-6 py-3 font-semibold text-white hover:bg-rose-700"

                        >

                            {loading

                                ? "Rejecting..."

                                : "Reject Application"}

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default RejectSellerModal;   