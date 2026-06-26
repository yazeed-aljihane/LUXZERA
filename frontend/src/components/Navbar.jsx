// src/components/Navbar.jsx
import { useState } from "react";
import { ShoppingBag, User, ShoppingBasket, Heart, LogOut, ChevronDown, X, Menu, Search } from "lucide-react";

const NAV_LINKS = [
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
    men:    onMenClick,
    women:  onWomenClick,
    unisex: onUnisexClick,
    kids:   onShopClick,
  };

  const profileImage    = currentUser?.profilePicture || currentUser?.avatarUrl || null;
  const profileFullName = currentUser?.firstName
    ? `${currentUser.firstName} ${currentUser.lastName || ""}`.trim()
    : "My Account";
  const profileEmail = currentUser?.email || "";

  const handleLogout = () => { onLogout?.(); setProfileOpen(false); setMobileOpen(false); };

  const navLink = (active) =>
    `text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-300 relative py-1 ${
      active 
        ? "text-[#111111] font-semibold border-b border-[#C9A86A]" 
        : "text-[#111111]/60 hover:text-[#111111] hover-underline-luxury"
    }`;

  return (
    <>
      {/* ════════════════════════════════════════════
          DESKTOP — quiet luxury sticky glassmorphism header
      ════════════════════════════════════════════ */}
      <header
        className="hidden md:block w-full bg-[#F8F6F2]/80 backdrop-blur-md border-b border-[#E8E3DA] select-none sticky top-0 z-50 font-luxury-body text-[#111111] transition-all duration-300"
        style={{ height: "4.5rem" }}
      >
        <div className="h-full max-w-7xl mx-auto flex items-center justify-between px-10">

          {/* LEFT LOGO — Official LuxZera Image Logo with Matte Black Filter */}
          <button 
            onClick={onLogoClick} 
            aria-label="LuxZera home" 
            className="hover:opacity-80 transition-opacity flex items-center shrink-0"
          >
            <img 
              src="/LuxZera.png" 
              alt="LuxZera Logo" 
              className="h-6 w-auto object-contain" 
              style={{ filter: "brightness(0)" }} 
            />
          </button>

          {/* CENTER: Navigation Links */}
          <nav className="flex items-center gap-10">
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
          <div className="flex items-center gap-6 text-[#111111] h-full">
            {/* Search Toggle */}
            <div className="relative flex items-center">
              {searchOpen && (
                <input
                  type="text"
                  placeholder="Search collection..."
                  className="bg-transparent border-b border-[#111111]/30 text-[11px] uppercase tracking-wider px-2 py-1 outline-none text-[#111111] font-medium animate-in slide-in-from-right-3 duration-200 w-36 mr-2 placeholder-[#111111]/40"
                  autoFocus
                  onBlur={() => setSearchOpen(false)}
                />
              )}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-[#111111]/70 hover:text-[#C9A86A] transition-colors duration-150"
                aria-label="Search items"
              >
                <Search size={17} strokeWidth={1.5} />
              </button>
            </div>

            {/* Cart Icon */}
            <button
              onClick={onCartClick}
              className={`relative flex items-center justify-center transition-colors duration-150 ${
                currentPage === "cart" ? "text-[#C9A86A]" : "text-[#111111]/70 hover:text-[#C9A86A]"
              }`}
              aria-label="Shopping cart"
            >
              <ShoppingBag size={17} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#111111] text-[7px] font-bold text-[#F8F6F2] leading-none">
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
                  <div className="w-[24px] h-[24px] rounded-full overflow-hidden bg-[#E8E3DA] border border-[#111111]/10 flex items-center justify-center text-[9px] font-bold text-[#2A2A2A]">
                    {profileImage
                      ? <img src={profileImage} alt="" className="w-full h-full object-cover" />
                      : (currentUser.firstName?.[0] || "U")}
                  </div>
                  <ChevronDown
                    size={10}
                    strokeWidth={2}
                    className="text-[#111111]/40 group-hover:text-[#C9A86A] transition-colors"
                  />
                </button>

                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                    <div className="absolute right-0 mt-3 w-56 z-50 border border-[#E8E3DA] bg-[#F8F6F2] shadow-[0_10px_30px_rgba(0,0,0,0.05)] overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                      {/* Profile header */}
                      <div className="flex flex-col px-4 pt-4 pb-3 border-b border-[#E8E3DA]">
                        <p className="text-[12px] uppercase tracking-wider font-semibold text-[#111111] leading-tight truncate">{profileFullName}</p>
                        <p className="text-[10px] text-[#111111]/55 truncate mt-1 font-mono tracking-tight">{profileEmail}</p>
                      </div>
                      {/* Menu */}
                      <div className="py-1 px-1">
                        {[
                          { icon: <User size={12} strokeWidth={1.5} />,          label: "My Account", action: () => { onAccountClick?.(); setProfileOpen(false); } },
                          { icon: <ShoppingBasket size={12} strokeWidth={1.5} />, label: "Orders",     action: () => { onOrdersClick?.();  setProfileOpen(false); } },
                          { icon: <Heart size={12} strokeWidth={1.5} />,          label: "Wishlist",   action: () => setProfileOpen(false) },
                        ].map(({ icon, label, action }) => (
                          <button key={label} onClick={action}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-left text-[11px] uppercase tracking-wider font-medium text-[#111111]/70 hover:text-[#111111] hover:bg-[#E8E3DA]/40 transition-colors">
                            <span className="text-[#111111]/40">{icon}</span>{label}
                          </button>
                        ))}
                        <div className="h-px bg-[#E8E3DA] my-1" />
                        <button onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-left text-[11px] uppercase tracking-wider font-semibold text-red-700 hover:bg-red-50/50 transition-colors">
                          <LogOut size={12} strokeWidth={1.5} className="text-red-600" />Logout
                        </button>
                      </div>
                      {/* Footer */}
                      <div className="border-t border-[#E8E3DA] h-10 bg-[#E8E3DA]/20 flex items-center justify-center">
                        <img 
                          src="/LuxZera.png" 
                          alt="LuxZera" 
                          className="h-3 w-auto object-contain opacity-40" 
                          style={{ filter: "brightness(0)" }} 
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#111111]/85 hover:text-[#C9A86A] transition-colors"
              >
                <User size={15} strokeWidth={1.5} />
                <span className="hidden sm:inline">Sign in</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════════
          MOBILE — quiet luxury mobile header
      ════════════════════════════════════════════ */}
      <header
        className="md:hidden flex w-full items-center justify-between px-6 bg-[#F8F6F2]/90 backdrop-blur-md border-b border-[#E8E3DA] sticky top-0 z-50 font-luxury-body text-[#111111]"
        style={{ height: "3.5rem" }}
      >
        <button onClick={onLogoClick} className="flex items-center shrink-0">
          <img 
            src="/LuxZera.png" 
            alt="LuxZera" 
            className="h-5 w-auto object-contain" 
            style={{ filter: "brightness(0)" }} 
          />
        </button>
        <div className="flex items-center gap-5">
          <button onClick={onCartClick} className="relative text-[#111111]/80 hover:text-[#C9A86A] transition-colors">
            <ShoppingBag size={17} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#111111] text-[7px] font-bold text-[#F8F6F2]">
                {cartCount}
              </span>
            )}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-[#111111]/80 hover:text-[#C9A86A] transition-colors">
            {mobileOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="md:hidden bg-[#F8F6F2] border-b border-[#E8E3DA] px-6 py-6 flex flex-col gap-4 z-40 font-luxury-body text-[#111111] animate-in fade-in duration-200">
          {NAV_LINKS.map(({ label, value }) => (
            <button key={value}
              onClick={() => { handlers[value]?.(); setMobileOpen(false); }}
              className={`text-left text-xs uppercase tracking-[0.2em] font-medium ${currentPage === value ? "text-[#C9A86A] font-semibold" : "text-[#111111]/70"}`}>
              {label}
            </button>
          ))}
          <div className="h-px bg-[#E8E3DA] my-2" />
          <button
            onClick={() => { currentUser ? handleLogout() : onAuthClick?.(); setMobileOpen(false); }}
            className="w-full bg-[#111111] text-[#F8F6F2] text-[10px] uppercase tracking-[0.2em] font-medium py-3 hover:bg-[#C9A86A] transition-colors">
            {currentUser ? "Sign out" : "Sign in"}
          </button>
        </div>
      )}
    </>
  );
}