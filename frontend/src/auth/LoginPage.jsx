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
  const [errorMsg, setErrorMsg] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
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

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const data = await googleLogin(credentialResponse.credential);
      setToken(data.accessToken || data.token);
      const profile = await getCurrentUser();
      setUser(profile);
      navigate("/");
    } catch (error) {
      setErrorMsg("Google sign-in failed. Please try again.");
    }
  };

  const handleAppleSignIn = () => {
    console.log("Apple Sign-In triggered");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .lp-root {
          min-height: 100vh;
          display: flex;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
          background: #FAFAF8;
        }

        /* ─────────────────────────────────────
           LEFT PANEL  (editorial visual — 58%)
        ───────────────────────────────────── */
        .lp-left {
          display: none;
          position: relative;
          overflow: hidden;
          background: #F0EDE8;
        }

        @media (min-width: 900px) {
          .lp-left { display: flex; flex: 0 0 58%; flex-direction: column; }
        }

        .lp-left-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
        }

        /* Soft vignette overlay so left text is legible */
        .lp-left-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(240, 237, 232, 0.15) 0%,
            rgba(240, 237, 232, 0.0) 40%,
            rgba(240, 237, 232, 0.55) 85%,
            rgba(240, 237, 232, 0.9) 100%
          );
        }

        .lp-left-top {
          position: relative;
          z-index: 2;
          padding: 40px 44px;
        }

        .lp-left-logo {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          display: inline-flex;
        }

        .lp-left-logo img {
          height: 26px;
          width: auto;
          object-fit: contain;
        }

        .lp-left-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 2;
          padding: 40px 44px 48px;
        }

        .lp-left-tagline {
          font-family: 'Playfair Display', serif;
          font-size: 13px;
          font-weight: 400;
          font-style: italic;
          color: #5C5245;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .lp-left-headline {
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          font-weight: 400;
          color: #2C2417;
          line-height: 1.2;
          letter-spacing: -0.3px;
        }

        .lp-left-headline em {
          font-style: italic;
          color: #8B6914;
        }

        /* ─────────────────────────────────────
           RIGHT PANEL  (form — 42%)
        ───────────────────────────────────── */
        .lp-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 32px;
          background: #FFFFFF;
          overflow-y: auto;
        }

        .lp-form-wrap {
          width: 100%;
          max-width: 340px;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }

        .lp-form-wrap.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Mobile: show logo in form panel */
        .lp-mobile-logo {
          display: flex;
          justify-content: center;
          margin-bottom: 32px;
        }

        .lp-mobile-logo img {
          height: 24px;
          width: auto;
          object-fit: contain;
          cursor: pointer;
        }

        @media (min-width: 900px) {
          .lp-mobile-logo { display: none; }
        }

        /* ── Heading ── */
        .lp-heading {
          font-family: 'Playfair Display', serif;
          font-size: 30px;
          font-weight: 400;
          color: #1A1A1A;
          letter-spacing: -0.4px;
          margin-bottom: 6px;
          line-height: 1.15;
        }

        .lp-subheading {
          font-size: 14px;
          font-weight: 400;
          color: #8E8E8E;
          line-height: 1.55;
          margin-bottom: 36px;
          max-width: 290px;
        }

        /* ── Form ── */
        .lp-form {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .lp-field {
          display: flex;
          flex-direction: column;
          margin-bottom: 18px;
        }

        .lp-label {
          font-size: 11.5px;
          font-weight: 600;
          color: #5A5A5A;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .lp-input-wrap {
          position: relative;
        }

        .lp-input {
          width: 100%;
          height: 52px;
          padding: 0 46px 0 16px;
          border: 1px solid #E4E1DB;
          border-radius: 10px;
          background: #FAFAF8;
          font-size: 15px;
          font-weight: 400;
          color: #1A1A1A;
          outline: none;
          transition: border-color 0.18s ease, background 0.18s ease, box-shadow 0.18s ease;
          font-family: inherit;
          -webkit-appearance: none;
        }

        .lp-input::placeholder {
          color: #C0BCB5;
          font-weight: 400;
        }

        .lp-input:focus {
          background: #FFFFFF;
          border-color: #C9B99A;
          box-shadow: 0 0 0 3px rgba(185, 160, 120, 0.12);
        }

        .lp-eye {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #B0ABA4;
          display: flex;
          align-items: center;
          padding: 2px;
          transition: color 0.15s;
        }

        .lp-eye:hover { color: #5A5A5A; }

        /* ── Forgot ── */
        .lp-forgot-row {
          display: flex;
          justify-content: flex-end;
          margin-top: -10px;
          margin-bottom: 24px;
        }

        .lp-forgot {
          font-size: 12.5px;
          font-weight: 500;
          color: #A07840;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          font-family: inherit;
          transition: opacity 0.15s;
        }

        .lp-forgot:hover { opacity: 0.65; }

        /* ── Submit ── */
        .lp-submit {
          width: 100%;
          height: 52px;
          border-radius: 10px;
          border: none;
          background: #1A1A1A;
          color: #FFFFFF;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.03em;
          cursor: pointer;
          font-family: inherit;
          transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.12s ease;
        }

        .lp-submit:hover:not(:disabled) {
          background: #2D2D2D;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.14);
        }

        .lp-submit:active:not(:disabled) { transform: scale(0.99); }

        .lp-submit:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        /* ── Divider ── */
        .lp-divider {
          display: flex;
          align-items: center;
          gap: 14px;
          margin: 28px 0;
        }

        .lp-divider-line {
          flex: 1;
          height: 1px;
          background: #EBEBEA;
        }

        .lp-divider-text {
          font-size: 11.5px;
          font-weight: 500;
          color: #B0ABA4;
          letter-spacing: 0.04em;
          white-space: nowrap;
        }

        /* ── Social Buttons ── */
        .lp-socials {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          width: 100%;
        }

        .lp-social {
          position: relative;
          height: 52px;
          border: 1px solid #E4E1DB;
          border-radius: 10px;
          background: #FAFAF8;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          cursor: pointer;
          font-family: inherit;
          transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
          width: 100%;
          box-sizing: border-box;
        }

        .lp-social:hover {
          border-color: #C9B99A;
          background: #FFFFFF;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .lp-social:active { transform: scale(0.98); }

        .lp-social-label {
          font-size: 11.5px;
          font-weight: 500;
          color: #3A3A3A;
          line-height: 1;
        }

        /* Google wrapper: invisible real button layered on top */
        .lp-google-wrap {
          position: relative;
          width: 100%;
          min-width: 0;
        }

        .lp-google-real {
          position: absolute;
          inset: 0;
          opacity: 0.001;
          z-index: 4;
          overflow: hidden;
          cursor: pointer;
          border-radius: 10px;
        }

        /* ── Error ── */
        .lp-error {
          padding: 11px 15px;
          background: #FFF5F3;
          border: 1px solid #F5D0C8;
          border-radius: 8px;
          margin-bottom: 22px;
        }

        .lp-error p {
          font-size: 13px;
          font-weight: 500;
          color: #C0392B;
          line-height: 1.4;
        }

        /* ── Footer ── */
        .lp-footer {
          margin-top: 32px;
          text-align: center;
          font-size: 13.5px;
          color: #9E9E9E;
          line-height: 1.4;
        }

        .lp-footer-link {
          color: #A07840;
          font-weight: 500;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          font-size: inherit;
          font-family: inherit;
          transition: opacity 0.15s;
        }

        .lp-footer-link:hover { opacity: 0.65; }

        /* ── Mobile tweaks ── */
        @media (max-width: 899px) {
          .lp-right { background: #FFFFFF; }
          .lp-form-wrap { max-width: 380px; }
        }

        @media (max-width: 480px) {
          .lp-right { padding: 40px 24px; }
          .lp-heading { font-size: 26px; }
        }
      `}</style>

      <div className="lp-root">

        {/* ── LEFT: Editorial panel ── */}
        <div className="lp-left">
          <img
            src="/login-editorial.png"
            alt="LuxZera editorial fashion mood"
            className="lp-left-img"
          />
          <div className="lp-left-overlay" />

          <div className="lp-left-top">
            <button className="lp-left-logo" onClick={() => navigate("/")}>
              <img src="/LuxZera.png" alt="LuxZera" />
            </button>
          </div>

          <div className="lp-left-bottom">
            <p className="lp-left-tagline">Discover · Curate · Wear</p>
            <h2 className="lp-left-headline">
              Your next favorite<br />
              outfit is <em>waiting.</em>
            </h2>
          </div>
        </div>

        {/* ── RIGHT: Form panel ── */}
        <div className="lp-right">
          <div className={`lp-form-wrap ${mounted ? "visible" : ""}`}>

            {/* Mobile logo */}
            <div className="lp-mobile-logo">
              <img src="/LuxZera.png" alt="LuxZera" onClick={() => navigate("/")} />
            </div>

            {/* Heading */}
            <h1 className="lp-heading">Welcome back.</h1>
            <p className="lp-subheading">
              Continue exploring pieces curated around your style.
            </p>

            {/* Error */}
            {errorMsg && (
              <div className="lp-error"><p>{errorMsg}</p></div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="lp-form">

              <div className="lp-field">
                <label className="lp-label">Email</label>
                <div className="lp-input-wrap">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="lp-input"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="lp-field">
                <label className="lp-label">Password</label>
                <div className="lp-input-wrap">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="lp-input"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="lp-eye"
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={17} strokeWidth={1.5} /> : <Eye size={17} strokeWidth={1.5} />}
                  </button>
                </div>
              </div>

              <div className="lp-forgot-row">
                <button type="button" onClick={() => navigate("/forgot-password")} className="lp-forgot">
                  Forgot password?
                </button>
              </div>

              <button type="submit" disabled={loading} className="lp-submit">
                {loading ? "Signing in…" : "Continue"}
              </button>
            </form>

            {/* Divider */}
            <div className="lp-divider">
              <div className="lp-divider-line" />
              <span className="lp-divider-text">or continue with</span>
              <div className="lp-divider-line" />
            </div>

            {/* Social */}
            <div className="lp-socials">

              {/* Google */}
              <div className="lp-google-wrap">
                <div className="lp-google-real">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => setErrorMsg("Google sign-in failed.")}
                    width="160"
                    size="large"
                    shape="rectangular"
                  />
                </div>
                <button type="button" className="lp-social">
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="lp-social-label">Google</span>
                </button>
              </div>

              {/* Apple */}
              <button type="button" className="lp-social" onClick={handleAppleSignIn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1A1A1A">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                <span className="lp-social-label">Apple</span>
              </button>

            </div>

            {/* Footer */}
            <div className="lp-footer">
              New to LuxZera?{" "}
              <button type="button" onClick={() => navigate("/register")} className="lp-footer-link">
                Create account
              </button>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}
