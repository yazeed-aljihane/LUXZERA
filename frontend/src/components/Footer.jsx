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

  const linkClass =
    "text-[14px] font-normal text-[#37352F] hover:text-[#F07020] transition-colors duration-200 text-left cursor-pointer border-none bg-transparent p-0 leading-[28px]";

  return (
    <footer className="w-full bg-[#FAFAF9] border-t border-[#ECECEC] font-sans">
      <div className="max-w-[1440px] mx-auto p-[100px]">
        <div className="max-w-[1280px] mx-auto">

          {/* Footer Grid: Brand (25%) | Nav Columns (75%) */}
          <div className="flex flex-col lg:flex-row lg:items-stretch">

            {/* ── BRAND COLUMN ── */}
            <div className="w-full lg:w-[240px] shrink-0 flex flex-col justify-between items-start">

              {/* Top: Logo Lockup */}
              <button
                onClick={() => handleLinkClick("/")}
                className="hover:opacity-85 transition-opacity flex items-center gap-[5px] cursor-pointer border-none bg-transparent p-0"
                aria-label="LuxZera home"
              >
                <img
                  src="/logo.png"
                  alt="LuxZera Symbol"
                  style={{ height: "52px" }}
                  className="w-auto object-contain translate-y-[1px]"
                />
                <img
                  src="/LuxZera.png"
                  alt="LuxZera Wordmark"
                  style={{ height: "40px" }}
                  className="w-auto object-contain"
                />
              </button>

              {/* Bottom: Meta — pushed to bottom by justify-between */}
              <div className="flex flex-col items-start mt-[32px] lg:mt-0">
                <button
                  onClick={() => navigate("/privacy")}
                  className="text-[12px] text-[#9B9B9B] hover:text-[#37352F] text-left transition-colors duration-200 cursor-pointer border-none bg-transparent p-0 leading-none"
                >
                  Cookie settings
                </button>
                <p className="text-[12px] text-[#9B9B9B] leading-none mt-[10px]">
                  © {currentYear} LuxZera, Inc.
                </p>
              </div>
            </div>

            {/* ── NAVIGATION COLUMNS ── */}
            <div className="w-full lg:flex-1 flex flex-wrap lg:flex-nowrap gap-[70px] items-start mt-[32px] lg:mt-0 lg:pl-[96px]">

              {/* Company */}
              <div className="flex flex-col">
                <h4 className="text-[12px] font-normal text-[#9B9B9B] tracking-[0.5px] mb-[16px] select-none leading-none">
                  Company
                </h4>
                <div className="flex flex-col items-start">
                  {[
                    { label: "About us", path: "/about" },
                    { label: "Careers", path: "/about" },
                    { label: "Security", path: "/privacy" },
                    { label: "Status", path: "/faqs" },
                    { label: "Terms & privacy", path: "/privacy" },
                    { label: "Your privacy rights", path: "/privacy" },
                  ].map((item) => (
                    <button key={item.label} onClick={() => handleLinkClick(item.path)} className={linkClass}>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shop */}
              <div className="flex flex-col">
                <h4 className="text-[12px] font-normal text-[#9B9B9B] tracking-[0.5px] mb-[16px] select-none leading-none">
                  Shop
                </h4>
                <div className="flex flex-col items-start">
                  {[
                    { label: "Men's Fashion", path: "/men" },
                    { label: "Women's Fashion", path: "/women" },
                    { label: "Unisex Collection", path: "/unisex" },
                    { label: "Designer Brands", path: "/market" },
                    { label: "New Drops", path: "/market" },
                  ].map((item) => (
                    <button key={item.label} onClick={() => handleLinkClick(item.path)} className={linkClass}>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Resources */}
              <div className="flex flex-col">
                <h4 className="text-[12px] font-normal text-[#9B9B9B] tracking-[0.5px] mb-[16px] select-none leading-none">
                  Resources
                </h4>
                <div className="flex flex-col items-start">
                  {[
                    { label: "Help center", path: "/faqs" },
                    { label: "Pricing", path: "/faqs" },
                    { label: "Blog", path: "/about" },
                    { label: "Community", path: "/about" },
                    { label: "Connections", path: "/about" },
                    { label: "FAQs & Support", path: "/faqs" },
                    { label: "Partner programs", path: "/about" },
                  ].map((item) => (
                    <button key={item.label} onClick={() => handleLinkClick(item.path)} className={linkClass}>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* LuxZera for */}
              <div className="flex flex-col">
                <h4 className="text-[12px] font-normal text-[#9B9B9B] tracking-[0.5px] mb-[16px] select-none leading-none">
                  LuxZera for
                </h4>
                <div className="flex flex-col items-start">
                  {[
                    { label: "Enterprise", path: "/about" },
                    { label: "Small business", path: "/about" },
                    { label: "Personal", path: "/about" },
                  ].map((item) => (
                    <button key={item.label} onClick={() => handleLinkClick(item.path)} className={linkClass}>
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* Explore more */}
                <button
                  onClick={() => handleLinkClick("/market")}
                  className="mt-[24px] text-[14px] font-medium text-[#37352F] hover:text-[#F07020] flex items-center gap-[6px] transition-colors duration-200 text-left cursor-pointer border-none bg-transparent p-0 group"
                >
                  Explore more
                  <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}