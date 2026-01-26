import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const DashboardLayout = ({ user, setUser, children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex bg-gray-100 dark:bg-slate-900">
      {/* SIDEBAR */}
      <Sidebar
        user={user}
        setUser={setUser}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* RIGHT SIDE */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300
          ${collapsed ? "ml-[80px]" : "ml-[260px]"}
        `}
      >
        <Navbar user={user} />

        <div className="flex-1 p-6 overflow-y-auto h-screen pt-16 md:pt-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
