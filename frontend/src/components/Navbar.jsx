// src/components/Navbar.jsx
import { useEffect, useRef, useState } from "react";
import { ShoppingBag, User, LogOut, X, Menu, Search, Sparkles } from "lucide-react";
import AlmirahIcon from "./AlmirahIcon.jsx";

const NAV_LINKS = [
  { label: "For You", value: "shop" },
  { label: "Men",   value: "men"   },
  { label: "Women", value: "women" },
  { label: "Unisex", value: "unisex" },
  { label: "Kids",   value: "kids"   },
  { label: "Collections", value: "collections" },
  { label: "Designers", value: "designers" },
];

export default function Navbar({
  cartCount = 0,
  wardrobeCount = 0,
  onLogoClick,
  onShopClick,
  onMenClick,
  onWomenClick,
  onUnisexClick,
  onKidsClick,
  onFaqClick,
  onCartClick,
  onWardrobeClick,
  onAuthClick,
  currentPage,
  currentUser,
  onAccountClick,
  onOrdersClick,
  onLogout,
  onSearch,
  onDesignerClick,
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const desktopSearchInputRef = useRef(null);
  const mobileSearchInputRef = useRef(null);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlers = {
    shop:   onShopClick,
    men:    onMenClick,
    women:  onWomenClick,
    unisex: onUnisexClick,
    kids:   onKidsClick,
    collections: onShopClick,
    designers: onDesignerClick,
  };

  const profileImage = currentUser?.profilePicture || currentUser?.avatarUrl || null;
  const profileFullName = currentUser?.firstName
    ? `${currentUser.firstName} ${currentUser.lastName || ""}`.trim()
    : "My Account";
  const profileEmail = currentUser?.email || "";

  const handleLogout = () => { onLogout?.(); setProfileOpen(false); setMobileOpen(false); };

  useEffect(() => {
    if (searchOpen) {
      window.setTimeout(() => {
        const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
        const input = isDesktop ? desktopSearchInputRef.current : mobileSearchInputRef.current;
        input?.focus();
      }, 185);
    }
  }, [searchOpen]);

  const openSearch = () => {
    setSearchOpen(true);
    setProfileOpen(false);
    setMobileOpen(false);
  };

  const closeSearch = () => {
    setSearchOpen(false);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) {
      openSearch();
      return;
    }
    onSearch?.(query);
    setSearchOpen(false);
    setMobileOpen(false);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Escape") {
      closeSearch();
    }
  };

  const navLink = (active) =>
    `text-[12px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 relative py-1 ${
      active 
        ? "text-[#5B6EF5] border-b border-[#5B6EF5]" 
        : "text-[#1D1D1F]/70 hover:text-[#5B6EF5] hover-underline-modern"
    }`;

  const isHome = window.location.pathname === "/";

  return (
    <>
      {/* ════════════════════════════════════════════
          DESKTOP — premium floating navbar
      ════════════════════════════════════════════ */}
      <header
        className={`hidden md:block w-full select-none sticky top-0 z-50 transition-all duration-300 ease-out ${
          isHome && !isScrolled
            ? "bg-transparent border-b border-transparent text-[#1D1D1F]"
            : "bg-white/95 backdrop-blur-md border-b border-[#ECECEC] text-[#1D1D1F]"
        }`}
        style={{ height: "80px" }}
      >
        <div className="h-full max-w-7xl mx-auto flex items-center justify-between px-8">

          {/* LEFT LOGO — Wordmark only */}
          <button 
            onClick={onLogoClick} 
            aria-label="LuxZera home" 
            className="hover:opacity-85 transition-opacity flex items-center shrink-0"
          >
            <img 
              src="/LuxZera.png" 
              alt="LuxZera Wordmark" 
              style={{ height: "26px" }} 
              className="w-auto object-contain" 
            />
          </button>

          {/* CENTER: Navigation Links */}
          <nav className={`flex items-center gap-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            searchOpen ? "opacity-0 scale-[0.98] pointer-events-none -translate-y-0.5" : "opacity-100 scale-100"
          }`}>
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
          <div className="flex items-center gap-6 text-[#1D1D1F] h-full">
            <form
              onSubmit={handleSearchSubmit}
              onKeyDown={handleSearchKeyDown}
              className={`hidden lg:flex items-center h-10 overflow-hidden rounded-full border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                searchOpen
                  ? "w-[320px] gap-2 border-[#ECECEC] bg-white/90 px-3 shadow-[0_8px_32px_rgba(0,0,0,0.03)]"
                  : "w-10 gap-0 border-transparent bg-transparent px-0 shadow-none"
              }`}
            >
              <button
                type="button"
                onClick={searchOpen ? undefined : openSearch}
                className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center transition-colors ${
                  searchOpen ? "text-[#5B6EF5]" : "text-[#1D1D1F]/70 hover:text-[#5B6EF5] hover:bg-white/60"
                }`}
                aria-label="Open search"
              >
                <Search size={18} strokeWidth={1.5} />
              </button>
              <input
                ref={desktopSearchInputRef}
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onFocus={() => setSearchOpen(true)}
                placeholder="Search garments..."
                className={`min-w-0 flex-1 bg-transparent outline-none text-[12px] font-medium text-[#1D1D1F] placeholder:text-[#86868B]/50 transition-all duration-300 ${
                  searchOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"
                }`}
              />
              <button
                type="button"
                onClick={closeSearch}
                className={`h-7 w-7 shrink-0 rounded-full bg-[#FAFAF9] text-[#86868B] hover:text-[#1D1D1F] flex items-center justify-center transition-all duration-300 ${
                  searchOpen ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
                }`}
                aria-label="Close search"
              >
                <X size={14} strokeWidth={2} />
              </button>
            </form>

            {/* Wardrobe Icon (Wishlist) */}
            <button
              onClick={onWardrobeClick}
              className={`relative flex items-center justify-center transition-colors duration-150 ${
                currentPage === "wardrobe" ? "text-[#5B6EF5]" : "text-[#1D1D1F]/70 hover:text-[#5B6EF5]"
              }`}
              aria-label="My Wardrobe"
              title="My Wardrobe"
            >
              <AlmirahIcon size={18} strokeWidth={1.5} />
              {wardrobeCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#5B6EF5] text-[12px] font-bold text-[#FAFAF9] leading-none scale-75">
                  {wardrobeCount}
                </span>
              )}
            </button>

            {/* Cart Icon (Bag) */}
            <button
              onClick={onCartClick}
              className={`relative flex items-center justify-center transition-colors duration-150 ${
                currentPage === "cart" ? "text-[#5B6EF5]" : "text-[#1D1D1F]/70 hover:text-[#5B6EF5]"
              }`}
              aria-label="Shopping cart"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#5B6EF5] text-[12px] font-bold text-[#FAFAF9] leading-none scale-75">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Auth / Profile dropdown */}
            {currentUser ? (
              <div className="flex items-center gap-4">
                {/* Premium Creator Pill Button */}
                <button
                  onClick={onDesignerClick}
                  className="group flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-[#1D1D1F] hover:bg-[#5B6EF5] transition-all duration-200 active:scale-[0.98] shrink-0"
                >
                  <div className="w-[18px] h-[18px] rounded-full bg-[#5B6EF5] group-hover:bg-[#1D1D1F] flex items-center justify-center transition-colors duration-200">
                    <Sparkles size={8} strokeWidth={2.2} className="text-white fill-white/10" />
                  </div>
                  <span className="text-[12px] font-semibold text-[#FAFAF9] tracking-wide select-none">
                    {currentUser?.role === "DESIGNER" || currentUser?.isDesigner ? "Studio Pro" : "Become Creator"}
                  </span>
                </button>

                {/* Profile Trigger */}
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center focus:outline-none"
                    aria-label="User profile menu"
                  >
                    <div className={`w-8 h-8 rounded-full overflow-hidden bg-[#FAFAF9] border border-[#ECECEC] flex items-center justify-center transition-all duration-200 ${
                      profileOpen ? "ring-1 ring-[#5B6EF5] ring-offset-2 ring-offset-[#FAFAF9]" : "hover:scale-[1.02] hover:border-[#5B6EF5]/30"
                    }`}>
                      {profileImage ? (
                        <img src={profileImage} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-[12px] font-bold text-[#1D1D1F]">{currentUser.firstName?.[0] || "U"}</span>
                      )}
                    </div>
                  </button>

                  {profileOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                      <div className="absolute right-0 mt-2.5 w-56 z-50 border border-[#ECECEC] bg-white/95 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.04)] rounded-xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150 origin-top-right">
                        {/* Profile header */}
                        <div className="px-4 py-3 border-b border-[#ECECEC] bg-[#FAFAF9]">
                          <div className="flex items-center gap-1.5 justify-between">
                            <span className="text-[12px] font-semibold text-[#1D1D1F] truncate leading-tight">
                              {profileFullName}
                            </span>
                            {(currentUser?.role === "DESIGNER" || currentUser?.isDesigner) && (
                              <span className="px-1.5 py-0.5 rounded text-[12px] scale-75 font-bold uppercase tracking-wider bg-[#5B6EF5]/10 text-[#5B6EF5] border border-[#5B6EF5]/10 shrink-0">
                                Pro
                              </span>
                            )}
                          </div>
                          <p className="text-[12px] text-[#86868B] truncate mt-1 font-mono tracking-tight leading-none">
                            {profileEmail}
                          </p>
                        </div>

                        {/* Menu */}
                        <div className="p-1 flex flex-col gap-0.5">
                          {[
                            { 
                              icon: <User size={14} strokeWidth={1.5} />, 
                              label: "My Account", 
                              action: () => { onAccountClick?.(); setProfileOpen(false); } 
                            },
                            { 
                              icon: <ShoppingBag size={14} strokeWidth={1.5} />, 
                              label: "Orders", 
                              action: () => { onOrdersClick?.(); setProfileOpen(false); } 
                            },
                            { 
                              icon: <AlmirahIcon size={14} strokeWidth={1.5} />, 
                              label: "Wardrobe", 
                              action: () => { onWardrobeClick?.(); setProfileOpen(false); } 
                            },
                            (currentUser?.role === "DESIGNER" || currentUser?.isDesigner) ? {
                              icon: <Sparkles size={14} strokeWidth={1.5} />,
                              label: "Designer Studio",
                              action: () => { onDesignerClick?.(); setProfileOpen(false); }
                            } : {
                              icon: <Sparkles size={14} strokeWidth={1.5} />,
                              label: "Become Creator",
                              action: () => { onDesignerClick?.(); setProfileOpen(false); }
                            }
                          ].map(({ icon, label, action }) => (
                            <button 
                              key={label} 
                              onClick={action}
                              className="group w-full flex items-center gap-2.5 px-2.5 py-1.5 text-left text-[12px] font-normal rounded-lg text-[#1D1D1F] hover:text-white hover:bg-[#5B6EF5] transition-colors duration-100"
                            >
                              <span className="text-[#86868B] group-hover:text-white transition-colors duration-100">
                                {icon}
                              </span>
                              {label}
                            </button>
                          ))}
                          <div className="h-[1px] bg-[#ECECEC] my-1 mx-1" />
                          <button 
                            onClick={handleLogout}
                            className="group w-full flex items-center gap-2.5 px-2.5 py-1.5 text-left text-[12px] font-medium rounded-lg text-red-600 hover:text-white hover:bg-[#5B6EF5] transition-colors duration-100"
                          >
                            <span className="text-red-500/85 group-hover:text-white transition-colors duration-100">
                              <LogOut size={14} strokeWidth={1.5} className="inline-block" />
                            </span>
                            Sign out
                          </button>
                        </div>

                        {/* Dropdown Footer */}
                        <div className="border-t border-[#ECECEC] py-3 bg-[#FAFAF9] flex items-center justify-center">
                          <img 
                            src="/LuxZera.png" 
                            alt="LuxZera" 
                            style={{ height: "14px" }}
                            className="w-auto object-contain" 
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#1D1D1F]/80 hover:text-[#5B6EF5] transition-colors"
              >
                <User size={18} strokeWidth={1.5} />
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
        className={`md:hidden flex w-full items-center justify-between px-6 sticky top-0 z-50 transition-all duration-300 ease-out ${
          isHome && !isScrolled
            ? "bg-transparent border-b border-transparent text-[#1D1D1F]"
            : "bg-white/95 backdrop-blur-md border-b border-[#ECECEC] text-[#1D1D1F]"
        }`}
        style={{ height: "56px" }}
      >
        {/* Logo Wordmark Only */}
        <button 
          onClick={onLogoClick} 
          className="hover:opacity-85 transition-opacity flex items-center shrink-0"
        >
          <img 
            src="/LuxZera.png" 
            alt="LuxZera Wordmark" 
            style={{ height: "22px" }} 
            className="w-auto object-contain" 
          />
        </button>
        <div className="flex items-center gap-5">
          <button
            onClick={searchOpen ? closeSearch : openSearch}
            className="relative text-[#1D1D1F]/80 hover:text-[#5B6EF5] transition-colors"
            aria-label={searchOpen ? "Close search" : "Open search"}
          >
            {searchOpen ? <X size={18} strokeWidth={1.5} /> : <Search size={18} strokeWidth={1.5} />}
          </button>
          <button onClick={onWardrobeClick} className="relative text-[#1D1D1F]/80 hover:text-[#5B6EF5] transition-colors" title="My Wardrobe">
            <AlmirahIcon size={18} strokeWidth={1.5} />
            {wardrobeCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#5B6EF5] text-[12px] font-bold text-[#FAFAF9] leading-none scale-75">
                {wardrobeCount}
              </span>
            )}
          </button>
          <button onClick={onCartClick} className="relative text-[#1D1D1F]/80 hover:text-[#5B6EF5] transition-colors">
            <ShoppingBag size={18} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#5B6EF5] text-[12px] font-bold text-[#FAFAF9] leading-none scale-75">
                {cartCount}
              </span>
            )}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-[#1D1D1F]/80 hover:text-[#5B6EF5] transition-colors">
            {mobileOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      <div className={`md:hidden sticky top-[3.5rem] z-40 overflow-hidden border-b border-[#ECECEC] bg-white/95 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        searchOpen ? "max-h-20 opacity-100 shadow-[0_8px_24px_rgba(0,0,0,0.02)]" : "max-h-0 opacity-0"
      }`}>
        <form onSubmit={handleSearchSubmit} onKeyDown={handleSearchKeyDown} className="px-5 py-3">
          <div className="flex items-center gap-2 h-11 rounded-full border border-[#ECECEC] bg-white/90 px-4 ring-1 ring-white/80">
            <Search size={16} strokeWidth={1.5} className="text-[#5B6EF5] shrink-0" />
            <input
              ref={mobileSearchInputRef}
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search fits..."
              className="min-w-0 flex-1 bg-transparent outline-none text-[12px] font-semibold text-[#1D1D1F] placeholder:text-[#86868B]/40"
            />
          </div>
        </form>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#FAFAF9] border-b border-[#ECECEC] px-6 py-6 flex flex-col gap-4 z-40 text-[#1D1D1F] animate-in fade-in duration-200">
          {NAV_LINKS.map(({ label, value }) => (
            <button key={value}
              onClick={() => { handlers[value]?.(); setMobileOpen(false); }}
              className={`text-left text-[12px] uppercase tracking-[0.2em] font-medium ${currentPage === value ? "text-[#5B6EF5] font-semibold" : "text-[#1D1D1F]/75"}`}>
              {label}
            </button>
          ))}
          <div className="h-px bg-[#ECECEC] my-2" />
          <button
            onClick={() => { currentUser ? handleLogout() : onAuthClick?.(); setMobileOpen(false); }}
            className="w-full bg-[#1D1D1F] text-[#FAFAF9] text-[12px] uppercase tracking-[0.2em] font-medium py-3 hover:bg-[#5B6EF5] transition-colors rounded-xl">
            {currentUser ? "Sign out" : "Sign in"}
          </button>
        </div>
      )}
    </>
  );
}
