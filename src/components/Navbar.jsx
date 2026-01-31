import React, { useState, useEffect, useRef } from "react";
import {
  Bell,
  Moon,
  Sun,
  UserCircle,
  Menu
} from "lucide-react";


const Navbar = ({ user, onMobileMenu = () => {} }) => {
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  /* 🌙 DARK MODE */
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  /* 🏫 SCHOOL NAME */
  const [schoolName, setSchoolName] = useState("SchoolLMS");

  /* 🏫 SCHOOL LOGO */
  const [logo, setLogo] = useState(null);

  /* LOAD SCHOOL SETTINGS + LOGO */
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("school-settings"));
    if (data?.schoolName) setSchoolName(data.schoolName);

    const savedLogo = localStorage.getItem("school-logo");
    if (savedLogo) setLogo(savedLogo);
  }, []);

  /* APPLY THEME */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  /* CLOSE DROPDOWNS ON OUTSIDE CLICK */
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotif(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      {/* ================= MOBILE NAVBAR ================= */}
<div
  className="
    md:hidden fixed top-0 left-0 right-0 z-50 h-14
    bg-navbar border-b border-borderDefault
    flex items-center justify-between px-3
  "
>
  {/* ☰ MOBILE SIDEBAR */}
  <button
    onClick={onMobileMenu}
    className="
      p-2 rounded-lg
      hover:bg-gray-100 dark:hover:bg-slate-800
      text-textPrimary
    "
  >
    <span className="text-xl font-bold">☰</span>
  </button>

  {/* LOGO + SCHOOL NAME */}
  <div className="flex items-center gap-2 truncate">
    {logo && (
      <img
        src={logo}
        alt="School Logo"
        className="h-6 object-contain"
      />
    )}
    <span className="text-sm font-semibold text-textPrimary truncate">
      {schoolName}
    </span>
  </div>

  {/* RIGHT ICONS (SAME AS DESKTOP STYLE) */}
  <div className="flex items-center gap-1">
    {/* DARK MODE */}
    <button
      onClick={() => setDark(!dark)}
      className="
        p-2 rounded-lg
        hover:bg-gray-100 dark:hover:bg-slate-800
      "
    >
      {dark ? (
        <Sun size={18} className="text-yellow-400" />
      ) : (
        <Moon size={18} className="text-textPrimary" />
      )}
    </button>

    {/* NOTIFICATION */}
    <div ref={notifRef} className="relative">
      <button
        onClick={() => setShowNotif(!showNotif)}
        className="
          relative p-2 rounded-lg
          hover:bg-gray-100 dark:hover:bg-slate-800
        "
      >
        <Bell size={18} className="text-textPrimary" />
        <span className="absolute top-1 right-1 h-2 w-2 bg-danger rounded-full" />
      </button>

      {showNotif && (
        <div className="
          absolute right-0 mt-2 w-64
          bg-navbar border border-borderDefault
          rounded-xl shadow-lg p-4 text-sm
        ">
          <p className="font-semibold mb-2 text-textPrimary">
            Notifications
          </p>
          <ul className="space-y-2 text-textSecondary">
            <li>New circular published</li>
            <li>Attendance alert</li>
            <li>Fees payment received</li>
          </ul>
        </div>
      )}
    </div>

    {/* PROFILE */}
    <div ref={profileRef} className="relative">
      <button
        onClick={() => setShowProfile(!showProfile)}
        className="
          p-2 rounded-lg
          hover:bg-gray-100 dark:hover:bg-slate-800
        "
      >
        <UserCircle size={20} className="text-textPrimary" />
      </button>

      {showProfile && (
        <div className="
          absolute right-0 mt-2 w-48
          bg-navbar border border-borderDefault
          rounded-xl shadow-lg p-4 text-sm
        ">
          <p className="font-semibold text-textPrimary">
            {user?.email || "demo@school.com"}
          </p>
          <p className="text-textSecondary mt-1">
            Role: {user?.role}
          </p>
        </div>
      )}
    </div>
  </div>
</div>


      {/* ================= DESKTOP NAVBAR ================= */}
      <div
        className="
          hidden md:flex sticky top-0 z-40 h-16 w-full
          bg-navbar border-b border-borderDefault
          flex items-center justify-between px-6
        "
      >
        {/* LEFT: LOGO + SCHOOL NAME */}
        <div className="flex items-center gap-3">
          {logo && (
            <img
              src={logo}
              alt="School Logo"
              className="h-9 w-auto object-contain"
            />
          )}

          <div>
            <h1 className="text-lg font-bold text-textPrimary">
              {schoolName}
            </h1>
            <p className="text-xs text-textSecondary">
              Smart Management System
            </p>
          </div>
        </div>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-4 relative">
          {/* DARK MODE */}
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            {dark ? (
              <Sun size={18} className="text-yellow-400" />
            ) : (
              <Moon size={18} className="text-gray-700 dark:text-gray-300" />
            )}
          </button>

          {/* 🔔 NOTIFICATION */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setShowNotif(!showNotif)}
              className="
                relative p-2 rounded-lg
                hover:bg-gray-100 dark:hover:bg-slate-800
              "
            >
              <Bell size={18} className="text-textPrimary" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-danger rounded-full" />
            </button>

            {showNotif && (
              <div className="
                absolute right-0 mt-3 w-64
                bg-navbar text-textPrimary
                border border-borderDefault
                rounded-xl shadow-lg p-4 text-sm
              ">
                <p className="font-semibold mb-2">
                  Notifications
                </p>
                <ul className="space-y-1 text-textSecondary">
                  <li>📢 New Circular</li>
                  <li>📲 Attendance Alert</li>
                  <li>💰 Fees Paid</li>
                </ul>
              </div>
            )}
          </div>

          {/* 👤 PROFILE */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="
                flex items-center gap-2
                bg-blue-50 dark:bg-slate-800
                px-3 py-1.5 rounded-full
                text-sm font-semibold
                text-blue-700 dark:text-gray-200
              "
            >
              <UserCircle size={18} />
              {user?.role}
            </button>

            {showProfile && (
              <div className="
                absolute right-0 mt-3 w-48
                bg-navbar text-textPrimary
                border border-borderDefault
                rounded-xl shadow-lg p-4 text-sm
              ">
                <p className="font-semibold">
                  {user?.email || "demo@school.com"}
                </p>
                <p className="text-textSecondary mt-1">
                  Role: {user?.role}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
