import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiUser,
  FiMail,
  FiPhone,
  FiCamera,
  FiTrash2,
  FiMapPin,
  FiArrowRight,
  FiSave,
  FiCheckCircle,
} from "react-icons/fi";

import { toast } from "react-toastify";

import { useAuth } from "../../context/AuthContext";

import { getAddresses } from "../../services/userService";

const EditProfile = () => {

  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const {
    user,
    updateProfile,
    uploadAvatar,
    removeAvatar,
  } = useAuth();

  const [loading, setLoading] =
    useState(false);

  const [uploadingAvatar, setUploadingAvatar] =
    useState(false);

  const [addresses, setAddresses] =
    useState([]);

  const [preview, setPreview] =
    useState("");

  const [formData, setFormData] =
    useState({

      name: "",

      email: "",

      phone: "",

    });

  useEffect(() => {

    if (!user) return;

    setFormData({

      name: user.name || "",

      email: user.email || "",

      phone: user.phone || "",

    });

    setPreview(

      user.avatar?.url || ""

    );

  }, [user]);

  useEffect(() => {

    loadAddresses();

  }, []);

  const loadAddresses = async () => {

    try {

      const data =
        await getAddresses();

      setAddresses(

        data.addresses || []

      );

    } catch (error) {

      console.log(error);

    }

  };

  const defaultAddress =
    addresses.find(

      (address) => address.isDefault

    );

  const completion =
    useMemo(() => {

      let total = 4;

      let completed = 0;

      if (formData.name)
        completed++;

      if (formData.phone)
        completed++;

      if (preview)
        completed++;

      if (defaultAddress)
        completed++;

      return Math.round(

        (completed / total) * 100

      );

    }, [

      formData,

      preview,

      defaultAddress,

    ]);

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };
    const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await updateProfile({

        name: formData.name,

        phone: formData.phone,

      });

      toast.success(
        "Profile updated successfully."
      );

    } catch (error) {

      toast.error(

        error?.response?.data?.message ||

        "Unable to update profile."

      );

    } finally {

      setLoading(false);

    }

  };

  const handleAvatarClick = () => {

    fileInputRef.current.click();

  };

  const handleAvatarChange = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    try {

      setUploadingAvatar(true);

      const localPreview =
        URL.createObjectURL(file);

      setPreview(localPreview);

      await uploadAvatar(file);

      toast.success(
        "Profile picture updated."
      );

    } catch (error) {

      toast.error(

        error?.response?.data?.message ||

        "Unable to upload image."

      );

    } finally {

      setUploadingAvatar(false);

    }

  };

  const handleRemoveAvatar = async () => {

    try {

      await removeAvatar();

      setPreview("");

      toast.success(
        "Profile picture removed."
      );

    } catch (error) {

      toast.error(

        error?.response?.data?.message ||

        "Unable to remove avatar."

      );

    }

  };

  const handleManageAddresses = () => {

    navigate("/profile", {

      state: {

        tab: "addresses",

      },

    });

  };

  const progressColor = () => {

    if (completion >= 100)
      return "bg-green-500";

    if (completion >= 75)
      return "bg-primary";

    if (completion >= 50)
      return "bg-yellow-500";

    return "bg-red-500";

  };

  return (

<div className="space-y-8">

  {/* Profile Completion */}

<div className="rounded-3xl border border-border bg-card p-7 shadow-lg">

  <div className="flex items-center justify-between">

    <div>

      <h2 className="text-2xl font-bold">

        Complete Your Profile

      </h2>

      <p className="mt-1 text-text-secondary">

        A complete profile builds trust with buyers and sellers.

      </p>

    </div>

    <div className="text-right">

      <p className="text-3xl font-bold text-primary">

        {completion}%

      </p>

      <p className="text-sm text-text-secondary">

        Completed

      </p>

    </div>

  </div>

  <div className="mt-6 h-3 overflow-hidden rounded-full bg-muted">

    <div

      style={{
        width: `${completion}%`,
      }}

      className={`h-full transition-all duration-500 ${progressColor()}`}

    />

  </div>

</div>

<div className="grid gap-8 lg:grid-cols-3">

  {/* Avatar */}

  <div className="rounded-3xl border border-border bg-card p-7 shadow-lg">

    <div className="flex flex-col items-center">

      <div className="relative">

<div
  className="
    h-48
    w-48
    overflow-hidden
    rounded-full
    border-4
    border-primary/20
    shadow-xl
    bg-gradient-to-br
    from-primary
    to-indigo-600
    flex
    items-center
    justify-center
  "
>

  {preview ? (

    <img
      src={preview}
      alt="avatar"
      className="h-full w-full object-cover"
    />

  ) : (

    <span
      className="
        text-6xl
        font-bold
        text-white
        select-none
      "
    >
      {formData.name
        ?.trim()
        .split(" ")
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase() || "U"}
    </span>

  )}

</div>
        <button

          type="button"

          onClick={handleAvatarClick}

          disabled={uploadingAvatar}

          className="
            absolute
            bottom-3
            right-3
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-primary
            text-white
            shadow-lg
            transition
            hover:scale-110
          "

        >

          <FiCamera size={20} />

        </button>

      </div>

      <input

        ref={fileInputRef}

        type="file"

        accept="image/*"

        hidden

        onChange={handleAvatarChange}

      />

      <h3 className="mt-6 text-xl font-bold">

        {formData.name || "Your Name"}

      </h3>

      <p className="text-text-secondary">

        {formData.email}

      </p>

      <div className="mt-8 flex w-full gap-3">

        <button

          type="button"

          onClick={handleAvatarClick}

          className="
            flex-1
            rounded-xl
            bg-primary
            py-3
            font-semibold
            text-white
            transition
            hover:scale-105
          "

        >

          {uploadingAvatar
            ? "Uploading..."
            : "Change"}

        </button>

<button
  type="button"
  onClick={handleRemoveAvatar}
  disabled={!preview}
  className={`
    flex
    h-12
    w-12
    items-center
    justify-center
    rounded-xl
    border
    transition-all
    duration-300

    ${
      !preview
        ? "cursor-not-allowed border-gray-300 text-gray-300 opacity-50"
        : "border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:scale-105"
    }
  `}
>
  <FiTrash2 />
</button>
      </div>

    </div>

  </div>

  {/* Personal Information */}

  <form

    onSubmit={handleSubmit}

    className="
      lg:col-span-2
      rounded-3xl
      border
      border-border
      bg-card
      p-7
      shadow-lg
    "

  >

    <h2 className="text-2xl font-bold">

      Personal Information

    </h2>

    <p className="mt-1 text-text-secondary">

      Update your account information.

    </p>

    <div className="mt-8 grid gap-6 md:grid-cols-2">

      <div>

        <label className="mb-2 flex items-center gap-2 font-medium">

          <FiUser />

          Full Name

        </label>

        <input

          name="name"

          value={formData.name}

          onChange={handleChange}

          className="
            w-full
            rounded-xl
            border
            border-border
            bg-background
            px-4
            py-3
            outline-none
            transition
            focus:border-primary
          "

        />

      </div>

      <div>

        <label className="mb-2 flex items-center gap-2 font-medium">

          <FiMail />

          Email

        </label>

        <input

          value={formData.email}

          readOnly

          className="
            w-full
            cursor-not-allowed
            rounded-xl
            border
            border-border
            bg-muted
            px-4
            py-3
          "

        />

      </div>

      <div>

        <label className="mb-2 flex items-center gap-2 font-medium">

          <FiPhone />

          Phone Number

        </label>

        <input

          name="phone"

          value={formData.phone}

          onChange={handleChange}

          className="
            w-full
            rounded-xl
            border
            border-border
            bg-background
            px-4
            py-3
            outline-none
            transition
            focus:border-primary
          "

        />

      </div>
            {/* Delivery Address */}

      <div className="md:col-span-2">

        <label className="mb-3 flex items-center gap-2 font-medium">

          <FiMapPin />

          Default Delivery Address

        </label>

        <div
          className="
            rounded-2xl
            border
            border-border
            bg-background
            p-5
          "
        >

          {defaultAddress ? (

            <>

              <div className="flex items-center justify-between">

                <div>

                  <div className="flex items-center gap-2">

                    <FiCheckCircle className="text-green-500" />

                    <h3 className="font-semibold text-lg">

                      {defaultAddress.label}

                    </h3>

                  </div>

                  <p className="mt-2 font-medium">

                    {defaultAddress.fullName}

                  </p>

                  <p className="text-text-secondary">

                    {defaultAddress.phone}

                  </p>

                </div>

              </div>

              <div className="mt-4 space-y-1 text-text-secondary">

                <p>{defaultAddress.addressLine}</p>

                <p>{defaultAddress.area}</p>

                <p>

                  {defaultAddress.city},{" "}
                  {defaultAddress.country}

                </p>

                {defaultAddress.postalCode && (

                  <p>

                    {defaultAddress.postalCode}

                  </p>

                )}

              </div>

            </>

          ) : (

            <div className="text-center py-6">

              <FiMapPin
                className="mx-auto text-primary"
                size={34}
              />

              <p className="mt-3 text-text-secondary">

                No default address selected.

              </p>

            </div>

          )}

        </div>

        <button
          type="button"
          onClick={handleManageAddresses}
          className="
            mt-5
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-primary
            px-5
            py-3
            font-semibold
            text-white
            transition
            hover:scale-105
          "
        >

          Manage Addresses

          <FiArrowRight />

        </button>

      </div>

    </div>

    <div className="mt-10 flex justify-end">

      <button
        type="submit"
        disabled={loading}
        className="
          inline-flex
          items-center
          gap-2
          rounded-xl
          bg-primary
          px-8
          py-3
          font-semibold
          text-white
          transition
          hover:scale-105
          disabled:opacity-60
          disabled:cursor-not-allowed
        "
      >

        <FiSave />

        {loading
          ? "Saving..."
          : "Save Changes"}

      </button>

    </div>

  </form>

</div>

</div>

  );

};

export default EditProfile;