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
    "text-[14px] font-medium text-[#1D1D1F] hover:text-[#5B6EF5] transition-colors duration-200 text-left cursor-pointer border-none bg-transparent p-0 leading-[28px]";

  return (
    <footer className="w-full bg-[#FAFAF9] border-t border-[#ECECEC] font-sans">
      <div className="max-w-[1440px] mx-auto py-24 px-6 md:px-24">
        <div className="max-w-[1280px] mx-auto">

          {/* Footer Grid: Brand (25%) | Nav Columns (75%) */}
          <div className="flex flex-col lg:flex-row lg:items-stretch">

            {/* ── BRAND COLUMN ── */}
            <div className="w-full lg:w-[280px] shrink-0 flex flex-col justify-start items-start gap-8">

              {/* Top: Logo Lockup (Wordmark only) */}
              <button
                onClick={() => handleLinkClick("/")}
                className="hover:opacity-85 transition-opacity flex items-center cursor-pointer border-none bg-transparent p-0"
                aria-label="LuxZera home"
              >
                <img
                  src="/LuxZera.png"
                  alt="LuxZera Wordmark"
                  style={{ height: "56px" }}
                  className="w-auto object-contain"
                />
              </button>

              {/* Bottom: Meta — grouped closely with the logo */}
              <div className="flex flex-col items-start gap-2 mt-auto lg:mt-4">
                <button
                  onClick={() => navigate("/privacy")}
                  className="text-[12px] text-[#86868B] hover:text-[#1D1D1F] text-left transition-colors duration-200 cursor-pointer border-none bg-transparent p-0 leading-none"
                >
                  Cookie settings
                </button>
                <p className="text-[12px] text-[#86868B] leading-none">
                  © {currentYear} LuxZera, Inc.
                </p>
              </div>
            </div>

            {/* ── NAVIGATION COLUMNS ── */}
            <div className="w-full lg:flex-1 flex flex-wrap lg:flex-nowrap gap-16 items-start mt-8 lg:mt-0 lg:pl-24">

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
                    { label: "Designers", path: "/become-designer" },
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
                  className="mt-6 text-[14px] font-medium text-[#1D1D1F] hover:text-[#5B6EF5] flex items-center gap-1.5 transition-colors duration-200 text-left cursor-pointer border-none bg-transparent p-0 group"
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