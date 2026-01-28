import React, { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

const students = [
  {
    id: 1,
    name: "Ayaan Khan",
    class: "5-A",
    subjects: [
      { name: "Math", marks: 85 },
      { name: "Science", marks: 78 },
      { name: "English", marks: 88 },
    ],
  },
  {
    id: 2,
    name: "Rahul Sharma",
    class: "6-A",
    subjects: [
      { name: "Math", marks: 32 },
      { name: "Science", marks: 40 },
      { name: "English", marks: 35 },
    ],
  },
];

const Reports = ({ user, setUser }) => {
  const [selectedId, setSelectedId] = useState(students[0].id);
  const student = students.find((s) => s.id === selectedId);

  const total = student.subjects.reduce((a, b) => a + b.marks, 0);
  const percentage = Math.round(total / student.subjects.length);
  const pass = percentage >= 40;

  return (
    <DashboardLayout user={user} setUser={setUser}>
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Report Card
          </h1>
          <p className="text-sm text-textSecondary mt-1">
            Academic performance overview
          </p>
        </div>

        {/* STUDENT SELECT DROPDOWN */}
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(Number(e.target.value))}
          className="
            mt-4 md:mt-0
            border rounded-lg px-4 py-2
            bg-card border border-cardBorder
            text-textPrimary
            border-gray-300 dark:border-slate-700
          "
        >
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} ({s.class})
            </option>
          ))}
        </select>
      </div>

      {/* RESULT BADGE */}
      <div
        className={`mb-8 inline-block px-6 py-2 rounded-full font-semibold shadow
          ${
            pass
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
      >
        {pass ? "PASS" : "FAIL"} · {percentage}%
      </div>

      {/* STUDENT INFO */}
      <div className="bg-card border border-cardBorder p-6 rounded-2xl shadow mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <p className="text-sm text-textSecondary">
            Student Name
          </p>
          <p className="text-lg font-semibold text-textPrimary">
            {student.name}
          </p>
        </div>

        <div>
          <p className="text-sm text-textSecondary">
            Class
          </p>
          <p className="text-lg font-semibold text-textPrimary">
            {student.class}
          </p>
        </div>

        <div>
          <p className="text-sm text-textSecondary">
            Overall Result
          </p>
          <p
            className={`text-lg font-bold
              ${
                pass
                  ? "text-success"
                  : "text-danger"
              }`}
          >
            {pass ? "Pass" : "Fail"}
          </p>
        </div>
      </div>

      {/* SUBJECT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {student.subjects.map((s, i) => {
          const grade =
            s.marks >= 85
              ? "A"
              : s.marks >= 70
              ? "B+"
              : s.marks >= 40
              ? "C"
              : "F";

          return (
            <div
              key={i}
              className="bg-card border border-cardBorder p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <p className="text-sm text-textSecondary">
                Subject
              </p>
              <h3 className="text-lg font-semibold text-textPrimary">
                {s.name}
              </h3>

              <div className="mt-4 flex items-end justify-between">
                <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                  {s.marks}
                </p>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold
                    ${
                      grade === "A"
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                        : grade === "F"
                        ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                    }`}
                >
                  Grade {grade}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* FINAL RESULT PANEL */}
      <div
        className={`p-6 rounded-2xl shadow text-center font-semibold
          ${
            pass
              ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
              : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
          }`}
      >
        🎓 Final Result: {pass ? "PASS" : "FAIL"} · Percentage: {percentage}%
      </div>
    </DashboardLayout>
  );
};

export default Reports;
