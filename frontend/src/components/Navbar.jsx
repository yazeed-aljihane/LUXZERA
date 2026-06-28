// src/components/Navbar.jsx
import { useState } from "react";
import { ShoppingBag, User, ShoppingBasket, Heart, LogOut, ChevronDown, X, Menu, Search } from "lucide-react";

const NAV_LINKS = [
  { label: "For You", value: "shop" },
  { label: "Men",   value: "men"   },
  { label: "Women", value: "women" },
  { label: "Unisex", value: "unisex" },
  { label: "Kids",   value: "kids"   },
];

export default function Navbar({
  cartCount = 0,
  onLogoClick,
  onShopClick,
  onMenClick,
  onWomenClick,
  onUnisexClick,
  onKidsClick,
  onFaqClick,
  onCartClick,
  onAuthClick,
  currentPage,
  currentUser,
  onAccountClick,
  onOrdersClick,
  onLogout,
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handlers = {
    shop:   onShopClick,
    men:    onMenClick,
    women:  onWomenClick,
    unisex: onUnisexClick,
    kids:   onKidsClick,
  };

  const profileImage = currentUser?.profilePicture || currentUser?.avatarUrl || null;
  const profileFullName = currentUser?.firstName
    ? `${currentUser.firstName} ${currentUser.lastName || ""}`.trim()
    : "My Account";
  const profileEmail = currentUser?.email || "";

  const handleLogout = () => { onLogout?.(); setProfileOpen(false); setMobileOpen(false); };

  const navLink = (active) =>
    `text-[11px] uppercase tracking-[0.25em] font-semibold transition-all duration-300 relative py-1 ${
      active 
        ? "text-[#5B6EF5] border-b border-[#5B6EF5]" 
        : "text-[#2B2B2B]/75 hover:text-[#5B6EF5] hover-underline-modern"
    }`;

  return (
    <>

      {/* ════════════════════════════════════════════
          DESKTOP — floating glassmorphism navbar
      ════════════════════════════════════════════ */}
      <header
        className="hidden md:block w-full bg-[#FAF9F7]/80 backdrop-blur-md border-b border-[#E7E3DD] select-none sticky top-0 z-50 text-[#2B2B2B] transition-all duration-300"
        style={{ height: "4.5rem" }}
      >
        <div className="h-full max-w-7xl mx-auto flex items-center justify-between px-10">

          {/* LEFT LOGO — Official LuxZera Logo (In its natural premium navy styling) */}
          <button 
            onClick={onLogoClick} 
            aria-label="LuxZera home" 
            className="hover:opacity-85 transition-opacity flex items-center shrink-0"
          >
            <img 
              src="/LuxZera.png" 
              alt="LuxZera Logo" 
              className="h-8 w-auto object-contain" 
            />
          </button>

          {/* CENTER: Navigation Links */}
          <nav className="flex items-center gap-12">
            {NAV_LINKS.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => handlers[value]?.()}
                className={navLink(currentPage === value)}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* RIGHT: Search · Cart · Profile/Auth */}
          <div className="flex items-center gap-6 text-[#2B2B2B] h-full">
            {/* Search Toggle */}
            <div className="relative flex items-center">
              {searchOpen && (
                <input
                  type="text"
                  placeholder="Search collection..."
                  className="bg-transparent border-b border-[#2B2B2B]/30 text-[11px] uppercase tracking-wider px-2 py-1 outline-none text-[#2B2B2B] font-medium animate-in slide-in-from-right-3 duration-200 w-36 mr-2 placeholder-[#2B2B2B]/40"
                  autoFocus
                  onBlur={() => setSearchOpen(false)}
                />
              )}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-[#2B2B2B]/75 hover:text-[#5B6EF5] transition-colors duration-150"
                aria-label="Search items"
              >
                <Search size={16} strokeWidth={1.5} />
              </button>
            </div>

            {/* Cart Icon */}
            <button
              onClick={onCartClick}
              className={`relative flex items-center justify-center transition-colors duration-150 ${
                currentPage === "cart" ? "text-[#5B6EF5]" : "text-[#2B2B2B]/75 hover:text-[#5B6EF5]"
              }`}
              aria-label="Shopping cart"
            >
              <ShoppingBag size={16} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#5B6EF5] text-[7px] font-bold text-[#FAF9F7] leading-none">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Auth / Profile dropdown */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-1 group"
                >
                  <div className="w-[24px] h-[24px] rounded-full overflow-hidden bg-[#F2EFEA] border border-[#2B2B2B]/10 flex items-center justify-center text-[9px] font-bold text-[#2B2B2B]">
                    {profileImage
                      ? <img src={profileImage} alt="" className="w-full h-full object-cover" />
                      : (currentUser.firstName?.[0] || "U")}
                  </div>
                  <ChevronDown
                    size={10}
                    strokeWidth={2}
                    className="text-[#2B2B2B]/40 group-hover:text-[#5B6EF5] transition-colors"
                  />
                </button>

                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                    <div className="absolute right-0 mt-3 w-56 z-50 border border-[#E7E3DD] bg-[#FAF9F7] shadow-[0_10px_30px_rgba(0,0,0,0.04)] overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                      {/* Profile header */}
                      <div className="flex flex-col px-4 pt-4 pb-3 border-b border-[#E7E3DD]">
                        <p className="text-[12px] uppercase tracking-wider font-semibold text-[#2B2B2B] leading-tight truncate">{profileFullName}</p>
                        <p className="text-[10px] text-[#2B2B2B]/55 truncate mt-1 font-mono tracking-tight">{profileEmail}</p>
                      </div>
                      {/* Menu */}
                      <div className="py-1 px-1">
                        {[
                          { icon: <User size={12} strokeWidth={1.5} />,          label: "My Account", action: () => { onAccountClick?.(); setProfileOpen(false); } },
                          { icon: <ShoppingBasket size={12} strokeWidth={1.5} />, label: "Orders",     action: () => { onOrdersClick?.();  setProfileOpen(false); } },
                          { icon: <Heart size={12} strokeWidth={1.5} />,          label: "Wishlist",   action: () => setProfileOpen(false) },
                        ].map(({ icon, label, action }) => (
                          <button key={label} onClick={action}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-left text-[11px] uppercase tracking-wider font-medium text-[#2B2B2B]/75 hover:text-[#5B6EF5] hover:bg-[#F2EFEA]/60 transition-colors">
                            <span className="text-[#2B2B2B]/40">{icon}</span>{label}
                          </button>
                        ))}
                        <div className="h-px bg-[#E7E3DD] my-1" />
                        <button onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-left text-[11px] uppercase tracking-wider font-semibold text-red-700 hover:bg-red-50/50 transition-colors">
                          <LogOut size={12} strokeWidth={1.5} className="text-red-600" />Logout
                        </button>
                      </div>
                      {/* Footer */}
                      <div className="border-t border-[#E7E3DD] h-10 bg-[#F2EFEA]/30 flex items-center justify-center">
                        <img 
                          src="/LuxZera.png" 
                          alt="LuxZera" 
                          className="h-3 w-auto object-contain opacity-60" 
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#2B2B2B]/85 hover:text-[#5B6EF5] transition-colors"
              >
                <User size={16} strokeWidth={1.5} />
                <span className="hidden sm:inline">Sign in</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════════
          MOBILE — premium mobile navbar
      ════════════════════════════════════════════ */}
      <header
        className="md:hidden flex w-full items-center justify-between px-6 bg-[#FAF9F7]/95 backdrop-blur-md border-b border-[#E7E3DD] sticky top-0 z-50 text-[#2B2B2B]"
        style={{ height: "3.5rem" }}
      >
        <button onClick={onLogoClick} className="flex items-center shrink-0">
          <img 
            src="/LuxZera.png" 
            alt="LuxZera" 
            className="h-6 w-auto object-contain" 
          />
        </button>
        <div className="flex items-center gap-5">
          <button onClick={onCartClick} className="relative text-[#2B2B2B]/80 hover:text-[#5B6EF5] transition-colors">
            <ShoppingBag size={17} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#5B6EF5] text-[7px] font-bold text-[#FAF9F7]">
                {cartCount}
              </span>
            )}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-[#2B2B2B]/80 hover:text-[#5B6EF5] transition-colors">
            {mobileOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="md:hidden bg-[#FAF9F7] border-b border-[#E7E3DD] px-6 py-6 flex flex-col gap-4 z-40 text-[#2B2B2B] animate-in fade-in duration-200">
          {NAV_LINKS.map(({ label, value }) => (
            <button key={value}
              onClick={() => { handlers[value]?.(); setMobileOpen(false); }}
              className={`text-left text-xs uppercase tracking-[0.2em] font-medium ${currentPage === value ? "text-[#5B6EF5] font-semibold" : "text-[#2B2B2B]/75"}`}>
              {label}
            </button>
          ))}
          <div className="h-px bg-[#E7E3DD] my-2" />
          <button
            onClick={() => { currentUser ? handleLogout() : onAuthClick?.(); setMobileOpen(false); }}
            className="w-full bg-[#2B2B2B] text-[#FAF9F7] text-[10px] uppercase tracking-[0.2em] font-medium py-3 hover:bg-[#5B6EF5] transition-colors">
            {currentUser ? "Sign out" : "Sign in"}
          </button>
        </div>
      )}
    </>
  );
}