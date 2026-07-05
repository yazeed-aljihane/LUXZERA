// src/components/Footer.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Globe, ChevronDown, ArrowRight } from "lucide-react";

export default function Footer({ onShopNow }) {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [langOpen, setLangOpen] = useState(false);
  const [language, setLanguage] = useState("English (US)");

  const handleLinkClick = (path) => {
    if (path === "/market" && onShopNow) {
      onShopNow();
    } else {
      navigate(path);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-white text-[#2B2B2B] select-none border-t border-[#E7E3DD] font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-14 py-16">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8">
          
          {/* LEFT COLUMN: Brand, Socials, Language, Copyright */}
          <div className="flex flex-col items-start gap-5 max-w-xs shrink-0">
            {/* Logo */}
            <button 
              onClick={() => handleLinkClick("/")}
              className="hover:opacity-85 transition-opacity flex items-center gap-2"
              aria-label="LuxZera home"
            >
              <img 
                src="/LuxZera.png" 
                alt="LuxZera Logo" 
                className="h-6 w-auto object-contain filter drop-shadow-[0_0_2px_rgba(240,112,32,0.15)]" 
              />
            </button>

            {/* Social Icons (Custom SVGs) */}
            <div className="flex items-center gap-4.5 text-[#8F8F8F]">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F07020] transition-colors" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F07020] transition-colors" aria-label="X (Twitter)">
                <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" className="w-[17px] h-[17px]">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F07020] transition-colors" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F07020] transition-colors" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F07020] transition-colors" aria-label="YouTube">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
                </svg>
              </a>
            </div>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="text-[12px] text-[#2B2B2B] border border-[#E7E3DD] bg-white rounded-lg px-3 py-1.5 flex items-center gap-1.5 hover:bg-[#FAF9F7]/50 hover:border-[#1d1d1f]/20 transition-colors"
                aria-label="Language selector"
              >
                <Globe size={13} strokeWidth={1.8} className="text-[#2B2B2B]/60" />
                <span>{language}</span>
                <ChevronDown size={12} strokeWidth={1.8} className="text-[#2B2B2B]/40" />
              </button>

              {langOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                  <div className="absolute left-0 bottom-full mb-2 w-36 z-50 border border-[#1d1d1f]/10 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-lg overflow-hidden py-1">
                    {["English (US)", "Español", "Français", "Deutsch", "日本語"].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setLangOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-[#2B2B2B]/80 hover:text-white hover:bg-[#F07020] transition-colors"
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Cookie Settings & Copyright */}
            <div className="flex flex-col gap-1.5 mt-2">
              <button
                onClick={() => navigate("/privacy")}
                className="text-[12px] text-[#8F8F8F] hover:text-[#2B2B2B] text-left transition-colors"
              >
                Cookie settings
              </button>
              <p className="text-[12px] text-[#8F8F8F]">
                © {currentYear} LuxZera, Inc.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMNS: Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 flex-1">
            {/* Column 1: Company */}
            <div>
              <h4 className="text-[12px] font-semibold text-[#8F8F8F] mb-4">Company</h4>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: "About us", path: "/about" },
                  { label: "Careers", path: "/about" },
                  { label: "Security", path: "/privacy" },
                  { label: "Status", path: "/faqs" },
                  { label: "Terms & privacy", path: "/privacy" },
                  { label: "Your privacy rights", path: "/privacy" },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleLinkClick(item.path)}
                    className="text-[13px] text-[#2B2B2B]/85 font-medium hover:text-[#F07020] transition-colors text-left"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Column 2: Shop */}
            <div>
              <h4 className="text-[12px] font-semibold text-[#8F8F8F] mb-4">Shop</h4>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: "Men's Fashion", path: "/men" },
                  { label: "Women's Fashion", path: "/women" },
                  { label: "Unisex Collection", path: "/unisex" },
                  { label: "Designer Brands", path: "/market" },
                  { label: "New Drops", path: "/market" },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleLinkClick(item.path)}
                    className="text-[13px] text-[#2B2B2B]/85 font-medium hover:text-[#F07020] transition-colors text-left"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Column 3: Resources */}
            <div>
              <h4 className="text-[12px] font-semibold text-[#8F8F8F] mb-4">Resources</h4>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: "Help center", path: "/faqs" },
                  { label: "Pricing", path: "/faqs" },
                  { label: "Blog", path: "/about" },
                  { label: "Community", path: "/about" },
                  { label: "Connections", path: "/about" },
                  { label: "FAQs & Support", path: "/faqs" },
                  { label: "Partner programs", path: "/about" },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleLinkClick(item.path)}
                    className="text-[13px] text-[#2B2B2B]/85 font-medium hover:text-[#F07020] transition-colors text-left"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Column 4: LuxZera for */}
            <div>
              <h4 className="text-[12px] font-semibold text-[#8F8F8F] mb-4">LuxZera for</h4>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: "Enterprise", path: "/about" },
                  { label: "Small business", path: "/about" },
                  { label: "Personal", path: "/about" },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleLinkClick(item.path)}
                    className="text-[13px] text-[#2B2B2B]/85 font-medium hover:text-[#F07020] transition-colors text-left"
                  >
                    {item.label}
                  </button>
                ))}
                
                {/* Explore more button at the bottom */}
                <button
                  onClick={() => handleLinkClick("/market")}
                  className="mt-2 text-[13px] font-bold text-[#2B2B2B] hover:text-[#F07020] flex items-center gap-1.5 transition-colors text-left group"
                >
                  Explore more
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}