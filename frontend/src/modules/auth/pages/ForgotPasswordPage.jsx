
// src/auth/ForgotPasswordPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword, resetPassword } from "@/modules/auth/services/authService";
import { formatErrorMessage } from "@/shared/utils/errorUtils";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
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
      await forgotPassword(email.trim().toLowerCase());
      setSuccessMsg("Verification code sent! Please check your email inbox.");
      setTimeout(() => setStep(2), 1000);
    } catch (err) {
      setErrorMsg(formatErrorMessage(err, "Email address not found. Please try again."));
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
      await resetPassword(email.trim().toLowerCase(), otp, newPassword);
      setSuccessMsg("Password reset successfully! Redirecting you to login page...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setErrorMsg(formatErrorMessage(err, "Failed to reset password. Please check your verification code."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] flex items-center justify-center p-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="auth-surface w-full max-w-[440px] rounded-2xl p-8 sm:p-10 text-center flex flex-col gap-6 bg-white border border-[#ECECEC] shadow-sm">
        <div className="auth-content flex flex-col gap-6">

          <div className="flex flex-col items-center">
            <button onClick={() => navigate("/login")} className="cursor-pointer flex items-center justify-center border-none bg-transparent p-0 select-none" aria-label="LuxZera home">
              <img src="/logo.png" alt="Zera Symbol" className="h-10 w-auto object-contain" />
            </button>
            <h2 className="text-[28px] font-bold text-[#18181B] mt-5 tracking-tight">Reset Password</h2>
            <p className="text-[12.5px] text-[#515154] font-medium leading-relaxed mt-2 max-w-[280px]">
              {step === 1
                ? "Enter your email address and we'll send you an OTP to verify identity."
                : "Enter the OTP verification code and choose a new secure password."}
            </p>
          </div>

          {errorMsg && (
            <div className="auth-alert p-3.5 bg-red-50 border border-red-200 rounded-xl text-left">
              <p className="text-[11.5px] text-red-600 font-bold leading-normal">{errorMsg}</p>
            </div>
          )}
          {successMsg && (
            <div className="auth-alert p-3.5 bg-green-50 border border-green-200 rounded-xl text-left">
              <p className="text-[11.5px] text-green-600 font-bold leading-normal">{successMsg}</p>
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleRequestReset} className="auth-view flex flex-col gap-5 text-left">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-extrabold text-[#0D1B2A] uppercase tracking-wider">Email Address</label>
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" className="auth-input px-4" />
              </div>
              <button type="submit" disabled={loading} className="auth-cta w-full border-none flex items-center justify-center mt-2">
                {loading ? "Sending..." : "Send Verification Code"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="auth-view flex flex-col gap-4 text-left">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-extrabold text-[#0D1B2A] uppercase tracking-wider">Verification Code (OTP)</label>
                <input
                  required
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="e.g. 123456"
                  className="auth-input px-4 text-[14px] font-black tracking-widest text-center placeholder:tracking-normal"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-extrabold text-[#0D1B2A] uppercase tracking-wider">New Password</label>
                <input required type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new secure password" className="auth-input px-4" />
              </div>
              <button type="submit" disabled={loading || successMsg.includes("Redirecting")} className="auth-cta w-full border-none flex items-center justify-center mt-2">
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}

          <div className="text-[12.5px] font-semibold text-[#515154] mt-2 border-t border-[#E7E3DD]/40 pt-4">
            <p>
              Remember your password?{" "}
              <span onClick={() => navigate("/login")} className="text-[#FF6A00] hover:underline cursor-pointer font-bold pl-1">
                Sign In
              </span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
