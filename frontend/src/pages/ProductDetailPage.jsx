// src/pages/ProductDetailPage.jsx
// ──────────────────────────────────────────────────────────────────────────
// LUXZERA — Viewport-Bounded Luxury Product Detail Page
// Design: Lyst × SSENSE. Bounded to one screen frame (no page scroll on desktop).
// Left Column multi-image layout fits exactly within the viewport (no scroll).
// ──────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RelatedProducts from "../components/RelatedProducts";
import ProductReviews from "../components/ProductReviews";
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";
import { Plus, Send, Star, ShoppingBag, Truck, Store, ChevronDown, X } from "lucide-react";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = PRODUCTS.find((p) => p.id === Number(id));

  // State
  const [selectedSize, setSelectedSize] = useState("");
  const [inputText, setInputText] = useState("");
  const [selectedRating, setSelectedRating] = useState(5);
  const [attachedMedia, setAttachedMedia] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [showRatingMenu, setShowRatingMenu] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  // Accordion Toggles
  const [descOpen, setDescOpen] = useState(true);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [commitmentOpen, setCommitmentOpen] = useState(false);

  const [reviews, setReviews] = useState([
    {
      name: "Alex M.",
      rating: 5,
      review: "Remarkable drape and texture. The heavy loopback cotton feels built to endure. The fit runs exactly as intended for a relaxed high-fashion drop shoulder silhouette.",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80",
      video: null,
    },
  ]);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes?.[0] ?? "M");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id, product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center font-sans">
        <div className="text-center">
          <p className="text-2xl font-black uppercase text-[#2B2B2B]">Product Not Found</p>
          <button onClick={() => navigate("/market")} className="mt-4 text-[#5B6EF5] font-extrabold uppercase text-[10px] tracking-wider">
            Go Back Shop
          </button>
        </div>
      </div>
    );
  }

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  const handleMediaUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAttachedMedia(url);
    setMediaType(file.type.startsWith("video/") ? "video" : "image");
  };

  const handleSendReview = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const newReview = {
      name: "Verified Patron",
      rating: selectedRating,
      review: inputText.trim(),
      image: mediaType === "image" ? attachedMedia : null,
      video: mediaType === "video" ? attachedMedia : null,
    };
    setReviews((prev) => [newReview, ...prev]);
    setInputText("");
    setAttachedMedia(null);
    setMediaType(null);
    setSelectedRating(5);
    setShowRatingMenu(false);
  };

  // Split images for grid layout:
  // - Top Row: 2 large images (image index 0 and 1)
  // - Bottom Row: 3 smaller thumbnail/detail shots (remaining images)
  const mainImages = product.images?.slice(0, 2) || [product.image];
  const detailImages = product.images?.slice(2, 5) || [];

  return (
    <div className="min-h-[calc(100vh-4.5rem)] bg-[#FAF9F7] font-sans flex flex-col justify-between select-none">
      
      {/* ── Core Two-Column Product Layout Workspace — Viewport Bounded on Desktop ── */}
      <main className="max-w-[1380px] mx-auto w-full px-6 md:px-10 py-5 grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-10 items-stretch flex-1 lg:h-[calc(100vh-7rem)] lg:overflow-hidden">
        
        {/* LEFT COLUMN: Image collage fitting EXACTLY in the height frame (No scrollbar) */}
        <div className="flex flex-col justify-between lg:h-full gap-4 min-h-0">
          {/* Top Row: Two Large Images Side-by-Side (72% height) */}
          <div className="flex gap-4 h-[71%] min-h-0">
            {mainImages.map((img, i) => (
              <div key={i} className="h-full w-1/2 bg-[#F2EFEA] border border-[#E7E3DD] rounded-2xl overflow-hidden shadow-xs">
                <img src={img} alt={`${product.name} View ${i + 1}`} className="w-full h-full object-cover object-top" />
              </div>
            ))}
            {/* If only 1 image exists, fill the second slot with detail image or placeholder to maintain symmetry */}
            {mainImages.length === 1 && (
              <div className="h-full w-1/2 bg-[#F2EFEA] border border-[#E7E3DD] rounded-2xl overflow-hidden shadow-xs flex items-center justify-center">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2B2B2B]/20">LUXZERA EDITORIAL</span>
              </div>
            )}
          </div>

          {/* Bottom Row: Three Smaller Detail Shots Side-by-Side (26% height) */}
          <div className="flex gap-4 h-[26%] min-h-0">
            {detailImages.length > 0 ? (
              detailImages.map((img, i) => (
                <div key={i} className="h-full w-1/3 bg-[#F2EFEA] border border-[#E7E3DD] rounded-xl overflow-hidden shadow-xs">
                  <img src={img} alt={`${product.name} Detail ${i + 1}`} className="w-full h-full object-cover object-top" />
                </div>
              ))
            ) : (
              // Symmetrical placeholder panels if detail images are not populated
              [1, 2, 3].map((_, i) => (
                <div key={i} className="h-full w-1/3 bg-[#F2EFEA]/40 border border-[#E7E3DD]/60 rounded-xl overflow-hidden flex items-center justify-center">
                  <span className="text-[8px] font-extrabold uppercase tracking-widest text-[#2B2B2B]/15">DETAIL VIEW 0{i+1}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Scrollable Purchase & Spec Details Panel */}
        <div className="flex flex-col justify-between bg-[#FAF9F7] border border-[#E7E3DD] rounded-2xl p-6 md:p-8 shadow-xs lg:h-full lg:overflow-y-auto scrollbar-none">
          
          <div className="flex flex-col gap-5">
            {/* Eyebrow Label & Brand info */}
            <div className="flex items-center justify-between">
              <span className="text-[8.5px] font-extrabold uppercase tracking-[0.3em] text-[#C6A15B]">
                New Season Drop
              </span>
              <span className="text-[9.5px] font-extrabold uppercase tracking-[0.2em] text-[#2B2B2B]/40">
                {product.brand}
              </span>
            </div>

            {/* Title & Price */}
            <div className="flex flex-col gap-1.5">
              <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-[#2B2B2B] leading-[1.1]">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-4 mt-1">
                <span className="text-xl font-black text-[#2B2B2B]">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-xs font-bold text-[#C97A5A] line-through">${product.originalPrice.toFixed(2)}</span>
                )}
              </div>
              <p className="text-[9.5px] text-[#2B2B2B]/45 font-medium leading-relaxed">
                or 4 interest-free payments of ${(product.price / 4).toFixed(2)} by <span className="font-extrabold text-[#2B2B2B]/60">Klarna</span> or <span className="font-extrabold text-[#2B2B2B]/60">Afterpay</span>
              </p>
            </div>

            <div className="h-px bg-[#E7E3DD]" />

            {/* Sizing block */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-[#2B2B2B]/50">Size</span>
                <button 
                  onClick={() => setSizeGuideOpen(true)}
                  className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#5B6EF5] hover:underline"
                >
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-6 gap-1.5">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-10 border text-[10px] font-extrabold uppercase tracking-wider rounded-xl transition-all ${
                      selectedSize === size
                        ? "bg-[#2B2B2B] text-[#FAF9F7] border-[#2B2B2B]"
                        : "border-[#E7E3DD] text-[#2B2B2B]/60 hover:border-[#2B2B2B]/45 hover:text-[#2B2B2B]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Bag CTA Button */}
            <button
              onClick={() => addToCart({ ...product, size: selectedSize })}
              className="w-full h-12 bg-[#2B2B2B] hover:bg-[#1e1e1e] text-[#FAF9F7] text-[10px] font-extrabold uppercase tracking-[0.3em] transition-colors duration-300 flex items-center justify-center gap-2 rounded-xl shadow-xs"
            >
              <ShoppingBag size={12} strokeWidth={2} />
              Add To Bag
            </button>

            {/* Delivery details */}
            <div className="flex flex-col gap-2.5 pt-1">
              <div className="flex items-start gap-2.5">
                <Truck size={13} className="text-[#2B2B2B]/55 shrink-0 mt-0.5" />
                <p className="text-[10px] font-semibold text-[#2B2B2B]/60 leading-normal">
                  Order now, complimentary express delivery by next Tuesday.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <Store size={13} className="text-[#2B2B2B]/55 shrink-0 mt-0.5" />
                <p className="text-[10px] font-semibold text-[#2B2B2B]/60 leading-normal">
                  Order now, complimentary collect in store available.
                </p>
              </div>
            </div>

            {/* Accordions */}
            <div className="flex flex-col border-t border-[#E7E3DD] mt-2">
              
              {/* Description */}
              <div className="border-b border-[#E7E3DD]">
                <button 
                  onClick={() => setDescOpen(!descOpen)}
                  className="w-full py-3.5 flex items-center justify-between text-left text-[9.5px] font-extrabold uppercase tracking-[0.25em] text-[#2B2B2B]"
                >
                  Description
                  <ChevronDown size={11} className={`transition-transform duration-200 ${descOpen ? "rotate-180" : ""}`} />
                </button>
                {descOpen && (
                  <p className="text-[11px] leading-relaxed text-[#2B2B2B]/50 font-medium pb-3 pr-2">
                    Premium heavyweight silhouette featuring signature drop shoulder cuts, dense double-stitched loopback cotton construct, brushed inner refinement, and structural high-fashion geometry.
                  </p>
                )}
              </div>

              {/* Details */}
              <div className="border-b border-[#E7E3DD]">
                <button 
                  onClick={() => setDetailsOpen(!detailsOpen)}
                  className="w-full py-3.5 flex items-center justify-between text-left text-[9.5px] font-extrabold uppercase tracking-[0.25em] text-[#2B2B2B]"
                >
                  Product Details
                  <ChevronDown size={11} className={`transition-transform duration-200 ${detailsOpen ? "rotate-180" : ""}`} />
                </button>
                {detailsOpen && (
                  <ul className="text-[11px] text-[#2B2B2B]/50 font-semibold list-disc pl-5 pb-3 space-y-1">
                    <li>100% Organic Heavyweight Cotton Blend</li>
                    <li>480 GSM Loopback Construction</li>
                    <li>Double-needle structural seams</li>
                    <li>Designed in Seoul, fabric milled in Japan</li>
                  </ul>
                )}
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* ── Size Guide Modal ── */}
      {sizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#2B2B2B]/40 backdrop-blur-sm" onClick={() => setSizeGuideOpen(false)} />
          <div className="relative bg-[#FAF9F7] border border-[#E7E3DD] rounded-2xl w-full max-w-md p-6 shadow-2xl z-10">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E7E3DD]">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#2B2B2B]">Size Guide (Inches)</span>
              <button onClick={() => setSizeGuideOpen(false)} className="text-[#2B2B2B]/40 hover:text-[#2B2B2B]"><X size={16} /></button>
            </div>
            <table className="w-full text-left text-xs text-[#2B2B2B] border-collapse">
              <thead>
                <tr className="border-b border-[#E7E3DD]">
                  <th className="py-2 text-[9px] font-extrabold uppercase tracking-wider text-[#C6A15B]">Size</th>
                  <th className="py-2 text-[9px] font-extrabold uppercase tracking-wider text-[#C6A15B]">Chest</th>
                  <th className="py-2 text-[9px] font-extrabold uppercase tracking-wider text-[#C6A15B]">Waist</th>
                </tr>
              </thead>
              <tbody>
                {["XS", "S", "M", "L", "XL"].map((sz, idx) => (
                  <tr key={sz} className="border-b border-[#E7E3DD]/40 last:border-none">
                    <td className="py-2.5 font-bold">{sz}</td>
                    <td className="py-2.5 text-[#2B2B2B]/60">{32 + idx * 2} - {34 + idx * 2}</td>
                    <td className="py-2.5 text-[#2B2B2B]/60">{26 + idx * 2} - {28 + idx * 2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}