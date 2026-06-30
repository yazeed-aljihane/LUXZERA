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
      <div className="w-full max-w-[440px] bg-white rounded-[24px] border border-[#E7E3DD] shadow-xl p-8 sm:p-10 text-center flex flex-col gap-6">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center">
          <div onClick={() => navigate("/")} className="cursor-pointer flex items-center gap-1 font-serif text-[24px] tracking-tight font-extrabold text-[#0D1B2A] select-none">
            <span>Lux</span>
            <span className="text-[#FF6A00]">Zera</span>
          </div>
          <h2 className="text-[26px] font-black text-[#0D1B2A] font-serif mt-5 tracking-tight">Complete Signup</h2>
          <p className="text-[12.5px] text-[#515154] font-medium leading-relaxed mt-2 max-w-[280px]">
            Please choose a username and password to complete your Google registration for <strong className="text-[#0D1B2A]">{email}</strong>.
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-extrabold text-[#0D1B2A] uppercase tracking-wider">Choose Username</label>
            <input
              required
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full h-12 bg-[#FAF9F7] border border-[#E2DFD8] focus:border-[#0D1B2A] focus:bg-white rounded-xl px-4 text-[13px] font-semibold text-[#0D1B2A] outline-none transition-colors placeholder-[#86868B]"
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
              className="w-full h-12 bg-[#FAF9F7] border border-[#E2DFD8] focus:border-[#0D1B2A] focus:bg-white rounded-xl px-4 text-[13px] font-semibold text-[#0D1B2A] outline-none transition-colors placeholder-[#86868B]"
            />
          </div>

          <button
            type="submit"
            disabled={loading || successMsg.includes("Redirecting")}
            className="w-full h-12 bg-[#0D1B2A] hover:bg-[#FF6A00] disabled:bg-[#0D1B2A]/40 text-white rounded-xl text-[13px] font-extrabold uppercase tracking-widest transition-all cursor-pointer border-none flex items-center justify-center mt-2 shadow-sm"
          >
            {loading ? "Completing..." : "Complete Setup"}
          </button>
        </form>

        <div className="text-[12.5px] font-semibold text-[#515154] mt-2 border-t border-[#E7E3DD]/40 pt-4">
          <p>
            Already have an account?{" "}
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
