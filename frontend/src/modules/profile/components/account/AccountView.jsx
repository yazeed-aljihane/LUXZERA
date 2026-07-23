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

  const handlePhoneChange = (e) => {
    const rawVal = e.target.value;
    const numericVal = rawVal.replace(/\D/g, "").slice(0, 10);
    e.target.value = numericVal;
    onFormChange(e);
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
        
        {/* Left Side: Avatar Section */}
        <div className="md:col-span-3 flex flex-col items-center justify-center py-2 text-center">
          <div className="relative group cursor-pointer mb-3" onClick={() => fileInputRef.current?.click()}>
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
                className="w-20 h-20 rounded-full object-cover shadow-sm bg-white border border-[#ECECEC]"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-[#37352F] text-white border border-[#ECECEC] flex items-center justify-center text-xl font-bold uppercase shadow-sm">
                {initial}
              </div>
            )}
            <div className="absolute bottom-0 right-0 bg-[#F07020] text-white p-1.5 rounded-full shadow-md hover:scale-105 transition-transform">
              <Pencil size={11} strokeWidth={2.5} />
            </div>
          </div>

          <h3 className="text-[15px] font-bold text-[#37352F] tracking-tight">{fullName}</h3>
          <p className="text-[11.5px] text-[#9B9B9B] font-medium mt-0.5 mb-2 truncate max-w-[140px]">{user?.email}</p>

          <button 
            type="button" 
            onClick={() => fileInputRef.current?.click()}
            className="text-[11.5px] font-semibold text-[#F07020] hover:text-[#d65f14] transition-colors inline-flex items-center gap-1"
          >
            Change Photo
          </button>
        </div>

        {/* Right Side: Parallel Fields Container using span elements & required space capsules */}
        <div className="md:col-span-9 space-y-2.5">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-[15px] font-bold text-[#37352F] tracking-tight">Personal Profile Details</h3>
          </div>

          {/* 1. First Name */}
          <span className="flex items-center gap-4 py-1.5 border-b border-[#ECECEC]/60 group w-full">
            <label className="text-[13px] font-semibold text-[#37352F] w-28 whitespace-nowrap">First Name</label>
            <span className="relative inline-flex items-center gap-2 rounded-full bg-[#FAFAF9] hover:bg-white border border-[#E7E3DD] hover:border-[#F07020] px-3.5 py-1 transition-all focus-within:bg-white focus-within:border-[#F07020] focus-within:ring-1 focus-within:ring-[#F07020] w-fit">
              <input
                type="text"
                name="firstName"
                value={formData.firstName || ""}
                onChange={onFormChange}
                placeholder="Enter first name"
                className="text-[13px] text-left bg-transparent outline-none text-[#37352F] font-medium placeholder-[#9B9B9B]"
                style={{ width: `${Math.max((formData.firstName || "").length, 12)}ch` }}
                required
              />
              <Pencil size={12} className="text-[#9B9B9B] group-hover:text-[#F07020] transition-colors opacity-70 group-hover:opacity-100 flex-shrink-0" />
            </span>
          </span>

          {/* 2. Last Name */}
          <span className="flex items-center gap-4 py-1.5 border-b border-[#ECECEC]/60 group w-full">
            <label className="text-[13px] font-semibold text-[#37352F] w-28 whitespace-nowrap">Last Name</label>
            <span className="relative inline-flex items-center gap-2 rounded-full bg-[#FAFAF9] hover:bg-white border border-[#E7E3DD] hover:border-[#F07020] px-3.5 py-1 transition-all focus-within:bg-white focus-within:border-[#F07020] focus-within:ring-1 focus-within:ring-[#F07020] w-fit">
              <input
                type="text"
                name="lastName"
                value={formData.lastName || ""}
                onChange={onFormChange}
                placeholder="Enter last name"
                className="text-[13px] text-left bg-transparent outline-none text-[#37352F] font-medium placeholder-[#9B9B9B]"
                style={{ width: `${Math.max((formData.lastName || "").length, 12)}ch` }}
                required
              />
              <Pencil size={12} className="text-[#9B9B9B] group-hover:text-[#F07020] transition-colors opacity-70 group-hover:opacity-100 flex-shrink-0" />
            </span>
          </span>

          {/* 3. Mobile Number with 10-digit Regex */}
          <span className="flex items-center gap-4 py-1.5 border-b border-[#ECECEC]/60 group w-full">
            <label className="text-[13px] font-semibold text-[#37352F] w-28 whitespace-nowrap">Mobile Number</label>
            <span className="relative inline-flex items-center gap-2 rounded-full bg-[#FAFAF9] hover:bg-white border border-[#E7E3DD] hover:border-[#F07020] px-3.5 py-1 transition-all focus-within:bg-white focus-within:border-[#F07020] focus-within:ring-1 focus-within:ring-[#F07020] w-fit">
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber || ""}
                onChange={handlePhoneChange}
                pattern="[0-9]{10}"
                maxLength={10}
                placeholder="10-digit mobile"
                className="text-[13px] text-left bg-transparent outline-none text-[#37352F] font-medium placeholder-[#9B9B9B]"
                style={{ width: `${Math.max((formData.phoneNumber || "").length, 12)}ch` }}
              />
              <Pencil size={12} className="text-[#9B9B9B] group-hover:text-[#F07020] transition-colors opacity-70 group-hover:opacity-100 flex-shrink-0" />
            </span>
          </span>

          {/* 4. Gender */}
          <span className="flex items-center gap-4 py-1.5 border-b border-[#ECECEC]/60 group w-full">
            <label className="text-[13px] font-semibold text-[#37352F] w-28 whitespace-nowrap">Gender</label>
            <span className="relative inline-flex items-center gap-2 rounded-full bg-[#FAFAF9] hover:bg-white border border-[#E7E3DD] hover:border-[#F07020] px-3.5 py-1 transition-all focus-within:bg-white focus-within:border-[#F07020] focus-within:ring-1 focus-within:ring-[#F07020] w-fit">
              <select
                name="gender"
                value={formData.gender || ""}
                onChange={onFormChange}
                className="text-[13px] text-left bg-transparent outline-none text-[#37352F] font-medium cursor-pointer appearance-none pr-1"
              >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
              <Pencil size={12} className="text-[#9B9B9B] group-hover:text-[#F07020] transition-colors opacity-70 group-hover:opacity-100 flex-shrink-0" />
            </span>
          </span>

          {/* 5. Date of Birth */}
          <span className="flex items-center gap-4 py-1.5 border-b border-[#ECECEC]/60 group w-full">
            <label className="text-[13px] font-semibold text-[#37352F] w-28 whitespace-nowrap">Date of Birth</label>
            <span className="relative inline-flex items-center gap-2 rounded-full bg-[#FAFAF9] hover:bg-white border border-[#E7E3DD] hover:border-[#F07020] px-3.5 py-1 transition-all focus-within:bg-white focus-within:border-[#F07020] focus-within:ring-1 focus-within:ring-[#F07020] w-fit">
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth || ""}
                onChange={onFormChange}
                className="text-[13px] text-left bg-transparent outline-none text-[#37352F] font-medium cursor-pointer"
              />
              <Pencil size={12} className="text-[#9B9B9B] group-hover:text-[#F07020] transition-colors opacity-70 group-hover:opacity-100 flex-shrink-0" />
            </span>
          </span>

          {/* 6. Biography */}
          <span className="flex items-center gap-4 py-1.5 border-b border-[#ECECEC]/60 group w-full">
            <label className="text-[13px] font-semibold text-[#37352F] w-28 whitespace-nowrap">Biography</label>
            <span className="relative inline-flex items-center gap-2 rounded-full bg-[#FAFAF9] hover:bg-white border border-[#E7E3DD] hover:border-[#F07020] px-3.5 py-1 transition-all focus-within:bg-white focus-within:border-[#F07020] focus-within:ring-1 focus-within:ring-[#F07020] w-fit">
              <input
                type="text"
                name="bio"
                value={formData.bio || ""}
                onChange={onFormChange}
                placeholder="Tell us about yourself"
                className="text-[13px] text-left bg-transparent outline-none text-[#37352F] font-medium placeholder-[#9B9B9B]"
                style={{ width: `${Math.max((formData.bio || "").length, 16)}ch` }}
              />
              <Pencil size={12} className="text-[#9B9B9B] group-hover:text-[#F07020] transition-colors opacity-70 group-hover:opacity-100 flex-shrink-0" />
            </span>
          </span>

          {/* Save Profile Button */}
          <div className="pt-2 text-left">
            <button
              type="submit"
              disabled={saving}
              className="px-7 py-2 rounded-full bg-[#F07020] hover:bg-[#d65f14] text-white text-[13px] font-semibold shadow-sm transition-all active:scale-[0.985] disabled:opacity-50"
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