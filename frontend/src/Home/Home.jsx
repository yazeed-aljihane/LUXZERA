// src/Home/Home.jsx
import { ArrowRight, Clock, Heart, Plus, Shirt, Tag } from "lucide-react";
import ProductCard from "../components/ProductCard.jsx";
import { PRODUCTS } from "../data/products.js";

// Fashion editorial images
const MODEL_A = "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=900&q=80";
const MODEL_B = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&q=80";
const MODEL_C = "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&q=80";
const MODEL_D = "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80";

const CHANNELS = [
  { label: "New Arrivals",        tag: "Just Dropped",     color: "#5B6EF5", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",   span: "md:col-span-2" },
  { label: "Trending Now",        tag: "This Week",        color: "#C97A5A", img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80",   span: "" },
  { label: "Editor's Picks",      tag: "Curated Selects",  color: "#2B2B2B", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",   span: "" },
  { label: "Emerging Designers",  tag: "Next Wave",        color: "#C6A15B", img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",   span: "" },
  { label: "Independent Brands",  tag: "Exclusive",        color: "#5B6EF5", img: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80",      span: "" },
  { label: "Luxury Collections",  tag: "Premium Only",     color: "#C97A5A", img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",   span: "md:col-span-2" },
];

const DESIGNERS = [
  {
    name: "Ami Laurent",
    location: "Paris, FR",
    role: "Independent Designer",
    quote: "Clothes should feel like a second skin — effortless, personal.",
    img: MODEL_C,
    accent: "#5B6EF5",
  },
  {
    name: "Kian Wells",
    location: "London, UK",
    role: "Menswear Creator",
    quote: "I design for men who don't follow trends — they set them.",
    img: MODEL_B,
    accent: "#C97A5A",
  },
];

export default function Home({ onShopNow }) {
  const trendingProducts = PRODUCTS.slice(0, 4);
  const editorPicks     = PRODUCTS.slice(4, 7);

  const categories = [
    { name: "Shirts",       img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=80&q=70" },
    { name: "Outerwear",    img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=80&q=70" },
    { name: "Conceptual",   img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=80&q=70" },
    { name: "Denim",        img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=80&q=70" },
    { name: "Streetwear",   img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=80&q=70" },
    { name: "Luxury",       img: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=80&q=70" },
  ];

  return (
    <div className="bg-[#FAF9F7] text-[#2B2B2B] font-sans">

      {/* ════════════════════════════════════════════
          1. CURATED CHANNELS — Magazine Grid
      ════════════════════════════════════════════ */}
      <section className="w-full border-b border-[#E7E3DD]">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 pt-20 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[8px] font-extrabold uppercase tracking-[0.35em] text-[#C6A15B] block mb-3">
              — Curated For You
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#2B2B2B] leading-[0.9]">
              Shop By<br />Channel
            </h2>
          </div>
          <button
            onClick={onShopNow}
            className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#2B2B2B]/50 hover:text-[#5B6EF5] transition-colors shrink-0"
          >
            View All <ArrowRight size={12} strokeWidth={2.5} />
          </button>
        </div>

        {/* Channel Grid */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {CHANNELS.map((ch, i) => (
              <div
                key={ch.label}
                onClick={onShopNow}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer border border-[#E7E3DD] bg-[#F2EFEA] ${ch.span} ${
                  i === 0 || i === 5 ? "h-64" : "h-52"
                }`}
              >
                <img
                  src={ch.img}
                  alt={ch.label}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[1.4s] group-hover:scale-105"
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B2B2B]/70 via-[#2B2B2B]/10 to-transparent" />

                {/* Channel label */}
                <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                  <div>
                    <span className="text-[7.5px] font-extrabold uppercase tracking-[0.3em] text-white/55 block mb-1">{ch.tag}</span>
                    <span className="text-sm font-black uppercase tracking-wide text-[#FAF9F7] leading-tight">{ch.label}</span>
                  </div>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
                    style={{ backgroundColor: ch.color }}
                  >
                    <ArrowRight size={12} className="text-[#FAF9F7]" strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          2. CATEGORY BADGE SCROLL ROW
      ════════════════════════════════════════════ */}
      <section className="w-full bg-[#FAFAF9] border-b border-[#ECECEC] py-6 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center gap-4 whitespace-nowrap min-w-max">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={onShopNow}
              className="flex items-center gap-3 border border-[#ECECEC] bg-white hover:border-[#F07020]/40 hover:bg-[#FAFAF9] px-5 py-2.5 rounded-full transition-all duration-200 group shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="w-7 h-7 rounded-full overflow-hidden border border-[#ECECEC] shrink-0">
                <img src={cat.img} alt="" className="w-full h-full object-cover" />
              </div>
              <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#37352F] group-hover:text-[#F07020] transition-colors">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          3. THE LUXZERA WAY — Custom Onboarding Stepper Flow
      ════════════════════════════════════════════ */}
      <section className="w-full border-b border-[#E7E3DD] bg-[#FAF9F7]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-20">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-14">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#2B2B2B] leading-[0.9]">
                For You.<br /><span style={{ color: "#F07020" }}>Not Everyone.</span>
              </h2>
              <p className="mt-4 text-[13px] text-[#2B2B2B]/60 leading-relaxed font-medium max-w-md">
                LuxZera personalizes your fashion journey — from discovery to your wardrobe to your next purchase.
              </p>
            </div>
            
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <div className="h-14 w-[1px] bg-[#E7E3DD] hidden md:block" />
              <div className="flex items-start gap-3 max-w-xs">
                <div className="w-9 h-9 rounded-full bg-[#FAF9F7] border border-[#E7E3DD] flex items-center justify-center text-[#2B2B2B]/60 shrink-0 mt-0.5">
                  <Clock size={14} strokeWidth={2} />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#2B2B2B] block">Save Time. Shop Better.</span>
                  <span className="text-[11.5px] text-[#2B2B2B]/50 font-medium leading-normal mt-0.5 block">
                    We do the heavy lifting so you can focus on what you love.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stepper Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

            {/* Card 1 — Upload & Tell Us Your Style */}
            <div className="flex flex-col gap-4 border border-[#E7E3DD] bg-[#FAF9F7]/30 rounded-2xl p-6 relative">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#2B2B2B]/40 bg-[#E7E3DD]/45 px-2.5 py-1 rounded-full">
                  01
                </span>
                
                {/* Desktop Connector Arrow */}
                <div className="hidden lg:block absolute -right-5 top-1/3 -translate-y-1/2 z-20 text-[#2B2B2B]/20 pointer-events-none">
                  <svg width="24" height="12" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="0" y1="6" x2="18" y2="6" strokeDasharray="3 3" />
                    <path d="M14 2l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              
              {/* Illustration container */}
              <div className="relative w-full h-36 bg-[#F5F3F0] rounded-xl overflow-hidden border border-[#E7E3DD] flex items-center justify-center select-none">
                {/* Polaroid 1 */}
                <div className="w-14 h-18 bg-white border border-[#E7E3DD] p-1 shadow-sm transform -rotate-12 absolute left-4 top-6">
                  <img src={MODEL_A} alt="" className="w-full h-full object-cover object-top filter grayscale-[20%]" />
                </div>
                {/* Polaroid 2 */}
                <div className="w-14 h-18 bg-white border border-[#E7E3DD] p-1 shadow-sm transform rotate-6 absolute left-14 top-4 z-10">
                  <img src={MODEL_C} alt="" className="w-full h-full object-cover object-top" />
                </div>
                {/* Polaroid 3 */}
                <div className="w-14 h-18 bg-white border border-[#E7E3DD] p-1 shadow-sm transform -rotate-3 absolute left-24 top-8">
                  <img src={MODEL_D} alt="" className="w-full h-full object-cover object-top filter sepia-[10%]" />
                </div>
                {/* Phone mockup */}
                <div className="w-16 h-28 bg-[#FAF9F7] border border-[#2B2B2B] rounded-lg shadow-md absolute right-4 bottom-2 z-20 flex flex-col p-1">
                  <div className="w-full h-1 bg-[#2B2B2B]/10 rounded-full mb-1" />
                  <div className="flex-1 bg-[#FAF9F7] rounded border border-[#E7E3DD] p-1 flex flex-col justify-between">
                    <div className="w-full h-3 rounded bg-[#5B6EF5]/15 flex items-center justify-center">
                      <span className="text-[5px] font-bold text-[#5B6EF5]">UPLOAD</span>
                    </div>
                    <div className="grid grid-cols-2 gap-0.5">
                      <div className="h-6 bg-white border border-[#E7E3DD] rounded-sm" />
                      <div className="h-6 bg-white border border-[#E7E3DD] rounded-sm" />
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#F07020] flex items-center justify-center">
                      <span className="text-[4px] font-black text-white uppercase tracking-widest">Done</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-black uppercase tracking-wide text-[#2B2B2B] leading-tight mb-2">
                  Upload &amp; Tell Us<br />Your Style
                </h3>
                <p className="text-[11px] text-[#2B2B2B]/50 leading-relaxed font-medium">
                  Upload 4–6 photos and share a few preferences. That's all we need to get started.
                </p>
              </div>
            </div>

            {/* Card 2 — We Curate For You */}
            <div className="flex flex-col gap-4 border border-[#E7E3DD] bg-[#FAF9F7]/30 rounded-2xl p-6 relative">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#2B2B2B]/40 bg-[#E7E3DD]/45 px-2.5 py-1 rounded-full">
                  02
                </span>
                
                {/* Desktop Connector Arrow */}
                <div className="hidden lg:block absolute -right-5 top-1/3 -translate-y-1/2 z-20 text-[#2B2B2B]/20 pointer-events-none">
                  <svg width="24" height="12" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="0" y1="6" x2="18" y2="6" strokeDasharray="3 3" />
                    <path d="M14 2l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Illustration container */}
              <div className="relative w-full h-36 bg-[#F5F3F0] rounded-xl overflow-hidden border border-[#E7E3DD] flex items-center justify-center select-none">
                {/* Hanger rack drawing */}
                <div className="w-40 h-28 border border-dashed border-[#2B2B2B]/20 rounded-lg flex flex-col items-center justify-between p-2">
                  {/* Horizontal Bar */}
                  <div className="w-full h-1 bg-[#2B2B2B]/60 rounded-full mt-2 relative">
                    {/* Hangers */}
                    <div className="absolute left-6 -top-1 flex flex-col items-center">
                      <div className="w-4 h-3 border-t border-l border-r border-[#2B2B2B] rounded-t-full" />
                      <div className="w-8 h-12 bg-[#C97A5A]/90 rounded-sm border border-[#C97A5A]" />
                    </div>
                    <div className="absolute left-16 -top-1 flex flex-col items-center">
                      <div className="w-4 h-3 border-t border-l border-r border-[#2B2B2B] rounded-t-full" />
                      <div className="w-8 h-14 bg-[#5B6EF5]/90 rounded-sm border border-[#5B6EF5]" />
                    </div>
                    <div className="absolute left-26 -top-1 flex flex-col items-center">
                      <div className="w-4 h-3 border-t border-l border-r border-[#2B2B2B] rounded-t-full" />
                      <div className="w-8 h-10 bg-[#C6A15B]/90 rounded-sm border border-[#C6A15B]" />
                    </div>
                  </div>
                  {/* Curated Package Box */}
                  <div className="w-14 h-8 bg-white border border-[#2B2B2B]/20 rounded shadow-sm flex items-center justify-center relative">
                    <div className="w-full h-[1px] bg-[#2B2B2B]/10 absolute top-1/2" />
                    <span className="text-[6px] font-black uppercase tracking-wider text-[#2B2B2B]/40 z-10 bg-white px-1">LuxZera</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-black uppercase tracking-wide text-[#2B2B2B] leading-tight mb-2">
                  We Curate<br />For You
                </h3>
                <p className="text-[11px] text-[#2B2B2B]/50 leading-relaxed font-medium">
                  We handpick pieces that match your taste, fit your vibe, and suit every part of your life.
                </p>
              </div>
            </div>

            {/* Card 3 — Save in Your Wardrobe */}
            <div className="flex flex-col gap-4 border-2 border-[#5B6EF5] bg-white rounded-2xl p-6 relative shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#5B6EF5] bg-[#5B6EF5]/10 px-2.5 py-1 rounded-full">
                  03
                </span>
                
                {/* Handwritten arrow/label */}
                <div className="absolute -top-8 -right-2 pointer-events-none hidden lg:block select-none">
                  <span className="text-[11px] font-black text-[#5B6EF5] italic block transform rotate-3" style={{ fontFamily: 'Georgia, serif' }}>
                    Your space
                  </span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5B6EF5" strokeWidth="1.5" className="-mt-1 -ml-3 transform -scale-x-100 rotate-45">
                    <path d="M3 3 C8 3, 15 8, 15 15" strokeLinecap="round" />
                    <path d="M10 15 L15 15 L15 10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                
                {/* Desktop Connector Arrow */}
                <div className="hidden lg:block absolute -right-5 top-1/3 -translate-y-1/2 z-20 text-[#2B2B2B]/20 pointer-events-none">
                  <svg width="24" height="12" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="0" y1="6" x2="18" y2="6" strokeDasharray="3 3" />
                    <path d="M14 2l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Miniature Wardrobe Dashboard Illustration */}
              <div className="relative w-full h-36 bg-[#FAF9F7] rounded-xl overflow-hidden border border-[#E7E3DD] flex flex-col p-2.5 select-none">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#E7E3DD] pb-1.5 mb-1.5">
                  <span className="text-[8px] font-black uppercase tracking-widest text-[#2B2B2B]">Wardrobe</span>
                  <div className="flex items-center gap-1 text-[#2B2B2B]/40">
                    <Plus size={8} strokeWidth={3} />
                    <Plus size={8} strokeWidth={3} />
                  </div>
                </div>
                {/* Tiny tabs */}
                <div className="flex gap-1 mb-2 overflow-x-auto scrollbar-none">
                  <span className="text-[6.5px] font-black uppercase tracking-wider bg-[#2B2B2B] text-white px-2 py-0.5 rounded-full shrink-0">Casual</span>
                  <span className="text-[6.5px] font-bold uppercase tracking-wider text-[#2B2B2B]/40 bg-[#E7E3DD]/40 px-2 py-0.5 rounded-full shrink-0">Office</span>
                  <span className="text-[6.5px] font-bold uppercase tracking-wider text-[#2B2B2B]/40 bg-[#E7E3DD]/40 px-2 py-0.5 rounded-full shrink-0">Vacation</span>
                </div>
                {/* Tiny items grid */}
                <div className="grid grid-cols-3 gap-1 flex-1">
                  <div className="border border-[#E7E3DD] bg-white rounded p-0.5 flex flex-col items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2B2B2B" strokeWidth="1.5">
                      <path d="M20.38 3.46L16 2.18l-4 3.75-4-3.75-4.38 1.28A2 2 0 0 0 2 5.38V20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5.38a2 2 0 0 0-1.62-1.92z" />
                    </svg>
                  </div>
                  <div className="border border-[#E7E3DD] bg-white rounded p-0.5 flex flex-col items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2B2B2B" strokeWidth="1.5">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    </svg>
                  </div>
                  <div className="border border-[#E7E3DD] bg-white rounded p-0.5 flex flex-col items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2B2B2B" strokeWidth="1.5">
                      <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-black uppercase tracking-wide text-[#2B2B2B] leading-tight mb-2">
                  Save in Your<br />Wardrobe
                </h3>
                <p className="text-[11px] text-[#2B2B2B]/50 leading-relaxed font-medium">
                  Save your favorites, build outfits, create collections, and plan your looks anytime.
                </p>
              </div>
            </div>

            {/* Card 4 — Add to Bag When Ready */}
            <div className="flex flex-col gap-4 border border-[#E7E3DD] bg-[#FAF9F7]/30 rounded-2xl p-6 relative">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#2B2B2B]/40 bg-[#E7E3DD]/45 px-2.5 py-1 rounded-full">
                  04
                </span>
                
                {/* Desktop Connector Arrow */}
                <div className="hidden lg:block absolute -right-5 top-1/3 -translate-y-1/2 z-20 text-[#2B2B2B]/20 pointer-events-none">
                  <svg width="24" height="12" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="0" y1="6" x2="18" y2="6" strokeDasharray="3 3" />
                    <path d="M14 2l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Illustration container */}
              <div className="relative w-full h-36 bg-[#F5F3F0] rounded-xl overflow-hidden border border-[#E7E3DD] flex items-center justify-center select-none">
                {/* LuxZera Shopping Bag */}
                <div className="w-16 h-20 bg-white border border-[#E7E3DD] rounded shadow-sm relative flex flex-col items-center justify-center">
                  {/* Handle */}
                  <div className="w-8 h-6 border-2 border-b-0 border-[#2B2B2B]/40 rounded-t-full absolute -top-4" />
                  <span className="text-[7.5px] font-black uppercase tracking-wider text-[#2B2B2B] mb-1">LuxZera</span>
                  {/* Heart icon inside blue badge */}
                  <div className="absolute bottom-2 -right-3 w-6 h-6 rounded-full bg-white border border-[#E7E3DD] shadow-sm flex items-center justify-center text-[#5B6EF5]">
                    <Heart size={10} className="fill-[#5B6EF5]" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-black uppercase tracking-wide text-[#2B2B2B] leading-tight mb-2">
                  Add to Bag<br />When Ready
                </h3>
                <p className="text-[11px] text-[#2B2B2B]/50 leading-relaxed font-medium">
                  Move the pieces you love to your bag when you're ready to make them yours.
                </p>
              </div>
            </div>

            {/* Card 5 — Checkout & Enjoy */}
            <div className="flex flex-col gap-4 border border-[#E7E3DD] bg-[#FAF9F7]/30 rounded-2xl p-6 relative">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#2B2B2B]/40 bg-[#E7E3DD]/45 px-2.5 py-1 rounded-full">
                  05
                </span>
              </div>

              {/* Illustration container */}
              <div className="relative w-full h-36 bg-[#F5F3F0] rounded-xl overflow-hidden border border-[#E7E3DD] flex items-center justify-center select-none">
                {/* Delivery package */}
                <div className="w-16 h-12 bg-white border border-[#2B2B2B]/30 rounded relative shadow-sm flex items-center justify-center">
                  <div className="w-full h-[1px] bg-[#2B2B2B]/20 absolute top-1/2" />
                  <div className="w-[1px] h-full bg-[#2B2B2B]/20 absolute left-1/2" />
                  {/* Shipping Label */}
                  <div className="w-5 h-3 bg-[#E7E3DD] absolute top-1.5 left-1.5 rounded-sm border border-[#2B2B2B]/10 flex flex-col justify-between p-0.5">
                    <div className="w-full h-[1px] bg-[#2B2B2B]/30" />
                    <div className="w-2/3 h-[1px] bg-[#2B2B2B]/30" />
                  </div>
                  {/* Sparkles icon next to it */}
                  <div className="absolute -top-3 -right-2 text-[#C6A15B] animate-pulse">
                    ✦
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-black uppercase tracking-wide text-[#2B2B2B] leading-tight mb-2">
                  Checkout &amp;<br />Enjoy
                </h3>
                <p className="text-[11px] text-[#2B2B2B]/50 leading-relaxed font-medium">
                  Experience fast delivery and step out in styles that feel uniquely you.
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-10 mt-16 border-t border-[#E7E3DD]">
            
            {/* Feature 1 — Saves You Hours */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#F5F3F0] flex items-center justify-center text-[#2B2B2B]/60 shrink-0 border border-[#E7E3DD]/60">
                <Clock size={16} strokeWidth={2} />
              </div>
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-wider text-[#2B2B2B]">
                  Saves You Hours
                </h4>
                <p className="text-[11.5px] text-[#2B2B2B]/50 font-medium leading-normal mt-1">
                  No more endless scrolling. We show you what truly fits you.
                </p>
              </div>
            </div>

            {/* Feature 2 — Made Just for You */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#F5F3F0] flex items-center justify-center text-[#2B2B2B]/60 shrink-0 border border-[#E7E3DD]/60">
                <Shirt size={16} strokeWidth={2} />
              </div>
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-wider text-[#2B2B2B]">
                  Made Just for You
                </h4>
                <p className="text-[11.5px] text-[#2B2B2B]/50 font-medium leading-normal mt-1">
                  Your style, body type, and vibe — all considered.
                </p>
              </div>
            </div>

            {/* Feature 3 — Better Choices */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#F5F3F0] flex items-center justify-center text-[#2B2B2B]/60 shrink-0 border border-[#E7E3DD]/60">
                <Tag size={16} strokeWidth={2} />
              </div>
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-wider text-[#2B2B2B]">
                  Better Choices
                </h4>
                <p className="text-[11.5px] text-[#2B2B2B]/50 font-medium leading-normal mt-1">
                  Handpicked options you'll actually wear and love.
                </p>
              </div>
            </div>

            {/* Feature 4 — More Confidence */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#F5F3F0] flex items-center justify-center text-[#2B2B2B]/60 shrink-0 border border-[#E7E3DD]/60">
                <Heart size={16} strokeWidth={2} />
              </div>
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-wider text-[#2B2B2B]">
                  More Confidence
                </h4>
                <p className="text-[11.5px] text-[#2B2B2B]/50 font-medium leading-normal mt-1">
                  Look good, feel great, every single day.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════
          4. TRENDING COLLECTIONS — Horizontal Luxury Grid
      ════════════════════════════════════════════ */}
      <section className="w-full border-b border-[#E7E3DD]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 pt-20 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#2B2B2B] leading-[0.9]">
              Trending<br /><span className="text-[#F07020]">Collections</span>
            </h2>
          </div>
          <button
            onClick={onShopNow}
            className="shrink-0 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#2B2B2B]/50 hover:text-[#5B6EF5] transition-colors"
          >
            View All <ArrowRight size={12} strokeWidth={2.5} />
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 pb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {trendingProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          4. FEATURED DESIGNERS — Bold two-card layout
      ════════════════════════════════════════════ */}
      <section className="w-full bg-[#F2EFEA] border-b border-[#E7E3DD]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 pt-20 pb-20">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-[#2B2B2B] leading-[0.9]">
                Featured<br /><span className="text-[#F07020]">Designers</span>
              </h2>
            </div>
            <button
              onClick={onShopNow}
              className="shrink-0 bg-[#2B2B2B] hover:bg-[#5B6EF5] text-[#FAF9F7] text-[10px] font-extrabold uppercase tracking-[0.28em] px-6 py-3.5 rounded-full transition-all duration-300 flex items-center gap-2"
            >
              See All Designers <ArrowRight size={12} strokeWidth={2.5} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DESIGNERS.map((d) => (
              <div
                key={d.name}
                onClick={onShopNow}
                className="group relative overflow-hidden rounded-2xl cursor-pointer border border-[#E7E3DD] bg-[#FAF9F7] flex flex-col md:flex-row h-72"
              >
                {/* Image */}
                <div className="w-full md:w-[42%] h-48 md:h-full overflow-hidden bg-[#F2EFEA] shrink-0 relative">
                  <img
                    src={d.img}
                    alt={d.name}
                    className="w-full h-full object-cover object-top transition-transform duration-[1.4s] group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#FAF9F7]/20 md:to-[#FAF9F7]/30" />
                </div>

                {/* Content */}
                <div className="flex-1 p-7 flex flex-col justify-between">
                  <div>
                    <span
                      className="text-[7.5px] font-extrabold uppercase tracking-[0.35em] block mb-2"
                      style={{ color: d.accent }}
                    >
                      {d.role} · {d.location}
                    </span>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-[#2B2B2B] leading-tight">
                      {d.name}
                    </h3>
                  </div>
                  <blockquote className="text-[12px] text-[#2B2B2B]/55 leading-[1.65] font-medium italic border-l-2 border-[#E7E3DD] pl-3 mt-2" style={{ borderColor: d.accent + "60" }}>
                    "{d.quote}"
                  </blockquote>
                  <div
                    className="mt-4 flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[0.25em] group-hover:gap-3 transition-all"
                    style={{ color: d.accent }}
                  >
                    View Collection <ArrowRight size={10} strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          5. LUXURY BRAND EDITORIAL BANNERS
      ════════════════════════════════════════════ */}
      <section className="w-full border-b border-[#E7E3DD] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* Banner 1 — Royal Blue */}
          <div
            onClick={onShopNow}
            className="group relative overflow-hidden bg-[#5B6EF5] px-12 py-16 cursor-pointer flex flex-col justify-between min-h-[18rem] border-r border-[#4a5de0]"
          >
            <div
              className="absolute inset-0 opacity-8 pointer-events-none"
              style={{
                backgroundImage: "repeating-linear-gradient(-45deg, #FAF9F7 0, #FAF9F7 1px, transparent 0, transparent 50%)",
                backgroundSize: "14px 14px",
                opacity: 0.07,
              }}
            />
            <div className="relative z-10">
              <span className="text-[8px] font-extrabold uppercase tracking-[0.4em] text-[#FAF9F7]/45 block mb-4">// Nocturne Studio · London</span>
              <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-[#FAF9F7] leading-[0.88]">
                TRENDS<br />FASHION<br />VIBES
              </h3>
            </div>
            <div className="relative z-10 flex items-end justify-between">
              <div>
                <span className="text-[8.5px] font-extrabold uppercase tracking-[0.28em] text-[#FAF9F7]/55 block">SS26 Capsule Drop</span>
                <span className="text-[10.5px] font-extrabold uppercase tracking-[0.2em] text-[#FAF9F7] mt-1 block group-hover:text-[#C6A15B] transition-colors">
                  Shop Now →
                </span>
              </div>
              {/* Right image overlay */}
              <div className="w-28 h-32 rounded-xl overflow-hidden border border-[#FAF9F7]/20 opacity-80 group-hover:opacity-100 transition-opacity">
                <img src={MODEL_B} alt="" className="w-full h-full object-cover object-top" loading="lazy" />
              </div>
            </div>
          </div>

          {/* Banner 2 — Terracotta */}
          <div
            onClick={onShopNow}
            className="group relative overflow-hidden bg-[#C97A5A] px-12 py-16 cursor-pointer flex flex-col justify-between min-h-[18rem]"
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: "repeating-linear-gradient(-45deg, #FAF9F7 0, #FAF9F7 1px, transparent 0, transparent 50%)",
                backgroundSize: "14px 14px",
                opacity: 0.07,
              }}
            />
            <div className="relative z-10">
              <span className="text-[8px] font-extrabold uppercase tracking-[0.4em] text-[#FAF9F7]/45 block mb-4">// Voidwear · Paris Atelier</span>
              <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-[#FAF9F7] leading-[0.88]">
                STYLE<br />SHIRT<br />SPRING
              </h3>
            </div>
            <div className="relative z-10 flex items-end justify-between">
              <div>
                <span className="text-[8.5px] font-extrabold uppercase tracking-[0.28em] text-[#FAF9F7]/55 block">Limited Edition</span>
                <span className="text-[10.5px] font-extrabold uppercase tracking-[0.2em] text-[#FAF9F7] mt-1 block group-hover:text-[#FAF9F7]/70 transition-colors">
                  Shop Now →
                </span>
              </div>
              <div className="w-28 h-32 rounded-xl overflow-hidden border border-[#FAF9F7]/20 opacity-80 group-hover:opacity-100 transition-opacity">
                <img src={MODEL_D} alt="" className="w-full h-full object-cover object-top" loading="lazy" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════
          6. EDITOR'S PICKS — Clean Showcase Grid
      ════════════════════════════════════════════ */}
      <section className="w-full border-b border-[#E7E3DD]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 pt-20 pb-20">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-[#2B2B2B] leading-[0.9]">
                Editor's<br /><span className="text-[#F07020]">Picks</span>
              </h2>
            </div>
            <button
              onClick={onShopNow}
              className="shrink-0 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#2B2B2B]/50 hover:text-[#5B6EF5] transition-colors"
            >
              See All <ArrowRight size={12} strokeWidth={2.5} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {editorPicks.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          7. COMMUNITY SPOTLIGHT — Big Quote + Categories
      ════════════════════════════════════════════ */}
      <section className="w-full bg-[#5B6EF5] border-b border-[#4a5de0]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-20 text-center">
          <span className="text-[8px] font-extrabold uppercase tracking-[0.4em] text-[#FAF9F7]/45 block mb-6">
            — LuxZera Community
          </span>
          <blockquote className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#FAF9F7] leading-[0.88] max-w-4xl mx-auto">
            "Fashion is not just<br />what you wear.<br />It's who you are."
          </blockquote>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {["Shirts", "Hot Summer", "Conceptual", "Denim Blazer", "Streetwear", "Luxury"].map((tag) => (
              <button
                key={tag}
                onClick={onShopNow}
                className="border border-[#FAF9F7]/25 hover:border-[#FAF9F7]/60 text-[#FAF9F7]/70 hover:text-[#FAF9F7] text-[8.5px] font-extrabold uppercase tracking-[0.28em] px-5 py-2.5 rounded-full transition-all duration-200 hover:bg-[#FAF9F7]/10"
              >
                {tag}
              </button>
            ))}
          </div>
          <button
            onClick={onShopNow}
            className="mt-10 bg-[#FAF9F7] hover:bg-[#F2EFEA] text-[#5B6EF5] text-[10px] font-extrabold uppercase tracking-[0.3em] px-8 py-4 rounded-full transition-all duration-300 inline-flex items-center gap-2"
          >
            Start Exploring <ArrowRight size={12} strokeWidth={2.5} />
          </button>
        </div>
      </section>

    </div>
  );
}