import React from "react";

export default function Loader({ size = "w-10 h-10", className = "" }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img
        src="/logo.png"
        className={`${size} animate-spin object-contain`}
        style={{ animationDuration: "1.5s" }}
        alt="Loading..."
      />
    </div>
  );
}
