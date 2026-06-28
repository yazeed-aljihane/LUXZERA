// src/App.jsx
import { useState, useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { useCart }     from "./context/CartContext.jsx";
import { useWardrobe } from "./context/WardrobeContext.jsx";

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
import AccountPage  from "./pages/AccountPage.jsx";
import OrdersPage   from "./pages/OrdersPage.jsx";
import KidsPage     from "./pages/KidsPage.jsx";
import WardrobePage from "./pages/WardrobePage.jsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage.jsx";
import BecomeDesignerPage from "./pages/BecomeDesignerPage.jsx";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount }      = useCart();
  const { wardrobeCount }  = useWardrobe();

  const [currentUser, setCurrentUser] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);

  const fetchCurrentUser = async (accessToken) => {
    const response = await fetch("http://localhost:8080/api/users/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error("Unable to load authenticated user profile");
    }

    return response.json();
  };

  // ── ⚡ SPRING BOOT GOOGLE CREDENTIAL HANDLER ──
  const handleCallbackResponse = async (response) => {
    console.log("Encoded JWT ID token received from Google selector");

    if (!response?.credential) {
      console.error("Google credential response did not include an ID token.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken: response.credential }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);

        console.log("BACKEND RESPONSE:", data);

        localStorage.setItem("token", data.accessToken);

        const profile = await fetchCurrentUser(data.accessToken);
        setCurrentUser(profile);
        setAuthOpen(false);
      } else {
        console.error("Spring Boot rejected the token authorization check.");
      }
    } catch (err) {
      console.error("Network error talking to backend server:", err);
    }
  };

  // ── 🔒 STRICT SINGLE INITIALIZATION SYSTEM ──
  useEffect(() => {
    /* global google */
    if (typeof google !== "undefined" && !window.gsiInitialized) {
      google.accounts.id.initialize({
        client_id: "404546324859-b29lgq8vjkpvf7tkov149dpc9sr8hia4.apps.googleusercontent.com", // 🔴 Put your Google Console Client ID here!
        callback: handleCallbackResponse,
        ux_mode: "popup",
        context: "signin",
        auto_select: false, // ⚡ STOPS Google from trying to automatically sign in or send background requests
      });
      window.gsiInitialized = true;
    }
  }, []);

  const handleAppleSignInAction = () => {
    console.log("Apple secure token identity handshake triggered.");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    setAuthOpen(false);
  };

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const profile = await fetchCurrentUser(token);
        setCurrentUser(profile);
      } catch (error) {
        console.error(error);
        localStorage.removeItem("token");
        setCurrentUser(null);
      }
    };

    loadUser();
  }, []);

  const currentPage = (() => {
    if (location.pathname.startsWith("/product"))  return "product";
    if (location.pathname === "/wardrobe")          return "wardrobe";
    if (
      location.pathname.startsWith("/market") ||
      location.pathname.startsWith("/shop")
    ) {
      return "shop";
    }
    return location.pathname.split("/")[1] || "";
  })();

  const showFloatingCart = cartCount > 0 && location.pathname !== "/cart";
  const showNavbar = true;

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
          <Route path="/men"      element={<MenPage />} />
          <Route path="/women"    element={<WomenPage />} />
          <Route path="/unisex"   element={<UnisexPage />} />
          <Route path="/kids"     element={<KidsPage />} />
          <Route path="/wardrobe" element={<WardrobePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/about" element={<AboutPage onShopNow={() => navigate("/market")} />} />
          <Route path="/faqs" element={<FaqPage onShopNow={() => navigate("/market")} />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/become-designer" element={<BecomeDesignerPage />} />

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

      <Footer onShopNow={() => navigate("/market")} />

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