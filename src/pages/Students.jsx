import React, { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import studentsData from "../data/students";

const Students = ({ user, setUser }) => {
  const [className, setClassName] = useState("5");
  const [section, setSection] = useState("A");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("AZ");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const key = `${className}-${section}`;
  let students = studentsData[key] || [];

  /* SEARCH */
  students = students.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  /* SORT */
  students = [...students].sort((a, b) =>
    sort === "AZ" ? a.localeCompare(b) : b.localeCompare(a)
  );

  /* EXPORT CSV */
  const exportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Name,Class,Section"]
        .concat(students.map((s) => `${s},${className},${section}`))
        .join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `students_${className}_${section}.csv`;
    link.click();
  };

  return (
    <DashboardLayout user={user} setUser={setUser}>
      {/* HEADER */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Students
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Student management & records
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={exportCSV}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-semibold"
          >
            ⬇ Export CSV
          </button>

          <div className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold">
            Total: {students.length}
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow flex flex-wrap gap-4 mb-10">
        <select
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="border p-3 rounded-xl text-sm dark:bg-slate-900"
        >
          <option value="5">Class 5</option>
          <option value="6">Class 6</option>
        </select>

        <select
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="border p-3 rounded-xl text-sm dark:bg-slate-900"
        >
          <option value="A">Section A</option>
          <option value="B">Section B</option>
        </select>

        <input
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-3 rounded-xl text-sm flex-1 dark:bg-slate-900"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border p-3 rounded-xl text-sm dark:bg-slate-900"
        >
          <option value="AZ">A → Z</option>
          <option value="ZA">Z → A</option>
        </select>
      </div>

      {/* LIST */}
      <div className="grid gap-5">
        {students.map((name, index) => (
          <div
            key={index}
            onClick={() => setSelectedStudent(name)}
            className="cursor-pointer bg-white dark:bg-slate-800 p-6 rounded-2xl shadow hover:shadow-xl hover:-translate-y-0.5 transition-all flex justify-between"
          >
            <div className="flex items-center gap-5">
              <div className="h-12 w-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold">
                {index + 1}
              </div>

              <div>
                <p className="font-semibold text-lg dark:text-white">
                  {name}
                </p>
                <p className="text-sm text-gray-500">
                  Class {className} · Section {section}
                </p>
              </div>
            </div>

          <span
            className="
              inline-flex items-center gap-2
              px-4 py-1.5 rounded-full
              text-xs font-semibold
              bg-gradient-to-r from-green-100 to-green-50
              text-green-700
              border border-green-200
              dark:from-green-900 dark:to-green-800
              dark:text-green-300 dark:border-green-700
            "
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            Active
          </span>
          </div>
        ))}
      </div>

      {/* STUDENT MODAL */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-2 dark:text-white">
              {selectedStudent}
            </h2>

            <p className="text-sm text-gray-500 mb-4">
              Student Profile (Demo)
            </p>

            <div className="space-y-2 text-sm dark:text-gray-300">
              <p><b>Class:</b> {className}</p>
              <p><b>Section:</b> {section}</p>
              <p><b>Status:</b> Active</p>
              <p><b>Parent Contact:</b> +91 XXXXXXXXXX</p>
            </div>

            <button
              onClick={() => setSelectedStudent(null)}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Students;
