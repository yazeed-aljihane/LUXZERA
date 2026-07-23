// src/components/AuthModal.jsx
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { X, Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useAuth } from "@/modules/auth/store/useAuth";
import { GoogleLogin } from "@react-oauth/google";
import { register as apiRegister, googleLogin, getCurrentUser } from "@/modules/auth/services/authService";
import { setToken } from "@/shared/utils/token";

export default function AuthModal({ isOpen, onClose, initialView = "login" }) {
  const navigate = useNavigate();
  const { login, setUser } = useAuth();

  const [view, setView] = useState(initialView);
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Handle mount and unmount animation states
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      // Wait for next tick to start animation
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    } else {
      setIsVisible(false);
      // Wait for animation to finish (180ms) before removing from DOM
      const timer = setTimeout(() => setIsRendered(false), 180);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Update view if prop changes while open
  useEffect(() => {
    if (isOpen) {
      setView(initialView);
    }
  }, [isOpen, initialView]);

  // Handle body scroll locking and Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e) => {
        if (e.key === "Escape") closeAndReset();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen]);

  const closeAndReset = () => {
    onClose();
    setTimeout(() => {
      setErrorMsg("");
      setFullName("");
      setEmail("");
      setPassword("");
      setShowPassword(false);
      setView(initialView);
    }, 180);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || (view === "register" && !fullName)) return;

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      if (view === "register") {
        const nameParts = fullName.trim().split(/\s+/);
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";
        const generatedUsername = email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "") + "_" + Math.floor(100 + Math.random() * 900);
        
        await apiRegister(generatedUsername, firstName, lastName, email, password);
        closeAndReset();
        navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
      } else {
        await login(email, password);
        closeAndReset();
      }
    } catch (err) {
      setErrorMsg(err.message || (view === "register" ? "Sign up failed." : "Invalid email or password."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const data = await googleLogin(credentialResponse.credential);
      setToken(data.accessToken || data.token);
      const profile = await getCurrentUser();
      setUser(profile);
      closeAndReset();
    } catch {
      setErrorMsg("Google sign-in failed. Please try again.");
    }
  };

  if (!isRendered) return null;

  const modalContent = (
    <div 
      className="am-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) closeAndReset();
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .am-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
        }
        
        .am-modal {
          width: 100%;
          max-width: 440px;
          margin: 0 16px;
          box-sizing: border-box;
          background: #FFFFFF;
          border-radius: 24px;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 25px 60px rgba(0,0,0,0.1);
          padding: 24px 28px 20px;
          position: relative;
          
          opacity: ${isVisible ? 1 : 0};
          transform: scale(${isVisible ? 1 : 0.98});
          transition: opacity 180ms ease-out, transform 180ms ease-out;
          
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          -webkit-font-smoothing: antialiased;
          max-height: 100vh;
          overflow-y: hidden;
          text-align: left;
        }

        .am-close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #F4F4F5;
          border: none;
          box-shadow: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #71717A;
          transition: background-color 180ms ease, color 180ms ease;
        }

        .am-close:hover {
          background-color: #E4E4E7;
          color: #18181B;
          box-shadow: none;
        }

        @keyframes am-revolve {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .am-logo-container {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        .am-logo-badge {
          height: 48px;
          width: auto;
          object-fit: contain;
          transition: transform 180ms ease;
        }

        .am-logo-badge.is-loading {
          animation: am-revolve 1.2s linear infinite;
        }

        .am-header {
          text-align: center;
          margin-bottom: 20px;
        }

        .am-title {
          font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
          font-size: 28px;
          font-weight: 700;
          color: #18181B;
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin-bottom: 6px;
        }

        .am-subtitle {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          color: #71717A;
          line-height: 1.4;
        }

        .am-error {
          padding: 10px 14px;
          background: #FEF2F2;
          border: 1px solid #FECACA;
          border-radius: 12px;
          margin-bottom: 16px;
          font-size: 13px;
          color: #DC2626;
          text-align: center;
        }

        .am-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }

        .am-field {
          width: 100%;
        }

        .am-input-wrap {
          position: relative;
          width: 100%;
        }

        .am-icon-left {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #18181B;
          pointer-events: none;
        }

        .am-input {
          width: 100%;
          height: 46px;
          border-radius: 9999px;
          border: 1px solid #E4E4E7;
          background: #FFFFFF;
          padding: 0 16px;
          font-size: 14px;
          color: #18181B;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 500;
          outline: none;
          transition: border-color 180ms ease;
        }
        
        .am-input.has-left-icon {
          padding-left: 44px;
        }

        .am-input.has-right-icon {
          padding-right: 48px;
        }

        .am-input::placeholder {
          color: #9CA3AF;
        }

        .am-input:focus {
          border-color: #111111;
          /* No glow, no shadow */
        }

        .am-eye {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          color: #9CA3AF;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 180ms ease;
        }

        .am-eye:hover {
          color: #111111;
        }
        
        .am-forgot-row {
          display: flex;
          justify-content: flex-end;
          margin-top: 8px;
        }

        .am-forgot {
          font-size: 13px;
          font-weight: 600;
          color: #F07020;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: opacity 180ms ease;
        }

        .am-forgot:hover {
          opacity: 0.8;
        }

        .am-submit {
          width: 100%;
          height: 48px;
          border-radius: 9999px;
          background: #171717;
          color: #FFFFFF;
          border: none;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 4px;
          transition: background-color 180ms ease;
        }

        .am-submit:hover:not(:disabled) {
          background-color: #000000;
        }
        
        .am-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .am-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 16px 0;
        }

        .am-divider-line {
          flex: 1;
          height: 1px;
          background: #ECECEC;
        }

        .am-divider-text {
          font-size: 13px;
          color: #9CA3AF;
        }

        .am-socials {
          display: flex;
          gap: 12px;
          width: 100%;
        }

        .am-social {
          position: relative;
          width: 100%;
          height: 44px;
          border-radius: 9999px;
          border: 1px solid #E5E7EB;
          background: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 600;
          color: #111111;
          cursor: pointer;
          transition: background-color 180ms ease;
        }
        
        .am-social svg {
          flex-shrink: 0;
        }

        .am-social:hover {
          background-color: #F9FAFB;
        }
        
        .am-google-wrap {
          position: relative;
          flex: 1;
          height: 44px;
          display: flex;
        }
        
        .am-google-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.001;
          z-index: 2;
          overflow: hidden;
          border-radius: 9999px;
          cursor: pointer;
        }

        .am-footer {
          margin-top: 20px;
          text-align: center;
          font-size: 13px;
          color: #6B7280;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .am-footer-btn {
          background: none;
          border: none;
          padding: 0;
          font-size: inherit;
          font-weight: 500;
          color: #111111;
          cursor: pointer;
          transition: color 180ms ease;
        }
        
        .am-footer-btn.orange {
          color: #F07020;
        }
        
        .am-footer-btn.orange:hover {
          opacity: 0.8;
        }

        .am-footer-terms {
          font-size: 12px;
          color: #9CA3AF;
          line-height: 1.5;
        }

        .am-footer-terms strong {
          color: #6B7280;
          font-weight: 600;
        }
      `}</style>

      <div className="am-modal">
        <button 
          className="am-close" 
          onClick={closeAndReset}
          aria-label="Close modal"
        >
          <X size={24} strokeWidth={1.5} />
        </button>

        <div className="am-logo-container">
          <img 
            src="/zera.png" 
            alt="LuxZera Logo" 
            className={`am-logo-badge ${isSubmitting ? "is-loading" : ""}`} 
          />
        </div>

        <div className="am-header">
          <h2 className="am-title">
            {view === "register" ? "You belong here." : "Look who's back."}
          </h2>
          <p className="am-subtitle">
            {view === "register" ? "Create your account to start curating." : "Your saved items missed you."}
          </p>
        </div>

        {errorMsg && (
          <div className="am-error">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="am-form" noValidate>
          {view === "register" && (
            <div className="am-input-wrap">
              <User size={18} className="am-icon-left" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="am-input has-left-icon"
              />
            </div>
          )}

          <div className="am-input-wrap">
            <Mail size={18} strokeWidth={1.5} className="am-icon-left" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="am-input has-left-icon"
            />
          </div>

          <div>
            <div className="am-input-wrap">
              <Lock size={18} strokeWidth={1.5} className="am-icon-left" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="am-input has-left-icon has-right-icon"
              />
              <button
                type="button"
                className="am-eye"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} strokeWidth={1.5} /> : <Eye size={18} strokeWidth={1.5} />}
              </button>
            </div>
            
            {view === "login" && (
              <div className="am-forgot-row">
                <button
                  type="button"
                  className="am-forgot"
                  onClick={() => {
                    closeAndReset();
                    navigate("/forgot-password");
                  }}
                >
                  Forgot password?
                </button>
              </div>
            )}
          </div>

          <button type="submit" className="am-submit flex items-center justify-center gap-2" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <img src="/zera.png" alt="Loading" className="h-5 w-5 object-contain animate-spin" style={{ animationDuration: '1.2s' }} />
                <span>{view === "register" ? "Creating account..." : "Signing in..."}</span>
              </>
            ) : (
              "Continue"
            )}
          </button>
        </form>

        <div className="am-divider">
          <div className="am-divider-line" />
          <span className="am-divider-text">or continue with</span>
          <div className="am-divider-line" />
        </div>

        <div className="am-socials">
          <div className="am-google-wrap">
            <div className="am-google-overlay">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setErrorMsg("Google sign-in failed.")}
                width="200"
                size="large"
                shape="pill"
              />
            </div>
            <button type="button" className="am-social" tabIndex={-1}>
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
          </div>

          <button type="button" className="am-social" style={{ flex: 1 }}>
            <svg viewBox="0 0 384 512" width="16" height="16" fill="currentColor">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
            </svg>
            Apple
          </button>
        </div>

        <div className="am-footer">
          <div>
            {view === "login" ? (
              <>
                Don't have an account?{" "}
                <button 
                  type="button" 
                  className="am-footer-btn orange"
                  onClick={() => setView("register")}
                >
                  Create account
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button 
                  type="button" 
                  className="am-footer-btn"
                  onClick={() => setView("login")}
                >
                  Sign in
                </button>
              </>
            )}
          </div>

          <div className="am-footer-terms">
            By continuing, you agree to our <strong>Terms of Service</strong><br />
            and <strong>Privacy Policy</strong>.
          </div>
        </div>

      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
