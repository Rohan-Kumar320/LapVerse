import { useEffect, useMemo, useState, useRef } from "react";
import {
  FiX,
  FiUser,
  FiPhone,
  FiShield,
  FiCheck,
  FiLoader,
  FiCamera,
} from "react-icons/fi";

import { toast } from "react-toastify";
import { updateUser,updateUserAvatar } from "../../services/adminUserService";

const ROLE_OPTIONS = [
  {
    value: "user",
    label: "User",
    color:
      "bg-sky-100 text-sky-700 border-sky-200",
  },
  {
    value: "seller",
    label: "Seller",
    color:
      "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  {
    value: "admin",
    label: "Admin",
    color:
      "bg-violet-100 text-violet-700 border-violet-200",
  },
];

const STATUS = [
  "Active",
  "Suspended",
];

const EditUserDrawer = ({
  open,
  user,
  onClose,
  onUpdated,
}) => {

  const [saving, setSaving] =
    useState(false);

    const [userData, setUserData] = useState(user);

    const [avatarUploading, setAvatarUploading] = useState(false);

    const [avatarFile, setAvatarFile] = useState(null);

const [avatarPreview, setAvatarPreview] = useState("");

const fileInputRef = useRef(null);

  const [form, setForm] = useState({

    name: "",

    phone: "",

    roles: [],

    accountStatus: "Active",

  });

  useEffect(() => {

  setUserData(user);

}, [user]);

  useEffect(() => {

    if (!user) return;

    setForm({

      name: user.name || "",

      phone: user.phone || "",

      roles: user.roles || [],

      // accountStatus:
      //   user.accountStatus || "Active",

    });

  }, [user]);

const dirty = useMemo(() => {

  if (!user) return false;

  const formChanged =
    JSON.stringify({

      name: form.name,

      phone: form.phone,

      roles: [...form.roles].sort(),

      // accountStatus: form.accountStatus,

    }) !==
    JSON.stringify({

      name: user.name || "",

      phone: user.phone || "",

      roles: [...(user.roles || [])].sort(),

      // accountStatus: user.accountStatus || "Active",

    });

  return formChanged || !!avatarFile;

}, [form, user, avatarFile]);


  if (!open || !user)
    return null;

  const updateField = (
    key,
    value
  ) => {

    setForm((prev) => ({

      ...prev,

      [key]: value,

    }));

  };

  const toggleRole = (role) => {

    if (
      form.roles.includes(role)
    ) {

      updateField(

        "roles",

        form.roles.filter(
          (r) => r !== role
        )

      );

    }

    else {

      updateField(

        "roles",

        [...form.roles, role]

      );

    }

  };

const handleAvatarChange = (e) => {

  const file = e.target.files[0];

  if (!file) return;

  setAvatarFile(file);

  setAvatarPreview(URL.createObjectURL(file));

};

const handleSave = async () => {

  setSaving(true);

  try {

    // Update user information
    let updatedUser = await updateUser(

      user._id,

      form

    );

    // Upload avatar only if a new one was selected
    if (avatarFile) {

      updatedUser = await updateUserAvatar(

        user._id,

        avatarFile

      );

    }

    // Update local drawer state
    setUserData(updatedUser);

    // Update Users table instantly
    onUpdated?.(updatedUser);

    toast.success("User updated successfully.");

    // Reset temporary avatar preview
    setAvatarFile(null);

    setAvatarPreview("");

    // Close drawer
    onClose();

  }

  catch (err) {

    toast.error(

      err.response?.data?.message ||

      "Unable to update user."

    );

  }

  finally {

    setSaving(false);

  }

};
return (

    <div className="fixed inset-0 z-[200]">

      <div

        onClick={onClose}

        className="
        absolute
        inset-0
        bg-slate-900/40
        backdrop-blur-sm
      "

      />

      <div
        className="
        absolute
        right-0
        top-0
        h-full
        w-full
        max-w-2xl
        bg-white
        shadow-[0_20px_60px_rgba(0,0,0,.25)]
        flex
        flex-col
      "
      >

        <div
          className="
          border-b
          border-slate-200
          px-8
          py-6
          flex
          items-center
          justify-between
        "
        >

          <div>

            <h2
              className="
              text-3xl
              font-black
              text-slate-900
            "
            >

              Edit User

            </h2>

            <p
              className="
              mt-1
              text-sm
              text-slate-500
            "
            >

              Update basic account
              information.

            </p>

          </div>

          <button

            onClick={onClose}

            className="
            rounded-2xl
            p-3
            transition
            hover:bg-slate-100
          "

          >

            <FiX
              size={24}
              className="text-slate-700"
            />

          </button>

        </div>

        <div
          className="
          flex-1
          overflow-y-auto
          px-8
          py-8
          space-y-8
        "
        >

          <div
            className="
            flex
            flex-col
            items-center
            gap-5
          "
          >

<div className="relative">

  <img

    src={
        avatarPreview || 
      user.avatar?.url ||

      "/default-avatar.png"
    }

    alt={user?.name}

    className="
      h-36
      w-36
      rounded-full
      border-4
      border-slate-200
      object-cover
      shadow-lg
    "

  />

  <button

    type="button"

    onClick={() =>
      fileInputRef.current.click()
    }

    disabled={avatarUploading}

    className="
      absolute
      bottom-2
      right-2
      flex
      h-11
      w-11
      items-center
      justify-center
      rounded-full
      bg-blue-600
      text-white
      shadow-xl
      transition
      hover:bg-blue-700
    "

  >

    {

      avatarUploading

      ?

      <FiLoader className="animate-spin"/>

      :

      <FiCamera size={18}/>

    }

  </button>

  <input

    ref={fileInputRef}

    type="file"

    accept="image/*"

    hidden

    onChange={handleAvatarChange}

  />

</div>
            <div className="text-center">

              <h3
                className="
                text-2xl
                font-black
                text-slate-900
              "
              >

                {user.name}

              </h3>

              <p
                className="
                mt-1
                text-slate-500
              "
              >

                {user.email}

              </p>

            </div>

          </div>

          {/* Name */}

          <div>

            <label
              className="
              mb-2
              flex
              items-center
              gap-2
              font-semibold
              text-slate-700
            "
            >

              <FiUser />

              Full Name

            </label>

            <input

              value={form.name}

              onChange={(e)=>

                updateField(
                  "name",
                  e.target.value
                )

              }

              className="
              w-full
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              px-5
              py-4
              text-slate-900
              outline-none
              transition
              focus:border-blue-500
              focus:bg-white
            "

            />

          </div>

          {/* Phone */}

          <div>

            <label
              className="
              mb-2
              flex
              items-center
              gap-2
              font-semibold
              text-slate-700
            "
            >

              <FiPhone />

              Phone Number

            </label>

            <input

              placeholder="+92 300 1234567"

              value={form.phone}

              onChange={(e)=>

                updateField(
                  "phone",
                  e.target.value
                )

              }

              className="
              w-full
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              px-5
              py-4
              text-slate-900
              outline-none
              transition
              focus:border-blue-500
              focus:bg-white
            "

            />

          </div>

                    {/* Roles */}

          <div>

            <label
              className="
              mb-3
              flex
              items-center
              gap-2
              font-semibold
              text-slate-700
            "
            >

              <FiShield />

              Roles

            </label>

            <div className="flex flex-wrap gap-3">

              {ROLE_OPTIONS.map((role) => {

                const active =
                  form.roles.includes(role.value);

                return (

                  <button

                    key={role.value}

                    type="button"

                    onClick={() =>
                      toggleRole(role.value)
                    }

                    className={`
                      flex
                      items-center
                      gap-2
                      rounded-2xl
                      border-2
                      px-5
                      py-3
                      font-semibold
                      transition-all
                      duration-200

                      ${
                        active
                          ? `${role.color} scale-[1.02] shadow-md`
                          : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50"
                      }
                    `}
                  >

                    {active && (
                      <FiCheck size={16} />
                    )}

                    {role.label}

                  </button>

                );

              })}

            </div>

          </div>

          {/* Account Status */}
{/* 
          <div>

            <label
              className="
              mb-3
              block
              font-semibold
              text-slate-700
            "
            >

              Account Status

            </label>

            <div
              className="
              grid
              grid-cols-2
              rounded-2xl
              bg-slate-100
              p-1.5
            "
            >

              {STATUS.map((status) => (

                <button

                  key={status}

                  type="button"

                  onClick={() =>
                    updateField(
                      "accountStatus",
                      status
                    )
                  }

                  className={`
                    rounded-xl
                    px-5
                    py-3
                    text-sm
                    font-bold
                    transition-all

                    ${
                      form.accountStatus === status
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-slate-600 hover:bg-white"
                    }
                  `}
                >

                  {status}

                </button>

              ))}

            </div>

          </div> */}

        </div>

        {/* Footer */}

        <div
          className="
          sticky
          bottom-0
          border-t
          border-slate-200
          bg-white
          px-8
          py-5
        "
        >

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <button

              type="button"

              onClick={onClose}

              className="
              rounded-2xl
              border
              border-slate-300
              px-6
              py-3
              font-semibold
              text-slate-700
              transition
              hover:bg-slate-100
            "

            >

              Cancel

            </button>

            <button

              type="button"

              disabled={!dirty || saving}

              onClick={handleSave}

              className="
              flex
              items-center
              justify-center
              gap-3
              rounded-2xl
              bg-blue-600
              px-7
              py-3
              font-bold
              text-white
              transition
              hover:bg-blue-700
              disabled:cursor-not-allowed
              disabled:opacity-50
            "

            >

              {saving && (

                <FiLoader
                  className="animate-spin"
                />

              )}

              {saving
                ? "Saving..."
                : "Save Changes"}

            </button>

          </div>

        </div>

      </div>

    </div>

  );

};

export default EditUserDrawer;