import React from 'react';
import { Shield, CreditCard, Link2, Globe, Bell } from "lucide-react";

const AccountSidebar = () => {
  // Removed 'General'. 'Account' is now the active top item.
  const menuItems = [
    { id: 'account', label: 'Account', icon: Shield, active: true },
    { id: 'payment', label: 'Payment Method', icon: CreditCard, active: false },
    { id: 'link', label: 'Link Account', icon: Link2, active: false },
    { id: 'language', label: 'Language', icon: Globe, active: false },
    { id: 'notification', label: 'Notification', icon: Bell, active: false },
  ];

  return (
    <div className="w-full space-y-1 pr-2">
      {menuItems.map((item) => {
        const Icon = item.icon;
        
        return (
          <button
            key={item.id}
            type="button"
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
              item.active
                ? "bg-blue-50 text-blue-600 border border-blue-100/50"
                : "text-slate-400 hover:bg-slate-50 hover:text-slate-700"
            }`}
          >
            <Icon size={16} className={item.active ? "text-blue-500" : "text-slate-400"} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default AccountSidebar;