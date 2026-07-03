import { User, MapPin, Sliders, CreditCard, ChevronRight } from "lucide-react";

const AccountSidebar = ({ activeTab = 'profile', onTabChange }) => {
  const menuItems = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
    { id: 'measurements', label: 'Measurements Fit', icon: Sliders },
    { id: 'payments', label: 'Payment Methods', icon: CreditCard },
  ];

  return (
    <div className="w-full space-y-1 bg-white rounded-2xl border border-slate-200/60 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onTabChange?.(item.id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left ${
              isActive
                ? "bg-[#FF8C33] text-white shadow-[0_6px_15px_rgba(255,140,51,0.2)]"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
            }`}
          >
            <div className="flex items-center gap-3.5">
              <Icon size={16} className={isActive ? "text-white" : "text-slate-400"} />
              <span>{item.label}</span>
            </div>
            <ChevronRight size={14} className={isActive ? "text-white" : "text-slate-300"} />
          </button>
        );
      })}
    </div>
  );
};

export default AccountSidebar;