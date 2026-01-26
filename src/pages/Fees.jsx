import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";

const Fees = ({ user, setUser }) => {
  const downloadReceipt = () => {
    alert("Receipt downloaded successfully 📄 (Demo)");
  };

  const feesData = [
    {
      name: "Ayaan Khan",
      class: "5-A",
      total: 50000,
      paid: 40000,
    },
    {
      name: "Rahul",
      class: "6-A",
      total: 48000,
      paid: 48000,
    },
  ];

  return (
    <DashboardLayout user={user} setUser={setUser}>
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Fees Management
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Track fee payments and pending dues
          </p>
        </div>

        <div className="mt-4 md:mt-0 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow text-sm text-gray-700 dark:text-gray-300">
          💰 Total Collection: <b>₹88,000</b>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {feesData.map((f, i) => {
          const pending = f.total - f.paid;
          return (
            <div
              key={i}
              className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {f.name}
              </p>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Class {f.class}
              </h3>

              <div className="mt-4 text-sm">
                <p className="text-gray-600 dark:text-gray-400">
                  Total: ₹{f.total.toLocaleString()}
                </p>
                <p className="text-green-600 dark:text-green-400">
                  Paid: ₹{f.paid.toLocaleString()}
                </p>
                <p
                  className={
                    pending > 0
                      ? "text-red-600 dark:text-red-400"
                      : "text-green-600 dark:text-green-400"
                  }
                >
                  Pending: ₹{pending.toLocaleString()}
                </p>
              </div>

              <button
                onClick={downloadReceipt}
                className={`mt-4 w-full py-2 rounded-xl text-sm font-semibold
                  ${
                    pending > 0
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
              >
                Download Receipt
              </button>
            </div>
          );
        })}
      </div>

      {/* DETAILED TABLE */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow">
        <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Fee Details
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-slate-700 text-left">
                <th className="py-2 text-gray-600 dark:text-gray-300">
                  Student
                </th>
                <th className="py-2 text-gray-600 dark:text-gray-300">
                  Class
                </th>
                <th className="py-2 text-gray-600 dark:text-gray-300">
                  Total
                </th>
                <th className="py-2 text-gray-600 dark:text-gray-300">
                  Paid
                </th>
                <th className="py-2 text-gray-600 dark:text-gray-300">
                  Pending
                </th>
                <th className="py-2 text-gray-600 dark:text-gray-300">
                  Receipt
                </th>
              </tr>
            </thead>

            <tbody>
              {feesData.map((f, i) => {
                const pending = f.total - f.paid;
                return (
                  <tr
                    key={i}
                    className="border-b border-gray-200 dark:border-slate-700"
                  >
                    <td className="py-2 text-gray-800 dark:text-gray-200">
                      {f.name}
                    </td>
                    <td className="py-2 text-gray-800 dark:text-gray-200">
                      {f.class}
                    </td>
                    <td className="py-2 text-gray-800 dark:text-gray-200">
                      ₹{f.total.toLocaleString()}
                    </td>
                    <td className="py-2 text-green-600 dark:text-green-400">
                      ₹{f.paid.toLocaleString()}
                    </td>
                    <td
                      className={
                        pending > 0
                          ? "py-2 text-red-600 dark:text-red-400"
                          : "py-2 text-green-600 dark:text-green-400"
                      }
                    >
                      ₹{pending.toLocaleString()}
                    </td>
                    <td className="py-2">
                      <button
                        onClick={downloadReceipt}
                        className="bg-indigo-600 hover:bg-indigo-700
                          text-white px-3 py-1 rounded text-xs"
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Fees;
