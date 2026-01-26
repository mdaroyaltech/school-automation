import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";

const ParentDashboard = ({ user, setUser }) => {
  const data = JSON.parse(localStorage.getItem("attendance-5-A")) || [];
  const presentDays = data.filter((s) => s.present).length;

  const isPresent = presentDays > 0;

  return (
    <DashboardLayout user={user} setUser={setUser}>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Parent Dashboard
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Student overview & daily updates
        </p>
      </div>

      {/* STUDENT PROFILE CARD */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-blue-100 dark:bg-blue-900
            flex items-center justify-center text-2xl">
            👦
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Student Name
            </p>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Ayaan Khan
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Class 5-A
            </p>
          </div>
        </div>

        {/* ATTENDANCE STATUS */}
        <div
          className={`px-6 py-4 rounded-xl text-center font-semibold
            ${
              isPresent
                ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
            }`}
        >
          <p className="text-sm">Attendance Today</p>
          <p className="text-2xl mt-1">
            {isPresent ? "Present ✅" : "Absent ❌"}
          </p>
        </div>
      </div>

      {/* DASHBOARD CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* ATTENDANCE SUMMARY */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Attendance Summary
          </p>
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
            {presentDays}/{data.length || 1}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Days Present
          </p>
        </div>

        {/* FEES STATUS */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Fees Status
          </p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            Paid ✅
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            No pending dues
          </p>
        </div>

        {/* PERFORMANCE */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Academic Performance
          </p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Good ⭐
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Consistent progress
          </p>
        </div>
      </div>

      {/* IMPORTANT NOTICE */}
      <div className="bg-gradient-to-r from-yellow-100 to-orange-100
        dark:from-yellow-900 dark:to-orange-900
        p-6 rounded-2xl shadow">
        <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
          📢 Important Notice
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Parent-Teacher Meeting scheduled on <b>Friday at 10:00 AM</b>.  
          Kindly ensure your availability for your child’s progress discussion.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default ParentDashboard;
