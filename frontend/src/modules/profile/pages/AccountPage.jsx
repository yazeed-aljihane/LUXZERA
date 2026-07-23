import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountSidebar from "@/modules/profile/components/account/AccountSidebar";
import AccountView from "@/modules/profile/components/account/AccountView";
import PasswordView from "@/modules/profile/components/account/PasswordView";
import AddressManagementView from "@/modules/profile/components/account/AddressManagementView";
import MeasurementsView from "@/modules/profile/components/account/MeasurementsView";
import PaymentMethodsView from "@/modules/profile/components/account/PaymentMethodsView";
import OrdersView from "@/modules/profile/components/account/OrdersView";
import CustomerCareView from "@/modules/profile/components/account/CustomerCareView";
import { getProfileDetails, updateProfile, updateUserDetails, getMeasurements } from "@/modules/profile/services/userService";
import Loader from "@/shared/components/ui/Loader";

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

  const handleSave = async (fileInput) => {
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
      }, fileInput);

      // 3. Update local state and trigger navbar re-render
      const nextUser = {
        ...user,
        firstName: formData.firstName,
        lastName: formData.lastName,
        profilePicture: updatedProfile.profilePicture || user.profilePicture
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
    <Loader className="py-16" />
  );

  if (authLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <CreativeLoader />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Account unavailable</p>
          <h1 className="mt-3 text-2xl font-semibold text-slate-950 tracking-tight">Sign in to view your profile</h1>
          <p className="mt-2 text-sm text-slate-500">Access and edit your delivery addresses, wardrobe wishlist, measurements, and profile settings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white antialiased font-sans py-6 animate-page-fade-in">
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
            <div className="w-full bg-white rounded-2xl border border-slate-200/60 pt-6 px-6 pb-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] min-h-[480px] flex flex-col relative overflow-hidden">
              <div className="flex-1 overflow-y-auto pr-1">
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

                {activeTab === "password" && (
                  <PasswordView userId={user.id} />
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

                {activeTab === "payments" && (
                  <PaymentMethodsView userId={user.id} />
                )}

                {activeTab === "orders" && (
                  <OrdersView 
                    userId={user.id} 
                    onNavigateToTab={(tab) => setActiveTab(tab)} 
                  />
                )}

                {activeTab === "support" && (
                  <CustomerCareView userId={user.id} />
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AccountPage;