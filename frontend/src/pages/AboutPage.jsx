// src/pages/AboutPage.jsx
import { ArrowRight, Zap, Shield, Globe, Users, Mail } from "lucide-react";

const STATS = [
  { value: "0", label: "Middlemen (Direct to Consumer)" },
  { value: "100%", label: "Curated Wardrobes" },
  { value: "NO", label: "Artificial Markups" },
  { value: "Emerging", label: "Independent Creators Only" },
];

const TEAM = [
  { 
    name: "Saketh Chokkapu", 
    role: "Founder & CTO", 
    bio: "The technical mind and strategist behind LuxZera. Building the future of curated digital fashion.",
    img: "/saketh_ch.jpeg",
    email: "chokkapusaketh@gmail.com",
    github: "https://github.com/Ch-saketh",
    username: "ch-saketh"
  },
  { 
    name: "Vivek", 
    role: "Co-Founder & CFO", 
    bio: "Heading business operations, finance, and logistics to make seamless designer commerce possible.",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
    email: "vivek@luxzera.com",
    github: "https://github.com",
    username: "vivek-cfo"
  },
];

const VALUES = [
  { 
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="animate-float">
        <circle cx="10" cy="10" r="6" />
        <line x1="14.5" y1="14.5" x2="20" y2="20" />
        <path d="M10 6 L10 14 M6 10 L14 10" stroke="#F07020" strokeWidth="1" />
      </svg>
    ),
    title: "Discovery First",
    body: "Every piece on LuxZera is curated. We surface fashion you won't find anywhere else — from independent designers to exclusive drops." 
  },
  { 
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="animate-float">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 11l2 2 4-4" stroke="#F07020" />
      </svg>
    ),
    title: "Verified Quality",
    body: "No fake reviews, no inflated prices. Every designer on the platform is verified. Every product is what it says it is." 
  },
  { 
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="animate-float">
        <circle cx="12" cy="12" r="9" />
        <path d="M3.6 9h16.8 M3.6 15h16.8" />
        <path d="M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9z" stroke="#F07020" />
      </svg>
    ),
    title: "Global Reach",
    body: "Designers from London, Paris, Tokyo, and beyond — all accessible in one marketplace. World-class fashion, wherever you are." 
  },
  { 
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="animate-float">
        <circle cx="6" cy="6" r="3" fill="currentColor" fillOpacity="0.1" />
        <circle cx="18" cy="18" r="3" fill="currentColor" fillOpacity="0.1" stroke="#F07020" />
        <circle cx="18" cy="6" r="2" />
        <circle cx="6" cy="18" r="2" />
        <line x1="9" y1="6" x2="16" y2="6" />
        <line x1="6" y1="9" x2="6" y2="16" />
        <line x1="8" y1="8" x2="16" y2="16" stroke="#F07020" strokeDasharray="2 2" />
      </svg>
    ),
    title: "Creator Ecosystem",
    body: "Built for both shoppers and creators. Independent designers, fashion students, and emerging labels can launch and grow here." 
  },
];

export default function AboutPage({ onShopNow }) {
  return (
    <div className="min-h-screen bg-[#FAF9F7] font-sans">

      {/* Subtle, Professional Animations */}
      <style>{`
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(0.5deg); }
        }
        @keyframes pulse-soft {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.9; }
        }
        .animate-float {
          animation: float-gentle 6s ease-in-out infinite;
        }
        .animate-pulse-soft {
          animation: pulse-soft 4s ease-in-out infinite;
        }
        .doodle-card {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .doodle-card:hover {
          transform: translateY(-2px);
          border-color: rgba(91, 110, 245, 0.3);
        }
        .svg-container {
          transition: all 0.3s ease;
        }
        .doodle-card:hover .svg-container {
          transform: scale(1.03);
          background-color: #FAF9F7;
        }
      `}</style>

      {/* ── Hero ── */}
      <div className="relative bg-[#FAF9F7] border-b border-[#E7E3DD] py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-premium-grid opacity-[0.025] pointer-events-none" />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="h-px w-5 bg-[#C6A15B]" />
              <p className="text-[8.5px] font-extrabold uppercase tracking-[0.38em] text-[#C6A15B]">
                Who We Are
              </p>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase leading-[0.88] tracking-[-0.025em] text-[#2B2B2B]">
              Built<br />
              <span style={{ color: "#5B6EF5" }}>Different.</span><br />
              <span style={{ color: "#1E2D4A" }}>Always.</span>
            </h1>
            <p className="mt-8 text-[13px] text-[#2B2B2B]/55 leading-[1.75] max-w-lg font-medium">
              LuxZera is a premium fashion marketplace built for discovery — where independent designers, established labels, and emerging talent meet modern shoppers who want something real.
            </p>
          </div>

          {/* Large Hero Illustration (Orbit & Diamond) */}
          <div className="relative shrink-0 w-44 h-44 bg-[#F2EFEA] rounded-full border border-[#E7E3DD] flex items-center justify-center animate-float hidden lg:flex">
            <div className="absolute inset-2 border border-dashed border-[#2B2B2B]/10 rounded-full animate-pulse-soft" />
            <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="#2B2B2B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="50" cy="50" r="32" strokeDasharray="4 4" className="text-[#2B2B2B]/20" />
              <circle cx="50" cy="50" r="20" />
              {/* Intersecting diamond */}
              <path d="M50 15 L80 50 L50 85 L20 50 Z" stroke="#F07020" />
              {/* Central node */}
              <circle cx="50" cy="50" r="4" fill="#2B2B2B" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="bg-[#5B6EF5]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4">
          {STATS.map(({ value, label }) => (
            <div key={label} className="py-8 px-4 border-r border-[#FAF9F7]/15 last:border-0 text-center">
              <p className="text-3xl md:text-4xl font-black text-[#FAF9F7]">{value}</p>
              <p className="text-[9px] font-extrabold uppercase tracking-[0.3em] text-[#FAF9F7]/55 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Story ── */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center border-b border-[#E7E3DD]">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="h-px w-5 bg-[#C97A5A]" />
            <p className="text-[8.5px] font-extrabold uppercase tracking-[0.38em] text-[#C97A5A]">The Origin</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase leading-[0.9] tracking-tight text-[#2B2B2B] mb-8">
            Tired of<br />
            <span style={{ color: "#F07020" }}>the ordinary.</span>
          </h2>
          <div className="space-y-4 text-[13px] text-[#2B2B2B]/55 leading-[1.75] font-medium">
            <p>
              In 2024, our founder walked away from traditional fashion retail — the markups, the gatekeeping, the 12-week lead times. He asked a simple question: why can't great fashion be accessible and discoverable at the same time?
            </p>
            <p>
              LuxZera was built on that principle: <span className="font-extrabold text-[#2B2B2B]">a marketplace where discovery wins.</span> We connect independent designers and brands directly with shoppers who want something genuinely original — no middlemen, no mass-market noise.
            </p>
            <p>
              Today we host 150+ verified designers, ship to customers across the country, and run exclusive weekly drops for our community.
            </p>
          </div>
        </div>

        {/* Image collage */}
        <div className="relative h-[420px]">
          <div className="absolute left-0 top-0 w-[58%] h-[78%] overflow-hidden rounded-2xl border border-[#E7E3DD] bg-[#F2EFEA]">
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80"
              alt="LuxZera fashion"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="absolute right-0 bottom-0 w-[42%] h-[60%] overflow-hidden rounded-2xl border border-[#E7E3DD] bg-[#F2EFEA]">
            <img
              src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80"
              alt="LuxZera product"
              className="w-full h-full object-cover object-top"
            />
          </div>
          {/* Accent block */}
          <div className="absolute right-[39%] top-8 w-10 h-10 rounded-xl z-10 animate-float" style={{ backgroundColor: "#F07020" }} />
        </div>
      </section>

      {/* ── Values ── */}
      <section className="bg-[#F2EFEA] py-20 px-6 border-b border-[#E7E3DD]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-px w-5 bg-[#C6A15B]" />
            <p className="text-[8.5px] font-extrabold uppercase tracking-[0.38em] text-[#C6A15B]">What We Stand For</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase leading-[0.9] tracking-tight text-[#2B2B2B] mb-12">
            Our Values.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map(({ icon, title, body }) => (
              <div key={title}
                className="doodle-card bg-[#FAF9F7] border border-[#E7E3DD] rounded-2xl p-7 transition-all duration-300"
              >
                <div className="svg-container w-11 h-11 bg-[#F2EFEA] rounded-xl flex items-center justify-center text-[#2B2B2B] mb-5 border border-[#E7E3DD] shrink-0">
                  {icon}
                </div>
                <h3 className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#2B2B2B] mb-2">{title}</h3>
                <p className="text-[11.5px] text-[#2B2B2B]/50 leading-[1.7] font-medium">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-b border-[#E7E3DD]">
        <div className="flex items-center gap-2 mb-4">
          <span className="h-px w-5 bg-[#C6A15B]" />
          <p className="text-[8.5px] font-extrabold uppercase tracking-[0.38em] text-[#C6A15B]">The People</p>
        </div>
        <h2 className="text-4xl md:text-5xl font-black uppercase leading-[0.9] tracking-tight text-[#2B2B2B] mb-12">
          Behind the<br />
          <span style={{ color: "#F07020" }}>Drop.</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 max-w-3xl mt-16 mx-auto">
          {TEAM.map(({ name, role, bio, img, email, github }) => (
            <div key={name} className="flex flex-col group text-left">
              
              {/* Profile Image (Aspect Ratio 4/5) */}
              <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#F5F5F7] relative border border-black/[0.04]">
                <img src={img} alt={name} className="w-full h-full object-cover object-center transition-transform duration-[1.2s] ease-out group-hover:scale-[1.015]" />
              </div>

              {/* Founder Details */}
              <div className="pt-6 flex flex-col items-start">
                <h3 className="text-[20px] font-bold text-[#1D1D1F] tracking-tight">{name}</h3>
                <p className="text-[12px] font-semibold text-[#86868B] uppercase tracking-[0.08em] mt-1">{role}</p>
                <p className="text-[13.5px] text-[#515154] mt-3.5 leading-relaxed font-normal">{bio}</p>
                
                {/* Text-Based Contact Links (Apple signature style) */}
                <div className="flex items-center gap-5 mt-5">
                  {email && (
                    <a href={`mailto:${email}`} className="text-[12px] font-semibold text-[#0066CC] hover:underline flex items-center gap-1">
                      Email
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  )}
                  {github && (
                    <a href={github} target="_blank" rel="noopener noreferrer" className="text-[12px] font-semibold text-[#0066CC] hover:underline flex items-center gap-1">
                      GitHub
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="bg-[#1E2D4A] py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: "repeating-linear-gradient(-45deg, #FAF9F7 0, #FAF9F7 1px, transparent 0, transparent 50%)",
            backgroundSize: "14px 14px",
          }}
        />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black uppercase leading-[0.9] tracking-tight text-[#FAF9F7]">
            Ready to<br /><span style={{ color: "#F07020" }}>Shop?</span>
          </h2>
          <button
            onClick={onShopNow}
            className="shrink-0 flex items-center gap-3 bg-[#F07020] hover:bg-[#FAF9F7] hover:text-[#F07020] text-[#FAF9F7] text-[11px] font-extrabold uppercase tracking-[0.28em] px-10 py-5 rounded-full transition-all duration-300 group"
          >
            Browse the Drop
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}