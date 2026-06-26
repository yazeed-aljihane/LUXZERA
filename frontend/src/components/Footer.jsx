// src/components/Footer.jsx
import { useNavigate } from "react-router-dom";

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
    <div className="w-full font-luxury-body">
      
      {/* ═══ MAIN LUXURY FOOTER ═══ */}
      <footer className="w-full bg-[#111111] text-[#F8F6F2] pt-20 pb-12 px-8 lg:px-16 select-none border-t border-[#E8E3DA]/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-20">
            
            {/* Column 1: Brand / Manifesto */}
            <div className="lg:col-span-4 flex flex-col items-start text-left">
              <button 
                onClick={() => handleLinkClick("/")}
                className="mb-5 hover:opacity-85 transition-opacity flex items-center shrink-0"
              >
                <img 
                  src="/LuxZera.png" 
                  alt="LuxZera Logo" 
                  className="h-5 w-auto object-contain" 
                  style={{ filter: "brightness(0) invert(1)" }} 
                />
              </button>
              <p className="text-[10px] text-[#F8F6F2]/50 leading-relaxed font-light uppercase tracking-[0.25em] mt-3 max-w-xs">
                Refined wardrobe essentials, engineered with meticulous attention to detail. Built on quiet luxury and timeless craftsmanship.
              </p>
              <p className="text-[9px] text-[#F8F6F2]/30 font-mono mt-4 tracking-tight">
                Flagship Studio — Paris / Milan
              </p>
            </div>
 
            {/* Column 2: Company Links */}
            <div className="lg:col-span-2 flex flex-col items-start text-left">
              <h4 className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#C9A86A] mb-6">
                Company
              </h4>
              <div className="flex flex-col space-y-3.5">
                {[
                  { label: "About Us", path: "/about" },
                  { label: "Careers", path: "/about" },
                  { label: "Contact Us", path: "/about" },
                  { label: "Privacy Policy", path: "/" }
                ].map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleLinkClick(link.path)}
                    className="text-[11px] font-medium text-[#F8F6F2]/60 hover:text-[#F8F6F2] hover:translate-x-0.5 transition-all uppercase tracking-[0.15em] text-left"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Column 3: Service Links */}
            <div className="lg:col-span-2 flex flex-col items-start text-left">
              <h4 className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#C9A86A] mb-6">
                Service
              </h4>
              <div className="flex flex-col space-y-3.5">
                {[
                  { label: "Payments", path: "/faqs" },
                  { label: "Refunds", path: "/faqs" },
                  { label: "Returns", path: "/faqs" },
                  { label: "Voucher Info", path: "/faqs" }
                ].map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleLinkClick(link.path)}
                    className="text-[11px] font-medium text-[#F8F6F2]/60 hover:text-[#F8F6F2] hover:translate-x-0.5 transition-all uppercase tracking-[0.15em] text-left"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Column 4: Newsletter & Social links */}
            <div className="lg:col-span-4 flex flex-col items-start text-left">
              <h4 className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#C9A86A] mb-6">
                Newsletter
              </h4>
              <p className="text-[10px] text-[#F8F6F2]/50 tracking-[0.15em] uppercase font-light mb-4">
                Subscribe to receive private collection previews.
              </p>
              
              {/* Minimal text-only form */}
              <form onSubmit={(e) => e.preventDefault()} className="flex w-full max-w-sm border-b border-[#E8E3DA]/30 mb-8">
                <input
                  type="email"
                  placeholder="YOUR EMAIL"
                  className="flex-1 bg-transparent text-[10px] py-3 outline-none text-[#F8F6F2] font-medium tracking-[0.2em] placeholder-[#F8F6F2]/30 focus:placeholder-[#F8F6F2]/10 transition-all uppercase"
                  required
                />
                <button
                  type="submit"
                  className="text-[#F8F6F2] hover:text-[#C9A86A] px-4 font-semibold text-[10px] uppercase tracking-[0.25em] transition-colors duration-300 flex items-center justify-center gap-1.5"
                  aria-label="Subscribe to newsletter"
                >
                  Submit
                </button>
              </form>

              {/* Social icons row */}
              <div className="flex items-center gap-6">
                {[
                  { 
                    icon: (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                      </svg>
                    ), 
                    url: "https://instagram.com" 
                  },
                  { 
                    icon: (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor"/>
                      </svg>
                    ), 
                    url: "https://youtube.com" 
                  },
                  { 
                    icon: (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                      </svg>
                    ), 
                    url: "https://facebook.com" 
                  }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F8F6F2]/50 hover:text-[#C9A86A] flex items-center justify-center transition-colors duration-200"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* ─── BOTTOM ROW: COPYRIGHT & METADATA ─── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[#E8E3DA]/10 text-[9px] font-medium uppercase tracking-[0.2em] text-[#F8F6F2]/30">
            <p>© {currentYear} LuxZera. All rights reserved.</p>
            <p className="tracking-widest">Designed at Flagship Studio</p>
          </div>

        </div>
      </footer>

    </div>
  );
}