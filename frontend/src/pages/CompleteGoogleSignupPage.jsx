// src/pages/CompleteGoogleSignupPage.jsx
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { completeGoogleSignup } from "../services/auth";
import { removeToken } from "../utils/token";

export default function CompleteGoogleSignupPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) return;

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      await completeGoogleSignup(username, password, email);
      removeToken();
      setSuccessMsg("Account setup completed successfully! Redirecting to login portal...");
      setTimeout(() => {
        window.location.href = "/?openLogin=true";
      }, 1500);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Failed to complete Google registration. Please try another username.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#0D1B2A] flex items-center justify-center p-6" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="auth-surface w-full max-w-[440px] rounded-[24px] p-8 sm:p-10 text-center flex flex-col gap-6">
        <div className="auth-content flex flex-col gap-6">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center">
          <button onClick={() => navigate("/")} className="cursor-pointer flex items-center justify-center border-none bg-transparent p-0 select-none" aria-label="LuxZera home">
            <img src="/logo.png" alt="LuxZera" className="h-10 w-auto object-contain" />
          </button>
          <h2 className="text-[26px] font-black text-[#0D1B2A] font-serif mt-5 tracking-tight">Complete Signup</h2>
          <p className="text-[12.5px] text-[#515154] font-medium leading-relaxed mt-2 max-w-[280px]">
            Please choose a username and password to complete your Google registration for <strong className="text-[#0D1B2A]">{email}</strong>.
          </p>
        </div>

        {/* Notifications */}
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

        <form onSubmit={handleSubmit} className="auth-view flex flex-col gap-4 text-left">
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-extrabold text-[#0D1B2A] uppercase tracking-wider">Choose Username</label>
            <input
              required
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="auth-input px-4"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-extrabold text-[#0D1B2A] uppercase tracking-wider">Choose Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Choose a secure password"
              className="auth-input px-4"
            />
          </div>

          <button
            type="submit"
            disabled={loading || successMsg.includes("Redirecting")}
            className="auth-cta w-full border-none flex items-center justify-center mt-2"
          >
            {loading ? "Completing..." : "Complete Setup"}
          </button>
        </form>

        <div className="text-[12.5px] font-semibold text-[#515154] mt-2 border-t border-[#E7E3DD]/40 pt-4">
          <p>
            Already have an account?{" "}
            <span 
              onClick={() => navigate("/?openLogin=true")}
              className="text-[#FF6A00] hover:underline cursor-pointer font-bold pl-1"
            >
              Sign In
            </span>
          </p>
        </div>

        </div>
      </div>
    </div>
  );
}
