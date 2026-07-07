// src/auth/LoginPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ShieldCheck, Sparkles, Heart, ChevronDown, Mail, Lock, UserRound } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const Hanger = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#37352F]">
    <path d="M12 2a2 2 0 0 1 2 2 2 2 0 0 1-2 2" />
    <path d="M3 15l9-9 9 9" />
    <path d="M3 15h18" />
  </svg>
);

export default function LoginPage() {
  const navigate = useNavigate();
  const { login: contextLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setErrorMsg("");
    try {
      await contextLogin(email, password);
      navigate("/");
    } catch (err) {
      setErrorMsg(err?.response?.data?.message || err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap');
        
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        .font-sans {
          font-family: 'Inter', sans-serif;
        }

        .animate-fade-in {
          opacity: 0;
          animation: fadeInSlide 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fadeInSlide {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="flex min-h-screen w-full bg-[#FAFAF9] font-sans">

        {/* Left Panel - Image & Branding */}
        <div className="hidden lg:flex flex-col justify-between w-1/2 relative bg-[#FAFAF9]">
          {/* Background Image */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/login-illustration.png')" }}
          />

          {/* Top Logo */}
          <div className="relative z-10 p-8 pt-12 pl-12">
            <button onClick={() => navigate("/")} className="bg-transparent border-none p-0 cursor-pointer flex items-center">
              <img src="/LuxZera.png" alt="LuxZera" className="h-10 w-auto object-contain" />
            </button>
          </div>

          {/* Center Text */}
          <div className="relative z-10 px-12 flex-1 flex flex-col justify-center">
            <h1 className="text-[48px] font-normal text-[#37352F] leading-[1.1] mb-6 font-serif">
              Fashion,<br />
              Tailored<br />
              <span className="text-[#FF7518]">Just for you.</span>
            </h1>

            <div className="w-[48px] h-[1px] bg-[#37352F] mb-6" />

            <p className="text-[16px] text-[#37352F] max-w-[300px] leading-relaxed font-medium">
              LuxZera learns your style and curates pieces you'll love, every time you visit.
            </p>
          </div>

          {/* Bottom Features */}
          <div className="relative z-10 px-12 pb-12 flex gap-8">
            <div className="flex flex-col items-center text-center gap-2 max-w-[120px]">
              <Sparkles className="text-[#FF7518]" size={24} strokeWidth={1.5} />
              <p className="text-[12px] font-medium text-[#37352F] leading-snug">Tailored<br />Recommendations</p>
            </div>
            <div className="flex flex-col items-center text-center gap-2 max-w-[120px]">
              <Hanger />
              <p className="text-[12px] font-medium text-[#37352F] leading-snug">Curated from<br />Top Designers</p>
            </div>
            <div className="flex flex-col items-center text-center gap-2 max-w-[120px]">
              <Heart className="text-[#37352F]" size={24} strokeWidth={1.5} />
              <p className="text-[12px] font-medium text-[#37352F] leading-snug">Styles that<br />Match You</p>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="w-full lg:w-1/2 flex flex-col relative bg-[#F8F5F0]">

          {/* Vertical text on the right edge */}
          <div
            className="hidden xl:block absolute right-4 top-[50%] -translate-y-1/2 text-[#9B9B9B] font-serif text-[24px] tracking-wide whitespace-nowrap"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg) translateY(50%)" }}
          >
            Discover. Express. Belong.
          </div>

          <div className="flex-1 flex flex-col justify-center items-center px-8 sm:px-16 xl:px-24">
            <div className={`w-full max-w-[400px] relative z-10 ${isMounted ? "animate-fade-in" : ""}`}>

              {/* Headings */}
              <div className="mb-8">
                <h2 className="text-[32px] font-serif font-normal text-[#37352F] mb-2 flex items-center gap-1">
                  Welcome to
                  <button onClick={() => navigate("/")} className="bg-transparent border-none p-0 cursor-pointer flex items-center justify-center">
                    <img src="/LuxZera.png" alt="LuxZera" className="h-[34px] w-auto object-contain" />
                  </button>
                </h2>
                <p className="text-[14px] text-[#37352F] font-medium">
                  Sign in to continue your personalized fashion journey.
                </p>
              </div>

              {errorMsg && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg">
                  <p className="text-[14px] text-red-600">{errorMsg}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                {/* Email Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#9B9B9B]">
                    <Mail size={16} strokeWidth={2} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full h-[48px] pl-10 pr-4 bg-white border border-[#E7E3DD] rounded-full text-[14px] text-[#37352F] placeholder:text-[#9B9B9B] outline-none focus:border-[#37352F] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                  />
                </div>

                {/* Password Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#9B9B9B]">
                    <Lock size={16} strokeWidth={2} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full h-[48px] pl-10 pr-10 bg-white border border-[#E7E3DD] rounded-full text-[14px] text-[#37352F] placeholder:text-[#9B9B9B] outline-none focus:border-[#37352F] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#9B9B9B] hover:text-[#37352F] transition-colors cursor-pointer bg-transparent border-none p-0"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} strokeWidth={2} /> : <Eye size={16} strokeWidth={2} />}
                  </button>
                </div>

                <div className="flex justify-end mt-1 mb-2">
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-[12px] font-medium text-[#9B9B9B] hover:text-[#37352F] transition-colors bg-transparent border-none cursor-pointer p-0"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Continue Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-[48px] bg-[#1D1D1F] text-white text-[14px] font-medium rounded-full transition-colors duration-300 ease-in-out border-none cursor-pointer hover:bg-[#FF7518]"
                >
                  {loading ? "Signing in..." : "Continue"}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-[1px] bg-[#E7E3DD]" />
                <span className="text-[12px] text-[#9B9B9B]">or continue with</span>
                <div className="flex-1 h-[1px] bg-[#E7E3DD]" />
              </div>

              {/* Social Logins */}
              <div className="grid grid-cols-3 gap-3">
                <button className="flex items-center justify-center gap-2 h-[48px] bg-white border border-[#E7E3DD] rounded-full hover:border-[#37352F] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)] cursor-pointer text-[12px] font-medium text-[#37352F]">
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </button>
                <button className="flex items-center justify-center gap-2 h-[48px] bg-white border border-[#E7E3DD] rounded-full hover:border-[#37352F] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)] cursor-pointer text-[12px] font-medium text-[#37352F]">
                  <UserRound size={16} strokeWidth={2} className="text-[#37352F]" />
                  Passkey
                </button>
                <button className="flex items-center justify-center gap-2 h-[48px] bg-white border border-[#E7E3DD] rounded-full hover:border-[#37352F] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)] cursor-pointer text-[12px] font-medium text-[#37352F]">
                  <Mail size={16} strokeWidth={2} className="text-[#37352F]" />
                  Link
                </button>
              </div>

              {/* Create Account Link */}
              <div className="mt-8 text-center">
                <p className="text-[14px] text-[#37352F]">
                  New to LuxZera?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="text-[#F07020] font-medium hover:opacity-80 bg-transparent border-none cursor-pointer p-0 transition-opacity"
                  >
                    Create an account
                  </button>
                </p>
              </div>

              {/* Security Badge */}
              <div className="mt-8 flex items-center justify-center gap-2 text-[#9B9B9B]">
                <ShieldCheck size={16} strokeWidth={1.5} />
                <span className="text-[12px]">Your data is secure and never shared.</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
