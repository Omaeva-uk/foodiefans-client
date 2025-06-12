import React, { useState } from 'react';
import CreatorDashboardHeader from './CreatorDashboardHeader';
import CreatorTrendingRecipes from './CreatorTrendingRecipes';
import CreatorPostFeed from './CreatorPostFeed';
import CreatorActivitySidebar from './CreatorActivitySidebar';
import CreatorSuggestionsSidebar from './CreatorSuggestionsSidebar';
import CreatorFollowersPage from './CreatorFollowersPage';
import CreatorChatPage from './CreatorChatPage';
import CreatorNotificationsPage from './CreatorNotificationsPage';

export default function CreatorDashboard() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Creator Header */}
      <CreatorDashboardHeader
        userImageUrl="/fan4.jpg"
        notificationCount={3}
        messageCount={7}
        onNavigate={handleNavigate}
      />

      {/* Conditional rendering for other pages */}
      {currentPage === 'creators' ? (
        <CreatorFollowersPage />
      ) : currentPage === 'messages' ? (
        <CreatorChatPage />
      ) : currentPage === 'notifications' ? (
        <CreatorNotificationsPage />
      ) : (
        // Default creator dashboard layout below the header
        <div className="px-6 pt-0"> {/* No negative margin here */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 ">
            {/* Left sidebar */}
            <div className="col-span-1 max-md:mt-12">
              <CreatorTrendingRecipes />
            </div>

            {/* Main post feed - with negative margin applied only to this column */}
            <div className="col-span-2 lg:-mt-52 ">
              <CreatorPostFeed />
            </div>

            {/* Right sidebar */}
            <div className="col-span-1 lg:-mt-52">
              <CreatorActivitySidebar />
              <div className="mt-4">
                <CreatorSuggestionsSidebar />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}