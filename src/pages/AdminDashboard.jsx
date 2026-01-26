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

      {/* PREMIUM STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          {
            title: "Total Students",
            value: "1240",
            color: "from-blue-500 to-blue-600",
          },
          {
            title: "Teachers",
            value: "58",
            color: "from-green-500 to-green-600",
          },
          {
            title: "Classes",
            value: "LKG – 12",
            color: "from-purple-500 to-purple-600",
          },
          {
            title: "Attendance",
            value: `${attendance}%`,
            color: "from-orange-500 to-orange-600",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="
              bg-white dark:bg-slate-800
              p-6 rounded-2xl shadow
              hover:shadow-lg transition
              relative overflow-hidden
            "
          >
            <div
              className={`absolute right-0 top-0 w-24 h-24 bg-gradient-to-br ${card.color} opacity-20 rounded-full -mr-10 -mt-10`}
            />

            <p className="text-sm text-gray-500 dark:text-gray-400">
              {card.title}
            </p>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mt-2">
              {card.value}
            </h2>
          </div>
        ))}
      </div>

      {/* GRID SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* OVERALL ATTENDANCE */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow lg:col-span-2">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
            Overall Attendance
          </h3>

          <div className="flex items-center justify-between mb-2 text-sm text-gray-600 dark:text-gray-400">
            <span>
              {selectedDate === today ? "Today" : "Selected Date"}
            </span>
            <span>{attendance}%</span>
          </div>

          <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${attendance}%` }}
            />
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Attendance based on selected date
          </p>
        </div>

        {/* FEES SUMMARY */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Fees Status
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Collected: ₹12,00,000
          </p>

          <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3 mt-2">
            <div className="bg-yellow-500 h-3 rounded-full w-[80%]" />
          </div>

          <p className="text-sm text-red-500 mt-2">
            Pending: ₹3,00,000
          </p>
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
