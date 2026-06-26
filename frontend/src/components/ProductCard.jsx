// src/components/ProductCard.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";

export default function ProductCard({ product, onViewProduct }) {
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const defaultSize = product.sizes?.[0] ?? "M";

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAdded(true);
    addToCart({ ...product, size: defaultSize });
    setTimeout(() => setAdded(false), 1800);
  };

  const handleView = () => {
    if (onViewProduct) {
      onViewProduct(product);
      return;
    }
    navigate(`/product/${product.id}`);
  };

  return (
    <article
      onClick={handleView}
      className="group relative flex flex-col bg-transparent cursor-pointer text-left font-luxury-body"
    >
      {/* ── Image container with subtle warm stone backdrop ── */}
      <div className="relative aspect-[3/4.2] overflow-hidden bg-[#E8E3DA]/20 border border-[#E8E3DA]/40 select-none flex items-center justify-center">
        <img
          src={product.images?.[0] || product.image}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-103"
          loading="lazy"
        />

        {/* Quiet Luxury Hover Quick Add Panel */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#111111] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
          <button
            onClick={handleAdd}
            className="w-full py-3.5 text-[9px] uppercase tracking-[0.25em] font-semibold text-[#F8F6F2] hover:bg-[#C9A86A] transition-colors duration-200"
          >
            {added ? "Added to Bag" : "Quick Add to Bag"}
          </button>
        </div>

        {/* Editorial Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#111111]/90 text-[#F8F6F2] border border-[#C9A86A] text-[8px] font-semibold uppercase tracking-[0.2em] px-2.5 py-1 z-10">
            {product.badge}
          </span>
        )}
      </div>

      {/* ── Product details ── */}
      <div className="pt-3.5 flex flex-col flex-1 justify-between">
        <div>
          {/* Brand */}
          <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#C9A86A]">
            {product.brand || "LUXZERA ARCHIVE"}
          </span>

          {/* Name in uppercase sans-serif style */}
          <h3 className="font-luxury-body text-xs font-medium text-[#111111] uppercase tracking-[0.12em] mt-1 group-hover:text-[#C9A86A] transition-colors leading-tight line-clamp-1">
            {product.name}
          </h3>
        </div>

        {/* Price & Rating */}
        <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-[#E8E3DA]/30 font-luxury-body">
          <span className="text-[11px] font-semibold text-[#111111] tracking-wider">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-[9px] text-[#111111]/40 flex items-center gap-0.5">
            <Star size={8} className="text-[#C9A86A]" fill="currentColor" stroke="none" />
            {(4.7 + (product.id % 3) * 0.1).toFixed(1)}
          </span>
        </div>
      </div>
    </article>
  );
}


