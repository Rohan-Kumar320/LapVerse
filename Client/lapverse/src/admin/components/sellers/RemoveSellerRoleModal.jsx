import { useState } from "react";
import { FiUserX } from "react-icons/fi";
import { toast } from "react-toastify";
import { removeSellerRole } from "../../services/adminSellerService";

const RemoveSellerRoleModal = ({
    open,
    seller,
    onClose,
    onUpdated,
}) => {

    const [reason, setReason] = useState("");

    const [loading, setLoading] = useState(false);

    if (!open || !seller) return null;

    const handleSubmit = async () => {

        if (!reason.trim()) {

            return toast.error(
                "Please provide a reason."
            );

        }

        try {

            setLoading(true);

            const updatedSeller =
                await removeSellerRole(
                    seller._id,
                    reason
                );

            toast.success(
                "Seller role removed."
            );

            onUpdated(updatedSeller);

            setReason("");

            onClose();

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Unable to remove seller role."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 text-black">

            <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">

                <div className="mb-6 flex items-center gap-4">

                    <div className="rounded-2xl bg-orange-100 p-3">

                        <FiUserX
                            className="text-orange-600"
                            size={24}
                        />

                    </div>

                    <div>

                        <h2 className="text-2xl font-bold">

                            Remove Seller Role

                        </h2>

                        <p className="text-slate-500">

                            {seller.name}

                        </p>

                    </div>

                </div>

                <textarea

                    rows={5}

                    value={reason}

                    onChange={(e) =>
                        setReason(e.target.value)
                    }

                    placeholder="Reason for removing seller role..."

                    className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-orange-500"

                />

                <div className="mt-8 flex justify-end gap-3">

                    <button

                        onClick={onClose}

                        className="rounded-xl border border-slate-300 px-5 py-2"

                    >

                        Cancel

                    </button>

                    <button

                        disabled={loading}

                        onClick={handleSubmit}

                        className="rounded-xl bg-orange-600 px-6 py-2 font-semibold text-white hover:bg-orange-700"

                    >

                        {loading

                            ? "Removing..."

                            : "Remove Role"}

                    </button>

                </div>

            </div>

        </div>

    );

};

export default RemoveSellerRoleModal;