import React from 'react';
import { Edit3, Camera } from 'lucide-react';

const CreatorProfileCard: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-2xl p-6 flex flex-col items-center text-center relative">
      <div className="relative mb-4">
        <img
          src="/creator-avatar.png"
          alt="Creator Avatar"
          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
        />
        <button className="absolute bottom-0 right-0 bg-[#028b6e] text-white p-1 rounded-full shadow hover:bg-[#026655]">
          <Camera size={16} />
        </button>
      </div>
      <h3 className="text-xl font-bold text-[#028b6e]">Chef Samantha</h3>
      <p className="text-gray-500 text-sm mb-4">@chefSamantha</p>
      <p className="text-gray-600 text-center mb-4">
        Sharing exclusive recipes, cooking classes, and behind-the-scenes kitchen moments with fans.
      </p>
      <button className="bg-[#028b6e] hover:bg-[#026655] text-white px-4 py-2 rounded-xl shadow flex items-center gap-2">
        <Edit3 size={16} />
        Edit Profile
      </button>
    </div>
  );
};

export default CreatorProfileCard;
