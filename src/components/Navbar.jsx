import React, { useState, useEffect, useRef } from "react";
import { Bell, Moon, Sun, UserCircle } from "lucide-react";

const Navbar = ({ user }) => {
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  /* 🌙 DARK MODE */
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  /* 🏫 SCHOOL NAME (DYNAMIC) */
  const [schoolName, setSchoolName] = useState("SchoolLMS");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("school-settings"));
    if (data?.schoolName) {
      setSchoolName(data.schoolName);
    }
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  /* CLOSE DROPDOWN ON OUTSIDE CLICK */
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
    <div
      className="
        sticky top-0 z-50 h-16 w-full
        bg-white dark:bg-slate-950
        border-b border-gray-200 dark:border-slate-800
        flex items-center justify-between px-6
      "
    >
      {/* LEFT */}
      <div>
        <h1 className="text-lg font-bold text-gray-800 dark:text-gray-200">
          {schoolName}
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Smart Management System
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 relative">
        {/* DARK MODE */}
        <button
          onClick={() => setDark(!dark)}
          className="
            p-2 rounded-lg
            hover:bg-gray-100 dark:hover:bg-slate-800
            transition
          "
        >
          {dark ? (
            <Sun size={18} className="text-yellow-400" />
          ) : (
            <Moon size={18} className="text-gray-700" />
          )}
        </button>

        {/* NOTIFICATION */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setShowNotif(!showNotif)}
            className="
              relative p-2 rounded-lg
              hover:bg-gray-100 dark:hover:bg-slate-800
              transition
            "
          >
            <Bell size={18} className="text-gray-700 dark:text-gray-300" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
          </button>

          {showNotif && (
            <div
              className="
                absolute right-0 mt-3 w-72
                bg-white dark:bg-slate-900
                border border-gray-200 dark:border-slate-700
                rounded-xl shadow-lg p-4 text-sm
              "
            >
              <p className="font-semibold text-gray-700 dark:text-gray-200 mb-3">
                Notifications
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>📢 New Circular published</li>
                <li>📲 Attendance alert sent</li>
                <li>💰 Fees payment received</li>
              </ul>
            </div>
          )}
        </div>

        {/* PROFILE */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="
              flex items-center gap-2
              bg-blue-50 dark:bg-slate-800
              px-3 py-1.5 rounded-full
              text-sm font-semibold
              text-blue-700 dark:text-gray-200
              hover:shadow transition
            "
          >
            <UserCircle size={18} />
            {user?.role}
          </button>

          {showProfile && (
            <div
              className="
                absolute right-0 mt-3 w-52
                bg-white dark:bg-slate-900
                border border-gray-200 dark:border-slate-700
                rounded-xl shadow-lg p-4 text-sm
              "
            >
              <p className="font-semibold text-gray-800 dark:text-gray-200">
                {user?.email || "demo@school.com"}
              </p>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Role: {user?.role}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
