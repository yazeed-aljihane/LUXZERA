import React from 'react';
import { Camera } from "lucide-react";
import Loader from "../Loader";

const AccountView = ({ 
  formData, 
  user, 
  profile, 
  onFormChange, 
  onSave, 
  saving, 
  successMsg, 
  errorMsg 
}) => {
  const profileImage = user?.profilePicture || user?.avatarUrl || null;
  const initial = user?.firstName?.[0] || user?.email?.[0] || "U";
  const fullName = user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : "Unnamed User";

  return (
    <div className="space-y-4 relative">
      <style>{`
        @keyframes draw-circle {
          to { stroke-dashoffset: 0; }
        }
        @keyframes draw-check {
          to { stroke-dashoffset: 0; }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .animate-scale-up {
          animation: scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .animate-draw-path {
          stroke-dasharray: 300;
          animation: path-draw 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2.5s ease-in-out infinite;
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
      `}</style>

      {/* Saving / Loading Spinner Overlay */}
      {saving && (
        <div className="absolute inset-0 bg-[#FAF9F7]/70 backdrop-blur-[1px] rounded-2xl flex items-center justify-center z-20 animate-fade-in">
          <Loader size="w-10 h-10" />
        </div>
      )}


      {/* Centered Profile Picture Header */}
      <div className="flex flex-col items-center justify-center pb-4 border-b border-slate-100/60">
        <div className="relative group cursor-pointer">
          {profileImage ? (
            <img
              src={profileImage}
              alt="profile"
              className="w-14 h-14 rounded-full object-cover shadow-sm bg-slate-50 border border-slate-100"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-[#1B2631] text-[#FAF9F7] border border-slate-100 flex items-center justify-center text-base font-bold shadow-sm uppercase">
              {initial}
            </div>
          )}
          <div className="absolute -bottom-0.5 -right-0.5 p-1 bg-white border border-slate-100 rounded-full shadow-sm text-slate-500 hover:text-slate-700 transition">
            <Camera size={10} />
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-[11px] font-semibold text-red-600">
          {errorMsg}
        </div>
      )}

      {/* Horizontal rows for fields with proper spacing and bottom dividers */}
      <form onSubmit={(e) => { e.preventDefault(); onSave(); }} className="space-y-0">
        
        {/* Row 1: First Name */}
        <div className="flex items-center justify-between py-2.5 border-b border-slate-100/80">
          <label className="text-xs font-semibold text-slate-800">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName || ""}
            onChange={onFormChange}
            placeholder="Add first name"
            className="text-xs text-right bg-transparent border-none outline-none focus:ring-0 p-0 text-slate-600 focus:text-slate-900 w-2/3 placeholder-slate-300 transition-colors"
            required
          />
        </div>

        {/* Row 2: Last Name */}
        <div className="flex items-center justify-between py-2.5 border-b border-slate-100/80">
          <label className="text-xs font-semibold text-slate-800">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName || ""}
            onChange={onFormChange}
            placeholder="Add last name"
            className="text-xs text-right bg-transparent border-none outline-none focus:ring-0 p-0 text-slate-600 focus:text-slate-900 w-2/3 placeholder-slate-300 transition-colors"
            required
          />
        </div>

        {/* Row 3: Email Account (Static) */}
        <div className="flex items-center justify-between py-2.5 border-b border-slate-100/80">
          <label className="text-xs font-semibold text-slate-800">Email Account</label>
          <span className="text-xs text-right text-slate-400 select-none cursor-not-allowed">
            {user?.email || "—"}
          </span>
        </div>

        {/* Row 4: Mobile Number */}
        <div className="flex items-center justify-between py-2.5 border-b border-slate-100/80">
          <label className="text-xs font-semibold text-slate-800">Mobile Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber || ""}
            onChange={onFormChange}
            placeholder="Add mobile number"
            className="text-xs text-right bg-transparent border-none outline-none focus:ring-0 p-0 text-slate-600 focus:text-slate-900 w-2/3 placeholder-slate-300 transition-colors"
          />
        </div>

        {/* Row 5: Gender */}
        <div className="flex items-center justify-between py-2.5 border-b border-slate-100/80">
          <label className="text-xs font-semibold text-slate-800">Gender</label>
          <select
            name="gender"
            value={formData.gender || ""}
            onChange={onFormChange}
            className="text-xs text-right bg-transparent border-none outline-none focus:ring-0 p-0 text-slate-600 focus:text-slate-900 cursor-pointer appearance-none"
          >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        {/* Row 6: Date of Birth */}
        <div className="flex items-center justify-between py-2.5 border-b border-slate-100/80">
          <label className="text-xs font-semibold text-slate-800">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth || ""}
            onChange={onFormChange}
            className="text-xs text-right bg-transparent border-none outline-none focus:ring-0 p-0 text-slate-600 focus:text-slate-900 cursor-pointer"
          />
        </div>

        {/* Row 7: Biography */}
        <div className="flex items-center justify-between py-2.5 border-b border-slate-100/80">
          <label className="text-xs font-semibold text-slate-800">Biography</label>
          <input
            type="text"
            name="bio"
            value={formData.bio || ""}
            onChange={onFormChange}
            placeholder="Tell us about yourself"
            className="text-xs text-right bg-transparent border-none outline-none focus:ring-0 p-0 text-slate-600 focus:text-slate-900 w-2/3 placeholder-slate-300 transition-colors"
          />
        </div>

        {/* Save Change button at bottom left */}
        <div className="pt-4 text-left">
          <button
            type="submit"
            disabled={saving}
            className={`px-5 py-2 text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 ${
              successMsg 
                ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/10" 
                : "bg-[#FF8C33] hover:bg-[#e67e2e] disabled:bg-slate-300 text-white shadow-orange-500/10"
            }`}
          >
            {saving ? (
              <span>Saving...</span>
            ) : successMsg ? (
              <>
                <svg className="w-3.5 h-3.5 stroke-current" fill="none" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>Changes Saved</span>
              </>
            ) : (
              "Save Change"
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

export default AccountView;