// src/pages/ProductDetailPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RelatedProducts from "../components/RelatedProducts";
import ImageModal from "../components/ImageModal";
import ProductReviews from "../components/ProductReviews";
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";
import { Plus, Send, Star } from "lucide-react";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = PRODUCTS.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="p-20 text-center text-3xl font-black uppercase tracking-tighter text-[#0b2240]">
        Product not found
      </div>
    );
  }

  const [activeImage, setActiveImage] = useState(product?.images?.[0] || product?.image);
  const [openModal, setOpenModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] ?? "M");
  const [inputText, setInputText] = useState("");
  const [selectedRating, setSelectedRating] = useState(5);
  const [attachedMedia, setAttachedMedia] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [showRatingMenu, setShowRatingMenu] = useState(false);

  useEffect(() => {
    setActiveImage(product?.images?.[0] || product?.image);
    setSelectedSize(product?.sizes?.[0] ?? "M");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id, product]);

  const [reviews, setReviews] = useState([
    {
      name: "Alex M.",
      rating: 5,
      review: "Amazing quality and fit. Material feels incredibly premium and heavy. The oversized fit is perfectly structured.",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80",
      video: null,
    },
  ]);

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
      name: "Anonymous Cop",
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

  return (
    <div className="min-h-screen bg-white">
      
      {/* ⚡ UPPER FOLD: VIEWPORT BOUNDED BOX CONSTRAINED PRESENTATION FRAME */}
      <section className="w-full lg:h-[calc(100vh-5rem)] min-h-0 bg-white border-b border-slate-100 flex flex-col justify-between px-6 py-4 lg:py-6 max-w-7xl mx-auto overflow-hidden">
        
        {/* Navigation Step History Indicator */}
        <div className="h-6 flex items-center mb-4 shrink-0">
          <button
            onClick={() => navigate(-1)}
            className="text-xs font-black uppercase tracking-[0.24em] text-slate-500 hover:text-[#ff5700] transition-colors"
          >
            ← Back To Shop
          </button>
        </div>

        {/* Core Media + Variant Configuration Workspace Area Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[90px_1fr_420px] gap-8 items-stretch flex-1 min-h-0 overflow-hidden">
          
          {/* Column 01: Viewport Bound Vertical Thumb Rail Track Panel */}
          <div className="hidden lg:flex flex-col gap-3 overflow-y-auto pr-1 select-none scrollbar-none max-h-full">
            {product.images?.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(img)}
                className={`aspect-[3/4] w-full bg-slate-50 border transition-all duration-200 shrink-0 overflow-hidden ${
                  activeImage === img ? "border-[#0b2240] ring-2 ring-[#0b2240]" : "border-slate-200 hover:border-slate-400"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover object-top" />
              </button>
            ))}
          </div>

          {/* Column 02: Fully Bound Flexible Responsive Image Layout Canvas Box */}
          <div className="flex flex-col min-h-0 justify-center items-center w-full relative h-full">
            <div
              onClick={() => setOpenModal(true)}
              className="w-full h-full max-h-[50vh] lg:max-h-full aspect-[3/4] bg-slate-50 border border-slate-100 cursor-zoom-in group relative overflow-hidden flex items-center justify-center rounded-2xl shadow-xs"
            >
              <img 
                src={activeImage} 
                alt={product.name} 
                className="w-full h-full object-contain lg:object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]" 
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-[#ff5700] text-white text-xs font-black uppercase tracking-widest px-3 py-1.5 z-10">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Micro Mobile Horizontal Thumb Strip (Ignored on Desktop View) */}
            <div className="w-full flex gap-2 mt-3 overflow-x-auto pb-1 shrink-0 lg:hidden">
              {product.images?.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`flex-shrink-0 w-14 aspect-[3/4] bg-slate-50 border overflow-hidden rounded-lg ${
                    activeImage === img ? "border-[#0b2240]" : "border-slate-200"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          </div>

          {/* Column 03: Viewport Safe Configuration Sidebar (Scrolls internally if crowded) */}
          <div className="flex flex-col h-full overflow-y-auto pr-1 justify-between scrollbar-none pb-2 lg:pb-0">
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#3b82f6] mb-1">
                  {product.brand} // {product.department}
                </p>
                <h1 className="text-2xl md:text-3xl font-black uppercase leading-[0.95] tracking-tight text-[#0b2240]">
                  {product.name}
                </h1>
                <div className="flex items-baseline gap-3 mt-3">
                  <span className="text-3xl font-black text-[#0b2240]">${product.price.toFixed(2)}</span>
                </div>
              </div>

              <div className="h-px bg-slate-100" />

              <p className="text-xs leading-relaxed text-slate-500 font-medium">
                Premium ultra-heavyweight streetwear silhouette engineered with custom loose cuts, dense low-shrink loops, brushed comfort interior, and highly resilient structural styling.
              </p>

              {/* Sizing Interactive Block Selection Rows */}
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Select Size</p>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes?.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-11 border text-xs font-black uppercase tracking-wider transition-all ${
                        selectedSize === size ? "bg-[#0b2240] text-white border-[#0b2240]" : "border-slate-200 text-slate-600 hover:border-[#0b2240]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => addToCart({ ...product, size: selectedSize })}
                className="w-full h-14 bg-[#ff5700] text-white text-xs font-black uppercase tracking-[0.3em] hover:bg-[#0b2240] transition-colors duration-300 shadow-sm flex items-center justify-center"
              >
                Add To Bag
              </button>
            </div>

            <div className="pt-4 mt-6 border-t border-slate-100 shrink-0">
              <div className="flex items-center gap-3 bg-slate-50 p-3 border border-slate-200/60 rounded-xl">
                <div className="w-1.5 h-1.5 rounded-full bg-[#ff5700] shrink-0 animate-pulse" />
                <p className="text-[10px] font-black uppercase tracking-wider text-[#0b2240]">
                  Exchangeable within 5 days of delivery
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/*   LOWER FLOWING STANDARD BLOCK: ACCESSIBLE ON DESKTOP SCROLL ACTION ONLY   */}
      <div className="max-w-7xl mx-auto px-6">
        <RelatedProducts products={relatedProducts} />

        <section className="mt-20 border-t border-slate-100 pt-16 pb-24 max-w-3xl mx-auto">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-[#0b2240]">
              Drop Feedback
            </h2>
          </div>

          {/* Fast Interactive Miniature Feedback Capture Strip Form Row */}
          <div className="bg-slate-50 border border-slate-200/60 p-2 mb-10 shadow-xs rounded-full pl-4 pr-2">
            <form onSubmit={handleSendReview} className="flex items-center gap-2 relative">
              <label className="flex items-center justify-center w-10 h-10 text-slate-500 hover:text-[#ff5700] hover:bg-slate-200/50 rounded-full cursor-pointer transition-colors shrink-0">
                <Plus size={20} strokeWidth={2.5} />
                <input type="file" accept="image/*,video/*" onChange={handleMediaUpload} className="hidden" />
              </label>

              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setShowRatingMenu(!showRatingMenu)}
                  className="flex items-center gap-1 px-3 h-10 bg-white border border-slate-200/80 rounded-full text-xs font-black text-[#0b2240] hover:border-slate-400 transition-colors"
                >
                  <Star size={13} className="fill-[#ff5700] text-[#ff5700]" />
                  {selectedRating}
                </button>
                
                {showRatingMenu && (
                  <div className="absolute left-0 bottom-full mb-3 bg-white border border-slate-200 p-1.5 shadow-xl flex gap-1 z-30 rounded-full">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <button
                        key={score}
                        type="button"
                        onClick={() => { setSelectedRating(score); setShowRatingMenu(false); }}
                        className={`w-8 h-8 rounded-full text-xs font-black transition-colors ${selectedRating === score ? "bg-[#0b2240] text-white" : "hover:bg-slate-100 text-slate-700"}`}
                      >
                        {score}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <input
                  type="text"
                  placeholder="Drop a quick fit review..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full h-10 bg-transparent text-sm font-medium outline-none border-none px-2 text-[#0b2240] placeholder:text-slate-400"
                />
              </div>

              <button
                type="submit"
                disabled={!inputText.trim()}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shrink-0 ${inputText.trim() ? "bg-[#0b2240] text-white hover:bg-[#ff5700]" : "bg-transparent text-slate-300 cursor-not-allowed"}`}
              >
                <Send size={15} strokeWidth={2.5} />
              </button>
            </form>
          </div>

          <div className="w-full">
            <ProductReviews reviews={reviews} />
          </div>
        </section>
      </div>

      {openModal && (
        <ImageModal image={activeImage} onClose={() => setOpenModal(false)} />
      )}
    </div>
  );
}