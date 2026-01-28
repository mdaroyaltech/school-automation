import React, { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

const Circular = ({ user, setUser }) => {
  const [circulars, setCirculars] = useState([
    {
      text: "PTM on Friday",
      date: "Today",
    },
    {
      text: "Holiday on 26th Jan",
      date: "2 days ago",
    },
  ]);

  const [text, setText] = useState("");

  const addCircular = () => {
    if (!text) return;

    setCirculars([
      { text, date: "Just now" },
      ...circulars,
    ]);
    setText("");

    alert(
      "📢 Circular published successfully!\n📲 WhatsApp notification sent to parents (Demo)"
    );
  };

  return (
    <DashboardLayout user={user} setUser={setUser}>
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Circular Management
          </h1>
          <p className="text-sm text-textSecondary mt-1">
            Publish announcements for parents & students
          </p>
        </div>

        <div className="mt-4 md:mt-0 bg-indigo-100 dark:bg-indigo-900
          text-indigo-700 dark:text-indigo-300
          px-4 py-2 rounded-lg font-semibold text-sm">
          Total Circulars: {circulars.length}
        </div>
      </div>

      {/* ADD CIRCULAR CARD */}
      <div className="bg-card border border-cardBorder p-6 rounded-2xl shadow mb-10">
        <h2 className="font-semibold text-textPrimary mb-3">
          ➕ New Circular
        </h2>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type circular message here..."
          rows={3}
          className="
            w-full p-3 rounded-xl mb-4 resize-none
            border border-gray-300 dark:border-slate-700
            bg-navbar text-textPrimary
            text-textPrimary
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        />

        <div className="flex justify-end">
          <button
            onClick={addCircular}
            className="
              bg-accent hover:bg-accent-hover
              text-white px-6 py-2 rounded-xl
              font-semibold shadow transition
            "
          >
            Publish Circular
          </button>
        </div>
      </div>

      {/* CIRCULAR LIST */}
      <div className="space-y-4">
        {circulars.map((c, i) => (
          <div
            key={i}
            className="
              bg-card border border-cardBorder
              p-5 rounded-2xl shadow
              flex gap-4
              hover:shadow-lg transition
            "
          >
            {/* ICON */}
            <div className="text-2xl">📢</div>

            {/* CONTENT */}
            <div className="flex-1">
              <p className="text-textPrimary font-medium">
                {c.text}
              </p>
              <p className="text-xs text-textSecondary mt-1">
                Published {c.date}
              </p>
            </div>

            {/* TAG */}
            <span className="h-fit text-xs font-semibold
              bg-green-100 dark:bg-green-900
              text-green-700 dark:text-green-300
              px-3 py-1 rounded-full">
              Sent
            </span>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Circular;
