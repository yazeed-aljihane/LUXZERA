// src/pages/ShopPage.jsx
// ──────────────────────────────────────────────────────────────────────────
// LUXZERA — Collection Page
// • Clean typography printed directly on a flat sheet of warm stone paper
// • No background containers, headers, or redundant item count blocks
// • Clean Left Sidebar (using standalone FiltersSidebar component)
// ──────────────────────────────────────────────────────────────────────────

import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/modules/products/components/ProductCard";
import FiltersSidebar from "@/modules/products/components/FiltersSidebar";
import { PRODUCTS } from "@/modules/products/data/products";
import { getProducts } from "@/modules/products/services/productService";

const CATEGORIES = ["All", "Tops", "Bottoms", "Outerwear"];
const SIZES      = ["XS", "S", "M", "L", "XL", "XXL"];
const PRICE_STEPS = [50, 75, 100, 125, 150, 200, 500, 1000, 5000];
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
  All:    { title: "FOR",       suffix: "YOU" },
  Men:    { title: "MEN'S",     suffix: "EDIT" },
  Women:  { title: "WOMEN'S",   suffix: "EDIT" },
  Unisex: { title: "UNISEX'S",  suffix: "EDIT" },
  Kids:   { title: "KIDS'",     suffix: "EDIT" },
};

export default function ShopPage({ initialDepartment = "All" }) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() || "";

  // ── State ──────────────────────────────────────────────────────────────────
  const [activeCat,    setActiveCat]    = useState("All");
  const [activeSizes,  setActiveSizes]  = useState([]);
  const [activeBrand,  setActiveBrand]  = useState("All");
  const [priceMax,     setPriceMax]     = useState(5000);
  const [sortBy,       setSortBy]       = useState("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productError, setProductError] = useState("");

  // Reset category when department changes
  useEffect(() => { setActiveCat("All"); }, [initialDepartment]);

  const toggleSize = useCallback((s) => {
    setActiveSizes((p) => p.includes(s) ? p.filter((x) => x !== s) : [...p, s]);
  }, []);

  const clearAll = useCallback(() => {
    setActiveCat("All"); setActiveSizes([]); setActiveBrand("All"); setPriceMax(5000);
  }, []);

  useEffect(() => {
    let ignore = false;

    const loadProducts = async () => {
      setLoadingProducts(true);
      setProductError("");
      try {
        const backendProducts = await getProducts();
        if (!ignore) {
          setProducts(backendProducts);
        }
      } catch (error) {
        console.error("Product API unavailable, using temporary image-backed catalog:", error);
        if (!ignore) {
          setProducts(PRODUCTS);
          setProductError("Live product API is unavailable. Showing temporary catalog photos.");
        }
      } finally {
        if (!ignore) {
          setLoadingProducts(false);
        }
      }
    };

    loadProducts();
    return () => {
      ignore = true;
    };
  }, []);

  // ── Filtered & sorted products ─────────────────────────────────────────────
  const displayed = useMemo(() => {
    const normalizedQuery = query.toLowerCase();
    let list = [...products].filter((p) => p.price <= priceMax);
    if (initialDepartment !== "All") list = list.filter((p) => p.department === initialDepartment);
    if (activeCat  !== "All") list = list.filter((p) => p.category === activeCat);
    if (activeBrand !== "All") list = list.filter((p) => p.brand   === activeBrand);
    if (activeSizes.length)   list = list.filter((p) => activeSizes.some((s) => p.sizes.includes(s)));
    if (normalizedQuery) {
      list = list.filter((p) => [
        p.name,
        p.brand,
        p.category,
        p.department,
        p.description,
      ].filter(Boolean).some((value) => String(value).toLowerCase().includes(normalizedQuery)));
    }
    if (sortBy === "price_asc")  list.sort((a, b) => a.price - b.price);
    if (sortBy === "price_desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [products, query, initialDepartment, activeCat, activeBrand, activeSizes, priceMax, sortBy]);

  const brands = useMemo(() => ["All", ...Array.from(new Set(products.map((p) => p.brand).filter(Boolean))).sort()], [products]);
  const filterCount = (activeCat !== "All" ? 1 : 0) + activeSizes.length + (activeBrand !== "All" ? 1 : 0) + (priceMax < 5000 ? 1 : 0);
  const categoryLabels = DEPT_CATEGORY_LABELS[initialDepartment] || DEPT_CATEGORY_LABELS.All;
  const meta = DEPT_META[initialDepartment] || DEPT_META.All;

  return (
    <div className="min-h-screen bg-white font-sans pb-16">

      {/* ── EDITORIAL HEADER ──────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(#2B2B2B 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        
        <div className="max-w-[1380px] mx-auto px-5 sm:px-6 md:px-12 pt-7 md:pt-10 pb-4 relative z-10">
          {/* Custom logo themed header: First word Orange (Lux theme), second word Navy (Zera theme) */}
          <h1 className="text-[3.2rem] min-[390px]:text-[3.8rem] sm:text-5xl md:text-6xl font-black uppercase leading-[0.86] tracking-[-0.055em] md:tracking-[-0.025em]">
            <span style={{ color: "#F07020" }}>{meta.title}</span>{" "}
            <span style={{ color: "#1E2D4A" }}>{meta.suffix}</span>
          </h1>
          {query && (
            <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#2B2B2B]/50">
              Search: <span className="text-[#5B6EF5]">{query}</span>
            </p>
          )}
          {productError && (
            <p className="mt-3 text-[11px] font-semibold text-[#C97A5A]">
              {productError}
            </p>
          )}
        </div>
      </div>

      {/* ── MOBILE TRIGGER row (Only visible on mobile screens) ── */}
      <div className="md:hidden px-5 pb-4">
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="inline-flex h-12 items-center gap-2 px-4 rounded-full border border-[#E7E3DD] text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#2B2B2B] bg-white w-full justify-center shadow-sm"
        >
          <SlidersHorizontal size={12} />
          Filters & Sort {filterCount > 0 && `(${filterCount})`}
        </button>
      </div>

      {/* ── TWO-COLUMN CONTENT GRID ────────────────────────────────────────── */}
      <div className="max-w-[1380px] mx-auto px-5 sm:px-6 md:px-12 py-4 flex gap-10 items-start">
        
        {/* Permanent Left Sidebar (Hidden on mobile) */}
        <aside className="hidden md:block w-64 shrink-0 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-3 scrollbar-none">
          <FiltersSidebar
            categories={CATEGORIES}
            activeCat={activeCat}
            setActiveCat={setActiveCat}
            categoryLabels={categoryLabels}
            brands={brands}
            activeBrand={activeBrand}
            setActiveBrand={setActiveBrand}
            sizes={SIZES}
            activeSizes={activeSizes}
            toggleSize={toggleSize}
            priceSteps={PRICE_STEPS}
            priceMax={priceMax}
            setPriceMax={setPriceMax}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOptions={SORT_OPTIONS}
            onReset={clearAll}
            filterCount={filterCount}
          />
        </aside>

        {/* Product Grid Content area */}
        <div className="flex-1 min-w-0">
          {loadingProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-6 sm:gap-y-10">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div key={item} className="animate-pulse">
                  <div className="aspect-[3/4.2] rounded-2xl bg-[#F2EFEA] border border-[#E7E3DD]" />
                  <div className="mt-4 h-3 w-2/3 rounded-full bg-[#E7E3DD]" />
                  <div className="mt-2 h-3 w-1/2 rounded-full bg-[#E7E3DD]" />
                </div>
              ))}
            </div>
          ) : displayed.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4 py-8 select-none">
              {/* Custom Vector High-Fashion Hanger SVG */}
              <svg className="w-24 h-24 text-[#C6A15B]/30 mb-8" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
                {/* Hook */}
                <path d="M50 35 C48 20, 38 18, 48 12 C58 6, 62 16, 54 22" strokeLinecap="round" />
                {/* Shoulders */}
                <path d="M10 58 L50 35 L90 58" strokeLinecap="round" strokeLinejoin="round" />
                {/* Pants bar */}
                <path d="M12 58 C50 54 50 54 88 58" strokeLinecap="round" />
                {/* Floating Brand Sparkles */}
                <path d="M76 22 L78 27 L83 29 L78 31 L76 36 L74 31 L69 29 L74 27 Z" fill="#5B6EF5" stroke="none" />
                <path d="M24 16 L25.5 20 L29.5 21.5 L25.5 23 L24 27 L22.5 23 L18.5 21.5 L22.5 20 Z" fill="#F07020" stroke="none" />
              </svg>
              
              <h3 className="text-[13px] font-extrabold tracking-[0.35em] uppercase text-[#C6A15B] mb-2.5">
                The Archives are Silent
              </h3>
              <p className="text-[12px] text-[#2B2B2B]/45 font-medium max-w-xs leading-relaxed mb-6">
                No live products match your active filters yet. This section is ready for backend inventory.
              </p>
              <button
                onClick={clearAll}
                className="bg-[#2B2B2B] hover:bg-[#5B6EF5] text-[#FAF9F7] text-[10px] font-extrabold uppercase tracking-[0.25em] px-7 py-3.5 rounded-full transition-all duration-300 shadow-sm"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-6 sm:gap-y-10">
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
          <div className="relative bg-white rounded-t-3xl max-h-[85vh] flex flex-col border-t border-[#E7E3DD] shadow-2xl">
            <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-[#E7E3DD] shrink-0">
              <div>
                <div className="w-8 h-1 rounded-full bg-[#E7E3DD] mb-3 mx-auto" />
                <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#2B2B2B]">Filters & Sort</p>
              </div>
              <button onClick={() => setMobileFilterOpen(false)} className="w-8 h-8 rounded-full bg-[#F2EFEA] flex items-center justify-center text-[#2B2B2B]/50">
                <X size={13} />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 p-4">
              <FiltersSidebar
                categories={CATEGORIES}
                activeCat={activeCat}
                setActiveCat={setActiveCat}
                categoryLabels={categoryLabels}
                brands={brands}
                activeBrand={activeBrand}
                setActiveBrand={setActiveBrand}
                sizes={SIZES}
                activeSizes={activeSizes}
                toggleSize={toggleSize}
                priceSteps={PRICE_STEPS}
                priceMax={priceMax}
                setPriceMax={setPriceMax}
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortOptions={SORT_OPTIONS}
                onReset={clearAll}
                filterCount={filterCount}
              />
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
