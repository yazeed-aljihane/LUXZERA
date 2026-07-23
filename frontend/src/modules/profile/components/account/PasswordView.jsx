import React, { useState } from "react";
import { Lock, ShieldCheck, KeyRound } from "lucide-react";
import { changePassword } from "@/modules/profile/services/userService";
import Loader from "@/shared/components/ui/Loader";

const PasswordView = ({ userId }) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setErrorMsg("Please fill in all password fields.");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMsg("New passwords do not match.");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setErrorMsg("New password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      await changePassword(userId, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      setSuccessMsg("Password updated successfully!");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err) {
      setErrorMsg(err.message || "Our servers are busy right now. Please try a few minutes later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative font-['Plus_Jakarta_Sans',sans-serif]">
      {loading && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/60 rounded-2xl">
          <Loader />
        </div>
      )}

      {/* Header Title */}
      <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-[#ECECEC]">
        <div className="w-9 h-9 rounded-full bg-[#FAFAF9] border border-[#E7E3DD] flex items-center justify-center text-[#37352F]">
          <KeyRound size={18} />
        </div>
        <div>
          <h2 className="text-[17px] font-bold text-[#37352F] tracking-tight">Password & Security</h2>
          <p className="text-[12px] text-[#9B9B9B] font-medium">Manage your password to secure your account</p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3.5 mb-6 bg-red-50/80 border border-red-200/60 rounded-full text-[12.5px] font-medium text-red-600 text-center">
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div className="p-3.5 mb-6 bg-emerald-50/80 border border-emerald-200/60 rounded-full text-[12.5px] font-semibold text-emerald-700 text-center">
          ✓ {successMsg}
        </div>
      )}

      {/* Oval / Capsule Form Fields following KISS Principles */}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        
        {/* Current Password Field */}
        <div className="relative w-full rounded-full bg-[#FAFAF9] border border-[#E7E3DD] px-6 py-3 flex items-center justify-between transition-all focus-within:bg-white focus-within:border-[#F07020] focus-within:ring-1 focus-within:ring-[#F07020]">
          <div className="flex items-center gap-2.5 w-1/3">
            <Lock size={15} className="text-[#9B9B9B]" />
            <label className="text-[13px] font-semibold text-[#37352F] whitespace-nowrap">Current Password</label>
          </div>
          <input
            type="password"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handleChange}
            placeholder="••••••••"
            className="text-[13px] text-right bg-transparent outline-none text-[#37352F] font-medium w-2/3 placeholder-[#9B9B9B]"
            required
          />
        </div>

        {/* New Password Field */}
        <div className="relative w-full rounded-full bg-[#FAFAF9] border border-[#E7E3DD] px-6 py-3 flex items-center justify-between transition-all focus-within:bg-white focus-within:border-[#F07020] focus-within:ring-1 focus-within:ring-[#F07020]">
          <div className="flex items-center gap-2.5 w-1/3">
            <ShieldCheck size={15} className="text-[#9B9B9B]" />
            <label className="text-[13px] font-semibold text-[#37352F] whitespace-nowrap">New Password</label>
          </div>
          <input
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handleChange}
            placeholder="Minimum 6 characters"
            className="text-[13px] text-right bg-transparent outline-none text-[#37352F] font-medium w-2/3 placeholder-[#9B9B9B]"
            required
          />
        </div>

        {/* Confirm New Password Field */}
        <div className="relative w-full rounded-full bg-[#FAFAF9] border border-[#E7E3DD] px-6 py-3 flex items-center justify-between transition-all focus-within:bg-white focus-within:border-[#F07020] focus-within:ring-1 focus-within:ring-[#F07020]">
          <div className="flex items-center gap-2.5 w-1/3">
            <ShieldCheck size={15} className="text-[#9B9B9B]" />
            <label className="text-[13px] font-semibold text-[#37352F] whitespace-nowrap">Confirm Password</label>
          </div>
          <input
            type="password"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter new password"
            className="text-[13px] text-right bg-transparent outline-none text-[#37352F] font-medium w-2/3 placeholder-[#9B9B9B]"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="pt-3 text-left">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 rounded-full bg-[#F07020] hover:bg-[#d65f14] text-white text-[13.5px] font-semibold shadow-sm transition-all active:scale-[0.985] disabled:opacity-50"
          >
            {loading ? "Updating Password..." : "Update Password"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default PasswordView;
