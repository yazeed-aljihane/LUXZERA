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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#F07020] selection:text-white px-6">
      
      {/* Main Content Container - 100% Seamless Pure White Blending */}
      <div className="z-10 flex flex-col items-center text-center max-w-md mx-auto py-12">
        
        {/* Animated 404 Mascot Canvas */}
        <div className="relative w-72 h-56 flex items-center justify-center mb-6">
          {/* Subtle Background 404 Text */}
          <div 
            className="absolute inset-0 flex items-center justify-center text-[140px] font-extrabold text-[#18181B]/[0.04] tracking-tighter select-none transition-transform duration-300 ease-out pointer-events-none"
            style={{ transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 12}px)` }}
          >
            404
          </div>

          {/* Seamless Floating Zera Mascot */}
          <div 
            className="relative flex flex-col items-center justify-center transition-transform duration-150 ease-out"
            style={{ transform: `translate(${mousePos.x * 24}px, ${mousePos.y * 24}px)` }}
          >
            {/* Authentic Zera Symbol */}
            <img 
              src="/logo.png" 
              alt="Zera Symbol" 
              className="w-28 h-28 object-contain relative z-10"
            />

            {/* Seamless Integrated Pupil Tracking Eyes */}
            <div 
              className="absolute z-20 flex items-center justify-center gap-3.5 top-[38%]"
              style={{ transform: `translate(${mousePos.x * 6}px, ${mousePos.y * 6}px)` }}
            >
              <div className="w-3 h-3 rounded-full bg-[#18181B] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
              <div className="w-3 h-3 rounded-full bg-[#18181B] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Heading & Subtitle with strict contrast & controlled line length */}
        <h1 className="text-[28px] font-bold text-[#18181B] tracking-tight mb-2">
          {isErrorFallback ? "Oops! Something went wrong." : "You look a little lost."}
        </h1>
        <p className="text-[14px] text-[#71717A] font-normal leading-relaxed mb-8 max-w-[340px] mx-auto">
          {isErrorFallback 
            ? "Our servers encountered an issue. Let's get you back to safety."
            : "The page you're looking for doesn't exist or has been moved. Let's get you back to the latest drops."}
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
