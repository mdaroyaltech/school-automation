import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";

const ParentDashboard = ({ user, setUser }) => {
  /* DEMO ATTENDANCE DATA */
  const data =
    JSON.parse(localStorage.getItem("attendance-5-A")) || [];

  const todayAttendance = data[data.length - 1];
  const isPresent = todayAttendance?.present ?? false;

  const presentDays = data.filter((s) => s.present).length;
  const totalDays = data.length || 1;
  const attendancePercent = Math.round(
    (presentDays / totalDays) * 100
  );

  return (
    <DashboardLayout user={user} setUser={setUser}>
      {/* ================= HEADER ================= */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-textPrimary">
          Welcome 👋
        </h1>
        <p className="text-sm text-textSecondary mt-1">
          Ayaan Khan · Class 5-A
        </p>
      </div>

      {/* ================= STUDENT PROFILE ================= */}
      <div className="bg-card border border-cardBorder p-6 rounded-2xl shadow mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-4">
          <div
            className="
              h-14 w-14 rounded-full
              bg-accent/10
              flex items-center justify-center
              text-2xl
            "
          >
            👦
          </div>

          <div>
            <p className="text-sm text-textMuted">
              Student Name
            </p>
            <p className="text-lg font-semibold text-textPrimary">
              Ayaan Khan
            </p>
            <p className="text-sm text-textSecondary">
              Class 5-A · Roll No 12
            </p>
          </div>
        </div>

        {/* TODAY ATTENDANCE */}
        <div
          className={`
            px-6 py-4 rounded-xl text-center font-semibold
            ${
              isPresent
                ? "bg-success/10 text-success"
                : "bg-danger/10 text-danger"
            }
          `}
        >
          <p className="text-sm">
            Attendance Today
          </p>
          <p className="text-2xl mt-1">
            {isPresent ? "Present ✅" : "Absent ❌"}
          </p>
        </div>
      </div>

      {/* ================= DASHBOARD CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* ATTENDANCE OVERVIEW */}
        <div className="bg-card border border-cardBorder p-6 rounded-2xl shadow">
          <p className="text-sm text-textSecondary mb-1">
            Attendance Overview
          </p>
          <p className="text-3xl font-bold text-accent">
            {attendancePercent}%
          </p>
          <p className="text-sm text-textMuted mt-1">
            {presentDays} of {totalDays} days present
          </p>
        </div>

        {/* FEES STATUS */}
        <div className="bg-card border border-cardBorder p-6 rounded-2xl shadow">
          <p className="text-sm text-textSecondary mb-1">
            Fees Status
          </p>
          <p className="text-2xl font-bold text-success">
            Paid
          </p>
          <p className="text-sm text-textMuted mt-1">
            No pending dues
          </p>
        </div>

        {/* LEARNING PROGRESS */}
        <div className="bg-card border border-cardBorder p-6 rounded-2xl shadow">
          <p className="text-sm text-textSecondary mb-1">
            Learning Progress
          </p>
          <p className="text-2xl font-bold text-info">
            Good ⭐
          </p>
          <p className="text-sm text-textMuted mt-1">
            Consistent improvement
          </p>
        </div>
      </div>

      {/* ================= IMPORTANT NOTICE ================= */}
      <div
        className="
          bg-gradient-to-r
          from-warning/20 to-info/10
          dark:from-warning/30 dark:to-info/20
          p-6 rounded-2xl shadow
        "
      >
        <h2 className="font-semibold text-textPrimary mb-2">
          📢 Important Notice
        </h2>
        <p className="text-textSecondary leading-relaxed">
          Parent-Teacher Meeting scheduled on{" "}
          <b>Friday at 10:00 AM</b>.  
          Kindly ensure your availability to discuss your
          child’s academic progress.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default ParentDashboard;
