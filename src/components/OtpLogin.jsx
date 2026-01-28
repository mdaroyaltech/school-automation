import { useEffect, useState } from "react";
import { sendOtpAPI, verifyOtpAPI } from "../api/authApi";

const RESEND_TIME = 60;

const OtpLogin = ({ onSuccess }) => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [timer, setTimer] = useState(RESEND_TIME);

  /* ⏱️ TIMER */
  useEffect(() => {
    if (!sent || timer === 0) return;

    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [sent, timer]);

  /* 📲 SEND OTP */
  const sendOtp = async () => {
    if (mobile.length !== 10) {
      setError("Enter valid mobile number");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await sendOtpAPI(mobile);
      setSent(true);
      setTimer(RESEND_TIME);
    } catch (err) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  /* 🔁 RESEND OTP */
  const resendOtp = async () => {
    if (timer > 0) return;
    await sendOtp();
  };

  /* ✅ VERIFY OTP */
  const verifyOtp = async () => {
    setLoading(true);
    setError("");

    try {
      await verifyOtpAPI({ mobile, otp });
      onSuccess();
    } catch (err) {
      setError(err.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {!sent ? (
        <>
          <input
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="
              w-full rounded-xl border border-borderDefault
              bg-navbar px-4 py-2.5 text-sm
              text-textPrimary focus:ring-2 focus:ring-accent outline-none
            "
          />

          <button
            onClick={sendOtp}
            disabled={loading}
            className="
              w-full bg-accent hover:bg-accent-hover
              text-white py-2.5 rounded-xl font-semibold
              disabled:opacity-60
            "
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </>
      ) : (
        <>
          <input
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="
              w-full rounded-xl border border-borderDefault
              bg-navbar px-4 py-2.5 text-sm
              text-textPrimary focus:ring-2 focus:ring-accent outline-none
            "
          />

          <button
            onClick={verifyOtp}
            disabled={loading}
            className="
              w-full bg-success hover:opacity-90
              text-white py-2.5 rounded-xl font-semibold
              disabled:opacity-60
            "
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          {/* RESEND */}
          <div className="text-center text-sm text-textSecondary">
            {timer > 0 ? (
              <>Resend OTP in <b>{timer}s</b></>
            ) : (
              <button
                onClick={resendOtp}
                className="text-accent font-semibold"
              >
                Resend OTP
              </button>
            )}
          </div>
        </>
      )}

      {error && (
        <div className="bg-danger/10 text-danger text-sm px-3 py-2 rounded-xl text-center">
          {error}
        </div>
      )}
    </div>
  );
};

export default OtpLogin;
