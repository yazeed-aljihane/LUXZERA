import React from "react";

export default function Loader({ size = "w-10 h-10", className = "" }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img
        src="/LuxZera.png"
        className={`${size} animate-pulse object-contain`}
        alt="Loading..."
      />
    </div>
  );
}
