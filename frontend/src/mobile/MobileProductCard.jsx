import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import ZeraIcon from "../components/ZeraIcon.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useWardrobe } from "../context/WardrobeContext.jsx";

export default function MobileProductCard({ product, onViewProduct }) {
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isSaved, toggleWardrobe } = useWardrobe();
  const saved = isSaved(product.id);
  const defaultSize = product.sizes?.[0] ?? "M";

  const openProduct = () => {
    if (onViewProduct) {
      onViewProduct(product);
      return;
    }
    navigate(`/product/${product.id}`);
  };

  const handleAdd = (event) => {
    event.stopPropagation();
    setAdded(true);
    addToCart({ ...product, size: defaultSize });
    setTimeout(() => setAdded(false), 1500);
  };

  const handleSave = (event) => {
    event.stopPropagation();
    toggleWardrobe(product);
  };

  return (
    <article onClick={openProduct} className="rounded-2xl bg-white border border-[#ECECEC] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
      <div className="relative aspect-[4/5] bg-white">
        <img
          src={product.images?.[0] || product.image}
          alt={product.name}
          className="h-full w-full object-cover object-top"
          loading="lazy"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-lg bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[12px] font-semibold uppercase tracking-[0.15em] text-[#1D1D1F] shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            {product.badge}
          </span>
        )}
        <button
          onClick={handleSave}
          className={`absolute right-3 top-3 h-8 w-8 rounded-full flex items-center justify-center shadow-sm ${
            saved ? "bg-[#5B6EF5] text-white" : "bg-white/80 backdrop-blur-sm text-[#1D1D1F]/40"
          }`}
          aria-label={saved ? "Remove from wardrobe" : "Save to wardrobe"}
        >
          <ZeraIcon size={14} strokeWidth={1.5} className={saved ? "fill-white text-white" : ""} />
        </button>
      </div>

      <div className="p-4">
        <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#86868B]">
          {product.brand || "LuxZera"}
        </p>
        <div className="mt-1 flex items-start justify-between gap-3">
          <h3 className="text-[14px] font-semibold uppercase leading-tight tracking-wider text-[#1D1D1F] truncate flex-1">
            {product.name}
          </h3>
          <span className="shrink-0 text-[14px] font-bold text-[#1D1D1F] tracking-wide">
            ${product.price.toFixed(0)}
          </span>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={handleAdd}
            className="h-10 flex-1 rounded-xl bg-[#1D1D1F] text-[#FAFAF9] text-[12px] font-semibold uppercase tracking-[0.15em] flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <ShoppingBag size={14} />
            {added ? "Added" : "Add"}
          </button>
          <button
            onClick={openProduct}
            className="h-10 px-4 rounded-xl border border-[#ECECEC] text-[12px] font-semibold uppercase tracking-[0.15em] text-[#1D1D1F] active:scale-95 transition-transform bg-white"
          >
            View
          </button>
        </div>
      </div>
    </article>
  );
}
