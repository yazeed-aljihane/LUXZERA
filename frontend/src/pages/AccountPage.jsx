import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountSidebar from "../components/account/AccountSidebar";
import AccountView from "../components/account/AccountView";
import AddressManagementView from "../components/account/AddressManagementView";
import MeasurementsView from "../components/account/MeasurementsView";
import { getProfileDetails, updateProfile, updateUserDetails, getMeasurements } from "../services/userService";

const AccountPage = ({ currentUser, authLoading, onUserChange }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(currentUser ?? null);
  const [profile, setProfile] = useState(null);
  const [initialMeasurements, setInitialMeasurements] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [formData, setFormData] = useState({});

  const loadProfileData = async () => {
    if (!currentUser?.id) return;
    setLoading(true);
    setErrorMsg("");
    try {
      const profileData = await getProfileDetails(currentUser.id);
      setProfile(profileData);
      
      // Synchronize core user object with safe fallbacks
      const synchronizedUser = {
        ...currentUser,
        id: profileData.id || currentUser.id,
        firstName: profileData.firstName || currentUser.firstName,
        lastName: profileData.lastName || currentUser.lastName,
        profilePicture: profileData.profilePicture || currentUser.profilePicture,
        role: profileData.role || currentUser.role
      };
      setUser(synchronizedUser);

      // Pre-fetch measurements on mount to prevent tab switching flicker
      try {
        const measurementsData = await getMeasurements(currentUser.id);
        setInitialMeasurements(measurementsData || {
          topSize: "",
          bottomSize: "",
          shoeSize: "",
          fitPreference: "REGULAR"
        });
      } catch (mErr) {
        console.error("Failed to prefetch measurements on mount", mErr);
        setInitialMeasurements({
          topSize: "",
          bottomSize: "",
          shoeSize: "",
          fitPreference: "REGULAR"
        });
      }
    } catch (err) {
      console.error("Failed to load profile details from backend", err);
      const errMsg = err.response?.data?.message || err.message || "";
      const isUninitialized = err.response?.status === 404 || 
                              errMsg.includes("not initialized");
      
      if (isUninitialized) {
        setProfile({
          phoneNumber: "",
          gender: "",
          dateOfBirth: "",
          bio: ""
        });
      } else {
        setErrorMsg("Unable to sync details with server. Displaying local cache.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      const isNewUser = !user || user.id !== currentUser.id;
      setUser(currentUser);
      if (!profile || isNewUser) {
        loadProfileData();
      }
    } else {
      setUser(null);
      setProfile(null);
    }
  }, [currentUser]);

  // Sync formData whenever user or profile is successfully loaded/updated
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phoneNumber: profile?.phoneNumber || "",
        gender: profile?.gender || "",
        dateOfBirth: profile?.dateOfBirth || "",
        bio: profile?.bio || ""
      });
    }
  }, [user, profile]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!user?.id) return;
    setSaving(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      // 1. Update Core User Details
      await updateUserDetails(user.id, {
        firstName: formData.firstName,
        lastName: formData.lastName
      });

      // 2. Update Extended Profile Details
      const updatedProfile = await updateProfile(user.id, {
        phoneNumber: formData.phoneNumber,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        bio: formData.bio
      });

      // 3. Update local state and trigger navbar re-render
      const nextUser = {
        ...user,
        firstName: formData.firstName,
        lastName: formData.lastName
      };
      
      setUser(nextUser);
      setProfile(updatedProfile);
      onUserChange?.(nextUser);
      setSuccessMsg("Changes saved successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Failed to update profile details. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const CreativeLoader = () => (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
      <style>{`
        .animate-draw-path {
          stroke-dasharray: 300;
          animation: path-draw 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2.5s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fadeIn 0.22s cubic-bezier(0.4, 0, 0.2, 1) forwards;
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
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      <div className="relative w-28 h-24 flex items-center justify-center animate-pulse-glow">
        <svg className="w-full h-full text-[#FF8C33]" viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path 
            className="animate-draw-path"
            d="M 46 22 C 46 15, 54 13, 54 22 C 54 28, 50 30, 50 36 L 15 60 L 85 60 Z"
          />
        </svg>
      </div>
      <div className="text-[9px] tracking-[0.45em] font-semibold text-slate-400/80 mt-5 uppercase animate-pulse pl-[0.45em]">
        LuxZera
      </div>
    </div>
  );

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <CreativeLoader />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center px-6">
        <div className="max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Account unavailable</p>
          <h1 className="mt-3 text-2xl font-semibold text-slate-950 tracking-tight">Sign in to view your profile</h1>
          <p className="mt-2 text-sm text-slate-500">Access and edit your delivery addresses, wardrobe wishlist, measurements, and profile settings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] antialiased font-sans py-6 animate-page-fade-in">
      <style>{`
        .animate-page-fade-in {
          animation: page-fade-in 0.35s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        @keyframes page-fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header Title */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-[#2D3436] tracking-tight">Account Dashboard</h1>
        </div>

        {/* Master Content Framework Grid */}
        <div className="grid grid-cols-12 gap-6 items-start">
          
          {/* Sidebar Section */}
          <div className="col-span-12 md:col-span-4">
            <AccountSidebar activeTab={activeTab} onTabChange={(tab) => { setActiveTab(tab); }} />
          </div>

          {/* Premium Right Dynamic Content Card Panel */}
          <div className="col-span-12 md:col-span-8">
            <div className="w-full bg-white rounded-2xl border border-slate-200/60 pt-5 px-6 pb-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] relative">
              
              {/* Conditional view rendering depending on active tab */}
              {activeTab === "profile" && (
                <>
                  {loading ? (
                    <CreativeLoader />
                  ) : (
                    <AccountView 
                      formData={formData}
                      user={user} 
                      profile={profile}
                      onFormChange={handleFormChange}
                      onSave={handleSave}
                      saving={saving}
                      successMsg={successMsg}
                      errorMsg={errorMsg}
                    />
                  )}
                </>
              )}

              {activeTab === "addresses" && (
                <AddressManagementView userId={user.id} />
              )}

              {activeTab === "measurements" && (
                <MeasurementsView 
                  userId={user.id} 
                  initialMeasurements={initialMeasurements}
                  onSaveSuccess={(updated) => setInitialMeasurements(updated)}
                />
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AccountPage;