import React, { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Users,
  BookOpen,
  BarChart3,
} from "lucide-react";

/* Animated Icon */
const AnimatedBookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-6 w-6 text-purple-600 dark:text-purple-300 animate-bounce"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
    <path d="M4 4.5A2.5 2.5 0 016.5 7H20v13H6.5A2.5 2.5 0 014 17.5z" />
    <path d="M8 7h8" />
  </svg>
);

const AdminDashboard = ({ user, setUser }) => {
  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const [attendance, setAttendance] = useState(94);

  /* SCHOOL NAME */
  const [schoolName, setSchoolName] = useState("SchoolLMS");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("school-settings"));
    if (data?.schoolName) setSchoolName(data.schoolName);
  }, []);

  /* Attendance Logic */
  useEffect(() => {
    if (selectedDate === today) setAttendance(94);
    else setAttendance(82 + Math.floor(Math.random() * 12));
  }, [selectedDate, today]);

  const classAttendance = [
    ["5th", attendance - 2],
    ["6th", attendance - 5],
    ["7th", attendance + 1],
    ["8th", attendance - 3],
  ];

  const [stats, setStats] = useState({
    students: 1240,
    teachers: 58,
    classes: "LKG – 12",
  });

  const [summary, setSummary] = useState({
    present: 0,
    absent: 0,
    circulars: 0,
  });

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const total = 1240;
    const present = Math.round((attendance / 100) * total);

    setStats({
      students: total,
      teachers: 56 + Math.floor(Math.random() * 3),
      classes: "LKG – 12",
    });

    setSummary({
      present,
      absent: total - present,
      circulars: 3,
    });

    setActivities([
      { text: "📲 Attendance marked for Class 5-A", time: "10:15 AM" },
      { text: "📢 New circular published", time: "09:40 AM" },
      { text: "💰 Fees payment received (₹5,000)", time: "Yesterday" },
    ]);
  }, [attendance]);

  /* ================= REAL TODAY SUMMARY (FROM LOCALSTORAGE) ================= */
    useEffect(() => {
      const data =
        JSON.parse(localStorage.getItem("attendance-5-A")) || [];

      const present = data.filter((s) => s.present).length;
      const absent = data.length - present;

      const circulars =
        JSON.parse(localStorage.getItem("admin-circulars"))?.length || 3;

      setSummary({
        present,
        absent,
        circulars,
      });
    }, []);


  return (
    <DashboardLayout user={user} setUser={setUser}>
     {/* ================= HERO HEADER ================= */}
<div
  className="mb-10 rounded-3xl p-6 md:p-8 shadow"
  style={{
    background:
      "linear-gradient(135deg, var(--bg-card), var(--bg-page))",
    border: "1px solid var(--border-card)",
  }}
>
  {/* TOP ROW */}
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <div>
      <h1 className="text-3xl font-bold text-[color:var(--text-primary)]">
        {schoolName}
      </h1>
      <p className="text-sm mt-1 text-[color:var(--text-secondary)]">
        Admin Dashboard · School Control Center
      </p>
    </div>

{/* QUICK STATUS */}
<div
  className="px-4 py-2 rounded-2xl text-sm font-semibold"
  style={{
    background: "var(--bg-page)",
    color: "var(--text-primary)",
    border: "1px solid var(--border-default)",
  }}
>
  📅{" "}
  {selectedDate === today
    ? "Today"
    : new Date(selectedDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })}{" "}
  · Attendance {attendance}%
</div>
  </div>

  {/* STATS PILLS */}
  <div className="flex flex-wrap gap-3 mt-6">
    <span
      className="px-4 py-2 rounded-full text-sm font-semibold"
      style={{
        background: "rgba(34,197,94,0.12)",
        color: "var(--success)",
      }}
    >
      ✅ Attendance {attendance}%
    </span>

    <span
      className="px-4 py-2 rounded-full text-sm font-semibold"
      style={{
        background: "rgba(56,189,248,0.12)",
        color: "var(--info)",
      }}
    >
      📢 {summary.circulars} Circulars Today
    </span>

    <span
      className="px-4 py-2 rounded-full text-sm font-semibold"
      style={{
        background: "rgba(251,191,36,0.15)",
        color: "var(--warning)",
      }}
    >
      💰 Fees Pending
    </span>
  </div>
</div>


      {/* ================= DATE SELECT ================= */}
      <div className="flex justify-end mb-6 gap-2">
        {/* DATE PICKER */}
        <div className="flex items-center gap-2 bg-card border border-cardBorder px-4 py-2 rounded-xl shadow">
          <span>📅</span>
          <input
            type="date"
            value={selectedDate}
            max={today}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-transparent outline-none text-sm font-semibold text-textPrimary"
          />
        </div>

        {/* TODAY BUTTON */}
        <button
          onClick={() => setSelectedDate(today)}
          className="
            px-4 py-2 rounded-xl text-sm font-semibold
            bg-accent text-white
            hover:bg-accent-hover
            shadow
          "
        >
          Today
        </button>
      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Mark Attendance", icon: "🧑" },
          { label: "Add Student", icon: "➕" },
          { label: "Send Circular", icon: "📢" },
          { label: "Collect Fees", icon: "💰" },
        ].map((item) => (
          <button
            key={item.label}
            className="bg-card border border-cardBorder p-5 rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition flex flex-col items-center gap-2 text-sm font-semibold text-textPrimary"
          >
            <span className="text-3xl">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>

      {/* ================= KPI CARDS ================= */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
  {[
    { title: "Total Students", value: stats.students, icon: GraduationCap },
    { title: "Teachers", value: stats.teachers, icon: Users },
    { title: "Classes", value: stats.classes, icon: BookOpen },
    { title: "Attendance", value: `${attendance}%`, icon: BarChart3 },
  ].map((card) => {
    const Icon = card.icon;

    return (
      <motion.div
        key={card.title}
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 250 }}
        className="
          bg-card border border-cardBorder
          p-6 rounded-2xl shadow
          hover:shadow-xl transition
          flex items-center justify-between
          group
        "
      >
        {/* LEFT CONTENT */}
        <div>
          <p className="text-xs uppercase tracking-wide text-textMuted">
            {card.title}
          </p>

          <h2 className="text-3xl font-extrabold text-textPrimary mt-1">
            {card.value}
          </h2>

          <p className="text-xs text-success mt-1">
            Updated today
          </p>
        </div>

        {/* RIGHT ICON */}
        {card.title === "Classes" ? (
          <motion.div
            whileHover={{ scale: 1.15 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="
              h-12 w-12 rounded-xl
              flex items-center justify-center
              bg-purple-100 dark:bg-purple-900/30
            "
          >
            <AnimatedBookIcon />
          </motion.div>
        ) : (
          <motion.div
            whileHover={{ scale: 1.15, rotate: 6 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="
              h-12 w-12 rounded-xl
              flex items-center justify-center
              bg-accent/10
            "
          >
            <Icon className="h-6 w-6 text-accent" />
          </motion.div>
        )}
      </motion.div>
    );
  })}
</div>

      {/* ================= ATTENDANCE + FEES ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="bg-card border border-cardBorder p-6 rounded-2xl shadow lg:col-span-2">
          <h3 className="font-semibold text-textPrimary mb-4">
            Overall Attendance
          </h3>
          <div className="flex justify-between text-sm text-textSecondary mb-2">
            <span>{selectedDate === today ? "Today" : "Selected Date"}</span>
            <span>{attendance}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3">
            <div
              className="bg-success h-3 rounded-full transition-all duration-500"
              style={{ width: `${attendance}%` }}
            />
          </div>
        </div>

        <div className="bg-card border border-cardBorder p-6 rounded-2xl shadow">
          <h3 className="font-semibold text-textPrimary mb-3">
            Fees Status
          </h3>
          <p className="text-sm text-textSecondary">
            Collected: ₹12,00,000
          </p>
          <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3 mt-2">
            <div className="bg-warning h-3 rounded-full w-[80%]" />
          </div>
          <p className="text-sm text-danger mt-2">
            Pending: ₹3,00,000
          </p>
        </div>
      </div>

      {/* ================= TODAY SUMMARY ================= */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">

  {/* PRESENT */}
  <div className="
    bg-card border border-cardBorder p-6 rounded-2xl shadow
    hover:shadow-lg transition
  ">
    <div className="flex items-center justify-between">
      <p className="text-sm text-textSecondary">Students Present</p>
      <span className="text-2xl">✅</span>
    </div>

    <h2 className="text-3xl font-bold text-success mt-2">
      {summary.present}
    </h2>

    <p className="text-xs text-textMuted mt-1">
      Attendance marked today
    </p>
  </div>

  {/* ABSENT */}
  <div className="
    bg-card border border-cardBorder p-6 rounded-2xl shadow
    hover:shadow-lg transition
  ">
    <div className="flex items-center justify-between">
      <p className="text-sm text-textSecondary">Students Absent</p>
      <span className="text-2xl">❌</span>
    </div>

    <h2 className="text-3xl font-bold text-danger mt-2">
      {summary.absent}
    </h2>

    <p className="text-xs text-textMuted mt-1">
      Parents notified automatically
    </p>
  </div>

  {/* CIRCULARS */}
  <div className="
    bg-card border border-cardBorder p-6 rounded-2xl shadow
    hover:shadow-lg transition
  ">
    <div className="flex items-center justify-between">
      <p className="text-sm text-textSecondary">Circulars Sent</p>
      <span className="text-2xl">📢</span>
    </div>

    <h2 className="text-3xl font-bold text-info mt-2">
      {summary.circulars}
    </h2>

    <p className="text-xs text-textMuted mt-1">
      Published by admin
    </p>
  </div>

</div>


      {/* ================= RECENT ACTIVITIES ================= */}
      <div className="bg-card border border-cardBorder p-6 rounded-2xl shadow mb-10">
        <h3 className="font-semibold text-textPrimary mb-4">
          Recent Activities
        </h3>

        <div className="relative border-l border-borderDefault pl-6 space-y-4">
          {activities.map((item, i) => (
            <div key={i} className="relative">
              <span className="absolute -left-[9px] top-1 h-4 w-4 bg-accent rounded-full" />
              <p className="text-sm text-textPrimary font-medium">
                {item.text}
              </p>
              <p className="text-xs text-textMuted">
                {item.time}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= CLASS-WISE ATTENDANCE ================= */}
      <div className="bg-card border border-cardBorder p-6 rounded-2xl shadow">
        <h3 className="font-semibold text-textPrimary mb-4">
          Class-wise Attendance
        </h3>

        {classAttendance.map(([cls, percent]) => (
          <div key={cls} className="mb-4">
            <div className="flex justify-between text-sm text-textSecondary mb-1">
              <span>Class {cls}</span>
              <span>{percent}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
              <div
                className="bg-info h-2 rounded-full transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
