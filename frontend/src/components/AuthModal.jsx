// src/components/AuthModal.jsx
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { X, Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { GoogleLogin } from "@react-oauth/google";
import { register as apiRegister, googleLogin, getCurrentUser } from "../services/auth/authService";
import { setToken } from "../utils/token";

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
        .am-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent; /* NO dimming, fully transparent */
          /* No blur, just fully visible page underneath */
        }
        
        .am-modal {
          width: 100%;
          max-width: 480px;
          margin: 0 16px;
          box-sizing: border-box;
          background: #FFFFFF;
          border-radius: 24px;
          border: 1px solid rgba(0,0,0,0.05);
          box-shadow: 0 30px 80px rgba(0,0,0,0.12);
          padding: 32px 32px 24px;
          position: relative;
          
          /* Animation state */
          opacity: ${isVisible ? 1 : 0};
          transform: scale(${isVisible ? 1 : 0.98});
          transition: opacity 180ms ease-out, transform 180ms ease-out;
          
          font-family: 'Inter', -apple-system, sans-serif;
          -webkit-font-smoothing: antialiased;
          max-height: 90vh;
          overflow-y: auto;
          text-align: left;
        }

        .am-close {
          position: absolute;
          top: 24px;
          right: 24px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: transparent;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #9CA3AF;
          transition: background-color 180ms ease, color 180ms ease;
        }

        .am-close:hover {
          background-color: #F3F4F6;
          color: #111111;
        }

        .am-logo-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 12px;
        }

        .am-logo-badge {
          height: 48px;
          width: auto;
          margin-bottom: 4px;
        }

        .am-logo-text {
          font-size: 24px;
          font-weight: 800;
          color: #111111;
          letter-spacing: -0.05em;
          line-height: 1;
        }

        .am-logo-text span {
          color: #F07020;
        }

        .am-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .am-title {
          font-family: 'Playfair Display', ui-serif, Georgia, serif;
          font-size: 36px;
          font-weight: 700;
          color: #111111;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin-bottom: 4px;
        }

        .am-subtitle {
          font-size: 15px;
          color: #6B7280;
          line-height: 1.4;
        }

        .am-error {
          padding: 12px 16px;
          background: #FEF2F2;
          border: 1px solid #FECACA;
          border-radius: 12px;
          margin-bottom: 24px;
          font-size: 14px;
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
          text-align: left;
        }

        .am-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #111111;
          margin-bottom: 8px;
        }

        .am-input-wrap {
          position: relative;
          width: 100%;
        }

        .am-icon-left {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: #9CA3AF;
          pointer-events: none;
        }

        .am-input {
          width: 100%;
          height: 52px;
          border-radius: 9999px;
          border: 1px solid #E5E7EB;
          background: #FFFFFF;
          padding: 0 20px;
          font-size: 15px;
          color: #111111;
          font-family: inherit;
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
          height: 52px;
          border-radius: 9999px;
          background: #171717;
          color: #FFFFFF;
          border: none;
          font-size: 15px;
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
          margin: 20px 0;
        }

        .am-divider-line {
          flex: 1;
          height: 1px;
          background: #ECECEC;
        }

        .am-divider-text {
          font-size: 14px;
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
          height: 48px;
          border-radius: 9999px;
          border: 1px solid #E5E7EB;
          background: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 14px;
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
          height: 48px;
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
          margin-top: 24px;
          text-align: center;
          font-size: 14px;
          color: #6B7280;
          display: flex;
          flex-direction: column;
          gap: 16px;
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
          <img src="/logo.png" alt="LuxZera Badge" className="am-logo-badge" />
          <div className="am-logo-text"><span>Lux</span>Zera</div>
        </div>

        <div className="am-header">
          <h2 className="am-title">
            {view === "register" ? "Create account." : "Welcome back."}
          </h2>
          <p className="am-subtitle">
            {view === "register" ? "Join the new standard of fashion." : "Continue your style journey."}
          </p>
        </div>

        {errorMsg && (
          <div className="am-error">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="am-form" noValidate>
          {view === "register" && (
            <div>
              <label className="am-label">Full Name</label>
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
            </div>
          )}

          <div>
            <label className="am-label">Email</label>
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
          </div>

          <div>
            <label className="am-label">Password</label>
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

          <button type="submit" className="am-submit" disabled={isSubmitting}>
            {isSubmitting 
              ? (view === "register" ? "Creating account..." : "Signing in...") 
              : "Continue"
            }
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
            <svg width="18" height="18" viewBox="0 0 814 1000" aria-hidden="true" fill="#111111">
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 70.1 0 128.4 46.4 172.5 46.4 42.8 0 109.8-49 192.5-49 30.8 0 111.1 2.6 174.4 72.5zm-85.5-139.4c-20.1 23.7-52.6 42.8-84.5 42.8-3.9 0-7.8-.5-11.7-.6 1.9-32.1 17.4-72.5 43.4-96.8 21.4-20.7 54.5-37.1 82.9-38.4 1.3 4.5 2 9.1 2 14.3 0 30.1-14.3 67.8-32.1 78.7z"/>
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
