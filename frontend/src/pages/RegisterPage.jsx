// src/pages/RegisterPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/auth";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !firstName || !lastName || !email || !password) return;

    setLoading(true);
    setErrorMsg("");
    try {
      await register(username, firstName, lastName, email, password);
      // Success: Navigate to Verify OTP Page with email prefilled in search params
      navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Registration failed. Please check your credentials.");
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
          <h2 className="text-[26px] font-black text-[#0D1B2A] font-serif mt-5 tracking-tight">Create Account</h2>
          <p className="text-[12.5px] text-[#515154] font-medium leading-relaxed mt-1.5">
            Join LuxZera Designer Studio to launch your collections worldwide.
          </p>
        </div>

        {/* Error notification */}
        {errorMsg && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-left">
            <p className="text-[11.5px] text-red-600 font-bold leading-normal">{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-extrabold text-[#0D1B2A] uppercase tracking-wider">First Name</label>
              <input
                required
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="e.g. John"
                className="w-full h-12 bg-[#FAF9F7] border border-[#E2DFD8] focus:border-[#0D1B2A] focus:bg-white rounded-xl px-4 text-[13px] font-semibold text-[#0D1B2A] outline-none transition-colors placeholder-[#86868B]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-extrabold text-[#0D1B2A] uppercase tracking-wider">Last Name</label>
              <input
                required
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="e.g. Doe"
                className="w-full h-12 bg-[#FAF9F7] border border-[#E2DFD8] focus:border-[#0D1B2A] focus:bg-white rounded-xl px-4 text-[13px] font-semibold text-[#0D1B2A] outline-none transition-colors placeholder-[#86868B]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-extrabold text-[#0D1B2A] uppercase tracking-wider">Username</label>
            <input
              required
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a unique username"
              className="w-full h-12 bg-[#FAF9F7] border border-[#E2DFD8] focus:border-[#0D1B2A] focus:bg-white rounded-xl px-4 text-[13px] font-semibold text-[#0D1B2A] outline-none transition-colors placeholder-[#86868B]"
            />
          </div>

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

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-extrabold text-[#0D1B2A] uppercase tracking-wider">Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a secure password"
              className="w-full h-12 bg-[#FAF9F7] border border-[#E2DFD8] focus:border-[#0D1B2A] focus:bg-white rounded-xl px-4 text-[13px] font-semibold text-[#0D1B2A] outline-none transition-colors placeholder-[#86868B]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-[#0D1B2A] hover:bg-[#FF6A00] disabled:bg-[#0D1B2A]/40 text-white rounded-xl text-[13px] font-extrabold uppercase tracking-widest transition-all cursor-pointer border-none flex items-center justify-center mt-2 shadow-sm"
          >
            {loading ? "Registering..." : "Create Account"}
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
