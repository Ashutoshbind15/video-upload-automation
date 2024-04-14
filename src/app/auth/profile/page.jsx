import Profile from "@/components/ClientHelpers/auth/Profile";
import React from "react";

const ProfilePage = () => {
  return (
    <div className="flex items-center justify-center w-full flex-col gap-y-6 pt-20">
      <Profile />
    </div>
  );
};

export default ProfilePage;
