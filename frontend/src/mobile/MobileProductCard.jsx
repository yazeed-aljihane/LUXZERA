import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import AlmirahIcon from "../components/AlmirahIcon.jsx";
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
    <article onClick={openProduct} className="rounded-[1.75rem] bg-white border border-[#E7E3DD] overflow-hidden shadow-sm">
      <div className="relative aspect-[4/5] bg-[#F2EFEA]">
        <img
          src={product.images?.[0] || product.image}
          alt={product.name}
          className="h-full w-full object-cover object-top"
          loading="lazy"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-[#FAF9F7]/95 px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.18em] text-[#2B2B2B]">
            {product.badge}
          </span>
        )}
        <button
          onClick={handleSave}
          className={`absolute right-3 top-3 h-9 w-9 rounded-full flex items-center justify-center shadow-sm ${
            saved ? "bg-[#C6A15B] text-[#FAF9F7]" : "bg-[#FAF9F7]/90 text-[#2B2B2B]/55"
          }`}
          aria-label={saved ? "Remove from wardrobe" : "Save to wardrobe"}
        >
          <AlmirahIcon size={15} strokeWidth={2} className={saved ? "fill-[#FAF9F7]" : ""} />
        </button>
      </div>

      <div className="p-4">
        <p className="text-[9px] font-black uppercase tracking-[0.24em] text-[#C6A15B]">
          {product.brand || "LuxZera"}
        </p>
        <div className="mt-2 flex items-start justify-between gap-3">
          <h3 className="text-[15px] font-black uppercase leading-tight tracking-[-0.01em] text-[#2B2B2B]">
            {product.name}
          </h3>
          <span className="shrink-0 text-[15px] font-black text-[#C97A5A]">
            ${product.price.toFixed(0)}
          </span>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={handleAdd}
            className="h-11 flex-1 rounded-full bg-[#2B2B2B] text-[#FAF9F7] text-[9px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2"
          >
            <ShoppingBag size={13} />
            {added ? "Added" : "Add"}
          </button>
          <button
            onClick={openProduct}
            className="h-11 px-4 rounded-full border border-[#E7E3DD] text-[9px] font-black uppercase tracking-[0.18em] text-[#2B2B2B]"
          >
            View
          </button>
        </div>
      </div>
    </article>
  );
}
