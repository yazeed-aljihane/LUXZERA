// src/pages/BecomeDesignerPage.jsx
import { useState, useRef } from "react";
import { ArrowRight, Check, Sparkles, TrendingUp, Users, Bookmark, FileText, CheckCircle2, ChevronDown, Award } from "lucide-react";

export default function BecomeDesignerPage() {
  const [activeTab, setActiveTab] = useState("story"); // story, collection, portfolio
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Success Stories Scroll target
  const successRef = useRef(null);
  const scrollToSuccess = () => {
    successRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Form Fields
  const [form, setForm] = useState({
    brandName: "",
    designerName: "",
    email: "",
    website: "",
    category: "Haute Couture",
    pitch: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      // Simulate API submit delay
    }, 1000);
  };

  const handleReset = () => {
    setForm({
      brandName: "",
      designerName: "",
      email: "",
      website: "",
      category: "Haute Couture",
      pitch: "",
    });
    setIsSubmitted(false);
    setIsApplyModalOpen(false);
  };

  const faqs = [
    {
      q: "Who can become a designer?",
      a: "LuxZera is open to independent fashion designers, boutique apparel brands, emerging apparel makers, and curated craft collectives who create original garments. We prioritize craftsmanship, distinct creative identities, and sustainable or high-quality production."
    },
    {
      q: "What is the commission structure?",
      a: "We charge a transparent flat commission rate of 15% only on successful sales. There are no registration fees, monthly subscription fees, or listing charges. We only grow when you grow."
    },
    {
      q: "How long does verification take?",
      a: "Once you submit your application form, our curation committee reviews your social channels and digital lookbooks. We reply with a decision and onboarding invites within 48 to 72 hours."
    },
    {
      q: "Who owns the designs?",
      a: "You retain 100% intellectual property rights and creative ownership over all your collections, designs, photography, and brand copy. LuxZera is simply a platform that elevates and distributes your identity."
    },
    {
      q: "How do payments work?",
      a: "Payments are processed securely via Stripe. Once an order is marked as fulfilled and delivered to the customer, your funds (minus our standard 15% service fee) are automatically deposited directly to your bank account."
    }
  ];

  return (
    <div className="bg-[#FAF9F7] text-[#2B2B2B] min-h-screen pt-24 font-sans select-none overflow-x-hidden">
      
      {/* ── HERO SECTION ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-14 py-16 md:py-24 border-b border-[#E7E3DD] relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6 text-left flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F07020]/10 border border-[#F07020]/20 text-[#F07020] text-[10px] font-black uppercase tracking-wider mb-6 animate-pulse">
              <Sparkles size={12} />
              Open to Creators
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase leading-[0.9] tracking-tight text-[#1D1D1F] mb-6">
              Your Designs<br />
              Deserve More Than<br />
              A <span style={{ color: "#F07020" }}>Marketplace.</span>
            </h1>
            <p className="text-sm sm:text-base text-[#515154] font-medium leading-relaxed max-w-lg mb-8">
              Join LuxZera and showcase your collections to customers who genuinely appreciate your style. Build your brand, reach the right audience, and grow with us.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => setIsApplyModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4.5 rounded-full bg-[#1D1D1F] hover:bg-[#F07020] text-[#FAF9F7] text-[11px] font-extrabold uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_30px_rgba(240,112,32,0.25)]"
              >
                Become a Designer
              </button>
              <button
                onClick={scrollToSuccess}
                className="w-full sm:w-auto px-8 py-4.5 rounded-full border border-[#E7E3DD] hover:border-[#1D1D1F] text-[#1D1D1F] text-[11px] font-extrabold uppercase tracking-[0.2em] transition-all duration-300"
              >
                Explore Success Stories
              </button>
            </div>
          </div>

          {/* Right Hero Illustration (Pure Animated SVG Drawing Board) */}
          <div className="lg:col-span-6 flex justify-center relative">
            <div className="w-full max-w-lg aspect-square bg-white rounded-[2.5rem] border border-[#E7E3DD] p-8 shadow-[0_10px_35px_rgba(0,0,0,0.02)] flex items-center justify-center relative overflow-hidden group">
              
              {/* Soft decorative background circles */}
              <div className="absolute top-10 right-10 w-44 h-44 bg-[#F07020]/5 rounded-full filter blur-xl" />
              <div className="absolute bottom-10 left-10 w-44 h-44 bg-[#5B6EF5]/5 rounded-full filter blur-xl" />

              <svg width="340" height="340" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="text-[#1D1D1F] relative z-10 animate-float">
                {/* Drawing board canvas */}
                <rect x="15" y="10" width="70" height="60" rx="3" strokeWidth="1" />
                
                {/* Mannequin form sketch */}
                <path d="M42 20h16M50 20v45M45 28c3-3 7-3 10 0v16c-3 2-7 2-10 0V28zM42 46c5 3 11 3 16 0" strokeWidth="1.2" stroke="#F07020" />
                <path d="M48 65l-8 12M52 65l8 12" strokeWidth="1" />
                
                {/* Tape measure curves */}
                <path d="M22 45c8-10 16 2 24-8M54 48c8 10 16-2 24 8" strokeWidth="0.8" stroke="#5B6EF5" strokeDasharray="2 2" />

                {/* Grid backdrop */}
                <path d="M20 20h60M20 30h60M20 40h60M20 50h60" stroke="#E7E3DD" strokeWidth="0.5" />
                <path d="M30 15v50M40 15v50M50 15v50M60 15v50M70 15v50" stroke="#E7E3DD" strokeWidth="0.5" />

                {/* Scissors drafting tool */}
                <circle cx="28" cy="62" r="3" strokeWidth="1" />
                <circle cx="36" cy="62" r="3" strokeWidth="1" />
                <path d="M30 60l10-15M34 60l-6-9" strokeWidth="1" />

                {/* Measuring node bubble */}
                <circle cx="48" cy="28" r="1.5" fill="#FAF9F7" stroke="#F07020" strokeWidth="1.2" />
                <circle cx="50" cy="44" r="1.5" fill="#FAF9F7" stroke="#F07020" strokeWidth="1.2" />
              </svg>

              {/* Float indicators */}
              <div className="absolute bottom-6 left-8 bg-white border border-[#E7E3DD] rounded-xl py-2 px-3 shadow-md flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1D1D1F]">Ready to Launch</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── WHY SELL ON LUXZERA ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-14 py-20 border-b border-[#E7E3DD]">
        <div className="flex items-center gap-2 mb-4">
          <span className="h-px w-5 bg-[#C6A15B]" />
          <p className="text-[8.5px] font-extrabold uppercase tracking-[0.38em] text-[#C6A15B]">Value Proposition</p>
        </div>
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[#1D1D1F] mb-12">
          Why sell on <span style={{ color: "#F07020" }}>LuxZera?</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          
          {/* Card 1 */}
          <div className="bg-white border border-[#E7E3DD] rounded-3xl p-8 flex flex-col justify-between hover:shadow-[0_12px_24px_rgba(0,0,0,0.02)] transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#5B6EF5]/10 flex items-center justify-center text-[#5B6EF5] mb-6">
                <Users size={20} />
              </div>
              <h3 className="text-xl font-bold text-[#1D1D1F] mb-3">Reach the Right Customers</h3>
              <p className="text-[13px] text-[#515154] leading-relaxed font-medium">
                We don't just display products—we match collections with people who love that style. Our custom search matches shoppers based on designer fits.
              </p>
            </div>
            {/* Visual Mini Line Graphic */}
            <div className="mt-8 pt-4 border-t border-[#F5F5F7] flex items-center justify-between text-[11px] font-bold text-[#5B6EF5]">
              <span>Customer Affinity Match</span>
              <span className="px-2 py-0.5 bg-[#5B6EF5]/10 rounded-full">98.4% Accuracy</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-[#E7E3DD] rounded-3xl p-8 flex flex-col justify-between hover:shadow-[0_12px_24px_rgba(0,0,0,0.02)] transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#F07020]/10 flex items-center justify-center text-[#F07020] mb-6">
                <Award size={20} />
              </div>
              <h3 className="text-xl font-bold text-[#1D1D1F] mb-3">Build Your Brand</h3>
              <p className="text-[13px] text-[#515154] leading-relaxed font-medium">
                Create your own designer identity with a profile, story, collections, and portfolio. Express your brand voice without rigid corporate template filters.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#F5F5F7] flex items-center justify-between text-[11px] font-bold text-[#F07020]">
              <span>Independent Creator Identity</span>
              <span className="px-2 py-0.5 bg-[#F07020]/10 rounded-full">100% Customized</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-[#E7E3DD] rounded-3xl p-8 flex flex-col justify-between hover:shadow-[0_12px_24px_rgba(0,0,0,0.02)] transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#10B981]/10 flex items-center justify-center text-[#10B981] mb-6">
                <Bookmark size={20} />
              </div>
              <h3 className="text-xl font-bold text-[#1D1D1F] mb-3">More Than a Store</h3>
              <p className="text-[13px] text-[#515154] leading-relaxed font-medium">
                Customers can save your products to their digital Wardrobe, follow your collections, and return whenever they are ready to purchase. High lifetime value.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#F5F5F7] flex items-center justify-between text-[11px] font-bold text-[#10B981]">
              <span>Wardrobe Inclusions</span>
              <span className="px-2 py-0.5 bg-[#10B981]/10 rounded-full">Save and Compare</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-[#E7E3DD] rounded-3xl p-8 flex flex-col justify-between hover:shadow-[0_12px_24px_rgba(0,0,0,0.02)] transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#C6A15B]/10 flex items-center justify-center text-[#C6A15B] mb-6">
                <TrendingUp size={20} />
              </div>
              <h3 className="text-xl font-bold text-[#1D1D1F] mb-3">Grow Together</h3>
              <p className="text-[13px] text-[#515154] leading-relaxed font-medium">
                Receive analytics, customer insights, and community support to scale your fashion business. We never force artificial discounts on independent creators.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#F5F5F7] flex items-center justify-between text-[11px] font-bold text-[#C6A15B]">
              <span>Curation Growth Loop</span>
              <span className="px-2 py-0.5 bg-[#C6A15B]/10 rounded-full">Zero Forced Markdowns</span>
            </div>
          </div>

        </div>
      </section>

      {/* ── TIMELINE JOURNEY ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-14 py-20 border-b border-[#E7E3DD]">
        <div className="flex items-center gap-2 mb-4">
          <span className="h-px w-5 bg-[#C6A15B]" />
          <p className="text-[8.5px] font-extrabold uppercase tracking-[0.38em] text-[#C6A15B]">The Path</p>
        </div>
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[#1D1D1F] mb-16">
          How It <span style={{ color: "#F07020" }}>Works.</span>
        </h2>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          
          {/* Step 1 */}
          <div className="relative text-left bg-white border border-[#E7E3DD] p-6.5 rounded-2xl hover:border-[#1D1D1F] transition-all duration-300">
            <span className="text-[54px] font-black text-[#FAF9F7] text-stroke-stone absolute top-1 right-5 select-none opacity-20 pointer-events-none">01</span>
            <div className="w-10 h-10 rounded-xl bg-[#1d1d1f] text-white flex items-center justify-center text-[12px] font-black mb-5">
              1
            </div>
            <h4 className="text-[16px] font-bold text-[#1D1D1F] mb-2">Apply as a Designer</h4>
            <p className="text-[12px] text-[#515154] leading-relaxed font-medium">
              Submit your portfolio links, social profile tags, and brand vision via our short application form.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative text-left bg-white border border-[#E7E3DD] p-6.5 rounded-2xl hover:border-[#1D1D1F] transition-all duration-300">
            <span className="text-[54px] font-black text-[#FAF9F7] text-stroke-stone absolute top-1 right-5 select-none opacity-20 pointer-events-none">02</span>
            <div className="w-10 h-10 rounded-xl bg-[#1d1d1f] text-white flex items-center justify-center text-[12px] font-black mb-5">
              2
            </div>
            <h4 className="text-[16px] font-bold text-[#1D1D1F] mb-2">Get Verified</h4>
            <p className="text-[12px] text-[#515154] leading-relaxed font-medium">
              Our curation team reviews applications to ensure premium quality standards and original designer collections.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative text-left bg-white border border-[#E7E3DD] p-6.5 rounded-2xl hover:border-[#1D1D1F] transition-all duration-300">
            <span className="text-[54px] font-black text-[#FAF9F7] text-stroke-stone absolute top-1 right-5 select-none opacity-20 pointer-events-none">03</span>
            <div className="w-10 h-10 rounded-xl bg-[#1d1d1f] text-white flex items-center justify-center text-[12px] font-black mb-5">
              3
            </div>
            <h4 className="text-[16px] font-bold text-[#1D1D1F] mb-2">Upload Your Collection</h4>
            <p className="text-[12px] text-[#515154] leading-relaxed font-medium">
              Access your clean dashboard to upload garment sizing details, lifestyle photography lookbooks, and stories.
            </p>
          </div>

          {/* Step 4 */}
          <div className="relative text-left bg-white border border-[#E7E3DD] p-6.5 rounded-2xl hover:border-[#1D1D1F] transition-all duration-300">
            <span className="text-[54px] font-black text-[#FAF9F7] text-stroke-stone absolute top-1 right-5 select-none opacity-20 pointer-events-none">04</span>
            <div className="w-10 h-10 rounded-xl bg-[#1d1d1f] text-white flex items-center justify-center text-[12px] font-black mb-5">
              4
            </div>
            <h4 className="text-[16px] font-bold text-[#1D1D1F] mb-2">Publish Your Brand</h4>
            <p className="text-[12px] text-[#515154] leading-relaxed font-medium">
              Launch your custom branded storefront with verified tags. Set pricing controls and stock units instantly.
            </p>
          </div>

          {/* Step 5 */}
          <div className="relative text-left bg-white border border-[#E7E3DD] p-6.5 rounded-2xl hover:border-[#1D1D1F] transition-all duration-300">
            <span className="text-[54px] font-black text-[#FAF9F7] text-stroke-stone absolute top-1 right-5 select-none opacity-20 pointer-events-none">05</span>
            <div className="w-10 h-10 rounded-xl bg-[#1d1d1f] text-white flex items-center justify-center text-[12px] font-black mb-5">
              5
            </div>
            <h4 className="text-[16px] font-bold text-[#1D1D1F] mb-2">Reach Customers</h4>
            <p className="text-[12px] text-[#515154] leading-relaxed font-medium">
              LuxZera matches your drops with users searching for curated fashion items, increasing visibility.
            </p>
          </div>

          {/* Step 6 */}
          <div className="relative text-left bg-white border border-[#E7E3DD] p-6.5 rounded-2xl hover:border-[#1D1D1F] transition-all duration-300">
            <span className="text-[54px] font-black text-[#FAF9F7] text-stroke-stone absolute top-1 right-5 select-none opacity-20 pointer-events-none">06</span>
            <div className="w-10 h-10 rounded-xl bg-[#1d1d1f] text-white flex items-center justify-center text-[12px] font-black mb-5">
              6
            </div>
            <h4 className="text-[16px] font-bold text-[#1D1D1F] mb-2">Grow Your Business</h4>
            <p className="text-[12px] text-[#515154] leading-relaxed font-medium">
              Leverage real-time analytics to check lookbook performance, wardrobe addition metrics, and net revenue streams.
            </p>
          </div>

        </div>
      </section>

      {/* ── YOUR DESIGNER SPACE (INTERACTIVE MOCKUP) ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-14 py-20 border-b border-[#E7E3DD]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text / Tab Controls */}
          <div className="lg:col-span-5 text-left flex flex-col items-start">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-5 bg-[#C6A15B]" />
              <p className="text-[8.5px] font-extrabold uppercase tracking-[0.38em] text-[#C6A15B]">Merchant Canvas</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[#1D1D1F] mb-6">
              Your Designer<br />
              <span style={{ color: "#F07020" }}>Space.</span>
            </h2>
            <p className="text-sm text-[#515154] leading-relaxed mb-8 font-medium">
              We provide you with a high-end designer space that acts as a premium portfolio representation. No listing clutter, no noisy banner ads. Just your pure creative catalog.
            </p>

            {/* Interactive Tab Buttons */}
            <div className="flex flex-col gap-2 w-full max-w-sm">
              {[
                { id: "story", label: "Designer Story Panel", desc: "Showcase your origins, ethics, and craft vision." },
                { id: "collection", label: "Lookbook & Collection Grid", desc: "Present your pieces with premium layout grids." },
                { id: "portfolio", label: "Brand Showcase", desc: "Highlight custom editorials and sketches." }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-4 rounded-xl text-left border transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-white border-[#1D1D1F] shadow-sm"
                      : "bg-transparent border-transparent hover:bg-white/50"
                  }`}
                >
                  <p className={`text-[12px] font-bold uppercase tracking-wider ${activeTab === tab.id ? "text-[#1D1D1F]" : "text-[#86868B]"}`}>
                    {tab.label}
                  </p>
                  <p className="text-[11.5px] text-[#515154]/80 mt-1 font-medium">{tab.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Right Interactive Mockup Window (macOS style window frame) */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-2xl bg-white border border-[#E7E3DD] rounded-2xl shadow-[0_15px_45px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col">
              
              {/* Window Header */}
              <div className="bg-[#F5F5F7] px-4 py-3 border-b border-[#E7E3DD] flex items-center gap-1.5 justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] block" />
                </div>
                <span className="text-[9px] font-black tracking-[0.2em] text-[#86868B] uppercase">luxzera.com/designers/studio</span>
                <div className="w-10" />
              </div>

              {/* Profile Card Header (Inside Mockup) */}
              <div className="p-6 border-b border-[#F5F5F7] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left">
                <div className="flex items-center gap-4">
                  {/* Mock profile picture */}
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#F5F5F7] border border-[#E7E3DD]">
                    <img src="/saketh_ch.jpeg" alt="Atelier" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-[16px] font-extrabold text-[#1D1D1F]">Rostova Atelier</h4>
                      <span className="w-3.5 h-3.5 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center justify-center">
                        <Check size={8} strokeWidth={3} />
                      </span>
                    </div>
                    <p className="text-[10px] text-[#86868B] font-bold uppercase tracking-wider mt-0.5">Haute Couture · Paris & Milan</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-center sm:text-right">
                    <p className="text-[13px] font-black text-[#1D1D1F]">24.5K</p>
                    <p className="text-[9px] text-[#86868B] uppercase tracking-wider font-bold">Followers</p>
                  </div>
                  <div className="h-8 w-px bg-[#E7E3DD]" />
                  <div className="text-center sm:text-right">
                    <p className="text-[13px] font-black text-[#1D1D1F]">4.9 ★</p>
                    <p className="text-[9px] text-[#86868B] uppercase tracking-wider font-bold">Rating</p>
                  </div>
                </div>
              </div>

              {/* Dynamic Interactive Body Section */}
              <div className="p-6 min-h-[220px] bg-[#FAF9F7]/30 text-left flex-1 flex flex-col justify-start">
                
                {activeTab === "story" && (
                  <div className="animate-fade-in">
                    <h5 className="text-[11px] font-bold text-[#F07020] uppercase tracking-wider mb-2">Designer Story</h5>
                    <p className="text-[13px] text-[#515154] leading-relaxed font-normal">
                      At Rostova Atelier, our creations are born from a fusion of minimalist digital geometry and centuries-old lace tailoring. We make only 20 signed units of each jacket or dress pattern to prevent stock wastage. Partnering with LuxZera gives us the clean curation we need to reach patrons.
                    </p>
                    <div className="mt-5 p-3.5 bg-white border border-[#E7E3DD] rounded-xl flex items-center justify-between">
                      <span className="text-[10.5px] text-[#515154] font-medium">Verified Ethical Manufacturing Practices</span>
                      <span className="text-[10px] text-[#10B981] font-bold uppercase tracking-wider bg-[#10B981]/10 px-2 py-0.5 rounded-full">Certified</span>
                    </div>
                  </div>
                )}

                {activeTab === "collection" && (
                  <div className="animate-fade-in grid grid-cols-2 gap-4">
                    {/* Mock product 1 */}
                    <div className="bg-white border border-[#E7E3DD] rounded-xl p-3.5">
                      <div className="aspect-[4/3] w-full rounded-lg overflow-hidden bg-[#F5F5F7] mb-3">
                        <img src="https://images.unsplash.com/photo-1539008885759-245f4dcb4a0e?w=400&q=80" alt="Garment" className="w-full h-full object-cover object-top" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[11.5px] font-bold text-[#1D1D1F]">Geometric Silk Vest</p>
                          <p className="text-[10px] text-[#86868B] font-semibold">$340.00</p>
                        </div>
                        <button className="w-6 h-6 rounded-full bg-[#F5F5F7] hover:bg-[#5B6EF5]/15 text-[#86868B] hover:text-[#5B6EF5] flex items-center justify-center transition-colors">
                          <Bookmark size={10} />
                        </button>
                      </div>
                    </div>

                    {/* Mock product 2 */}
                    <div className="bg-white border border-[#E7E3DD] rounded-xl p-3.5">
                      <div className="aspect-[4/3] w-full rounded-lg overflow-hidden bg-[#F5F5F7] mb-3">
                        <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80" alt="Garment" className="w-full h-full object-cover object-top" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[11.5px] font-bold text-[#1D1D1F]">Linen Utility Coat</p>
                          <p className="text-[10px] text-[#86868B] font-semibold">$480.00</p>
                        </div>
                        <button className="w-6 h-6 rounded-full bg-[#F5F5F7] hover:bg-[#5B6EF5]/15 text-[#86868B] hover:text-[#5B6EF5] flex items-center justify-center transition-colors">
                          <Bookmark size={10} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "portfolio" && (
                  <div className="animate-fade-in flex flex-col gap-3">
                    <div className="aspect-[21/9] w-full rounded-xl overflow-hidden bg-[#F5F5F7] border border-[#E7E3DD]">
                      <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80" alt="Studio" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex gap-2">
                      <span className="text-[9px] font-black uppercase tracking-wider text-[#FAF9F7] bg-[#1D1D1F] px-2 py-0.5 rounded">Summer Lookbook</span>
                      <span className="text-[9px] font-black uppercase tracking-wider text-[#FAF9F7] bg-[#1D1D1F] px-2 py-0.5 rounded">Milano Showcase</span>
                    </div>
                  </div>
                )}

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ── WHY CUSTOMERS LOVE DESIGNER COLLECTIONS ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-14 py-20 border-b border-[#E7E3DD]">
        <div className="flex items-center gap-2 mb-4">
          <span className="h-px w-5 bg-[#C6A15B]" />
          <p className="text-[8.5px] font-extrabold uppercase tracking-[0.38em] text-[#C6A15B]">Customer Demand</p>
        </div>
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[#1D1D1F] mb-12">
          Why customers love <span style={{ color: "#F07020" }}>Designer Collections.</span>
        </h2>

        {/* Horizontal scroll cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6.5">
          
          <div className="flex flex-col group">
            <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#F5F5F7] border border-black/[0.04] mb-4">
              <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80" alt="Exclusive" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102" />
            </div>
            <h4 className="text-[16px] font-extrabold text-[#1D1D1F] text-left">Exclusive Designs</h4>
            <p className="text-[12px] text-[#515154] leading-relaxed mt-2 text-left font-medium">
              Every drop is a signature design concept not available in massive department outlets.
            </p>
          </div>

          <div className="flex flex-col group">
            <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#F5F5F7] border border-black/[0.04] mb-4">
              <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80" alt="Limited" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102" />
            </div>
            <h4 className="text-[16px] font-extrabold text-[#1D1D1F] text-left">Limited Collections</h4>
            <p className="text-[12px] text-[#515154] leading-relaxed mt-2 text-left font-medium">
              We support zero-waste batch production. Garments are numbered to maintain rarity.
            </p>
          </div>

          <div className="flex flex-col group">
            <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#F5F5F7] border border-black/[0.04] mb-4">
              <img src="https://images.unsplash.com/photo-1534126511673-b6899657816a?w=600&q=80" alt="Authentic" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102" />
            </div>
            <h4 className="text-[16px] font-extrabold text-[#1D1D1F] text-left">Discover Hidden Talent</h4>
            <p className="text-[12px] text-[#515154] leading-relaxed mt-2 text-left font-medium">
              Our curated platform makes it easy to support emerging designers from global hubs.
            </p>
          </div>

        </div>
      </section>

      {/* ── EVERYTHING YOU NEED (TOOL SUITE) ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-14 py-20 border-b border-[#E7E3DD]">
        <div className="flex items-center gap-2 mb-4">
          <span className="h-px w-5 bg-[#C6A15B]" />
          <p className="text-[8.5px] font-extrabold uppercase tracking-[0.38em] text-[#C6A15B]">Developer Suite</p>
        </div>
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[#1D1D1F] mb-12">
          Everything You <span style={{ color: "#F07020" }}>Need.</span>
        </h2>

        {/* Clean feature list */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { t: "Product Management", d: "List and edit styles in seconds." },
            { t: "Collection Builder", d: "Curate virtual digital lookbooks." },
            { t: "Sales Analytics", d: "Monitor revenue growth trends." },
            { t: "Customer Insights", d: "See fit feedback & wardrobe saves." },
            { t: "Order Management", d: "Track packaging and Stripe payouts." },
            { t: "Inventory Tracker", d: "Automatic low-stock warnings." },
            { t: "Performance Hub", d: "Analyze lookbook conversion rates." },
            { t: "Promotion Tools", d: "Target key customer segments." }
          ].map((f, i) => (
            <div key={i} className="bg-white border border-[#E7E3DD] rounded-2xl p-5 text-left hover:border-[#1D1D1F] transition-colors duration-300">
              <h4 className="text-[13px] font-bold text-[#1D1D1F] tracking-tight">{f.t}</h4>
              <p className="text-[11px] text-[#86868B] font-semibold mt-1">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SUCCESS STORIES ── */}
      <section ref={successRef} className="max-w-7xl mx-auto px-6 md:px-14 py-20 border-b border-[#E7E3DD]">
        <div className="flex items-center gap-2 mb-4">
          <span className="h-px w-5 bg-[#C6A15B]" />
          <p className="text-[8.5px] font-extrabold uppercase tracking-[0.38em] text-[#C6A15B]">Patron Stories</p>
        </div>
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[#1D1D1F] mb-12">
          Success <span style={{ color: "#F07020" }}>Stories.</span>
        </h2>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Testimonial 1 */}
          <div className="bg-white border border-[#E7E3DD] rounded-3xl p-8 text-left flex flex-col justify-between hover:shadow-[0_12px_24px_rgba(0,0,0,0.015)] transition-all duration-300">
            <p className="text-[14px] text-[#2B2B2B] leading-relaxed font-semibold italic">
              "LuxZera completely changed how we dropship our limited linen coats. Instead of forced markdowns on mass platforms, we connect with patrons who respect our pricing."
            </p>
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-[#F5F5F7]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-[#F5F5F7] border border-[#E7E3DD]">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" alt="Elena" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-[#1D1D1F]">Elena Rostova</h4>
                  <p className="text-[10px] text-[#86868B] font-bold uppercase tracking-wider mt-0.5">Rostova Atelier</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-black text-[#10B981]">+140%</p>
                <p className="text-[8.5px] text-[#86868B] uppercase tracking-wider font-extrabold">YoY Sales</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white border border-[#E7E3DD] rounded-3xl p-8 text-left flex flex-col justify-between hover:shadow-[0_12px_24px_rgba(0,0,0,0.015)] transition-all duration-300">
            <p className="text-[14px] text-[#2B2B2B] leading-relaxed font-semibold italic">
              "We listing our avant-garde leather collections on LuxZera, and 30% of our buyers saved our items to their digital wardrobes. That returning customer flow is incredible."
            </p>
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-[#F5F5F7]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-[#F5F5F7] border border-[#E7E3DD]">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" alt="Marcus" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-[#1D1D1F]">Marcus Sterling</h4>
                  <p className="text-[10px] text-[#86868B] font-bold uppercase tracking-wider mt-0.5">Sterling Studios</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-black text-[#10B981]">+85%</p>
                <p className="text-[8.5px] text-[#86868B] uppercase tracking-wider font-extrabold">Margin Growth</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── FAQ ACCORDION ── */}
      <section className="max-w-4xl mx-auto px-6 py-20 border-b border-[#E7E3DD]">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="h-px w-5 bg-[#C6A15B]" />
          <p className="text-[8.5px] font-extrabold uppercase tracking-[0.38em] text-[#C6A15B] text-center">Faq</p>
          <span className="h-px w-5 bg-[#C6A15B]" />
        </div>
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[#1D1D1F] text-center mb-12">
          Common Questions.
        </h2>

        <div className="flex flex-col gap-3 mt-8">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div key={index} className="bg-white border border-[#E7E3DD] rounded-2xl overflow-hidden transition-all">
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full p-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="text-[14px] font-bold text-[#1D1D1F] tracking-tight">{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-[#86868B] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? "max-h-48 border-t border-[#F5F5F7]" : "max-h-0"
                  }`}
                >
                  <p className="p-5 text-[12.5px] text-[#515154] leading-relaxed font-medium bg-[#FAF9F7]/30 text-left">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── FINAL CTA BANNER ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-[#1D1D1F] rounded-[2.5rem] py-20 px-8 text-center relative overflow-hidden shadow-xl">
          
          {/* Subtle geometric line pattern in background */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: "repeating-linear-gradient(-45deg, #FAF9F7 0, #FAF9F7 1px, transparent 0, transparent 50%)",
              backgroundSize: "16px 16px",
            }}
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase leading-[0.9] tracking-tight text-white mb-6">
              Ready to Build Your<br />
              Fashion Brand?
            </h2>
            <p className="text-[13px] text-[#FAF9F7]/70 font-medium leading-relaxed mb-8 max-w-md mx-auto">
              Join hundreds of independent designers building the future of curated digital fashion on LuxZera.
            </p>
            <button
              onClick={() => setIsApplyModalOpen(true)}
              className="px-10 py-5 rounded-full bg-white hover:bg-[#FAF9F7] text-[#1D1D1F] text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_8px_24px_rgba(255,255,255,0.1)]"
            >
              Apply as a Designer
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          APPLICATION FORM MODAL
      ════════════════════════════════════════════ */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-[#E7E3DD] w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative animate-fade-in-up">
            
            {/* Modal Header */}
            <div className="bg-[#F5F5F7] px-6 py-4.5 border-b border-[#E7E3DD] flex items-center justify-between">
              <div>
                <h4 className="text-[14px] font-black text-[#1D1D1F] uppercase tracking-wider">Designer Application</h4>
                <p className="text-[9.5px] text-[#86868B] font-bold uppercase tracking-wider mt-0.5">LuxZera Curation Hub</p>
              </div>
              <button
                onClick={handleReset}
                className="text-[10px] font-extrabold text-[#86868B] hover:text-[#1D1D1F] uppercase tracking-wider"
              >
                Close
              </button>
            </div>

            {/* Modal Body / Success Banner */}
            <div className="p-6 text-left max-h-[75vh] overflow-y-auto">
              {isSubmitted ? (
                <div className="py-8 text-center flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center justify-center mb-6">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-xl font-extrabold text-[#1D1D1F] tracking-tight">Application Submitted</h4>
                  <p className="text-[12.5px] text-[#515154] mt-3 font-medium leading-relaxed max-w-sm">
                    Thank you for applying to LuxZera! Our curation committee will review your lookbooks and digital channels and get in touch with you at <strong className="text-[#1D1D1F]">{form.email}</strong> within 48 to 72 hours.
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-8 px-6 py-3 rounded-full bg-[#1D1D1F] hover:bg-[#F07020] text-white text-[10px] font-extrabold uppercase tracking-wider transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Brand & Designer Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9.5px] font-black text-[#86868B] uppercase tracking-wider mb-1.5">Brand / Atelier Name</label>
                      <input
                        type="text"
                        required
                        value={form.brandName}
                        onChange={(e) => setForm({ ...form, brandName: e.target.value })}
                        placeholder="E.G. ROSTOVA STUDIO"
                        className="w-full bg-[#F5F5F7] border border-[#E7E3DD] rounded-xl px-4 py-3 text-[12px] font-semibold text-[#1D1D1F] outline-none focus:border-[#1D1D1F] uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-[9.5px] font-black text-[#86868B] uppercase tracking-wider mb-1.5">Designer Name</label>
                      <input
                        type="text"
                        required
                        value={form.designerName}
                        onChange={(e) => setForm({ ...form, designerName: e.target.value })}
                        placeholder="E.G. ELENA ROSTOVA"
                        className="w-full bg-[#F5F5F7] border border-[#E7E3DD] rounded-xl px-4 py-3 text-[12px] font-semibold text-[#1D1D1F] outline-none focus:border-[#1D1D1F] uppercase"
                      />
                    </div>
                  </div>

                  {/* Email & Website */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9.5px] font-black text-[#86868B] uppercase tracking-wider mb-1.5">Contact Email</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="EMAIL@BRAND.COM"
                        className="w-full bg-[#F5F5F7] border border-[#E7E3DD] rounded-xl px-4 py-3 text-[12px] font-semibold text-[#1D1D1F] outline-none focus:border-[#1D1D1F]"
                      />
                    </div>
                    <div>
                      <label className="block text-[9.5px] font-black text-[#86868B] uppercase tracking-wider mb-1.5">Website / Instagram</label>
                      <input
                        type="text"
                        required
                        value={form.website}
                        onChange={(e) => setForm({ ...form, website: e.target.value })}
                        placeholder="INSTAGRAM.COM/ATELIER"
                        className="w-full bg-[#F5F5F7] border border-[#E7E3DD] rounded-xl px-4 py-3 text-[12px] font-semibold text-[#1D1D1F] outline-none focus:border-[#1D1D1F]"
                      />
                    </div>
                  </div>

                  {/* Category Dropdown */}
                  <div>
                    <label className="block text-[9.5px] font-black text-[#86868B] uppercase tracking-wider mb-1.5">Fashion Focus Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full bg-[#F5F5F7] border border-[#E7E3DD] rounded-xl px-4 py-3 text-[12px] font-semibold text-[#1D1D1F] outline-none focus:border-[#1D1D1F]"
                    >
                      <option value="Haute Couture">Haute Couture (Bespoke Luxury)</option>
                      <option value="Ready-to-Wear">Ready-to-Wear (Premium Collections)</option>
                      <option value="Avant-Garde">Avant-Garde (Conceptual Art)</option>
                      <option value="Streetwear">Streetwear (Premium Casual)</option>
                    </select>
                  </div>

                  {/* Short Pitch */}
                  <div>
                    <label className="block text-[9.5px] font-black text-[#86868B] uppercase tracking-wider mb-1.5">Tell us about your brand</label>
                    <textarea
                      required
                      value={form.pitch}
                      onChange={(e) => setForm({ ...form, pitch: e.target.value })}
                      placeholder="DESCRIBE YOUR INSPIRATION, MATERIALS, AND ETHICS..."
                      rows="4"
                      className="w-full bg-[#F5F5F7] border border-[#E7E3DD] rounded-xl px-4 py-3 text-[12px] font-semibold text-[#1D1D1F] outline-none focus:border-[#1D1D1F]"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4.5 rounded-full bg-[#1D1D1F] hover:bg-[#F07020] text-white text-[10px] font-black uppercase tracking-[0.2em] transition-colors mt-3"
                  >
                    Submit Application
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
