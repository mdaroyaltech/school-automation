import React, { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

const Settings = ({ user, setUser }) => {
  const [schoolName, setSchoolName] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [logo, setLogo] = useState(null);
  const [saved, setSaved] = useState(false);

  /* LOAD SAVED SETTINGS */
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("school-settings"));
    if (data) {
      setSchoolName(data.schoolName || "");
      setAcademicYear(data.academicYear || "");
      setContactEmail(data.contactEmail || "");
    }

    const savedLogo = localStorage.getItem("school-logo");
    if (savedLogo) {
      setLogo(savedLogo);
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

  /* HANDLE LOGO UPLOAD */
  const handleLogoUpload = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem("school-logo", reader.result);
      setLogo(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <DashboardLayout user={user} setUser={setUser}>
      {/* HEADER */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary">
            School Settings
          </h1>
          <p className="text-sm text-textSecondary mt-1">
            Manage basic configuration for your institution
          </p>
        </div>

        {saved ? (
          <div className="bg-success/10 text-success px-4 py-2 rounded-xl text-sm font-semibold">
            ✅ Settings saved successfully
          </div>
        ) : (
          <div className="bg-info/10 text-info px-4 py-2 rounded-xl text-sm font-semibold">
            Admin Configuration
          </div>
        )}
      </div>

      {/* CENTERED SETTINGS CARD */}
      <div className="flex justify-center px-4">
        <div className="bg-card border border-cardBorder rounded-2xl shadow max-w-2xl w-full">
          {/* SECTION HEADER */}
          <div className="px-8 py-6 border-b border-borderDefault">
            <h2 className="text-lg font-semibold text-textPrimary">
              General Information
            </h2>
            <p className="text-sm text-textSecondary">
              These details appear across the system
            </p>
          </div>

          {/* CONTENT */}
          <div className="p-8 space-y-6">
            {/* SCHOOL LOGO */}
            <div>
              <label className="block text-sm font-semibold text-textPrimary mb-2">
                School Logo
              </label>

              <div className="flex items-center gap-6">
                <div
                  className="
                    h-20 w-20 rounded-xl border border-borderDefault
                    bg-navbar flex items-center justify-center
                    overflow-hidden
                  "
                >
                  {logo ? (
                    <img
                      src={logo}
                      alt="School Logo"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <span className="text-textMuted text-xs text-center px-2">
                      No Logo
                    </span>
                  )}
                </div>

                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleLogoUpload(e.target.files[0])
                    }
                  />
                  <span
                    className="
                      inline-block bg-accent hover:bg-accent-hover
                      text-white px-4 py-2 rounded-xl
                      text-sm font-semibold transition
                    "
                  >
                    Upload Logo
                  </span>
                </label>
              </div>

              <p className="text-xs text-textMuted mt-2">
                Appears on Login screen & Navbar
              </p>
            </div>

            {/* SCHOOL NAME */}
            <div>
              <label className="block text-sm font-semibold text-textPrimary mb-2">
                School Name
              </label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder="ABC International School"
                className="
                  w-full border border-borderDefault p-3 rounded-xl text-sm
                  bg-navbar text-textPrimary
                  focus:ring-2 focus:ring-accent outline-none
                "
              />
              <p className="text-xs text-textMuted mt-1">
                Displayed on dashboards and reports
              </p>
            </div>

            {/* ACADEMIC YEAR */}
            <div>
              <label className="block text-sm font-semibold text-textPrimary mb-2">
                Academic Year
              </label>
              <input
                type="text"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                placeholder="2025 – 2026"
                className="
                  w-full border border-borderDefault p-3 rounded-xl text-sm
                  bg-navbar text-textPrimary
                  focus:ring-2 focus:ring-accent outline-none
                "
              />
              <p className="text-xs text-textMuted mt-1">
                Used for attendance, exams & reports
              </p>
            </div>

            {/* CONTACT EMAIL */}
            <div>
              <label className="block text-sm font-semibold text-textPrimary mb-2">
                Contact Email
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="school@email.com"
                className="
                  w-full border border-borderDefault p-3 rounded-xl text-sm
                  bg-navbar text-textPrimary
                  focus:ring-2 focus:ring-accent outline-none
                "
              />
              <p className="text-xs text-textMuted mt-1">
                Official communication email
              </p>
            </div>
          </div>

          {/* FOOTER */}
          <div className="px-8 py-6 border-t border-borderDefault flex justify-end">
            <button
              onClick={saveSettings}
              className="
                bg-accent hover:bg-accent-hover
                text-white px-6 py-3 rounded-xl
                font-semibold shadow-card transition
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
