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
    <header className="w-full border-b border-slate-100 bg-white select-none">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* 1. LEFT SIDE BRAND LOGO */}
        <div className="flex shrink-0 items-center">
          <button
            onClick={onLogoClick}
            className="group flex items-center justify-center transition-opacity active:opacity-70"
            aria-label="Go to LuxZera home"
          >
            <img
              src="/LuxZera.png"
              alt="LuxZera Logo"
              className="h-9 w-auto object-contain select-none transition-all duration-300"
            />
          </button>
        </div>

        {/* 2. CENTER NAVIGATION */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary Navigation">
          {DEPARTMENTS.map((dept) => {
            const active = currentPage === dept.value;
            return (
              <button
                key={dept.value}
                onClick={() => handleDepartment(dept.value)}
                className={`text-[15px] font-bold tracking-tight transition-colors duration-150 ${
                  active ? "text-[#ff5700]" : "text-slate-600 hover:text-[#ff5700]"
                }`}
              >
                {dept.label}
              </button>
            );
          })}

          <span className="h-4 w-px bg-slate-200 select-none" />

          {NAV_LINKS.map(({ label, page }) => {
            const active = page === "market" ? isMarketActive : currentPage === page;
            return (
              <button
                key={label}
                onClick={() => handleNavigate(page)}
                className={`text-[15px] font-bold tracking-tight transition-colors duration-150 ${
                  active ? "text-[#ff5700]" : "text-slate-600 hover:text-[#ff5700]"
                }`}
              >
                {label}
              </button>
            );
          })}
        </nav>

        {/* 3. RIGHT UTILITY CONTROLS */}
        <div className="hidden md:flex items-center gap-7 shrink-0">
          
          {/* ── 🛒 SHOPPING BAG TRIGGER (FIXED FLOATING BADGE POSITIONING) ── */}
          <button
            onClick={onCartClick}
            className={`relative flex h-9 w-9 shrink-0 aspect-square items-center justify-center transition-colors duration-150 ${
              isCartActive ? "text-[#ff5700]" : "text-slate-600 hover:text-[#ff5700]"
            }`}
          >
            <ShoppingBag size={22} strokeWidth={2.2} className="shrink-0" />
            {cartCount > 0 && (
              // Adjusted top and right spacing relative to the 22px icon frame so it sits perfectly snug
              <span className="absolute top-0 right-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[9px] font-black leading-none text-white shadow-xs translate-x-1 -translate-y-0.5">
                {cartCount}
              </span>
            )}
          </button>

          {/* ── 👤 USER TRIGGER PROFILE SYSTEM ── */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 py-1 text-slate-600 hover:text-[#ff5700] transition-colors duration-150 group/trigger"
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-700 text-xs font-black uppercase overflow-hidden shrink-0 transition-colors group-hover/trigger:border-[#ff5700]/30 shadow-xs">
                  {currentUser.avatarUrl ? (
                    <img src={currentUser.avatarUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    (currentUser.firstName?.[0] || "S")
                  )}
                </div>
                <span className="text-[15px] font-bold tracking-tight group-hover/trigger:text-[#ff5700] transition-colors">
                  {currentUser.firstName || "Saketh"}
                </span>
                <ChevronDown size={14} strokeWidth={2.5} className="text-slate-400 group-hover/trigger:text-[#ff5700] transition-transform duration-200" />
              </button>

              {profileOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                  
                  {/* Dropdown Card Shell (Widen to w-72 for uncompromised text breathing space) */}
                  <div className="absolute right-0 mt-3 w-72 z-50 overflow-hidden rounded-xl border border-slate-200 bg-white pt-3 pl-3 pr-3 shadow-2xl animate-in fade-in zoom-in-95 duration-100 origin-top-right flex flex-col">
                    
                    {/* USER DETAILS TOP AREA */}
                    <div className="flex items-center gap-3 pb-3 px-1 border-b border-slate-100 group/user cursor-pointer">
                      <div className="w-12 h-12 rounded-full bg-[#0b2240] flex items-center justify-center text-white text-sm font-black uppercase overflow-hidden border border-slate-100 shadow-xs shrink-0">
                        {currentUser.avatarUrl ? (
                          <img src={currentUser.avatarUrl} alt="" className="w-full h-full object-cover" />
                        ) : (
                          (currentUser.firstName?.[0] || "S")
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-slate-900 truncate group-hover/user:text-[#ff5700] transition-colors">
                          {currentUser.firstName ? `${currentUser.firstName} ${currentUser.lastName || ""}` : "Saketh Chokkapu"}
                        </p>
                        <p className="text-[11px] font-medium text-slate-400 truncate mt-0.5">
                          {currentUser.email || "chokkapusaketh@gmail.com"}
                        </p>
                      </div>
                    </div>

                    {/* MENU RUN LINKS */}
                    <div className="space-y-0.5 pt-2 pb-3">
                      <button
                        onClick={() => { onAccountClick?.(); setProfileOpen(false); }}
                        className="w-full flex items-center gap-2.5 px-2.5 py-2 text-left text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-[#ff5700] hover:bg-slate-50 rounded-lg transition-colors group/item"
                      >
                        <User size={13} className="text-slate-400 group-hover/item:text-[#ff5700] transition-colors" />
                        My Account
                      </button>

                      <button
                        onClick={() => { onOrdersClick?.(); setProfileOpen(false); }}
                        className="w-full flex items-center gap-2.5 px-2.5 py-2 text-left text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-[#ff5700] hover:bg-slate-50 rounded-lg transition-colors group/item"
                      >
                        <ShoppingBasket size={13} className="text-slate-400 group-hover/item:text-[#ff5700] transition-colors" />
                        Orders
                      </button>

                      <button
                        onClick={() => setProfileOpen(false)}
                        className="w-full flex items-center gap-2.5 px-2.5 py-2 text-left text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-[#ff5700] hover:bg-slate-50 rounded-lg transition-colors group/item"
                      >
                        <Heart size={13} className="text-slate-400 group-hover/item:text-[#ff5700] transition-colors" />
                        Wishlist
                      </button>

                      <button
                        onClick={() => {
                          localStorage.removeItem("token");
                          window.location.reload();
                        }}
                        className="w-full flex items-center gap-2.5 px-2.5 py-2 text-left text-xs font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <LogOut size={13} className="text-red-400" />
                        Logout
                      </button>
                    </div>

                    {/* BRANDING FOOTER */}
                    <div className="-mx-3 mt-auto h-14 bg-slate-50 border-t border-slate-100 flex items-center justify-center overflow-hidden">
                      <img 
                        src="/LuxZera.png" 
                        alt="LuxZera Platform" 
                        className="h-8 w-auto object-contain select-none" 
                      />
                    </div>

                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={onAuthClick}
              className="border border-[#0b2240] text-[#0b2240] rounded-full px-4 py-1.5 text-[13px] font-medium hover:bg-[#0b2240] hover:text-white transition-colors duration-150"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile menu triggers */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onCartClick}
            className={`relative flex h-8 w-8 items-center justify-center ${isCartActive ? "text-[#ff5700]" : "text-slate-600 hover:text-[#ff5700]"}`}
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
            className="flex h-8 w-8 items-center justify-center text-slate-600 hover:text-[#ff5700]"
          >
            {mobileOpen ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="w-full bg-white border-t border-slate-100 px-6 py-4 md:hidden animate-in fade-in duration-100">
          <div className="flex flex-col gap-3">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept.value}
                onClick={() => handleDepartment(dept.value)}
                className={`text-left text-sm py-1 font-bold transition-colors ${
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