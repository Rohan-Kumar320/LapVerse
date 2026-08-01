import { Outlet } from "react-router-dom";

import SellerSidebar from "./SellerSidebar";
import SellerNavbar from "./SellerNavbar";

const SellerLayout = () => {

  return (

    <div
      className="
        flex
        h-screen
        overflow-hidden
        bg-[#f8fafc]
      "
    >

      {/* Sidebar */}

      <SellerSidebar />

      {/* Right Side */}

      <div
        className="
          flex
          min-w-0
          flex-1
          flex-col
        "
      >

        {/* Navbar */}

        <SellerNavbar />

        {/* Main */}

        <main
          className="
            flex-1
            overflow-y-auto
            bg-gradient-to-br
            from-slate-700
            via-slate-400
            to-orange-300
            px-8
            py-8
          "
        >

          <div
            className="
              mx-auto
              w-full
              max-w-[1700px]
              animate-[fadeIn_.35s_ease]
            "
          >

            <Outlet />

          </div>

        </main>

      </div>

    </div>

  );

};

export default SellerLayout;