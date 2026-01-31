import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  Bell,
  Calendar,
  GraduationCap,
  IndianRupee,
  Bus,
  Home,
  FileText,
  AlertTriangle,
} from "lucide-react";

const ParentCirculars = ({ user, setUser }) => {
  const circulars = [
    {
      text: "PTM on Friday at 10 AM",
      date: "2026-02-05",
      sent: "Today",
      type: "PTM",
      priority: "Important",
    },
    {
      text: "Holiday on 26th January",
      date: "2026-01-26",
      sent: "2 days ago",
      type: "Holiday",
      priority: "Normal",
    },
    {
      text: "Annual Day Practice Schedule",
      date: "2026-02-10",
      sent: "5 days ago",
      type: "Event",
      priority: "Normal",
    },
  ];

  const iconByType = {
    General: Bell,
    Holiday: Calendar,
    Event: Calendar,
    PTM: GraduationCap,
    Fees: IndianRupee,
    Transport: Bus,
    Hostel: Home,
  };

  return (
    <DashboardLayout user={user} setUser={setUser}>
      {/* ================= HEADER ================= */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-textPrimary">
          School Circulars
        </h1>
        <p className="text-sm text-textSecondary mt-1">
          Official announcements & important updates from school
        </p>
      </div>

      {/* ================= CIRCULAR LIST ================= */}
      <div className="space-y-6">
        {circulars.map((c, i) => {
          const Icon = iconByType[c.type] || Bell;

          return (
            <div
              key={i}
              className="
                relative
                bg-card border border-cardBorder
                p-6 rounded-2xl shadow
                hover:shadow-lg transition
              "
            >
              {/* LEFT STRIP FOR IMPORTANT */}
              {c.priority === "Important" && (
                <span className="absolute left-0 top-4 bottom-4 w-1 bg-danger rounded-full" />
              )}

              <div className="flex gap-5 items-start">
                {/* ICON */}
                <div
                  className="
                    h-12 w-12 rounded-xl
                    flex items-center justify-center
                    bg-navbar border border-borderDefault
                  "
                >
                  <Icon size={22} className="text-textPrimary" />
                </div>

                {/* CONTENT */}
                <div className="flex-1">
                  <p className="text-textPrimary font-semibold text-lg leading-snug">
                    {c.text}
                  </p>

                  <div className="mt-3 space-y-1 text-sm text-textSecondary">
                    <p className="flex items-center gap-2">
                      <Calendar size={14} />
                      Event Date: <b>{c.date}</b>
                    </p>

                    <p className="flex items-center gap-2">
                      <Bell size={14} />
                      Sent: {c.sent}
                    </p>

                    <p className="flex items-center gap-2">
                      <FileText size={14} />
                      Type: {c.type}
                    </p>
                  </div>
                </div>

                {/* PRIORITY BADGE */}
                <span
                  className={`
                    h-fit text-xs font-semibold px-3 py-1 rounded-full
                    ${
                      c.priority === "Important"
                        ? "bg-danger/10 text-danger"
                        : "bg-success/10 text-success"
                    }
                  `}
                >
                  {c.priority}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
};

export default ParentCirculars;
