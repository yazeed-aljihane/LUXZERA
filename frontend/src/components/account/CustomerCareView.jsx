import React, { useState, useEffect } from "react";
import { LifeBuoy, Send, MessageSquare, ChevronDown, ChevronUp, Clock, AlertCircle } from "lucide-react";

const CustomerCareView = ({ userId }) => {
  const [tickets, setTickets] = useState([]);
  const [activeFaq, setActiveFaq] = useState(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    category: "order",
    subject: "",
    message: ""
  });

  const faqs = [
    {
      q: "What is your return and exchange policy?",
      a: "LuxZera offers free returns and exchanges on all clothing within 14 days of delivery. Items must be in original condition, unworn, and with all designer tags attached. Exchanges can be configured using your Sizing Profile."
    },
    {
      q: "How do I use my sizing measurements?",
      a: "Once filled in the 'Measurements Fit' tab, our blueprints system automatically cross-references these sizes with designer blueprints. We suggest the optimal size dynamically on every product page so you get a perfect fit."
    },
    {
      q: "When will my order arrive?",
      a: "Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days. Tracking details are updated dynamically in your 'Order History' tab as soon as the package leaves our warehouse."
    },
    {
      q: "How do I request a custom size adjustment?",
      a: "For bespoke custom adjustments, open a ticket below selecting 'Sizing & Custom Tailoring' as the category, specifying your measurements. Our bespoke tailors will contact you within 2-4 hours."
    }
  ];

  useEffect(() => {
    const storageKey = `luxzera_tickets_${userId || "guest"}`;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setTickets(JSON.parse(saved));
    } else {
      const defaultTickets = [
        {
          id: "TKT-8274",
          date: "July 01, 2026",
          category: "Billing & Payments",
          subject: "Double charge inquiry",
          status: "Resolved",
          messages: [
            { sender: "user", text: "Hi, I noticed two pending charges for my blazer purchase on my statement.", time: "10:30 AM" },
            { sender: "agent", text: "Hello Saketh, we reviewed your transaction history. One charge was an authorization hold and has been automatically voided. You will see it drop off in 1-2 business days.", time: "11:15 AM" }
          ]
        }
      ];
      localStorage.setItem(storageKey, JSON.stringify(defaultTickets));
      setTickets(defaultTickets);
    }
  }, [userId]);

  const saveToStorage = (updatedTickets) => {
    const storageKey = `luxzera_tickets_${userId || "guest"}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedTickets));
    setTickets(updatedTickets);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitTicket = async (e) => {
    e.preventDefault();
    if (!formData.subject.trim() || !formData.message.trim()) return;

    setSaving(true);
    setSuccess(false);

    // Simulate API submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newTicket = {
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      category: formData.category === "order" ? "Order Status" : formData.category === "sizing" ? "Sizing & Tailoring" : "Others",
      subject: formData.subject,
      status: "Open",
      messages: [
        { sender: "user", text: formData.message, time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) },
        { sender: "agent", text: "We have received your support request. An representative from our Customer Care team is reviewing it and will respond within 2 hours.", time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) }
      ]
    };

    const updated = [newTicket, ...tickets];
    saveToStorage(updated);

    setSuccess(true);
    setSaving(false);
    setTimeout(() => {
      setSuccess(false);
      setFormData({
        category: "order",
        subject: "",
        message: ""
      });
    }, 1500);
  };

  return (
    <div className="relative space-y-6">
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
        <div className="absolute inset-0 bg-transparent rounded-2xl flex flex-col items-center justify-center z-20 animate-fade-in">
          <div className="flex flex-col items-center justify-center p-6 bg-white border border-slate-100/60 rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.06)] animate-scale-up">
            <div className="relative w-20 h-16 flex items-center justify-center animate-pulse-glow">
              <svg className="w-full h-full text-[#FF8C33]" viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path 
                  className="animate-draw-path"
                  d="M 46 22 C 46 15, 54 13, 54 22 C 54 28, 50 30, 50 36 L 15 60 L 85 60 Z"
                />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="pb-5 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#2D3436] tracking-tight">Customer Care Support</h2>
          <p className="text-xs text-slate-400 mt-1">Get immediate answers or contact our concierge support desk.</p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-bold text-slate-500 select-none">
          <LifeBuoy size={13} className="text-slate-400" />
          <span>Concierge Active</span>
        </div>
      </div>

      {/* FAQs Section */}
      <div>
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Frequently Asked Questions</h3>
        <div className="border border-slate-200/60 rounded-2xl divide-y divide-slate-100 bg-white overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
          {faqs.map((faq, idx) => {
            const isFaqOpen = activeFaq === idx;
            return (
              <div key={idx} className="transition-colors">
                <button
                  onClick={() => setActiveFaq(isFaqOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50/50 transition-colors"
                >
                  <span className="text-xs font-bold text-slate-800 tracking-tight">{faq.q}</span>
                  {isFaqOpen ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
                </button>
                {isFaqOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-500 leading-relaxed bg-slate-50/20">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Create Support Ticket Form */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
        <div className="md:col-span-6 space-y-4">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Open a Concierge Ticket</h3>
          <form onSubmit={handleSubmitTicket} className="space-y-4 border border-slate-200/60 p-5 rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full border border-slate-200 focus:border-[#FF8C33] bg-white rounded-xl px-3.5 py-2.5 text-xs outline-none transition cursor-pointer"
              >
                <option value="order">Order Status & Tracking</option>
                <option value="sizing">Sizing & Custom Tailoring</option>
                <option value="other">Other Inquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Brief summary of request"
                className="w-full border border-slate-200 focus:border-[#FF8C33] bg-white rounded-xl px-3.5 py-2 text-xs outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Message Details</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Describe your inquiry..."
                rows={3}
                className="w-full border border-slate-200 focus:border-[#FF8C33] bg-white rounded-xl px-3.5 py-2 text-xs outline-none transition resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className={`w-full py-2.5 text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 ${
                success 
                  ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/10" 
                  : "bg-[#FF8C33] hover:bg-[#e67e2e] disabled:bg-slate-300 text-white shadow-orange-500/10"
              }`}
            >
              {saving ? (
                <span>Filing Ticket...</span>
              ) : success ? (
                <>
                  <svg className="w-3.5 h-3.5 stroke-current" fill="none" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span>Ticket Submitted</span>
                </>
              ) : (
                <>
                  <Send size={12} />
                  <span>Submit Ticket</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Tickets History List */}
        <div className="md:col-span-6 space-y-4">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Your Active Tickets</h3>
          {tickets.length === 0 ? (
            <div className="py-12 border border-dashed border-slate-200 rounded-2xl text-center bg-white">
              <MessageSquare size={26} className="text-slate-300 mx-auto mb-2" />
              <p className="text-[11px] font-semibold text-slate-500">No active support tickets</p>
              <p className="text-[9px] text-slate-400 mt-1 max-w-[150px] mx-auto leading-normal">Submit a ticket if you need assistance from our agents.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[310px] overflow-y-auto pr-1">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="border border-slate-200/60 p-4 rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.01)] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#FF8C33]">{ticket.id}</span>
                      <h4 className="text-xs font-bold text-[#2D3436] mt-0.5">{ticket.subject}</h4>
                    </div>
                    <span className={`px-2 py-0.5 border rounded-md text-[8px] font-bold uppercase tracking-wider ${
                      ticket.status.toLowerCase() === "resolved" 
                        ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                        : "bg-amber-50 text-amber-700 border-amber-100"
                    }`}>
                      {ticket.status}
                    </span>
                  </div>

                  <div className="bg-slate-50/50 p-2.5 rounded-xl border border-slate-100 space-y-2 text-[10px]">
                    <div className="flex gap-1 items-center text-slate-400">
                      <Clock size={11} />
                      <span>Last Activity: {ticket.date}</span>
                    </div>
                    {/* Render last message preview */}
                    <p className="text-slate-600 italic mt-1 font-medium line-clamp-2">
                      &quot;{ticket.messages[ticket.messages.length - 1].text}&quot;
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerCareView;
