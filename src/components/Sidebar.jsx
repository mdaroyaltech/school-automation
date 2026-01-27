import React, { useEffect } from "react";
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

const Sidebar = ({
  user,
  setUser,
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  /* LOCK BODY SCROLL WHEN MOBILE SIDEBAR OPEN */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
  }, [mobileOpen]);

  const logout = () => {
    setUser(null);
    navigate("/");
    setMobileOpen(false);
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
  };

  const roleKey = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : "Admin";

  const menuList = MENUS[roleKey] || [];

  /* ================= MENU ITEM ================= */
  const MenuItem = ({ icon: Icon, label, path }) => {
    const active = location.pathname === path;

    return (
      <div
        onClick={() => {
          navigate(path);
          setMobileOpen(false);
        }}
        className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer
          ${
            active
              ? "bg-white/20 dark:bg-white/10"
              : "hover:bg-white/10 dark:hover:bg-white/5"
          }`}
      >
        {active && (
          <span className="absolute left-0 top-2 bottom-2 w-1 bg-blue-300 dark:bg-blue-400 rounded-r" />
        )}

        <div className="p-2 rounded-lg bg-white/10 dark:bg-white/5">
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

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <motion.div
        initial={false}
        animate={{ width: collapsed ? 84 : 260 }}
        transition={{ duration: 0.25 }}
        className="
          hidden md:flex fixed top-0 left-0 h-screen z-40
          bg-sidebar
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
        <div className="space-y-1 flex-1">
          {menuList.map((item) => (
            <MenuItem key={item.path} {...item} />
          ))}
        </div>

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="mt-4 bg-red-500 hover:bg-red-600 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold"
        >
          <LogOut size={18} />
          {!collapsed && "Logout"}
        </button>
      </motion.div>

      {/* ================= MOBILE SIDEBAR ================= */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-[9999] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="
                h-full w-64
                bg-sidebar
                text-white p-4 flex flex-col shadow-2xl
              "
            >
              {/* CLOSE */}
              <div className="flex justify-end mb-4">
                <X
                  onClick={() => setMobileOpen(false)}
                  className="cursor-pointer"
                />
              </div>

              {/* MENU */}
              <div className="space-y-1 flex-1">
                {menuList.map((item) => (
                  <MenuItem key={item.path} {...item} />
                ))}
              </div>

              {/* LOGOUT */}
              <button
                onClick={logout}
                className="mt-4 bg-red-500 hover:bg-red-600 py-2.5 rounded-xl text-sm font-semibold"
              >
                Logout
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
