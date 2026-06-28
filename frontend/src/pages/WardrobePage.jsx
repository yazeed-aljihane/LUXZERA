// src/pages/WardrobePage.jsx
// ─────────────────────────────────────────────────────────────────
// LUXZERA WARDROBE — Pinterest meets Apple Photos
// A personal fashion space: save → organize → build outfits
// ─────────────────────────────────────────────────────────────────
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, Layers, ShoppingBag, ArrowRight, X, Check, Folder } from "lucide-react";
import { useWardrobe } from "../context/WardrobeContext.jsx";
import { useCart }     from "../context/CartContext.jsx";

const COLLECTION_COLORS = {
  "Casual":     "#5B6EF5",
  "Office":     "#2B2B2B",
  "Streetwear": "#C97A5A",
  "Date Night": "#C6A15B",
  "Vacation":   "#38A169",
  "Winter":     "#4A90D9",
};
const getColor = (name) => COLLECTION_COLORS[name] || "#2B2B2B";

export default function WardrobePage() {
  const navigate = useNavigate();
  const {
    wardrobeItems, collections, wardrobeCount,
    toggleWardrobe, moveToCollection, createCollection,
    removeCollection, itemsInCollection,
  } = useWardrobe();
  const { addToCart } = useCart();

  const [activeCollection, setActiveCollection] = useState("All");
  const [newColName, setNewColName]             = useState("");
  const [showNewCol, setShowNewCol]             = useState(false);
  const [moveTarget, setMoveTarget]             = useState(null); // productId being moved

  const displayed = activeCollection === "All"
    ? wardrobeItems
    : wardrobeItems.filter((i) => i.collection === activeCollection);

  const handleCreateCollection = () => {
    const name = newColName.trim();
    if (!name) return;
    createCollection(name);
    setNewColName("");
    setShowNewCol(false);
    setActiveCollection(name);
  };

  const handleAddToBag = (item) => {
    addToCart({ ...item, size: item.size || item.sizes?.[0] || "M" });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7] font-sans">

      {/* ── PAGE HEADER ── */}
      <div className="border-b border-[#E7E3DD] bg-[#FAF9F7]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[8px] font-extrabold uppercase tracking-[0.35em] text-[#C6A15B] block mb-3">
                — Your Personal Space
              </span>
              <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight text-[#2B2B2B] leading-[0.9]">
                My<br />Wardrobe
              </h1>
              <p className="mt-4 text-[13px] text-[#2B2B2B]/50 font-medium max-w-sm leading-relaxed">
                Save outfits, build collections, and curate your personal style—before you buy.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#2B2B2B]/35">
                {wardrobeCount} {wardrobeCount === 1 ? "piece" : "pieces"} saved
              </span>
              <button
                onClick={() => navigate("/market")}
                className="bg-[#5B6EF5] hover:bg-[#4a5de0] text-[#FAF9F7] text-[10px] font-extrabold uppercase tracking-[0.25em] px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2"
              >
                Add More <ArrowRight size={11} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-10">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* ── SIDEBAR: Collection Manager ── */}
          <aside className="lg:w-56 shrink-0 space-y-1">
            <p className="text-[8.5px] font-extrabold uppercase tracking-[0.3em] text-[#2B2B2B]/35 mb-4">
              Collections
            </p>

            {/* All tab */}
            <button
              onClick={() => setActiveCollection("All")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all duration-150 group ${
                activeCollection === "All"
                  ? "bg-[#2B2B2B] text-[#FAF9F7]"
                  : "text-[#2B2B2B]/60 hover:bg-[#F2EFEA] hover:text-[#2B2B2B]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Layers size={12} strokeWidth={1.8} />
                <span className="text-[10.5px] font-extrabold uppercase tracking-[0.18em]">All Pieces</span>
              </div>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                activeCollection === "All" ? "bg-[#FAF9F7]/20 text-[#FAF9F7]" : "bg-[#E7E3DD] text-[#2B2B2B]/50"
              }`}>
                {wardrobeCount}
              </span>
            </button>

            {/* Collection tabs */}
            {collections.map((col) => {
              const count = itemsInCollection(col).length;
              const active = activeCollection === col;
              return (
                <button
                  key={col}
                  onClick={() => setActiveCollection(col)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all duration-150 group ${
                    active
                      ? "text-[#FAF9F7]"
                      : "text-[#2B2B2B]/60 hover:bg-[#F2EFEA] hover:text-[#2B2B2B]"
                  }`}
                  style={active ? { backgroundColor: getColor(col) } : {}}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: active ? "#FAF9F7" : getColor(col) }}
                    />
                    <span className="text-[10.5px] font-extrabold uppercase tracking-[0.18em]">{col}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                      active ? "bg-[#FAF9F7]/20 text-[#FAF9F7]" : "bg-[#E7E3DD] text-[#2B2B2B]/50"
                    }`}>
                      {count}
                    </span>
                    {!active && count === 0 && (
                      <button
                        onClick={(e) => { e.stopPropagation(); removeCollection(col); }}
                        className="opacity-0 group-hover:opacity-100 text-[#2B2B2B]/30 hover:text-red-500 transition-all"
                      >
                        <X size={10} />
                      </button>
                    )}
                  </div>
                </button>
              );
            })}

            {/* New collection */}
            {showNewCol ? (
              <div className="flex items-center gap-2 px-3 py-2">
                <input
                  value={newColName}
                  onChange={(e) => setNewColName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCreateCollection()}
                  placeholder="Collection name..."
                  className="flex-1 bg-transparent border-b border-[#5B6EF5] text-[10px] uppercase tracking-wider font-bold text-[#2B2B2B] outline-none py-0.5 placeholder-[#2B2B2B]/30"
                  autoFocus
                />
                <button onClick={handleCreateCollection} className="text-[#5B6EF5] hover:text-[#4a5de0]">
                  <Check size={13} strokeWidth={2.5} />
                </button>
                <button onClick={() => setShowNewCol(false)} className="text-[#2B2B2B]/30 hover:text-[#2B2B2B]">
                  <X size={13} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowNewCol(true)}
                className="w-full flex items-center gap-2 px-3 py-2.5 text-[#2B2B2B]/35 hover:text-[#5B6EF5] transition-colors group"
              >
                <Plus size={11} strokeWidth={2} />
                <span className="text-[10px] font-extrabold uppercase tracking-[0.18em]">New Collection</span>
              </button>
            )}
          </aside>

          {/* ── MAIN GRID: Saved Items ── */}
          <div className="flex-1 min-w-0">
            {displayed.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
                <div className="w-16 h-16 rounded-2xl bg-[#F2EFEA] border border-[#E7E3DD] flex items-center justify-center mb-6">
                  <Folder size={24} strokeWidth={1.2} className="text-[#2B2B2B]/25" />
                </div>
                <h3 className="text-xs font-extrabold tracking-[0.3em] uppercase text-[#2B2B2B]/40 mb-2">
                  {activeCollection === "All" ? "Your Wardrobe is Empty" : `${activeCollection} is Empty`}
                </h3>
                <p className="text-[11px] text-[#2B2B2B]/30 font-medium max-w-xs leading-relaxed mb-6">
                  {activeCollection === "All"
                    ? "Browse collections and tap the bookmark icon to save pieces here."
                    : "Move items here from All Pieces by using the collection selector."}
                </p>
                <button
                  onClick={() => navigate("/market")}
                  className="bg-[#2B2B2B] hover:bg-[#5B6EF5] text-[#FAF9F7] text-[10px] font-extrabold uppercase tracking-[0.25em] px-7 py-3.5 rounded-full transition-all duration-300"
                >
                  Browse Drops
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {displayed.map((item) => (
                  <div key={item.id} className="group relative flex flex-col">
                    {/* Image */}
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-[#E7E3DD] bg-[#F2EFEA]">
                      <img
                        src={item.images?.[0] || item.image}
                        alt={item.name}
                        className="w-full h-full object-cover object-top transition-transform duration-[1.2s] group-hover:scale-105"
                      />

                      {/* Action overlay */}
                      <div className="absolute inset-0 bg-[#2B2B2B]/0 group-hover:bg-[#2B2B2B]/20 transition-all duration-300 flex flex-col justify-between p-3">
                        {/* Remove button */}
                        <button
                          onClick={() => toggleWardrobe(item)}
                          className="self-end opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 rounded-full bg-[#FAF9F7]/90 flex items-center justify-center hover:bg-red-50"
                        >
                          <Trash2 size={11} strokeWidth={2} className="text-red-500" />
                        </button>

                        {/* Add to bag button */}
                        <button
                          onClick={() => handleAddToBag(item)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity w-full bg-[#FAF9F7]/95 backdrop-blur-sm text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#2B2B2B] py-2.5 rounded-xl flex items-center justify-center gap-1.5 hover:bg-[#5B6EF5] hover:text-[#FAF9F7] transition-colors duration-200"
                        >
                          <ShoppingBag size={10} strokeWidth={2} />
                          Add to Bag
                        </button>
                      </div>

                      {/* Collection indicator dot */}
                      <div
                        className="absolute top-2.5 left-2.5 w-2 h-2 rounded-full border border-[#FAF9F7]/60 shadow-sm"
                        style={{ backgroundColor: getColor(item.collection) }}
                        title={item.collection}
                      />
                    </div>

                    {/* Details */}
                    <div className="pt-3 pb-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[8px] font-extrabold uppercase tracking-[0.2em] text-[#C6A15B]">{item.brand}</span>
                        <span className="text-[8px] font-bold text-[#2B2B2B]/35">${item.price}</span>
                      </div>
                      <p className="text-[10.5px] font-extrabold uppercase tracking-wide text-[#2B2B2B] leading-tight truncate">{item.name}</p>

                      {/* Collection move selector */}
                      {moveTarget === item.id ? (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {collections.map((col) => (
                            <button
                              key={col}
                              onClick={() => { moveToCollection(item.id, col); setMoveTarget(null); }}
                              className="text-[7.5px] font-extrabold uppercase tracking-[0.15em] px-2 py-1 rounded-full border transition-all"
                              style={{
                                borderColor: getColor(col),
                                color: item.collection === col ? "#FAF9F7" : getColor(col),
                                backgroundColor: item.collection === col ? getColor(col) : "transparent",
                              }}
                            >
                              {col}
                            </button>
                          ))}
                          <button onClick={() => setMoveTarget(null)} className="text-[7.5px] text-[#2B2B2B]/30 ml-1">✕</button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setMoveTarget(item.id)}
                          className="mt-1.5 flex items-center gap-1 text-[8px] font-bold uppercase tracking-[0.15em] text-[#2B2B2B]/30 hover:text-[#5B6EF5] transition-colors"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: getColor(item.collection) }}
                          />
                          {item.collection}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
