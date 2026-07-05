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
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-16">
        
        {/* 12-Column Grid System with Optical Offsets */}
        <div className="grid grid-cols-12 gap-y-12 lg:gap-x-8">
          
          {/* LEFT COLUMN: Brand Block & Settings (Columns 1-3) */}
          <div className="col-span-12 lg:col-span-3 flex flex-col items-start">
            
            {/* Unified Brand Block */}
            <div className="flex flex-col items-start">
              <button 
                onClick={() => handleLinkClick("/")}
                className="hover:opacity-85 transition-opacity flex items-center gap-[4px] cursor-pointer border-none bg-transparent p-0 align-top"
                aria-label="LuxZera home"
              >
                <img 
                  src="/logo.png" 
                  alt="LuxZera Symbol" 
                  style={{ height: "28px" }} 
                  className="w-auto object-contain" 
                />
                <img 
                  src="/LuxZera.png" 
                  alt="LuxZera Wordmark" 
                  style={{ height: "22px" }} 
                  className="w-auto object-contain" 
                />
              </button>
              
              {/* Cookie Settings directly below the logo with compact spacing */}
              <button
                onClick={() => navigate("/privacy")}
                className="text-[12px] text-[#8F8F8F] hover:text-[#2B2B2B] text-left transition-colors font-normal cursor-pointer border-none bg-transparent p-0 leading-none mt-6"
              >
                Cookie settings
              </button>
            </div>

            {/* Copyright Info aligned below */}
            <p className="text-[12px] text-[#8F8F8F] leading-none mt-3">
              © {currentYear} LuxZera, Inc.
            </p>

          </div>

          {/* RIGHT COLUMNS: Links aligned to column 4 (Columns 4-12) */}
          <div className="col-span-12 lg:col-span-9 lg:col-start-4 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
            
            {/* Column 1: Company */}
            <div className="flex flex-col">
              <h4 className="text-[11.5px] font-medium text-[#5E5E5E] tracking-[0.08em] uppercase mb-6 select-none leading-none">
                Company
              </h4>
              <div className="flex flex-col gap-[11px] items-start">
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
                    className="text-[13.5px] text-[#2B2B2B]/80 font-normal hover:text-[#F07020] transition-colors text-left cursor-pointer border-none bg-transparent p-0 leading-[1.65]"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Column 2: Shop */}
            <div className="flex flex-col">
              <h4 className="text-[11.5px] font-medium text-[#5E5E5E] tracking-[0.08em] uppercase mb-6 select-none leading-none">
                Shop
              </h4>
              <div className="flex flex-col gap-[11px] items-start">
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
                    className="text-[13.5px] text-[#2B2B2B]/80 font-normal hover:text-[#F07020] transition-colors text-left cursor-pointer border-none bg-transparent p-0 leading-[1.65]"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Column 3: Resources */}
            <div className="flex flex-col">
              <h4 className="text-[11.5px] font-medium text-[#5E5E5E] tracking-[0.08em] uppercase mb-6 select-none leading-none">
                Resources
              </h4>
              <div className="flex flex-col gap-[11px] items-start">
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
                    className="text-[13.5px] text-[#2B2B2B]/80 font-normal hover:text-[#F07020] transition-colors text-left cursor-pointer border-none bg-transparent p-0 leading-[1.65]"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Column 4: LuxZera for */}
            <div className="flex flex-col justify-between h-full min-h-[190px]">
              <div className="flex flex-col">
                <h4 className="text-[11.5px] font-medium text-[#5E5E5E] tracking-[0.08em] uppercase mb-6 select-none leading-none">
                  LuxZera for
                </h4>
                <div className="flex flex-col gap-[11px] items-start">
                  {[
                    { label: "Enterprise", path: "/about" },
                    { label: "Small business", path: "/about" },
                    { label: "Personal", path: "/about" },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleLinkClick(item.path)}
                      className="text-[13.5px] text-[#2B2B2B]/80 font-normal hover:text-[#F07020] transition-colors text-left cursor-pointer border-none bg-transparent p-0 leading-[1.65]"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Explore more aligned cleanly at the bottom */}
              <button
                onClick={() => handleLinkClick("/market")}
                className="mt-6 text-[13px] font-medium text-[#2B2B2B]/75 hover:text-[#F07020] flex items-center gap-1.5 transition-colors text-left cursor-pointer border-none bg-transparent p-0 group"
              >
                Explore more
                <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </footer>
  );
}