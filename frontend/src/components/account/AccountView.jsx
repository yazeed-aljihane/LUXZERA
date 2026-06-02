import React from 'react';

const AccountView = ({ user, onEditToggle }) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-6">
        
        {/* First Name */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-2">
            First Name
          </label>
          <div className="w-full border border-slate-100 rounded-xl px-4 py-3 bg-white text-slate-700 text-sm shadow-sm shadow-slate-100/50">
            {user?.firstName || "Saketh"}
          </div>
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-2">
            Last Name
          </label>
          <div className="w-full border border-slate-100 rounded-xl px-4 py-3 bg-white text-slate-700 text-sm shadow-sm shadow-slate-100/50">
            {user?.lastName || "Chokkapu"}
          </div>
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-2">
            Email Address
          </label>
          <div className="w-full border border-slate-100 rounded-xl px-4 py-3 bg-white text-slate-700 text-sm shadow-sm shadow-slate-100/50">
            {user?.email || "saketh@gmail.com"}
          </div>
        </div>

        {/* Role */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-2">
            Role
          </label>
          <div className="w-full border border-slate-100 rounded-xl px-4 py-3 bg-white text-slate-700 text-sm shadow-sm shadow-slate-100/50 uppercase">
            {user?.role || "USER"}
          </div>
        </div>

      </div>

      {/* Action Footer */}
      <div className="flex justify-end mt-10">
        <button 
          onClick={onEditToggle}
          className="px-6 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-all shadow-md shadow-orange-500/10"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default AccountView;