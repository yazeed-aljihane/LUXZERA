import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFoundPage({ isErrorFallback = false }) {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAF9] flex flex-col items-center justify-center relative overflow-hidden font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#F07020] selection:text-white px-6">
      {/* Soft Ambient Radial Blurs - Fully blended without sharp edges */}
      <div 
        className="absolute top-[15%] left-[20%] w-96 h-96 bg-[#F07020]/5 rounded-full blur-[120px] transition-transform duration-500 ease-out pointer-events-none"
        style={{ transform: `translate(${mousePos.x * -35}px, ${mousePos.y * -35}px)` }}
      />
      <div 
        className="absolute bottom-[15%] right-[20%] w-96 h-96 bg-[#18181B]/5 rounded-full blur-[120px] transition-transform duration-500 ease-out pointer-events-none"
        style={{ transform: `translate(${mousePos.x * 45}px, ${mousePos.y * 45}px)` }}
      />

      {/* Main Content Card - Seamless blending */}
      <div className="z-10 flex flex-col items-center text-center max-w-md mx-auto">
        
        {/* Animated 404 Mascot Canvas */}
        <div className="relative w-72 h-56 flex items-center justify-center mb-6">
          {/* Subtle Background 404 Typography */}
          <div 
            className="absolute inset-0 flex items-center justify-center text-[140px] font-extrabold text-[#18181B]/[0.05] tracking-tighter select-none transition-transform duration-300 ease-out pointer-events-none"
            style={{ transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 12}px)` }}
          >
            404
          </div>

          {/* Seamless Floating Zera Mascot */}
          <div 
            className="relative flex flex-col items-center justify-center transition-transform duration-150 ease-out"
            style={{ transform: `translate(${mousePos.x * 24}px, ${mousePos.y * 24}px)` }}
          >
            {/* Soft Mascot Glow */}
            <div className="absolute inset-0 bg-[#F07020]/10 rounded-full blur-2xl transform scale-125 pointer-events-none" />
            
            {/* Zera Logo Badge Mascot */}
            <img 
              src="/logo.png" 
              alt="Zera Mascot" 
              className="w-28 h-28 object-contain relative z-10 filter drop-shadow-sm transition-transform duration-300 hover:scale-105"
            />
            
            {/* Animated Interactive Eyes Expression */}
            <div 
              className="absolute z-20 flex items-center justify-center gap-5 top-[44%]"
              style={{ transform: `translate(${mousePos.x * 8}px, ${mousePos.y * 8}px)` }}
            >
              {isErrorFallback ? (
                // Confused / Error Eyes
                <>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#18181B]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#18181B]" />
                </>
              ) : (
                // Curiously Tracking Eyes
                <>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#18181B] relative flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-white absolute top-0.5 left-0.5" />
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#18181B] relative flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-white absolute top-0.5 left-0.5" />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Heading & Subtitle with strict contrast & controlled line length */}
        <h1 className="text-[28px] font-bold text-[#18181B] tracking-tight mb-2">
          {isErrorFallback ? "Oops! Something went wrong." : "Page not found."}
        </h1>
        <p className="text-[14px] text-[#71717A] font-normal leading-relaxed mb-8 max-w-[340px] mx-auto">
          {isErrorFallback 
            ? "Our servers encountered an issue. Let's get you back to safety."
            : "The page you are looking for doesn't exist or has been moved."}
        </p>

        {/* Compact Rounded Pill CTA */}
        <button 
          onClick={() => navigate("/")}
          className="auth-cta px-8 flex items-center justify-center gap-2 text-[13.5px] font-semibold text-white bg-[#18181B] hover:bg-black rounded-full transition-all duration-200 active:scale-[0.985] shadow-none"
        >
          <ArrowLeft size={16} />
          <span>Return Home</span>
        </button>

      </div>
    </div>
  );
}
