import React from 'react';

const CreatorChatPage: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4 text-[#028b6e]">Messages & Chat</h2>
      <p className="text-gray-600">View and respond to messages from your followers and fans.</p>
      <div className="mt-4 text-center text-gray-400">No active conversations.</div>
    </div>
  );
};

export default CreatorChatPage;
