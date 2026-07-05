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


export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();
  const { wardrobeCount } = useWardrobe();

  const { user: currentUser, loading: authLoading, logout: handleLogout, setUser: setCurrentUser } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [authInitialView, setAuthInitialView] = useState("login");

  // Auto-open login modal if redirect query parameter exists
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("openLogin") === "true") {
      setAuthInitialView("login");
      setAuthOpen(true);
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const handleAppleSignInAction = () => {
    console.log("Apple secure token identity handshake triggered.");
  };

  const openAuthModal = (view = "login") => {
    setAuthInitialView(view);
    setAuthOpen(true);
  };

  const handleSearch = (query) => {
    navigate(`/market?q=${encodeURIComponent(query)}`);
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
          onAuthClick={() => openAuthModal("login")}
          onAccountClick={() => navigate("/account")}
          onOrdersClick={() => navigate("/orders")}
          onLogout={handleLogout}
          onSearch={handleSearch}
          onDesignerClick={() => {
            const isDesigner = currentUser?.role === "DESIGNER" || currentUser?.isDesigner;
            navigate(isDesigner ? "/designer-studio" : "/become-designer");
          }}
        />
      )}

      <main>
        <Routes>
          <Route
            path="/account"
            element={
              <AccountPage
                currentUser={currentUser}
                authLoading={authLoading}
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
        <div className="fixed bottom-8 right-8 z-50 animate-fade-in-up">
          <button
            onClick={() => navigate("/cart")}
            className="h-11 px-5 bg-[#F07020] hover:bg-[#e05f10] text-[#FAF9F7] font-bold uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-2 transition-all duration-300 rounded-full shadow-[0_12px_24px_-6px_rgba(240,112,32,0.4)] group hover:scale-[1.03] active:scale-[0.98] cursor-pointer border-none"
          >
            View Bag ({cartCount})
            <ArrowRight
              size={12}
              strokeWidth={1.7}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </button>
        </div>
      )}

      {/* RENDER DUAL ACTION PROVIDER MODAL WITH SHARP/TRANSPARENT LAYERS */}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        initialView={authInitialView}
        onAppleSignIn={handleAppleSignInAction}
      />
    </div>
  );
}
