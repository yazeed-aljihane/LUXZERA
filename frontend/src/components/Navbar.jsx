// src/components/Navbar.jsx
import { useEffect, useRef, useState } from "react";
import { ShoppingBag, User, LogOut, X, Menu, Search, Sparkles, Settings, ChevronDown } from "lucide-react";
import AlmirahIcon from "./AlmirahIcon.jsx";

const NAV_LINKS = [
  { label: "For You", value: "shop" },
  { label: "Men",   value: "men"   },
  { label: "Women", value: "women" },
  { label: "Unisex", value: "unisex" },
  { label: "Collections", value: "collections" },
];

const PreciseNavButton = ({ label, active, onClick, onMouseEnter, onMouseLeave, children }) => {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative flex items-center gap-1 group py-1.5 cursor-pointer bg-transparent border-none outline-none transition-colors duration-[200ms] ease-out ${
        active ? "text-[#F07020]" : "text-[#6B7280] hover:text-[#F07020]"
      }`}
    >
      <span className="text-[14px] font-bold">
        {label}
      </span>
      {children}
    </button>
  );
};

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
  authLoading,
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
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  
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
    collections: onShopClick,
    designers: onDesignerClick,
  };

  const storageKey = currentUser?.id ? `luxzera_avatar_${currentUser.id}` : null;
  const [localAvatar, setLocalAvatar] = useState(() => {
    return storageKey ? localStorage.getItem(storageKey) : null;
  });

  useEffect(() => {
    if (storageKey) {
      setLocalAvatar(localStorage.getItem(storageKey));
    }
  }, [storageKey]);

  useEffect(() => {
    const handleAvatarUpdate = () => {
      if (storageKey) {
        setLocalAvatar(localStorage.getItem(storageKey));
      }
    };
    window.addEventListener('avatar-updated', handleAvatarUpdate);
    return () => window.removeEventListener('avatar-updated', handleAvatarUpdate);
  }, [storageKey]);

  const profileImage = localAvatar || currentUser?.profilePicture || currentUser?.avatarUrl || null;
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
    `text-[14px] font-bold transition-colors duration-[200ms] ease-out py-1.5 ${
      active 
        ? "text-[#F07020]" 
        : "text-[#6B7280] hover:text-[#F07020]"
    }`;

  const isHome = window.location.pathname === "/";

  return (
    <>
      {/* ════════════════════════════════════════════
          DESKTOP — premium floating navbar
      ════════════════════════════════════════════ */}
      <header
        className={`hidden md:block w-full select-none sticky top-0 z-50 transition-all duration-300 ease-out ${
          !isScrolled
            ? "bg-transparent border-b border-transparent text-[#1D1D1F]"
            : "bg-white/95 backdrop-blur-md border-b border-[#ECECEC] text-[#1D1D1F]"
        }`}
        style={{ height: "64px" }}
      >
        <div className="h-full w-full relative flex items-center justify-between px-8">

          {/* Logo — left edge */}
          <button 
            onClick={onLogoClick} 
            aria-label="LuxZera home" 
            className="hover:opacity-85 transition-opacity flex items-center shrink-0 z-10"
          >
            <img 
              src="/LuxZera.png" 
              alt="LuxZera Wordmark" 
              style={{ height: "38px" }} 
              className="w-auto object-contain" 
            />
          </button>

          {/* Nav — absolutely centered on viewport */}
          <nav className={`absolute left-1/2 -translate-x-1/2 flex items-center gap-[24px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              searchOpen ? "opacity-0 scale-[0.98] pointer-events-none -translate-y-0.5" : "opacity-100 scale-100"
            }`}>
              {NAV_LINKS.map(({ label, value }) => {
                const isActive = currentPage === value || (currentPage === "" && value === "shop");

                if (value === "collections") {
                  return (
                    <div 
                      key={value}
                      className="relative py-3 flex items-center"
                      onMouseEnter={() => setCollectionsOpen(true)}
                      onMouseLeave={() => setCollectionsOpen(false)}
                    >
                      <PreciseNavButton 
                        label={label}
                        active={isActive}
                        onClick={() => handlers[value]?.()}
                      >
                        <ChevronDown 
                          size={13} 
                          strokeWidth={2.5}
                          className={`transition-transform duration-[250ms] ease-out opacity-60 ${collectionsOpen ? "-rotate-180" : "rotate-0"}`} 
                        />
                      </PreciseNavButton>

                      {/* Mega Menu Dropdown */}
                      <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[520px] bg-white border border-[#ECECEC] rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.03)] z-50 flex gap-12 transition-all duration-[200ms] ease-out ${
                        collectionsOpen 
                          ? "opacity-100 translate-y-0 pointer-events-auto" 
                          : "opacity-0 translate-y-1 pointer-events-none"
                      }`}>
                        {/* Column 1: Category */}
                        <div className="flex-1 flex flex-col gap-3">
                          <span className="px-2.5 text-[12px] font-medium text-[#86868B]">Category</span>
                          <div className="flex flex-col gap-1">
                            <button onClick={onMenClick} className="w-full text-left px-2.5 py-1.5 text-[14px] font-medium text-[#1D1D1F] rounded-lg hover:bg-[#F5F5F5] transition-colors duration-[180ms] ease-out border-none bg-transparent cursor-pointer">Men</button>
                            <button onClick={onWomenClick} className="w-full text-left px-2.5 py-1.5 text-[14px] font-medium text-[#1D1D1F] rounded-lg hover:bg-[#F5F5F5] transition-colors duration-[180ms] ease-out border-none bg-transparent cursor-pointer">Women</button>
                            <button onClick={onUnisexClick} className="w-full text-left px-2.5 py-1.5 text-[14px] font-medium text-[#1D1D1F] rounded-lg hover:bg-[#F5F5F5] transition-colors duration-[180ms] ease-out border-none bg-transparent cursor-pointer">Unisex</button>
                          </div>
                        </div>

                        {/* Column 2: Collections */}
                        <div className="flex-1 flex flex-col gap-3">
                          <span className="px-2.5 text-[12px] font-medium text-[#86868B]">Collections</span>
                          <div className="flex flex-col gap-1">
                            <button onClick={onShopClick} className="w-full text-left px-2.5 py-1.5 text-[14px] font-medium text-[#1D1D1F] rounded-lg hover:bg-[#F5F5F5] transition-colors duration-[180ms] ease-out border-none bg-transparent cursor-pointer">New Arrivals</button>
                            <button onClick={onShopClick} className="w-full text-left px-2.5 py-1.5 text-[14px] font-medium text-[#1D1D1F] rounded-lg hover:bg-[#F5F5F5] transition-colors duration-[180ms] ease-out border-none bg-transparent cursor-pointer">Trending</button>
                            <button onClick={onShopClick} className="w-full text-left px-2.5 py-1.5 text-[14px] font-medium text-[#1D1D1F] rounded-lg hover:bg-[#F5F5F5] transition-colors duration-[180ms] ease-out border-none bg-transparent cursor-pointer">Summer</button>
                            <button onClick={onShopClick} className="w-full text-left px-2.5 py-1.5 text-[14px] font-medium text-[#1D1D1F] rounded-lg hover:bg-[#F5F5F5] transition-colors duration-[180ms] ease-out border-none bg-transparent cursor-pointer">Winter</button>
                          </div>
                        </div>

                        {/* Column 3: Designers */}
                        <div className="flex-1 flex flex-col gap-3">
                          <span className="px-2.5 text-[12px] font-medium text-[#86868B]">Designers</span>
                          <div className="flex flex-col gap-1">
                            <button onClick={onDesignerClick} className="w-full text-left px-2.5 py-1.5 text-[14px] font-medium text-[#1D1D1F] rounded-lg hover:bg-[#F5F5F5] transition-colors duration-[180ms] ease-out border-none bg-transparent cursor-pointer">Featured Designers</button>
                            <button onClick={onDesignerClick} className="w-full text-left px-2.5 py-1.5 text-[14px] font-medium text-[#1D1D1F] rounded-lg hover:bg-[#F5F5F5] transition-colors duration-[180ms] ease-out border-none bg-transparent cursor-pointer">Emerging Designers</button>
                            <button onClick={onDesignerClick} className="w-full text-left px-2.5 py-1.5 text-[14px] font-medium text-[#1D1D1F] rounded-lg hover:bg-[#F5F5F5] transition-colors duration-[180ms] ease-out border-none bg-transparent cursor-pointer">Independent Brands</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <PreciseNavButton 
                    key={value}
                    label={label}
                    active={isActive}
                    onClick={() => handlers[value]?.()}
                  />
                );
              })}
          </nav>

          {/* Right icons — right edge, z-10 to sit above the absolute nav if they ever overlap */}
          <div className="flex items-center gap-5 text-[#1D1D1F] z-10">
            {/* Designers CTA — like Notion's 'Get Notion free' */}
            <button
              onClick={onDesignerClick}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1D1D1F] text-white text-[13px] font-medium tracking-[0.01em] hover:bg-[#2B2B2B] transition-colors duration-[180ms] ease-out shrink-0"
            >
              For Designers
            </button>

            <form
              onSubmit={handleSearchSubmit}
              onKeyDown={handleSearchKeyDown}
              className={`hidden lg:flex items-center h-10 overflow-hidden rounded-full border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                searchOpen
                  ? "w-[280px] gap-2 border-[#ECECEC] bg-white/90 px-3 shadow-[0_8px_32px_rgba(0,0,0,0.03)]"
                  : "w-10 gap-0 border-transparent bg-transparent px-0 shadow-none"
              }`}
            >
              <button
                type="button"
                onClick={searchOpen ? undefined : openSearch}
                className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center transition-colors ${
                  searchOpen ? "text-[#1D1D1F]" : "text-[#6B7280] hover:text-[#1D1D1F] hover:bg-white/60"
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
                currentPage === "wardrobe" ? "text-[#1D1D1F]" : "text-[#6B7280] hover:text-[#1D1D1F]"
              }`}
              aria-label="My Wardrobe"
              title="My Wardrobe"
            >
              <AlmirahIcon size={18} strokeWidth={1.5} />
              {wardrobeCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#1D1D1F] text-[9px] font-medium text-white leading-none">
                  {wardrobeCount}
                </span>
              )}
            </button>

            {/* Cart Icon (Bag) */}
            <button
              onClick={onCartClick}
              className={`relative flex items-center justify-center transition-colors duration-150 ${
                currentPage === "cart" ? "text-[#1D1D1F]" : "text-[#6B7280] hover:text-[#1D1D1F]"
              }`}
              aria-label="Shopping cart"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#1D1D1F] text-[9px] font-medium text-white leading-none">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Auth / Profile dropdown */}
            {authLoading ? (
              <div className="w-8 h-8 rounded-full bg-[#FAFAF9] animate-pulse border border-[#ECECEC]" />
            ) : currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center focus:outline-none"
                  aria-label="User profile menu"
                >
                  <div className={`w-8 h-8 rounded-full overflow-hidden bg-[#FAFAF9] border border-[#ECECEC] flex items-center justify-center transition-all duration-200 ${
                    profileOpen ? "ring-1 ring-[#1D1D1F] ring-offset-2 ring-offset-[#FAFAF9]" : "hover:scale-[1.02] hover:border-[#1D1D1F]/30"
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
                    <div className="absolute right-0 mt-3 w-[260px] z-50 bg-white/95 backdrop-blur-2xl border border-[#ECECEC] shadow-[0_16px_48px_rgba(0,0,0,0.08)] rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 origin-top-right">
                      {/* Sleek Profile Header */}
                      <div className="px-5 py-5 flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-[#FAFAF9] border border-[#ECECEC] flex items-center justify-center shrink-0">
                          {profileImage ? (
                            <img src={profileImage} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-[14px] font-semibold text-[#1D1D1F]">{currentUser.firstName?.[0] || "U"}</span>
                          )}
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-[14px] font-semibold text-[#1D1D1F] truncate leading-tight">
                            {profileFullName}
                          </span>
                          <span className="text-[12px] text-[#86868B] truncate leading-tight mt-0.5">
                            {profileEmail}
                          </span>
                        </div>
                      </div>

                      {/* Menu */}
                      <div className="px-2 pb-2 flex flex-col gap-0.5">
                        <div className="h-[1px] bg-[#ECECEC]/70 mb-1.5 mx-2" />
                        
                        {[
                          { 
                            icon: <User size={15} strokeWidth={1.5} />, 
                            label: "My Profile", 
                            action: () => { onAccountClick?.(); setProfileOpen(false); } 
                          },
                          { 
                            icon: <ShoppingBag size={15} strokeWidth={1.5} />, 
                            label: "My Orders", 
                            action: () => { onOrdersClick?.(); setProfileOpen(false); } 
                          },
                          { 
                            icon: <Sparkles size={15} strokeWidth={1.5} />, 
                            label: "Wishlist & Saved", 
                            action: () => { onWardrobeClick?.(); setProfileOpen(false); } 
                          },
                          { 
                            icon: <Settings size={15} strokeWidth={1.5} />, 
                            label: "Account Settings", 
                            action: () => { onAccountClick?.(); setProfileOpen(false); } 
                          }
                        ].map(({ icon, label, action }) => (
                          <button 
                            key={label} 
                            onClick={action}
                            className="group w-full flex items-center gap-3 px-3 py-2 text-left text-[13px] font-medium rounded-xl text-[#1D1D1F] hover:bg-[#FAFAF9] transition-colors duration-150"
                          >
                            <span className="text-[#86868B] group-hover:text-[#1D1D1F] transition-colors duration-150 flex-shrink-0">
                              {icon}
                            </span>
                            {label}
                          </button>
                        ))}
                        
                        <div className="h-[1px] bg-[#ECECEC]/70 my-1.5 mx-2" />
                        
                        <button 
                          onClick={handleLogout}
                          className="group w-full flex items-center gap-3 px-3 py-2 text-left text-[13px] font-medium rounded-xl text-[#1D1D1F] hover:bg-red-50/50 transition-colors duration-150"
                        >
                          <span className="text-[#86868B] group-hover:text-red-500 transition-colors duration-150 flex-shrink-0">
                            <LogOut size={15} strokeWidth={1.5} />
                          </span>
                          <span className="group-hover:text-red-600 transition-colors duration-150">Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="flex items-center gap-1.5 text-[14px] font-medium text-[#6B7280] hover:text-[#1D1D1F] transition-colors"
              >
                <User size={18} strokeWidth={1.5} />
                <span>Sign In</span>
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
          !isScrolled && !mobileOpen
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
            style={{ height: "28px" }} 
            className="w-auto object-contain" 
          />
        </button>
        <div className="flex items-center gap-5">
          <button
            onClick={searchOpen ? closeSearch : openSearch}
            className="relative text-[#6B7280] hover:text-[#1D1D1F] transition-colors"
            aria-label={searchOpen ? "Close search" : "Open search"}
          >
            {searchOpen ? <X size={18} strokeWidth={1.5} /> : <Search size={18} strokeWidth={1.5} />}
          </button>
          <button onClick={onWardrobeClick} className="relative text-[#6B7280] hover:text-[#1D1D1F] transition-colors" title="My Wardrobe">
            <AlmirahIcon size={18} strokeWidth={1.5} />
            {wardrobeCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#1D1D1F] text-[9px] font-medium text-white leading-none">
                {wardrobeCount}
              </span>
            )}
          </button>
          <button onClick={onCartClick} className="relative text-[#6B7280] hover:text-[#1D1D1F] transition-colors">
            <ShoppingBag size={18} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#1D1D1F] text-[9px] font-medium text-white leading-none">
                {cartCount}
              </span>
            )}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-[#6B7280] hover:text-[#1D1D1F] transition-colors">
            {mobileOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      <div className={`md:hidden sticky top-[3.5rem] z-40 overflow-hidden border-b border-[#ECECEC] bg-white/95 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        searchOpen ? "max-h-20 opacity-100 shadow-[0_8px_24px_rgba(0,0,0,0.02)]" : "max-h-0 opacity-0"
      }`}>
        <form onSubmit={handleSearchSubmit} onKeyDown={handleSearchKeyDown} className="px-5 py-3">
          <div className="flex items-center gap-2 h-11 rounded-full border border-[#ECECEC] bg-white/90 px-4 ring-1 ring-white/80">
            <Search size={16} strokeWidth={1.5} className="text-[#1D1D1F] shrink-0" />
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
              className={`text-left text-[14px] font-medium px-3 py-2 rounded-lg transition-colors ${currentPage === value ? "text-[#1D1D1F]" : "text-[#6B7280]"}`}>
              {label}
            </button>
          ))}
          <div className="h-px bg-[#ECECEC] my-2" />
          {/* For Designers CTA */}
          <button
            onClick={() => { onDesignerClick?.(); setMobileOpen(false); }}
            className="w-full bg-[#1D1D1F] text-white text-[13px] font-medium py-3 hover:bg-[#2B2B2B] transition-colors rounded-full">
            For Designers
          </button>
          <button
            onClick={() => { currentUser ? handleLogout() : onAuthClick?.(); setMobileOpen(false); }}
            className="w-full border border-[#ECECEC] text-[#1D1D1F] text-[13px] font-medium py-3 hover:bg-[#F5F5F5] transition-colors rounded-full">
            {currentUser ? "Sign Out" : "Sign In"}
          </button>
        </div>
      )}
    </>
  );
}
