// src/components/Navbar.jsx
import { useState } from "react";
import { Menu, ShoppingBag, X, User, ShoppingBasket, Heart, LogOut, ChevronDown } from "lucide-react";

const DEPARTMENTS = [
  { label: "Men", value: "men" },
  { label: "Women", value: "women" },
  { label: "Unisex", value: "unisex" }
];
const NAV_LINKS = [
  { label: "Market", page: "market" },
  { label: "FAQs", page: "faqs" }
];

export default function Navbar({
  cartCount = 0,
  onLogoClick,
  onShopClick,
  onMenClick,
  onWomenClick,
  onUnisexClick,
  onFaqClick,
  onCartClick,
  onAuthClick,
  currentPage,
  currentUser,
  onAccountClick,
  onOrdersClick,
}) {
  const departmentHandlers = {
    men: onMenClick,
    women: onWomenClick,
    unisex: onUnisexClick,
  };

  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isMarketActive = ["shop", "product", "market"].includes(currentPage);
  const isCartActive = currentPage === "cart";

  const handleDepartment = (value) => {
    departmentHandlers[value]?.();
    setMobileOpen(false);
  };

  const handleNavigate = (page) => {
    if (page === "faqs") onFaqClick?.();
    else onShopClick?.();
    setMobileOpen(false);
  };

  return (
    // 🍏 APPLE SOLID FLOW LAYOUT: Natural block flow to isolate page tiers cleanly
    <header className="w-full border-b border-slate-100 bg-white select-none">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* LEFT BRAND SECTION (LOGO AMPLIFIED) */}
        <div className="flex shrink-0 items-center">
          <button
            onClick={onLogoClick}
            className="group flex items-center justify-center transition-opacity active:opacity-70"
            aria-label="Go to LuxZera home"
          >
            <img
              src="/LuxZera.png"
              alt="LuxZera Logo"
              className="h-8 w-auto object-contain select-none transition-all duration-300"
            />
          </button>
        </div>

        {/* CENTER LINKS: PERFECTED METRIC BALANCING */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary Navigation">
          {DEPARTMENTS.map((dept) => {
            const active = currentPage === dept.value;
            return (
              <button
                key={dept.value}
                onClick={() => handleDepartment(dept.value)}
                className={`text-[15px] font-bold tracking-tight transition-colors duration-150 ${
                  active ? "text-[#ff5700]" : "text-slate-600 hover:text-black"
                }`}
              >
                {dept.label}
              </button>
            );
          })}

          {/* Minimal Divider Line */}
          <span className="h-4 w-px bg-slate-200 select-none" />

          {NAV_LINKS.map(({ label, page }) => {
            const active = page === "market" ? isMarketActive : currentPage === page;
            return (
              <button
                key={label}
                onClick={() => handleNavigate(page)}
                className={`text-[15px] font-bold tracking-tight transition-colors duration-150 ${
                  active ? "text-[#ff5700]" : "text-slate-600 hover:text-black"
                }`}
              >
                {label}
              </button>
            );
          })}
        </nav>

        {/* RIGHT SYSTEM HUB UTILITIES */}
        <div className="hidden md:flex items-center gap-6 shrink-0">
          
          {/* Shopping Bag Icon Trigger */}
          <button
            onClick={onCartClick}
            className={`relative flex h-9 w-9 items-center justify-center transition-colors duration-150 ${
              isCartActive ? "text-[#ff5700]" : "text-slate-600 hover:text-black"
            }`}
            aria-label={`Cart (${cartCount} items)`}
          >
            <ShoppingBag size={18} strokeWidth={2} />
            {cartCount > 0 && (
              <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[9px] font-bold leading-none text-white">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Account Frame Block */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 py-1 text-slate-600 hover:text-black transition-colors duration-150"
              >
                <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 text-[10px] font-bold uppercase overflow-hidden">
                  {currentUser.avatarUrl ? (
                    <img src={currentUser.avatarUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    (currentUser.firstName?.[0] || "S")
                  )}
                </div>
                <span className="text-[14px] font-medium tracking-tight">
                  {currentUser.firstName || "Saketh"}
                </span>
                <ChevronDown size={12} className={`text-slate-400 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`} />
              </button>

              {profileOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                  <div className="absolute right-0 mt-2 w-56 z-50 overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-xl animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                    
                    <div className="flex items-center gap-2 pb-2 pt-1 px-2 border-b border-slate-100">
                      <div className="w-7 h-7 rounded-full bg-slate-900 flex items-center justify-center text-white text-[10px] font-bold uppercase overflow-hidden">
                        {currentUser.avatarUrl ? (
                          <img src={currentUser.avatarUrl} alt="" className="w-full h-full object-cover" />
                        ) : (
                          (currentUser.firstName?.[0] || "S")
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-slate-900 truncate">
                          {currentUser.firstName} {currentUser.lastName}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate">
                          {currentUser.email || "saketh@luxzera.com"}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-0.5 pt-1.5">
                      <button
                        onClick={() => { onAccountClick?.(); setProfileOpen(false); }}
                        className="w-full flex items-center gap-2 px-2 py-1.5 text-left text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                      >
                        <User size={12} className="text-slate-400" />
                        My Account
                      </button>

                      <button
                        onClick={() => { onOrdersClick?.(); setProfileOpen(false); }}
                        className="w-full flex items-center gap-2 px-2 py-1.5 text-left text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                      >
                        <ShoppingBasket size={12} className="text-slate-400" />
                        Orders
                      </button>

                      <button
                        onClick={() => setProfileOpen(false)}
                        className="w-full flex items-center gap-2 px-2 py-1.5 text-left text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                      >
                        <Heart size={12} className="text-slate-400" />
                        Wishlist
                      </button>

                      <button
                        onClick={() => {
                          localStorage.removeItem("token");
                          window.location.reload();
                        }}
                        className="w-full flex items-center gap-2 px-2 py-1.5 text-left text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <LogOut size={12} className="text-red-400" />
                        Logout
                      </button>
                    </div>

                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={onAuthClick}
              className="bg-slate-900 text-white rounded-full px-4 py-1.5 text-[13px] font-medium hover:bg-slate-800 transition-colors duration-150"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile menu indicators */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onCartClick}
            className={`relative flex h-8 w-8 items-center justify-center ${isCartActive ? "text-[#ff5700]" : "text-slate-600"}`}
          >
            <ShoppingBag size={16} strokeWidth={2} />
            {cartCount > 0 && (
              <span className="absolute right-0 top-0 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-black px-1 text-[8px] font-medium leading-none text-white">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-8 w-8 items-center justify-center text-slate-600"
          >
            {mobileOpen ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Dropdown List */}
      {mobileOpen && (
        <div className="w-full bg-white border-t border-slate-100 px-6 py-4 md:hidden animate-in fade-in duration-100">
          <div className="flex flex-col gap-3">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept.value}
                onClick={() => handleDepartment(dept.value)}
                className={`text-left text-sm py-1 font-bold ${
                  currentPage === dept.value ? "text-[#ff5700]" : "text-slate-600"
                }`}
              >
                {dept.label}
              </button>
            ))}
            {NAV_LINKS.map(({ label, page }) => (
              <button
                key={label}
                onClick={() => handleNavigate(page)}
                className="text-left text-sm py-1 font-bold text-slate-400"
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => { if (currentUser) { localStorage.removeItem("token"); window.location.reload(); } else { onAuthClick?.(); } setMobileOpen(false); }}
              className="mt-2 w-full bg-slate-950 py-2.5 rounded-xl text-center text-xs font-medium text-white"
            >
              {currentUser ? "Logout" : "Sign In"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}