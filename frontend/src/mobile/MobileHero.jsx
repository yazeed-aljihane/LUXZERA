import { ArrowRight, Sparkles } from "lucide-react";

const IMG_1 = "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=85";
const IMG_2 = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80";
const IMG_3 = "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80";

export default function MobileHero({ onShopNow }) {
  return (
    <section className="bg-[#FAF9F7] border-b border-[#E7E3DD] font-sans select-none overflow-hidden">
      <div className="px-5 pt-7 pb-6">
        <p className="text-[10px] font-black uppercase tracking-[0.32em] text-[#C97A5A]">
          Personal fashion market
        </p>

        <h1 className="mt-4 text-[3.75rem] min-[390px]:text-[4.35rem] font-black uppercase leading-[0.84] tracking-[-0.055em] text-[#2B2B2B]">
          <span className="text-[#F07020]">Find</span><br />
          What<br />
          <span className="text-[#1E2D4A]">Suits You.</span>
        </h1>

        <p className="mt-5 text-[15px] leading-7 text-[#2B2B2B]/62 font-medium">
          Thousands of products, same premium catalog, rebuilt for mobile with larger visuals, cleaner actions, and no squeezed desktop leftovers.
        </p>

        <div className="mt-6 grid grid-cols-[1fr_auto] gap-3">
          <button
            onClick={onShopNow}
            className="h-14 rounded-full bg-[#5B6EF5] px-5 text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#FAF9F7] flex items-center justify-center gap-2 shadow-[0_10px_24px_rgba(91,110,245,0.28)]"
          >
            <Sparkles size={13} className="fill-[#FAF9F7]" />
            Start
          </button>
          <button
            onClick={onShopNow}
            className="h-14 w-14 rounded-full bg-[#2B2B2B] text-[#FAF9F7] flex items-center justify-center"
            aria-label="Browse collection"
          >
            <ArrowRight size={17} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className="relative h-[31rem] px-5 pb-7">
        <div className="absolute left-5 top-0 h-[25rem] w-[68%] overflow-hidden rounded-[2rem] border border-[#E7E3DD] bg-[#F2EFEA] shadow-sm">
          <img src={IMG_1} alt="Fashion campaign model" className="h-full w-full object-cover object-top" loading="eager" />
        </div>

        <div className="absolute right-5 top-10 h-44 w-[42%] overflow-hidden rounded-[1.5rem] border border-[#E7E3DD] bg-[#F2EFEA] shadow-sm">
          <img src={IMG_2} alt="Designer fashion" className="h-full w-full object-cover object-top" loading="lazy" />
        </div>

        <div className="absolute right-5 bottom-7 h-48 w-[48%] overflow-hidden rounded-[1.5rem] border border-[#E7E3DD] bg-[#F2EFEA] shadow-sm">
          <img src={IMG_3} alt="Denim jacket" className="h-full w-full object-cover object-center" loading="lazy" />
        </div>

        <button
          onClick={onShopNow}
          className="absolute left-7 bottom-10 h-16 w-16 rounded-full bg-[#C97A5A] text-[#FAF9F7] flex flex-col items-center justify-center shadow-lg"
          aria-label="Shop now"
        >
          <ArrowRight size={15} className="-rotate-45" strokeWidth={2.5} />
          <span className="mt-1 text-[6px] font-black uppercase tracking-[0.18em]">Shop</span>
        </button>
      </div>

      <div className="grid grid-cols-2">
        <button onClick={onShopNow} className="bg-[#5B6EF5] px-5 py-6 text-left">
          <span className="block text-[8px] font-black uppercase tracking-[0.28em] text-[#FAF9F7]/55">// Curated</span>
          <span className="mt-2 block text-2xl font-black uppercase leading-[0.9] text-[#FAF9F7]">
            Your<br />Edit.
          </span>
        </button>
        <button onClick={onShopNow} className="bg-[#C6A15B] px-5 py-6 text-left">
          <span className="block text-[8px] font-black uppercase tracking-[0.28em] text-[#FAF9F7]/60">// Live</span>
          <span className="mt-2 block text-2xl font-black uppercase leading-[0.9] text-[#FAF9F7]">
            New<br />Drops.
          </span>
        </button>
      </div>
    </section>
  );
}
