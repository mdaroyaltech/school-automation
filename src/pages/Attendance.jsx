import React, { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import studentsData from "../data/students";

const Attendance = ({ user, setUser }) => {
  const [className, setClassName] = useState("5");
  const [section, setSection] = useState("A");
  const [students, setStudents] = useState([]);

  const key = `attendance-${className}-${section}`;

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(key));
    if (saved) {
      setStudents(saved);
    } else {
      const list =
        studentsData[`${className}-${section}`]?.map((name) => ({
          name,
          present: true,
        })) || [];
      setStudents(list);
    }
  }, [className, section]);

  const toggle = (index) => {
    const updated = [...students];
    updated[index].present = !updated[index].present;
    setStudents(updated);
  };

  const saveAttendance = () => {
    localStorage.setItem(key, JSON.stringify(students));
    alert(
      "✅ Attendance saved successfully!\n📲 WhatsApp alert sent to parents (Demo)"
    );
  };

  // 🔑 SAME SUMMARY LOGIC (UNCHANGED)
  const presentCount = students.filter((s) => s.present).length;
  const total = students.length;
  const percent = total ? Math.round((presentCount / total) * 100) : 0;

  return (
    <DashboardLayout user={user} setUser={setUser}>
      {/* HEADER BAR */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Attendance Management
        </h1>

        {/* SUMMARY BADGE (SAME DATA, NEW STYLE) */}
        <div className="mt-4 lg:mt-0 flex items-center gap-3
          bg-gradient-to-r from-green-500 to-emerald-600
          text-white px-5 py-2 rounded-full shadow">
          <span className="text-sm font-medium">
            Present
          </span>
          <span className="font-bold">
            {presentCount} / {total} ({percent}%)
          </span>
        </div>
      </div>

      {/* FILTER PANEL (NEW DESIGN) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Select Class
          </p>
          <select
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="w-full border rounded-lg p-2
              bg-white dark:bg-slate-900
              text-gray-800 dark:text-gray-200
              border-gray-300 dark:border-slate-700"
          >
            <option>5</option>
            <option>6</option>
          </select>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Section
          </p>
          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="w-full border rounded-lg p-2
              bg-white dark:bg-slate-900
              text-gray-800 dark:text-gray-200
              border-gray-300 dark:border-slate-700"
          >
            <option>A</option>
            <option>B</option>
          </select>
        </div>

        {/* STATUS CARD */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow flex flex-col justify-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Attendance Status
          </p>
          <p
            className={`text-lg font-bold mt-1
              ${
                percent >= 75
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
          >
            {percent >= 75 ? "Good Attendance" : "Needs Attention"}
          </p>
        </div>
      </div>

      {/* STUDENT GRID (COMPLETELY NEW LOOK) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((s, i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-800
              p-5 rounded-2xl shadow
              flex items-center justify-between
              hover:shadow-lg transition"
          >
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-200">
                {s.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Roll No: {i + 1}
              </p>
            </div>

            <button
              onClick={() => toggle(i)}
              className={`px-4 py-1 rounded-full text-sm font-semibold transition
                ${
                  s.present
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
            >
              {s.present ? "Present" : "Absent"}
            </button>
          </div>
        ))}
      </div>

      {/* ACTION BAR */}
      <div className="mt-10 flex justify-end">
        <button
          onClick={saveAttendance}
          className="bg-blue-600 hover:bg-blue-700
            text-white px-8 py-3 rounded-xl
            font-semibold shadow transition"
        >
          Save Attendance
        </button>
      </div>
    </DashboardLayout>
  );
};

export default Attendance;
