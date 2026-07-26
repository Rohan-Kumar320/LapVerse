import { Outlet } from "react-router-dom";

import SellerSidebar from "./SellerSidebar";
import SellerNavbar from "./SellerNavbar";

const SellerLayout = () => {

  return (

    <div className="flex h-screen bg-background">

      {/* Sidebar */}

      <SellerSidebar />

      {/* Right Side */}

      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Navbar */}

        <SellerNavbar />

        {/* Main Content */}

        <main
          className="
            flex-1
            overflow-y-auto
            bg-background
            p-8
          "
        >

          <Outlet />

        </main>

      </div>

    </div>

  );

};

export default SellerLayout;