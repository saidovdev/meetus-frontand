import React from "react";
import ProfileHeader from "../../components/profile-components/ProfileHeader";
import EditProfileButtons from "../../components/profile-components/EditProfileButtons";

export default function ProfileMain() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <ProfileHeader />
      <div className="mt-10 sm:mt-12 px-6 sm:px-12 flex flex-wrap gap-4 justify-start">
        <EditProfileButtons />
      </div>

      <div className="px-4 sm:px-8 mt-6">
      </div>
    </div>
  );
}
