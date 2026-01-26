import React, { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

const AdminDashboard = ({ user, setUser }) => {
  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const [attendance, setAttendance] = useState(94);

  /* 🏫 SCHOOL NAME (DYNAMIC) */
  const [schoolName, setSchoolName] = useState("SchoolLMS");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("school-settings"));
    if (data?.schoolName) {
      setSchoolName(data.schoolName);
    }
  }, []);

  // demo date-wise attendance logic
  useEffect(() => {
    if (selectedDate === today) {
      setAttendance(94);
    } else {
      const random = 82 + Math.floor(Math.random() * 12); // 82–94
      setAttendance(random);
    }
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
    present: 1168,
    absent: 72,
    circulars: 3,
  });

  const [activities, setActivities] = useState([]);

  useEffect(() => {
  if (selectedDate === today) {
    // TODAY DATA
    setStats({
      students: 1240,
      teachers: 58,
      classes: "LKG – 12",
    });

    setSummary({
      present: Math.round((attendance / 100) * 1240),
      absent: 1240 - Math.round((attendance / 100) * 1240),
      circulars: 3,
    });

    setActivities([
      { text: "📲 Attendance marked for Class 5-A", time: "10:15 AM" },
      { text: "📢 New circular published", time: "09:40 AM" },
      { text: "💰 Fees payment received (₹5,000)", time: "Yesterday" },
    ]);
  } else {
    // PAST DATE – RANDOMIZED
    const total = 1240;
    const present = Math.round((attendance / 100) * total);

    setStats({
      students: total,
      teachers: 56 + Math.floor(Math.random() * 3), // 56–58
      classes: "LKG – 12",
    });

    setSummary({
      present,
      absent: total - present,
      circulars: 1 + Math.floor(Math.random() * 3), // 1–3
    });

    setActivities([
      {
        text: "📲 Attendance marked for Class 6-B",
        time: "10:00 AM",
      },
      {
        text: "📢 Circular sent to parents",
        time: "09:20 AM",
      },
    ]);
  }
}, [selectedDate, attendance, today]);



  return (
    <DashboardLayout user={user} setUser={setUser}>
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            {schoolName} — Admin Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Overview of today’s school activity
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-3">
          {/* DATE INPUT */}
          <div
            className="
              flex items-center gap-2
              bg-white dark:bg-slate-800
              px-4 py-2 rounded-xl shadow
              border border-gray-200 dark:border-slate-700
            "
          >
            <span>📅</span>
            <input
              type="date"
              value={selectedDate}
              max={today}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="
                bg-transparent outline-none
                text-sm font-semibold
                text-gray-800 dark:text-gray-200
              "
            />
          </div>

          {/* QUICK ACTION */}
          <button
            onClick={() => setSelectedDate(today)}
            className="
              text-xs px-3 py-1 rounded-lg
              bg-blue-100 dark:bg-blue-900
              text-blue-700 dark:text-blue-300 font-semibold
            "
          >
            Today
          </button>
        </div>
      </div>

      {/* QUICK ACTIONS */}
<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
  {[
    { label: "Mark Attendance", icon: "🧑" },
    { label: "Add Student", icon: "➕" },
    { label: "Send Circular", icon: "📢" },
    { label: "Collect Fees", icon: "💰" },
  ].map((item) => (
    <button
      key={item.label}
      className="
        bg-white dark:bg-slate-800
        p-5 rounded-2xl shadow
        hover:shadow-lg hover:-translate-y-0.5 transition
        text-sm font-semibold
        flex flex-col items-center gap-2
      "
    >
      <span className="text-3xl">{item.icon}</span>
      {item.label}
    </button>
  ))}
</div>
      {/* PREMIUM STATS CARDS */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
  {[
    {
      title: "Total Students",
      value: stats.students,
      icon: "🎓",
      bg: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      title: "Teachers",
      value: stats.teachers,
      icon: "🧑",
      bg: "bg-green-100 dark:bg-green-900/30",
    },
    {
      title: "Classes",
      value: stats.classes,
      icon: "📚",
bg: "bg-purple-100 dark:bg-purple-900/30",

    },
    {
      title: "Attendance",
      value: `${attendance}%`,
      icon: "📊",
      bg: "bg-orange-100 dark:bg-orange-900/30",
    },
  ].map((card) => (
    <div
      key={card.title}
      className="
        bg-white dark:bg-slate-800
        p-6 rounded-2xl shadow
        hover:shadow-lg transition
        flex items-center justify-between
      "
    >
      {/* LEFT */}
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {card.title}
        </p>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mt-2">
          {card.value}
        </h2>
      </div>

      {/* ICON */}
      <div
        className={`
          ${card.bg}
          h-12 w-12 rounded-xl
          flex items-center justify-center
          text-2xl
        `}
      >
        {card.icon}
      </div>
    </div>
  ))}
</div>



      {/* GRID SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
  {/* OVERALL ATTENDANCE */}
  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow lg:col-span-2">
    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
      Overall Attendance
    </h3>

    <div className="flex justify-between text-sm mb-2">
      <span>{selectedDate === today ? "Today" : "Selected Date"}</span>
      <span>{attendance}%</span>
    </div>

    <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3">
      <div
        className="bg-green-500 h-3 rounded-full transition-all duration-500"
        style={{ width: `${attendance}%` }}
      />
    </div>

    <p className="text-xs text-gray-500 mt-2">
      Attendance based on selected date
    </p>
  </div>

  {/* FEES */}
  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow">
    <h3 className="font-semibold mb-3">Fees Status</h3>

    <p className="text-sm text-gray-500">Collected: ₹12,00,000</p>

    <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
      <div className="bg-yellow-500 h-3 rounded-full w-[80%]" />
    </div>

    <p className="text-sm text-red-500 mt-2">
      Pending: ₹3,00,000
    </p>
  </div>
</div>

      {/* RECENT ACTIVITIES */}
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow mb-10">
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Recent Activities
      </h3>

      <ul className="space-y-3 text-sm">
      {activities.map((item, i) => (
        <li key={i} className="flex justify-between">
          <span>{item.text}</span>
          <span className="text-gray-400">{item.time}</span>
        </li>
      ))}
    </ul>
    </div>


    {/* TODAY SUMMARY */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-green-50 dark:bg-green-900 p-4 rounded-xl">
            <p className="text-sm text-green-700 dark:text-green-300">
              Students Present
            </p>
            <h2 className="text-2xl font-bold text-green-800 dark:text-green-200">
              {summary.present}
            </h2>
          </div>

          <div className="bg-red-50 dark:bg-red-900 p-4 rounded-xl">
            <p className="text-sm text-red-700 dark:text-red-300">
              Students Absent
            </p>
            <h2 className="text-2xl font-bold text-red-800 dark:text-red-200">
              {summary.absent}
            </h2>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-xl">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Circulars Sent
            </p>
            <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200">
              {summary.circulars}
            </h2>
          </div>
        </div>

      {/* CLASS-WISE ATTENDANCE */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Class-wise Attendance
        </h3>

        {classAttendance.map(([cls, percent]) => (
          <div key={cls} className="mb-4">
            <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mb-1">
              <span>Class {cls}</span>
              <span>{percent}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
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
