import React from "react";

export default function Loader({ size = "w-8 h-8", className = "" }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg 
        className={`${size} text-slate-500 drop-shadow-sm`} 
        viewBox="0 0 24 24" 
        fill="none" 
        style={{ animation: 'spin 1s steps(12, end) infinite' }}
      >
        <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="2" x2="12" y2="6" opacity="1" transform="rotate(0 12 12)" />
          <line x1="12" y1="2" x2="12" y2="6" opacity="0.9" transform="rotate(30 12 12)" />
          <line x1="12" y1="2" x2="12" y2="6" opacity="0.8" transform="rotate(60 12 12)" />
          <line x1="12" y1="2" x2="12" y2="6" opacity="0.7" transform="rotate(90 12 12)" />
          <line x1="12" y1="2" x2="12" y2="6" opacity="0.6" transform="rotate(120 12 12)" />
          <line x1="12" y1="2" x2="12" y2="6" opacity="0.5" transform="rotate(150 12 12)" />
          <line x1="12" y1="2" x2="12" y2="6" opacity="0.4" transform="rotate(180 12 12)" />
          <line x1="12" y1="2" x2="12" y2="6" opacity="0.3" transform="rotate(210 12 12)" />
          <line x1="12" y1="2" x2="12" y2="6" opacity="0.25" transform="rotate(240 12 12)" />
          <line x1="12" y1="2" x2="12" y2="6" opacity="0.2" transform="rotate(270 12 12)" />
          <line x1="12" y1="2" x2="12" y2="6" opacity="0.15" transform="rotate(300 12 12)" />
          <line x1="12" y1="2" x2="12" y2="6" opacity="0.1" transform="rotate(330 12 12)" />
        </g>
      </svg>
    </div>
  );
}
