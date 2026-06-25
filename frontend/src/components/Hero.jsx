// src/components/Hero.jsx
import { ArrowUpRight } from "lucide-react";

export default function Hero({ onShopNow }) {
  return (
    <section
      className="relative w-full bg-[#f0efeb] select-none overflow-hidden"
      style={{ height: "calc(100vh - 4rem)" }}
    >

      {/* ═══ TOP META BAR ═══ */}
      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 pt-5">
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] font-medium text-slate-500">drops@luxzera.com</span>
          <span className="text-[11px] font-medium text-slate-500">Season 2026 · Live Now</span>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 top-4">
          <img src="/LuxZera.png" alt="LuxZera" className="h-7 w-auto object-contain" />
        </div>
        <div className="flex items-center gap-2">
          {[
            <svg key="ig" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="#666" stroke="none"/></svg>,
            <svg key="x" width="12" height="12" viewBox="0 0 24 24" fill="#666"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.261 5.636 5.903-5.636zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
            <svg key="yt" width="13" height="13" viewBox="0 0 24 24" fill="#666"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
          ].map((icon, i) => (
            <a key={i} href="#" className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center hover:border-[#ff5700] transition-colors">
              {icon}
            </a>
          ))}
          <span className="text-[11px] font-medium text-slate-500 ml-1">Follow us</span>
        </div>
      </div>

      {/* ═══ MAIN LAYOUT ═══ */}
      <div className="w-full h-full flex">

        {/* ── LEFT (30%) ── */}
        <div className="flex flex-col justify-between px-8 pt-20 pb-8" style={{ width: "30%" }}>

          {/* Top headline — left side */}
          <div className="flex-1 flex items-center">
            <h1
              className="font-black text-[#111] lowercase leading-none"
              style={{ fontSize: "clamp(3.5rem, 7.5vw, 8rem)", letterSpacing: "-0.04em", lineHeight: 0.88 }}
            >
              dress<br />bold.
            </h1>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center">
              <img src="https://i.pravatar.cc/40?img=12" alt="" className="w-9 h-9 rounded-full border-2 border-[#f0efeb] object-cover" />
              <img src="https://i.pravatar.cc/40?img=25" alt="" className="w-9 h-9 rounded-full border-2 border-[#f0efeb] object-cover -ml-2" />
              <div className="w-9 h-9 rounded-full bg-[#ff5700] border-2 border-[#f0efeb] flex items-center justify-center -ml-2">
                <span className="text-white text-sm font-black">+</span>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-slate-400 tracking-widest">[©2026]</span>
            <span className="text-[#ff5700] text-2xl font-black leading-none">✳</span>
            <p className="text-[12px] text-slate-500 leading-relaxed font-medium max-w-[190px]">
              Unique fashion finds at prices that hit different. No markups, no compromises — just the drop you deserve.
            </p>
          </div>
        </div>

        {/* ── CENTER IMAGE (40%) ── */}
        <div
          className="relative overflow-hidden flex-shrink-0 cursor-pointer"
          style={{ width: "40%" }}
          onClick={onShopNow}
        >
          <img
            src="/hero.png"
            alt="LuxZera model"
            className="w-full h-full object-cover object-top"
            loading="eager"
            fetchPriority="high"
          />

          {/* [SHOP] button */}
          <button
            onClick={(e) => { e.stopPropagation(); onShopNow(); }}
            className="absolute bottom-10 right-4 z-20 bg-white rounded-2xl w-[4.2rem] h-[4.2rem] flex flex-col items-center justify-center shadow-2xl hover:bg-[#ff5700] transition-all duration-200 group/btn"
          >
            <ArrowUpRight size={20} strokeWidth={2} className="text-[#111] group-hover/btn:text-white transition-colors" />
            <span className="text-[8px] font-black uppercase tracking-wider text-slate-400 group-hover/btn:text-white transition-colors mt-0.5">[Shop]</span>
          </button>
        </div>

        {/* ── RIGHT (30%) ── */}
        <div className="flex flex-col justify-between px-8 pt-20 pb-8" style={{ width: "30%" }}>

          <div className="flex justify-end pt-4">
            <span className="text-[10px] font-semibold text-slate-400 tracking-widest uppercase">[Scroll Down]</span>
          </div>

          {/* Top headline — right side */}
          <div className="flex-1 flex items-center">
            <h1
              className="font-black text-[#111] lowercase leading-none"
              style={{ fontSize: "clamp(3.5rem, 7.5vw, 8rem)", letterSpacing: "-0.04em", lineHeight: 0.88 }}
            >
              spend<br />less.
            </h1>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">
              // Streetwear
            </span>
            <div>
              <p
                className="font-black text-[#111] leading-none"
                style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)", letterSpacing: "-0.04em" }}
              >
                600+
              </p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-1">
                Pieces Copped
              </p>
            </div>
            <p className="text-[12px] text-slate-500 font-medium leading-relaxed max-w-[180px]">
              Unique pieces. Honest prices. Shop the drop you actually want.
            </p>
          </div>
        </div>

      </div>

    </section>
  );
}