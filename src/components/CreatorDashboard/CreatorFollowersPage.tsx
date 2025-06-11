import React from 'react';

const CreatorFollowersPage: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4 text-[#028b6e]">Your Followers</h2>
      <p className="text-gray-600">Here you can see and manage all your fans and followers who are connected with your profile.</p>
      {/* You can later add follower cards or a table here */}
      <div className="mt-4 text-center text-gray-400">No followers to show yet.</div>
    </div>
  );
};

export default CreatorFollowersPage;
