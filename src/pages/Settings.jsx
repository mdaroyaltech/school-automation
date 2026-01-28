import React, { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

const Settings = ({ user, setUser }) => {
  const [schoolName, setSchoolName] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [saved, setSaved] = useState(false);

  /* LOAD SAVED SETTINGS (DEMO) */
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("school-settings"));
    if (data) {
      setSchoolName(data.schoolName || "");
      setAcademicYear(data.academicYear || "");
      setContactEmail(data.contactEmail || "");
    }
  }, []);

  /* SAVE SETTINGS */
  const saveSettings = () => {
    localStorage.setItem(
      "school-settings",
      JSON.stringify({
        schoolName,
        academicYear,
        contactEmail,
      })
    );

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardLayout user={user} setUser={setUser}>
      {/* HEADER */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            School Settings
          </h1>
          <p className="text-sm text-textSecondary mt-1">
            Manage basic configuration for your institution
          </p>
        </div>

        {saved ? (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-semibold dark:bg-green-900 dark:text-green-300">
            ✅ Settings saved successfully
          </div>
        ) : (
          <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold dark:bg-blue-900 dark:text-blue-300">
            Admin Configuration
          </div>
        )}
      </div>

      {/* CENTERED SETTINGS CARD */}
      <div className="flex justify-center px-4">
        <div className="bg-card border border-cardBorder rounded-2xl shadow max-w-2xl w-full">
          {/* SECTION HEADER */}
          <div className="px-8 py-6 border-b dark:border-slate-700">
            <h2 className="text-lg font-semibold text-textPrimary">
              General Information
            </h2>
            <p className="text-sm text-textSecondary">
              These details appear across the system
            </p>
          </div>

          {/* CONTENT */}
          <div className="p-8 space-y-6">
            {/* SCHOOL NAME */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                School Name
              </label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder="ABC International School"
                className="
                  w-full border p-3 rounded-xl text-sm
    text-textPrimary
    bg-navbar text-textPrimary
    focus:ring-2 focus:ring-blue-500 outline-none
    dark:border-slate-700
                "
              />
              <p className="text-xs text-gray-400 mt-1">
                Displayed on dashboards and reports
              </p>
            </div>

            {/* ACADEMIC YEAR */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Academic Year
              </label>
              <input
                type="text"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                placeholder="2025 – 2026"
                className="
                  w-full border p-3 rounded-xl text-sm
    text-textPrimary
    bg-navbar text-textPrimary
    focus:ring-2 focus:ring-blue-500 outline-none
    dark:border-slate-700
                "
              />
              <p className="text-xs text-gray-400 mt-1">
                Used for attendance, exams & reports
              </p>
            </div>

            {/* CONTACT EMAIL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Contact Email
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="school@email.com"
                className="
                  w-full border p-3 rounded-xl text-sm
    text-textPrimary
    bg-navbar text-textPrimary
    focus:ring-2 focus:ring-blue-500 outline-none
    dark:border-slate-700
                "
              />
              <p className="text-xs text-gray-400 mt-1">
                Official communication email
              </p>
            </div>
          </div>

          {/* FOOTER */}
          <div className="px-8 py-6 border-t dark:border-slate-700 flex justify-end">
            <button
              onClick={saveSettings}
              className="
                bg-accent hover:bg-accent-hover
                text-white px-6 py-3 rounded-xl
                font-semibold shadow
              "
            >
              💾 Save Settings
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
