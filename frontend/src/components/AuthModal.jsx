// src/components/AuthModal.jsx
import { useEffect } from "react";
import { X } from "lucide-react";

export default function AuthModal({ isOpen, onClose, onAppleSignIn }) {
  useEffect(() => {
    /* global google */
    if (isOpen && typeof google !== "undefined") {
      const btnContainer = document.getElementById("google-signin-btn");
      if (btnContainer) {
        btnContainer.innerHTML = "";
        
        google.accounts.id.renderButton(btnContainer, {
          type: "standard",
          theme: "outline",
          size: "large",
          text: "signin_with",
          shape: "pill",
          logo_alignment: "center",
          width: 280, // Perfectly locked geometric symmetry tracking width
        });
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none bg-slate-900/10">
      {/* Click outside backdrop hook */}
      <div className="absolute inset-0 z-0" onClick={onClose} />

      {/* LUXURY COMPACT WINDOW CARD */}
      <div className="relative z-10 w-full max-w-[360px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_70px_rgba(0,0,0,0.22)] animate-in fade-in zoom-in-95 duration-150 ease-out flex flex-col">
        
        {/* BRAND NAVBAR LOGO AREA */}
        <div className="relative h-16 bg-white flex items-center justify-center overflow-hidden border-b border-slate-100 px-12">
          <img 
            src="/LuxZera.png" 
            alt="LuxZera" 
            className="h-8 w-auto object-contain select-none" 
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors duration-150 p-1 rounded-lg hover:bg-slate-50 cursor-pointer"
            aria-label="Close authentication frame"
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>

        {/* CONTROLS AREA */}
        <div className="px-6 pt-6 pb-8 flex flex-col items-center text-center">
          
          <h2 className="text-[18px] font-black uppercase tracking-tight text-[#0b2240]">
            Sign In
          </h2>
          
          {/* ── ⚡ PREMIUM HIGH-CONTRAST DESCRIPTION ── */}
          <p className="text-[12px] font-bold text-[#0b2240]/80 mt-1 max-w-[240px]">
            Choose a secure login provider to access your profile and capsule orders.
          </p>

          {/* DUAL BUTTON SYSTEM CONTAINER */}
          <div className="w-full mt-6 flex flex-col items-center justify-center gap-3">
            
            {/* 1. NATIVE GOOGLE SLOT ROW */}
            <div className="w-[280px] h-[40px] overflow-hidden flex items-center justify-center">
              <div id="google-signin-btn" className="w-full" />
            </div>

            {/* 2. PIXEL-PERFECT APPLE SIGN IN ROW */}
            <button
              onClick={(e) => {
                e.preventDefault();
                onAppleSignIn?.();
              }}
              type="button"
              className="w-[280px] h-[40px] flex items-center justify-center gap-2 bg-black hover:bg-zinc-900 active:scale-[0.99] transition-all duration-150 px-4 rounded-full shadow-sm group cursor-pointer shrink-0"
            >
              {/* ── ⚡ TRUE ORIENTATION APPLE LOGO PATH ── */}
              <svg className="h-4.5 w-auto shrink-0 fill-white mb-0.5" viewBox="0 0 172 172" width="18" height="18">
                <path d="M117.822 13.76c6.262 7.514 9.422 16.924 8.528 26.242-8.528.688-17.434-3.41-23.404-10.75-6.192-7.568-9.422-17.164-8.194-26.242 9.042.482 17.618 4.412 23.07 10.75zm26.96 85.914c-.316-19.124 15.412-28.246 16.134-28.728-8.912-13.004-22.754-14.792-27.674-15.034-11.838-1.24-23.118 7.012-29.136 7.012-5.986 0-15.342-6.84-25.138-6.634-12.87.206-24.774 7.534-31.394 19.042-13.434 23.234-3.44 57.512 9.492 76.196 6.326 9.15 13.824 19.346 23.684 18.968 9.5-.412 13.074-6.124 24.582-6.124 11.474 0 14.726 6.124 24.616 5.918 10.086-.172 16.636-9.184 22.79-18.238 7.15-10.422 10.086-20.514 10.258-21.054-.206-.068-19.824-7.602-20.214-31.358z"/>
              </svg>
              <span className="text-[13px] font-bold tracking-tight text-white">
                Sign in with Apple
              </span>
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}