// src/Home/Home.jsx

import { ArrowRight, Zap, RefreshCcw, Truck, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

// CHANGE THIS LINE: Step up one folder out of /Home/ to get to /components/
import ProductCard from "../components/ProductCard.jsx";

// ALSO CHANGE THIS LINE: Step up one folder to get to /data/
import { FEATURED_PRODUCTS } from "../data/products.js";

const TICKER = [
  "RAW CUTS.",
  "HEAVY FABRIC.",
  "PURE DRIP.",
  "30-Day Returns",
  "New Drops Weekly",
  "4.9★ Rated",
];

export default function Home({ onShopNow }) {
  const navigate = useNavigate();

  return (
    // ⚡ FIXED CRITICAL PADDING TOP: Prevents the fixed/glass navbar from overlapping your scrolling brand ticker
    <div className="bg-white pt-20 lg:pt-24 transition-all duration-300">

      {/* ── Scrolling ticker (UPDATED BACKGROUND COLOR TO MATCH OUR SYSTEM THEME) ── */}
      <div className="bg-[#0b2240] overflow-hidden py-2.5 border-b border-white/5">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...TICKER, ...TICKER].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 mx-8 text-[10px] font-black uppercase tracking-[0.25em] text-white"
            >
              {item}
              <span className="w-1 h-1 rounded-full bg-white/50" />
            </span>
          ))}
        </div>
      </div>

      {/* ── Featured drops ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ff5700] mb-2">
              This Week
            </p>
            <h2 className="text-5xl md:text-6xl font-black uppercase leading-[0.9] tracking-tighter text-[#0b2240]">
              Featured
              <br />
              <span className="text-[#ff5700]">Drops.</span>
            </h2>
          </div>

          <button
            onClick={onShopNow}
            className="hidden md:flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#0b2240] hover:text-[#ff5700] transition-colors group"
          >
            View All
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {FEATURED_PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          <button
            onClick={() => {
              if (onShopNow) {
                onShopNow();
                return;
              }
              navigate("/market");
            }}
            className="flex items-center gap-2 bg-[#0b2240] text-white text-xs font-black uppercase tracking-widest px-8 py-4 hover:bg-[#ff5700] transition-colors"
          >
            View All Drops
            <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* ── Promo Section ── */}
      <section
        className="relative bg-[#0b2240] py-20 px-6 overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)",
          backgroundSize: "4rem 4rem",
        }}
      >
        <div className="absolute left-0 top-0 h-full w-1 bg-[#ff5700]" />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            {/* Rebranded brand label below */}
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ff5700] mb-3">
              The LuxZera Promise
            </p>
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.88] tracking-tighter text-white">
              No Fluff.<br />Just<br /><span className="text-[#ff5700]">Fits.</span>
            </h2>
            <p className="mt-6 text-slate-400 text-sm leading-relaxed max-w-sm">
              Curated high-quality fashion drops without the noise.
            </p>
          </div>

          <button
            onClick={onShopNow}
            className="flex-shrink-0 flex items-center gap-3 bg-[#ff5700] hover:bg-[#e04e00] text-white text-sm font-black uppercase tracking-widest px-10 py-5 transition-colors group"
          >
            Shop the Drop
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

    </div>
  );
}