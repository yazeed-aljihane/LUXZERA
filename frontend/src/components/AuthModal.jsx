// src/components/AuthModal.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Mail, Lock, Eye, EyeOff, User, Hash } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { register as apiRegister, verifyOtp as apiVerifyOtp, resendOtp as apiResendOtp } from "../services/auth";

export default function AuthModal({ isOpen, onClose, initialView = "login" }) {
  const navigate = useNavigate();
  const { login } = useAuth();

  // View state: "register" | "verify_signup" | "login"
  const [view, setView] = useState(initialView);

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // OTP Verification Fields
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (isOpen) {
      setView(initialView);
    }
  }, [isOpen, initialView]);

  const closeAndReset = () => {
    onClose();
    setView(initialView);
  };

  // Clean form state on modal open/close or view change
  useEffect(() => {
    setErrorMsg("");
    setSuccessMsg("");
    setOtp("");
    setShowPassword(false);
    if (!isOpen) {
      setFullName("");
      setEmail("");
      setPassword("");
      setView(initialView);
    }
  }, [isOpen, view, initialView]);

  // Handle OTP countdown timer
  useEffect(() => {
    if (view !== "verify_signup" || !isOpen) return;
    setTimer(60);
    setCanResend(false);
  }, [view, isOpen]);

  useEffect(() => {
    if (view !== "verify_signup" || !isOpen || timer <= 0) {
      if (timer === 0) setCanResend(true);
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, view, isOpen]);

  // LOGIN SUBMIT (Standard Login)
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const profile = await login(email, password);
      closeAndReset();
      if (profile?.role === "DESIGNER" || profile?.isDesigner) {
        navigate("/designer-studio");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Invalid email or password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // EMAIL SIGN UP SUBMIT (Continue)
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !password) return;

    setIsSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    // Split Full Name into First Name and Last Name
    const nameParts = fullName.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    // Generate a unique username based on the email prefix
    const generatedUsername = email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "") + "_" + Math.floor(100 + Math.random() * 900);

    try {
      await apiRegister(generatedUsername, firstName, lastName, email, password);
      setSuccessMsg("Verification code sent! Please check your email.");
      setTimeout(() => {
        setView("verify_signup");
      }, 1000);
    } catch (err) {
      console.error(err);
      const msg = err.message || "Sign up failed. Please try again.";
      if (msg.toLowerCase().includes("exists") || msg.toLowerCase().includes("already")) {
        setErrorMsg("You are already registered! Please log in.");
      } else {
        setErrorMsg(msg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // OTP VERIFICATION SUBMIT (Verifies code and logs user in automatically)
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!email || !otp) return;

    setIsSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      // 1. Verify OTP
      await apiVerifyOtp(email, otp);
      setSuccessMsg("Email verified successfully! Logging you in...");

      // 2. Automatically log the user in using the created credentials
      const profile = await login(email, password);
      
      setTimeout(() => {
        closeAndReset();
        if (profile?.role === "DESIGNER" || profile?.isDesigner) {
          navigate("/designer-studio");
        } else {
          navigate("/");
        }
      }, 1500);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Invalid OTP code. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend || !email) return;

    setIsSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      await apiResendOtp(email);
      setSuccessMsg("A fresh verification code has been sent to your email.");
      setTimer(60);
      setCanResend(false);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Failed to resend code.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in select-none">
      
      {/* Click outside backdrop */}
      <div className="absolute inset-0 z-0 cursor-default" onClick={closeAndReset} />

      {/* PORTAL FORM CARD */}
      <div className="relative z-10 w-full max-w-[460px] bg-white rounded-[24px] border border-[#E7E3DD] shadow-2xl p-8 sm:p-10 animate-fade-in-up flex flex-col gap-6 text-center max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button 
          onClick={closeAndReset}
          className="absolute top-6 right-6 text-[#86868B] hover:text-[#0D1B2A] transition-colors duration-150 p-2 rounded-full hover:bg-[#FAF9F7] cursor-pointer border-none flex items-center justify-center"
          aria-label="Close authentication window"
        >
          <X size={18} strokeWidth={2.5} />
        </button>

        {/* Brand Header */}
        <div className="flex flex-col items-center mt-2">
          <button onClick={() => { closeAndReset(); navigate("/"); }} className="cursor-pointer flex items-center justify-center border-none bg-transparent p-0 select-none" aria-label="LuxZera home">
            <img src="/LuxZera.png" alt="LuxZera" className="h-10 w-auto object-contain" />
          </button>
          
          <h2 className="text-[28px] font-black text-[#0D1B2A] font-serif mt-5 tracking-tight leading-tight">
            {view === "register" && "Create Account"}
            {view === "verify_signup" && "Verify Email"}
            {view === "login" && "Welcome Back"}
          </h2>
          
          <p className="text-[12.5px] text-[#515154] font-medium leading-relaxed max-w-[320px] mt-2 mb-1">
            {view === "register" && "Join LuxZera Designer Studio to launch your collections worldwide."}
            {view === "verify_signup" && `Enter the 6-digit OTP code sent to ${email}`}
            {view === "login" && "Sign in to your LuxZera Designer Studio and continue building your brand."}
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

        {/* ── 1. SIGNUP VIEW ── */}
        {view === "register" && (
          <form onSubmit={handleSignUpSubmit} className="flex flex-col gap-4 text-left">
            
            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-extrabold text-[#0D1B2A] uppercase tracking-wider">Full Name</label>
              <div className="w-full relative flex items-center">
                <input
                  required
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full h-12 bg-[#FAF9F7] border border-[#E2DFD8] focus:border-[#0D1B2A] focus:bg-white rounded-xl px-4 pr-11 text-[13px] font-semibold text-[#0D1B2A] outline-none transition-colors placeholder-[#86868B]"
                />
                <span className="absolute right-4 text-[#86868B] pointer-events-none">
                  <User size={16} />
                </span>
              </div>
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-extrabold text-[#0D1B2A] uppercase tracking-wider">Email Address</label>
              <div className="w-full relative flex items-center">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full h-12 bg-[#FAF9F7] border border-[#E2DFD8] focus:border-[#0D1B2A] focus:bg-white rounded-xl px-4 pr-11 text-[13px] font-semibold text-[#0D1B2A] outline-none transition-colors placeholder-[#86868B]"
                />
                <span className="absolute right-4 text-[#86868B] pointer-events-none">
                  <Mail size={16} />
                </span>
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-extrabold text-[#0D1B2A] uppercase tracking-wider">Password</label>
              <div className="w-full relative flex items-center">
                <span className="absolute left-4 text-[#86868B] pointer-events-none">
                  <Lock size={16} />
                </span>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a secure password"
                  className="w-full h-12 bg-[#FAF9F7] border border-[#E2DFD8] focus:border-[#0D1B2A] focus:bg-white rounded-xl pl-11 pr-11 text-[13px] font-semibold text-[#0D1B2A] outline-none transition-colors placeholder-[#86868B]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-[#86868B] hover:text-[#0D1B2A] cursor-pointer bg-transparent border-none p-0 flex items-center justify-center"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-[#0D1B2A] hover:bg-[#FF6A00] disabled:bg-[#0D1B2A]/40 text-white rounded-xl text-[13px] font-extrabold uppercase tracking-widest transition-all cursor-pointer border-none flex items-center justify-center mt-2 shadow-sm"
            >
              {isSubmitting ? "Sending OTP..." : "Continue"}
            </button>

            {/* Switch to Login */}
            <div className="text-[12.5px] font-semibold text-[#515154] mt-4 text-center">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setView("login")}
                className="text-[#FF6A00] hover:underline cursor-pointer font-bold bg-transparent border-none p-0 inline"
              >
                Sign In
              </button>
            </div>
          </form>
        )}

        {/* ── 2. OTP VERIFICATION VIEW ── */}
        {view === "verify_signup" && (
          <form onSubmit={handleOtpSubmit} className="flex flex-col gap-5 text-left">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-extrabold text-[#0D1B2A] uppercase tracking-wider">Verification Code</label>
              <div className="w-full relative flex items-center">
                <span className="absolute left-4 text-[#86868B] pointer-events-none">
                  <Hash size={16} />
                </span>
                <input
                  required
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="e.g. 123456"
                  className="w-full h-12 bg-[#FAF9F7] border border-[#E2DFD8] focus:border-[#0D1B2A] focus:bg-white rounded-xl pl-11 pr-4 text-[16px] font-black tracking-[0.2em] text-[#0D1B2A] outline-none transition-colors placeholder-[#86868B]/40 placeholder:tracking-normal"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || successMsg.includes("verified")}
              className="w-full h-12 bg-[#0D1B2A] hover:bg-[#FF6A00] disabled:bg-[#0D1B2A]/40 text-white rounded-xl text-[13px] font-extrabold uppercase tracking-widest transition-all cursor-pointer border-none flex items-center justify-center mt-2 shadow-sm"
            >
              {isSubmitting ? "Verifying..." : "Verify Code"}
            </button>

            <div className="text-[12.5px] font-semibold text-[#515154] mt-2 text-center flex flex-col gap-2 items-center">
              <p>
                Didn't receive the code?{" "}
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={!canResend || isSubmitting}
                  className={`font-bold pl-1 bg-transparent border-none outline-none cursor-pointer ${
                    canResend ? "text-[#FF6A00] hover:underline" : "text-[#86868B] cursor-not-allowed"
                  }`}
                >
                  {canResend ? "Resend OTP" : `Resend in ${timer}s`}
                </button>
              </p>
            </div>
          </form>
        )}

        {/* ── 3. LOGIN VIEW ── */}
        {view === "login" && (
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4 text-left">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-extrabold text-[#0D1B2A] uppercase tracking-wider">Email Address</label>
              <div className="w-full relative flex items-center">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full h-12 bg-[#FAF9F7] border border-[#E2DFD8] focus:border-[#0D1B2A] focus:bg-white rounded-xl px-4 pr-11 text-[13px] font-semibold text-[#0D1B2A] outline-none transition-colors placeholder-[#86868B]"
                />
                <span className="absolute right-4 text-[#86868B] pointer-events-none">
                  <Mail size={16} />
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 relative">
              <label className="text-[11px] font-extrabold text-[#0D1B2A] uppercase tracking-wider">Password</label>
              <div className="w-full relative flex items-center">
                <span className="absolute left-4 text-[#86868B] pointer-events-none">
                  <Lock size={16} />
                </span>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full h-12 bg-[#FAF9F7] border border-[#E2DFD8] focus:border-[#0D1B2A] focus:bg-white rounded-xl pl-11 pr-11 text-[13px] font-semibold text-[#0D1B2A] outline-none transition-colors placeholder-[#86868B]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-[#86868B] hover:text-[#0D1B2A] cursor-pointer bg-transparent border-none p-0 flex items-center justify-center"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              
              <div className="flex justify-end mt-1">
                <span 
                  onClick={() => { closeAndReset(); navigate("/forgot-password"); }}
                  className="text-[11.5px] font-bold text-[#FF6A00] hover:underline cursor-pointer"
                >
                  Forgot Password?
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-[#0D1B2A] hover:bg-[#FF6A00] disabled:bg-[#0D1B2A]/40 text-white rounded-xl text-[13px] font-extrabold uppercase tracking-widest transition-all cursor-pointer border-none flex items-center justify-center mt-2 shadow-sm"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>

            {/* Switch to Signup */}
            <div className="text-[12.5px] font-semibold text-[#515154] mt-2 text-center select-none">
              <p>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setView("register")}
                  className="text-[#FF6A00] hover:underline cursor-pointer font-bold bg-transparent border-none p-0 inline"
                >
                  Create one
                </button>
              </p>
            </div>
          </form>
        )}

        {/* Global Footer */}
        <div className="text-[10.5px] text-[#86868B] leading-relaxed max-w-[280px] mx-auto border-t border-[#E7E3DD]/40 pt-4 font-medium select-none">
          By continuing, you agree to LuxZera's{" "}
          <span className="text-[#FF6A00] cursor-pointer hover:underline font-semibold">Terms of Service</span> and{" "}
          <span className="text-[#FF6A00] cursor-pointer hover:underline font-semibold">Privacy Policy</span>.
        </div>

      </div>
    </div>
  );
}
