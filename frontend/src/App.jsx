// src/App.jsx
import { useState, useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { useCart } from "./context/CartContext.jsx";
import { useWardrobe } from "./context/WardrobeContext.jsx";
import { useAuth } from "./hooks/useAuth.js";

import Hero from "./components/Hero.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import AuthModal from "./components/AuthModal.jsx";

import Home from "./Home/Home.jsx";
import MarketPage from "./pages/MarketPage.jsx";
import MenPage from "./pages/MenPage.jsx";
import WomenPage from "./pages/WomenPage.jsx";
import UnisexPage from "./pages/UnisexPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import FaqPage from "./pages/FaqPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import KidsPage from "./pages/KidsPage.jsx";
import WardrobePage from "./pages/WardrobePage.jsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage.jsx";
import BecomeDesignerPage from "./pages/BecomeDesignerPage.jsx";
import DesignerOnboardingPage from "./pages/DesignerOnboardingPage.jsx";
import DesignerStudioPage from "./pages/DesignerStudioPage.jsx";

import RegisterPage from "./pages/RegisterPage.jsx";
import VerifyOtpPage from "./pages/VerifyOtpPage.jsx";
import CompleteGoogleSignupPage from "./pages/CompleteGoogleSignupPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import { googleLogin } from "./services/auth.js";


export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();
  const { wardrobeCount } = useWardrobe();

  const { user: currentUser, logout: handleLogout, setUser: setCurrentUser } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  // ── ⚡ SPRING BOOT GOOGLE CREDENTIAL HANDLER ──
  const handleCallbackResponse = async (response) => {
    console.log("Encoded JWT ID token received from Google selector");

    if (!response?.credential) {
      console.error("Google credential response did not include an ID token.");
      return;
    }

    try {
      const data = await googleLogin(response.credential);
      console.log("BACKEND RESPONSE:", data);

      if (data.requiresSignup) {
        // CASE 2: First-time Google user -> complete signup page
        setAuthOpen(false);
        navigate(`/complete-google-signup?email=${encodeURIComponent(data.email || "")}`);
      } else {
        // CASE 1: Existing Google user -> Redirect to login page
        setAuthOpen(false);
        alert("Google account successfully verified. Please sign in with your credentials.");
        navigate("/");
      }
    } catch (err) {
      console.error("Network error talking to backend server:", err);
      alert(err.message || "Google Login failed. Please check backend status.");
    }
  };

  // ── 🔒 STRICT SINGLE INITIALIZATION SYSTEM (WITH LATE-LOAD POLLING) ──
  useEffect(() => {
    /* global google */
    const initGsi = () => {
      if (typeof google !== "undefined" && !window.gsiInitialized) {
        google.accounts.id.initialize({
          client_id: "404546324859-b29lgq8vjkpvf7tkov149dpc9sr8hia4.apps.googleusercontent.com", // 🔴 Google Client ID
          callback: handleCallbackResponse,
          ux_mode: "popup",
          context: "signin",
          auto_select: false,
        });
        window.gsiInitialized = true;
        console.log("Google Sign-In script initialized successfully.");
      }
    };

    initGsi();

    // Fallback polling for late script loading
    const timer = setInterval(() => {
      if (window.gsiInitialized) {
        clearInterval(timer);
      } else {
        initGsi();
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const handleAppleSignInAction = () => {
    console.log("Apple secure token identity handshake triggered.");
  };

  const currentPage = (() => {
    if (location.pathname.startsWith("/product")) return "product";
    if (location.pathname === "/wardrobe") return "wardrobe";
    if (
      location.pathname.startsWith("/market") ||
      location.pathname.startsWith("/shop")
    ) {
      return "shop";
    }
    return location.pathname.split("/")[1] || "";
  })();

  const isHideLayout = location.pathname === "/designer-onboarding" || location.pathname === "/designer-studio";
  const showFloatingCart = cartCount > 0 && location.pathname !== "/cart" && !isHideLayout;
  const showNavbar = !isHideLayout;

  return (
    <div className="min-h-screen bg-[#FAF9F7] relative">
      {showNavbar && (
        <Navbar
          cartCount={cartCount}
          wardrobeCount={wardrobeCount}
          currentPage={currentPage}
          currentUser={currentUser}
          onLogoClick={() => navigate("/")}
          onShopClick={() => navigate("/market")}
          onMenClick={() => navigate("/men")}
          onWomenClick={() => navigate("/women")}
          onUnisexClick={() => navigate("/unisex")}
          onKidsClick={() => navigate("/kids")}
          onFaqClick={() => navigate("/faqs")}
          onCartClick={() => navigate("/cart")}
          onWardrobeClick={() => navigate("/wardrobe")}
          onAuthClick={() => setAuthOpen(true)}
          onAccountClick={() => navigate("/account")}
          onOrdersClick={() => navigate("/orders")}
          onLogout={handleLogout}
        />
      )}

      <main>
        <Routes>
          <Route
            path="/account"
            element={
              <AccountPage
                currentUser={currentUser}
                onUserChange={setCurrentUser}
              />
            }
          />
          <Route path="/orders" element={<OrdersPage />} />

          <Route
            path="/"
            element={
              <>
                <Hero onShopNow={() => navigate("/market")} />
                <Home onShopNow={() => navigate("/market")} />
              </>
            }
          />
          <Route path="/market" element={<MarketPage />} />
          <Route path="/shop" element={<Navigate to="/market" replace />} />
          <Route path="/men" element={<MenPage />} />
          <Route path="/women" element={<WomenPage />} />
          <Route path="/unisex" element={<UnisexPage />} />
          <Route path="/kids" element={<KidsPage />} />
          <Route path="/wardrobe" element={<WardrobePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/about" element={<AboutPage onShopNow={() => navigate("/market")} />} />
          <Route path="/faqs" element={<FaqPage onShopNow={() => navigate("/market")} />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/become-designer" element={<BecomeDesignerPage />} />
          <Route path="/designer-onboarding" element={<DesignerOnboardingPage />} />
          <Route path="/designer-studio" element={<DesignerStudioPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-otp" element={<VerifyOtpPage />} />
          <Route path="/complete-google-signup" element={<CompleteGoogleSignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ForgotPasswordPage />} />

          <Route
            path="*"
            element={
              <div className="p-10 text-center text-2xl font-bold">
                404 Page Not Found
              </div>
            }
          />
        </Routes>
      </main>

      {!isHideLayout && <Footer onShopNow={() => navigate("/market")} />}

      {showFloatingCart && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
          <button
            onClick={() => navigate("/cart")}
            className="h-12 px-6 bg-[#5B6EF5] hover:bg-[#4a5de0] text-[#FAF9F7] font-extrabold uppercase text-[10px] tracking-[0.25em] flex items-center justify-center gap-2 transition-all duration-300 rounded-full shadow-[0_8px_24px_rgba(91,110,245,0.35)] group"
          >
            View Bag ({cartCount})
            <ArrowRight
              size={12}
              strokeWidth={1.5}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </button>
        </div>
      )}

      {/* RENDER DUAL ACTION PROVIDER MODAL WITH SHARP/TRANSPARENT LAYERS */}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onAppleSignIn={handleAppleSignInAction}
      />
    </div>
  );
}