import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Attendance from "./pages/Attendance";
import ParentDashboard from "./pages/ParentDashboard";
import Fees from "./pages/Fees";
import Reports from "./pages/Reports";
import Circular from "./pages/Circular";
import ProtectedRoute from "./components/ProtectedRoute";
import ParentCirculars from "./pages/ParentCirculars";
import Students from "./pages/Students";
import MarksEntry from "./pages/MarksEntry";
import Settings from "./pages/Settings";

function App() {
  const [user, setUser] = useState(null); // { role, email }

  return (
    <Router>
      <Routes>
        {/* ================= PUBLIC ROUTE ================= */}
        <Route path="/" element={<Login setUser={setUser} />} />

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user} allowedRoles={["Admin"]}>
              <AdminDashboard user={user} setUser={setUser} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/fees"
          element={
            <ProtectedRoute user={user} allowedRoles={["Admin"]}>
              <Fees user={user} setUser={setUser} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/circular"
          element={
            <ProtectedRoute user={user} allowedRoles={["Admin"]}>
              <Circular user={user} setUser={setUser} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute user={user}>
              <Settings user={user} setUser={setUser} />
            </ProtectedRoute>
          }
        />


        {/* ================= TEACHER ROUTES ================= */}
        <Route
          path="/attendance"
          element={
            <ProtectedRoute user={user} allowedRoles={["Admin", "Teacher"]}>
              <Attendance user={user} setUser={setUser} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/marks-entry"
          element={
            <ProtectedRoute user={user}>
              <MarksEntry user={user} setUser={setUser} />
            </ProtectedRoute>
          }
        />

        {/* ================= PARENT ROUTES ================= */}
        <Route
          path="/parent"
          element={
            <ProtectedRoute user={user} allowedRoles={["Parent"]}>
              <ParentDashboard user={user} setUser={setUser} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute user={user} allowedRoles={["Admin", "Parent"]}>
              <Reports user={user} setUser={setUser} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/parent-circulars"
          element={
            <ProtectedRoute user={user} allowedRoles={["Parent"]}>
              <ParentCirculars user={user} setUser={setUser} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/students"
          element={
            <ProtectedRoute user={user}>
              <Students user={user} setUser={setUser} />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
