import React, { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

const CLASSES = ["5-A", "6-A", "7-B"];

const AssignTeachers = ({ user, setUser }) => {
  /* ================= STATE ================= */
  const [teachers, setTeachers] = useState(
    JSON.parse(localStorage.getItem("teachers")) || []
  );

  const [editingId, setEditingId] = useState(null);

  const [teacherForm, setTeacherForm] = useState({
    name: "",
    subject: "",
    mobile: "",
    classes: [],
  });

  const [search, setSearch] = useState("");

  /* ================= HELPERS ================= */
  const saveTeachers = (list) => {
    setTeachers(list);
    localStorage.setItem("teachers", JSON.stringify(list));
  };

  const resetForm = () => {
    setTeacherForm({
      name: "",
      subject: "",
      mobile: "",
      classes: [],
    });
    setEditingId(null);
  };

  const addOrUpdateTeacher = () => {
    if (!teacherForm.name) return;

    const updated = editingId
      ? teachers.map((t) =>
          t.id === editingId ? { ...t, ...teacherForm } : t
        )
      : [...teachers, { ...teacherForm, id: Date.now() }];

    saveTeachers(updated);
    resetForm();
  };

  const editTeacher = (t) => {
    setTeacherForm({
      name: t.name,
      subject: t.subject,
      mobile: t.mobile,
      classes: t.classes || [],
    });
    setEditingId(t.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteTeacher = (id) => {
    saveTeachers(teachers.filter((t) => t.id !== id));
    resetForm();
  };

  const toggleClass = (cls) => {
    setTeacherForm((prev) => ({
      ...prev,
      classes: prev.classes.includes(cls)
        ? prev.classes.filter((c) => c !== cls)
        : [...prev.classes, cls],
    }));
  };

  const filteredTeachers = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout user={user} setUser={setUser}>
      {/* ================= HEADER ================= */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[color:var(--text-primary)]">
          Assign Teachers
        </h1>
        <p className="text-sm text-[color:var(--text-secondary)]">
          Add, edit teachers and assign classes
        </p>
      </div>

      {/* ================= ADD / EDIT ================= */}
      <div
        className="p-6 rounded-2xl shadow mb-10"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-card)",
        }}
      >
        <h3 className="text-xl font-semibold mb-4 text-[color:var(--text-primary)]">
          {editingId ? "✏️ Edit Teacher" : "➕ Add Teacher"}
        </h3>

        {/* Flutter-style Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["name", "subject", "mobile"].map((field) => (
            <input
              key={field}
              placeholder={
                field === "name"
                  ? "Teacher Name"
                  : field === "subject"
                  ? "Subject"
                  : "Mobile"
              }
              value={teacherForm[field]}
              onChange={(e) =>
                setTeacherForm({ ...teacherForm, [field]: e.target.value })
              }
              className="
                w-full px-4 py-3 rounded-2xl
                outline-none transition
                focus:ring-2 focus:ring-[color:var(--accent)]
              "
              style={{
                background: "var(--bg-page)",
                border: "1px solid var(--border-default)",
                color: "var(--text-primary)",
              }}
            />
          ))}
        </div>

        {/* Assign Classes */}
        <div className="mt-5">
          <p className="text-sm font-medium mb-2 text-[color:var(--text-primary)]">
            Assign Classes
          </p>
          <div className="flex flex-wrap gap-3">
            {CLASSES.map((cls) => (
              <button
                key={cls}
                type="button"
                onClick={() => toggleClass(cls)}
                className="px-4 py-2 rounded-xl text-sm font-semibold transition"
                style={{
                  background: teacherForm.classes.includes(cls)
                    ? "var(--success)"
                    : "var(--bg-page)",
                  color: teacherForm.classes.includes(cls)
                    ? "#fff"
                    : "var(--text-primary)",
                  border: "1px solid var(--border-default)",
                }}
              >
                {cls}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={addOrUpdateTeacher}
            className="px-6 py-2.5 rounded-xl font-semibold text-white"
            style={{ background: "var(--accent)" }}
          >
            {editingId ? "Update Teacher" : "Add Teacher"}
          </button>

          {editingId && (
            <button
              onClick={resetForm}
              className="px-6 py-2.5 rounded-xl font-semibold"
              style={{
                border: "1px solid var(--border-default)",
                color: "var(--text-primary)",
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="mb-6 max-w-md">
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-card)",
          }}
        >
          <span className="text-[color:var(--text-muted)]">🔍</span>
          <input
            placeholder="Search teacher or subject"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none
                        placeholder:text-[color:var(--text-muted)]"
            style={{ color: "var(--text-primary)" }}
          />
        </div>
      </div>

      {/* ================= LIST ================= */}
      <div
        className="rounded-2xl shadow overflow-hidden"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-card)",
        }}
      >
        <table className="w-full">
          <thead style={{ background: "var(--bg-page)" }}>
            <tr>
              <th className="p-4 text-left text-[color:var(--text-secondary)]">Name</th>
              <th className="p-4 text-left text-[color:var(--text-secondary)]">Subject</th>
              <th className="p-4 text-left text-[color:var(--text-secondary)]">Classes</th>
              <th className="p-4 text-right text-[color:var(--text-secondary)]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeachers.map((t) => (
              <tr key={t.id} className="border-t border-[color:var(--border-default)]">
                <td className="p-4 text-[color:var(--text-primary)] font-semibold">{t.name}</td>
                <td className="p-4 text-[color:var(--text-primary)]">{t.subject}</td>
                <td className="p-4 text-sm text-[color:var(--text-primary)]">
                  {t.classes?.length ? t.classes.join(", ") : "—"}
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => editTeacher(t)}
                    className="px-2 text-[color:var(--text-primary)]"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => deleteTeacher(t.id)}
                    className="px-2 text-[color:var(--text-primary)]"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default AssignTeachers;
