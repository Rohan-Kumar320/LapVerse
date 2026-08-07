import { useState } from "react";

import {
    NavLink,
    useNavigate,
} from "react-router-dom";

import {
    FiMenu,
    FiHome,
    FiUsers,
    FiPackage,
    FiShoppingBag,
    FiGrid,
    FiBarChart2,
    FiSettings,
    FiShield,
    FiUserCheck,
    FiLogOut,
    FiX,
    FiBriefcase,
} from "react-icons/fi";

const menuItems = [

    {
        title: "Dashboard",
        icon: <FiHome size={20} />,
        path: "/admin",
    },

    {
        title: "Users",
        icon: <FiUsers size={20} />,
        path: "/admin/users",
    },

    {
        title: "Seller Applications",
        icon: <FiBriefcase size={20} />,
        path: "/admin/seller-applications",
    },

    {
        title: "Sellers Management",
        icon: <FiPackage size={20} />,
        path: "/admin/sellers",
    },

    {
        title: "Orders",
        icon: <FiShoppingBag size={20} />,
        path: "/admin/orders",
    },

    {
        title: "Categories",
        icon: <FiGrid size={20} />,
        path: "/admin/categories",
    },

    {
        title: "Reports",
        icon: <FiBarChart2 size={20} />,
        path: "/admin/reports",
    },

    {
        title: "Settings",
        icon: <FiSettings size={20} />,
        path: "/admin/settings",
    },

];

const AdminSidebar = () => {

    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(true);

    const [mobileOpen, setMobileOpen] = useState(false);

    return (

        <>

            {/* Mobile Toggle */}

            <button

                onClick={() => setMobileOpen(true)}

                className="
                fixed
                top-5
                left-5
                z-50
                rounded-xl
                bg-white
                p-3
                shadow-lg
                lg:hidden
            "

            >

                <FiMenu size={22} />

            </button>

            {/* Overlay */}

            {

                mobileOpen && (

                    <div

                        onClick={() => setMobileOpen(false)}

                        className="
                        fixed
                        inset-0
                        z-40
                        bg-black/40
                        lg:hidden
                    "

                    />

                )

            }

            {/* Sidebar */}

            <aside

                className={`
                fixed
                z-50
                flex
                h-screen
                flex-col
                border-r
                border-slate-200
                bg-white
                transition-all
                duration-300

                ${collapsed ? "w-24" : "w-72"}

                ${mobileOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }

                lg:translate-x-0
            `}

            >

                {/* Header */}

                <div

                    className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-slate-200
                    p-6
                "

                >

                    {

                        !collapsed && (

                            <div>

                                <h1
                                    className="
                                    flex
                                    items-center
                                    gap-3
                                    text-xl
                                    font-black
                                    text-black
                                "
                                >

                                    <FiShield className="text-blue-600" />

                                    LapVerse

                                </h1>

                                <p
                                    className="
                                    mt-1
                                    text-xs
                                    text-slate-500
                                "
                                >

                                    Administration

                                </p>

                            </div>

                        )

                    }

                    <div className="flex gap-2">

                        <button

                            onClick={() => setCollapsed(!collapsed)}

                            className="
                            hidden
                            rounded-xl
                            p-2
                            hover:bg-slate-100
                            lg:block
                        "

                        >

                            <FiMenu  color="black" size={20}/>

                        </button>

                        <button

                            onClick={() => setMobileOpen(false)}

                            className="
                            rounded-xl
                            p-2
                            hover:bg-slate-100
                            lg:hidden
                        "

                        >

                            <FiX />

                        </button>

                    </div>

                </div>

                {/* Navigation */}

                <nav
                    className="
                    flex-1
                    space-y-2
                    p-4
                    overflow-y-auto
                "
                >

                    {

                        menuItems.map((item) => (

                            <NavLink

                                key={item.path}

                                to={item.path}

                                end={item.path === "/admin"}

                                onClick={() => setMobileOpen(false)}

                                className={({ isActive }) => `
                                flex
                                items-center
                                gap-4
                                rounded-2xl
                                px-4
                                py-3
                                transition-all

                                ${isActive
                                        ? "bg-blue-600 text-white shadow-lg"
                                        : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                                    }
                            `}

                            >

                                {item.icon}

                                {

                                    !collapsed && (

                                        <span>

                                            {item.title}

                                        </span>

                                    )

                                }

                            </NavLink>

                        ))

                    }

                </nav>

                {/* Footer */}

                <div
                    className="
                    border-t
                    border-slate-200
                    p-4
                "
                >

                    <button

                        onClick={() => {

                            localStorage.removeItem("adminToken");

                            navigate("/admin/login");

                        }}

                        className="
                        flex
                        w-full
                        items-center
                        gap-4
                        rounded-2xl
                        px-4
                        py-3
                        text-red-500
                        transition
                        hover:bg-red-50
                    "

                    >

                        <FiLogOut />

                        {

                            !collapsed && (

                                <span>

                                    Logout

                                </span>

                            )

                        }

                    </button>

                </div>

            </aside>

            {/* Desktop spacing */}

            <div

                className={`
                hidden
                transition-all
                duration-300
                lg:block

                ${collapsed ? "w-24" : "w-72"}
            `}

            />

        </>

    );

};

export default AdminSidebar;