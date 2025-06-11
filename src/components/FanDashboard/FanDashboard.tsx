import React, { useState } from 'react';
import DashboardHeader from './DashboardHeader';
import TrendingRecipes from './TrendingRecipes';
import PostFeed from './PostFeed';
import ActivitySidebar from './ActivitySidebar';
import SuggestionsSidebar from './SuggestionsSidebar';
import CreatorsPage from './CreatorsPage';
import ChatPage from './ChatPage';
import NotificationsPage from './NotificationsPage';

export default function FanDashboard() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Function to handle navigation between different pages
  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header section with profile card */}
      <DashboardHeader
        userImageUrl="/fan4.jpg"
        notificationCount={5}
        messageCount={9}
        onNavigate={handleNavigate}
      />
      
      {/* Conditional rendering based on current page */}
      {currentPage === 'creators' ? (
        <CreatorsPage />
      ) : currentPage === 'messages' ? (
        <ChatPage />
      ) : currentPage === 'notifications' ? (
        <NotificationsPage />
      ) : (
        // Default dashboard content with the three-column layout
        <div className="px-6 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left sidebar with trending recipes */}
            <div className="col-span-1 -mt-100">
              {/* Space for the profile card */}
              <div className="h-[300px]"></div>
              
              {/* Trending Recipes */}
              <TrendingRecipes />
            </div>
            
            {/* Main content area */}
            <div className="col-span-2 -mt-[300px] -ml-24">
              <PostFeed />
            </div>
            
            {/* Right sidebar */}
            <div className="col-span-1 -mt-[280px]">
              <ActivitySidebar />
              
              <div className="mt-4">
                <SuggestionsSidebar />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}