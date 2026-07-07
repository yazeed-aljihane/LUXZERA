// src/components/Navbar.jsx
import { useEffect, useRef, useState } from "react";
import { ShoppingBag, User, ShoppingBasket, LogOut, ChevronDown, X, Menu, Search, Sparkles } from "lucide-react";
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
  onDesignerClick,
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
    `text-[12px] uppercase tracking-[0.25em] font-semibold transition-all duration-300 relative py-1 ${
      active 
        ? "text-[#F07020] border-b border-[#F07020]" 
        : "text-[#37352F]/75 hover:text-[#F07020] hover-underline-modern"
    }`;

  return (
    <>

      {/* ════════════════════════════════════════════
          DESKTOP — floating glassmorphism navbar
      ════════════════════════════════════════════ */}
      <header
        className="hidden md:block w-full bg-[#FAFAF9]/80 backdrop-blur-md border-b border-[#E7E3DD] select-none sticky top-0 z-50 text-[#37352F] transition-all duration-300"
        style={{ height: "80px" }}
      >
        <div className="h-full max-w-7xl mx-auto flex items-center justify-between px-8">

          {/* LEFT LOGO — Official LuxZera Logo (In its natural premium navy styling) */}
          <button 
            onClick={onLogoClick} 
            aria-label="LuxZera home" 
            className="hover:opacity-85 transition-opacity flex items-center gap-1 shrink-0"
          >
            <img 
              src="/logo.png" 
              alt="LuxZera Icon" 
              style={{ height: "34px" }} 
              className="w-auto object-contain translate-y-[1px]" 
            />
            <img 
              src="/LuxZera.png" 
              alt="LuxZera Wordmark" 
              style={{ height: "26px" }} 
              className="w-auto object-contain" 
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
                  searchOpen ? "text-[#F07020]" : "text-[#2B2B2B]/75 hover:text-[#F07020] hover:bg-white/60"
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
                currentPage === "wardrobe" ? "text-[#C6A15B]" : "text-[#37352F]/75 hover:text-[#C6A15B]"
              }`}
              aria-label="My Wardrobe"
              title="My Wardrobe"
            >
              <AlmirahIcon size={16} strokeWidth={1.5} />
              {wardrobeCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#C6A15B] text-[12px] font-bold text-[#FAFAF9] leading-none scale-75">
                  {wardrobeCount}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button
              onClick={onCartClick}
              className={`relative flex items-center justify-center transition-colors duration-150 ${
                currentPage === "cart" ? "text-[#F07020]" : "text-[#37352F]/75 hover:text-[#F07020]"
              }`}
              aria-label="Shopping cart"
            >
              <ShoppingBag size={16} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#F07020] text-[12px] font-bold text-[#FAFAF9] leading-none scale-75">
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
                  className="group flex items-center gap-2.5 pl-1 pr-3.5 py-1.5 rounded-full bg-[#37352F] hover:bg-[#F07020] transition-all duration-200 active:scale-[0.98] shrink-0"
                >
                  <div className="w-[20px] h-[20px] rounded-full bg-[#F07020] group-hover:bg-[#37352F] flex items-center justify-center transition-colors duration-200">
                    <Sparkles size={10} strokeWidth={2.2} className="text-white fill-white/10 group-hover:text-white" />
                  </div>
                  <span className="text-[12px] font-bold text-[#FAFAF9] tracking-wide select-none">
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
                    <div className={`w-8 h-8 rounded-full overflow-hidden bg-[#FAFAF9] border border-[#37352F]/10 flex items-center justify-center transition-all duration-200 ${
                      profileOpen ? "ring-2 ring-[#F07020] ring-offset-2 ring-offset-[#FAFAF9]" : "hover:scale-102 hover:border-[#F07020]/30"
                    }`}>
                      {profileImage ? (
                        <img src={profileImage} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-[12px] font-bold text-[#37352F]">{currentUser.firstName?.[0] || "U"}</span>
                      )}
                    </div>
                  </button>

                  {profileOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                      <div className="absolute right-0 mt-2.5 w-56 z-50 border border-[#37352F]/10 bg-white/95 backdrop-blur-md shadow-[0_12px_30px_rgba(0,0,0,0.08)] rounded-xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150 origin-top-right">
                        {/* Profile header */}
                        <div className="px-4 py-3 border-b border-[#37352F]/5 bg-[#37352F]/[0.02]">
                          <div className="flex items-center gap-1.5 justify-between">
                            <span className="text-[12px] font-semibold text-[#37352F] truncate leading-tight">
                              {profileFullName}
                            </span>
                            {(currentUser?.role === "DESIGNER" || currentUser?.isDesigner) && (
                              <span className="px-1.5 py-0.5 rounded text-[12px] scale-75 font-bold uppercase tracking-wider bg-[#F07020]/10 text-[#F07020] border border-[#F07020]/10 shrink-0">
                                Pro
                              </span>
                            )}
                          </div>
                          <p className="text-[12px] text-[#37352F]/45 truncate mt-1 font-mono tracking-tight leading-none">
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
                              className="group w-full flex items-center gap-2.5 px-2.5 py-1.5 text-left text-[12px] font-normal rounded-lg text-[#1d1d1f] hover:text-white hover:bg-[#F07020] transition-colors duration-100"
                            >
                              <span className="text-[#1d1d1f]/45 group-hover:text-white transition-colors duration-100">
                                {icon}
                              </span>
                              {label}
                            </button>
                          ))}
                          <div className="h-[1px] bg-[#1d1d1f]/5 my-1 mx-1" />
                          <button 
                            onClick={handleLogout}
                            className="group w-full flex items-center gap-2.5 px-2.5 py-1.5 text-left text-[12px] font-medium rounded-lg text-red-600 hover:text-white hover:bg-[#F07020] transition-colors duration-100"
                          >
                            <span className="text-red-500/85 group-hover:text-white transition-colors duration-100">
                              <LogOut size={14} strokeWidth={1.5} />
                            </span>
                            Sign out
                          </button>
                        </div>

                        {/* Footer */}
                        <div className="border-t border-[#1d1d1f]/5 py-3 bg-[#1d1d1f]/[0.02] flex items-center justify-center">
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
                className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.25em] text-[#37352F]/85 hover:text-[#F07020] transition-colors"
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
        className="md:hidden flex w-full items-center justify-between px-6 bg-[#FAFAF9]/95 backdrop-blur-md border-b border-[#E7E3DD] sticky top-0 z-50 text-[#37352F]"
        style={{ height: "56px" }}
      >
        <button 
          onClick={onLogoClick} 
          className="hover:opacity-85 transition-opacity flex items-center gap-1 shrink-0"
        >
          <img 
            src="/logo.png" 
            alt="LuxZera Icon" 
            style={{ height: "30px" }} 
            className="w-auto object-contain translate-y-[1px]" 
          />
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
            className="relative text-[#37352F]/80 hover:text-[#F07020] transition-colors"
            aria-label={searchOpen ? "Close search" : "Open search"}
          >
            {searchOpen ? <X size={17} strokeWidth={1.7} /> : <Search size={17} strokeWidth={1.7} />}
          </button>
          <button onClick={onWardrobeClick} className="relative text-[#37352F]/80 hover:text-[#C6A15B] transition-colors" title="My Wardrobe">
            <AlmirahIcon size={17} strokeWidth={1.5} />
            {wardrobeCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#C6A15B] text-[12px] font-bold text-[#FAFAF9] leading-none scale-75">
                {wardrobeCount}
              </span>
            )}
          </button>
          <button onClick={onCartClick} className="relative text-[#37352F]/80 hover:text-[#F07020] transition-colors">
            <ShoppingBag size={17} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#F07020] text-[12px] font-bold text-[#FAFAF9] leading-none scale-75">
                {cartCount}
              </span>
            )}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-[#37352F]/80 hover:text-[#F07020] transition-colors">
            {mobileOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      <div className={`md:hidden sticky top-[3.5rem] z-40 overflow-hidden border-b border-[#E7E3DD] bg-[#FAF9F7]/95 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        searchOpen ? "max-h-20 opacity-100 shadow-[0_18px_35px_rgba(13,27,42,0.08)]" : "max-h-0 opacity-0"
      }`}>
        <form onSubmit={handleSearchSubmit} onKeyDown={handleSearchKeyDown} className="px-5 py-3">
          <div className="flex items-center gap-2 h-11 rounded-full border border-[#E7E3DD] bg-white/90 px-4 ring-1 ring-white/80">
            <Search size={15} strokeWidth={1.7} className="text-[#F07020] shrink-0" />
            <input
              ref={mobileSearchInputRef}
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search fits..."
              className="min-w-0 flex-1 bg-transparent outline-none text-[12px] font-semibold text-[#37352F] placeholder:text-[#37352F]/35"
            />
          </div>
        </form>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#FAFAF9] border-b border-[#E7E3DD] px-6 py-6 flex flex-col gap-4 z-40 text-[#37352F] animate-in fade-in duration-200">
          {NAV_LINKS.map(({ label, value }) => (
            <button key={value}
              onClick={() => { handlers[value]?.(); setMobileOpen(false); }}
              className={`text-left text-[12px] uppercase tracking-[0.2em] font-medium ${currentPage === value ? "text-[#F07020] font-semibold" : "text-[#37352F]/75"}`}>
              {label}
            </button>
          ))}
          <div className="h-px bg-[#E7E3DD] my-2" />
          <button
            onClick={() => { currentUser ? handleLogout() : onAuthClick?.(); setMobileOpen(false); }}
            className="w-full bg-[#37352F] text-[#FAFAF9] text-[12px] uppercase tracking-[0.2em] font-medium py-3 hover:bg-[#F07020] transition-colors rounded-xl">
            {currentUser ? "Sign out" : "Sign in"}
          </button>
        </div>
      )}
    </>
  );
}
