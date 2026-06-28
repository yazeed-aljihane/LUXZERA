// src/components/AlmirahIcon.jsx
// Custom wardrobe / almirah cabinet SVG icon
// Represents a classic double-door wardrobe with handles

export default function AlmirahIcon({ size = 16, strokeWidth = 1.5, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Outer cabinet body */}
      <rect x="3" y="2" width="18" height="20" rx="1.2" />
      {/* Top shelf rail */}
      <line x1="3" y1="6" x2="21" y2="6" />
      {/* Center vertical door split */}
      <line x1="12" y1="6" x2="12" y2="22" />
      {/* Left door handle */}
      <circle cx="10.2" cy="13" r="0.9" fill="currentColor" stroke="none" />
      {/* Right door handle */}
      <circle cx="13.8" cy="13" r="0.9" fill="currentColor" stroke="none" />
      {/* Bottom feet */}
      <line x1="6" y1="22" x2="6" y2="24" />
      <line x1="18" y1="22" x2="18" y2="24" />
    </svg>
  );
}
