import React, { useRef, useState } from "react";
import { Pencil, Lock, ShieldCheck, KeyRound } from "lucide-react";
import Loader from "@/shared/components/ui/Loader";
import { changePassword } from "@/modules/profile/services/userService";

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

  // Password Change State
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");

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

  const handlePasswordChangeInput = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError("Please fill in all password fields.");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters long.");
      return;
    }

    setPasswordLoading(true);
    try {
      await changePassword(user.id, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      setPasswordSuccess("Password updated successfully!");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setTimeout(() => setPasswordSuccess(""), 4000);
    } catch (err) {
      setPasswordError(err.message || "Our servers are busy right now. Please try a few minutes later.");
    } finally {
      setPasswordLoading(false);
    }
  };

  const profileImage = localPreview || profile?.profilePicture || user?.profilePicture || user?.avatarUrl || null;
  const initial = user?.firstName?.[0] || user?.email?.[0] || "U";
  const fullName = user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : "Unnamed User";

  return (
    <div className="relative font-['Plus_Jakarta_Sans',sans-serif]">
      {saving && (
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
          <Loader />
        </div>
      )}

      {errorMsg && (
        <div className="p-3 mb-5 bg-red-50 border border-red-200 rounded-2xl text-[12px] font-medium text-red-600 text-center">
          {errorMsg}
        </div>
      )}

      {/* Header Profile Summary Row */}
      <div className="flex flex-col md:flex-row gap-6 items-center bg-[#FAFAF9] border border-[#E7E3DD] rounded-3xl p-5 mb-8">
        <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
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
              className="w-20 h-20 rounded-full object-cover shadow-sm bg-white border border-slate-200"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-[#18181B] text-white border border-slate-200 flex items-center justify-center text-xl font-bold uppercase shadow-sm">
              {initial}
            </div>
          )}
          <div className="absolute bottom-0 right-0 bg-[#F07020] text-white p-1.5 rounded-full shadow-sm hover:scale-105 transition-transform">
            <Pencil size={12} strokeWidth={2.5} />
          </div>
        </div>

        <div className="text-center md:text-left flex-1">
          <h2 className="text-[18px] font-bold text-[#18181B] tracking-tight">{fullName}</h2>
          <p className="text-[13px] text-[#71717A] font-medium mt-0.5">{user?.email}</p>
          <button 
            type="button" 
            onClick={() => fileInputRef.current?.click()}
            className="mt-2 text-[12px] font-semibold text-[#18181B] hover:text-[#F07020] transition-colors inline-flex items-center gap-1.5"
          >
            Change profile picture
          </button>
        </div>
      </div>

      {/* Main Form: Capsule Format Profile Details */}
      <form onSubmit={(e) => { e.preventDefault(); onSave(fileInputRef.current); }} className="space-y-4">
        
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[15px] font-bold text-[#18181B] tracking-tight">Personal Details</h3>
          {successMsg && (
            <span className="text-[12px] font-semibold text-emerald-600 animate-pulse">
              ✓ {successMsg}
            </span>
          )}
        </div>

        {/* 1. First Name - Capsule Format */}
        <div className="relative w-full rounded-full bg-[#FAFAF9] border border-[#E7E3DD] px-6 py-3 flex items-center justify-between transition-all focus-within:bg-white focus-within:border-[#F07020] focus-within:ring-1 focus-within:ring-[#F07020]">
          <label className="text-[13px] font-semibold text-[#37352F] w-1/3 whitespace-nowrap">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName || ""}
            onChange={onFormChange}
            placeholder="Enter first name"
            className="text-[13px] text-right bg-transparent outline-none text-[#37352F] font-medium w-2/3 placeholder-[#9B9B9B]"
            required
          />
        </div>

        {/* 2. Last Name - Capsule Format */}
        <div className="relative w-full rounded-full bg-[#FAFAF9] border border-[#E7E3DD] px-6 py-3 flex items-center justify-between transition-all focus-within:bg-white focus-within:border-[#F07020] focus-within:ring-1 focus-within:ring-[#F07020]">
          <label className="text-[13px] font-semibold text-[#37352F] w-1/3 whitespace-nowrap">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName || ""}
            onChange={onFormChange}
            placeholder="Enter last name"
            className="text-[13px] text-right bg-transparent outline-none text-[#37352F] font-medium w-2/3 placeholder-[#9B9B9B]"
            required
          />
        </div>

        {/* 3. Mobile Number - Capsule Format */}
        <div className="relative w-full rounded-full bg-[#FAFAF9] border border-[#E7E3DD] px-6 py-3 flex items-center justify-between transition-all focus-within:bg-white focus-within:border-[#F07020] focus-within:ring-1 focus-within:ring-[#F07020]">
          <label className="text-[13px] font-semibold text-[#37352F] w-1/3 whitespace-nowrap">Mobile Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber || ""}
            onChange={onFormChange}
            placeholder="Enter mobile number"
            className="text-[13px] text-right bg-transparent outline-none text-[#37352F] font-medium w-2/3 placeholder-[#9B9B9B]"
          />
        </div>

        {/* 4. Gender - Capsule Format */}
        <div className="relative w-full rounded-full bg-[#FAFAF9] border border-[#E7E3DD] px-6 py-3 flex items-center justify-between transition-all focus-within:bg-white focus-within:border-[#F07020] focus-within:ring-1 focus-within:ring-[#F07020]">
          <label className="text-[13px] font-semibold text-[#37352F] w-1/3 whitespace-nowrap">Gender</label>
          <select
            name="gender"
            value={formData.gender || ""}
            onChange={onFormChange}
            className="text-[13px] text-right bg-transparent outline-none text-[#37352F] font-medium cursor-pointer appearance-none w-2/3"
          >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        {/* 5. Date of Birth - Capsule Format */}
        <div className="relative w-full rounded-full bg-[#FAFAF9] border border-[#E7E3DD] px-6 py-3 flex items-center justify-between transition-all focus-within:bg-white focus-within:border-[#F07020] focus-within:ring-1 focus-within:ring-[#F07020]">
          <label className="text-[13px] font-semibold text-[#37352F] w-1/3 whitespace-nowrap">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth || ""}
            onChange={onFormChange}
            className="text-[13px] text-right bg-transparent outline-none text-[#37352F] font-medium cursor-pointer w-2/3"
          />
        </div>

        {/* 6. Biography - Capsule Format */}
        <div className="relative w-full rounded-full bg-[#FAFAF9] border border-[#E7E3DD] px-6 py-3 flex items-center justify-between transition-all focus-within:bg-white focus-within:border-[#F07020] focus-within:ring-1 focus-within:ring-[#F07020]">
          <label className="text-[13px] font-semibold text-[#37352F] w-1/3 whitespace-nowrap">Biography</label>
          <input
            type="text"
            name="bio"
            value={formData.bio || ""}
            onChange={onFormChange}
            placeholder="Tell us about yourself"
            className="text-[13px] text-right bg-transparent outline-none text-[#37352F] font-medium w-2/3 placeholder-[#9B9B9B]"
          />
        </div>

        {/* Save Profile Button */}
        <div className="pt-3 text-left">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 rounded-full bg-[#F07020] hover:bg-[#d65f14] text-white text-[13.5px] font-semibold shadow-sm transition-all active:scale-[0.985] disabled:opacity-50"
          >
            {saving ? "Saving Changes..." : "Save Profile Details"}
          </button>
        </div>

      </form>

      {/* ────────────────────────────────────────────────────────── */}
      {/* Change Password Section - Capsule Format */}
      {/* ────────────────────────────────────────────────────────── */}
      <div className="mt-10 pt-8 border-t border-[#ECECEC]">
        <div className="flex items-center gap-2 mb-4">
          <KeyRound size={18} className="text-[#18181B]" />
          <h3 className="text-[15px] font-bold text-[#18181B] tracking-tight">Security & Change Password</h3>
        </div>

        {passwordError && (
          <div className="p-3 mb-4 bg-red-50 border border-red-200 rounded-2xl text-[12px] font-medium text-red-600 text-center">
            {passwordError}
          </div>
        )}

        {passwordSuccess && (
          <div className="p-3 mb-4 bg-green-50 border border-green-200 rounded-2xl text-[12px] font-semibold text-green-600 text-center">
            ✓ {passwordSuccess}
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          
          {/* Current Password - Capsule Format */}
          <div className="relative w-full rounded-full bg-[#FAFAF9] border border-[#E7E3DD] px-5 py-2.5 flex items-center justify-between transition-all focus-within:bg-white focus-within:border-[#18181B] focus-within:ring-1 focus-within:ring-[#18181B]">
            <div className="flex items-center gap-2 w-1/3">
              <Lock size={15} className="text-[#71717A]" />
              <label className="text-[13px] font-semibold text-[#18181B] whitespace-nowrap">Current Password</label>
            </div>
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChangeInput}
              placeholder="••••••••"
              className="text-[13px] text-right bg-transparent outline-none text-[#18181B] font-medium w-2/3 placeholder-[#9CA3AF]"
              required
            />
          </div>

          {/* New Password - Capsule Format */}
          <div className="relative w-full rounded-full bg-[#FAFAF9] border border-[#E7E3DD] px-5 py-2.5 flex items-center justify-between transition-all focus-within:bg-white focus-within:border-[#18181B] focus-within:ring-1 focus-within:ring-[#18181B]">
            <div className="flex items-center gap-2 w-1/3">
              <ShieldCheck size={15} className="text-[#71717A]" />
              <label className="text-[13px] font-semibold text-[#18181B] whitespace-nowrap">New Password</label>
            </div>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChangeInput}
              placeholder="Minimum 6 characters"
              className="text-[13px] text-right bg-transparent outline-none text-[#18181B] font-medium w-2/3 placeholder-[#9CA3AF]"
              required
            />
          </div>

          {/* Confirm New Password - Capsule Format */}
          <div className="relative w-full rounded-full bg-[#FAFAF9] border border-[#E7E3DD] px-5 py-2.5 flex items-center justify-between transition-all focus-within:bg-white focus-within:border-[#18181B] focus-within:ring-1 focus-within:ring-[#18181B]">
            <div className="flex items-center gap-2 w-1/3">
              <ShieldCheck size={15} className="text-[#71717A]" />
              <label className="text-[13px] font-semibold text-[#18181B] whitespace-nowrap">Confirm Password</label>
            </div>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChangeInput}
              placeholder="Re-enter new password"
              className="text-[13px] text-right bg-transparent outline-none text-[#18181B] font-medium w-2/3 placeholder-[#9CA3AF]"
              required
            />
          </div>

          {/* Submit Change Password Button */}
          <div className="pt-2 text-left">
            <button
              type="submit"
              disabled={passwordLoading}
              className="auth-cta px-8 rounded-full bg-[#18181B] hover:bg-black text-white text-[13.5px] font-semibold transition-transform active:scale-[0.985]"
            >
              {passwordLoading ? "Updating Password..." : "Update Password"}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};

export default AccountView;