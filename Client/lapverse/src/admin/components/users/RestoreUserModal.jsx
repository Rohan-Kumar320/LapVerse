import { useState } from "react";
import { restoreUser } from "../../services/adminUserService";
import { toast } from "react-toastify";

const RestoreUserModal = ({
    open,
    user,
    onClose,
    onUpdated,
}) => {

    const [loading, setLoading] = useState(false);

    if (!open || !user) return null;

    const handleRestore = async () => {

        try {

            setLoading(true);

            const updatedUser = await restoreUser(user._id);

            toast.success("User restored successfully.");

            onUpdated?.(updatedUser);

            onClose();

        }

        catch (err) {

            toast.error(

                err.response?.data?.message ||

                "Unable to restore user."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/40 backdrop-blur-sm">

            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

                <h2 className="text-2xl font-black text-slate-900">

                    Restore Account

                </h2>

                <p className="mt-4 text-slate-600">

                    Restore

                    <span className="font-bold">

                        {" "}{user.name}

                    </span>

                    ?

                </p>

                <div className="mt-8 flex justify-end gap-3">

                    <button

                        onClick={onClose}

                        className="rounded-xl border px-5 py-3"

                    >

                        Cancel

                    </button>

                    <button

                        onClick={handleRestore}

                        disabled={loading}

                        className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white"

                    >

                        {loading

                            ? "Restoring..."

                            : "Restore"}

                    </button>

                </div>

            </div>

        </div>

    );

};

export default RestoreUserModal;