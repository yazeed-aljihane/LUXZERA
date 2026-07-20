// src/auth/LoginPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin, getCurrentUser } from "../services/auth/authService";
import { setToken } from "../utils/token";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login: contextLogin, setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 60);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setError("");
    try {
      await contextLogin(email, password);
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Invalid email or password.");
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
    } catch {
      setError("Google sign-in failed. Please try again.");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .lp {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #FFFFFF;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          /* Asymmetric padding anchors the form above true center */
          padding: 60px 24px 120px;
        }

        .lp-card {
          width: 100%;
          max-width: 420px;
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0;
          transition: opacity 200ms ease;
        }

        .lp-card.ready {
          opacity: 1;
        }

        /* Logo */
        .lp-logo {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          margin-bottom: 28px;
          line-height: 1;
        }

        .lp-logo img {
          height: 22px;
          width: auto;
          display: block;
        }

        /* Heading */
        .lp-heading {
          font-size: 24px;
          font-weight: 600;
          color: #1D1D1F;
          letter-spacing: -0.4px;
          text-align: center;
          line-height: 1.2;
          margin-bottom: 8px;
        }

        .lp-subheading {
          font-size: 14px;
          font-weight: 400;
          color: #86868B;
          text-align: center;
          line-height: 1.5;
          margin-bottom: 40px;
        }

        /* Error */
        .lp-error {
          width: 100%;
          padding: 12px 14px;
          background: #FFF5F5;
          border: 1px solid #FECACA;
          border-radius: 8px;
          margin-bottom: 24px;
        }

        .lp-error-text {
          font-size: 13px;
          font-weight: 400;
          color: #DC2626;
          line-height: 1.4;
        }

        /* Form */
        .lp-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          width: 100%;
          gap: 28px;
        }

        /* Field */
        .lp-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          width: 100%;
        }

        .lp-label {
          font-size: 13px;
          font-weight: 500;
          color: #1D1D1F;
          letter-spacing: 0;
          line-height: 1;
        }

        /* Input */
        .lp-input-wrap {
          position: relative;
          width: 100%;
        }

        .lp-input {
          width: 100%;
          height: 54px;
          padding: 0 42px 0 16px;
          border: 1px solid #E5E5E5;
          border-radius: 12px;
          background: #FFFFFF;
          font-size: 15px;
          font-weight: 400;
          color: #1D1D1F;
          font-family: inherit;
          outline: none;
          transition: border-color 150ms ease;
          -webkit-appearance: none;
        }

        .lp-input::placeholder {
          color: #AEAEB2;
          font-weight: 400;
        }

        .lp-input:focus {
          border-color: #1D1D1F;
        }

        .lp-eye {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          color: #C7C7CC;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 150ms ease;
          line-height: 1;
        }

        .lp-eye:hover {
          color: #86868B;
        }

        /* Forgot */
        .lp-forgot-row {
          display: flex;
          justify-content: flex-end;
          margin-top: 6px;
        }

        .lp-forgot {
          font-size: 13px;
          font-weight: 400;
          color: #86868B;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          font-family: inherit;
          transition: color 150ms ease;
          line-height: 1;
        }

        .lp-forgot:hover {
          color: #FF7518;
        }

        /* Submit */
        .lp-submit {
          width: 100%;
          height: 44px;
          border-radius: 8px;
          border: none;
          background: #1D1D1F;
          color: #FFFFFF;
          font-size: 15px;
          font-weight: 500;
          font-family: inherit;
          letter-spacing: -0.1px;
          cursor: pointer;
          margin-top: 4px;
          transition: background 150ms ease, opacity 150ms ease;
        }

        .lp-submit:hover:not(:disabled) {
          background: #2D2D2F;
        }

        .lp-submit:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        /* Divider */
        .lp-divider {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 36px 0;
        }

        .lp-divider-line {
          flex: 1;
          height: 1px;
          background: #ECECEC;
        }

        .lp-divider-text {
          font-size: 12px;
          font-weight: 400;
          color: #C7C7CC;
          white-space: nowrap;
          letter-spacing: 0.01em;
        }

        /* Social buttons */
        .lp-socials {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .lp-social {
          position: relative;
          height: 44px;
          border: 1px solid #ECECEC;
          border-radius: 8px;
          background: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          font-family: inherit;
          font-size: 14px;
          font-weight: 500;
          color: #1D1D1F;
          transition: border-color 150ms ease, background 150ms ease;
          width: 100%;
          box-sizing: border-box;
        }

        .lp-social:hover {
          border-color: #D1D1D6;
          background: #FAFAFA;
        }

        /* Google real button overlay */
        .lp-google-wrap {
          position: relative;
          width: 100%;
          min-width: 0;
        }

        .lp-google-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.001;
          z-index: 2;
          overflow: hidden;
          border-radius: 8px;
          cursor: pointer;
        }

        /* Footer */
        .lp-footer {
          margin-top: 32px;
          font-size: 13px;
          font-weight: 400;
          color: #86868B;
          text-align: center;
          line-height: 1.5;
        }

        .lp-footer-btn {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          font-size: inherit;
          font-family: inherit;
          font-weight: 500;
          color: #FF7518;
          transition: opacity 150ms ease;
        }

        .lp-footer-btn:hover {
          opacity: 0.7;
        }

        /* Terms */
        .lp-terms {
          margin-top: 24px;
          font-size: 11.5px;
          font-weight: 400;
          color: #9A9A9A;
          text-align: center;
          line-height: 1.6;
          max-width: 280px;
        }

        .lp-terms-link {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          font-size: inherit;
          font-family: inherit;
          color: #86868B;
          transition: color 150ms ease;
        }

        .lp-terms-link:hover {
          color: #1D1D1F;
        }
      `}</style>

      <div className="lp">
        <div className={`lp-card${ready ? " ready" : ""}`}>

          {/* Logo */}
          <button className="lp-logo" onClick={() => navigate("/")} aria-label="Go to LuxZera home">
            <img src="/LuxZera.png" alt="LuxZera" />
          </button>

          {/* Heading */}
          <h1 className="lp-heading">Welcome back.</h1>
          <p className="lp-subheading">Continue your style journey.</p>

          {/* Error */}
          {error && (
            <div className="lp-error" role="alert">
              <p className="lp-error-text">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="lp-form" noValidate>

            <div className="lp-field">
              <label htmlFor="lp-email" className="lp-label">Email</label>
              <div className="lp-input-wrap">
                <input
                  id="lp-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="lp-input"
                  autoComplete="email"
                  autoFocus
                />
              </div>
            </div>

            <div className="lp-field">
              <label htmlFor="lp-password" className="lp-label">Password</label>
              <div className="lp-input-wrap">
                <input
                  id="lp-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="lp-input"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="lp-eye"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword
                    ? <EyeOff size={16} strokeWidth={1.5} />
                    : <Eye size={16} strokeWidth={1.5} />
                  }
                </button>
              </div>
            </div>

            <div className="lp-forgot-row">
              <button
                type="button"
                className="lp-forgot"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot password?
              </button>
            </div>

            <button type="submit" className="lp-submit" disabled={loading}>
              {loading ? "Signing in…" : "Continue"}
            </button>

          </form>

          {/* Divider */}
          <div className="lp-divider">
            <div className="lp-divider-line" />
            <span className="lp-divider-text">or</span>
            <div className="lp-divider-line" />
          </div>

          {/* Social buttons */}
          <div className="lp-socials">

            {/* Google */}
            <div className="lp-google-wrap">
              <div className="lp-google-overlay">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setError("Google sign-in failed.")}
                  width="160"
                  size="large"
                  shape="rectangular"
                />
              </div>
              <button type="button" className="lp-social" tabIndex={-1}>
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
            </div>

            {/* Apple */}
            <button type="button" className="lp-social" onClick={() => console.log("Apple sign-in")}>
              <svg width="16" height="16" viewBox="0 0 814 1000" aria-hidden="true" fill="#1D1D1F">
                <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 70.1 0 128.4 46.4 172.5 46.4 42.8 0 109.8-49 192.5-49 30.8 0 111.1 2.6 174.4 72.5zm-85.5-139.4c-20.1 23.7-52.6 42.8-84.5 42.8-3.9 0-7.8-.5-11.7-.6 1.9-32.1 17.4-72.5 43.4-96.8 21.4-20.7 54.5-37.1 82.9-38.4 1.3 4.5 2 9.1 2 14.3 0 30.1-14.3 67.8-32.1 78.7z"/>
              </svg>
              Apple
            </button>

          </div>

          {/* Create account */}
          <div className="lp-footer">
            Don't have an account?{" "}
            <button type="button" className="lp-footer-btn" onClick={() => navigate("/register")}>
              Sign up
            </button>
          </div>

          {/* Terms */}
          <p className="lp-terms">
            By continuing, you agree to our{" "}
            <button type="button" className="lp-terms-link">Terms of Service</button>
            {" "}and{" "}
            <button type="button" className="lp-terms-link">Privacy Policy</button>.
          </p>

        </div>
      </div>
    </>
  );
}
