import {
  FiCheckCircle,
  FiEdit2,
  FiHome,
  FiBriefcase,
  FiMapPin,
  FiPhone,
  FiTrash2,
} from "react-icons/fi";
import { deleteAddress, setDefaultAddress } from "../../services/userService";


const AddressCard = ({
  address,
  refreshAddresses,
  onEdit,
}) => {

  const handleDelete = async () => {

    const confirmDelete = window.confirm(
      "Delete this address?"
    );

    if (!confirmDelete) return;

    try {

      await deleteAddress(address._id);

      refreshAddresses();

    } catch (error) {

      console.error(error);

    }

  };

  const handleDefault = async () => {

    if (address.isDefault) return;

    try {

      await setDefaultAddress(address._id);

      refreshAddresses();

    } catch (error) {

      console.error(error);

    }

  };

  const getAddressIcon = (label = "") => {

    switch (label.toLowerCase()) {

      case "home":
        return <FiHome size={22} />;

      case "office":
        return <FiBriefcase size={22} />;

      default:
        return <FiMapPin size={22} />;

    }

  };

  const getAddressColor = (label = "") => {

    switch (label.toLowerCase()) {

      case "home":
        return "bg-blue-100 text-blue-600";

      case "office":
        return "bg-violet-100 text-violet-600";

      default:
        return "bg-emerald-100 text-emerald-600";

    }

  };

  return (

<div
  className="
    relative
    overflow-hidden
    rounded-3xl
    border
    border-border
    bg-card
    p-7
    shadow-lg
    transition-all
    duration-300
    hover:-translate-y-1
    hover:shadow-2xl
  "
>

{address.isDefault && (

<div
  className="
    absolute
    right-5
    top-5
    flex
    items-center
    gap-2
    rounded-full
    bg-emerald-100
    px-3
    py-1
    text-xs
    font-semibold
    text-emerald-700
  "
>

<FiCheckCircle />

Default

</div>

)}

<div className="mb-6 flex items-center gap-3">

<div
  className={`
    flex
    h-12
    w-12
    items-center
    justify-center
    rounded-2xl
    ${getAddressColor(address.label)}
  `}
>

{getAddressIcon(address.label)}

</div>

<div>

<h3 className="text-xl font-bold">

{address.label}

</h3>

<p className="text-sm text-text-secondary">

Delivery Address

</p>

</div>

</div>

<div className="space-y-4">

<p className="font-semibold">

{address.fullName}

</p>

<div className="flex items-center gap-3">

<FiPhone className="text-primary" />

<span>

{address.phone}

</span>

</div>

<div className="flex items-start gap-3">

<FiMapPin
className="
mt-1
text-primary
"
/>

<div>

<p>{address.addressLine}</p>

<p>{address.area}</p>

<p>

{address.city}, {address.country}

</p>

{address.postalCode && (

<p>

{address.postalCode}

</p>

)}

</div>

</div>

</div>

<div className="mt-8 flex flex-wrap gap-3">

<button
onClick={onEdit}
className="
flex
items-center
gap-2
rounded-xl
border
border-primary
px-4
py-2
font-medium
text-primary
transition
hover:bg-primary
hover:text-white
"
>

<FiEdit2 />

Edit

</button>

<button
onClick={handleDelete}
className="
flex
items-center
gap-2
rounded-xl
border
border-red-500
px-4
py-2
font-medium
text-red-500
transition
hover:bg-red-500
hover:text-white
"
>

<FiTrash2 />

Delete

</button>

{!address.isDefault && (

<button
onClick={handleDefault}
className="
ml-auto
rounded-xl
bg-primary
px-5
py-2
font-semibold
text-white
transition
hover:scale-105
"
>

Set Default

</button>

)}

</div>

</div>

  );

};

export default AddressCard;