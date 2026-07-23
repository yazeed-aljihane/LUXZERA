import React, { useRef, useState } from "react";
import { Pencil } from "lucide-react";
import Loader from "@/shared/components/ui/Loader";

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
  const [localPreview, setLocalPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const profileImage = localPreview || profile?.profilePicture || user?.profilePicture || user?.avatarUrl || null;
  const initial = user?.firstName?.[0] || user?.email?.[0] || "U";
  const fullName = user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : (user?.firstName || "Unnamed User");

  return (
    <div className="relative font-['Plus_Jakarta_Sans',sans-serif]">
      {saving && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/60 rounded-2xl">
          <Loader />
        </div>
      )}

      {errorMsg && (
        <div className="p-3 mb-4 bg-red-50 border border-red-200 rounded-full text-[12px] font-medium text-red-600 text-center">
          {errorMsg}
        </div>
      )}

      {/* Parallel Single Frame Layout: Left Image Column + Right Fields Column */}
      <form onSubmit={(e) => { e.preventDefault(); onSave(fileInputRef.current); }} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Avatar Section (Clean, Boxless) */}
        <div className="md:col-span-4 flex flex-col items-center justify-center py-2 text-center">
          <div className="relative group cursor-pointer mb-4" onClick={() => fileInputRef.current?.click()}>
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
                className="w-24 h-24 rounded-full object-cover shadow-sm bg-white border border-[#ECECEC]"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-[#37352F] text-white border border-[#ECECEC] flex items-center justify-center text-2xl font-bold uppercase shadow-sm">
                {initial}
              </div>
            )}
            <div className="absolute bottom-0 right-0 bg-[#F07020] text-white p-2 rounded-full shadow-md hover:scale-105 transition-transform">
              <Pencil size={13} strokeWidth={2.5} />
            </div>
          </div>

          <h3 className="text-[16px] font-bold text-[#37352F] tracking-tight">{fullName}</h3>
          <p className="text-[12px] text-[#9B9B9B] font-medium mt-0.5 mb-3">{user?.email}</p>

          <button 
            type="button" 
            onClick={() => fileInputRef.current?.click()}
            className="text-[12px] font-semibold text-[#F07020] hover:text-[#d65f14] transition-colors inline-flex items-center gap-1.5"
          >
            Change Photo
          </button>
        </div>

        {/* Right Side: Parallel Fields Container with Value-Only Edit Capsules */}
        <div className="md:col-span-8 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[15px] font-bold text-[#37352F] tracking-tight">Personal Profile Details</h3>
            {successMsg && (
              <span className="text-[12px] font-semibold text-emerald-600 animate-pulse">
                ✓ {successMsg}
              </span>
            )}
          </div>

          {/* 1. First Name */}
          <div className="flex items-center justify-between py-1.5 border-b border-[#ECECEC]/70 group">
            <label className="text-[13px] font-semibold text-[#37352F]">First Name</label>
            <div className="relative flex items-center gap-2 rounded-full bg-[#FAFAF9] hover:bg-white border border-[#E7E3DD] hover:border-[#F07020] px-4 py-1.5 transition-all focus-within:bg-white focus-within:border-[#F07020] focus-within:ring-1 focus-within:ring-[#F07020]">
              <input
                type="text"
                name="firstName"
                value={formData.firstName || ""}
                onChange={onFormChange}
                placeholder="Enter first name"
                className="text-[13px] text-right bg-transparent outline-none text-[#37352F] font-medium placeholder-[#9B9B9B] min-w-[140px]"
                required
              />
              <Pencil size={12} className="text-[#9B9B9B] group-hover:text-[#F07020] transition-colors opacity-70 group-hover:opacity-100" />
            </div>
          </div>

          {/* 2. Last Name */}
          <div className="flex items-center justify-between py-1.5 border-b border-[#ECECEC]/70 group">
            <label className="text-[13px] font-semibold text-[#37352F]">Last Name</label>
            <div className="relative flex items-center gap-2 rounded-full bg-[#FAFAF9] hover:bg-white border border-[#E7E3DD] hover:border-[#F07020] px-4 py-1.5 transition-all focus-within:bg-white focus-within:border-[#F07020] focus-within:ring-1 focus-within:ring-[#F07020]">
              <input
                type="text"
                name="lastName"
                value={formData.lastName || ""}
                onChange={onFormChange}
                placeholder="Enter last name"
                className="text-[13px] text-right bg-transparent outline-none text-[#37352F] font-medium placeholder-[#9B9B9B] min-w-[140px]"
                required
              />
              <Pencil size={12} className="text-[#9B9B9B] group-hover:text-[#F07020] transition-colors opacity-70 group-hover:opacity-100" />
            </div>
          </div>

          {/* 3. Mobile Number */}
          <div className="flex items-center justify-between py-1.5 border-b border-[#ECECEC]/70 group">
            <label className="text-[13px] font-semibold text-[#37352F]">Mobile Number</label>
            <div className="relative flex items-center gap-2 rounded-full bg-[#FAFAF9] hover:bg-white border border-[#E7E3DD] hover:border-[#F07020] px-4 py-1.5 transition-all focus-within:bg-white focus-within:border-[#F07020] focus-within:ring-1 focus-within:ring-[#F07020]">
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber || ""}
                onChange={onFormChange}
                placeholder="Enter mobile number"
                className="text-[13px] text-right bg-transparent outline-none text-[#37352F] font-medium placeholder-[#9B9B9B] min-w-[140px]"
              />
              <Pencil size={12} className="text-[#9B9B9B] group-hover:text-[#F07020] transition-colors opacity-70 group-hover:opacity-100" />
            </div>
          </div>

          {/* 4. Gender */}
          <div className="flex items-center justify-between py-1.5 border-b border-[#ECECEC]/70 group">
            <label className="text-[13px] font-semibold text-[#37352F]">Gender</label>
            <div className="relative flex items-center gap-2 rounded-full bg-[#FAFAF9] hover:bg-white border border-[#E7E3DD] hover:border-[#F07020] px-4 py-1.5 transition-all focus-within:bg-white focus-within:border-[#F07020] focus-within:ring-1 focus-within:ring-[#F07020]">
              <select
                name="gender"
                value={formData.gender || ""}
                onChange={onFormChange}
                className="text-[13px] text-right bg-transparent outline-none text-[#37352F] font-medium cursor-pointer appearance-none min-w-[140px]"
              >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
              <Pencil size={12} className="text-[#9B9B9B] group-hover:text-[#F07020] transition-colors opacity-70 group-hover:opacity-100" />
            </div>
          </div>

          {/* 5. Date of Birth */}
          <div className="flex items-center justify-between py-1.5 border-b border-[#ECECEC]/70 group">
            <label className="text-[13px] font-semibold text-[#37352F]">Date of Birth</label>
            <div className="relative flex items-center gap-2 rounded-full bg-[#FAFAF9] hover:bg-white border border-[#E7E3DD] hover:border-[#F07020] px-4 py-1.5 transition-all focus-within:bg-white focus-within:border-[#F07020] focus-within:ring-1 focus-within:ring-[#F07020]">
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth || ""}
                onChange={onFormChange}
                className="text-[13px] text-right bg-transparent outline-none text-[#37352F] font-medium cursor-pointer min-w-[140px]"
              />
              <Pencil size={12} className="text-[#9B9B9B] group-hover:text-[#F07020] transition-colors opacity-70 group-hover:opacity-100" />
            </div>
          </div>

          {/* 6. Biography */}
          <div className="flex items-center justify-between py-1.5 border-b border-[#ECECEC]/70 group">
            <label className="text-[13px] font-semibold text-[#37352F]">Biography</label>
            <div className="relative flex items-center gap-2 rounded-full bg-[#FAFAF9] hover:bg-white border border-[#E7E3DD] hover:border-[#F07020] px-4 py-1.5 transition-all focus-within:bg-white focus-within:border-[#F07020] focus-within:ring-1 focus-within:ring-[#F07020] max-w-sm">
              <input
                type="text"
                name="bio"
                value={formData.bio || ""}
                onChange={onFormChange}
                placeholder="Tell us about yourself"
                className="text-[13px] text-right bg-transparent outline-none text-[#37352F] font-medium placeholder-[#9B9B9B] min-w-[140px]"
              />
              <Pencil size={12} className="text-[#9B9B9B] group-hover:text-[#F07020] transition-colors opacity-70 group-hover:opacity-100 flex-shrink-0" />
            </div>
          </div>

          {/* Save Profile Button */}
          <div className="pt-3 text-left">
            <button
              type="submit"
              disabled={saving}
              className="px-7 py-2.5 rounded-full bg-[#F07020] hover:bg-[#d65f14] text-white text-[13px] font-semibold shadow-sm transition-all active:scale-[0.985] disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Profile Details"}
            </button>
          </div>

        </div>

      </form>
    </div>
  );
};

export default AccountView;