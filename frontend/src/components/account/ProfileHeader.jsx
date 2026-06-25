import React from 'react';

const ProfileHeader = ({ user, isEditing, onUploadClick }) => {
  const profileImage = user?.profilePicture || user?.avatarUrl || null;

  return (
    <div className="flex items-center justify-between pb-8 border-b border-slate-100 mb-8">
      <div className="flex items-center gap-5">
        <div className="relative group">
          {profileImage ? (
            <img
              src={profileImage}
              alt="profile"
              className="w-20 h-20 rounded-full object-cover shadow-sm bg-slate-50"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xl font-semibold shadow-sm">
              {user?.firstName?.[0] || "S"}
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-2xl font-semibold text-slate-950 tracking-tight">
              {user?.firstName} {user?.lastName}
            </h2>
            <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-100/60">
              {user?.status}
            </span>
          </div>
          <p className="text-xs font-medium text-slate-400 mt-1 capitalize tracking-wide">
            System Account Access: {user?.role?.toLowerCase()}
          </p>
        </div>
      </div>

      {isEditing && (
        <button 
          onClick={onUploadClick}
          type="button"
          className="text-xs font-medium text-blue-600 hover:text-blue-700 transition"
        >
          Change Photo
        </button>
      )}
    </div>
  );
};

export default ProfileHeader;