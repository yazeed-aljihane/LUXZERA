import { ArrowRight, Sparkles } from "lucide-react";

const IMG_1 = "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=85";
const IMG_2 = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80";
const IMG_3 = "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80";

export default function MobileHero({ onShopNow }) {
  return (
    <section className="bg-white border-b border-[#ECECEC] font-sans select-none overflow-hidden">
      <div className="px-5 pt-7 pb-6">
        <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#5B6EF5]">
          — Personal Fashion Market
        </p>

        <h1 className="mt-4 text-[3.75rem] min-[390px]:text-[4.35rem] font-black uppercase leading-[0.84] tracking-[-0.055em] text-[#1D1D1F]">
          <span className="text-[#5B6EF5]">Find</span><br />
          What<br />
          <span>Suits You.</span>
        </h1>

        <p className="mt-5 text-[14px] leading-7 text-[#86868B] font-medium">
          Thousands of garments. One intelligent stylist experience designed to help you discover clothing that truly suits you.
        </p>

        <div className="mt-6 grid grid-cols-[1fr_auto] gap-3">
          <button
            onClick={onShopNow}
            className="h-14 rounded-xl bg-[#5B6EF5] px-5 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#FAFAF9] flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-transform"
          >
            <Sparkles size={14} className="fill-[#FAFAF9]/15 text-white" />
            Start Explore
          </button>
          <button
            onClick={onShopNow}
            className="h-14 w-14 rounded-xl bg-[#1D1D1F] text-[#FAFAF9] flex items-center justify-center active:scale-[0.98] transition-transform"
            aria-label="Browse collection"
          >
            <ArrowRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className="relative h-[31rem] px-5 pb-7">
        <div className="absolute left-5 top-0 h-[25rem] w-[68%] overflow-hidden rounded-2xl border border-[#ECECEC] bg-[#FAFAF9] shadow-sm">
          <img src={IMG_1} alt="Fashion campaign model" className="h-full w-full object-cover object-top" loading="eager" />
        </div>

        <div className="absolute right-5 top-10 h-44 w-[42%] overflow-hidden rounded-2xl border border-[#ECECEC] bg-[#FAFAF9] shadow-sm">
          <img src={IMG_2} alt="Designer fashion" className="h-full w-full object-cover object-top" loading="lazy" />
        </div>

        <div className="absolute right-5 bottom-7 h-48 w-[48%] overflow-hidden rounded-2xl border border-[#ECECEC] bg-[#FAFAF9] shadow-sm">
          <img src={IMG_3} alt="Denim jacket" className="h-full w-full object-cover object-center" loading="lazy" />
        </div>

        <button
          onClick={onShopNow}
          className="absolute left-7 bottom-10 h-16 w-16 rounded-full bg-[#5B6EF5] text-[#FAFAF9] flex flex-col items-center justify-center shadow-lg active:scale-95 transition-transform"
          aria-label="Shop now"
        >
          <ArrowRight size={15} className="-rotate-45" strokeWidth={2.5} />
          <span className="mt-1 text-[7.5px] font-extrabold uppercase tracking-[0.18em]">Shop</span>
        </button>
      </div>

      <div className="grid grid-cols-2">
        <button onClick={onShopNow} className="bg-[#5B6EF5] px-5 py-6 text-left">
          <span className="block text-[12px] font-semibold uppercase tracking-[0.2em] text-[#FAFAF9]/60">// Curated</span>
          <span className="mt-2 block text-2xl font-black uppercase leading-[0.9] text-[#FAFAF9]">
            Your<br />Edit.
          </span>
        </button>
        <button onClick={onShopNow} className="bg-[#1D1D1F] px-5 py-6 text-left">
          <span className="block text-[12px] font-semibold uppercase tracking-[0.2em] text-[#FAFAF9]/60">// Live</span>
          <span className="mt-2 block text-2xl font-black uppercase leading-[0.9] text-[#FAFAF9]">
            New<br />Drops.
          </span>
        </button>
      </div>
    </section>
  );
}
