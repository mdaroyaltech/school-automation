import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ user, setUser, children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-slate-900">
      {/* ================= SIDEBAR ================= */}
      <Sidebar
        user={user}
        setUser={setUser}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* ================= MAIN AREA ================= */}
      <div
        className={`flex-1 flex flex-col transition-all
          ${collapsed ? "md:ml-20" : "md:ml-64"}
        `}
      >
        {/* ================= NAVBAR ================= */}
        <Navbar
          user={user}
          onMobileMenu={() => setMobileOpen(true)}
        />

        {/* ================= PAGE CONTENT ================= */}
        <main
          className="
            pt-16        /* mobile navbar height */
            md:pt-20     /* desktop navbar height */
            px-4 md:px-6
            pb-6
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
