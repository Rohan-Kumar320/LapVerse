import { useEffect, useState } from "react";
import {
  FiHome,
  FiBriefcase,
  FiMapPin,
  FiX,
} from "react-icons/fi";
import { addAddress, updateAddress } from "../../services/userService";
import { toast } from "react-toastify";

const LABELS = [
  {
    value: "Home",
    icon: <FiHome />,
  },
  {
    value: "Office",
    icon: <FiBriefcase />,
  },
  {
    value: "Other",
    icon: <FiMapPin />,
  },
];

const AddressModal = ({
  open,
  onClose,
  address,
  refreshAddresses,
}) => {

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      label: "Home",
      customLabel: "",
      fullName: "",
      phone: "",
      country: "",
      city: "",
      area: "",
      postalCode: "",
      addressLine: "",
    });

useEffect(() => {

  if (!open) return;

  if (!address) {

    setFormData({
      label: "Home",
      customLabel: "",
      fullName: "",
      phone: "",
      country: "",
      city: "",
      area: "",
      postalCode: "",
      addressLine: "",
    });

    return;
  }

  const defaults = ["Home", "Office"];

  setFormData({
    label: defaults.includes(address.label)
      ? address.label
      : "Other",

    customLabel: defaults.includes(address.label)
      ? ""
      : address.label,

    fullName: address.fullName || "",
    phone: address.phone || "",
    country: address.country || "",
    city: address.city || "",
    area: address.area || "",
    postalCode: address.postalCode || "",
    addressLine: address.addressLine || "",
  });

}, [address, open]);
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };

  if (!open) return null;

  return (

<div
  className="
    fixed
    inset-0
    z-[999]
    flex
    items-center
    justify-center
    bg-black/60
    p-5
  "
>

<div
  className="
    max-h-[90vh]
    w-full
    max-w-3xl
    overflow-y-auto
    rounded-3xl
    bg-card
    shadow-2xl
  "
>

{/* Header */}

<div
  className="
    flex
    items-center
    justify-between
    border-b
    border-border
    p-7
  "
>

<div>

<h2 className="text-2xl font-bold">

{address
? "Edit Address"
: "Add Address"}

</h2>

<p className="mt-1 text-text-secondary">

Save delivery information

</p>

</div>

<button
onClick={onClose}
className="
flex
h-10
w-10
items-center
justify-center
rounded-xl
hover:bg-muted
"
>

<FiX size={22} />

</button>

</div>

{/* Body */}

<div className="space-y-8 p-7">

{/* Address Label */}

<div>

<label className="mb-4 block font-semibold">

Address Label

</label>

<div className="grid grid-cols-3 gap-4">

{LABELS.map((item)=>(

<button
key={item.value}
type="button"
onClick={() =>
  setFormData(prev => ({
    ...prev,
    label: item.value,
  }))
}
className={`
rounded-2xl
border
p-5
transition-all
duration-300

${
formData.label===item.value

? "border-primary bg-primary text-white shadow-lg scale-105"

: "border-border hover:border-primary hover:bg-primary/5"
}
`}
>

<div className="mb-3 flex justify-center text-3xl">

{item.icon}

</div>

<p className="font-semibold">

{item.value}

</p>

</button>

))}

</div>

</div>

{/* Custom Label */}

{formData.label==="Other" && (

<div>

<label className="mb-2 block font-medium">

Custom Label

</label>

<input
name="customLabel"
value={formData.customLabel}
onChange={handleChange}
placeholder="Parents, Hostel..."
className="
w-full
rounded-xl
border
border-border
bg-background
px-4
py-3
outline-none
focus:border-primary
"
/>

</div>

)}
{/* Form */}

<div className="grid gap-6 md:grid-cols-2">

  {/* Full Name */}

  <div>

    <label className="mb-2 block font-medium">

      Full Name

    </label>

    <input
      name="fullName"
      value={formData.fullName}
      onChange={handleChange}
      placeholder="Rohan Kumar"
      className="
        w-full
        rounded-xl
        border
        border-border
        bg-background
        px-4
        py-3
        outline-none
        focus:border-primary
      "
    />

  </div>

  {/* Phone */}

  <div>

    <label className="mb-2 block font-medium">

      Phone Number

    </label>

    <input
      name="phone"
      value={formData.phone}
      onChange={handleChange}
      placeholder="03XXXXXXXXX"
      className="
        w-full
        rounded-xl
        border
        border-border
        bg-background
        px-4
        py-3
        outline-none
        focus:border-primary
      "
    />

  </div>

  {/* Country */}

  <div>

    <label className="mb-2 block font-medium">

      Country

    </label>

    <input
      name="country"
      value={formData.country}
      onChange={handleChange}
      placeholder="Pakistan"
      className="
        w-full
        rounded-xl
        border
        border-border
        bg-background
        px-4
        py-3
        outline-none
        focus:border-primary
      "
    />

  </div>

  {/* City */}

  <div>

    <label className="mb-2 block font-medium">

      City

    </label>

    <input
      name="city"
      value={formData.city}
      onChange={handleChange}
      placeholder="Karachi"
      className="
        w-full
        rounded-xl
        border
        border-border
        bg-background
        px-4
        py-3
        outline-none
        focus:border-primary
      "
    />

  </div>

  {/* Area */}

  <div>

    <label className="mb-2 block font-medium">

      Area

    </label>

    <input
      name="area"
      value={formData.area}
      onChange={handleChange}
      placeholder="Gulshan-e-Iqbal"
      className="
        w-full
        rounded-xl
        border
        border-border
        bg-background
        px-4
        py-3
        outline-none
        focus:border-primary
      "
    />

  </div>

  {/* Postal Code */}

  <div>

    <label className="mb-2 block font-medium">

      Postal Code

    </label>

    <input
      name="postalCode"
      value={formData.postalCode}
      onChange={handleChange}
      placeholder="75300"
      className="
        w-full
        rounded-xl
        border
        border-border
        bg-background
        px-4
        py-3
        outline-none
        focus:border-primary
      "
    />

  </div>

</div>

{/* Address */}

<div>

  <label className="mb-2 block font-medium">

    Street Address

  </label>

  <textarea
    rows={4}
    name="addressLine"
    value={formData.addressLine}
    onChange={handleChange}
    placeholder="House No, Street, Block..."
    className="
      w-full
      resize-none
      rounded-xl
      border
      border-border
      bg-background
      px-4
      py-3
      outline-none
      focus:border-primary
    "
  />

</div>
{/* Footer */}

<div
  className="
    mt-10
    flex
    items-center
    justify-end
    gap-4
    border-t
    border-border
    pt-6
  "
>

<button
  type="button"
  onClick={onClose}
  className="
    rounded-xl
    border
    border-border
    px-6
    py-3
    font-medium
    transition
    hover:bg-muted
  "
>

Cancel

</button>

<button
  type="button"
  disabled={loading}
  onClick={async () => {

    try {

      setLoading(true);

      const payload = {

        ...formData,

        label:
          formData.label === "Other"
            ? formData.customLabel.trim()
            : formData.label,

      };

      delete payload.customLabel;

      if (address) {

        await updateAddress(
          address._id,
          payload
        );

      } else {

        await addAddress(payload);

      }

      await refreshAddresses();

      toast.success(

    address
    ? "Address updated successfully."
    : "Address added successfully."

);

      onClose();

    } catch (error) {

toast.error(

        error?.response?.data?.message ||

        "Something went wrong."

    );    } finally {

      setLoading(false);

    }

  }}
  className="
    rounded-xl
    bg-primary
    px-7
    py-3
    font-semibold
    text-white
    transition-all
    duration-300
    hover:scale-105
    disabled:cursor-not-allowed
    disabled:opacity-60
  "
>

{loading
  ? "Saving..."
  : address
  ? "Update Address"
  : "Save Address"}

</button>

</div>

</div>

</div>

</div>

);

};

export default AddressModal;