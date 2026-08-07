import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

const AdminLayout = () => {

  return (

    <div
      className="
      flex
      h-screen
      overflow-hidden
      bg-slate-50
    "
    >

      {/* Sidebar */}

      <AdminSidebar />

      {/* Right Section */}

      <div
        className="
        flex
        flex-1
        flex-col
        overflow-hidden
      "
      >

        {/* Navbar */}

        <AdminNavbar />

        {/* Content */}

        <main
          className="
          flex-1
          overflow-y-auto
          bg-slate-50
          p-8
        "
        >

          <Outlet />

        </main>

      </div>

    </div>

  );

};

export default AdminLayout;