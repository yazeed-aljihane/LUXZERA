import React, { useState, useEffect, useRef } from "react";
import { Send, LifeBuoy, Sparkles } from "lucide-react";

const CustomerCareView = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState("");
  const [typing, setTyping] = useState(false);
  const chatContainerRef = useRef(null);

  const faqSuggestions = [
    { label: "Return Policy?", text: "What is your return and exchange policy?" },
    { label: "Track Shipment?", text: "When will my order LZ-84729 arrive?" },
    { label: "Bespoke Fitting?", text: "How do I request a custom size adjustment?" }
  ];

  // Load chat history from localStorage
  useEffect(() => {
    const storageKey = `luxzera_chat_${userId || "guest"}`;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      const initialMessages = [
        {
          id: "msg-1",
          sender: "agent",
          text: "Welcome to LuxZera Concierge Support. I am your personal shopping assistant. How may I assist you today?",
          time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
        }
      ];
      localStorage.setItem(storageKey, JSON.stringify(initialMessages));
      setMessages(initialMessages);
    }
  }, [userId]);

  // Scroll to bottom of chat internally (avoids scrolling the entire browser window/page)
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const saveChat = (updated) => {
    const storageKey = `luxzera_chat_${userId || "guest"}`;
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setMessages(updated);
  };

  const getAutoReply = (userQuery) => {
    const query = userQuery.toLowerCase();
    if (query.includes("return") || query.includes("exchange")) {
      return "LuxZera offers free returns and exchanges on all clothing within 14 days of delivery. Items must be unworn with all original tags attached.";
    }
    if (query.includes("order") || query.includes("shipment") || query.includes("arrive") || query.includes("lz-")) {
      return "Your order LZ-84729 has been shipped! It is currently in transit. You can review the step-by-step progress directly in your 'My Orders' history page.";
    }
    if (query.includes("fitting") || query.includes("adjust") || query.includes("custom") || query.includes("tailor")) {
      return "For bespoke customizations, our design team will verify the measurements in your Sizing Profile. We will contact you at your registered email within 2 hours.";
    }
    return `Thank you for your message. I have opened a concierge support ticket (ID: TKT-${Math.floor(1000 + Math.random() * 9000)}) for your inquiry. A specialist will review details and reply shortly.`;
  };

  const handleSendMessage = async (textToSend) => {
    if (!textToSend.trim()) return;

    const userMsg = {
      id: `msg-user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
    };

    const nextMessages = [...messages, userMsg];
    saveChat(nextMessages);
    setInputMsg("");

    // Simulate concierge typing status
    setTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 1400));
    setTyping(false);

    const agentMsg = {
      id: `msg-agent-${Date.now()}`,
      sender: "agent",
      text: getAutoReply(textToSend),
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
    };

    saveChat([...nextMessages, agentMsg]);
  };

  return (
    <div className="h-[390px] flex flex-col justify-between overflow-hidden relative">
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

      {/* Header bar */}
      <div className="pb-2.5 border-b border-slate-100 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-[#FF8C33]/10 text-[#FF8C33] rounded-lg">
            <LifeBuoy size={14} />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-800 tracking-tight">Concierge Assistant</h2>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-[9px] font-semibold text-slate-400">Agent Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 tracking-wider uppercase bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md select-none">
          <Sparkles size={9} className="text-amber-500" />
          <span>LuxZera AI</span>
        </div>
      </div>

      {/* Chat scroll box */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto space-y-3.5 my-2 pr-1 py-1" 
        style={{ maxHeight: "220px" }}
      >
        {messages.map((msg) => {
          const isUser = msg.sender === "user";
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? "items-end" : "items-start"} animate-scale-up`}
            >
              <div
                className={`text-[11px] p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                  isUser
                    ? "bg-[#FF8C33]/15 text-slate-800 border border-orange-500/10 rounded-tr-sm"
                    : "bg-slate-50 border border-slate-100 text-slate-600 rounded-tl-sm shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[8px] text-slate-400 mt-1 px-1 font-medium">{msg.time}</span>
            </div>
          );
        })}

        {/* Typing indicator */}
        {typing && (
          <div className="flex flex-col items-start animate-fade-in">
            <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-2xl rounded-tl-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#FF8C33] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
              <span className="w-1.5 h-1.5 bg-[#FF8C33] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
              <span className="w-1.5 h-1.5 bg-[#FF8C33] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
            </div>
          </div>
        )}
      </div>

      {/* Suggestion Chips */}
      <div className="shrink-0 flex gap-2 flex-wrap pb-1.5 border-t border-slate-100/60 pt-2.5">
        {faqSuggestions.map((faq) => (
          <button
            key={faq.label}
            onClick={() => handleSendMessage(faq.text)}
            className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200/50 hover:border-slate-300 rounded-lg text-[9px] font-bold text-slate-500 hover:text-slate-700 transition"
          >
            {faq.label}
          </button>
        ))}
      </div>

      {/* Input bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputMsg);
        }}
        className="shrink-0 flex gap-2 p-1.5 bg-slate-50 border border-slate-200/60 rounded-xl"
      >
        <input
          type="text"
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          placeholder="Ask concierge support..."
          className="flex-1 bg-transparent border-none outline-none focus:ring-0 px-2 py-0.5 text-xs text-slate-700 focus:text-slate-900"
          required
        />
        <button
          type="submit"
          className="p-2 bg-[#FF8C33] hover:bg-[#e67e2e] text-white rounded-lg transition shadow-sm"
        >
          <Send size={11} />
        </button>
      </form>
    </div>
  );
};

export default CustomerCareView;
