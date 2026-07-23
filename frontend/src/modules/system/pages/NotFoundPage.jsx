import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFoundPage({ isErrorFallback = false }) {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    let idleTimer = null;

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
      
      setIsMoving(true);
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        setIsMoving(false);
      }, 1000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (idleTimer) clearTimeout(idleTimer);
    };
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

            {/* Facial Expressions: Mesmerized Child-like Wonder & Excitement */}
            <div 
              className="absolute z-20 flex flex-col items-center justify-center top-[30%]"
              style={{ transform: `translate(${mousePos.x * 6}px, ${mousePos.y * 6}px)` }}
            >
              {/* Excited Wonder Eyebrows */}
              <div className="flex items-center gap-6 mb-1 opacity-90">
                <div className="w-3.5 h-[2.5px] bg-[#18181B] rounded-full transform -rotate-12" />
                <div className="w-3.5 h-[2.5px] bg-[#18181B] rounded-full transform rotate-12" />
              </div>

              {/* Mesmerized Wide Open Eyes Container with Rosy Blush */}
              <div className="relative flex items-center justify-center gap-3">
                {/* Soft Rosy Blush Cheeks */}
                <div className="absolute -left-3 top-2 w-3 h-1.5 rounded-full bg-[#F07020]/30 blur-[0.5px]" />
                <div className="absolute -right-3 top-2 w-3 h-1.5 rounded-full bg-[#F07020]/30 blur-[0.5px]" />

                {isErrorFallback ? (
                  // Error / Dizzy Eyes Expression
                  <>
                    <div className="w-5.5 h-5.5 rounded-full bg-[#18181B] flex items-center justify-center text-white text-[10px] font-bold">✕</div>
                    <div className="w-5.5 h-5.5 rounded-full bg-[#18181B] flex items-center justify-center text-white text-[10px] font-bold">✕</div>
                  </>
                ) : (
                  // Compact Wide Open Mesmerized Child-like Eyes
                  <>
                    <div className="w-4 h-4 rounded-full bg-[#18181B] relative shadow-sm">
                      {/* Primary Glossy Catchlight */}
                      <div className="w-[5px] h-[5px] rounded-full bg-white absolute top-0.5 left-0.5" />
                      {/* Secondary Wonder Sparkle */}
                      <div className="w-[2px] h-[2px] rounded-full bg-white/90 absolute bottom-0.5 right-0.5" />
                    </div>
                    <div className="w-4 h-4 rounded-full bg-[#18181B] relative shadow-sm">
                      {/* Primary Glossy Catchlight */}
                      <div className="w-[5px] h-[5px] rounded-full bg-white absolute top-0.5 left-0.5" />
                      {/* Secondary Wonder Sparkle */}
                      <div className="w-[2px] h-[2px] rounded-full bg-white/90 absolute bottom-0.5 right-0.5" />
                    </div>
                  </>
                )}
              </div>

              {/* Dynamic Mouth Expression: Normal Smile when stationary vs Mesmerized :o when cursor moves */}
              <div className="mt-1.5 opacity-95 transition-all duration-200">
                {isMoving ? (
                  // Mesmerized Open :o Wonder Mouth when active
                  <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="5" r="3.5" fill="#18181B" />
                  </svg>
                ) : (
                  // Normal Cute Smile seeing the user when stationary
                  <svg width="20" height="8" viewBox="0 0 20 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 3 2 C 6 7, 10 7, 10 2 C 10 7, 14 7, 17 2" stroke="#18181B" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                )}
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
