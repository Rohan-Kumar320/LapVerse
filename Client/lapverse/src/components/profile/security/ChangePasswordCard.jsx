import { useState } from "react";
import {
  FiLock,
  FiEye,
  FiEyeOff,
  FiShield,
} from "react-icons/fi";

import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";

/* ---------------- Password Input ---------------- */

const PasswordInput = ({
  label,
  name,
  value,
  onChange,
  show,
  setShow,
  visibleKey,
}) => {
  return (
    <div className="space-y-2">

      <label className="text-sm font-medium text-text-secondary">
        {label}
      </label>

      <div className="relative">

        <FiLock
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-gray-500
          "
        />

        <input
          type={show[visibleKey] ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          autoComplete="off"
          className="
            w-full
            rounded-2xl
            border
            border-border
            bg-background
            py-3
            pl-12
            pr-12
            text-sm
            outline-none
            transition-all
            duration-300
            focus:border-primary
            focus:ring-2
            focus:ring-primary/20
          "
        />

        <button
          type="button"
          onClick={() =>
            setShow((prev) => ({
              ...prev,
              [visibleKey]: !prev[visibleKey],
            }))
          }
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-gray-400
            transition
            hover:text-white
          "
        >
          {show[visibleKey] ? (
            <FiEyeOff />
          ) : (
            <FiEye />
          )}
        </button>

      </div>

    </div>
  );
};

/* ---------------- Main Component ---------------- */

const ChangePasswordCard = () => {

  const { updatePassword } = useAuth();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      form.newPassword !==
      form.confirmPassword
    ) {
      return toast.error(
        "Passwords do not match."
      );
    }

    try {

      setLoading(true);

      const result =
        await updatePassword(form);

      if (result.success) {

        toast.success(result.message);

        setForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

      } else {

        toast.error(result.message);

      }

    } finally {

      setLoading(false);

    }

  };

  return (

    <div
      className="
        rounded-3xl
        border
        border-border
        bg-card
        shadow-xl
      "
    >

      {/* Header */}

      <div
        className="
          flex
          items-center
          gap-4
          border-b
          border-border
          px-6
          py-5
        "
      >

        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-primary/10
            text-primary
          "
        >

          <FiShield size={22} />

        </div>

        <div>

          <h2 className="text-lg font-semibold">
            Change Password
          </h2>

          <p className="mt-1 text-sm text-text-secondary">
            Update your password to keep your
            account secure.
          </p>

        </div>

      </div>

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-6"
      >

        <PasswordInput
          label="Current Password"
          name="currentPassword"
          value={form.currentPassword}
          onChange={handleChange}
          show={show}
          setShow={setShow}
          visibleKey="current"
        />

        <PasswordInput
          label="New Password"
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
          show={show}
          setShow={setShow}
          visibleKey="new"
        />

        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          show={show}
          setShow={setShow}
          visibleKey="confirm"
        />

        <div className="flex justify-end">

          <button
            type="submit"
            disabled={loading}
            className="
              rounded-2xl
              bg-primary
              px-8
              py-3
              text-sm
              font-semibold
              text-white
              transition-all
              duration-300
              hover:scale-[1.02]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >

            {loading
              ? "Updating..."
              : "Update Password"}

          </button>

        </div>

      </form>

    </div>

  );

};

export default ChangePasswordCard;