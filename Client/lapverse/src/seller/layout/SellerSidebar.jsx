// import { useState } from "react";

// import {
//   NavLink,
//   useNavigate,
// } from "react-router-dom";

// import {
//   FiMenu,
//   FiHome,
//   FiPackage,
//   FiPlusSquare,
//   FiShoppingBag,
//   FiStar,
//   FiBarChart2,
//   FiSettings,
//   FiArrowLeft,
// } from "react-icons/fi";

// import { FaStore } from "react-icons/fa";

// import { useSeller } from "../../context/SellerContext";

// const SellerSidebar = () => {

//   const navigate = useNavigate();

//   const {
//     changeMode,
//   } = useSeller();

//   const [collapsed, setCollapsed] =
//     useState(false);

//   const menuItems = [

//     {
//       title: "Dashboard",
//       icon: <FiHome size={20} />,
//       path: "/seller",
//     },

//     {
//       title: "Products",
//       icon: <FiPackage size={20} />,
//       path: "/seller/products",
//     },

//     {
//       title: "Add Product",
//       icon: <FiPlusSquare size={20} />,
//       path: "/seller/add-product",
//     },

//     {
//       title: "Orders",
//       icon: <FiShoppingBag size={20} />,
//       path: "/seller/orders",
//     },

//     {
//       title: "Reviews",
//       icon: <FiStar size={20} />,
//       path: "/seller/reviews",
//     },

//     {
//       title: "Analytics",
//       icon: <FiBarChart2 size={20} />,
//       path: "/seller/analytics",
//     },

//     // {
//     //   title: "Settings",
//     //   icon: <FiSettings size={20} />,
//     //   path: "/seller/settings",
//     // },

//   ];

//   const handleBackToUser =
//     async () => {

//       await changeMode("user");

//       navigate("/");

//     };

//   return (

//     <aside
//       className={`
//         flex
//         h-screen
//         flex-col
//         border-r
//         border-border
//         bg-card
//         transition-all
//         duration-300

//         ${
//           collapsed
//             ? "w-24"
//             : "w-72"
//         }
//       `}
//     >

//       {/* Logo */}

//       <div
//         className="
//           flex
//           items-center
//           justify-between
//           border-b
//           border-border
//           p-6
//         "
//       >

//         {!collapsed && (

//           <div>

//             <h1
//               className="
//                 flex
//                 items-center
//                 gap-3
//                 text-xl
//                 font-bold
//               "
//             >

//               <FaStore
//                 className="text-primary"
//               />

//               LapVerse

//             </h1>

//             <p
//               className="
//                 mt-2
//                 text-xs
//                 text-text-secondary
//               "
//             >

//               Seller Workspace

//             </p>

//           </div>

//         )}

//         <button

//           onClick={() =>
//             setCollapsed(
//               !collapsed
//             )
//           }

//           className="
//             rounded-xl
//             p-2
//             transition
//             hover:bg-background
//           "

//         >

//           <FiMenu size={20} />

//         </button>

//       </div>

//       {/* Navigation */}

//       <nav
//         className="
//           flex-1
//           space-y-2
//           p-4
//         "
//       >

//         {menuItems.map((item) => (

//           <NavLink

//             key={item.path}

//             to={item.path}

//             end={item.path === "/seller"}

//             className={({ isActive }) => `
//               flex
//               items-center
//               gap-4
//               rounded-2xl
//               px-4
//               py-3
//               transition

//               ${
//                 isActive

//                   ? "bg-primary text-white"

//                   : "hover:bg-background"
//               }
//             `}

//           >

//             {item.icon}

//             {!collapsed && (

//               <span>

//                 {item.title}

//               </span>

//             )}

//           </NavLink>

//         ))}

//       </nav>

//       {/* Footer */}

//       <div
//         className="
//           border-t
//           border-border
//           p-4
//         "
//       >

//         <button

//           onClick={handleBackToUser}

//           className="
//             flex
//             w-full
//             items-center
//             gap-4
//             rounded-2xl
//             px-4
//             py-3
//             transition
//             hover:bg-background
//           "

//         >

//           <FiArrowLeft />

//           {!collapsed && (

//             <span>

//               Back To User

//             </span>

//           )}

//         </button>

//       </div>

//     </aside>

//   );

// };

// export default SellerSidebar;

import { useState } from "react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  FiMenu,
  FiHome,
  FiPackage,
  FiPlusSquare,
  FiShoppingBag,
  FiStar,
  FiBarChart2,
  FiArrowLeft,
  FiChevronRight,
} from "react-icons/fi";

import { FaStore } from "react-icons/fa";

import { useSeller } from "../../context/SellerContext";
import { useAuth } from "../../context/AuthContext";

const SellerSidebar = () => {

  const navigate = useNavigate();

  const { user } = useAuth();

  const { changeMode } = useSeller();

  const [collapsed, setCollapsed] =
    useState(true);

  //------------------------------------------------------

  const menuItems = [

    {
      title: "Dashboard",
      icon: <FiHome size={20} />,
      path: "/seller",
      accent: "emerald",
    },

    {
      title: "Products",
      icon: <FiPackage size={20} />,
      path: "/seller/products",
      accent: "orange",
    },

    {
      title: "Add Product",
      icon: <FiPlusSquare size={20} />,
      path: "/seller/add-product",
      accent: "violet",
    },

    {
      title: "Orders",
      icon: <FiShoppingBag size={20} />,
      path: "/seller/orders",
      accent: "rose",
    },

    {
      title: "Reviews",
      icon: <FiStar size={20} />,
      path: "/seller/reviews",
      accent: "amber",
    },

    {
      title: "Analytics",
      icon: <FiBarChart2 size={20} />,
      path: "/seller/analytics",
      accent: "cyan",
    },

  ];

  //------------------------------------------------------

  const colors = {

    emerald: {
      bg: "bg-emerald-100",
      text: "text-emerald-600",
      border: "bg-emerald-500",
    },

    orange: {
      bg: "bg-orange-100",
      text: "text-orange-600",
      border: "bg-orange-500",
    },

    violet: {
      bg: "bg-violet-100",
      text: "text-violet-600",
      border: "bg-violet-500",
    },

    rose: {
      bg: "bg-rose-100",
      text: "text-rose-600",
      border: "bg-rose-500",
    },

    amber: {
      bg: "bg-amber-100",
      text: "text-amber-600",
      border: "bg-amber-500",
    },

    cyan: {
      bg: "bg-cyan-100",
      text: "text-cyan-600",
      border: "bg-cyan-500",
    },

  };

  //------------------------------------------------------

  const handleBackToUser =
    async () => {

      await changeMode("user");

      navigate("/");

    };

  //------------------------------------------------------

  return (

    <aside

      className={`

        flex
        h-screen
        flex-col
        border-r
        border-neutral-200
        bg-neutral-50
        transition-all
        duration-300

        ${collapsed ? "w-24" : "w-80"}

      `}

    >

      {/* ================= HEADER ================= */}

      <div className="p-5">

        <div

          className="

            rounded-[32px]
            bg-gradient-to-br
            from-emerald-50
            via-orange-50
            to-violet-50
            p-5
            shadow-lg
            shadow-black/5

          "

        >

          <div className="flex items-center justify-between">

            {!collapsed && (

              <div className="flex items-center gap-4">

                <div

                  className="

                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-3xl
                    bg-white
                    shadow-md

                  "

                >

                  <FaStore

                    size={22}

                    className="text-emerald-600"

                  />

                </div>

                <div>

                  <h2 className="text-xl font-black text-slate-600">

                    LapVerse

                  </h2>

                  <p className="text-xs text-neutral-500">

                    Seller Workspace

                  </p>

                </div>

              </div>

            )}

            <button

              onClick={() =>
                setCollapsed(!collapsed)
              }

              className="

                rounded-2xl
                bg-white
                p-3
                shadow-md
                transition-all
                duration-300
                hover:rotate-90

              "

            >

              <FiMenu color="black"/>

            </button>

          </div>

          {!collapsed && (

            <div

              className="

                mt-6
                rounded-3xl
                bg-white/80
                p-4
                backdrop-blur

              "

            >

              <p className="font-bold text-slate-600">

                {user?.name}

              </p>

              <p className="mt-1 text-sm text-neutral-500">

                Seller Account

              </p>

              <div className="mt-4 flex items-center gap-2">

                <span

                  className="

                    h-2.5
                    w-2.5
                    rounded-full
                    bg-emerald-500

                  "

                />

                <span className="text-xs font-semibold text-emerald-600">

                  Active

                </span>

              </div>

            </div>

          )}

        </div>

      </div>

      {/* ============ Navigation starts below ============ */}

            {/* ================= NAVIGATION ================= */}

      <div className="flex-1 overflow-y-auto px-5 pb-5">

        {!collapsed && (

          <p
            className="
              mb-4
              px-3
              text-xs
              font-bold
              uppercase
              tracking-[0.3em]
              text-neutral-400
            "
          >
            Workspace
          </p>

        )}

        <nav className="space-y-3">

          {menuItems.map((item) => {

            const style = colors[item.accent];

            return (

              <NavLink

                key={item.path}

                to={item.path}

                end={item.path === "/seller"}

              >

                {({ isActive }) => (

                  <div

                    className={`

                      group
                      relative
                      flex
                      items-center
                      rounded-3xl
                      transition-all
                      duration-300

                      ${
                        collapsed
                          ? "justify-center p-4"
                          : "justify-between px-4 py-4"
                      }

                      ${
                        isActive
                          ? "bg-white shadow-lg shadow-black/5"
                          : "hover:bg-white hover:shadow-md"
                      }

                    `}

                  >

                    {/* Active Border */}

                    {isActive && (

                      <div

                        className={`

                          absolute
                          left-0
                          top-4
                          bottom-4
                          w-1
                          rounded-full

                          ${style.border}

                        `}

                      />

                    )}

                    <div className="flex items-center gap-4">

                      <div

                        className={`

                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-2xl
                          transition-all
                          duration-300

                          ${
                            isActive
                              ? `${style.bg} ${style.text}`
                              : "bg-neutral-100 text-neutral-500 group-hover:scale-110"
                          }

                        `}

                      >

                        {item.icon}

                      </div>

                      {!collapsed && (

                        <div>

                          <p

                            className={`

                              font-semibold

                              ${
                                isActive
                                  ? "text-neutral-900"
                                  : "text-neutral-600"
                              }

                            `}

                          >

                            {item.title}

                          </p>

                        </div>

                      )}

                    </div>

                    {!collapsed && (

                      <FiChevronRight

                        className={`

                          transition-all
                          duration-300

                          ${
                            isActive
                              ? style.text
                              : "text-neutral-300 group-hover:translate-x-1"
                          }

                        `}

                      />

                    )}

                  </div>

                )}

              </NavLink>

            );

          })}

        </nav>

        {/* ================= MANAGEMENT ================= */}

        {!collapsed && (

          <>

            <p
              className="
                mt-10
                mb-4
                px-3
                text-xs
                font-bold
                uppercase
                tracking-[0.3em]
                text-neutral-400
              "
            >
              Management
            </p>

            <div

              className="
                rounded-[28px]
                bg-gradient-to-br
                from-emerald-50
                via-white
                to-orange-50
                p-5
                shadow-md
              "

            >

              <div className="flex items-center gap-4">

                <div

                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-3xl
                    bg-white
                    shadow
                  "

                >

                  <FiBarChart2
                    size={24}
                    className="text-violet-600"
                  />

                </div>

                <div>

                  <h3 className="font-bold text-slate-600">

                    Seller Insights

                  </h3>

                  <p className="mt-1 text-sm text-neutral-500 leading-6">

                    Monitor products, orders,
                    revenue and performance
                    from one place.

                  </p>

                </div>

              </div>

            </div>

          </>

        )}

      </div>

            {/* ================= FOOTER ================= */}

      <div className="p-5">

        {!collapsed ? (

          <div

            className="
              overflow-hidden
              rounded-[30px]
              border
              border-neutral-200
              bg-white
              shadow-lg
              shadow-black/5
            "

          >

            {/* Top */}

            <div

              className="
                bg-gradient-to-r
                from-orange-50
                via-amber-50
                to-emerald-50
                p-5
              "

            >

              <div className="flex items-center gap-4">

                <div

                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-3xl
                    bg-white
                    shadow
                  "

                >

                  <FiArrowLeft
                    size={22}
                    className="text-orange-600"
                  />

                </div>

                <div>

                  <h3 className="font-bold text-neutral-900">

                    Buyer Mode

                  </h3>

                  <p className="mt-1 text-sm text-neutral-500">

                    Browse products as a customer

                  </p>

                </div>

              </div>

            </div>

            {/* Bottom */}

            <div className="p-5">

              <button

                onClick={handleBackToUser}

                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl
                  bg-gradient-to-r
                  from-orange-500
                  to-amber-500
                  py-3.5
                  font-semibold
                  text-white
                  shadow-md
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                "

              >

                <FiArrowLeft />

                Switch to Buyer

              </button>

            </div>

          </div>

        ) : (

          <button

            onClick={handleBackToUser}

            className="
              flex
              h-16
              w-full
              items-center
              justify-center
              rounded-3xl
              bg-gradient-to-br
              from-orange-500
              to-amber-500
              text-white
              shadow-lg
              transition-all
              duration-300
              hover:scale-105
            "

          >

            <FiArrowLeft size={22} />

          </button>

        )}

      </div>

    </aside>

  );

};

export default SellerSidebar;