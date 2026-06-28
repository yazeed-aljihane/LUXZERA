// src/pages/PrivacyPolicyPage.jsx
import { ArrowRight, Clock, ShieldCheck, HelpCircle } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F7] font-sans pb-20">
      
      {/* CSS Animations */}
      <style>{`
        @keyframes doodle-wiggle {
          0%, 100% { transform: rotate(-3deg) scale(1); }
          50% { transform: rotate(3deg) scale(1.03); }
        }
        @keyframes doodle-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(1deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.97); opacity: 0.4; }
          50% { transform: scale(1.03); opacity: 0.8; }
          100% { transform: scale(0.97); opacity: 0.4; }
        }
        .doodle-wiggle:hover {
          animation: doodle-wiggle 0.5s ease-in-out infinite;
        }
        .doodle-float {
          animation: doodle-float 3s ease-in-out infinite;
        }
        .pulse-accent {
          animation: pulse-ring 2s ease-in-out infinite;
        }
      `}</style>

      {/* ── Header ── */}
      <div className="relative border-b border-[#E7E3DD] py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="h-px w-5 bg-[#F07020]" />
              <p className="text-[8.5px] font-extrabold uppercase tracking-[0.38em] text-[#F07020]">
                Human First Policy
              </p>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase leading-[0.88] tracking-tight text-[#2B2B2B]">
              Our Privacy<br />
              <span style={{ color: "#F07020" }}>Vow.</span>
            </h1>
            <p className="mt-8 text-[13px] text-[#2B2B2B]/55 leading-[1.75] max-w-lg font-medium">
              We hate boring 10,000-word legalese walls of text. Here is our promise to you in plain English, with a tiny bit of lawyer-approved translation next to it.
            </p>
          </div>

          {/* Large Hero Doodle (Padlock with Sparkles) */}
          <div className="relative shrink-0 w-44 h-44 bg-[#F2EFEA] rounded-full border border-[#E7E3DD] flex items-center justify-center doodle-float">
            <div className="absolute inset-2 border border-dashed border-[#2B2B2B]/10 rounded-full pulse-accent" />
            <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="#2B2B2B" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              {/* Shackle */}
              <path d="M30 45 V32 C30 20 40 15 50 15 C60 15 70 20 70 32 V45" />
              {/* Body */}
              <rect x="22" y="45" width="56" height="40" rx="8" fill="white" />
              {/* Keyhole */}
              <circle cx="50" cy="62" r="4" />
              <path d="M50 66 L50 74 M47 74 L53 74" />
              {/* Sparkle */}
              <path d="M80 20 L83 26 L89 29 L83 32 L80 38 L77 32 L71 29 L77 26 Z" fill="#F07020" stroke="#F07020" strokeWidth="0.5" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Core Promises Grid ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Promise 1 — No Sneaky Trackers */}
          <div className="border border-[#E7E3DD] rounded-3xl p-8 bg-[#FAF9F7] flex flex-col md:flex-row gap-6 items-start hover:border-[#5B6EF5]/40 transition-colors group">
            <div className="shrink-0 w-24 h-24 bg-[#F2EFEA] rounded-2xl border border-[#E7E3DD] flex items-center justify-center overflow-hidden">
              <svg width="60" height="60" viewBox="0 0 100 100" fill="none" stroke="#2B2B2B" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="doodle-float">
                {/* Flashlight Beam */}
                <path d="M10 20 L40 35 L30 65 L10 20 Z" fill="#F07020" fillOpacity="0.08" stroke="#F07020" strokeDasharray="3 3" />
                {/* Flashlight */}
                <path d="M5 10 L15 15 L22 30 L10 25 Z" />
                {/* Ghost running away */}
                <path d="M60 40 C60 30 75 30 75 40 C75 50 65 55 65 65 C62 65 60 62 60 60 Z" fill="white" />
                <circle cx="65" cy="40" r="1.5" fill="#2B2B2B" />
                <circle cx="70" cy="40" r="1.5" fill="#2B2B2B" />
                <path d="M63 48 Q67 52 71 48" />
              </svg>
            </div>
            <div className="flex-1">
              <span className="text-[7.5px] font-extrabold uppercase tracking-[0.3em] text-[#5B6EF5] bg-[#5B6EF5]/10 px-2 py-0.5 rounded">01 / Cookies &amp; Trackers</span>
              <h3 className="text-xl font-black uppercase tracking-tight text-[#2B2B2B] mt-2.5 mb-2">No Sneaky Trackers</h3>
              <p className="text-[12.5px] text-[#2B2B2B]/60 leading-relaxed font-medium">
                We only use cookies to keep you logged in and save your wardrobe layout. No cross-site ad retargeting, no tracking what you buy elsewhere.
              </p>
              <div className="mt-4 border-t border-[#E7E3DD] pt-3 text-[10px] text-[#2B2B2B]/40 font-mono italic leading-relaxed">
                Legalese: Strictly necessary session management cookies are deployed pursuant to GDPR Article 6(1)(f). We perform zero behavioral ad tracking.
              </div>
            </div>
          </div>

          {/* Promise 2 — We Don't Sell Data */}
          <div className="border border-[#E7E3DD] rounded-3xl p-8 bg-[#FAF9F7] flex flex-col md:flex-row gap-6 items-start hover:border-[#5B6EF5]/40 transition-colors group">
            <div className="shrink-0 w-24 h-24 bg-[#F2EFEA] rounded-2xl border border-[#E7E3DD] flex items-center justify-center overflow-hidden">
              <svg width="60" height="60" viewBox="0 0 100 100" fill="none" stroke="#2B2B2B" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="doodle-wiggle">
                {/* Piggy body */}
                <path d="M30 40 C20 40 15 50 15 60 C15 70 25 80 40 80 C60 80 75 75 75 60 C75 45 60 40 50 40 Z" fill="white" />
                {/* Snout */}
                <path d="M10 55 C8 55 5 57 5 60 C5 63 8 65 10 65 Z" />
                {/* Ears */}
                <path d="M45 40 L50 25 L55 40 Z" fill="white" />
                {/* Crossed dollar bill */}
                <g transform="translate(50, 5)">
                  <rect x="-10" y="5" width="20" height="12" rx="2" transform="rotate(15)" stroke="#5B6EF5" fill="white" />
                  <text x="0" y="14" fill="#5B6EF5" fontSize="8" fontWeight="black" textAnchor="middle" transform="rotate(15)">$</text>
                  <path d="M-12 2 L12 18" stroke="#F07020" strokeWidth="2" />
                </g>
              </svg>
            </div>
            <div className="flex-1">
              <span className="text-[7.5px] font-extrabold uppercase tracking-[0.3em] text-[#5B6EF5] bg-[#5B6EF5]/10 px-2 py-0.5 rounded">02 / Third Parties</span>
              <h3 className="text-xl font-black uppercase tracking-tight text-[#2B2B2B] mt-2.5 mb-2">We Don't Sell Data</h3>
              <p className="text-[12.5px] text-[#2B2B2B]/60 leading-relaxed font-medium">
                Your details belong to you. We do not sell your preferences, email, or order history to data brokers or third-party marketing companies. Period.
              </p>
              <div className="mt-4 border-t border-[#E7E3DD] pt-3 text-[10px] text-[#2B2B2B]/40 font-mono italic leading-relaxed">
                Legalese: Personal identifying data is strictly processed for ecommerce fulfillment and is never commoditized, sold, or shared with data brokers.
              </div>
            </div>
          </div>

          {/* Promise 3 — Secret Wardrobe */}
          <div className="border border-[#E7E3DD] rounded-3xl p-8 bg-[#FAF9F7] flex flex-col md:flex-row gap-6 items-start hover:border-[#5B6EF5]/40 transition-colors group">
            <div className="shrink-0 w-24 h-24 bg-[#F2EFEA] rounded-2xl border border-[#E7E3DD] flex items-center justify-center overflow-hidden">
              <svg width="60" height="60" viewBox="0 0 100 100" fill="none" stroke="#2B2B2B" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="doodle-float">
                {/* Cabinet Base */}
                <rect x="25" y="20" width="50" height="65" rx="4" fill="white" />
                {/* Center split line */}
                <line x1="50" y1="20" x2="50" y2="85" />
                {/* Drawer handles */}
                <circle cx="45" cy="52" r="2.5" />
                <circle cx="55" cy="52" r="2.5" />
                {/* Lock overlay */}
                <circle cx="50" cy="52" r="8" fill="white" stroke="#F07020" />
                <path d="M48 52 L52 52 M50 50 L50 54" stroke="#F07020" />
              </svg>
            </div>
            <div className="flex-1">
              <span className="text-[7.5px] font-extrabold uppercase tracking-[0.3em] text-[#5B6EF5] bg-[#5B6EF5]/10 px-2 py-0.5 rounded">03 / Security &amp; Customization</span>
              <h3 className="text-xl font-black uppercase tracking-tight text-[#2B2B2B] mt-2.5 mb-2">Secret Wardrobe</h3>
              <p className="text-[12.5px] text-[#2B2B2B]/60 leading-relaxed font-medium">
                The items, collections, and outfits you plan in your Wardrobe are stored securely. We only analyze layout patterns anonymously to make features better.
              </p>
              <div className="mt-4 border-t border-[#E7E3DD] pt-3 text-[10px] text-[#2B2B2B]/40 font-mono italic leading-relaxed">
                Legalese: Saved collections and user-curated catalogs are held securely on-platform and processed solely under user-granted customization consents.
              </div>
            </div>
          </div>

          {/* Promise 4 — Full Control */}
          <div className="border border-[#E7E3DD] rounded-3xl p-8 bg-[#FAF9F7] flex flex-col md:flex-row gap-6 items-start hover:border-[#5B6EF5]/40 transition-colors group">
            <div className="shrink-0 w-24 h-24 bg-[#F2EFEA] rounded-2xl border border-[#E7E3DD] flex items-center justify-center overflow-hidden">
              <svg width="60" height="60" viewBox="0 0 100 100" fill="none" stroke="#2B2B2B" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="doodle-wiggle">
                <circle cx="40" cy="50" r="14" />
                <path d="M40 32 L40 35 M40 65 L40 68 M22 50 L25 50 M55 50 L58 50" />
                {/* Small gear */}
                <circle cx="65" cy="65" r="9" stroke="#5B6EF5" />
                {/* Toggle slider */}
                <rect x="22" y="15" width="56" height="8" rx="4" fill="white" />
                <circle cx="60" cy="19" r="6" fill="#F07020" />
              </svg>
            </div>
            <div className="flex-1">
              <span className="text-[7.5px] font-extrabold uppercase tracking-[0.3em] text-[#5B6EF5] bg-[#5B6EF5]/10 px-2 py-0.5 rounded">04 / User Rights</span>
              <h3 className="text-xl font-black uppercase tracking-tight text-[#2B2B2B] mt-2.5 mb-2">Full Control</h3>
              <p className="text-[12.5px] text-[#2B2B2B]/60 leading-relaxed font-medium">
                Want to clear your profile, delete your photos, or wipe your wardrobe history? You can do it with one click inside your account panel. No questions asked.
              </p>
              <div className="mt-4 border-t border-[#E7E3DD] pt-3 text-[10px] text-[#2B2B2B]/40 font-mono italic leading-relaxed">
                Legalese: Users hold complete rights to erasure (GDPR Article 17), data portability (Article 20), and access (Article 15) manageable via profile dashboard.
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Rights & FAQ Section ── */}
      <section className="bg-[#F2EFEA] py-20 px-6 border-y border-[#E7E3DD]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-px w-5 bg-[#C6A15B]" />
            <p className="text-[8.5px] font-extrabold uppercase tracking-[0.38em] text-[#C6A15B]">FAQs &amp; Rights</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase leading-[0.9] tracking-tight text-[#2B2B2B] mb-12">
            Common Questions.
          </h2>

          <div className="space-y-6">
            
            <div className="bg-[#FAF9F7] border border-[#E7E3DD] rounded-2xl p-6">
              <h3 className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#2B2B2B] mb-2 flex items-center gap-2">
                <HelpCircle size={14} className="text-[#F07020]" />
                How long do we store your data?
              </h3>
              <p className="text-[12px] text-[#2B2B2B]/50 leading-relaxed font-medium">
                We keep your account info, wardrobe choices, and history as long as your account is active. If you go inactive for more than 2 years, we automatically clear it.
              </p>
            </div>

            <div className="bg-[#FAF9F7] border border-[#E7E3DD] rounded-2xl p-6">
              <h3 className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#2B2B2B] mb-2 flex items-center gap-2">
                <HelpCircle size={14} className="text-[#F07020]" />
                What happens when you delete your account?
              </h3>
              <p className="text-[12px] text-[#2B2B2B]/50 leading-relaxed font-medium">
                When you click "Delete Account", your profile, pictures, wardrobe matches, and personal settings are completely erased from our databases. Financial invoices are retained as required by tax laws.
              </p>
            </div>

            <div className="bg-[#FAF9F7] border border-[#E7E3DD] rounded-2xl p-6">
              <h3 className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#2B2B2B] mb-2 flex items-center gap-2">
                <HelpCircle size={14} className="text-[#F07020]" />
                Who handles the payment details?
              </h3>
              <p className="text-[12px] text-[#2B2B2B]/50 leading-relaxed font-medium">
                We never store your credit card details on our servers. All transactions are securely processed by PCI-compliant payment gateways.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Contact Footer Vow ── */}
      <div className="max-w-4xl mx-auto px-6 pt-20 text-center">
        <h3 className="text-2xl font-black uppercase tracking-tight text-[#2B2B2B] mb-3">
          Got privacy concerns?
        </h3>
        <p className="text-[12px] text-[#2B2B2B]/55 font-medium leading-relaxed mb-6">
          If you have questions about how we handle data, or want to make a request, shoot us a mail at <a href="mailto:privacy@luxzera.com" className="text-[#F07020] underline font-bold">privacy@luxzera.com</a>.
        </p>
        <span className="text-[8.5px] font-extrabold uppercase tracking-[0.3em] text-[#2B2B2B]/25">
          ✦ LuxZera Trust Framework
        </span>
      </div>

    </div>
  );
}
