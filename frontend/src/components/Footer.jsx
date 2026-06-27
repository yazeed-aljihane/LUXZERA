// src/components/Footer.jsx
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Footer({ onShopNow }) {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (path) => {
    if (path === "/market" && onShopNow) {
      onShopNow();
    } else {
      navigate(path);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full font-sans">

      {/* ════════════════════════════════════════════
          NEWSLETTER STRIP — Royal Blue
      ════════════════════════════════════════════ */}
      <div className="w-full bg-[#5B6EF5] px-6 md:px-14 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-[8px] font-extrabold uppercase tracking-[0.4em] text-[#FAF9F7]/45 block mb-2">
              — Stay In The Loop
            </span>
            <p className="text-2xl md:text-3xl font-black uppercase tracking-tight text-[#FAF9F7] leading-tight">
              Get Exclusive<br />Drop Alerts
            </p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex w-full max-w-md bg-[#FAF9F7]/12 border border-[#FAF9F7]/25 rounded-full overflow-hidden p-1">
            <input
              type="email"
              placeholder="YOUR EMAIL"
              className="flex-1 bg-transparent text-[10px] px-5 outline-none text-[#FAF9F7] font-semibold tracking-[0.22em] placeholder-[#FAF9F7]/40 uppercase"
              required
            />
            <button
              type="submit"
              className="bg-[#FAF9F7] hover:bg-[#F2EFEA] text-[#5B6EF5] px-6 py-2.5 text-[9px] font-extrabold uppercase tracking-[0.28em] rounded-full transition-all duration-200 shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          MAIN FOOTER BODY — Soft Stone
      ════════════════════════════════════════════ */}
      <footer className="w-full bg-[#F2EFEA] text-[#2B2B2B] select-none border-t border-[#E7E3DD]">

        {/* ── Top link grid ── */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 pt-16 pb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

            {/* Shop */}
            <div>
              <h4 className="text-[8px] font-extrabold uppercase tracking-[0.38em] text-[#C6A15B] mb-6">Shop</h4>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Men",        path: "/men" },
                  { label: "Women",      path: "/women" },
                  { label: "Unisex",     path: "/unisex" },
                  { label: "Designers",  path: "/market" },
                  { label: "New Drops",  path: "/market" },
                ].map((l) => (
                  <button key={l.label} onClick={() => handleLinkClick(l.path)}
                    className="text-[11px] font-bold text-[#2B2B2B]/60 hover:text-[#5B6EF5] transition-colors uppercase tracking-[0.15em] text-left">
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-[8px] font-extrabold uppercase tracking-[0.38em] text-[#C6A15B] mb-6">Company</h4>
              <div className="flex flex-col gap-3">
                {[
                  { label: "About Us",       path: "/about" },
                  { label: "Careers",        path: "/about" },
                  { label: "Contact",        path: "/about" },
                  { label: "Press",          path: "/about" },
                  { label: "Privacy Policy", path: "/" },
                ].map((l) => (
                  <button key={l.label} onClick={() => handleLinkClick(l.path)}
                    className="text-[11px] font-bold text-[#2B2B2B]/60 hover:text-[#5B6EF5] transition-colors uppercase tracking-[0.15em] text-left">
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Service */}
            <div>
              <h4 className="text-[8px] font-extrabold uppercase tracking-[0.38em] text-[#C6A15B] mb-6">Service</h4>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Payments",     path: "/faqs" },
                  { label: "Refunds",      path: "/faqs" },
                  { label: "Returns",      path: "/faqs" },
                  { label: "Voucher Info", path: "/faqs" },
                ].map((l) => (
                  <button key={l.label} onClick={() => handleLinkClick(l.path)}
                    className="text-[11px] font-bold text-[#2B2B2B]/60 hover:text-[#5B6EF5] transition-colors uppercase tracking-[0.15em] text-left">
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-[8px] font-extrabold uppercase tracking-[0.38em] text-[#C6A15B] mb-6">Connect</h4>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Instagram", url: "https://instagram.com" },
                  { label: "YouTube",   url: "https://youtube.com" },
                  { label: "Facebook",  url: "https://facebook.com" },
                ].map((s) => (
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                    className="text-[11px] font-bold text-[#2B2B2B]/60 hover:text-[#5B6EF5] transition-colors uppercase tracking-[0.15em] flex items-center gap-1.5 group">
                    {s.label}
                    <ArrowRight size={9} className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" strokeWidth={2.5} />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── Thin divider ── */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
          <div className="h-px bg-[#E7E3DD]" />
        </div>

        {/* ════════════════════════════════════════════
            GIANT LUXZERA WORDMARK — full-bleed brand statement
        ════════════════════════════════════════════ */}
        <div className="w-full overflow-hidden py-4 relative">
          {/* Subtle gradient overlay on sides */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#F2EFEA] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#F2EFEA] to-transparent z-10 pointer-events-none" />

          <div className="flex items-center justify-center px-6 md:px-10 py-6">
            <img 
              src="/LuxZera.png" 
              alt="LuxZera Logo" 
              width="1200"
              height="343"
              style={{ imageRendering: "auto" }}
              className="w-full max-w-[1200px] h-auto object-contain select-none opacity-95 transition-opacity" 
            />
          </div>
        </div>

        {/* ── Bottom copyright bar ── */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 pb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#E7E3DD] text-[8.5px] font-extrabold uppercase tracking-[0.22em] text-[#2B2B2B]/35">
            <p>© {currentYear} LuxZera. All rights reserved.</p>
            <p>Marketplace · Discovery · Fashion · Independence</p>
          </div>
        </div>

      </footer>
    </div>
  );
}