// src/components/Hero.jsx
import { ArrowRight, Sparkles } from "lucide-react";
import MobileHero from "../mobile/MobileHero.jsx";

const IMG_1 = "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=85";
const IMG_2 = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80";
const IMG_3 = "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80";
const IMG_4 = "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80";

export default function Hero({ onShopNow }) {
  return (
    <>
      <div className="md:hidden">
        <MobileHero onShopNow={onShopNow} />
      </div>
      <section className="hidden md:block w-full bg-white font-sans select-none overflow-hidden border-b border-[#ECECEC]">

        {/* ═══ TOP HERO CANVAS ═══ */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 pt-14 pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-8 lg:gap-12 items-start min-h-[80vh]">

            {/* ── LEFT: Massive Typography Block ── */}
            <div className="flex flex-col justify-between h-full pt-2 pb-16 lg:pb-24">

              {/* Campaign Headline */}
              <div className="flex-1">
                <h1
                  className="text-[3.8rem] sm:text-[5rem] lg:text-[6.2rem] xl:text-[7rem] font-black uppercase leading-[0.86] tracking-[-0.025em]"
                  style={{ fontStretch: "condensed" }}
                >
                  <span className="text-[#5B6EF5]">FIND</span><br />
                  <span className="text-[#1D1D1F]">WHAT</span><br />
                  <span className="text-[#1D1D1F]">SUITS YOU.</span>
                </h1>

                {/* Supporting line */}
                <p className="mt-8 text-[14px] text-[#86868B] leading-[1.7] max-w-[320px] font-medium">
                  Thousands of garments. One intelligent stylus experience designed to help you discover clothing that truly suits you.
                </p>

                {/* CTAs */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    onClick={onShopNow}
                    className="bg-[#1D1D1F] hover:bg-[#2B2B2B] text-white text-[12px] font-semibold uppercase tracking-[0.2em] px-8 py-4 flex items-center gap-3 transition-all duration-200 rounded-xl hover:scale-[1.02] active:scale-[0.98] shadow-sm group"
                  >
                    <Sparkles size={14} className="fill-[#FAFAF9]/10 text-white" />
                    Find What Suits You
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </button>
                  <button
                    onClick={onShopNow}
                    className="bg-white border border-[#ECECEC] hover:bg-white text-[#1D1D1F] text-[12px] font-semibold uppercase tracking-[0.2em] px-6 py-4 flex items-center gap-2 transition-all duration-200 rounded-xl hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                  >
                    Browse Collection
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>

              {/* Bottom trending label */}
              <div className="mt-10 flex items-center gap-2 group cursor-pointer" onClick={onShopNow}>
                <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#86868B] group-hover:text-[#5B6EF5] transition-colors italic">
                  Trending Now
                </span>
                <svg width="28" height="16" viewBox="0 0 28 16" fill="none" className="text-[#5B6EF5] transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M0 8 Q10 8 18 2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  <path d="M15 0 L20 3 L16 7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

            </div>

            {/* ── RIGHT: Asymmetric Multi-Image Editorial Collage ── */}
            <div className="relative w-full h-[70vh] lg:h-auto lg:min-h-[85vh]">

              {/* MAIN tall model image */}
              <div className="absolute top-0 left-[12%] w-[52%] h-[68%] rounded-2xl overflow-hidden border border-[#ECECEC] shadow-sm bg-white z-20">
                <img
                  src={IMG_1}
                  alt="Fashion campaign model"
                  className="w-full h-full object-cover object-top transition-transform duration-[2s] ease-out hover:scale-105"
                  loading="eager"
                />
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#ECECEC]">
                  <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#1D1D1F]">Editorial</span>
                </div>
              </div>

              {/* TOP-RIGHT smaller image */}
              <div className="absolute top-3 right-0 w-[38%] h-[42%] rounded-2xl overflow-hidden border border-[#ECECEC] shadow-sm bg-white z-10">
                <img
                  src={IMG_2}
                  alt="Designer fashion"
                  className="w-full h-full object-cover object-top transition-transform duration-[2s] hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* BOTTOM-LEFT */}
              <div className="absolute bottom-[14%] left-0 w-[34%] h-[38%] rounded-2xl overflow-hidden border border-[#ECECEC] shadow-sm bg-white z-30">
                <img
                  src={IMG_3}
                  alt="Denim jacket"
                  className="w-full h-full object-cover object-center transition-transform duration-[2s] hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* BOTTOM-RIGHT */}
              <div className="absolute bottom-[4%] right-0 w-[40%] h-[36%] rounded-2xl overflow-hidden border border-[#ECECEC] shadow-sm bg-white z-20 group cursor-pointer" onClick={onShopNow}>
                <img
                  src={IMG_4}
                  alt="Designer blazer"
                  className="w-full h-full object-cover object-top transition-transform duration-[2s] group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 bg-[#5B6EF5] px-3 py-1.5 rounded-full">
                  <span className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#FAFAF9]">New Drop</span>
                </div>
              </div>

              {/* Floating Shop badge */}
              <div
                onClick={onShopNow}
                className="absolute top-[38%] left-[3%] z-40 w-14 h-14 rounded-full bg-[#5B6EF5] flex flex-col items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200 shadow-md"
              >
                <ArrowRight size={12} className="text-[#FAFAF9] rotate-[-45deg]" strokeWidth={2.5} />
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#FAFAF9] mt-0.5 text-center leading-tight">Shop</span>
              </div>

            </div>
          </div>
        </div>

        {/* ═══ BOTTOM BOLD BLOCKS ═══ */}
        <div className="w-full grid grid-cols-1 md:grid-cols-[1.6fr_1fr_0.9fr] min-h-[9rem]">

          {/* Block 1 — Brand Blue */}
          <div className="bg-[#5B6EF5] px-10 py-8 flex flex-col justify-between relative overflow-hidden group cursor-pointer" onClick={onShopNow}>
            <div className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: "repeating-linear-gradient(-45deg, #FAFAF9 0, #FAFAF9 1px, transparent 0, transparent 50%)",
                backgroundSize: "12px 12px"
              }}
            />
            <div className="flex items-start justify-between relative z-10">
              <div>
                <span className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#FAFAF9]/60 block mb-1">// Personal Stylist</span>
                <span className="text-[#FAFAF9] text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight block">
                  Curation Made<br />For You Alone.
                </span>
              </div>
              <div className="w-10 h-10 rounded-full border border-[#FAFAF9]/30 flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-white/10 transition-colors">
                <ArrowRight size={14} className="text-[#FAFAF9]" strokeWidth={2} />
              </div>
            </div>
            <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#FAFAF9]/60 mt-4 block relative z-10">
              Start Curation
            </span>
          </div>

          {/* Block 2 — Near Black */}
          <div className="bg-[#1D1D1F] px-8 py-8 flex flex-col justify-between relative overflow-hidden group cursor-pointer" onClick={onShopNow}>
            <div className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: "repeating-linear-gradient(-45deg, #FAFAF9 0, #FAFAF9 1px, transparent 0, transparent 50%)",
                backgroundSize: "12px 12px"
              }}
            />
            <span className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#FAFAF9]/60 block relative z-10">// Lookbooks</span>
            <div className="relative z-10">
              <span className="text-[#FAFAF9] text-xl font-black uppercase tracking-tight leading-tight block">
                Explore<br />Collections
              </span>
              <div className="mt-3 flex items-center gap-2 text-[#FAFAF9]/80 group-hover:gap-3 transition-all">
                <span className="text-[12px] font-semibold uppercase tracking-[0.2em]">Browse Now</span>
                <ArrowRight size={12} strokeWidth={2} />
              </div>
            </div>
          </div>

          {/* Block 3 — Off White with scroll indicator */}
          <div className="bg-white px-8 py-8 flex flex-col justify-between border-l border-[#ECECEC]">
            <div>
              <span className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#86868B] block mb-3">Scroll Down</span>
              <div className="w-7 h-11 rounded-full border-2 border-[#1D1D1F]/10 flex items-start justify-center pt-1.5">
                <div className="w-1 h-2.5 bg-[#5B6EF5] rounded-full animate-bounce" />
              </div>
            </div>
            <div className="space-y-2">
              {[
                { num: "150+", label: "Designers" },
                { num: "2500+", label: "Silhouettes" },
              ].map(({ num, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="text-xl font-black text-[#5B6EF5] leading-none">{num}</span>
                  <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#86868B]">{label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
