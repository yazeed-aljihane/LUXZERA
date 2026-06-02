import React, { useState } from "react";
import AccountSidebar from "../components/account/AccountSidebar";
import ProfileHeader from "../components/account/ProfileHeader";
import AccountView from "../components/account/AccountView";
import AccountEdit from "../components/account/AccountEdit";

const AccountPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // LuxZera core user entity state 
  const [user, setUser] = useState({
    id: 1,
    email: "saketh@gmail.com",
    firstName: "Saketh",
    lastName: "Chokkapu",
    profilePicture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    role: "USER",
    status: "ACTIVE"
  });

  const [formData, setFormData] = useState({});

  const handleEditToggle = () => {
    setFormData({ firstName: user.firstName, lastName: user.lastName });
    setIsEditing(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUser((prev) => ({
      ...prev,
      firstName: formData.firstName,
      lastName: formData.lastName
    }));
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] antialiased font-sans py-12">
      <div className="max-w-5xl mx-auto px-8">
        
        {/* Apple-style minimalist breadcrumbs */}
        <div className="mb-10">
          <div className="flex items-center gap-1.5 text-xs font-normal text-slate-400 tracking-wide">
            <span>My Account</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-500">Profile</span>
          </div>
          <h1 className="text-3xl font-semibold text-slate-900 tracking-tight mt-1">Account Settings</h1>
        </div>

        {/* Master Content Framework Grid */}
        <div className="grid grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Section */}
          <div className="col-span-12 md:col-span-3">
            {/* Keeping sidebar component clean and static */}
            <AccountSidebar />
          </div>

          {/* Premium Right Dynamic Content Card Panel */}
          <div className="col-span-12 md:col-span-9">
            {/* -mt-5 pulls the main border wall up to hit the exact same vertical starting coordinates 
              as the first item in your sidebar menu, guaranteeing an Apple-like baseline.
            */}
            <div className="w-full bg-white rounded-3xl border border-slate-200/60 -mt-5 pt-8 px-10 pb-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              
              <ProfileHeader 
                user={user} 
                isEditing={isEditing} 
                onUploadClick={() => console.log("Upload logic...")} 
              />

              {isEditing ? (
                <AccountEdit 
                  formData={formData}
                  user={user}
                  onFormChange={handleFormChange}
                  onCancel={() => setIsEditing(false)}
                  onSave={handleSave}
                />
              ) : (
                <AccountView 
                  user={user} 
                  onEditToggle={handleEditToggle} 
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