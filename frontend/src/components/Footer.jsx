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
    <footer className="w-full bg-[#FAF9F7] text-[#2B2B2B] select-none border-t border-[#E7E3DD] font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 pt-24 pb-20">
        
        {/* 12-Column Grid System */}
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT 3 COLUMNS: Integrated Brand Block & Copyright */}
          <div className="col-span-12 lg:col-span-3 flex flex-col items-start justify-between gap-12 lg:gap-0 min-h-[220px]">
            
            {/* Unified Brand Block */}
            <button 
              onClick={() => handleLinkClick("/")}
              className="hover:opacity-85 transition-opacity flex items-center gap-3 cursor-pointer border-none bg-transparent p-0"
              aria-label="LuxZera home"
            >
              <img 
                src="/logo.png" 
                alt="LuxZera Symbol" 
                className="h-9 w-auto object-contain" 
              />
              <img 
                src="/LuxZera.png" 
                alt="LuxZera Wordmark" 
                className="h-6.5 w-auto object-contain mt-0.5" 
              />
            </button>

            {/* Cookie & Copyright Info */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => navigate("/privacy")}
                className="text-[12px] text-[#8F8F8F] hover:text-[#2B2B2B] text-left transition-colors font-normal cursor-pointer border-none bg-transparent p-0"
              >
                Cookie settings
              </button>
              <p className="text-[12px] text-[#8F8F8F] leading-none">
                © {currentYear} LuxZera, Inc.
              </p>
            </div>

          </div>

          {/* RIGHT 9 COLUMNS: Grid of Links */}
          <div className="col-span-12 lg:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Column 1: Company */}
            <div className="flex flex-col">
              <h4 className="text-[13px] font-semibold text-[#8F8F8F] tracking-[0.05em] mb-5 select-none">
                Company
              </h4>
              <div className="flex flex-col gap-3.5">
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
                    className="text-[13px] text-[#2B2B2B]/80 font-medium hover:text-[#F07020] transition-colors text-left cursor-pointer border-none bg-transparent p-0 leading-relaxed"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Column 2: Shop */}
            <div className="flex flex-col">
              <h4 className="text-[13px] font-semibold text-[#8F8F8F] tracking-[0.05em] mb-5 select-none">
                Shop
              </h4>
              <div className="flex flex-col gap-3.5">
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
                    className="text-[13px] text-[#2B2B2B]/85 font-medium hover:text-[#F07020] transition-colors text-left cursor-pointer border-none bg-transparent p-0 leading-relaxed"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Column 3: Resources */}
            <div className="flex flex-col">
              <h4 className="text-[13px] font-semibold text-[#8F8F8F] tracking-[0.05em] mb-5 select-none">
                Resources
              </h4>
              <div className="flex flex-col gap-3.5">
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
                    className="text-[13px] text-[#2B2B2B]/80 font-medium hover:text-[#F07020] transition-colors text-left cursor-pointer border-none bg-transparent p-0 leading-relaxed"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Column 4: LuxZera for */}
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col">
                <h4 className="text-[13px] font-semibold text-[#8F8F8F] tracking-[0.05em] mb-5 select-none">
                  LuxZera for
                </h4>
                <div className="flex flex-col gap-3.5">
                  {[
                    { label: "Enterprise", path: "/about" },
                    { label: "Small business", path: "/about" },
                    { label: "Personal", path: "/about" },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleLinkClick(item.path)}
                      className="text-[13px] text-[#2B2B2B]/80 font-medium hover:text-[#F07020] transition-colors text-left cursor-pointer border-none bg-transparent p-0 leading-relaxed"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Explore more aligned cleanly at the bottom */}
              <button
                onClick={() => handleLinkClick("/market")}
                className="mt-6 text-[13px] font-bold text-[#2B2B2B] hover:text-[#F07020] flex items-center gap-1.5 transition-colors text-left cursor-pointer border-none bg-transparent p-0 group"
              >
                Explore more
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </footer>
  );
}