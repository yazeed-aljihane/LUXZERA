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
      "Nocturne":   { origin: "London Studio",  season: "SS26"  },
      "Voidwear":   { origin: "Paris Atelier",   season: "Limited"  },
      "Axle Studio":{ origin: "Tokyo Design",    season: "Runway"   },
    };
    return brandMap[brandName] || { origin: "Milan Studio", season: "Seasonal" };
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
        <div className="relative aspect-[3/4.2] overflow-hidden bg-[#FAFAF9] border border-[#ECECEC] select-none flex items-center justify-center rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.01)] transition-shadow duration-300 group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.03)]">
          <img
            src={product.images?.[0] || product.image}
            alt={product.name}
            className="w-full h-full object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />

          {/* Quick Add panel */}
          <div className="absolute bottom-0 left-0 right-0 bg-[#5B6EF5] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
            <button
              onClick={handleAdd}
              className="w-full py-3.5 text-[12px] uppercase tracking-[0.2em] font-semibold text-[#FAFAF9] hover:bg-[#5B6EF5]/90 transition-colors duration-200"
            >
              {added ? "Added to Bag ✓" : "Quick Add to Bag"}
            </button>
          </div>

          {/* Badge */}
          {product.badge && (
            <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#1D1D1F] border border-[#ECECEC] text-[12px] font-semibold uppercase tracking-[0.15em] px-2.5 py-1 z-10 rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              {product.badge}
            </span>
          )}

          {/* Wardrobe Bookmark — top-right */}
          <button
            onClick={handleBookmark}
            className={`absolute top-3 right-3 z-30 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
              saved
                ? "bg-[#5B6EF5] text-white shadow-md"
                : "bg-white/80 backdrop-blur-sm text-[#1D1D1F]/40 opacity-0 group-hover:opacity-100 hover:bg-white hover:text-[#5B6EF5] hover:scale-105"
            }`}
            title={saved ? "Remove from Wardrobe" : "Save to Wardrobe"}
          >
            <AlmirahIcon size={14} strokeWidth={1.5} className={saved ? "fill-white text-white" : ""} />
          </button>
        </div>

        {/* Details */}
        <div className="pt-4 pb-2 flex flex-col font-sans">
          <div className="flex items-center justify-between text-[12px] font-semibold tracking-[0.15em] text-[#86868B] uppercase mb-1">
            <span>{product.brand || "LUXZERA DIRECTORY"} · {origin}</span>
            <span className="text-[#86868B]/60 font-mono text-[12px]">{season}</span>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-semibold text-[14px] text-[#1D1D1F] uppercase tracking-wider group-hover:text-[#5B6EF5] transition-colors leading-tight truncate flex-1">
              {product.name}
            </h3>
            <span className="text-[14px] font-bold text-[#1D1D1F] tracking-wide shrink-0">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </a>
    </>
  );
}
