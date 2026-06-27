// src/pages/ShopPage.jsx
// ──────────────────────────────────────────────────────────────────────────
// LUXZERA — Collection Page with Permanent Left Sidebar & Editorial Header
// Philosophy: Clean, scalable category browsing with structural Left Sidebar
// ──────────────────────────────────────────────────────────────────────────

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { SlidersHorizontal, X, ArrowUpDown, RotateCcw, ChevronDown } from "lucide-react";
import ProductCard from "../components/ProductCard.jsx";
import { PRODUCTS } from "../data/products.js";

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

const DEPT_META = {
  All:    { title: "ALL",       suffix: "COLLECTIONS" },
  Men:    { title: "MEN'S",     suffix: "EDIT" },
  Women:  { title: "WOMEN'S",   suffix: "EDIT" },
  Unisex: { title: "UNISEX'S",  suffix: "EDIT" },
  Kids:   { title: "KIDS'",     suffix: "EDIT" },
};

function useOutsideClick(cb) {
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) cb(); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [cb]);
  return ref;
}

export default function ShopPage({ initialDepartment = "All" }) {
  // ── State ──────────────────────────────────────────────────────────────────
  const [activeCat,    setActiveCat]    = useState("All");
  const [activeSizes,  setActiveSizes]  = useState([]);
  const [activeBrand,  setActiveBrand]  = useState("All");
  const [priceMax,     setPriceMax]     = useState(200);
  const [sortBy,       setSortBy]       = useState("featured");
  const [sortOpen,     setSortOpen]     = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const sortRef = useOutsideClick(() => setSortOpen(false));

  // Reset category when department changes
  useEffect(() => { setActiveCat("All"); }, [initialDepartment]);

  const toggleSize = useCallback((s) => {
    setActiveSizes((p) => p.includes(s) ? p.filter((x) => x !== s) : [...p, s]);
  }, []);

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

  const filterCount = (activeCat !== "All" ? 1 : 0) + activeSizes.length + (activeBrand !== "All" ? 1 : 0) + (priceMax < 200 ? 1 : 0);
  const categoryLabels = DEPT_CATEGORY_LABELS[initialDepartment] || DEPT_CATEGORY_LABELS.All;
  const activeSortLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? "Featured";
  const meta = DEPT_META[initialDepartment] || DEPT_META.All;

  // Reusable Sidebar Inner Contents
  const SidebarContent = () => (
    <div className="flex flex-col gap-6">
      {/* Category Section */}
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

      {/* Brand Section */}
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

      {/* Size Section */}
      <FilterSection label="Size">
        <div className="flex flex-wrap gap-1.5">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => toggleSize(s)}
              className={`w-9 h-9 rounded-lg text-[10px] font-extrabold border transition-all ${
                activeSizes.includes(s)
                  ? "bg-[#5B6EF5] text-[#FAF9F7] border-[#5B6EF5]"
                  : "border-[#E7E3DD] text-[#2B2B2B]/60 hover:border-[#2B2B2B]/40 hover:text-[#2B2B2B]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Price Section */}
      <FilterSection label="Max Price">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {PRICE_STEPS.map((p) => (
            <button
              key={p}
              onClick={() => setPriceMax(p)}
              className={`px-2.5 py-1 rounded-full text-[9px] font-extrabold border transition-all ${
                priceMax === p
                  ? "bg-[#2B2B2B] text-[#FAF9F7] border-[#2B2B2B]"
                  : "border-[#E7E3DD] text-[#2B2B2B]/45 hover:border-[#2B2B2B]/30"
              }`}
            >
              ${p}
            </button>
          ))}
        </div>
        <div>
          <div className="flex justify-between text-[9px] font-bold text-[#2B2B2B]/30 mb-1">
            <span>$20</span>
            <span className="text-[#5B6EF5] font-extrabold">${priceMax}</span>
          </div>
          <input
            type="range" min={20} max={200} step={5} value={priceMax}
            onChange={(e) => setPriceMax(Number(e.target.value))}
            className="w-full accent-[#5B6EF5] h-[3px]"
          />
        </div>
      </FilterSection>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF9F7] font-sans">

      {/* ── EDITORIAL HEADER ──────────────────────────────────────────────── */}
      <div className="relative border-b border-[#E7E3DD] overflow-hidden bg-[#FAF9F7]">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(#2B2B2B 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        
        <div className="max-w-[1380px] mx-auto px-6 md:px-12 pt-8 pb-8 relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-px w-5 bg-[#C6A15B]" />
            <span className="text-[8.5px] font-extrabold uppercase tracking-[0.4em] text-[#C6A15B]">
              Season 2026 · Live Now
            </span>
          </div>
          {/* Custom logo themed header: First word Orange (Lux theme), second word Navy (Zera theme) */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase leading-[0.88] tracking-[-0.025em]">
            <span style={{ color: "#F07020" }}>{meta.title}</span>{" "}
            <span style={{ color: "#1E2D4A" }}>{meta.suffix}</span>
          </h1>
        </div>
      </div>

      {/* ── TOOLBAR ────────────────────────────────────────────────────────── */}
      <div className="border-b border-[#E7E3DD] sticky top-0 z-30 bg-[#FAF9F7]/95 backdrop-blur-md">
        <div className="max-w-[1380px] mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
          
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="md:hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E7E3DD] text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#2B2B2B]/60"
          >
            <SlidersHorizontal size={11} />
            Filters {filterCount > 0 && `(${filterCount})`}
          </button>

          {/* Desktop Left aligned summary */}
          <span className="hidden md:inline text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#2B2B2B]/40">
            {displayed.length} Items Available
          </span>

          <div className="flex items-center gap-3">
            {/* Reset option when active */}
            {filterCount > 0 && (
              <button onClick={clearAll} className="inline-flex items-center gap-1 text-[9.5px] font-extrabold uppercase tracking-[0.18em] text-[#C97A5A] hover:text-[#2B2B2B] transition-colors mr-2">
                <RotateCcw size={10} /> Reset
              </button>
            )}

            {/* Sort Dropdown */}
            <div ref={sortRef} className="relative">
              <button
                onClick={() => setSortOpen((o) => !o)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E7E3DD] text-[9.5px] font-extrabold uppercase tracking-[0.16em] text-[#2B2B2B]/50 hover:border-[#2B2B2B]/25 hover:text-[#2B2B2B] transition-all"
              >
                <ArrowUpDown size={9} strokeWidth={3} />
                <span>{activeSortLabel}</span>
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
          </div>

        </div>
      </div>

      {/* ── TWO-COLUMN CONTENT GRID ────────────────────────────────────────── */}
      <div className="max-w-[1380px] mx-auto px-6 md:px-12 py-8 flex gap-8 items-start">
        
        {/* Permanent Left Sidebar (Hidden on mobile) */}
        <aside className="hidden md:block w-64 shrink-0 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2 scrollbar-none">
          <SidebarContent />
        </aside>

        {/* Product Grid Content area */}
        <div className="flex-1 min-w-0">
          {displayed.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
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
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
              {displayed.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>

      </div>

      {/* ── MOBILE FILTER DRAWER (Bottom Sheet) ────────────────────────────── */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end md:hidden">
          <div className="absolute inset-0 bg-[#2B2B2B]/30 backdrop-blur-sm" onClick={() => setMobileFilterOpen(false)} />
          <div className="relative bg-[#FAF9F7] rounded-t-3xl max-h-[85vh] flex flex-col border-t border-[#E7E3DD] shadow-2xl">
            <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-[#E7E3DD] shrink-0">
              <div>
                <div className="w-8 h-1 rounded-full bg-[#E7E3DD] mb-3 mx-auto" />
                <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#2B2B2B]">Filters</p>
              </div>
              <button onClick={() => setMobileFilterOpen(false)} className="w-8 h-8 rounded-full bg-[#F2EFEA] flex items-center justify-center text-[#2B2B2B]/50">
                <X size={13} />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 p-4">
              <SidebarContent />
            </div>
            <div className="px-5 py-4 border-t border-[#E7E3DD] shrink-0">
              <button onClick={() => setMobileFilterOpen(false)} className="w-full py-3.5 bg-[#2B2B2B] hover:bg-[#5B6EF5] text-[#FAF9F7] text-[10px] font-extrabold uppercase tracking-[0.28em] rounded-full">
                View Results
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function FilterSection({ label, children }) {
  return (
    <div className="py-4 border-b border-[#E7E3DD] last:border-none">
      <p className="text-[8px] font-extrabold uppercase tracking-[0.44em] text-[#C6A15B] mb-3">
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