// src/components/Navbar.jsx
import { useState } from "react";
import { ShoppingBag, User, ShoppingBasket, Heart, LogOut, ChevronDown, X, Menu } from "lucide-react";

const LEFT_LINKS = [
  { label: "Men",   value: "men"   },
  { label: "Women", value: "women" },
];
const RIGHT_LINKS = [
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

  const handlers = {
    men:    onMenClick,
    women:  onWomenClick,
    unisex: onUnisexClick,
    kids:   onShopClick,
  };

  const profileImage    = currentUser?.profilePicture || currentUser?.avatarUrl || null;
  const profileName     = currentUser?.firstName || "Account";
  const profileFullName = currentUser?.firstName
    ? `${currentUser.firstName} ${currentUser.lastName || ""}`.trim()
    : "My Account";
  const profileEmail = currentUser?.email || "";

  const handleLogout = () => { onLogout?.(); setProfileOpen(false); setMobileOpen(false); };

  const navLink = (active) =>
    `text-[13px] tracking-wide transition-colors duration-150 font-medium ${
      active ? "text-[#ff5700]" : "text-[#1a1a1a]/70 hover:text-[#1a1a1a]"
    }`;

  return (
    <>
      {/* ════════════════════════════════════════════
          DESKTOP — full-width, same bg as hero
      ════════════════════════════════════════════ */}
      <header
        className="hidden md:block w-full bg-[#f0efeb] select-none relative"
        style={{ height: "4rem" }}
      >
        {/* Absolute-fill inner row so logo is always mathematically centred */}
        <div className="absolute inset-0 flex items-center px-10">

          {/* LEFT: Men · Women */}
          <nav className="flex items-center gap-7">
            {LEFT_LINKS.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => handlers[value]?.()}
                className={navLink(currentPage === value)}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* CENTER LOGO — true centre via absolute positioning inside the row */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <button onClick={onLogoClick} aria-label="LuxZera home" className="active:opacity-60 transition-opacity">
              <img src="/LuxZera.png" alt="LuxZera" className="h-[1.75rem] w-auto object-contain" />
            </button>
          </div>

          {/* RIGHT: Unisex · Kids · divider · cart · auth */}
          <div className="ml-auto flex items-center gap-7">
            {RIGHT_LINKS.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => handlers[value]?.()}
                className={navLink(currentPage === value)}
              >
                {label}
              </button>
            ))}

            {/* hairline divider */}
            <span className="h-[14px] w-px bg-[#1a1a1a]/15" />

            {/* Cart */}
            <button
              onClick={onCartClick}
              className={`relative flex items-center justify-center w-8 h-8 transition-colors duration-150 ${
                currentPage === "cart" ? "text-[#ff5700]" : "text-[#1a1a1a]/60 hover:text-[#1a1a1a]"
              }`}
            >
              <ShoppingBag size={19} strokeWidth={1.6} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-[#ff5700] px-1 text-[8px] font-black text-white leading-none">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Auth / Profile */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 group"
                >
                  <div className="w-[30px] h-[30px] rounded-full overflow-hidden bg-slate-200 border border-slate-200 flex items-center justify-center text-[11px] font-bold text-slate-600">
                    {profileImage
                      ? <img src={profileImage} alt="" className="w-full h-full object-cover" />
                      : (currentUser.firstName?.[0] || "U")}
                  </div>
                  <ChevronDown
                    size={12}
                    strokeWidth={2.5}
                    className="text-[#1a1a1a]/40 group-hover:text-[#1a1a1a] transition-colors"
                  />
                </button>

                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                    <div className="absolute right-0 mt-3 w-60 z-50 rounded-2xl border border-slate-100 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                      {/* Profile header */}
                      <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-slate-100">
                        <div className="w-9 h-9 rounded-full bg-[#0b2240] flex items-center justify-center text-white text-xs font-black overflow-hidden shrink-0">
                          {profileImage ? <img src={profileImage} alt="" className="w-full h-full object-cover" /> : (currentUser.firstName?.[0] || "U")}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-semibold text-slate-900 truncate leading-tight">{profileFullName}</p>
                          <p className="text-[11px] text-slate-400 truncate mt-0.5">{profileEmail}</p>
                        </div>
                      </div>
                      {/* Menu */}
                      <div className="py-2 px-2 space-y-0.5">
                        {[
                          { icon: <User size={13} />,          label: "My Account", action: () => { onAccountClick?.(); setProfileOpen(false); } },
                          { icon: <ShoppingBasket size={13} />, label: "Orders",     action: () => { onOrdersClick?.();  setProfileOpen(false); } },
                          { icon: <Heart size={13} />,          label: "Wishlist",   action: () => setProfileOpen(false) },
                        ].map(({ icon, label, action }) => (
                          <button key={label} onClick={action}
                            className="w-full flex items-center gap-2.5 px-3 py-[9px] text-left text-[12px] font-medium text-slate-600 hover:text-[#1a1a1a] hover:bg-slate-50 rounded-xl transition-colors">
                            <span className="text-slate-300">{icon}</span>{label}
                          </button>
                        ))}
                        <div className="h-px bg-slate-100 mx-1 my-1" />
                        <button onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-3 py-[9px] text-left text-[12px] font-medium text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                          <LogOut size={13} className="text-red-400" />Logout
                        </button>
                      </div>
                      {/* Footer */}
                      <div className="border-t border-slate-100 h-10 bg-slate-50 flex items-center justify-center">
                        <img src="/LuxZera.png" alt="" className="h-5 w-auto object-contain opacity-40" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="text-[13px] font-medium text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors tracking-wide"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════════
          MOBILE
      ════════════════════════════════════════════ */}
      <header
        className="md:hidden flex w-full items-center justify-between px-5 bg-[#f0efeb]"
        style={{ height: "3.5rem" }}
      >
        <button onClick={onLogoClick}>
          <img src="/LuxZera.png" alt="LuxZera" className="h-6 w-auto object-contain" />
        </button>
        <div className="flex items-center gap-4">
          <button onClick={onCartClick} className="relative text-[#1a1a1a]/60">
            <ShoppingBag size={19} strokeWidth={1.6} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ff5700] text-[8px] font-black text-white">
                {cartCount}
              </span>
            )}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-[#1a1a1a]/60">
            {mobileOpen ? <X size={19} strokeWidth={1.6} /> : <Menu size={19} strokeWidth={1.6} />}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="md:hidden bg-[#f0efeb] border-t border-[#1a1a1a]/8 px-5 py-5 flex flex-col gap-4">
          {[...LEFT_LINKS, ...RIGHT_LINKS].map(({ label, value }) => (
            <button key={value}
              onClick={() => { handlers[value]?.(); setMobileOpen(false); }}
              className={`text-left text-[15px] font-medium ${currentPage === value ? "text-[#ff5700]" : "text-[#1a1a1a]/70"}`}>
              {label}
            </button>
          ))}
          <div className="h-px bg-[#1a1a1a]/10 my-1" />
          <button
            onClick={() => { currentUser ? handleLogout() : onAuthClick?.(); setMobileOpen(false); }}
            className="w-full bg-[#1a1a1a] text-white text-[12px] font-semibold tracking-wide py-3 rounded-2xl">
            {currentUser ? "Sign out" : "Sign in"}
          </button>
        </div>
      )}
    </>
  );
}