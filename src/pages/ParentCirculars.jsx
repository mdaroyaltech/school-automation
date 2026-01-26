import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";

const ParentCirculars = ({ user, setUser }) => {
  const circulars = [
    {
      text: "PTM on Friday at 10 AM",
      date: "Today",
      type: "Important",
    },
    {
      text: "Holiday on 26th January",
      date: "2 days ago",
      type: "Holiday",
    },
    {
      text: "Annual Day Practice Schedule",
      date: "5 days ago",
      type: "Event",
    },
  ];

  return (
    <DashboardLayout user={user} setUser={setUser}>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          School Circulars
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Important updates from school administration
        </p>
      </div>

      {/* CIRCULAR LIST */}
      <div className="space-y-5">
        {circulars.map((c, i) => (
          <div
            key={i}
            className="
              bg-white dark:bg-slate-800
              p-6 rounded-2xl shadow
              flex gap-5 items-start
              hover:shadow-lg transition
            "
          >
            {/* ICON */}
            <div
              className="
                h-12 w-12 rounded-full
                bg-blue-100 dark:bg-blue-900
                flex items-center justify-center
                text-2xl
              "
            >
              📢
            </div>

            {/* CONTENT */}
            <div className="flex-1">
              <p className="text-gray-800 dark:text-gray-200 font-semibold text-lg">
                {c.text}
              </p>

              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                <span>📅 {c.date}</span>
                <span>🏫 School Administration</span>
              </div>
            </div>

            {/* TAG */}
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full
                ${
                  c.type === "Important"
                    ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                    : c.type === "Holiday"
                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                }`}
            >
              {c.type}
            </span>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default ParentCirculars;
