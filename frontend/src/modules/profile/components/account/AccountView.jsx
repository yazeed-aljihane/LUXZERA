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
        
        {/* Left Side: Avatar Card */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-[#FAFAF9] border border-[#E7E3DD] rounded-3xl text-center">
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

        {/* Right Side: Parallel Capsule Fields Container */}
        <div className="md:col-span-8 space-y-2.5">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-[15px] font-bold text-[#37352F] tracking-tight">Personal Profile Details</h3>
            {successMsg && (
              <span className="text-[12px] font-semibold text-emerald-600 animate-pulse">
                ✓ {successMsg}
              </span>
            )}
          </div>

          {/* 1. First Name */}
          <div className="relative w-full rounded-full bg-[#FAFAF9] border border-[#E7E3DD] px-5 py-2 flex items-center justify-between transition-all focus-within:bg-white focus-within:border-[#F07020] focus-within:ring-1 focus-within:ring-[#F07020]">
            <label className="text-[12.5px] font-semibold text-[#37352F] w-1/3 whitespace-nowrap">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName || ""}
              onChange={onFormChange}
              placeholder="First name"
              className="text-[12.5px] text-right bg-transparent outline-none text-[#37352F] font-medium w-2/3 placeholder-[#9B9B9B]"
              required
            />
          </div>

          {/* 2. Last Name */}
          <div className="relative w-full rounded-full bg-[#FAFAF9] border border-[#E7E3DD] px-5 py-2 flex items-center justify-between transition-all focus-within:bg-white focus-within:border-[#F07020] focus-within:ring-1 focus-within:ring-[#F07020]">
            <label className="text-[12.5px] font-semibold text-[#37352F] w-1/3 whitespace-nowrap">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName || ""}
              onChange={onFormChange}
              placeholder="Last name"
              className="text-[12.5px] text-right bg-transparent outline-none text-[#37352F] font-medium w-2/3 placeholder-[#9B9B9B]"
              required
            />
          </div>

          {/* 3. Mobile Number */}
          <div className="relative w-full rounded-full bg-[#FAFAF9] border border-[#E7E3DD] px-5 py-2 flex items-center justify-between transition-all focus-within:bg-white focus-within:border-[#F07020] focus-within:ring-1 focus-within:ring-[#F07020]">
            <label className="text-[12.5px] font-semibold text-[#37352F] w-1/3 whitespace-nowrap">Mobile Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber || ""}
              onChange={onFormChange}
              placeholder="Mobile number"
              className="text-[12.5px] text-right bg-transparent outline-none text-[#37352F] font-medium w-2/3 placeholder-[#9B9B9B]"
            />
          </div>

          {/* 4. Gender */}
          <div className="relative w-full rounded-full bg-[#FAFAF9] border border-[#E7E3DD] px-5 py-2 flex items-center justify-between transition-all focus-within:bg-white focus-within:border-[#F07020] focus-within:ring-1 focus-within:ring-[#F07020]">
            <label className="text-[12.5px] font-semibold text-[#37352F] w-1/3 whitespace-nowrap">Gender</label>
            <select
              name="gender"
              value={formData.gender || ""}
              onChange={onFormChange}
              className="text-[12.5px] text-right bg-transparent outline-none text-[#37352F] font-medium cursor-pointer appearance-none w-2/3"
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          {/* 5. Date of Birth */}
          <div className="relative w-full rounded-full bg-[#FAFAF9] border border-[#E7E3DD] px-5 py-2 flex items-center justify-between transition-all focus-within:bg-white focus-within:border-[#F07020] focus-within:ring-1 focus-within:ring-[#F07020]">
            <label className="text-[12.5px] font-semibold text-[#37352F] w-1/3 whitespace-nowrap">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth || ""}
              onChange={onFormChange}
              className="text-[12.5px] text-right bg-transparent outline-none text-[#37352F] font-medium cursor-pointer w-2/3"
            />
          </div>

          {/* 6. Biography */}
          <div className="relative w-full rounded-full bg-[#FAFAF9] border border-[#E7E3DD] px-5 py-2 flex items-center justify-between transition-all focus-within:bg-white focus-within:border-[#F07020] focus-within:ring-1 focus-within:ring-[#F07020]">
            <label className="text-[12.5px] font-semibold text-[#37352F] w-1/3 whitespace-nowrap">Biography</label>
            <input
              type="text"
              name="bio"
              value={formData.bio || ""}
              onChange={onFormChange}
              placeholder="Tell us about yourself"
              className="text-[12.5px] text-right bg-transparent outline-none text-[#37352F] font-medium w-2/3 placeholder-[#9B9B9B]"
            />
          </div>

          {/* Save Profile Button */}
          <div className="pt-2 text-left">
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