import React, { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  Bell,
  Calendar,
  GraduationCap,
  IndianRupee,
  Bus,
  Home,
  AlertTriangle,
  FileText,
  Paperclip
} from "lucide-react";

const Circular = ({ user, setUser }) => {
  const [circulars, setCirculars] = useState([
    {
      text: "PTM for Class 5",
      type: "PTM",
      target: "Class 5",
      eventDate: "2026-02-05",
      validTill: "2026-02-06",
      sentDate: "Today",
      priority: "Important",
      attachment: null,
    },
    {
      text: "Holiday on 26th January",
      type: "Holiday",
      target: "All",
      eventDate: "2026-01-26",
      validTill: "2026-01-27",
      sentDate: "2 days ago",
      priority: "Normal",
      attachment: null,
    },
  ]);

  // FORM STATE
  const [text, setText] = useState("");
  const [type, setType] = useState("General");
  const [target, setTarget] = useState("All");
  const [eventDate, setEventDate] = useState("");
  const [validTill, setValidTill] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [attachment, setAttachment] = useState(null);

  const addCircular = () => {
    if (!text || !eventDate || !validTill) return;

    const newCircular = {
      text,
      type,
      target,
      eventDate,
      validTill,
      sentDate: "Just now",
      priority,
      attachment,
    };

    setCirculars((prev) =>
      [newCircular, ...prev].sort((a, b) => {
        if (a.priority !== b.priority) {
          return a.priority === "Important" ? -1 : 1;
        }
        return new Date(b.eventDate) - new Date(a.eventDate);
      })
    );

    // RESET
    setText("");
    setType("General");
    setTarget("All");
    setEventDate("");
    setValidTill("");
    setPriority("Normal");
    setAttachment(null);

    alert(
      "📢 Circular published successfully!\n📲 WhatsApp notification sent (Demo)"
    );
  };

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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary">
            Circular Management
          </h1>
          <p className="text-sm text-textSecondary mt-1">
            Publish announcements for parents & students
          </p>
        </div>

        <div className="bg-card border border-cardBorder px-4 py-2 rounded-lg shadow text-sm font-semibold">
          Total Circulars: {circulars.length}
        </div>
      </div>

      {/* ================= ADD CIRCULAR ================= */}
      <div className="bg-card border border-cardBorder p-6 rounded-2xl shadow mb-10">
        <h2 className="font-semibold text-textPrimary mb-4">
          ➕ New Circular
        </h2>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type circular message here..."
          rows={3}
          className="
            w-full p-3 rounded-xl mb-4 resize-none
            border border-borderDefault
            bg-navbar text-textPrimary
            focus:outline-none focus:ring-2 focus:ring-accent
          "
        />

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          {/* TYPE */}
          <Field label="Type">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="input"
            >
              {["General","Holiday","Event","PTM","Fees","Transport","Hostel"].map(t => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>

          {/* TARGET */}
          <Field label="Target">
            <select
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="input"
            >
              <option>All</option>
              <option>Class 5</option>
              <option>Class 6</option>
              <option>Section A</option>
              <option>Section B</option>
              <option>Hostel</option>
            </select>
          </Field>

          {/* PRIORITY */}
          <Field label="Priority">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="input"
            >
              <option>Normal</option>
              <option>Important</option>
            </select>
          </Field>

          {/* EVENT DATE */}
          <Field label="Event / Meeting Date">
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="input"
            />
          </Field>

          {/* VALID TILL */}
          <Field label="Valid Till">
            <input
              type="date"
              value={validTill}
              onChange={(e) => setValidTill(e.target.value)}
              className="input"
            />
          </Field>

          {/* ATTACHMENT */}
          <Field label="Attachment (optional)">
            <input
              type="file"
              onChange={(e) => setAttachment(e.target.files?.[0] || null)}
              className="input"
            />
          </Field>
        </div>

        <div className="flex justify-end">
          <button
            onClick={addCircular}
            className="bg-accent hover:bg-accent-hover
              text-white px-6 py-2 rounded-xl
              font-semibold shadow"
          >
            Publish Circular
          </button>
        </div>
      </div>

      {/* ================= CIRCULAR LIST ================= */}
      <div className="space-y-4">
        {circulars.map((c, i) => (
          <div
            key={i}
            className="bg-card border border-cardBorder
              p-5 rounded-2xl shadow
              flex gap-4 items-start"
          >
            {/* ICON */}
            <div className="p-2 rounded-lg bg-navbar border border-borderDefault">
              {(() => {
                const Icon = iconByType[c.type] || Bell;
                return <Icon size={20} className="text-textPrimary" />;
              })()}
            </div>

            {/* CONTENT */}
            <div className="flex-1">
              <p className="text-textPrimary font-semibold">
                {c.text}
              </p>

              <div className="text-xs text-textSecondary mt-1 space-y-1">
                <p className="flex items-center gap-2">
                <FileText size={14} /> Type: <b>{c.type}</b>
              </p>
              <p className="flex items-center gap-2">
                <AlertTriangle size={14} /> Target: <b>{c.target}</b>
              </p>
              <p className="flex items-center gap-2">
                <Calendar size={14} /> Event Date: <b>{c.eventDate}</b>
              </p>
              <p className="flex items-center gap-2">
                <Calendar size={14} /> Valid Till: <b>{c.validTill}</b>
              </p>
              <p className="flex items-center gap-2">
                <Bell size={14} /> Sent: {c.sentDate}
              </p>
              {c.attachment && (
                <p className="flex items-center gap-2">
                  <Paperclip size={14} /> Attachment added
                </p>
              )}
              </div>
            </div>

            {/* PRIORITY TAG */}
            <span
              className={`h-fit text-xs font-semibold px-3 py-1 rounded-full
                ${
                  c.priority === "Important"
                    ? "bg-danger/10 text-danger"
                    : "bg-success/10 text-success"
                }`}
            >
              {c.priority}
            </span>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

const Field = ({ label, children }) => (
  <div>
    <label className="text-sm font-semibold text-textSecondary">
      {label}
    </label>
    {React.cloneElement(children, {
      className:
        "mt-1 w-full rounded-xl px-4 py-2 bg-navbar border border-borderDefault text-textPrimary outline-none",
    })}
  </div>
);

export default Circular;
