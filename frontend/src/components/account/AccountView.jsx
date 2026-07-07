import React, { useRef, useState, useEffect } from 'react';
import { Pencil } from "lucide-react";
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
  const storageKey = user?.id ? `luxzera_avatar_${user.id}` : null;
  const [localImage, setLocalImage] = useState(() => {
    return storageKey ? localStorage.getItem(storageKey) : null;
  });

  useEffect(() => {
    if (storageKey) {
      setLocalImage(localStorage.getItem(storageKey));
    }
  }, [storageKey]);

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result;
        setLocalImage(base64Data);
        if (storageKey) {
          localStorage.setItem(storageKey, base64Data);
          window.dispatchEvent(new Event('avatar-updated'));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const profileImage = localImage || user?.profilePicture || user?.avatarUrl || null;
  const initial = user?.firstName?.[0] || user?.email?.[0] || "U";
  const fullName = user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : "Unnamed User";

  return (
    <div className="relative">
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

      {errorMsg && (
        <div className="p-3 mb-4 bg-red-50 border border-red-100 rounded-xl text-[11px] font-semibold text-red-600">
          {errorMsg}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8 items-start">
        
        {/* Left Side: Profile Picture */}
        <div className="w-full md:w-[30%] flex flex-col items-center pt-2">
          <div className="relative group cursor-pointer mb-2" onClick={() => fileInputRef.current?.click()}>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept="image/*" 
              className="hidden" 
            />
            {profileImage ? (
              <img
                src={profileImage}
                alt="profile"
                className="w-24 h-24 rounded-full object-cover shadow-sm bg-slate-50 border border-slate-100"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-[#1B2631] text-[#FAF9F7] border border-slate-100 flex items-center justify-center text-2xl font-bold shadow-sm uppercase">
                {initial}
              </div>
            )}
          </div>
          <button 
            type="button" 
            onClick={() => fileInputRef.current?.click()}
            className="text-[11px] font-medium text-slate-600 hover:text-slate-900 transition-colors mb-3 flex items-center gap-1.5 bg-[#F5F5F5] hover:bg-[#E5E5E5] px-3 py-1 rounded-full cursor-pointer"
          >
            <Pencil size={11} strokeWidth={2} /> Edit Photo
          </button>
          <p className="text-[14px] font-bold text-slate-800 text-center leading-tight">{fullName}</p>
          <p className="text-[12px] text-slate-500 text-center mt-1">{user?.email}</p>
        </div>

        {/* Right Side: Form Details */}
        <div className="w-full md:flex-1">
          <form onSubmit={(e) => { e.preventDefault(); onSave(); }} className="space-y-0">
            
            {/* Row 1: First Name */}
            <div className="flex items-center justify-between py-3 border-b border-slate-100/80">
              <label className="text-xs font-semibold text-slate-800 w-1/3">First Name</label>
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
            <div className="flex items-center justify-between py-3 border-b border-slate-100/80">
              <label className="text-xs font-semibold text-slate-800 w-1/3">Last Name</label>
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

            {/* Row 3: Mobile Number */}
            <div className="flex items-center justify-between py-3 border-b border-slate-100/80">
              <label className="text-xs font-semibold text-slate-800 w-1/3">Mobile Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber || ""}
                onChange={onFormChange}
                placeholder="Add mobile number"
                className="text-xs text-right bg-transparent border-none outline-none focus:ring-0 p-0 text-slate-600 focus:text-slate-900 w-2/3 placeholder-slate-300 transition-colors"
              />
            </div>

            {/* Row 4: Gender */}
            <div className="flex items-center justify-between py-3 border-b border-slate-100/80">
              <label className="text-xs font-semibold text-slate-800 w-1/3">Gender</label>
              <select
                name="gender"
                value={formData.gender || ""}
                onChange={onFormChange}
                className="text-xs text-right bg-transparent border-none outline-none focus:ring-0 p-0 text-slate-600 focus:text-slate-900 cursor-pointer appearance-none w-2/3"
              >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            {/* Row 5: Date of Birth */}
            <div className="flex items-center justify-between py-3 border-b border-slate-100/80">
              <label className="text-xs font-semibold text-slate-800 w-1/3">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth || ""}
                onChange={onFormChange}
                className="text-xs text-right bg-transparent border-none outline-none focus:ring-0 p-0 text-slate-600 focus:text-slate-900 cursor-pointer w-2/3"
              />
            </div>

            {/* Row 6: Biography */}
            <div className="flex items-center justify-between py-3 border-b border-slate-100/80">
              <label className="text-xs font-semibold text-slate-800 w-1/3">Biography</label>
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
            <div className="pt-6 text-left">
              <button
                type="submit"
                disabled={saving}
                className={`px-5 py-2.5 text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 ${
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
      </div>
    </div>
  );
};

export default AccountView;