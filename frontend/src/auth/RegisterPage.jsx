// src/auth/RegisterPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { register } from "../services/auth/authService";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin, getCurrentUser } from "../services/auth/authService";
import { setToken } from "../utils/token";
import { useAuth } from "../hooks/useAuth";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsMounted(true), 30);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !firstName || !lastName || !email || !password) return;

    setLoading(true);
    setErrorMsg("");
    try {
      await register(username, firstName, lastName, email, password);
      navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const data = await googleLogin(credentialResponse.credential);
      setToken(data.accessToken || data.token);
      const profile = await getCurrentUser();
      setUser(profile);
      navigate("/");
    } catch (error) {
      console.error("Google Login Failed", error);
      setErrorMsg("Google sign-in failed. Please try again.");
    }
  };

  const handleAppleSignIn = () => {
    console.log("Apple Sign-In triggered");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        * { box-sizing: border-box; }

        .lz-reg-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #FFFFFF;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          padding: 32px 20px;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .lz-reg-container {
          width: 100%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .lz-reg-container.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .lz-reg-logo {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          margin-bottom: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lz-reg-logo img {
          height: 28px;
          width: auto;
          object-fit: contain;
        }

        .lz-reg-title {
          font-size: 28px;
          font-weight: 700;
          color: #1D1D1F;
          text-align: center;
          margin: 0 0 4px 0;
          letter-spacing: -0.5px;
          line-height: 1.15;
        }

        .lz-reg-subtitle {
          font-size: 15px;
          font-weight: 400;
          color: #91918E;
          text-align: center;
          margin: 0 0 36px 0;
          line-height: 1.4;
        }

        .lz-reg-form {
          width: 100%;
          display: flex;
          flex-direction: column;
        }

        .lz-reg-label {
          font-size: 13px;
          font-weight: 500;
          color: #37352F;
          margin-bottom: 6px;
          display: block;
        }

        .lz-reg-field {
          width: 100%;
          margin-bottom: 16px;
        }

        .lz-reg-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 16px;
        }

        .lz-reg-row .lz-reg-field {
          margin-bottom: 0;
        }

        .lz-reg-input-wrap {
          position: relative;
          width: 100%;
        }

        .lz-reg-input {
          width: 100%;
          height: 44px;
          padding: 0 14px;
          border: 1px solid #E3E2DE;
          border-radius: 8px;
          background: #FFFFFF;
          font-size: 15px;
          font-weight: 400;
          color: #37352F;
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
          font-family: inherit;
        }

        .lz-reg-input::placeholder {
          color: #B4B4B0;
        }

        .lz-reg-input:focus {
          border-color: #E8772E;
          box-shadow: 0 0 0 3px rgba(232, 119, 46, 0.1);
        }

        .lz-reg-input.has-toggle {
          padding-right: 44px;
        }

        .lz-reg-toggle {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          padding: 4px;
          cursor: pointer;
          color: #B4B4B0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.15s;
          border-radius: 4px;
        }

        .lz-reg-toggle:hover {
          color: #37352F;
        }

        .lz-reg-submit {
          width: 100%;
          height: 44px;
          border-radius: 8px;
          border: none;
          background: #E8772E;
          color: #FFFFFF;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
          font-family: inherit;
          margin-top: 4px;
        }

        .lz-reg-submit:hover:not(:disabled) {
          background: #D46A25;
          box-shadow: 0 2px 8px rgba(232, 119, 46, 0.25);
        }

        .lz-reg-submit:active:not(:disabled) {
          transform: scale(0.99);
        }

        .lz-reg-submit:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .lz-reg-divider {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 14px;
          margin: 28px 0;
        }

        .lz-reg-divider-line {
          flex: 1;
          height: 1px;
          background: #EBEBEA;
        }

        .lz-reg-divider-label {
          font-size: 12px;
          font-weight: 400;
          color: #91918E;
          white-space: nowrap;
        }

        .lz-reg-socials {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .lz-reg-social-btn {
          width: 100%;
          height: 56px;
          border: 1px solid #E3E2DE;
          border-radius: 10px;
          background: #FFFFFF;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          cursor: pointer;
          transition: all 0.15s ease;
          font-family: inherit;
          box-sizing: border-box;
        }

        .lz-reg-social-btn:hover {
          border-color: #D1D1CE;
          background: #FAFAF9;
        }

        .lz-reg-social-btn:active {
          transform: scale(0.98);
        }

        .lz-reg-social-label {
          font-size: 12px;
          font-weight: 500;
          color: #37352F;
          line-height: 1;
        }

        .lz-reg-google-wrap {
          position: relative;
          width: 100%;
          min-width: 0;
        }

        .lz-reg-google-wrap .lz-reg-google-invisible {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.001;
          z-index: 3;
          overflow: hidden;
          cursor: pointer;
        }

        .lz-reg-google-wrap .lz-reg-social-btn {
          width: 100%;
        }

        .lz-reg-error {
          width: 100%;
          padding: 10px 14px;
          background: #FFF0ED;
          border: 1px solid #FFDDD6;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .lz-reg-error p {
          margin: 0;
          font-size: 13px;
          font-weight: 500;
          color: #EB5757;
          line-height: 1.4;
        }

        .lz-reg-footer {
          margin-top: 32px;
          text-align: center;
          font-size: 14px;
          color: #91918E;
          font-weight: 400;
        }

        .lz-reg-footer-link {
          color: #E8772E;
          font-weight: 500;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          font-size: inherit;
          font-family: inherit;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: opacity 0.15s;
        }

        .lz-reg-footer-link:hover {
          opacity: 0.7;
        }

        @media (max-width: 440px) {
          .lz-reg-title { font-size: 24px; }
          .lz-reg-subtitle { font-size: 14px; margin-bottom: 28px; }
          .lz-reg-row { grid-template-columns: 1fr; gap: 0; }
          .lz-reg-row .lz-reg-field { margin-bottom: 16px; }
        }
      `}</style>

      <div className="lz-reg-page">
        <div className={`lz-reg-container ${isMounted ? "is-visible" : ""}`}>

          {/* Logo */}
          <button className="lz-reg-logo" onClick={() => navigate("/")}>
            <img src="/LuxZera.png" alt="LuxZera" />
          </button>

          {/* Heading */}
          <h1 className="lz-reg-title">Create your account</h1>
          <p className="lz-reg-subtitle">Join LuxZera to discover your style</p>

          {/* Error */}
          {errorMsg && (
            <div className="lz-reg-error">
              <p>{errorMsg}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="lz-reg-form">

            {/* First + Last Name */}
            <div className="lz-reg-row">
              <div className="lz-reg-field">
                <label className="lz-reg-label">First name</label>
                <div className="lz-reg-input-wrap">
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    className="lz-reg-input"
                    autoComplete="given-name"
                  />
                </div>
              </div>
              <div className="lz-reg-field">
                <label className="lz-reg-label">Last name</label>
                <div className="lz-reg-input-wrap">
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className="lz-reg-input"
                    autoComplete="family-name"
                  />
                </div>
              </div>
            </div>

            {/* Username */}
            <div className="lz-reg-field">
              <label className="lz-reg-label">Username</label>
              <div className="lz-reg-input-wrap">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a unique username"
                  className="lz-reg-input"
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Email */}
            <div className="lz-reg-field">
              <label className="lz-reg-label">Email</label>
              <div className="lz-reg-input-wrap">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="lz-reg-input"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="lz-reg-field">
              <label className="lz-reg-label">Password</label>
              <div className="lz-reg-input-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a secure password"
                  className="lz-reg-input has-toggle"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="lz-reg-toggle"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword
                    ? <EyeOff size={18} strokeWidth={1.5} />
                    : <Eye size={18} strokeWidth={1.5} />
                  }
                </button>
              </div>
            </div>

            {/* Continue */}
            <button type="submit" disabled={loading} className="lz-reg-submit">
              {loading ? "Creating account..." : "Continue"}
            </button>
          </form>

          {/* Divider */}
          <div className="lz-reg-divider">
            <div className="lz-reg-divider-line" />
            <span className="lz-reg-divider-label">or continue with</span>
            <div className="lz-reg-divider-line" />
          </div>

          {/* Social Buttons */}
          <div className="lz-reg-socials">

            {/* Google */}
            <div className="lz-reg-google-wrap">
              <div className="lz-reg-google-invisible">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setErrorMsg("Google sign-in failed.")}
                  width="190"
                  size="large"
                  shape="rectangular"
                />
              </div>
              <button type="button" className="lz-reg-social-btn">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="lz-reg-social-label">Google</span>
              </button>
            </div>

            {/* Apple */}
            <button type="button" className="lz-reg-social-btn" onClick={handleAppleSignIn}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#1D1D1F">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <span className="lz-reg-social-label">Apple</span>
            </button>
          </div>

          {/* Footer */}
          <div className="lz-reg-footer">
            Already have an account?{" "}
            <button type="button" onClick={() => navigate("/login")} className="lz-reg-footer-link">
              Sign in
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
