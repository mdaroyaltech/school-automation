import React, { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import studentsData from "../data/students";

const subjects = ["Maths", "Science", "English", "Social", "Computer"];

const MarksEntry = ({ user, setUser }) => {
  const [className, setClassName] = useState("5");
  const [section, setSection] = useState("A");
  const [subject, setSubject] = useState("Maths");
  const [marks, setMarks] = useState({});
  const [saved, setSaved] = useState(false);

  const key = `${className}-${section}`;
  const students = studentsData[key] || [];

  const handleChange = (name, value) => {
    if (value === "" || (+value >= 0 && +value <= 100)) {
      setMarks({ ...marks, [name]: value });
    }
  };

  const saveMarks = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardLayout user={user} setUser={setUser}>
      {/* HEADER */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Marks Entry
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Enter & manage student marks
          </p>
        </div>

        {saved && (
          <div className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-4 py-2 rounded-xl text-sm font-semibold">
            ✅ Marks saved successfully
          </div>
        )}
      </div>

      {/* FILTERS */}
      <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow flex flex-wrap gap-4 mb-10">
        <select
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="border border-gray-300 dark:border-slate-700 p-3 rounded-xl text-sm
                     bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-200"
        >
          <option value="5">Class 5</option>
          <option value="6">Class 6</option>
        </select>

        <select
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="border border-gray-300 dark:border-slate-700 p-3 rounded-xl text-sm
                     bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-200"
        >
          <option value="A">Section A</option>
          <option value="B">Section B</option>
        </select>

        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border border-gray-300 dark:border-slate-700 p-3 rounded-xl text-sm
                     bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-200"
        >
          {subjects.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* MARKS TABLE */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-slate-700">
            <tr>
              <th className="text-left px-6 py-3 text-gray-700 dark:text-gray-200">
                #
              </th>
              <th className="text-left px-6 py-3 text-gray-700 dark:text-gray-200">
                Student Name
              </th>
              <th className="text-left px-6 py-3 text-gray-700 dark:text-gray-200">
                Marks (0–100)
              </th>
              <th className="text-left px-6 py-3 text-gray-700 dark:text-gray-200">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {students.map((name, index) => {
              const value = marks[name] || "";
              const pass = value !== "" && value >= 35;

              return (
                <tr
                  key={name}
                  className="border-t dark:border-slate-700
                             hover:bg-gray-50 dark:hover:bg-slate-700 transition"
                >
                  <td className="px-6 py-3 text-gray-700 dark:text-gray-200">
                    {index + 1}
                  </td>

                  <td className="px-6 py-3 font-medium text-gray-800 dark:text-gray-100">
                    {name}
                  </td>

                  <td className="px-6 py-3">
                    <input
                      type="number"
                      value={value}
                      onChange={(e) =>
                        handleChange(name, e.target.value)
                      }
                      placeholder="--"
                      className="w-24 border border-gray-300 dark:border-slate-700
                                 rounded-lg p-2 text-sm
                                 bg-white dark:bg-slate-900
                                 text-gray-800 dark:text-gray-100
                                 placeholder-gray-400 dark:placeholder-gray-500"
                    />
                  </td>

                  <td className="px-6 py-3">
                    {value === "" ? (
                      <span className="text-gray-400 dark:text-gray-500 text-xs">
                        Not Entered
                      </span>
                    ) : pass ? (
                      <span className="text-green-600 dark:text-green-400 font-semibold text-xs">
                        Pass
                      </span>
                    ) : (
                      <span className="text-red-600 dark:text-red-400 font-semibold text-xs">
                        Fail
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* SAVE BUTTON */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={saveMarks}
          className="bg-blue-600 hover:bg-blue-700 text-white
                     px-6 py-3 rounded-xl font-semibold shadow"
        >
          💾 Save Marks
        </button>
      </div>
    </DashboardLayout>
  );
};

export default MarksEntry;
