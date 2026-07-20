export default function ZeraIcon({ size = 16, strokeWidth = 1.5, className = "" }) {
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
      {/* Thick sleek 'Z' symbol that supports both stroke and fill states */}
      <path d="M4 4 h16 v4 l-10 8 h10 v4 h-16 v-4 l10 -8 h-10 z" />
    </svg>
  );
}
