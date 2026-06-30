// src/components/Navbar.jsx
import { useEffect, useRef, useState } from "react";
import { ShoppingBag, User, ShoppingBasket, LogOut, ChevronDown, X, Menu, Search } from "lucide-react";
import AlmirahIcon from "./AlmirahIcon.jsx";

const NAV_LINKS = [
  { label: "For You", value: "shop" },
  { label: "Men",   value: "men"   },
  { label: "Women", value: "women" },
  { label: "Unisex", value: "unisex" },
  { label: "Kids",   value: "kids"   },
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
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const desktopSearchInputRef = useRef(null);
  const mobileSearchInputRef = useRef(null);

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

  useEffect(() => {
    if (searchOpen) {
      window.setTimeout(() => {
        const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
        const input = isDesktop ? desktopSearchInputRef.current : mobileSearchInputRef.current;
        input?.focus();
      }, 180);
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
          <nav className={`flex items-center gap-12 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
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
          <div className="flex items-center gap-6 text-[#2B2B2B] h-full">
            <form
              onSubmit={handleSearchSubmit}
              onKeyDown={handleSearchKeyDown}
              className={`hidden lg:flex items-center h-10 overflow-hidden rounded-full border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                searchOpen
                  ? "w-[390px] gap-2 border-[#E7E3DD] bg-white/90 px-3 shadow-[0_16px_40px_rgba(13,27,42,0.10)] ring-1 ring-white/80 backdrop-blur-xl"
                  : "w-10 gap-0 border-transparent bg-transparent px-0 shadow-none"
              }`}
            >
              <button
                type="button"
                onClick={searchOpen ? undefined : openSearch}
                className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center transition-colors ${
                  searchOpen ? "text-[#5B6EF5]" : "text-[#2B2B2B]/75 hover:text-[#5B6EF5] hover:bg-white/60"
                }`}
                aria-label="Open search"
              >
                <Search size={16} strokeWidth={1.7} />
              </button>
              <input
                ref={desktopSearchInputRef}
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onFocus={() => setSearchOpen(true)}
                placeholder="Search winter fits, linen shirts..."
                className={`min-w-0 flex-1 bg-transparent outline-none text-[12px] font-semibold text-[#2B2B2B] placeholder:text-[#2B2B2B]/35 transition-all duration-300 ${
                  searchOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"
                }`}
              />
              <button
                type="button"
                onClick={closeSearch}
                className={`h-7 w-7 shrink-0 rounded-full bg-[#F2EFEA] text-[#2B2B2B]/55 hover:text-[#2B2B2B] flex items-center justify-center transition-all duration-300 ${
                  searchOpen ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
                }`}
                aria-label="Close search"
              >
                <X size={13} strokeWidth={2} />
              </button>
            </form>

            {/* Wardrobe Icon */}
            <button
              onClick={onWardrobeClick}
              className={`relative flex items-center justify-center transition-colors duration-150 ${
                currentPage === "wardrobe" ? "text-[#C6A15B]" : "text-[#2B2B2B]/75 hover:text-[#C6A15B]"
              }`}
              aria-label="My Wardrobe"
              title="My Wardrobe"
            >
              <AlmirahIcon size={16} strokeWidth={1.5} />
              {wardrobeCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#C6A15B] text-[7px] font-bold text-[#FAF9F7] leading-none">
                  {wardrobeCount}
                </span>
              )}
            </button>

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
                          { icon: <AlmirahIcon size={12} strokeWidth={1.5} />,       label: "Wardrobe",   action: () => { onWardrobeClick?.(); setProfileOpen(false); } },
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
          <button
            onClick={searchOpen ? closeSearch : openSearch}
            className="relative text-[#2B2B2B]/80 hover:text-[#5B6EF5] transition-colors"
            aria-label={searchOpen ? "Close search" : "Open search"}
          >
            {searchOpen ? <X size={17} strokeWidth={1.7} /> : <Search size={17} strokeWidth={1.7} />}
          </button>
          <button onClick={onWardrobeClick} className="relative text-[#2B2B2B]/80 hover:text-[#C6A15B] transition-colors" title="My Wardrobe">
            <AlmirahIcon size={17} strokeWidth={1.5} />
            {wardrobeCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#C6A15B] text-[7px] font-bold text-[#FAF9F7]">
                {wardrobeCount}
              </span>
            )}
          </button>
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

      <div className={`md:hidden sticky top-[3.5rem] z-40 overflow-hidden border-b border-[#E7E3DD] bg-[#FAF9F7]/95 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        searchOpen ? "max-h-20 opacity-100 shadow-[0_18px_35px_rgba(13,27,42,0.08)]" : "max-h-0 opacity-0"
      }`}>
        <form onSubmit={handleSearchSubmit} onKeyDown={handleSearchKeyDown} className="px-5 py-3">
          <div className="flex items-center gap-2 h-11 rounded-full border border-[#E7E3DD] bg-white/90 px-4 ring-1 ring-white/80">
            <Search size={15} strokeWidth={1.7} className="text-[#5B6EF5] shrink-0" />
            <input
              ref={mobileSearchInputRef}
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search with LuxZera AI"
              className="min-w-0 flex-1 bg-transparent outline-none text-[12px] font-semibold text-[#2B2B2B] placeholder:text-[#2B2B2B]/35"
            />
          </div>
        </form>
      </div>

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
