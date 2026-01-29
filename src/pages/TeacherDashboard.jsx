import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DashboardLayout from "../layouts/DashboardLayout";


const TeacherDashboard = ({ user, setUser }) => {
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });

  /* ================= REAL ATTENDANCE DATA ================= */
  const attendanceKey = "attendance-5-A"; // same key used in Attendance page
  const attendanceData =
    JSON.parse(localStorage.getItem(attendanceKey)) || [];

  const presentCount = attendanceData.filter(
    (s) => s.present
  ).length;

  const totalCount = attendanceData.length;
  const absentCount = totalCount - presentCount;

  const attendancePercent = totalCount
    ? Math.round((presentCount / totalCount) * 100)
    : 0;

  const attendanceStatus =
    totalCount > 0 ? "Marked" : "Not Marked";

  /* ================= SUMMARY OBJECT (UNCHANGED USAGE) ================= */
  const summary = {
    present: presentCount,
    absent: absentCount,
    total: totalCount,
    attendance: attendancePercent,
    status: attendanceStatus,
  };

  /* ================= TASKS ================= */
  const tasks = [
    { text: "Mark attendance for Class 5-A", action: "/attendance" },
    { text: "Enter marks for Unit Test", action: "/marks-entry" },
    { text: "Review parent circulars", action: "/circular" },
  ];

  return (
    <DashboardLayout user={user} setUser={setUser}>
      {/* ================= HEADER ================= */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-textPrimary">
          Good Morning 👋
        </h1>
        <p className="text-textSecondary mt-1">
          {today} · Teacher Dashboard
        </p>
      </div>

{/* ================= TODAY SUMMARY ================= */}
<div className="grid grid-cols-1 sm:grid-cols-5 gap-6 mb-10">

  {/* TOTAL STUDENTS */}
  <motion.div
    whileHover={{ y: -4, scale: 1.02 }}
    className="bg-card border border-cardBorder p-5 rounded-2xl shadow"
  >
    <div className="flex items-center gap-3">
      <span className="text-3xl">👨‍🎓</span>
      <p className="text-sm text-textSecondary">Total Students</p>
    </div>
    <h2 className="text-3xl font-bold text-textPrimary mt-3">
      {summary.total}
    </h2>
  </motion.div>

  {/* PRESENT */}
  <motion.div
    whileHover={{ y: -4, scale: 1.02 }}
    className="bg-card border border-cardBorder p-5 rounded-2xl shadow"
  >
    <div className="flex items-center gap-3">
      <span className="text-3xl">✅</span>
      <p className="text-sm text-textSecondary">Present</p>
    </div>
    <h2 className="text-3xl font-bold text-success mt-3">
      {summary.present}
    </h2>
  </motion.div>

  {/* ABSENT */}
  <motion.div
    whileHover={{ y: -4, scale: 1.02 }}
    className="bg-card border border-cardBorder p-5 rounded-2xl shadow"
  >
    <div className="flex items-center gap-3">
      <span className="text-3xl">❌</span>
      <p className="text-sm text-textSecondary">Absent</p>
    </div>
    <h2 className="text-3xl font-bold text-danger mt-3">
      {summary.absent}
    </h2>
  </motion.div>

  {/* ATTENDANCE */}
  <motion.div
    whileHover={{ y: -4, scale: 1.02 }}
    className="bg-card border border-cardBorder p-5 rounded-2xl shadow"
  >
    <div className="flex items-center gap-3">
      <span className="text-3xl">📊</span>
      <p className="text-sm text-textSecondary">Attendance</p>
    </div>
    <h2 className="text-3xl font-bold text-textPrimary mt-3">
      {summary.attendance}%
    </h2>

    {/* Progress bar */}
    <div className="mt-3 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-green-500 transition-all duration-500"
        style={{ width: `${summary.attendance}%` }}
      />
    </div>
  </motion.div>

  {/* STATUS */}
  <motion.div
    whileHover={{ y: -4, scale: 1.02 }}
    className="bg-card border border-cardBorder p-5 rounded-2xl shadow"
  >
    <div className="flex items-center gap-3">
      <span className="text-3xl">
        {summary.status === "Marked" ? "🟢" : "🟡"}
      </span>
      <p className="text-sm text-textSecondary">Status</p>
    </div>

    <span
      className={`inline-block mt-4 px-4 py-1 rounded-full text-sm font-semibold
        ${
          summary.status === "Marked"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
    >
      {summary.status}
    </span>
  </motion.div>

</div>


      {/* ================= QUICK ACTIONS ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          {
            label: "Mark Attendance",
            icon: "🧑",
            path: "/attendance",
          },
          {
            label: "Enter Marks",
            icon: "📝",
            path: "/marks-entry",
          },
          {
            label: "Send Circular",
            icon: "📢",
            path: "/circular",
          },
          {
            label: "View Reports",
            icon: "📊",
            path: "/reports",
          },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="
              bg-card border border-cardBorder
              p-5 rounded-2xl shadow
              hover:shadow-lg hover:-translate-y-0.5 transition
              text-sm font-semibold
              flex flex-col items-center gap-2
              text-textPrimary
            "
          >
            <span className="text-3xl">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>

      {/* ================= PENDING TASKS ================= */}
      <div className="bg-card border border-cardBorder p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold text-textPrimary mb-4">
          Pending Tasks
        </h2>

        <ul className="space-y-4">
          {tasks.map((task, i) => (
            <li
              key={i}
              className="flex items-center justify-between"
            >
              <span className="text-textSecondary">
                • {task.text}
              </span>

              <button
                onClick={() => navigate(task.action)}
                className="text-sm text-accent font-semibold hover:underline"
              >
                Open
              </button>
            </li>
          ))}
        </ul>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
