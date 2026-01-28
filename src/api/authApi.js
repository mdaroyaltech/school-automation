/* ================= AUTH API (DUMMY) ================= */

// 🔐 EMAIL LOGIN
export const emailLoginAPI = async ({ role, email, password }) => {
  // future: return axios.post("/api/login", ...)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        (role === "Admin" && email === "admin@school.com" && password === "admin123") ||
        (role === "Teacher" && email === "teacher@school.com" && password === "teacher123") ||
        (role === "Parent" && email === "parent@school.com" && password === "parent123")
      ) {
        resolve({ success: true });
      } else {
        reject({ message: "Invalid credentials" });
      }
    }, 800);
  });
};

// 📲 SEND OTP
export const sendOtpAPI = async (mobile) => {
  // future: return axios.post("/api/send-otp", { mobile })
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("📩 OTP sent to", mobile, "(Dummy OTP: 123456)");
      resolve({ success: true });
    }, 600);
  });
};

// ✅ VERIFY OTP
export const verifyOtpAPI = async ({ mobile, otp }) => {
  // future: return axios.post("/api/verify-otp", { mobile, otp })
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (otp === "123456") {
        resolve({ success: true });
      } else {
        reject({ message: "Invalid OTP" });
      }
    }, 600);
  });
};
