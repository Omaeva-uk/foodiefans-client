import React from 'react';

const CreatorNotificationsPage: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4 text-[#028b6e]">Notifications</h2>
      <p className="text-gray-600">Stay up to date with the latest platform updates and fan interactions.</p>
      <div className="mt-4 text-center text-gray-400">No notifications at this time.</div>
    </div>
  );
};

export default CreatorNotificationsPage;
