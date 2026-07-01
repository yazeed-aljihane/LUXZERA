// src/components/ProductCard.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlmirahIcon from "./AlmirahIcon.jsx";
import { useCart }     from "../context/CartContext.jsx";
import { useWardrobe } from "../context/WardrobeContext.jsx";
import MobileProductCard from "../mobile/MobileProductCard.jsx";

export default function ProductCard({ product, onViewProduct }) {
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();
  const { addToCart }          = useCart();
  const { isSaved, toggleWardrobe } = useWardrobe();

  const saved = isSaved(product.id);
  const defaultSize = product.sizes?.[0] ?? "M";

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAdded(true);
    addToCart({ ...product, size: defaultSize });
    setTimeout(() => setAdded(false), 1800);
  };

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWardrobe(product);
  };

  const handleView = () => {
    if (onViewProduct) { onViewProduct(product); return; }
    navigate(`/product/${product.id}`);
  };

  const getDesignerDetails = (brandName) => {
    const brandMap = {
      "Nocturne":   { origin: "London Studio",  season: "SS26 Capsule"  },
      "Voidwear":   { origin: "Paris Atelier",   season: "Limited Drop"  },
      "Axle Studio":{ origin: "Tokyo Design",    season: "Runway Drop"   },
    };
    return brandMap[brandName] || { origin: "Milan Studio", season: "Seasonal Edit" };
  };

  const { origin, season } = getDesignerDetails(product.brand);

  return (
    <>
    <div className="sm:hidden">
      <MobileProductCard product={product} onViewProduct={onViewProduct} />
    </div>
    <a
      href={`/product/${product.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden sm:flex group relative flex-col bg-transparent cursor-pointer text-left font-sans select-none"
    >
      {/* Image */}
      <div className="relative aspect-[3/4.2] overflow-hidden bg-[#FAF9F7] border border-[#E7E3DD] select-none flex items-center justify-center rounded-2xl shadow-sm">
        <img
          src={product.images?.[0] || product.image}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-103"
          loading="lazy"
        />

        {/* Quick Add panel */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#5B6EF5] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
          <button
            onClick={handleAdd}
            className="w-full py-3.5 text-[10px] uppercase tracking-[0.25em] font-extrabold text-[#FAF9F7] hover:bg-[#5B6EF5]/90 transition-colors duration-200"
          >
            {added ? "Added to Bag ✓" : "Quick Add to Bag"}
          </button>
        </div>

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#FAF9F7]/95 text-[#2B2B2B] border border-[#E7E3DD] text-[8px] font-extrabold uppercase tracking-[0.2em] px-2.5 py-1 z-10 rounded-full shadow-sm">
            {product.badge}
          </span>
        )}

        {/* Wardrobe Bookmark — top-right */}
        <button
          onClick={handleBookmark}
          className={`absolute top-3 right-3 z-30 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
            saved
              ? "bg-[#C6A15B] text-[#FAF9F7] shadow-md"
              : "bg-[#FAF9F7]/80 text-[#2B2B2B]/40 opacity-0 group-hover:opacity-100 hover:bg-[#FAF9F7] hover:text-[#C6A15B]"
          }`}
          title={saved ? "Remove from Wardrobe" : "Save to Wardrobe"}
        >
          <AlmirahIcon size={12} strokeWidth={2} className={saved ? "fill-[#FAF9F7]" : ""} />
        </button>
      </div>

      {/* Details */}
      <div className="pt-4 pb-2 flex flex-col font-sans">
        <div className="flex items-center justify-between text-[8px] font-extrabold tracking-[0.2em] text-[#C6A15B] uppercase mb-1.5">
          <span>{product.brand || "LUXZERA DIRECTORY"} — {origin}</span>
          <span className="text-[#2B2B2B]/45 font-mono">{season}</span>
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-extrabold text-xs md:text-sm text-[#2B2B2B] uppercase tracking-wider group-hover:text-[#5B6EF5] transition-colors leading-tight truncate flex-1">
            {product.name}
          </h3>
          <span className="text-xs md:text-sm font-extrabold text-[#C97A5A] tracking-wider shrink-0">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </a>
    </>
  );
}
