import React from 'react';

const AccountEdit = ({ formData, user, onFormChange, onCancel, onSave }) => {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(); }}>
      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
        
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName || ""}
            onChange={onFormChange}
            className="w-full border border-slate-200 focus:border-blue-500 bg-white rounded-xl px-4 py-3 text-slate-900 text-sm outline-none transition"
            required
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName || ""}
            onChange={onFormChange}
            className="w-full border border-slate-200 focus:border-blue-500 bg-white rounded-xl px-4 py-3 text-slate-900 text-sm outline-none transition"
            required
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Email Address
          </label>
          <div className="w-full bg-slate-50 border border-slate-200/50 rounded-xl px-4 py-3 text-slate-400 text-sm cursor-not-allowed">
            {user.email}
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            System Role
          </label>
          <div className="w-full bg-slate-50 border border-slate-200/50 rounded-xl px-4 py-3 text-slate-400 text-sm cursor-not-allowed uppercase">
            {user.role}
          </div>
        </div>

      </div>

      {/* Footer System Actions */}
      <div className="flex justify-end gap-3 mt-12">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition shadow-sm"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default AccountEdit;