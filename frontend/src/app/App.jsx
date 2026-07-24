// src/App.jsx
import { useState, useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import "@/styles/App.css";

import { useCart } from "@/modules/cart/store/CartContext";
import { useWardrobe } from "@/modules/wishlist/store/WardrobeContext";
import { useAuth } from "@/modules/auth/store/useAuth";

import Hero from "@/modules/home/components/Hero";
import Navbar from "@/shared/components/layout/Navbar";
import Footer from "@/shared/components/layout/Footer";
import AuthModal from "@/modules/auth/components/AuthModal";

import Home from "@/modules/home/pages/Home";
import MarketPage from "@/modules/products/pages/MarketPage";
import MenPage from "@/modules/products/pages/MenPage";
import WomenPage from "@/modules/products/pages/WomenPage";
import UnisexPage from "@/modules/products/pages/UnisexPage";
import ProductDetailPage from "@/modules/products/pages/ProductDetailPage";
import CartPage from "@/modules/cart/pages/CartPage";
import AboutPage from "@/modules/system/pages/AboutPage";
import FaqPage from "@/modules/system/pages/FaqPage";
import AccountPage from "@/modules/profile/pages/AccountPage";
import OrdersPage from "@/modules/profile/pages/OrdersPage";
import KidsPage from "@/modules/products/pages/KidsPage";
import WardrobePage from "@/modules/wishlist/pages/WardrobePage";
import PrivacyPolicyPage from "@/modules/system/pages/PrivacyPolicyPage";
import BecomeDesignerPage from "@/modules/designer/pages/BecomeDesignerPage";
import DesignerOnboardingPage from "@/modules/designer/pages/DesignerOnboardingPage";
import DesignerStudioPage from "@/modules/designer/pages/DesignerStudioPage";

// Dedicated auth pages removed in favor of AuthModal
import VerifyOtpPage from "@/modules/auth/pages/VerifyOtpPage";
import CompleteGoogleSignupPage from "@/modules/auth/pages/CompleteGoogleSignupPage";
import ForgotPasswordPage from "@/modules/auth/pages/ForgotPasswordPage";
import NotFoundPage from "@/modules/system/pages/NotFoundPage";
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

  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      if (scrollHeight - scrollTop - clientHeight < 320) {
        setIsNearBottom(true);
      } else {
        setIsNearBottom(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const handleAppleSignInAction = () => {
    // Handle Apple Sign-In action here
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

  const authPaths = ["/verify-otp", "/forgot-password", "/reset-password", "/complete-google-signup"];
  const isHideLayout = location.pathname === "/designer-onboarding" || location.pathname === "/designer-studio" || authPaths.includes(location.pathname);
  const showFloatingCart = cartCount > 0 && location.pathname !== "/cart" && !isHideLayout;
  const showNavbar = !isHideLayout;

  return (
    <div className="min-h-screen bg-white relative">
      {showNavbar && (
        <Navbar
          cartCount={cartCount}
          wardrobeCount={wardrobeCount}
          currentPage={currentPage}
          currentUser={currentUser}
          authLoading={authLoading}
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
            if (currentUser && (currentUser.role === "DESIGNER" || currentUser.isDesigner)) {
              navigate("/designer-studio");
            } else {
              navigate("/become-designer");
            }
          }}
        />
      )}

      <main>
        <Routes>
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
          <Route path="/men" element={<MenPage />} />
          <Route path="/women" element={<WomenPage />} />
          <Route path="/unisex" element={<UnisexPage />} />
          <Route path="/kids" element={<KidsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faqs" element={<FaqPage />} />
          <Route path="/account" element={<AccountPage currentUser={currentUser} authLoading={authLoading} onUserChange={setCurrentUser} />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/wardrobe" element={<WardrobePage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/become-designer" element={<BecomeDesignerPage />} />
          <Route
            path="/designer-onboarding"
            element={
              currentUser ? (
                <DesignerOnboardingPage currentUser={currentUser} setCurrentUser={setCurrentUser} />
              ) : (
                <Navigate to="/?openLogin=true" replace />
              )
            }
          />
          <Route
            path="/designer-studio"
            element={
              currentUser ? (
                <DesignerStudioPage currentUser={currentUser} />
              ) : (
                <Navigate to="/?openLogin=true" replace />
              )
            }
          />
          {/* Login and Register now use AuthModal */}
          <Route path="/verify-otp" element={<VerifyOtpPage />} />
          <Route path="/complete-google-signup" element={<CompleteGoogleSignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ForgotPasswordPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {!isHideLayout && <Footer onShopNow={() => navigate("/market")} />}

      {showFloatingCart && (
        <div className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isNearBottom ? "opacity-0 translate-y-4 pointer-events-none" : "opacity-100 translate-y-0"
        }`}>
          <button
            onClick={() => navigate("/cart")}
            className="h-11 px-5 bg-[#1D1D1F] hover:bg-[#2B2B2B] text-white font-semibold uppercase text-[12px] tracking-[0.2em] flex items-center justify-center gap-2 transition-all duration-300 rounded-xl shadow-sm group hover:scale-[1.02] active:scale-[0.98] cursor-pointer border-none"
          >
            View Bag ({cartCount})
            <ArrowRight
              size={14}
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
        initialView={authInitialView}
        onAppleSignIn={handleAppleSignInAction}
      />
    </div>
  );
}
