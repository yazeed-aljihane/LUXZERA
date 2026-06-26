// src/pages/ShopPage.jsx
// ──────────────────────────────────────────────────────────────────────────
// LUXZERA — Scalable Collection Page
// • No dept tabs (navbar handles that)
// • No product count (not scalable)
// • Category pills + Sort + Filter trigger only
// • Filter panel slides in from LEFT
// • 3-col grid with tall cards → even 6 products fill the viewport
// ──────────────────────────────────────────────────────────────────────────

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import {
  SlidersHorizontal, X, ChevronDown, RotateCcw, ArrowUpDown,
} from "lucide-react";
import ProductCard from "../components/ProductCard.jsx";
import { PRODUCTS } from "../data/products.js";

// ── Config ────────────────────────────────────────────────────────────────────
const CATEGORIES = ["All", "Tops", "Bottoms", "Outerwear"];
const SIZES      = ["XS", "S", "M", "L", "XL", "XXL"];
const BRANDS     = ["All", "Nocturne", "Voidwear", "Axle Studio"];
const PRICE_STEPS = [50, 75, 100, 125, 150, 200];
const SORT_OPTIONS = [
  { label: "Featured",          value: "featured"   },
  { label: "Price: Low → High", value: "price_asc"  },
  { label: "Price: High → Low", value: "price_desc" },
  { label: "New Arrivals",      value: "newest"     },
];

// Friendly display labels per department
const DEPT_CATEGORY_LABELS = {
  Men:    { All: "All", Tops: "Shirts & Tops",   Bottoms: "Pants",          Outerwear: "Jackets"   },
  Women:  { All: "All", Tops: "Tops & Blouses",  Bottoms: "Skirts & Pants", Outerwear: "Outerwear" },
  Unisex: { All: "All", Tops: "Tops",            Bottoms: "Bottoms",        Outerwear: "Outerwear" },
  All:    { All: "All", Tops: "Tops",            Bottoms: "Bottoms",        Outerwear: "Outerwear" },
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function useOutsideClick(cb) {
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) cb(); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [cb]);
  return ref;
}

// ═════════════════════════════════════════════════════════════════════════════
export default function ShopPage({ initialDepartment = "All" }) {

  // ── State ──────────────────────────────────────────────────────────────────
  const [activeCat,    setActiveCat]    = useState("All");
  const [activeSizes,  setActiveSizes]  = useState([]);
  const [activeBrand,  setActiveBrand]  = useState("All");
  const [priceMax,     setPriceMax]     = useState(200);
  const [sortBy,       setSortBy]       = useState("featured");
  const [filterOpen,   setFilterOpen]   = useState(false);
  const [sortOpen,     setSortOpen]     = useState(false);
  const [scrolled,     setScrolled]     = useState(false);

  const sortRef = useOutsideClick(() => setSortOpen(false));

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Reset category when dept prop changes
  useEffect(() => { setActiveCat("All"); }, [initialDepartment]);

  const toggleSize = useCallback(
    (s) => setActiveSizes((p) => p.includes(s) ? p.filter((x) => x !== s) : [...p, s]),
    [],
  );

  const clearAll = useCallback(() => {
    setActiveCat("All"); setActiveSizes([]); setActiveBrand("All"); setPriceMax(200);
  }, []);

  // ── Filtered & sorted products ─────────────────────────────────────────────
  const displayed = useMemo(() => {
    let list = [...PRODUCTS].filter((p) => p.price <= priceMax);
    if (initialDepartment !== "All") list = list.filter((p) => p.department === initialDepartment);
    if (activeCat  !== "All") list = list.filter((p) => p.category === activeCat);
    if (activeBrand !== "All") list = list.filter((p) => p.brand   === activeBrand);
    if (activeSizes.length)   list = list.filter((p) => activeSizes.some((s) => p.sizes.includes(s)));
    if (sortBy === "price_asc")  list.sort((a, b) => a.price - b.price);
    if (sortBy === "price_desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [initialDepartment, activeCat, activeBrand, activeSizes, priceMax, sortBy]);

  // ── Derived UI values ──────────────────────────────────────────────────────
  const filterCount = (activeCat !== "All" ? 1 : 0) + activeSizes.length + (activeBrand !== "All" ? 1 : 0) + (priceMax < 200 ? 1 : 0);
  const categoryLabels = DEPT_CATEGORY_LABELS[initialDepartment] || DEPT_CATEGORY_LABELS.All;
  const activeSortLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? "Featured";

  // ══════════════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-[#FAF9F7] font-sans">

      {/* ── STICKY FILTER BAR ─────────────────────────────────────────────── */}
      <div
        className={`sticky top-0 z-30 bg-[#FAF9F7]/96 backdrop-blur-xl border-b border-[#E7E3DD] transition-shadow duration-300 ${
          scrolled ? "shadow-sm shadow-[#2B2B2B]/5" : ""
        }`}
      >
        <div className="max-w-[1380px] mx-auto px-6 md:px-10 h-14 flex items-center gap-3">

          {/* Category pills — scrollable on small screens */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none flex-1 min-w-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-[0.18em] border transition-all duration-200 ${
                  activeCat === cat
                    ? "bg-[#5B6EF5] text-[#FAF9F7] border-[#5B6EF5]"
                    : "text-[#2B2B2B]/50 border-[#E7E3DD] hover:border-[#2B2B2B]/25 hover:text-[#2B2B2B]"
                }`}
              >
                {categoryLabels[cat] ?? cat}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 shrink-0">

            {/* Sort dropdown */}
            <div ref={sortRef} className="relative">
              <button
                onClick={() => setSortOpen((o) => !o)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E7E3DD] text-[9.5px] font-extrabold uppercase tracking-[0.16em] text-[#2B2B2B]/50 hover:border-[#2B2B2B]/25 hover:text-[#2B2B2B] transition-all"
              >
                <ArrowUpDown size={9} strokeWidth={3} />
                <span className="hidden sm:block">{activeSortLabel}</span>
                <ChevronDown size={8} strokeWidth={3} className={`transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`} />
              </button>

              {sortOpen && (
                <div className="absolute right-0 top-full mt-2 z-50 w-48 bg-[#FAF9F7] border border-[#E7E3DD] rounded-2xl shadow-xl shadow-[#2B2B2B]/8 overflow-hidden py-1.5">
                  {SORT_OPTIONS.map((o) => (
                    <button
                      key={o.value}
                      onClick={() => { setSortBy(o.value); setSortOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.15em] transition-colors ${
                        sortBy === o.value
                          ? "text-[#5B6EF5] bg-[#5B6EF5]/08"
                          : "text-[#2B2B2B]/55 hover:bg-[#F2EFEA] hover:text-[#2B2B2B]"
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter trigger */}
            <button
              onClick={() => setFilterOpen(true)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[9.5px] font-extrabold uppercase tracking-[0.16em] transition-all ${
                filterCount > 0
                  ? "bg-[#5B6EF5] text-[#FAF9F7] border-[#5B6EF5]"
                  : "border-[#E7E3DD] text-[#2B2B2B]/50 hover:border-[#2B2B2B]/25 hover:text-[#2B2B2B]"
              }`}
            >
              <SlidersHorizontal size={10} strokeWidth={2.5} />
              Filter
              {filterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#FAF9F7]/30 text-[8px] font-black flex items-center justify-center leading-none">
                  {filterCount}
                </span>
              )}
            </button>

          </div>
        </div>
      </div>

      {/* ── PRODUCT GRID ──────────────────────────────────────────────────── */}
      <div className="max-w-[1380px] mx-auto px-6 md:px-10 py-8">
        {displayed.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-14 h-14 rounded-full bg-[#F2EFEA] flex items-center justify-center mb-5">
              <SlidersHorizontal size={18} className="text-[#2B2B2B]/20" />
            </div>
            <p className="text-[13px] font-extrabold text-[#2B2B2B]/25 uppercase tracking-[0.25em]">No results</p>
            <p className="text-[12px] text-[#2B2B2B]/30 mt-1.5 font-medium">Try a different category or reset filters.</p>
            <button
              onClick={clearAll}
              className="mt-5 inline-flex items-center gap-1.5 text-[9.5px] font-extrabold uppercase tracking-[0.22em] text-[#5B6EF5] hover:text-[#2B2B2B] transition-colors"
            >
              <RotateCcw size={10} /> Clear filters
            </button>
          </div>
        ) : (
          /*
           * Grid strategy for scalability:
           * — 2 cols mobile, 3 cols tablet, 4 cols desktop
           * — gap-y-10 gives breathing room so even 4 products
           *   span most of the viewport height
           */
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
            {displayed.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>

      {/* ── LEFT FILTER PANEL ─────────────────────────────────────────────── */}
      {filterOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-[#2B2B2B]/20 backdrop-blur-sm"
            onClick={() => setFilterOpen(false)}
          />

          {/* Panel slides in from left */}
          <aside className="fixed left-0 top-0 h-full z-50 w-72 bg-[#FAF9F7] border-r border-[#E7E3DD] shadow-2xl flex flex-col">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E7E3DD] shrink-0">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-[#2B2B2B]">Filters</p>
              <div className="flex items-center gap-3">
                {filterCount > 0 && (
                  <button
                    onClick={clearAll}
                    className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#2B2B2B]/35 hover:text-[#C97A5A] transition-colors flex items-center gap-1"
                  >
                    <RotateCcw size={9} /> Reset
                  </button>
                )}
                <button
                  onClick={() => setFilterOpen(false)}
                  className="w-7 h-7 rounded-full bg-[#F2EFEA] flex items-center justify-center text-[#2B2B2B]/40 hover:text-[#2B2B2B] transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            </div>

            {/* Scrollable filter sections */}
            <div className="flex-1 overflow-y-auto">

              {/* Category */}
              <FilterSection label="Category">
                <div className="flex flex-col gap-0.5">
                  {CATEGORIES.map((cat) => (
                    <FilterRow
                      key={cat}
                      label={categoryLabels[cat] ?? cat}
                      active={activeCat === cat}
                      onClick={() => setActiveCat(cat)}
                    />
                  ))}
                </div>
              </FilterSection>

              {/* Brand */}
              <FilterSection label="Brand">
                <div className="flex flex-col gap-0.5">
                  {BRANDS.map((b) => (
                    <FilterRow
                      key={b}
                      label={b}
                      active={activeBrand === b}
                      onClick={() => setActiveBrand(b)}
                    />
                  ))}
                </div>
              </FilterSection>

              {/* Size */}
              <FilterSection label="Size">
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleSize(s)}
                      className={`w-10 h-10 rounded-xl text-[10.5px] font-extrabold border transition-all ${
                        activeSizes.includes(s)
                          ? "bg-[#2B2B2B] text-[#FAF9F7] border-[#2B2B2B]"
                          : "border-[#E7E3DD] text-[#2B2B2B]/45 hover:border-[#2B2B2B]/30 hover:text-[#2B2B2B]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </FilterSection>

              {/* Price */}
              <FilterSection label="Max Price">
                <div className="flex flex-wrap gap-2">
                  {PRICE_STEPS.map((p) => (
                    <button
                      key={p}
                      onClick={() => setPriceMax(p)}
                      className={`px-3 py-1.5 rounded-full text-[9.5px] font-extrabold border transition-all ${
                        priceMax === p
                          ? "bg-[#2B2B2B] text-[#FAF9F7] border-[#2B2B2B]"
                          : "border-[#E7E3DD] text-[#2B2B2B]/45 hover:border-[#2B2B2B]/30 hover:text-[#2B2B2B]"
                      }`}
                    >
                      ≤ ${p}
                    </button>
                  ))}
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-[9px] font-bold text-[#2B2B2B]/30 mb-1.5">
                    <span>$20</span>
                    <span className="text-[#2B2B2B]/60">${priceMax}</span>
                  </div>
                  <input
                    type="range" min={20} max={200} step={5} value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    className="w-full accent-[#2B2B2B] h-[3px]"
                  />
                </div>
              </FilterSection>

            </div>

            {/* Apply */}
            <div className="px-6 py-5 border-t border-[#E7E3DD] shrink-0">
              <button
                onClick={() => setFilterOpen(false)}
                className="w-full py-3.5 bg-[#2B2B2B] hover:bg-[#5B6EF5] text-[#FAF9F7] text-[10px] font-extrabold uppercase tracking-[0.28em] rounded-full transition-all duration-300"
              >
                {displayed.length === 0
                  ? "No results"
                  : `Show ${displayed.length} item${displayed.length !== 1 ? "s" : ""}`}
              </button>
            </div>
          </aside>
        </>
      )}

    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function FilterSection({ label, children }) {
  return (
    <div className="px-6 py-5 border-b border-[#E7E3DD]">
      <p className="text-[7.5px] font-extrabold uppercase tracking-[0.44em] text-[#C6A15B] mb-3">
        {label}
      </p>
      {children}
    </div>
  );
}

function FilterRow({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left py-2 px-2 rounded-lg text-[11.5px] font-semibold transition-all flex items-center gap-2 ${
        active ? "text-[#2B2B2B] font-extrabold" : "text-[#2B2B2B]/45 hover:text-[#2B2B2B] hover:bg-[#F2EFEA]"
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all ${active ? "bg-[#5B6EF5]" : "bg-transparent"}`} />
      {label}
    </button>
  );
}