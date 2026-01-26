import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  IndianRupee,
  FileText,
  Bell,
  LogOut,
  Menu,
  X,
  Settings,
} from "lucide-react";

const Sidebar = ({ user, setUser, collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const logout = () => {
    setUser(null);
    navigate("/");
  };

  /* ================= MENU CONFIG ================= */
  const MENUS = {
    Admin: [
      { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
      { icon: Users, label: "Attendance", path: "/attendance" },
      { icon: IndianRupee, label: "Fees", path: "/fees" },
      { icon: FileText, label: "Reports", path: "/reports" },
      { icon: Bell, label: "Circulars", path: "/circular" },
      { icon: Users, label: "Students", path: "/students" },
      { icon: Settings, label: "Settings", path: "/settings" },
    ],
    Teacher: [
      { icon: Users, label: "Attendance", path: "/attendance" },
      { icon: FileText, label: "Marks Entry", path: "/marks-entry" },
    ],
    Parent: [
      { icon: LayoutDashboard, label: "Dashboard", path: "/parent" },
      { icon: Bell, label: "Circulars", path: "/parent-circulars" },
      { icon: FileText, label: "Report Card", path: "/reports" },
      { icon: IndianRupee, label: "Fees", path: "/fees" },
    ],
  };

  /* ================= MENU ITEM ================= */
  const MenuItem = ({ icon: Icon, label, path }) => {
    const active = location.pathname === path;

    return (
      <div
        onClick={() => {
          navigate(path);
          setMobileOpen(false);
        }}
        className={`
          relative flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer
          transition-all group
          ${
            active
              ? "bg-white/20 dark:bg-white/10"
              : "hover:bg-white/10 dark:hover:bg-white/5"
          }
        `}
      >
        {active && (
          <span className="absolute left-0 top-2 bottom-2 w-1 bg-blue-300 rounded-r" />
        )}

        <div
          className={`
            p-2 rounded-lg
            ${
              active
                ? "bg-white/20"
                : "bg-white/10 group-hover:bg-white/20"
            }
          `}
        >
          <Icon size={18} />
        </div>

        {!collapsed && (
          <span className="text-sm font-medium whitespace-nowrap">
            {label}
          </span>
        )}
      </div>
    );
  };

  const renderMenu = () =>
    MENUS[user?.role]?.map((item) => (
      <MenuItem key={item.path} {...item} />
    ));

  return (
    <>
      {/* ================= MOBILE TOP BAR ================= */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black border-b px-4 py-3 flex items-center justify-between">
        <span className="font-bold">SchoolLMS</span>
        <button onClick={() => setMobileOpen(true)}>
          <Menu />
        </button>
      </div>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <motion.div
        initial={false}
        animate={{ width: collapsed ? 84 : 260 }}
        transition={{ duration: 0.25 }}
        className="
          hidden md:flex fixed top-0 left-0 h-screen z-40
          bg-gradient-to-b from-blue-700 to-blue-800
          dark:from-slate-950 dark:to-slate-900
          text-white flex-col px-3 py-4
        "
      >
        {/* LOGO */}
        <div className="flex items-center justify-between mb-8">
          {!collapsed && (
            <div>
              <h2 className="text-xl font-bold tracking-wide">
                School<span className="text-blue-300">LMS</span>
              </h2>
              <p className="text-xs text-blue-200 dark:text-gray-400">
                Smart Automation
              </p>
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-white/10"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* MENU */}
        <div className="space-y-1 text-sm flex-1">
          {renderMenu()}
        </div>

        {/* LOGOUT */}
        <div className="pt-4 border-t border-white/20">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 py-2.5 rounded-xl text-sm font-semibold"
          >
            <LogOut size={18} />
            {!collapsed && "Logout"}
          </button>
        </div>
      </motion.div>

      {/* ================= MOBILE SIDEBAR ================= */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed inset-0 z-50 bg-black/40 md:hidden"
          >
            <motion.div
              className="
                absolute left-0 top-0 h-full w-64
                bg-gradient-to-b from-blue-700 to-blue-800
                dark:from-slate-950 dark:to-slate-900
                text-white px-3 py-4 flex flex-col
              "
            >
              <div className="flex justify-end mb-4">
                <button onClick={() => setMobileOpen(false)}>
                  <X />
                </button>
              </div>

              <div className="space-y-1 text-sm flex-1">
                {renderMenu()}
              </div>

              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 py-2.5 rounded-xl text-sm font-semibold"
              >
                <LogOut size={18} /> Logout
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
