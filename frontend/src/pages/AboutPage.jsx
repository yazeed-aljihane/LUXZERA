// src/pages/AboutPage.jsx
import { ArrowRight, Zap, Shield, Globe, Users } from "lucide-react";

const STATS = [
  { value: "600+", label: "Orders Shipped" },
  { value: "4.9★", label: "Avg Rating" },
  { value: "30",   label: "Day Returns" },
  { value: "150+", label: "Designers" },
];

const TEAM = [
  { 
    name: "Saketh Chokkapu", 
    role: "Founder & CTO", 
    bio: "The technical mind and strategist behind LuxZera. Building the future of curated digital fashion.",
    img: "/saketh_ch.jpeg" 
  },
  { 
    name: "Vivek", 
    role: "Co-Founder & CFO", 
    bio: "Heading business operations, finance, and logistics to make seamless designer commerce possible.",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80" 
  },
];

const VALUES = [
  { icon: <Zap size={18} strokeWidth={2.5} />,    title: "Discovery First",   body: "Every piece on LuxZera is curated. We surface fashion you won't find anywhere else — from independent designers to exclusive drops." },
  { icon: <Shield size={18} strokeWidth={2.5} />, title: "Verified Quality",  body: "No fake reviews, no inflated prices. Every designer on the platform is verified. Every product is what it says it is." },
  { icon: <Globe size={18} strokeWidth={2.5} />,  title: "Global Reach",      body: "Designers from London, Paris, Tokyo, and beyond — all accessible in one marketplace. World-class fashion, wherever you are." },
  { icon: <Users size={18} strokeWidth={2.5} />,  title: "Creator Ecosystem", body: "Built for both shoppers and creators. Independent designers, fashion students, and emerging labels can launch and grow here." },
];

export default function AboutPage({ onShopNow }) {
  return (
    <div className="min-h-screen bg-[#FAF9F7] font-sans">

      {/* ── Hero ── */}
      <div className="relative bg-[#FAF9F7] border-b border-[#E7E3DD] py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-premium-grid opacity-[0.025] pointer-events-none" />
        <div className="max-w-7xl mx-auto">
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
          <div className="absolute right-[39%] top-8 w-10 h-10 rounded-xl z-10" style={{ backgroundColor: "#F07020" }} />
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
                className="bg-[#FAF9F7] border border-[#E7E3DD] rounded-2xl p-7 hover:border-[#5B6EF5]/40 transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-[#5B6EF5] group-hover:bg-[#F07020] rounded-xl flex items-center justify-center text-[#FAF9F7] mb-5 transition-colors duration-300">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl">
          {TEAM.map(({ name, role, bio, img }) => (
            <div key={name} className="border border-[#E7E3DD] rounded-2xl p-8 hover:border-[#5B6EF5]/40 transition-all duration-300 bg-[#FAF9F7] group flex flex-col md:flex-row gap-6 items-center md:items-start">
              {/* Image */}
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden shrink-0 border border-[#E7E3DD] bg-[#F2EFEA]">
                <img src={img} alt={name} className="w-full h-full object-cover object-top transition-transform duration-[1.4s] group-hover:scale-105" />
              </div>
              {/* Details */}
              <div className="flex-1 text-center md:text-left">
                <p className="text-[14px] font-extrabold uppercase tracking-[0.2em] text-[#2B2B2B]">{name}</p>
                <p className="text-[11px] text-[#F07020] font-black uppercase tracking-widest mt-1">{role}</p>
                <p className="text-[12.5px] text-[#2B2B2B]/55 mt-3 font-medium leading-relaxed">{bio}</p>
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