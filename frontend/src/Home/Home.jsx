// src/Home/Home.jsx
import { ArrowRight } from "lucide-react";
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
      <section className="w-full bg-[#F2EFEA] border-b border-[#E7E3DD] py-5 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center gap-4 whitespace-nowrap min-w-max">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={onShopNow}
              className="flex items-center gap-2.5 border border-[#E7E3DD] bg-[#FAF9F7] hover:border-[#5B6EF5]/40 hover:bg-white px-4 py-2.5 rounded-full transition-all duration-200 group shadow-sm"
            >
              <div className="w-7 h-7 rounded-full overflow-hidden border border-[#E7E3DD] shrink-0">
                <img src={cat.img} alt="" className="w-full h-full object-cover" />
              </div>
              <span className="text-[8.5px] font-extrabold uppercase tracking-[0.25em] text-[#2B2B2B] group-hover:text-[#5B6EF5] transition-colors">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          3. TRENDING COLLECTIONS — Horizontal Luxury Grid
      ════════════════════════════════════════════ */}
      <section className="w-full border-b border-[#E7E3DD]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 pt-20 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[8px] font-extrabold uppercase tracking-[0.35em] text-[#C97A5A] block mb-3">
              — What's Hot
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#2B2B2B] leading-[0.9]">
              Trending<br />Collections
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
              <span className="text-[8px] font-extrabold uppercase tracking-[0.35em] text-[#C6A15B] block mb-3">
                — Independent Creators
              </span>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-[#2B2B2B] leading-[0.9]">
                Featured<br />Designers
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
              <span className="text-[8px] font-extrabold uppercase tracking-[0.35em] text-[#5B6EF5] block mb-3">
                — Seasonal Selects
              </span>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-[#2B2B2B] leading-[0.9]">
                Editor's<br />Picks
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