import React from "react";

const AvatarStack = ({ avatars }) => {
  // A simple function to handle the error event for the avatar image
  const handleImageError = (e, fallbackUrl) => {
    e.target.src = fallbackUrl;
  };

  return (
    <div className="flex -space-x-4">
      {avatars.map((avatar, index) => (
        <img
          key={index}
          className="w-10 h-10 rounded-full border-2 border-white bg-white"
          alt={avatar.alt}
          src={avatar.src}
          onError={(e) => handleImageError(e, avatar.fallback)}
          style={{ zIndex: avatars.length - index }} // Ensure proper stacking
        />
      ))}
    </div>
  );
};

export default AvatarStack;
