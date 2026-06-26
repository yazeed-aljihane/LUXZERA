// src/Home/Home.jsx
import { ArrowRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import { PRODUCTS } from "../data/products.js";

// Curated high-fashion models matching our quiet luxury editorial spread
const LIFE_1 = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=80"; // model in warm beige coat styling
const LIFE_2 = "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80"; // high fashion black and white silhouette

export default function Home({ onShopNow }) {
  const navigate = useNavigate();

  // Retrieve products for sections
  const exclusiveProducts = PRODUCTS.slice(0, 3);
  const designerProducts = PRODUCTS.slice(3, 6);

  const stats = [
    { value: "42+", label: "Country Store in USA" },
    { value: "75+", label: "Available Stores Worldwide" },
    { value: "120+", label: "Fashion Show Organizing Yearly" }
  ];

  const categories = [
    { name: "Shirts", img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=100&q=80" },
    { name: "Hot Summer", img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=100&q=80" },
    { name: "Conceptional", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=100&q=80" },
    { name: "Denim Blazer", img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=100&q=80" },
  ];

  return (
    <div className="bg-[#F8F6F2] text-[#111111] font-luxury-body transition-all duration-300">

      {/* ═══ 1. EXCLUSIVE DESIGN SECTION ═══ */}
      <section className="max-w-7xl mx-auto px-8 lg:px-16 py-24 border-b border-[#E8E3DA] relative">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-12">
          
          <div className="w-full lg:w-1/2 text-left">
            {/* Huge elegant Cormorant serif title */}
            <h2 className="font-luxury-title text-6xl md:text-7xl font-light uppercase tracking-tight text-[#111111] leading-[0.95]">
              Exclusive <br />
              design <span className="text-[#C9A86A]">—</span>
            </h2>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col sm:flex-row items-start justify-between gap-6 text-left">
            <div className="flex items-center gap-3">
              <span className="font-luxury-title text-4xl text-[#C9A86A] font-light leading-none">LZ</span>
              <p className="text-xs text-[#2A2A2A]/70 max-w-xs font-light leading-relaxed">
                TIMELESS VARIANTS OF STYLE AND COLOURS MADE FROM HIGH QUALITY MATERIAL.
              </p>
            </div>
            <button
              onClick={onShopNow}
              className="btn-luxury-outline px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-semibold shrink-0"
            >
              View Collection
            </button>
          </div>

        </div>

        {/* 3-column product cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {exclusiveProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ═══ 2. LUXZERA PLATFORM STATS BANNER (MATTE BLACK LUXURY BANNER) ═══ */}
      <section className="w-full bg-[#111111] text-[#F8F6F2] py-20 px-8 lg:px-16 relative overflow-hidden border-b border-[#E8E3DA]/10">
        
        {/* Subtle top border highlights */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-[#C9A86A]/40" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
          
          {/* Left Block with circular image crop simulation */}
          <div className="w-full lg:w-1/2 flex items-center gap-8 text-left">
            <div className="relative shrink-0 hidden sm:block">
              {/* Image in luxury crop border */}
              <div className="w-32 h-44 border border-[#C9A86A]/40 overflow-hidden bg-[#1e1e1e]">
                <img 
                  src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&q=80" 
                  alt="Atelier capsule" 
                  className="w-full h-full object-cover object-top opacity-90 scale-105" 
                />
              </div>
              {/* Floating Vertical label */}
              <span className="absolute -left-7 top-1/2 -translate-y-1/2 -rotate-90 text-[8px] uppercase tracking-[0.3em] text-[#C9A86A] font-semibold">
                FASHION WEEK
              </span>
            </div>

            <div>
              <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#C9A86A] mb-3 block">
                // LuxZera Platform
              </span>
              <h3 className="font-luxury-title text-3xl md:text-4xl font-light uppercase tracking-tight leading-tight text-[#F8F6F2] max-w-md">
                LuxZera is a brand platform for creative misfits clothing.
              </h3>
            </div>
          </div>

          {/* Right side stats grid and action button */}
          <div className="w-full lg:w-1/2 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            {/* Stats list */}
            <div className="flex flex-col gap-6 text-left">
              {stats.map((s, idx) => (
                <div key={idx} className="flex flex-col border-l border-[#C9A86A]/30 pl-4 py-1">
                  <span className="font-luxury-title text-2xl font-light text-[#C9A86A] leading-none">{s.value}</span>
                  <span className="text-[9px] font-semibold uppercase tracking-widest text-[#F8F6F2]/60 mt-1">{s.label}</span>
                </div>
              ))}
            </div>

            <button
              onClick={onShopNow}
              className="px-10 py-5 bg-[#C9A86A] hover:bg-[#F8F6F2] text-[#111111] hover:text-[#111111] font-semibold text-[10px] uppercase tracking-[0.25em] transition-all duration-300 flex items-center gap-2.5 border border-[#C9A86A] shrink-0"
            >
              Start Shopping
              <ArrowRight size={13} />
            </button>
          </div>

        </div>
      </section>

      {/* ═══ 3. BE WHO YOU ARE SECTION ═══ */}
      <section className="max-w-7xl mx-auto px-8 lg:px-16 py-24 border-b border-[#E8E3DA] relative overflow-hidden">
        
        {/* Background branding watermark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[15vw] font-luxury-title text-[#E8E3DA]/15 pointer-events-none uppercase font-light leading-none select-none">
          LUXZERA
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 relative z-10">
          <div className="text-left">
            <h2 className="font-luxury-title text-6xl md:text-7xl font-light uppercase tracking-tight text-[#111111] leading-[0.95]">
              Be Who <br />
              You Are!
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-8 justify-between text-left w-full lg:w-auto">
            <p className="text-xs text-[#2A2A2A]/70 max-w-xs font-light leading-relaxed">
              Refresh your wardrobe with new exclusive streetwear from our stylish collections. Crafted for character.
            </p>
            <button
              onClick={onShopNow}
              className="btn-luxury-outline px-8 py-4 text-[10px] uppercase tracking-[0.25em] font-semibold flex items-center gap-2.5 shrink-0"
            >
              Start Shopping <ArrowRight size={12} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* 2-column lifestyle image grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
          
          {/* Card 1 */}
          <div 
            onClick={onShopNow}
            className="group cursor-pointer flex flex-col text-left"
          >
            <div className="aspect-[4/3] overflow-hidden border border-[#E8E3DA] bg-[#E8E3DA]/25 select-none relative mb-4">
              <img 
                src={LIFE_1} 
                alt="Denim styling" 
                className="w-full h-full object-cover object-top img-luxury-zoom" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/70 via-transparent to-transparent flex items-end p-8">
                <div className="text-left">
                  <span className="font-luxury-title text-2xl font-light text-[#F8F6F2] uppercase tracking-wide">Street Casual</span>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#C9A86A] mt-1.5">Cop Capsule Drops</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div 
            onClick={onShopNow}
            className="group cursor-pointer flex flex-col text-left"
          >
            <div className="aspect-[4/3] overflow-hidden border border-[#E8E3DA] bg-[#E8E3DA]/25 select-none relative mb-4">
              <img 
                src={LIFE_2} 
                alt="Patterned shirt styling" 
                className="w-full h-full object-cover object-top img-luxury-zoom" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/70 via-transparent to-transparent flex items-end p-8">
                <div className="text-left">
                  <span className="font-luxury-title text-2xl font-light text-[#F8F6F2] uppercase tracking-wide">Designer Fits</span>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#C9A86A] mt-1.5">Explore Style Boards</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══ 4. EDITORIAL TEXT BLOCKQUOTE ═══ */}
      <section className="w-full bg-[#F8F6F2] py-8 border-b border-[#E8E3DA] select-none text-center">
        <blockquote className="font-luxury-title text-2xl md:text-3xl italic text-[#111111]/85 leading-relaxed max-w-4xl mx-auto px-8 py-10">
          "Fashion is part of the daily air and it changes all the time, you can even see the approaching of a revolution in clothes."
        </blockquote>
      </section>

      {/* ═══ 5. CATEGORIES HORIZONTAL SCROLL BADGES ROW (Clean Scrolling Badges) ═══ */}
      <section className="w-full bg-[#E8E3DA]/30 border-b border-[#E8E3DA] py-6 overflow-x-auto scrollbar-none select-none">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 flex items-center justify-start md:justify-center gap-8 whitespace-nowrap min-w-max">
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              onClick={onShopNow}
              className="flex items-center gap-3 border border-[#E8E3DA] bg-[#F8F6F2] px-5 py-3.5 hover:border-[#C9A86A] transition-all cursor-pointer group hover:scale-[1.02]"
            >
              <div className="w-7 h-7 rounded-full overflow-hidden border border-[#E8E3DA] bg-[#E8E3DA]/50 shrink-0">
                <img src={cat.img} alt="" className="w-full h-full object-cover object-center" />
              </div>
              <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#111111] group-hover:text-[#C9A86A] transition-colors">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 6. TWO TRENDS CARDS SIDE-BY-SIDE ═══ */}
      <section className="max-w-7xl mx-auto px-8 lg:px-16 py-24 border-b border-[#E8E3DA]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Card 1: Matte Black Design Card */}
          <div 
            onClick={onShopNow}
            className="group cursor-pointer relative overflow-hidden bg-[#111111] border border-[#C9A86A]/20 flex flex-col md:flex-row h-72"
          >
            {/* Left Content */}
            <div className="flex-1 p-8 flex flex-col justify-between text-left relative z-10">
              <div>
                <span className="font-luxury-title text-[#F8F6F2]/30 text-xs tracking-widest block uppercase">LUXZERA EDIT</span>
                <span className="font-luxury-title text-[#C9A86A] text-2xl font-light uppercase tracking-wide mt-2 block">
                  TRENDS <br />FASHION <br />VIBES
                </span>
              </div>
              <div>
                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#F8F6F2]/60 mt-1 block">Chris Pat</span>
                <span className="text-[8px] font-light text-[#F8F6F2]/40 block mt-0.5">LuxZera is a brand platform for creative misfits clothing.</span>
              </div>
            </div>
            {/* Right Image crop */}
            <div className="w-full md:w-44 h-full relative overflow-hidden bg-[#1a1a1a] border-l border-[#E8E3DA]/10 shrink-0 select-none">
              <img 
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80" 
                alt="Chris Pat styling" 
                className="w-full h-full object-cover object-top img-luxury-zoom opacity-90" 
              />
            </div>
          </div>

          {/* Card 2: Soft Stone Design Card */}
          <div 
            onClick={onShopNow}
            className="group cursor-pointer relative overflow-hidden bg-[#E8E3DA]/40 border border-[#E8E3DA] flex flex-col md:flex-row h-72"
          >
            {/* Left Content */}
            <div className="flex-1 p-8 flex flex-col justify-between text-left relative z-10">
              <div>
                <span className="font-luxury-title text-[#111111]/30 text-xs tracking-widest block uppercase">LUXZERA EDIT</span>
                <span className="font-luxury-title text-[#111111] text-2xl font-light uppercase tracking-wide mt-2 block">
                  TRENDS <br />STYLE <br />SHIRT SPRING
                </span>
              </div>
              <div>
                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#111111]/60 mt-1 block">William R.</span>
                <span className="text-[8px] font-light text-[#111111]/50 block mt-0.5">LuxZera, which is creative and colorful at the same time.</span>
              </div>
            </div>
            {/* Right Image crop */}
            <div className="w-full md:w-44 h-full relative overflow-hidden bg-[#E8E3DA] border-l border-[#E8E3DA]/60 shrink-0 select-none">
              <img 
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80" 
                alt="William R styling" 
                className="w-full h-full object-cover object-top img-luxury-zoom" 
              />
            </div>
          </div>

        </div>
      </section>

      {/* ═══ 7. DESIGNER OUTFIT SECTION ═══ */}
      <section className="max-w-7xl mx-auto px-8 lg:px-16 py-24 relative">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-12">
          
          <div className="w-full lg:w-1/2 text-left">
            <h2 className="font-luxury-title text-6xl md:text-7xl font-light uppercase tracking-tight text-[#111111] leading-[0.95]">
              Designer <br />
              Outfit <span className="text-[#C9A86A]">—</span>
            </h2>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col sm:flex-row items-start justify-between gap-6 text-left">
            <div className="flex items-center gap-3">
              <span className="font-luxury-title text-4xl text-[#C9A86A] font-light leading-none">LZ</span>
              <p className="text-xs text-[#2A2A2A]/70 max-w-xs font-light leading-relaxed">
                TIMELESS VARIANTS OF STYLE AND COLOURS MADE FROM HIGH QUALITY MATERIAL.
              </p>
            </div>
            <button
              onClick={onShopNow}
              className="btn-luxury-outline px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-semibold shrink-0"
            >
              View Collection
            </button>
          </div>

        </div>

        {/* 3-column product cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {designerProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

    </div>
  );
}