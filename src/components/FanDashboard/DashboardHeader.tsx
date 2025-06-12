import React, { useState } from 'react';
import { Search, Home, User, Bell, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ProfileSidebar from './ProfileSidebar';

interface DashboardHeaderProps {
  userImageUrl?: string;
  notificationCount?: number;
  messageCount?: number;
  currentPage?: string;
  onNavigate: (page: string) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userImageUrl = '/fan4.jpg',
  notificationCount = 5,
  messageCount = 9,
  currentPage,
  onNavigate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="w-full relative">
      {/* Background image with rounded corners - REDUCED HEIGHT */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden rounded-b-3xl">
        <img 
          src="/fanbg3.jpg" 
          alt="Background" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/50"></div>
      </div>
      
      <header className="relative pt-3 w-full z-10">
        <div className="w-full px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/fan-dashboard">
            <div className="flex items-center cursor-pointer">
              <img src="/logo-white.png" alt="FoodieFans" className="h-8" />
              <span className="ml-2 text-2xl font-bold text-white"></span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="relative flex-grow max-w-md mx-6">
            <div className="flex items-center rounded-full">
              <input
                type="text"
                placeholder="search text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 pl-4 pr-12 rounded-full focus:outline-none text-sm text-white glass-morph placeholder:text-white"
              />
              {searchQuery && (
                <button 
                  type="button" 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-10 text-gray-400 hover:text-gray-600"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="#E4E4E4"/>
                    <path d="M15 9L9 15M9 9L15 15" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
              <button className="absolute right-3 text-white">
                <Search size={18} />
              </button>
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-2">
            <div 
              onClick={() => onNavigate('dashboard')}
              className="flex items-center justify-center w-10 h-10 glass-morph rounded-lg cursor-pointer"
            >
              <Home size={20} color='white' />
            </div>
            
            <div 
              onClick={() => onNavigate('creators')}
              className="flex items-center justify-center w-10 h-10 glass-morph rounded-lg cursor-pointer"
            >
              <User size={20} color='white' />
            </div>
            
            <div 
              onClick={() => onNavigate('messages')}
              className="flex items-center justify-center w-10 h-10 glass-morph rounded-lg cursor-pointer relative"
            >
              <MessageCircle size={20} color='white' />
              {messageCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {messageCount > 9 ? '9+' : messageCount}
                </span>
              )}
            </div>
            
            <div 
              onClick={() => onNavigate('notifications')}
              className="flex items-center justify-center w-10 h-10 glass-morph rounded-lg cursor-pointer relative"
            >
              <Bell size={20} color='white' />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </div>
            
            {/* Profile Image - Modified to open sidebar */}
            <div
              onClick={openSidebar}
              className="cursor-pointer"
            >
              <img 
                src={userImageUrl} 
                alt="Profile" 
                className="w-10 h-10 rounded-full object-cover border border-white" 
              />
            </div>
          </div>
        </div>
        
        {/* Profile Info Section with adjusted spacing */}
        <div className="w-full  mt-4 pb-4 px-6">
          <div className="flex  items-start">
            <div className='lg:grid lg:grid-cols-4 w-full gap-6'>
              {/* Left side - Profile Card with adjusted positioning */}
            <div className={`${currentPage !== "dashboard" ? 'hidden' : 'block'} relative mt-22 max-lg:hidden w-full `}>
              {/* Green outline container */}
              <div className="bg-white rounded-[25px] shadow-md overflow-hidden border-[0.5px] border-primary-light/25 p-6">
                {/* Banner image */}
                <div className="h-20 w-full bg-gray-100 rounded-t-xl overflow-hidden relative">
                  <img 
                    src="/fanbg2.jpg"
                    alt="Profile Banner" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Profile image */}
                <div className="flex justify-center relative">
                  <div className="w-20 h-20 rounded-full -mt-10 overflow-hidden border-2 border-white bg-white">
                    <img 
                      src={userImageUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* User info with minimal spacing */}
                <div className="pt-1 px-2 pb-2 text-center">
                  <h2 className="text-base font-bold text-gray-800">Aston Martin</h2>
                  <p className="text-gray-500 text-xs mb-2">helloiammartin@gmail</p>
                  
                  {/* Stats - more condensed */}
                  <div className="flex justify-around mb-2">
                    <div className="text-center">
                      <p className="text-lg font-bold">50</p>
                      <p className="text-gray-600 text-xs">Post</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold">120</p>
                      <p className="text-gray-600 text-xs">Folllowers</p>
                    </div>
                  </div>
                  
                  {/* Smaller View Profile Button */}
                  <div className="px-1">
                    <Link href="/profile">
                      <button className="w-full py-2 border border-primary-light/20 cursor-pointer text-primary-light rounded-full text-xs font-medium hover:bg-primary-light/5 transition-colors">
                        View Profile
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
              {/* Right side - Fan Info */}
              <div className="mt-20 lg:mt-20  text-white">
                <div className="text-xs font-medium tracking-wide">Fan</div>
                <h1 className="text-2xl font-bold mt-0.5">Mr. Dhamu Ravi</h1>
                
                <div className="flex mt-2 space-x-3">
                  <button className="bg-primary-light cursor-pointer hover:bg-primary text-white px-6 py-1.5 rounded-full text-sm font-medium transition-colors">
                    Follow
                  </button>
                  <button className="bg-white cursor-pointer hover:bg-gray-100 text-gray-800 px-6 py-1.5 rounded-full text-sm font-medium transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
            
            
            
          </div>
        </div>
      </header>

      {/* Profile Sidebar */}
      <ProfileSidebar 
        isOpen={sidebarOpen} 
        onClose={closeSidebar}
        user={{
          name: "Mr. Dhamu Ravi", // Using the profile name from the header content
          username: "@poova",
          avatarUrl: userImageUrl,
          balance: "£0.00",
          subscriptionCount: 0,
          verified: true
        }}
      />
    </div>
  );
};

export default DashboardHeader;