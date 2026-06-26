// src/components/Hero.jsx
import { ArrowRight } from "lucide-react";

export default function Hero({ onShopNow }) {
  // Use hero.png (daisy sunglasses girl) and a premium male model portrait
  const modelLeft = "/hero.png"; 
  const modelRight = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=700&q=80"; 

  return (
    <section className="w-full bg-[#F8F6F2] bg-luxury-grid text-[#111111] select-none overflow-hidden relative border-b border-[#E8E3DA] font-luxury-body">
      <div className="max-w-7xl mx-auto min-h-[calc(100svh-4.5rem)] flex flex-col lg:flex-row items-center relative">
        
        {/* Decorative Grid Lines / Accents */}
        <div className="absolute top-0 right-0 w-24 h-full border-l border-[#E8E3DA]/20 pointer-events-none hidden lg:block" />

        {/* ─── LEFT COLUMN: BOLD EDITORIAL TYPOGRAPHY & CTA ─── */}
        <div className="w-full lg:w-1/2 px-6 lg:px-12 py-16 lg:py-24 flex flex-col justify-center items-start z-10">
          
          {/* Luxury Label */}
          <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#C9A86A] mb-4 border border-[#C9A86A]/40 px-3.5 py-1 rounded-full bg-[#C9A86A]/5">
            LuxZera Season 2026
          </span>

          {/* Elegant Cormorant Headline */}
          <h1 className="font-luxury-title text-6xl md:text-7xl lg:text-[5.5rem] font-light leading-[0.95] tracking-tight text-[#111111] uppercase text-left">
            Bringing <br />
            every man <br />
            in style<span className="text-[#C9A86A]">.</span>
          </h1>

          {/* Subtext Paragraph */}
          <p className="mt-8 text-xs md:text-sm text-[#2A2A2A]/75 leading-relaxed max-w-sm font-light">
            If you're heading into the office or onto the street, you need to look the part. 
            These sharp jackets, shirts, and pants are perfect for a polished, phenomenal look.
          </p>

          {/* Start Finding Button - Quiet Luxury Outlined Button */}
          <div className="mt-10 w-full sm:w-auto">
            <button
              onClick={onShopNow}
              className="w-full sm:w-auto btn-luxury-outline px-8 py-4 text-[10px] uppercase tracking-[0.25em] font-semibold flex items-center justify-center gap-2.5"
            >
              Start Shopping
              <ArrowRight size={13} strokeWidth={1.5} />
            </button>
          </div>

        </div>

        {/* ─── RIGHT COLUMN: DOUBLE MODEL COMPOSITION COLLAGE ─── */}
        <div className="w-full lg:w-1/2 relative min-h-[550px] lg:min-h-[650px] flex items-center justify-center p-6 select-none">
          
          {/* Slanted Matte Black Block */}
          <div className="absolute top-[18%] left-[8%] w-[260px] md:w-[320px] h-[340px] md:h-[420px] bg-[#111111] transform -rotate-6 rounded-[36px] flex flex-col justify-end p-6 border border-[#C9A86A]/20 shadow-[0_20px_45px_rgba(0,0,0,0.12)]">
            <span className="font-luxury-title text-[#F8F6F2] text-3xl font-light uppercase tracking-tight leading-none max-w-[180px]">
              A true style <br />of indulgence.
            </span>
          </div>

          {/* Soft Stone Backdrop Circle */}
          <div className="absolute bottom-[10%] right-[10%] w-[220px] md:w-[280px] h-[220px] md:h-[280px] rounded-full bg-[#E8E3DA]/60 border border-[#E8E3DA] shadow-inner transform rotate-12" />

          {/* Model Container 1 (Left Portrait: Daisy Sunglasses Girl / hero.png) */}
          <div className="absolute top-[8%] left-[22%] w-[210px] md:w-[270px] h-[290px] md:h-[370px] rounded-[100px] overflow-hidden border-[6px] border-[#F8F6F2] shadow-[0_15px_35px_rgba(0,0,0,0.06)] z-20 group transition-all duration-500 hover:-translate-y-2">
            <img 
              src={modelLeft} 
              alt="Streetwear styling collections" 
              className="w-full h-full object-cover object-top img-luxury-zoom"
              loading="eager"
            />
          </div>

          {/* Custom Handwritten Activewear Annotation */}
          <div className="absolute top-[52%] left-[4%] z-30 hidden md:flex flex-col items-center rotate-[-12deg] pointer-events-none font-['Caveat'] text-2xl text-[#111111]/85">
            <span className="font-bold tracking-wide">Activewear</span>
            <svg width="55" height="25" viewBox="0 0 55 25" fill="none" className="text-[#111111]/60 mt-1 scale-x-[-1] rotate-[15deg]">
              <path d="M5,5 C18,22 42,18 48,8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <path d="M40,10 L48,8 L46,15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </svg>
          </div>

          {/* Model Container 2 (Right Portrait: Male Model) */}
          <div className="absolute bottom-[6%] right-[16%] w-[190px] md:w-[250px] h-[250px] md:h-[320px] rounded-[80px] overflow-hidden border-[6px] border-[#F8F6F2] shadow-[0_15px_35px_rgba(0,0,0,0.06)] z-30 group transition-all duration-500 hover:-translate-y-2">
            <img 
              src={modelRight} 
              alt="High fashion models" 
              className="w-full h-full object-cover object-top img-luxury-zoom"
              loading="eager"
            />
          </div>

        </div>

      </div>

      {/* ─── BOTTOM BLOCK BANNER GRID (Luxury Color Treatment) ─── */}
      <div className="w-full border-t border-[#E8E3DA] flex flex-col md:flex-row h-auto md:h-40">
        
        {/* Left Side: Matte Black Brand block */}
        <div className="flex-1 bg-[#111111] text-[#F8F6F2] flex items-center justify-between px-8 py-8 md:py-0 border-b md:border-b-0 md:border-r border-[#E8E3DA]/20">
          <div className="flex items-center gap-6">
            
            {/* Minimal crop model silhouettes */}
            <div className="flex -space-x-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[#E8E3DA]/30 bg-[#F8F6F2]/10">
                <img src="/hero.png" alt="" className="w-full h-full object-cover object-top scale-110" />
              </div>
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[#E8E3DA]/30 bg-[#F8F6F2]/10">
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80" alt="" className="w-full h-full object-cover object-top scale-110" />
              </div>
            </div>

            <div className="text-left">
              <span className="font-['Caveat'] text-2xl text-[#C9A86A] block leading-none">casual</span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#F8F6F2]/60 mt-1 block">Capsule Wardrobe</span>
            </div>

          </div>

          {/* Shop Casual Gold Circle Badge */}
          <button 
            onClick={onShopNow}
            className="w-16 h-16 rounded-full bg-[#C9A86A] text-[#111111] hover:bg-[#F8F6F2] hover:text-[#111111] transition-all flex flex-col items-center justify-center border border-[#C9A86A] hover:scale-105"
          >
            <ArrowRight size={14} className="-rotate-45" />
            <span className="text-[8px] font-semibold uppercase tracking-wider mt-0.5">Shop</span>
          </button>

          {/* Indulgence Motto */}
          <div className="hidden lg:block text-right">
            <span className="font-luxury-title text-xl uppercase tracking-wider text-[#F8F6F2]">
              A true style of indulgence.
            </span>
          </div>

        </div>

        {/* Right Side: Scroll Down Block in Soft Stone */}
        <div className="w-full md:w-56 bg-[#E8E3DA]/40 text-[#111111] flex flex-col items-center justify-center py-6 md:py-0 select-none">
          <span className="text-[9px] font-semibold uppercase tracking-[0.3em] mb-2 text-[#111111]/60">Scroll Down</span>
          
          {/* Luxury mouse indicator */}
          <div className="w-4 h-7 border border-[#111111]/45 rounded-full p-1 flex justify-center">
            <div className="w-1 h-1.5 bg-[#C9A86A] rounded-full animate-bounce" />
          </div>
        </div>

      </div>
    </section>
  );
}