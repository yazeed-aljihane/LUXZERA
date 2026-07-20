// src/pages/WardrobePage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Plus, 
  Trash2, 
  Layers, 
  ShoppingBag, 
  ArrowRight, 
  X, 
  Check, 
  Sparkles,
  Shirt,
  Briefcase,
  Palmtree,
  Sun,
  Snowflake,
  Heart,
  Wine,
  Watch
} from "lucide-react";
import { useWardrobe } from "../context/WardrobeContext.jsx";
import { useCart }     from "../context/CartContext.jsx";

// Helper function to return category specific icons
const getCategoryIcon = (name) => {
  switch (name.toLowerCase()) {
    case "shirts": return <Shirt size={14} strokeWidth={1.5} />;
    case "pants": return <Layers size={14} strokeWidth={1.5} />;
    case "shoes": return <Sparkles size={14} strokeWidth={1.5} />;
    case "jackets": return <Layers size={14} strokeWidth={1.5} />;
    case "accessories": return <Watch size={14} strokeWidth={1.5} />;
    case "office": return <Briefcase size={14} strokeWidth={1.5} />;
    case "vacation": return <Palmtree size={14} strokeWidth={1.5} />;
    case "party": return <Wine size={14} strokeWidth={1.5} />;
    case "summer": return <Sun size={14} strokeWidth={1.5} />;
    case "winter": return <Snowflake size={14} strokeWidth={1.5} />;
    case "casual": return <Sparkles size={14} strokeWidth={1.5} />;
    case "date night": return <Heart size={14} strokeWidth={1.5} />;
    default: return <Sparkles size={14} strokeWidth={1.5} />;
  }
};

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
  const [moveTarget, setMoveTarget]             = useState(null);

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
    <div className="min-h-screen bg-white font-sans pb-24">

      {/* ── PAGE HEADER ── */}
      <div className="border-b border-[#ECECEC] bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-[32px] md:text-[48px] font-bold text-[#37352F] tracking-tight uppercase">
                Zera Collection
              </h1>
              <p className="text-[14px] text-[#9B9B9B] mt-2 font-medium max-w-xl leading-[1.8]">
                Add pieces you love to your Zera Collection. Our AI assesses your unique taste based on these saved images to recommend perfectly styled outfit pairs—like matching the right shirt with the perfect pants.
              </p>
            </div>
            <button
              onClick={() => navigate("/market")}
              className="border border-[#37352F] hover:bg-[#37352F] hover:text-[#FAFAF9] text-[#37352F] text-[12px] font-semibold uppercase tracking-[0.2em] px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 self-start md:self-auto"
            >
              Browse Pieces <ArrowRight size={14} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* ── CONTENT AREA ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* ── SIDEBAR: Curated Collections ── */}
          <aside className="lg:w-64 shrink-0 flex flex-col gap-4">
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#9B9B9B]">
              Curation Categories
            </h3>

            <div className="flex flex-col gap-1.5">
              {/* All tab */}
              <button
                onClick={() => setActiveCollection("All")}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-left transition-all duration-150 group ${
                  activeCollection === "All"
                    ? "bg-[#37352F] text-[#FAFAF9]"
                    : "text-[#37352F]/70 hover:bg-[#ECECEC]/50 hover:text-[#37352F]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Layers size={14} strokeWidth={1.5} />
                  <span className="text-[12px] font-medium tracking-wide">All Pieces</span>
                </div>
                <span className={`text-[12px] font-medium px-2 py-0.5 rounded-full ${
                  activeCollection === "All" ? "bg-white/20 text-[#FAFAF9]" : "bg-[#ECECEC] text-[#9B9B9B]"
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
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-left transition-all duration-150 group ${
                      active
                        ? "bg-[#37352F] text-[#FAFAF9]"
                        : "text-[#37352F]/70 hover:bg-[#ECECEC]/50 hover:text-[#37352F]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={active ? "text-[#FAFAF9]" : "text-[#9B9B9B] group-hover:text-[#37352F]"}>
                        {getCategoryIcon(col)}
                      </span>
                      <span className="text-[12px] font-medium tracking-wide">{col}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[12px] font-medium px-2 py-0.5 rounded-full ${
                        active ? "bg-white/20 text-[#FAFAF9]" : "bg-[#ECECEC] text-[#9B9B9B]"
                      }`}>
                        {count}
                      </span>
                      {!active && count === 0 && (
                        <button
                          onClick={(e) => { e.stopPropagation(); removeCollection(col); }}
                          className="opacity-0 group-hover:opacity-100 text-[#9B9B9B] hover:text-red-500 transition-all p-0.5"
                        >
                          <X size={12} />
                        </button>
                      )}
                    </div>
                  </button>
                );
              })}

              {/* New collection input */}
              {showNewCol ? (
                <div className="flex items-center gap-2 px-4 py-2.5 border border-[#ECECEC] rounded-lg bg-white mt-2">
                  <input
                    value={newColName}
                    onChange={(e) => setNewColName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCreateCollection()}
                    placeholder="Category name..."
                    className="flex-1 bg-transparent text-[12px] font-medium text-[#37352F] outline-none py-0.5 placeholder-[#9B9B9B]"
                    autoFocus
                  />
                  <button onClick={handleCreateCollection} className="text-[#F07020] hover:text-[#d45e10]">
                    <Check size={14} strokeWidth={2} />
                  </button>
                  <button onClick={() => setShowNewCol(false)} className="text-[#9B9B9B] hover:text-[#37352F]">
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowNewCol(true)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-[#9B9B9B] hover:text-[#F07020] transition-colors mt-2"
                >
                  <Plus size={14} strokeWidth={1.5} />
                  <span className="text-[12px] font-medium tracking-wide">New Category</span>
                </button>
              )}
            </div>
          </aside>

          {/* ── MAIN GRID: Saved Items ── */}
          <div className="flex-1 min-w-0">
            {displayed.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[45vh] text-center px-4 py-12 bg-white rounded-xl border border-[#ECECEC]">
                {/* Premium Hanger SVG Illustration */}
                <svg
                  width="120"
                  height="90"
                  viewBox="0 0 160 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#9B9B9B]/40 mb-6"
                >
                  {/* Hook */}
                  <path
                    d="M 80 50 C 80 35, 95 30, 95 20 C 95 10, 80 5, 70 12 C 60 19, 65 30, 65 35"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  {/* Hanger Body */}
                  <path
                    d="M 20 80 L 74 54 C 77 52.5, 83 52.5, 86 54 L 140 80 C 145 82.5, 142 87, 137 87 L 23 87 C 18 87, 15 82.5, 20 80 Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinejoin="round"
                  />
                  {/* Hanging horizontal bar detail */}
                  <line
                    x1="30"
                    y1="80"
                    x2="130"
                    y2="80"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                </svg>
                <h3 className="text-[16px] font-semibold text-[#37352F] mb-2">
                  {activeCollection === "All" ? "Your wardrobe is awaiting curation" : `"${activeCollection}" is currently empty`}
                </h3>
                <p className="text-[14px] text-[#9B9B9B] max-w-sm leading-relaxed mb-8">
                  {activeCollection === "All"
                    ? "Browse through outfit recommendations and bookmark your favorite pieces to build your personal style portfolio."
                    : "Move garments here from 'All Pieces' using the card collection selector."}
                </p>
                <button
                  onClick={() => navigate("/market")}
                  className="bg-[#37352F] hover:bg-[#F07020] text-[#FAFAF9] text-[12px] font-semibold uppercase tracking-[0.2em] px-8 py-3.5 rounded-lg transition-all duration-200"
                >
                  Explore Creations
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-8 animate-fade-in-up">
                {displayed.map((item) => (
                  <div key={item.id} className="group relative flex flex-col bg-white border border-[#ECECEC] rounded-xl overflow-hidden transition-all duration-300 hover:border-[#E7E3DD] hover:shadow-[0_8px_24px_rgba(0,0,0,0.02)]">
                    
                    {/* Image Area */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-white">
                      <img
                        src={item.images?.[0] || item.image}
                        alt={item.name}
                        className="w-full h-full object-cover object-top transition-transform duration-[1.2s] group-hover:scale-[1.02]"
                      />

                      {/* Quiet Action Overlay */}
                      <div className="absolute inset-0 bg-black/[0.01] group-hover:bg-black/[0.04] transition-all duration-300 flex flex-col justify-between p-4">
                        {/* Remove from wardrobe button */}
                        <button
                          onClick={() => toggleWardrobe(item)}
                          className="self-end opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-8 h-8 rounded-full bg-white border border-[#ECECEC] flex items-center justify-center hover:bg-red-50 hover:border-red-100 hover:text-red-500 shadow-sm"
                          title="Remove piece"
                        >
                          <Trash2 size={12} strokeWidth={1.8} />
                        </button>

                        {/* Add to bag button */}
                        <button
                          onClick={() => handleAddToBag(item)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-full bg-white/95 backdrop-blur-sm text-[12px] font-semibold uppercase tracking-[0.2em] text-[#37352F] py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-[#F07020] hover:text-[#FAFAF9] hover:border-[#F07020] border border-[#ECECEC] transition-all"
                        >
                          <ShoppingBag size={12} strokeWidth={1.8} />
                          Add to Bag
                        </button>
                      </div>
                    </div>

                    {/* Details Block */}
                    <div className="p-4 flex flex-col gap-2 border-t border-[#ECECEC]">
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] font-semibold text-[#C6A15B] tracking-wider uppercase">
                          {item.brand}
                        </span>
                        <span className="text-[12px] font-semibold text-[#37352F]">
                          ${item.price}
                        </span>
                      </div>
                      <p className="text-[14px] font-medium text-[#37352F] leading-snug truncate">
                        {item.name}
                      </p>

                      {/* Collection Selector / Indicator */}
                      <div className="mt-2 pt-2 border-t border-[#ECECEC]/60">
                        {moveTarget === item.id ? (
                          <div className="flex flex-wrap gap-1 items-center">
                            {collections.map((col) => (
                              <button
                                key={col}
                                onClick={() => { moveToCollection(item.id, col); setMoveTarget(null); }}
                                className={`text-[12px] font-medium px-2.5 py-1 rounded-full border transition-all ${
                                  item.collection === col
                                    ? "bg-[#37352F] border-[#37352F] text-[#FAFAF9]"
                                    : "border-[#ECECEC] text-[#9B9B9B] hover:border-[#37352F] hover:text-[#37352F]"
                                }`}
                              >
                                {col}
                              </button>
                            ))}
                            <button 
                              onClick={() => setMoveTarget(null)} 
                              className="text-[12px] text-[#9B9B9B] hover:text-[#37352F] ml-1 p-1"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setMoveTarget(item.id)}
                            className="flex items-center gap-1.5 text-[12px] font-medium text-[#9B9B9B] hover:text-[#F07020] transition-colors"
                          >
                            <span className="text-[#9B9B9B] group-hover:text-[#F07020]">
                              {getCategoryIcon(item.collection)}
                            </span>
                            <span>{item.collection}</span>
                          </button>
                        )}
                      </div>
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
