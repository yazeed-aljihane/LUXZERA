import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFoundPage({ isErrorFallback = false }) {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate normalized mouse position (-1 to 1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden font-sans selection:bg-[#FF8C33] selection:text-white">
      {/* Dynamic Floating Background Elements */}
      <div 
        className="absolute top-[20%] left-[15%] w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] transition-transform duration-300 ease-out pointer-events-none"
        style={{ transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)` }}
      />
      <div 
        className="absolute bottom-[20%] right-[15%] w-80 h-80 bg-slate-900/5 rounded-full blur-[100px] transition-transform duration-300 ease-out pointer-events-none"
        style={{ transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px)` }}
      />

      {/* Main Content */}
      <div className="z-10 flex flex-col items-center text-center px-6">
        
        {/* Interactive Doodle Illustration */}
        <div className="relative w-64 h-64 mb-8">
          {/* Main 404 Text Background */}
          <div 
            className="absolute inset-0 flex items-center justify-center text-[180px] font-black text-slate-100 tracking-tighter opacity-80 select-none transition-transform duration-200 ease-out"
            style={{ transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)` }}
          >
            404
          </div>

          {/* Foreground Doodle Character (Robot/Astronaut head) */}
          <div 
            className="absolute inset-0 flex items-center justify-center transition-transform duration-100 ease-out"
            style={{ transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 25}px)` }}
          >
            <svg viewBox="0 0 200 200" className="w-48 h-48 drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Head Base */}
              <rect x="50" y="60" width="100" height="80" rx="24" fill="#111111" />
              {/* Ears */}
              <rect x="35" y="90" width="15" height="30" rx="6" fill="#FF8C33" />
              <rect x="150" y="90" width="15" height="30" rx="6" fill="#FF8C33" />
              {/* Antenna */}
              <rect x="96" y="30" width="8" height="30" fill="#E2E8F0" />
              <circle cx="100" cy="24" r="8" fill="#FF8C33" className="animate-pulse" />
              {/* Face Screen */}
              <rect x="62" y="72" width="76" height="46" rx="12" fill="#F8FAFC" />
              {/* Eyes (Look at mouse cursor) */}
              <g style={{ transform: `translate(${mousePos.x * 6}px, ${mousePos.y * 6}px)` }}>
                {isErrorFallback ? (
                  // X Eyes for Error
                  <>
                    <path d="M75 85 L90 100 M90 85 L75 100" stroke="#111111" strokeWidth="6" strokeLinecap="round" />
                    <path d="M110 85 L125 100 M125 85 L110 100" stroke="#111111" strokeWidth="6" strokeLinecap="round" />
                  </>
                ) : (
                  // Normal Eyes
                  <>
                    <circle cx="82" cy="95" r="8" fill="#111111" />
                    <circle cx="118" cy="95" r="8" fill="#111111" />
                    {/* Blinking highlight */}
                    <circle cx="84" cy="93" r="2" fill="white" />
                    <circle cx="120" cy="93" r="2" fill="white" />
                  </>
                )}
              </g>
              {/* Mouth */}
              <path d={isErrorFallback ? "M85 110 Q100 100 115 110" : "M90 110 Q100 115 110 110"} stroke="#111111" strokeWidth="4" strokeLinecap="round" fill="none" />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">
          {isErrorFallback ? "Oops! Something went wrong." : "You look a little lost."}
        </h1>
        <p className="text-slate-500 text-sm mb-8 max-w-sm leading-relaxed">
          {isErrorFallback 
            ? "We've logged the error in the console and are working on fixing it. Let's get you back to safety."
            : "The page you're looking for doesn't exist or has been moved. Let's get you back to the latest drops."}
        </p>

        <button 
          onClick={() => navigate("/")}
          className="group relative inline-flex items-center justify-center px-8 py-3.5 text-xs font-bold text-white uppercase tracking-[0.2em] bg-[#111111] rounded-full overflow-hidden transition-transform active:scale-[0.98]"
        >
          <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black" />
          <span className="relative flex items-center gap-2">
            <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
            Return Home
          </span>
        </button>

      </div>
    </div>
  );
}
