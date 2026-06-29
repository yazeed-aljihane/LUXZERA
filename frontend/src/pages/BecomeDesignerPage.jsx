// src/pages/BecomeDesignerPage.jsx
import { useState, useRef } from "react";
import {
  ArrowRight, Play, CheckCircle2, ChevronDown, ChevronRight, ChevronLeft,
  Shield, Star, TrendingUp, Users, Package, BarChart2, CreditCard,
  Megaphone, Heart, Award, Lock
} from "lucide-react";

/* ─── tiny helpers ─────────────────────────────────── */
const Tag = ({ children }) => (
  <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#F07020] border border-[#F07020]/30 bg-[#F07020]/8 px-3 py-1.5 rounded-full">
    <span className="w-1.5 h-1.5 rounded-full bg-[#F07020] inline-block" />
    {children}
  </span>
);

const SectionLabel = ({ children }) => (
  <p className="text-[9px] font-extrabold uppercase tracking-[0.38em] text-[#C6A15B] mb-4">{children}</p>
);

/* ─── data ──────────────────────────────────────────── */
const HOW_IT_WORKS = [
  { n: "1", title: "Apply", desc: "Tell us about yourself and your brand." },
  { n: "2", title: "Get Verified", desc: "We review your profile and verify your brand." },
  { n: "3", title: "Upload Collection", desc: "Add your designs, photos, details and pricing." },
  { n: "4", title: "Publish", desc: "Launch your collection on LuxZera." },
  { n: "5", title: "Reach Customers", desc: "Shoppers discover, love and buy your designs." },
  { n: "6", title: "Earn & Grow", desc: "You earn. We support your growth." },
];

const FEATURES = [
  { icon: Users,      title: "Designer Profile",     desc: "Build your identity with your story, social links, portfolio and collections." },
  { icon: Package,    title: "Collection Manager",   desc: "Create unlimited collections and manage your products with ease." },
  { icon: BarChart2,  title: "Powerful Analytics",   desc: "Track views, orders, sales, customers and revenue in real-time." },
  { icon: CreditCard, title: "Order & Payment",      desc: "Secure payments, automatic payouts and order management." },
  { icon: Megaphone,  title: "Marketing Tools",      desc: "Promote your collections with banners, highlights and campaigns." },
  { icon: Users,      title: "Community & Support",  desc: "Join a community of creators. Get support and grow together." },
  { icon: Star,       title: "Growth Opportunities", desc: "Get featured, join challenges and unlock exclusive opportunities." },
  { icon: Lock,       title: "Total Control",        desc: "You own your designs and set your prices. We respect your brand." },
];

const WHY = [
  "Curated audience that values unique fashion",
  "No mass production. Only original creators",
  "Keep your brand identity and full ownership",
  "Transparent commission. Timely payments",
  "A platform designed to help you grow",
];

const TESTIMONIALS = [
  {
    quote: "LuxZera helped me turn my passion into a full-time brand. I reached customers across India who truly love my designs.",
    name: "Aanya Verma",
    role: "Founder, AANYA",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    stats: [
      { label: "Revenue Generated", value: "₹8,75,000+" },
      { label: "Orders Completed",  value: "1,250+" },
      { label: "Followers Gained",  value: "12.4K+" },
      { label: "Countries Reached", value: "5+" },
    ],
  },
  {
    quote: "I never thought I could sell internationally from my small studio. LuxZera made it possible. The tools are intuitive and the community is amazing.",
    name: "Priya Nair",
    role: "Founder, Studio Priya",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80",
    stats: [
      { label: "Revenue Generated", value: "₹5,20,000+" },
      { label: "Orders Completed",  value: "890+" },
      { label: "Followers Gained",  value: "8.1K+" },
      { label: "Countries Reached", value: "3+" },
    ],
  },
];

const TRUST = [
  { icon: Shield, title: "Secure & Trusted",     desc: "Your data and payments are always safe." },
  { icon: Heart,  title: "Fair & Transparent",   desc: "Clear policies and zero hidden charges." },
  { icon: Award,  title: "Built for Designers",  desc: "A platform designed for creators, not sellers." },
  { icon: Users,  title: "Growing Together",     desc: "We succeed when you succeed." },
];

const FAQS = [
  { q: "Who can become a designer?", a: "Independent fashion designers, boutique apparel brands, emerging makers, and curated craft collectives who create original garments. We prioritize craftsmanship, distinct creative identities, and high-quality production." },
  { q: "What is the commission structure?", a: "We charge a flat 15% only on successful sales. No registration fees, no monthly subscription, no listing charges. We only grow when you grow." },
  { q: "How long does verification take?", a: "Our curation committee reviews your social channels and digital lookbooks. You'll hear from us within 48–72 hours." },
  { q: "Who owns my designs?", a: "You retain 100% intellectual property. LuxZera is simply a platform that elevates and distributes your identity." },
  { q: "How do payments work?", a: "Payments are processed via Stripe. Funds are deposited to your bank account automatically after an order is marked fulfilled, minus our 15% service fee." },
];

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════ */
export default function BecomeDesignerPage() {
  const [activeFaq, setActiveFaq]           = useState(null);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [modalOpen, setModalOpen]           = useState(false);
  const [submitted, setSubmitted]           = useState(false);
  const successRef = useRef(null);

  const [form, setForm] = useState({ brand:"", designer:"", email:"", website:"", category:"Haute Couture", pitch:"" });
  const patch = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };
  const closeModal   = () => { setModalOpen(false); setSubmitted(false); setForm({ brand:"", designer:"", email:"", website:"", category:"Haute Couture", pitch:"" }); };

  const t = TESTIMONIALS[testimonialIdx];

  return (
    <div className="bg-[#FAFAF8] text-[#1D1D1F] overflow-x-hidden pt-[72px]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pt-14 pb-0 grid grid-cols-1 lg:grid-cols-2 gap-10 items-end min-h-[520px]">

        {/* LEFT */}
        <div className="flex flex-col gap-5 pb-10 z-10">
          <Tag>For Designers</Tag>

          <h1 className="text-[44px] sm:text-[54px] font-black leading-[1.05] tracking-[-0.02em] text-[#1D1D1F]">
            Launch Your<br />Designs.<br />
            <span style={{ color: "#F07020" }}>Inspire the World.</span>
          </h1>

          <p className="text-[14px] text-[#515154] leading-relaxed max-w-[380px] font-medium">
            LuxZera gives independent designers a platform to showcase their creativity, reach the right audience, and build a brand that grows.
          </p>

          <div className="flex flex-wrap gap-3 mt-2">
            <button
              onClick={() => setModalOpen(true)}
              className="px-6 py-3.5 rounded-full bg-[#1D1D1F] hover:bg-[#F07020] text-white text-[12px] font-extrabold uppercase tracking-[0.18em] transition-all duration-300 shadow-[0_6px_20px_rgba(0,0,0,0.15)]"
            >
              Apply as Designer
            </button>
            <button
              onClick={() => successRef.current?.scrollIntoView({ behavior:"smooth" })}
              className="flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#1D1D1F]/20 hover:border-[#1D1D1F] text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#1D1D1F] transition-all duration-300"
            >
              <span className="w-7 h-7 rounded-full bg-[#1D1D1F]/8 flex items-center justify-center">
                <Play size={10} fill="#1D1D1F" />
              </span>
              Watch how it works
            </button>
          </div>
        </div>

        {/* RIGHT — editorial photo with floating widgets */}
        <div className="relative flex justify-end items-end overflow-visible">
          {/* Main photo */}
          <div className="relative w-full max-w-[580px] aspect-[5/4] rounded-t-[28px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&q=85"
              alt="Designer at work"
              className="w-full h-full object-cover object-center"
            />
            {/* dark-to-transparent gradient at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>

          {/* Floating — earnings card (top-left of photo) */}
          <div className="absolute top-8 left-0 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.10)] px-4 py-3 min-w-[148px] border border-[#F0EDE8]">
            <p className="text-[9px] font-bold uppercase tracking-wider text-[#86868B] mb-1">Total Earnings</p>
            <p className="text-[22px] font-black text-[#1D1D1F] leading-none">₹2,45,000</p>
            <p className="text-[10px] text-[#10B981] font-bold mt-1.5">↑ 35% this month</p>
          </div>

          {/* Floating — new collection card */}
          <div className="absolute top-8 right-0 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.10)] px-3 py-2.5 border border-[#F0EDE8] flex items-center gap-3 max-w-[190px]">
            <div className="w-12 h-14 rounded-xl overflow-hidden shrink-0 bg-[#F5F5F7]">
              <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=120&q=80" alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-[8.5px] font-bold text-[#86868B] uppercase tracking-wider">New Collection</p>
              <p className="text-[12px] font-extrabold text-[#1D1D1F] mt-0.5">Urban Dream</p>
            </div>
          </div>

          {/* Floating — order card bottom-right */}
          <div className="absolute bottom-6 right-4 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.10)] px-4 py-3 border border-[#F0EDE8] min-w-[160px]">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-full bg-[#10B981]/10 text-[#10B981] flex items-center justify-center">
                <CheckCircle2 size={12} />
              </span>
              <p className="text-[9px] font-bold uppercase tracking-wider text-[#86868B]">Order Completed</p>
            </div>
            <p className="text-[14px] font-black text-[#1D1D1F]">You earned ₹3,650</p>
          </div>

          {/* Handwritten label */}
          <div className="absolute bottom-16 left-8 text-[#1D1D1F]/30 text-[13px]" style={{ fontFamily:"'Georgia',serif", fontStyle:"italic" }}>
            Your design,<br />Their favourite ♡
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════ */}
      <section className="bg-white border-y border-[#F0EDE8] py-16 mt-10">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <SectionLabel>How it Works</SectionLabel>

          {/* Desktop horizontal row */}
          <div className="hidden md:flex items-start gap-0 mt-8">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="flex-1 flex flex-col items-center text-center relative">
                {/* connector line */}
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="absolute top-[26px] left-[calc(50%+28px)] right-0 h-px bg-[#E7E3DD]" style={{ zIndex:0 }}>
                    <ArrowRight size={12} className="absolute -right-1 -top-1.5 text-[#C6A15B]" />
                  </div>
                )}
                {/* Step icon circle */}
                <div className="relative z-10 w-12 h-12 rounded-full border-2 border-[#E7E3DD] bg-white flex items-center justify-center text-[13px] font-black text-[#1D1D1F] mb-4">
                  {step.n}
                </div>
                <p className="text-[13px] font-extrabold text-[#1D1D1F] mb-1">{step.title}</p>
                <p className="text-[11px] text-[#86868B] leading-snug px-2 font-medium">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Mobile vertical */}
          <div className="md:hidden flex flex-col gap-6 mt-8">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full border-2 border-[#E7E3DD] bg-white flex items-center justify-center text-[12px] font-black text-[#1D1D1F] shrink-0">
                  {step.n}
                </div>
                <div>
                  <p className="text-[13px] font-extrabold text-[#1D1D1F]">{step.title}</p>
                  <p className="text-[12px] text-[#86868B] font-medium">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          EVERYTHING YOU NEED
      ══════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-20">
        <SectionLabel>Everything You Need to Succeed</SectionLabel>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {FEATURES.map(({ icon: Icon, title, desc }, i) => (
            <div key={i} className="flex flex-col gap-3 p-5 bg-white rounded-2xl border border-[#F0EDE8] hover:border-[#C6A15B]/40 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-[#F07020]/8 flex items-center justify-center text-[#F07020]">
                <Icon size={18} strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-[13px] font-extrabold text-[#1D1D1F] mb-1">{title}</p>
                <p className="text-[11.5px] text-[#86868B] leading-relaxed font-medium">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY + SUCCESS STORIES  (split)
      ══════════════════════════════════════════ */}
      <section ref={successRef} className="max-w-[1200px] mx-auto px-6 md:px-10 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* LEFT — Why */}
        <div>
          <SectionLabel>Why Designers Choose LuxZera</SectionLabel>
          <div className="flex flex-col gap-4 mt-6">
            {WHY.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#F07020]/10 text-[#F07020] flex items-center justify-center shrink-0">
                  <CheckCircle2 size={12} />
                </span>
                <p className="text-[14px] font-semibold text-[#1D1D1F]">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Success Stories */}
        <div>
          <SectionLabel>Success Stories</SectionLabel>

          <div className="bg-white border border-[#F0EDE8] rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.04)] mt-6">
            {/* testimonial body */}
            <div className="p-8 flex flex-col sm:flex-row gap-6 items-start">
              {/* photo */}
              <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-[#F5F5F7] border border-[#F0EDE8]">
                <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-[14px] text-[#2B2B2B] leading-relaxed font-medium italic mb-4">"{t.quote}"</p>
                <p className="text-[13px] font-extrabold text-[#1D1D1F]">— {t.name}</p>
                <p className="text-[11px] text-[#86868B] font-bold uppercase tracking-wider mt-0.5">{t.role}</p>
              </div>
            </div>

            {/* stats strip */}
            <div className="border-t border-[#F0EDE8] grid grid-cols-2 sm:grid-cols-4">
              {t.stats.map((s, i) => (
                <div key={i} className="py-4 px-5 border-r last:border-r-0 border-[#F0EDE8] text-left">
                  <p className="text-[15px] font-black text-[#1D1D1F]">{s.value}</p>
                  <p className="text-[9.5px] text-[#86868B] font-bold uppercase tracking-wider mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* carousel nav */}
            <div className="px-8 pb-5 flex items-center gap-3">
              <div className="flex gap-1.5">
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} onClick={() => setTestimonialIdx(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${i === testimonialIdx ? "bg-[#F07020] w-4" : "bg-[#E7E3DD]"}`}
                  />
                ))}
              </div>
              <div className="ml-auto flex gap-2">
                <button onClick={() => setTestimonialIdx(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                  className="w-8 h-8 rounded-full border border-[#E7E3DD] flex items-center justify-center hover:border-[#1D1D1F] transition-colors">
                  <ChevronLeft size={14} />
                </button>
                <button onClick={() => setTestimonialIdx(i => (i + 1) % TESTIMONIALS.length)}
                  className="w-8 h-8 rounded-full border border-[#E7E3DD] flex items-center justify-center hover:border-[#1D1D1F] transition-colors">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-20">
        <div className="bg-[#FDF6EE] border border-[#F0EDE8] rounded-3xl overflow-hidden relative grid grid-cols-1 lg:grid-cols-2 items-center">

          {/* left image */}
          <div className="aspect-[4/3] lg:aspect-auto lg:h-full min-h-[280px] relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=700&q=80"
              alt="Designer studio"
              className="w-full h-full object-cover"
            />
            {/* mannequin SVG overlay on the right edge */}
            <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#FDF6EE] to-transparent" />
          </div>

          {/* right content */}
          <div className="p-10 lg:p-12 flex flex-col items-start gap-5 relative z-10">
            {/* Mannequin SVG doodle */}
            <svg className="absolute right-6 top-6 opacity-10" width="70" height="100" viewBox="0 0 70 100" fill="none" stroke="#1D1D1F" strokeWidth="1.5" strokeLinecap="round">
              <path d="M35 10 C26 10 20 18 20 26 C20 34 26 40 35 40 C44 40 50 34 50 26 C50 18 44 10 35 10Z" />
              <path d="M15 50 C15 44 20 42 35 42 C50 42 55 44 55 50 L58 80 L12 80 Z" />
              <path d="M12 80 L10 95 M58 80 L60 95" />
            </svg>

            <h2 className="text-[28px] sm:text-[34px] font-black tracking-tight text-[#1D1D1F] leading-tight">
              Ready to Launch<br />Your Brand?
            </h2>
            <p className="text-[13px] text-[#515154] leading-relaxed max-w-sm font-medium">
              Join hundreds of independent designers who are building the future of fashion with LuxZera.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1D1D1F] hover:bg-[#F07020] text-white text-[11px] font-extrabold uppercase tracking-[0.18em] transition-all duration-300"
            >
              Apply as Designer <ArrowRight size={13} />
            </button>

            {/* trust badges */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-2 pt-4 border-t border-[#F0EDE8] w-full">
              {TRUST.map(({ icon: Icon, title, desc }, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <Icon size={14} className="text-[#C6A15B] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[11px] font-extrabold text-[#1D1D1F]">{title}</p>
                    <p className="text-[10.5px] text-[#86868B] font-medium">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════ */}
      <section className="max-w-[720px] mx-auto px-6 pb-24">
        <SectionLabel>Common Questions</SectionLabel>
        <div className="flex flex-col gap-2 mt-6">
          {FAQS.map((faq, i) => {
            const open = activeFaq === i;
            return (
              <div key={i} className="bg-white border border-[#F0EDE8] rounded-2xl overflow-hidden">
                <button
                  onClick={() => setActiveFaq(open ? null : i)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left gap-4"
                >
                  <span className="text-[13.5px] font-bold text-[#1D1D1F]">{faq.q}</span>
                  <ChevronDown size={15} className={`text-[#86868B] shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40" : "max-h-0"}`}>
                  <p className="px-5 pb-5 text-[12.5px] text-[#515154] leading-relaxed font-medium border-t border-[#F5F5F5] pt-3">{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          APPLICATION MODAL
      ══════════════════════════════════════════ */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-[520px] rounded-3xl overflow-hidden shadow-2xl border border-[#F0EDE8]">

            {/* header */}
            <div className="bg-[#FAFAF8] px-6 py-4 border-b border-[#F0EDE8] flex items-center justify-between">
              <div>
                <p className="text-[14px] font-black text-[#1D1D1F] uppercase tracking-wide">Designer Application</p>
                <p className="text-[10px] text-[#86868B] font-bold uppercase tracking-wider mt-0.5">LuxZera Curation Hub</p>
              </div>
              <button onClick={closeModal} className="text-[11px] font-bold uppercase tracking-wider text-[#86868B] hover:text-[#1D1D1F]">Close</button>
            </div>

            <div className="p-6 max-h-[78vh] overflow-y-auto">
              {submitted ? (
                <div className="py-10 flex flex-col items-center text-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#10B981]/10 text-[#10B981] flex items-center justify-center">
                    <CheckCircle2 size={30} />
                  </div>
                  <h3 className="text-[18px] font-extrabold text-[#1D1D1F]">Application Submitted!</h3>
                  <p className="text-[13px] text-[#515154] leading-relaxed max-w-sm">
                    Thank you! Our team will review your lookbooks and reach out to <strong>{form.email}</strong> within 48–72 hours.
                  </p>
                  <button onClick={closeModal} className="mt-4 px-6 py-3 rounded-full bg-[#1D1D1F] hover:bg-[#F07020] text-white text-[11px] font-extrabold uppercase tracking-wider transition-colors">Done</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    {[["Brand / Atelier Name", "brand", "text", "e.g. ROSTOVA STUDIO"], ["Designer Name", "designer", "text", "e.g. Elena Rostova"]].map(([label, key, type, ph]) => (
                      <div key={key}>
                        <label className="block text-[9.5px] font-black text-[#86868B] uppercase tracking-wider mb-1.5">{label}</label>
                        <input required type={type} value={form[key]} onChange={patch(key)} placeholder={ph}
                          className="w-full bg-[#F5F5F7] border border-[#E7E3DD] rounded-xl px-4 py-2.5 text-[12px] font-semibold text-[#1D1D1F] outline-none focus:border-[#1D1D1F]" />
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[["Contact Email", "email", "email", "email@brand.com"], ["Website / Instagram", "website", "text", "instagram.com/atelier"]].map(([label, key, type, ph]) => (
                      <div key={key}>
                        <label className="block text-[9.5px] font-black text-[#86868B] uppercase tracking-wider mb-1.5">{label}</label>
                        <input required type={type} value={form[key]} onChange={patch(key)} placeholder={ph}
                          className="w-full bg-[#F5F5F7] border border-[#E7E3DD] rounded-xl px-4 py-2.5 text-[12px] font-semibold text-[#1D1D1F] outline-none focus:border-[#1D1D1F]" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-[9.5px] font-black text-[#86868B] uppercase tracking-wider mb-1.5">Fashion Category</label>
                    <select value={form.category} onChange={patch("category")}
                      className="w-full bg-[#F5F5F7] border border-[#E7E3DD] rounded-xl px-4 py-2.5 text-[12px] font-semibold text-[#1D1D1F] outline-none focus:border-[#1D1D1F]">
                      <option>Haute Couture</option>
                      <option>Ready-to-Wear</option>
                      <option>Avant-Garde</option>
                      <option>Streetwear</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9.5px] font-black text-[#86868B] uppercase tracking-wider mb-1.5">Tell us about your brand</label>
                    <textarea required rows={4} value={form.pitch} onChange={patch("pitch")} placeholder="Describe your inspiration, materials, and ethics..."
                      className="w-full bg-[#F5F5F7] border border-[#E7E3DD] rounded-xl px-4 py-2.5 text-[12px] font-semibold text-[#1D1D1F] outline-none focus:border-[#1D1D1F] resize-none" />
                  </div>
                  <button type="submit" className="w-full py-3.5 rounded-full bg-[#1D1D1F] hover:bg-[#F07020] text-white text-[11px] font-black uppercase tracking-[0.18em] transition-colors mt-1">
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
