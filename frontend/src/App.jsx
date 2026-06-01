// src/App.jsx

import { useState, useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { useCart } from "./context/CartContext.jsx";

import Hero from "./components/Hero.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import LoginModal from "./components/LoginModal.jsx";

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

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();

  const [loginOpen, setLoginOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {

    const loadUser = async () => {

      const token =
        localStorage.getItem("token");

      if (!token) return;

      try {

        const response = await fetch(
          "http://localhost:8080/api/users/me",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (!response.ok) {

          localStorage.removeItem("token");
          return;
        }

        const profile =
          await response.json();

        setCurrentUser(profile);

      } catch (error) {

        console.error(error);

        localStorage.removeItem("token");
      }
    };

    loadUser();

  }, []);



  const currentPage = (() => {
    if (location.pathname.startsWith("/product")) return "product";
    if (
      location.pathname.startsWith("/market") ||
      location.pathname.startsWith("/shop")
    ) {
      return "shop";
    }

    return location.pathname.split("/")[1] || "";
  })();

  const showFloatingCart =
    cartCount > 0 &&
    location.pathname !== "/cart";

  return (
    <div className="min-h-screen bg-white relative">

      <Navbar
        cartCount={cartCount}
        currentPage={currentPage}
        currentUser={currentUser}
        onLogoClick={() => navigate("/")}
        onShopClick={() => navigate("/market")}
        onMenClick={() => navigate("/men")}
        onWomenClick={() => navigate("/women")}
        onUnisexClick={() => navigate("/unisex")}
        onFaqClick={() => navigate("/faqs")}
        onCartClick={() => navigate("/cart")}
        onAuthClick={() => setLoginOpen(true)}
        onAccountClick={() => navigate("/account")}
        onOrdersClick={() => navigate("/orders")}

      />

      <main>
        <Routes>
          <Route
            path="/account"
            element={<AccountPage />}
          />
          <Route
            path="/orders"
            element={<OrdersPage />}
          />

          <Route
            path="/"
            element={
              <>
                <Hero
                  onShopNow={() => navigate("/market")}
                />

                <Home
                  onShopNow={() => navigate("/market")}
                />
              </>
            }
          />

          <Route
            path="/market"
            element={<MarketPage />}
          />

          <Route
            path="/shop"
            element={
              <Navigate
                to="/market"
                replace
              />
            }
          />

          <Route
            path="/men"
            element={<MenPage />}
          />

          <Route
            path="/women"
            element={<WomenPage />}
          />

          <Route
            path="/unisex"
            element={<UnisexPage />}
          />

          <Route
            path="/product/:id"
            element={<ProductDetailPage />}
          />

          <Route
            path="/cart"
            element={<CartPage />}
          />

          <Route
            path="/about"
            element={
              <AboutPage
                onShopNow={() =>
                  navigate("/market")
                }
              />
            }
          />

          <Route
            path="/faqs"
            element={
              <FaqPage
                onShopNow={() =>
                  navigate("/market")
                }
              />
            }
          />

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

      <Footer
        onShopNow={() => navigate("/market")}
      />

      {showFloatingCart && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
          <button
            onClick={() => navigate("/cart")}
            className="h-12 px-6 bg-[#ff5700] hover:bg-[#0b2240] text-white font-black uppercase text-[11px] tracking-[0.25em] flex items-center justify-center gap-2 transition-all duration-300 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.16)] border border-white/10 group"
          >
            View Bag ({cartCount})

            <ArrowRight
              size={13}
              strokeWidth={3}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </button>
        </div>
      )}

      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={setCurrentUser}
      />

    </div>
  );
}