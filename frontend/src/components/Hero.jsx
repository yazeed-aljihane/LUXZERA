// src/components/Hero.jsx
import { ArrowRight } from "lucide-react";

const IMG_1 = "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=85"; // fashion model standing
const IMG_2 = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80"; // editorial female fashion
const IMG_3 = "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80"; // denim jacket close-up
const IMG_4 = "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80"; // blazer product

export default function Hero({ onShopNow }) {
  return (
    <section className="w-full bg-[#FAF9F7] font-sans select-none overflow-hidden border-b border-[#E7E3DD]">

      {/* ═══ TOP HERO CANVAS ═══ */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 pt-14 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-8 lg:gap-12 items-start min-h-[82vh]">

          {/* ── LEFT: Massive Typography Block ── */}
          <div className="flex flex-col justify-between h-full pt-2 pb-16 lg:pb-24">

            {/* Top eyebrow */}
            <div className="flex items-center gap-2 mb-8">
              <span className="h-px w-5 bg-[#C6A15B]" />
              <span className="text-[8px] font-extrabold uppercase tracking-[0.35em] text-[#C6A15B]">
                SS26 · New Collection
              </span>
            </div>

            {/* Campaign Headline — inspired by reference massive type */}
            <div className="flex-1">
              <h1
                className="text-[3.8rem] sm:text-[5rem] lg:text-[6.2rem] xl:text-[7rem] font-black uppercase leading-[0.86] tracking-[-0.025em]"
                style={{ fontStretch: "condensed" }}
              >
                <span style={{ color: "#F07020" }}>WEAR</span><br />
                <span className="text-[#2B2B2B]">THE</span><br />
                <span style={{ color: "#1E2D4A" }}>UNCOMMON.</span>
              </h1>

              {/* Supporting line */}
              <p className="mt-7 text-[13px] text-[#2B2B2B]/60 leading-[1.7] max-w-[300px] font-medium">
                Discover premium original fashion from established labels,
                independent brands &amp; emerging designers.
              </p>

              {/* CTA */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={onShopNow}
                  className="bg-[#5B6EF5] hover:bg-[#4a5de0] text-[#FAF9F7] text-[10px] font-extrabold uppercase tracking-[0.3em] px-8 py-4 flex items-center gap-3 transition-all duration-300 rounded-full shadow-[0_6px_20px_rgba(91,110,245,0.35)] group"
                >
                  Start Shopping
                  <ArrowRight size={13} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Bottom category label — like reference "Activewear ↗" */}
            <div className="mt-10 flex items-center gap-2 group cursor-pointer" onClick={onShopNow}>
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#2B2B2B]/50 group-hover:text-[#C97A5A] transition-colors italic">
                Trending Now
              </span>
              <svg width="28" height="16" viewBox="0 0 28 16" fill="none" className="text-[#C97A5A]">
                <path d="M0 8 Q10 8 18 2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                <path d="M15 0 L20 3 L16 7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

          </div>

          {/* ── RIGHT: Asymmetric Multi-Image Editorial Collage ── */}
          <div className="relative w-full h-[70vh] lg:h-auto lg:min-h-[85vh]">

            {/* MAIN tall model image — top-center, large */}
            <div className="absolute top-0 left-[12%] w-[52%] h-[68%] rounded-2xl overflow-hidden border border-[#E7E3DD] shadow-sm bg-[#F2EFEA] z-20">
              <img
                src={IMG_1}
                alt="Fashion campaign model"
                className="w-full h-full object-cover object-top transition-transform duration-[2s] ease-out hover:scale-105"
                loading="eager"
              />
              {/* Category tag on image */}
              <div className="absolute bottom-3 left-3 bg-[#FAF9F7]/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#E7E3DD]">
                <span className="text-[7.5px] font-extrabold uppercase tracking-[0.28em] text-[#2B2B2B]">Editorial</span>
              </div>
            </div>

            {/* TOP-RIGHT smaller image */}
            <div className="absolute top-3 right-0 w-[38%] h-[42%] rounded-2xl overflow-hidden border border-[#E7E3DD] shadow-sm bg-[#F2EFEA] z-10">
              <img
                src={IMG_2}
                alt="Designer fashion"
                className="w-full h-full object-cover object-top transition-transform duration-[2s] hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* BOTTOM-LEFT product card — denim */}
            <div className="absolute bottom-[14%] left-0 w-[34%] h-[38%] rounded-2xl overflow-hidden border border-[#E7E3DD] shadow-sm bg-[#F2EFEA] z-30">
              <img
                src={IMG_3}
                alt="Denim jacket"
                className="w-full h-full object-cover object-center transition-transform duration-[2s] hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* BOTTOM-RIGHT — blazer + label */}
            <div className="absolute bottom-[4%] right-0 w-[40%] h-[36%] rounded-2xl overflow-hidden border border-[#E7E3DD] shadow-sm bg-[#FAF9F7] z-20 group cursor-pointer" onClick={onShopNow}>
              <img
                src={IMG_4}
                alt="Designer blazer"
                className="w-full h-full object-cover object-top transition-transform duration-[2s] group-hover:scale-105"
                loading="lazy"
              />
              {/* Price tag floating */}
              <div className="absolute top-3 right-3 bg-[#C6A15B] px-3 py-1.5 rounded-full">
                <span className="text-[7.5px] font-extrabold uppercase tracking-[0.25em] text-[#FAF9F7]">New Drop</span>
              </div>
            </div>

            {/* Floating "Shop Casual" badge — like reference circular badge */}
            <div
              onClick={onShopNow}
              className="absolute top-[38%] left-[3%] z-40 w-14 h-14 rounded-full bg-[#C97A5A] flex flex-col items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200 shadow-md"
            >
              <ArrowRight size={12} className="text-[#FAF9F7] rotate-[-45deg]" strokeWidth={2.5} />
              <span className="text-[5.5px] font-extrabold uppercase tracking-[0.2em] text-[#FAF9F7] mt-0.5 text-center leading-tight">Shop</span>
            </div>

          </div>
        </div>
      </div>

      {/* ═══ BOTTOM BOLD BLOCKS — like reference blue + yellow strip ═══ */}
      <div className="w-full grid grid-cols-1 md:grid-cols-[1.6fr_1fr_0.9fr] min-h-[9rem]">

        {/* Block 1 — Brand Blue */}
        <div className="bg-[#5B6EF5] px-10 py-8 flex flex-col justify-between relative overflow-hidden group cursor-pointer" onClick={onShopNow}>
          {/* Diagonal texture lines */}
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "repeating-linear-gradient(-45deg, #FAF9F7 0, #FAF9F7 1px, transparent 0, transparent 50%)",
              backgroundSize: "12px 12px"
            }}
          />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <span className="text-[8px] font-extrabold uppercase tracking-[0.35em] text-[#FAF9F7]/50 block mb-1">// Curated Drop</span>
              <span className="text-[#FAF9F7] text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight block">
                A True Style<br />of Indulgence.
              </span>
            </div>
            <div className="w-10 h-10 rounded-full border border-[#FAF9F7]/30 flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-[#FAF9F7]/10 transition-colors">
              <ArrowRight size={14} className="text-[#FAF9F7]" strokeWidth={2} />
            </div>
          </div>
          <span className="text-[8.5px] font-extrabold uppercase tracking-[0.3em] text-[#FAF9F7]/45 mt-4 block relative z-10">
            Shop Exclusive Drops
          </span>
        </div>

        {/* Block 2 — Gold Accent */}
        <div className="bg-[#C6A15B] px-8 py-8 flex flex-col justify-between relative overflow-hidden group cursor-pointer" onClick={onShopNow}>
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "repeating-linear-gradient(-45deg, #FAF9F7 0, #FAF9F7 1px, transparent 0, transparent 50%)",
              backgroundSize: "12px 12px"
            }}
          />
          <span className="text-[8px] font-extrabold uppercase tracking-[0.35em] text-[#FAF9F7]/60 block relative z-10">// New Arrivals</span>
          <div className="relative z-10">
            <span className="text-[#FAF9F7] text-xl font-black uppercase tracking-tight leading-tight block">
              Explore<br />Collections
            </span>
            <div className="mt-3 flex items-center gap-2 text-[#FAF9F7]/80 group-hover:gap-3 transition-all">
              <span className="text-[8.5px] font-extrabold uppercase tracking-[0.25em]">Browse Now</span>
              <ArrowRight size={11} strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Block 3 — Soft Stone with scroll indicator */}
        <div className="bg-[#F2EFEA] px-8 py-8 flex flex-col justify-between border-l border-[#E7E3DD]">
          <div>
            <span className="text-[8px] font-extrabold uppercase tracking-[0.35em] text-[#2B2B2B]/35 block mb-3">Scroll Down</span>
            {/* Scroll indicator */}
            <div className="w-7 h-11 rounded-full border-2 border-[#2B2B2B]/20 flex items-start justify-center pt-1.5">
              <div className="w-1 h-2.5 bg-[#5B6EF5] rounded-full animate-bounce" />
            </div>
          </div>
          {/* Stats */}
          <div className="space-y-1.5">
            {[
              { num: "150+", label: "Designers" },
              { num: "2500+", label: "Silhouettes" },
            ].map(({ num, label }) => (
              <div key={label} className="flex items-center gap-2">
                <span className="text-lg font-black text-[#5B6EF5] leading-none">{num}</span>
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#2B2B2B]/45">{label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}