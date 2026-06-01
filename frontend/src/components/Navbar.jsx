// src/components/Navbar.jsx
import { useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";

const DEPARTMENTS = ["Men", "Women", "Unisex"];
const NAV_LINKS = [{ label: "Market", page: "shop" }, { label: "FAQs", page: "faqs" }];

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
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const departmentHandlers = {
    Men: onMenClick,
    Women: onWomenClick,
    Unisex: onUnisexClick,
  };

  const isMarketActive = ["shop", "product"].includes(currentPage);
  const isCartActive = currentPage === "cart";

  const handleDepartment = (department) => {
    departmentHandlers[department]?.();
    setMobileOpen(false);
  };

  const handleNavigate = (page) => {
    if (page === "faqs") onFaqClick?.();
    else onShopClick?.();
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-5 px-5 lg:px-6">
        <div className="flex min-w-0 items-center gap-5 xl:gap-8">
          
          {/* ─── LUXZERA LOGO CONTAINER (MAXIMUM CLEAR VIEWSCALE) ─── */}
          <button
            onClick={onLogoClick}
            className="group flex shrink-0 flex-col items-start justify-center transition-transform active:scale-[0.98]"
            aria-label="Go to LuxZera home"
          >
            {/* Height frame increased to h-[64px] to allow a massive, un-squeezed logo image bounding box */}
            <div className="h-[64px] flex items-center justify-start">
              {/* Logo height pushed up to h-[52px] for bold visibility, matching premium fashion storefront weight layouts */}
              <img 
                src="/LuxZera.png" 
                alt="LuxZera Logo" 
                className="h-[52px] w-auto object-contain select-none group-hover:opacity-80 transition-opacity duration-200"
              />
            </div>
          </button>

          <nav className="hidden items-center gap-2 lg:flex" aria-label="Departments">
            {DEPARTMENTS.map((department) => {
              const active = currentPage === department.toLowerCase();
              return (
                <button
                  key={department}
                  onClick={() => handleDepartment(department)}
                  className={`group relative border px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.26em] transition-all duration-300 ease-in-out xl:px-5 ${
                    active
                      ? "border-[#0b2240] bg-[#0b2240] text-white"
                      : "border-slate-200 text-[#0b2240] hover:border-[#0b2240]"
                  }`}
                >
                  {department}
                  <span
                    className={`absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#ff5700] transition-all duration-300 ease-in-out ${
                      active ? "scale-100 opacity-100" : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                    }`}
                  />
                </button>
              );
            })}
          </nav>
        </div>

        <div className="hidden items-center justify-end gap-5 lg:flex xl:gap-7">
          <nav className="flex items-center gap-6" aria-label="Primary">
            {NAV_LINKS.map(({ label, page }) => {
              const active = page === "shop" ? isMarketActive : currentPage === page;
              return (
                <button
                  key={label}
                  onClick={() => handleNavigate(page)}
                  className={`group relative text-xs font-black uppercase tracking-[0.25em] transition-all duration-300 ease-in-out ${
                    active ? "text-[#ff5700]" : "text-slate-500 hover:text-[#0b2240]"
                  }`}
                >
                  {label}
                  <span
                    className={`absolute -bottom-2 left-0 h-px bg-[#ff5700] transition-all duration-300 ease-in-out ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          <button
            onClick={onCartClick}
            className={`relative flex h-10 w-10 items-center justify-center transition-all duration-300 ease-in-out ${
              isCartActive ? "text-[#ff5700]" : "text-[#0b2240] hover:text-[#ff5700]"
            }`}
            aria-label={`Cart (${cartCount} items)`}
          >
            <ShoppingBag size={20} strokeWidth={2.2} />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ff5700] px-1 text-[9px] font-black leading-none text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>

          <button
            onClick={onShopClick}
            className="bg-[#0b2240] px-6 py-3.5 text-xs font-black uppercase tracking-[0.24em] text-white transition-all duration-300 ease-in-out hover:bg-[#ff5700] xl:px-8"
          >
            Start Shopping
          </button>

          {currentUser ? (
  <button
    className="border border-transparent px-3 py-3 text-xs font-black uppercase tracking-[0.24em] text-[#0b2240]"
  >
    {currentUser.firstName}
  </button>
) : (
  <button
    onClick={onAuthClick}
    className="border border-transparent px-3 py-3 text-xs font-black uppercase tracking-[0.24em] text-[#0b2240] transition-all duration-300 ease-in-out hover:border-slate-200 hover:text-[#ff5700]"
  >
    Login
  </button>
)}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onCartClick}
            className={`relative flex h-10 w-10 items-center justify-center transition-all duration-300 ease-in-out ${
              isCartActive ? "text-[#ff5700]" : "text-[#0b2240] hover:text-[#ff5700]"
            }`}
            aria-label={`Cart (${cartCount} items)`}
          >
            <ShoppingBag size={20} strokeWidth={2.2} />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ff5700] px-1 text-[9px] font-black leading-none text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center text-[#0b2240] transition-colors duration-300 ease-in-out hover:text-[#ff5700]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} strokeWidth={2.5} /> : <Menu size={22} strokeWidth={2.5} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-100 bg-white px-5 py-5 lg:hidden">
          <div className="grid grid-cols-3 gap-2">
            {DEPARTMENTS.map((department) => (
              <button
                key={department}
                onClick={() => handleDepartment(department)}
                className={`border px-3 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ease-in-out ${
                  currentPage === department.toLowerCase()
                    ? "border-[#0b2240] bg-[#0b2240] text-white"
                    : "border-slate-200 text-[#0b2240] hover:border-[#0b2240]"
                }`}
              >
                {department}
              </button>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2">
            {NAV_LINKS.map(({ label, page }) => (
              <button
                key={label}
                onClick={() => handleNavigate(page)}
                className="border border-slate-100 py-3 text-xs font-black uppercase tracking-[0.24em] text-slate-600 transition-colors duration-300 ease-in-out hover:text-[#ff5700]"
              >
                {label}
              </button>
            ))}
          </div>

          <button
            onClick={() => handleNavigate("shop")}
            className="mt-4 w-full bg-[#0b2240] py-4 text-xs font-black uppercase tracking-[0.24em] text-white transition-all duration-300 ease-in-out hover:bg-[#ff5700]"
          >
            Start Shopping
          </button>

          <button
            onClick={() => { onAuthClick?.(); setMobileOpen(false); }}
            className="mt-3 w-full border border-transparent py-4 text-xs font-black uppercase tracking-[0.24em] text-[#0b2240] transition-all duration-300 ease-in-out hover:border-slate-200 hover:text-[#ff5700]"
          >
            Login / Sign Up
          </button>
        </div>
      )}
    </header>
  );
}
