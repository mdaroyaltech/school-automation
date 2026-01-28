import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

const TeacherDashboard = ({ user, setUser }) => {
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });

  /* DEMO SUMMARY DATA */
  const summary = {
    present: 28,
    absent: 2,
    total: 30,
    attendance: 93,
    status: "Not Marked",
  };

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
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-10">
        <div className="bg-card border border-cardBorder p-5 rounded-2xl shadow">
          <p className="text-sm text-textSecondary">Present</p>
          <h2 className="text-3xl font-bold text-success mt-2">
            {summary.present}
          </h2>
        </div>

        <div className="bg-card border border-cardBorder p-5 rounded-2xl shadow">
          <p className="text-sm text-textSecondary">Absent</p>
          <h2 className="text-3xl font-bold text-danger mt-2">
            {summary.absent}
          </h2>
        </div>

        <div className="bg-card border border-cardBorder p-5 rounded-2xl shadow">
          <p className="text-sm text-textSecondary">Attendance</p>
          <h2 className="text-3xl font-bold text-textPrimary mt-2">
            {summary.attendance}%
          </h2>
        </div>

        <div className="bg-card border border-cardBorder p-5 rounded-2xl shadow">
          <p className="text-sm text-textSecondary">Status</p>
          <h2
            className={`text-xl font-bold mt-3 ${
              summary.status === "Marked"
                ? "text-success"
                : "text-warning"
            }`}
          >
            {summary.status}
          </h2>
        </div>
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
