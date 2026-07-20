import React, { useState, useEffect } from "react";
import { CreditCard, Plus, Trash2, CheckCircle2, Lock, X } from "lucide-react";
import Loader from "@/shared/components/ui/Loader";

const PaymentMethodsView = ({ userId }) => {
  const [cards, setCards] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [newCard, setNewCard] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });

  // Load cards from localStorage on mount (with pre-loaded mock cards if empty)
  useEffect(() => {
    const storageKey = `luxzera_cards_${userId || "guest"}`;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setCards(JSON.parse(saved));
    } else {
      const defaultCards = [
        {
          id: "card-1",
          cardholderName: "Saketh Chokkapu",
          cardNumber: "4242424242424242",
          expiryDate: "12/28",
          cardType: "visa",
          isDefault: true
        },
        {
          id: "card-2",
          cardholderName: "Saketh Chokkapu",
          cardNumber: "5412751234569876",
          expiryDate: "08/29",
          cardType: "mastercard",
          isDefault: false
        }
      ];
      localStorage.setItem(storageKey, JSON.stringify(defaultCards));
      setCards(defaultCards);
    }
  }, [userId]);

  const saveToStorage = (updatedCards) => {
    const storageKey = `luxzera_cards_${userId || "guest"}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedCards));
    setCards(updatedCards);
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    if (name === "cardNumber") {
      // Allow only numbers and space-format
      value = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
      // Format to 4-digit blocks
      const matches = value.match(/\d{4,16}/g);
      const match = (matches && matches[0]) || "";
      const parts = [];

      for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
      }

      if (parts.length > 0) {
        value = parts.join(" ");
      } else {
        // Handle input lengths less than 4
        const subParts = [];
        for (let i = 0; i < value.length; i += 4) {
          subParts.push(value.substring(i, Math.min(i + 4, value.length)));
        }
        value = subParts.join(" ");
      }
      value = value.substring(0, 19); // Max 16 digits + 3 spaces
    }

    if (name === "expiryDate") {
      value = value.replace(/[^0-9]/g, "");
      if (value.length >= 2) {
        value = value.substring(0, 2) + "/" + value.substring(2, 4);
      }
      value = value.substring(0, 5); // MM/YY
    }

    if (name === "cvv") {
      value = value.replace(/[^0-9]/g, "").substring(0, 4);
    }

    setNewCard((prev) => ({ ...prev, [name]: value }));
  };

  const getCardType = (number) => {
    const raw = number.replace(/\s+/g, "");
    if (raw.startsWith("4")) return "visa";
    if (/^5[1-5]/.test(raw)) return "mastercard";
    if (/^3[47]/.test(raw)) return "amex";
    return "generic";
  };

  const handleAddCard = async (e) => {
    e.preventDefault();
    const rawNumber = newCard.cardNumber.replace(/\s+/g, "");
    if (rawNumber.length < 15) {
      setErrorMsg("Please enter a valid card number.");
      return;
    }
    if (newCard.expiryDate.length < 5) {
      setErrorMsg("Please enter expiry date in MM/YY format.");
      return;
    }
    if (newCard.cvv.length < 3) {
      setErrorMsg("Please enter a valid CVV.");
      return;
    }

    setSaving(true);
    setSuccess(false);
    setErrorMsg("");

    // Simulate luxury API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const cardType = getCardType(newCard.cardNumber);
    const brandNewCard = {
      id: `card-${Date.now()}`,
      cardholderName: newCard.cardholderName || "Saketh Chokkapu",
      cardNumber: rawNumber,
      expiryDate: newCard.expiryDate,
      cardType,
      isDefault: cards.length === 0
    };

    const updated = [...cards, brandNewCard];
    saveToStorage(updated);

    setSuccess(true);
    setSaving(false);
    setTimeout(() => {
      setSuccess(false);
      setShowAddForm(false);
      setNewCard({
        cardholderName: "",
        cardNumber: "",
        expiryDate: "",
        cvv: ""
      });
    }, 1500);
  };

  const handleDeleteCard = (cardId) => {
    const updated = cards.filter((c) => c.id !== cardId);
    // If we deleted the default card, set the first remaining one as default
    if (updated.length > 0 && !updated.some((c) => c.isDefault)) {
      updated[0].isDefault = true;
    }
    saveToStorage(updated);
  };

  const handleSetDefault = (cardId) => {
    const updated = cards.map((c) => ({
      ...c,
      isDefault: c.id === cardId
    }));
    saveToStorage(updated);
  };

  const maskCardNumber = (num) => {
    if (!num) return "";
    return `•••• •••• •••• ${num.substring(num.length - 4)}`;
  };

  const getCardGradient = (type) => {
    switch (type) {
      case "visa":
        return "bg-gradient-to-br from-[#1E293B] to-[#0F172A] border-slate-800 text-slate-100 shadow-[0_8px_30px_rgb(15,23,42,0.15)]";
      case "mastercard":
        return "bg-gradient-to-br from-[#FF8C33] to-[#e67e2e] border-[#e67e2e] text-white shadow-[0_8px_30px_rgba(255,140,51,0.15)]";
      case "amex":
        return "bg-gradient-to-br from-[#0F766E] to-[#115E59] border-teal-800 text-teal-50 shadow-[0_8px_30px_rgba(15,118,110,0.15)]";
      default:
        return "bg-gradient-to-br from-[#475569] to-[#334155] border-slate-700 text-slate-100 shadow-[0_8px_30px_rgba(71,85,105,0.15)]";
    }
  };

  return (
    <div className="relative">
      <style>{`
        .animate-draw-path {
          stroke-dasharray: 300;
          animation: path-draw 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2.5s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .animate-scale-up {
          animation: scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes path-draw {
          0% { stroke-dashoffset: 300; }
          50% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -300; }
        }
        @keyframes pulse-glow {
          0%, 100% { filter: drop-shadow(0 0 2px rgba(255, 140, 51, 0.15)); opacity: 0.8; }
          50% { filter: drop-shadow(0 0 10px rgba(255, 140, 51, 0.6)); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.85); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>

      {/* Saving Overlay */}
      {saving && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] rounded-2xl flex items-center justify-center z-20 animate-fade-in">
          <Loader size="w-10 h-10" />
        </div>
      )}

      <div className="pb-5 border-b border-slate-100 mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#2D3436] tracking-tight">Saved Payment Methods</h2>
          <p className="text-xs text-slate-400 mt-1">Manage credit/debit cards linked to your LuxZera account.</p>
        </div>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FF8C33] hover:bg-[#e67e2e] text-white text-[11px] font-bold rounded-xl shadow-sm transition"
          >
            <Plus size={13} />
            <span>Add Card</span>
          </button>
        )}
      </div>

      {errorMsg && (
        <div className="mb-5 p-3.5 bg-red-50 border border-red-100 rounded-xl text-xs font-semibold text-red-600">
          {errorMsg}
        </div>
      )}

      {showAddForm ? (
        <div className="border border-slate-200/70 rounded-2xl p-5 bg-slate-50/50 mb-6 animate-scale-up">
          <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Link New Card</h3>
            <button
              onClick={() => {
                setShowAddForm(false);
                setErrorMsg("");
              }}
              className="text-slate-400 hover:text-slate-600 transition"
            >
              <X size={15} />
            </button>
          </div>

          <form onSubmit={handleAddCard} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Cardholder Name</label>
              <input
                type="text"
                name="cardholderName"
                value={newCard.cardholderName}
                onChange={handleInputChange}
                placeholder="Name on card"
                className="w-full border border-slate-200 focus:border-[#FF8C33] bg-white rounded-xl px-3.5 py-2 text-xs outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Card Number</label>
              <div className="relative">
                <input
                  type="text"
                  name="cardNumber"
                  value={newCard.cardNumber}
                  onChange={handleInputChange}
                  placeholder="4242 4242 4242 4242"
                  className="w-full border border-slate-200 focus:border-[#FF8C33] bg-white rounded-xl pl-3.5 pr-10 py-2 text-xs outline-none transition font-mono tracking-wider"
                  required
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <CreditCard size={15} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={newCard.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  className="w-full border border-slate-200 focus:border-[#FF8C33] bg-white rounded-xl px-3.5 py-2 text-xs outline-none transition text-center font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">CVV</label>
                <input
                  type="password"
                  name="cvv"
                  value={newCard.cvv}
                  onChange={handleInputChange}
                  placeholder="•••"
                  className="w-full border border-slate-200 focus:border-[#FF8C33] bg-white rounded-xl px-3.5 py-2 text-xs outline-none transition text-center font-mono"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
                <Lock size={12} className="text-[#FF8C33]" />
                <span>Secured 256-bit connection</span>
              </div>
              <button
                type="submit"
                disabled={saving}
                className={`px-5 py-2 text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 ${
                  success 
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/10" 
                    : "bg-[#FF8C33] hover:bg-[#e67e2e] disabled:bg-slate-300 text-white shadow-orange-500/10"
                }`}
              >
                {saving ? (
                  <span>Linking...</span>
                ) : success ? (
                  <>
                    <svg className="w-3.5 h-3.5 stroke-current" fill="none" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>Card Linked</span>
                  </>
                ) : (
                  "Link Card"
                )}
              </button>
            </div>
          </form>
        </div>
      ) : null}

      {cards.length === 0 ? (
        <div className="py-12 border border-dashed border-slate-200 rounded-2xl text-center">
          <CreditCard size={32} className="text-slate-300 mx-auto mb-3" />
          <p className="text-xs font-semibold text-slate-500">No payment methods saved</p>
          <p className="text-[10px] text-slate-400 mt-1 max-w-[200px] mx-auto leading-normal">Add a credit or debit card to start placing instant 1-click orders.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`border border-slate-100/60 rounded-2xl p-4.5 flex flex-col justify-between h-[130px] transition-all ${getCardGradient(card.cardType)}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[9px] font-bold tracking-[0.2em] uppercase opacity-75">{card.cardType} card</p>
                  <p className="text-[15px] font-mono font-semibold mt-1 tracking-wider">{maskCardNumber(card.cardNumber)}</p>
                </div>
                {card.isDefault ? (
                  <span className="bg-white/20 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded-md text-[8px] font-bold tracking-wider uppercase">Default</span>
                ) : (
                  <button
                    onClick={() => handleSetDefault(card.id)}
                    className="opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100 bg-black/15 hover:bg-black/25 px-2 py-0.5 rounded-md text-[8px] font-bold tracking-wider uppercase transition"
                    style={{ opacity: 1 }}
                  >
                    Set Default
                  </button>
                )}
              </div>

              <div className="flex items-end justify-between pt-4">
                <div>
                  <p className="text-[8px] uppercase tracking-wider opacity-60">Cardholder</p>
                  <p className="text-[11px] font-bold tracking-tight mt-0.5 uppercase">{card.cardholderName}</p>
                </div>
                <div className="flex items-end gap-3.5">
                  <div className="text-right">
                    <p className="text-[8px] uppercase tracking-wider opacity-60">Expires</p>
                    <p className="text-[11px] font-mono font-bold mt-0.5">{card.expiryDate}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteCard(card.id)}
                    className="p-1.5 hover:bg-white/10 rounded-lg text-white/80 hover:text-white transition"
                    title="Delete card"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentMethodsView;
