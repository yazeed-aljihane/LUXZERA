// src/pages/ForgotPasswordPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword, resetPassword } from "../services/auth";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 = Request, 2 = Reset
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleRequestReset = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      await forgotPassword(email);
      setSuccessMsg("Verification code sent! Please check your email inbox.");
      setTimeout(() => {
        setStep(2);
      }, 1000);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Email address not found. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!otp || !newPassword) return;

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      await resetPassword(email, otp, newPassword);
      setSuccessMsg("Password reset successfully! Redirecting you to login page...");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Failed to reset password. Please check your verification code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#0D1B2A] flex items-center justify-center p-6" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="w-full max-w-[440px] bg-white rounded-[24px] border border-[#E7E3DD] shadow-xl p-8 sm:p-10 text-center flex flex-col gap-6">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center">
          <div onClick={() => navigate("/")} className="cursor-pointer flex items-center gap-1 font-serif text-[24px] tracking-tight font-extrabold text-[#0D1B2A] select-none">
            <span>Lux</span>
            <span className="text-[#FF6A00]">Zera</span>
          </div>
          <h2 className="text-[26px] font-black text-[#0D1B2A] font-serif mt-5 tracking-tight">Reset Password</h2>
          <p className="text-[12.5px] text-[#515154] font-medium leading-relaxed mt-2 max-w-[280px]">
            {step === 1 
              ? "Enter your email address and we'll send you an OTP to verify identity."
              : "Enter the OTP verification code and choose a new secure password."
            }
          </p>
        </div>

        {/* Notifications */}
        {errorMsg && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-left">
            <p className="text-[11.5px] text-red-600 font-bold leading-normal">{errorMsg}</p>
          </div>
        )}
        {successMsg && (
          <div className="p-3.5 bg-green-50 border border-green-200 rounded-xl text-left">
            <p className="text-[11.5px] text-green-600 font-bold leading-normal">{successMsg}</p>
          </div>
        )}

        {step === 1 ? (
          /* STEP 1: REQUEST OTP */
          <form onSubmit={handleRequestReset} className="flex flex-col gap-5 text-left">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-extrabold text-[#0D1B2A] uppercase tracking-wider">Email Address</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full h-12 bg-[#FAF9F7] border border-[#E2DFD8] focus:border-[#0D1B2A] focus:bg-white rounded-xl px-4 text-[13px] font-semibold text-[#0D1B2A] outline-none transition-colors placeholder-[#86868B]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[#0D1B2A] hover:bg-[#FF6A00] disabled:bg-[#0D1B2A]/40 text-white rounded-xl text-[13px] font-extrabold uppercase tracking-widest transition-all cursor-pointer border-none flex items-center justify-center mt-2 shadow-sm"
            >
              {loading ? "Sending..." : "Send Verification Code"}
            </button>
          </form>
        ) : (
          /* STEP 2: RESET PASSWORD */
          <form onSubmit={handleResetPassword} className="flex flex-col gap-4 text-left">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-extrabold text-[#0D1B2A] uppercase tracking-wider">Verification Code (OTP)</label>
              <input
                required
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="e.g. 123456"
                className="w-full h-12 bg-[#FAF9F7] border border-[#E2DFD8] focus:border-[#0D1B2A] focus:bg-white rounded-xl px-4 text-[14px] font-black tracking-widest text-center text-[#0D1B2A] outline-none transition-colors placeholder-[#86868B]/40 placeholder:tracking-normal"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-extrabold text-[#0D1B2A] uppercase tracking-wider">New Password</label>
              <input
                required
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new secure password"
                className="w-full h-12 bg-[#FAF9F7] border border-[#E2DFD8] focus:border-[#0D1B2A] focus:bg-white rounded-xl px-4 text-[13px] font-semibold text-[#0D1B2A] outline-none transition-colors placeholder-[#86868B]"
              />
            </div>

            <button
              type="submit"
              disabled={loading || successMsg.includes("Redirecting")}
              className="w-full h-12 bg-[#0D1B2A] hover:bg-[#FF6A00] disabled:bg-[#0D1B2A]/40 text-white rounded-xl text-[13px] font-extrabold uppercase tracking-widest transition-all cursor-pointer border-none flex items-center justify-center mt-2 shadow-sm"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

        <div className="text-[12.5px] font-semibold text-[#515154] mt-2 border-t border-[#E7E3DD]/40 pt-4">
          <p>
            Remember your password?{" "}
            <span 
              onClick={() => navigate("/")}
              className="text-[#FF6A00] hover:underline cursor-pointer font-bold pl-1"
            >
              Sign In
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}
