import React, { useState, useEffect } from "react";
import { Package, Truck, ChevronDown, ChevronUp, Download, HelpCircle, ExternalLink } from "lucide-react";

const OrdersView = ({ userId, onNavigateToTab }) => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    const storageKey = `luxzera_orders_${userId || "guest"}`;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setOrders(JSON.parse(saved));
    } else {
      const defaultOrders = [
        {
          id: "LZ-98374",
          date: "June 28, 2026",
          status: "Delivered",
          statusStep: 4, // 0: Placed, 1: Processing, 2: Shipped, 3: Out for Delivery, 4: Delivered
          total: 289.00,
          shippingAddress: "Saketh Chokkapu, 123 Luxury Avenue, Apt 4B, New York, NY 10001",
          paymentMethod: "Visa ending in 4242",
          items: [
            {
              id: "item-1",
              name: "Signature Slim-Fit Linen Blazer",
              price: 189.00,
              quantity: 1,
              size: "M",
              color: "Classic Beige",
              image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=150&h=150&q=80"
            },
            {
              id: "item-2",
              name: "Premium Pima Cotton Tee",
              price: 50.00,
              quantity: 2,
              size: "M",
              color: "Optic White",
              image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=150&h=150&q=80"
            }
          ]
        },
        {
          id: "LZ-84729",
          date: "July 02, 2026",
          status: "Shipped",
          statusStep: 2,
          total: 145.00,
          shippingAddress: "Saketh Chokkapu, 123 Luxury Avenue, Apt 4B, New York, NY 10001",
          paymentMethod: "Mastercard ending in 9876",
          items: [
            {
              id: "item-3",
              name: "Tailored Pleated Trouser",
              price: 145.00,
              quantity: 1,
              size: "32",
              color: "Midnight Black",
              image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=150&h=150&q=80"
            }
          ]
        }
      ];
      localStorage.setItem(storageKey, JSON.stringify(defaultOrders));
      setOrders(defaultOrders);
    }
  }, [userId]);

  const toggleExpand = (orderId) => {
    setExpandedOrderId(prev => (prev === orderId ? null : orderId));
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "shipped":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "processing":
        return "bg-amber-50 text-amber-700 border-amber-100";
      default:
        return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  // Modern Multi-Step Tracker
  const renderTracker = (currentStep) => {
    const steps = ["Order Placed", "Processing", "Shipped", "Out for Delivery", "Delivered"];
    return (
      <div className="py-6 px-4 bg-slate-50/50 rounded-2xl border border-slate-100 mt-4">
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">Shipment Progress</h4>
        <div className="relative flex justify-between items-center w-full">
          {/* Progress bar line */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[3px] bg-slate-200 -z-10">
            <div 
              className="h-full bg-[#FF8C33] transition-all duration-500" 
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />
          </div>
          
          {steps.map((step, idx) => {
            const isCompleted = idx <= currentStep;
            const isActive = idx === currentStep;
            return (
              <div key={step} className="flex flex-col items-center">
                <div 
                  className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                    isCompleted 
                      ? "bg-[#FF8C33] border-[#FF8C33] text-white shadow-sm" 
                      : "bg-white border-slate-300 text-slate-400"
                  } ${isActive ? "ring-4 ring-orange-500/10 scale-110" : ""}`}
                >
                  <span className="text-[9px] font-bold">{idx + 1}</span>
                </div>
                <span className={`text-[9px] font-bold mt-2 tracking-tight ${isCompleted ? "text-slate-800" : "text-slate-400"}`}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="pb-5 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#2D3436] tracking-tight">Order History</h2>
          <p className="text-xs text-slate-400 mt-1">Track shipping details and review past purchases.</p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-bold text-slate-500 select-none">
          <Package size={13} className="text-slate-400" />
          <span>{orders.length} total orders</span>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="py-12 border border-dashed border-slate-200 rounded-2xl text-center">
          <Package size={32} className="text-slate-300 mx-auto mb-3" />
          <p className="text-xs font-semibold text-slate-500">No orders placed yet</p>
          <p className="text-[10px] text-slate-400 mt-1 max-w-[200px] mx-auto leading-normal">Browse our collections to start adding luxury pieces to your wardrobe.</p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {orders.map((order) => {
            const isExpanded = expandedOrderId === order.id;
            return (
              <div 
                key={order.id} 
                className="border border-slate-200/60 rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.01)] transition-all overflow-hidden"
              >
                {/* Header Row */}
                <div 
                  onClick={() => toggleExpand(order.id)}
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                    <div>
                      <span className="text-xs font-bold text-[#2D3436]">{order.id}</span>
                      <p className="text-[10px] text-slate-400 mt-0.5">{order.date}</p>
                    </div>
                    <div className="h-6 w-[1px] bg-slate-200 hidden sm:block"></div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Amount</span>
                      <p className="text-xs font-bold text-[#FF8C33] mt-0.5">${order.total.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-0.5 border rounded-md text-[9px] font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    {isExpanded ? <ChevronUp size={15} className="text-slate-400" /> : <ChevronDown size={15} className="text-slate-400" />}
                  </div>
                </div>

                {/* Expanded Details Panel */}
                {isExpanded && (
                  <div className="p-4 border-t border-slate-100 bg-slate-50/20 space-y-4 animate-scale-up">
                    {/* Item list */}
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Items in Order</h4>
                      {order.items.map((item) => (
                        <div key={item.id} className="flex gap-4 items-center justify-between bg-white border border-slate-100 p-3 rounded-xl">
                          <div className="flex gap-3 items-center">
                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg border border-slate-100" />
                            <div>
                              <p className="text-xs font-bold text-[#2D3436] leading-tight">{item.name}</p>
                              <p className="text-[10px] text-slate-400 mt-1">
                                Size: <span className="font-bold text-slate-600 mr-2">{item.size}</span>
                                Color: <span className="font-bold text-slate-600">{item.color}</span>
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-bold text-slate-800">${item.price.toFixed(2)}</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Progress Tracker bar */}
                    {renderTracker(order.statusStep)}

                    {/* Summary row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="p-3.5 bg-white border border-slate-100 rounded-xl">
                        <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Shipping Address</h4>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{order.shippingAddress}</p>
                      </div>
                      <div className="p-3.5 bg-white border border-slate-100 rounded-xl">
                        <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Payment Summary</h4>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">Method: {order.paymentMethod}</p>
                        <div className="flex gap-2 mt-3">
                          <button className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 hover:border-slate-300 rounded-lg text-[10px] font-bold text-slate-600 transition">
                            <Download size={11} />
                            <span>Download Invoice</span>
                          </button>
                          <button 
                            onClick={() => onNavigateToTab?.("support")}
                            className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 hover:border-slate-300 rounded-lg text-[10px] font-bold text-slate-600 transition"
                          >
                            <HelpCircle size={11} />
                            <span>Need Help?</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrdersView;
