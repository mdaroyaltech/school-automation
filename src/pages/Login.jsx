import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import RoleCard from "../components/RoleCard";
import LockAnimation from "../components/LockAnimation";
import OtpLogin from "../components/OtpLogin";
import { emailLoginAPI } from "../api/authApi";

/* ================= DEMO USERS ================= */
const DEMO = {
  Admin: { email: "admin@school.com", password: "admin123", redirect: "/admin" },
  Teacher: { email: "teacher@school.com", password: "teacher123", redirect: "/teacher" },
  Parent: { email: "parent@school.com", password: "parent123", redirect: "/parent" },
};

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [role, setRole] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const [remember, setRemember] = useState(false);
  const [otpMode, setOtpMode] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [logo, setLogo] = useState(null);

  /* ================= INIT ================= */
  useEffect(() => {
    const savedLogo = localStorage.getItem("school-logo");
    if (savedLogo) setLogo(savedLogo);

    const remembered = JSON.parse(localStorage.getItem("remember-login"));
    if (remembered) {
      setRole(remembered.role);
      setEmail(remembered.email);
      setPassword(remembered.password);
      setRemember(true);
    } else {
      autoFill("Admin");
    }
  }, []);

  /* ================= HELPERS ================= */
  const autoFill = (r) => {
    setEmail(DEMO[r].email);
    setPassword(DEMO[r].password);
    setError("");
  };

  const loginSuccess = () => {
    setSuccess(true);

    remember
      ? localStorage.setItem("remember-login", JSON.stringify({ role, email, password }))
      : localStorage.removeItem("remember-login");

    setTimeout(() => {
      setUser({ role, email });
      navigate(DEMO[role].redirect);
    }, 900);
  };

  const handleEmailLogin = async () => {
    setError("");
    try {
      await emailLoginAPI({ role, email, password });
      loginSuccess();
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen flex items-center justify-center bg-page px-4">
      <div
        className="
          w-full max-w-xl
          bg-card border border-cardBorder
          rounded-3xl shadow-card
          p-8 md:p-10
        "
      >
        {/* LOGO */}
        {logo && (
          <img
            src={logo}
            alt="School Logo"
            className="h-14 mx-auto mb-3 object-contain"
          />
        )}

        {/* TITLE */}
        <h1 className="text-3xl font-extrabold text-textPrimary text-center">
          School<span className="text-accent">LMS</span>
        </h1>
        <p className="text-sm text-textSecondary text-center mt-1 mb-8">
          Secure access to your school dashboard
        </p>

        {/* ROLE SECTION */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-textMuted uppercase mb-2 text-center">
            Select Login Role
          </p>
          <div className="grid grid-cols-3 gap-4">
            {["Admin", "Teacher", "Parent"].map((r) => (
              <RoleCard
                key={r}
                role={r}
                icon={
                  r === "Admin"
                    ? "🏫"
                    : r === "Teacher"
                    ? "👨‍🏫"
                    : "👨‍👩‍👦"
                }
                active={role === r}
                onClick={() => {
                  setRole(r);
                  autoFill(r);
                }}
              />
            ))}
          </div>
        </div>

        {/* LOCK / SUCCESS */}
        <LockAnimation role={role} success={success} />

        {/* TOGGLE LOGIN TYPE */}
        <button
          onClick={() => {
            setOtpMode(!otpMode);
            setError("");
          }}
          className="
            text-sm text-accent font-semibold
            mb-6 block mx-auto
            hover:underline
          "
        >
          {otpMode ? "Use Email & Password Login" : "Login using Mobile OTP"}
        </button>

        {/* ================= LOGIN FORMS ================= */}
        {!otpMode ? (
          <>
            {/* EMAIL */}
            <div className="mb-4">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="
                  w-full rounded-xl border border-borderDefault
                  bg-navbar px-4 py-3 text-sm
                  text-textPrimary
                  focus:ring-2 focus:ring-accent outline-none
                "
              />
            </div>

            {/* PASSWORD */}
            <div className="relative mb-4">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPwd ? "text" : "password"}
                placeholder="Password"
                className="
                  w-full rounded-xl border border-borderDefault
                  bg-navbar px-4 py-3 text-sm pr-10
                  text-textPrimary
                  focus:ring-2 focus:ring-accent outline-none
                "
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="
                  absolute right-3 top-3
                  text-textMuted hover:text-textPrimary
                "
              >
                {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* REMEMBER */}
            <div className="flex items-center justify-between mb-5">
              <label className="flex items-center gap-2 text-sm text-textSecondary">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="accent-accent"
                />
                Remember me
              </label>
            </div>

            {/* ERROR */}
            {error && (
              <div className="bg-danger/10 text-danger text-sm px-4 py-2 rounded-xl text-center mb-4">
                {error}
              </div>
            )}

            {/* LOGIN BUTTON */}
            <button
              onClick={handleEmailLogin}
              className="
                w-full bg-accent hover:bg-accent-hover
                text-white py-3.5 rounded-xl
                font-semibold text-base
                shadow-card transition
              "
            >
              Sign In to Dashboard
            </button>
          </>
        ) : (
          <OtpLogin onSuccess={loginSuccess} />
        )}
      </div>
    </div>
  );
};

export default Login;
