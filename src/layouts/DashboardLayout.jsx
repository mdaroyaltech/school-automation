import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ user, setUser, children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-slate-900">
      <Sidebar
        user={user}
        setUser={setUser}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div
        className={`flex-1 flex flex-col transition-all
          ${collapsed ? "md:ml-20" : "md:ml-64"}
        `}
      >
        <Navbar
          user={user}
          onMobileMenu={() => setMobileOpen(true)}
        />

        <main className="pt-14 md:pt-0 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
