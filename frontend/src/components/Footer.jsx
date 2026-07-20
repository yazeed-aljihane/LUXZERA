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
    "text-[14px] text-[#37352F] hover:text-[#F07020] transition-colors duration-200 text-left cursor-pointer border-none bg-transparent p-0 leading-loose";

  return (
    <footer className="w-full bg-white border-t border-[#ECECEC] font-sans pb-16">
      <div className="max-w-[1440px] mx-auto pt-16 px-6 md:px-12 lg:px-24">
        
        {/* Footer Grid: Brand (25%) | Nav Columns (75%) */}
        <div className="flex flex-col lg:flex-row lg:items-stretch lg:justify-between gap-12 lg:gap-8">

          {/* ── BRAND COLUMN ── */}
          <div className="w-full lg:w-[280px] shrink-0 flex flex-col items-center lg:items-start justify-start gap-8">

            {/* Logo */}
            <button
              onClick={() => handleLinkClick("/")}
              className="hover:opacity-85 transition-opacity flex items-center justify-center lg:justify-start cursor-pointer border-none bg-transparent p-0"
              aria-label="LuxZera home"
            >
              <img
                src="/LuxZera.png"
                alt="LuxZera"
                className="h-14 w-auto object-contain"
              />
            </button>

            {/* Meta */}
            <div className="flex flex-col items-center lg:items-center gap-3 w-full max-w-[200px]">
              <button
                onClick={() => navigate("/privacy")}
                className="text-[13px] text-[#86868B] hover:text-[#37352F] text-center transition-colors duration-200 cursor-pointer border-none bg-transparent p-0 leading-none"
              >
                Cookie settings
              </button>
              <p className="text-[13px] text-[#86868B] leading-none text-center">
                © {currentYear} LuxZera, Inc.
              </p>
            </div>
          </div>

          {/* ── NAVIGATION COLUMNS ── */}
          <div className="w-full lg:flex-1 grid grid-cols-2 md:grid-cols-4 gap-8 lg:pl-16">

            {/* Company */}
            <div className="flex flex-col">
              <h4 className="text-[13px] font-medium text-[#9B9B9B] mb-4 select-none leading-none">
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
              <h4 className="text-[13px] font-medium text-[#9B9B9B] mb-4 select-none leading-none">
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
              <h4 className="text-[13px] font-medium text-[#9B9B9B] mb-4 select-none leading-none">
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
              <h4 className="text-[13px] font-medium text-[#9B9B9B] mb-4 select-none leading-none">
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

                {/* Explore more */}
                <button
                  onClick={() => handleLinkClick("/market")}
                  className="mt-6 text-[14px] font-medium text-[#37352F] hover:text-[#F07020] flex items-center gap-1.5 transition-colors duration-200 cursor-pointer border-none bg-transparent p-0 group"
                >
                  Explore more
                  <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </footer>
  );
}