import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const [role, setRole] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (role === "Admin" && email === "admin@school.com" && password === "admin123") {
      setUser({ role: "Admin", email });
      navigate("/admin");
    } 
    else if (role === "Teacher" && email === "teacher@school.com" && password === "teacher123") {
      setUser({ role: "Teacher", email });
      navigate("/attendance");
    } 
    else if (role === "Parent" && email === "parent@school.com" && password === "parent123") {
      setUser({ role: "Parent", email });
      navigate("/parent");
    } 
    else {
      setError("Invalid login credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-700">
          School Management System
        </h1>
        <p className="text-center text-gray-500 text-sm mt-1">
          Demo Login
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-gray-600">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg"
            >
              <option>Admin</option>
              <option>Teacher</option>
              <option>Parent</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg"
              placeholder="admin@school.com"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg"
              placeholder="admin123"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center mt-6">
          Demo Credentials Available
        </p>
      </div>
    </div>
  );
};

export default Login;
