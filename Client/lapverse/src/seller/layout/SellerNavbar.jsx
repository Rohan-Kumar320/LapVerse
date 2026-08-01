// import { useLocation } from "react-router-dom";

// import {
//   FiBell,
//   FiSearch,
// } from "react-icons/fi";

// import { useAuth } from "../../context/AuthContext";

// const SellerNavbar = () => {

//   const location = useLocation();

//   const { user } = useAuth();

//   const pageTitles = {

//     "/seller":
//       "Dashboard",

//     "/seller/products":
//       "Products",

//     "/seller/add-product":
//       "Add Product",

//     "/seller/orders":
//       "Orders",

//     "/seller/reviews":
//       "Reviews",

//     "/seller/analytics":
//       "Analytics",

//     // "/seller/settings":
//     //   "Settings",

//   };

//   const title =
//     pageTitles[location.pathname] ||
//     "Seller Workspace";

//   return (

//     <header
//       className="
//         flex
//         items-center
//         justify-between
//         border-b
//         border-border
//         bg-card
//         px-8
//         py-5
//       "
//     >

//       {/* Left */}

//       <div>

//         <h1
//           className="
//             text-2xl
//             font-bold
//           "
//         >

//           {title}

//         </h1>

//         <p
//           className="
//             mt-1
//             text-sm
//             text-text-secondary
//           "
//         >

//           Welcome back,
//           {" "}
//           <span className="font-medium">

//             {user?.name}

//           </span>

//         </p>

//       </div>

//       {/* Right */}

//       <div
//         className="
//           flex
//           items-center
//           gap-5
//         "
//       >

//         {/* Search */}

//         <div
//           className="
//             hidden
//             items-center
//             gap-3
//             rounded-2xl
//             border
//             border-border
//             bg-background
//             px-4
//             py-3
//             lg:flex
//           "
//         >

//           <FiSearch
//             className="text-gray-400"
//           />

//           <input

//             placeholder="Search..."

//             className="
//               w-64
//               bg-transparent
//               text-sm
//               outline-none
//             "

//           />

//         </div>

//         {/* Notification */}

//         <button
//           className="
//             relative
//             rounded-2xl
//             border
//             border-border
//             p-3
//             transition
//             hover:bg-background
//           "
//         >

//           <FiBell size={20} />

//           <span
//             className="
//               absolute
//               right-2
//               top-2
//               h-2.5
//               w-2.5
//               rounded-full
//               bg-red-500
//             "
//           />

//         </button>

//         {/* Avatar */}

//         <div
//           className="
//             flex
//             items-center
//             gap-3
//           "
//         >

//           <img

//             src={
//               user?.avatar?.url ||
//               "/default-avatar.png"
//             }

//             alt="avatar"

//             className="
//               h-11
//               w-11
//               rounded-full
//               object-cover
//               border
//               border-border
//             "

//           />

//           <div
//             className="
//               hidden
//               md:block
//             "
//           >

//             <h3
//               className="
//                 text-sm
//                 font-semibold
//               "
//             >

//               {user?.name}

//             </h3>

//             <p
//               className="
//                 text-xs
//                 text-text-secondary
//               "
//             >

//               Seller

//             </p>

//           </div>

//         </div>

//       </div>

//     </header>

//   );

// };

// export default SellerNavbar;

import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  FiBell,
  FiChevronRight,
  FiHome,
  FiSearch,
} from "react-icons/fi";

import { useAuth } from "../../context/AuthContext";

const SellerNavbar = () => {

  const { user } = useAuth();

  const location = useLocation();

  const [showNotifications, setShowNotifications] =
    useState(false);

  //-----------------------------------------

  // const greeting = useMemo(() => {

  //   const hour = new Date().getHours();

  //   if (hour < 12) return "Good Morning";

  //   if (hour < 17) return "Good Afternoon";

  //   return "Good Evening";

  // }, []);

  //-----------------------------------------

  const breadcrumbs = location.pathname
    .split("/")
    .filter(Boolean);

  //-----------------------------------------

  const formatName = (value) => {

    return value
      .replaceAll("-", " ")
      .replace(/\b\w/g, (c) =>
        c.toUpperCase()
      );

  };

  //-----------------------------------------

  return (

<header
className="
sticky
top-0
z-40
border-b
border-neutral-200/70
bg-white/20
backdrop-blur-xl
"

>

<div
className="
flex
items-center
justify-between
px-8
py-5
"

>

{/* LEFT */}

<div>

{/* Breadcrumb */}

<div
className="
mb-4
flex
items-center
gap-2
text-sm
text-neutral-500
"

>

<Link
to="/seller"
className="hover:text-emerald-600"
>

<FiHome />

</Link>

{breadcrumbs.slice(1).map((item,index)=>(

<div
key={index}
className="
flex
items-center
gap-2
"

>

<FiChevronRight size={14}/>

<span
className="
capitalize
hover:text-neutral-700
"
>

{formatName(item)}

</span>

</div>

))}

</div>

<h1
className="
text-3xl
font-black
tracking-tight
text-neutral-700
"
>

Dashboard

👋

</h1>

<p
className="
mt-2
text-neutral-500
"
>

Manage your products, orders and business from one place.

</p>

</div>

{/* RIGHT */}

<div
className="
flex
items-center
gap-5
"

>

{/* Search */}
{/* 
<div
className="
hidden
items-center
gap-3
rounded-2xl
border
border-neutral-200
bg-white
px-5
py-3
shadow-sm
lg:flex
"

>

<FiSearch className="text-neutral-400"/>

<input

placeholder="Search products..."

className="
w-72
bg-transparent
outline-none
placeholder:text-neutral-400
"

/>

</div> */}

{/* Notification */}

<div

className="relative"

onMouseEnter={()=>
setShowNotifications(true)
}

onMouseLeave={()=>
setShowNotifications(false)
}

>

<button
className="
relative
flex
h-12
w-12
items-center
justify-center
rounded-2xl
border
border-neutral-200
bg-white
shadow-sm
transition
duration-300
hover:-translate-y-1
hover:shadow-lg
"
>

<FiBell size={20} color="black"/>

<span
className="
absolute
right-3
top-3
h-2.5
w-2.5
rounded-full
bg-rose-500
"
/>

</button>

{showNotifications && (

<div
className="
absolute
right-0
top-16
w-80
rounded-[28px]
border
border-neutral-200
bg-white
p-6
shadow-2xl
"

>

<div className="flex gap-4">

<div
className="
flex
h-14
w-14
items-center
justify-center
rounded-2xl
bg-orange-100
text-2xl
"
>

🔔

</div>

<div>

<h3
className="
font-bold
text-neutral-900
"
>

Notifications

</h3>

<p
className="
mt-2
text-sm
leading-7
text-neutral-500
"
>

Order updates, customer reviews,
inventory alerts and important
notifications will appear here.

</p>

<div
className="
mt-5
inline-flex
rounded-full
bg-emerald-100
px-4
py-1.5
text-xs
font-semibold
text-emerald-700
"
>

Coming Soon 🚀

</div>

</div>

</div>

</div>

)}

</div>

{/* User */}

<div
className="
flex
items-center
gap-4
rounded-2xl
border
border-neutral-200
bg-white
px-3
py-2
shadow-sm
"

>

<img

src={
user?.avatar?.url ||
"/default-avatar.png"
}

alt="avatar"

className="
h-13
w-13
rounded-4xl
object-cover
"

/>

<div
className="
hidden
md:block
"

>

<h3
className="
font-bold
text-neutral-900
"
>

{user?.name}

</h3>

<p
className="
mt-1
text-sm
text-neutral-500
"
>

Seller Account

</p>

</div>

</div>

</div>

</div>

</header>

  );

};

export default SellerNavbar;