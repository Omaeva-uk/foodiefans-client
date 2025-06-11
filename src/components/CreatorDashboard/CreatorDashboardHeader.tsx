import React, { useState } from 'react';
import { Search, Home, User, Bell, MessageCircle,  } from 'lucide-react';
import Link from 'next/link';
import CreatorProfileSidebar from './CreatorProfileSidebar';

interface CreatorDashboardHeaderProps {
  userImageUrl?: string;
  notificationCount?: number;
  messageCount?: number;
  onNavigate: (page: string) => void;
}

const CreatorDashboardHeader: React.FC<CreatorDashboardHeaderProps> = ({
  userImageUrl = '/fan4.jpg',
  notificationCount = 3,
  messageCount = 7,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="w-full relative">
      {/* Background image with gradient */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden rounded-b-3xl">
        <img
          src="/fanbg3.jpg" 
          alt="Creator Background"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50" />
      </div>

      <header className="relative pt-3 w-full z-10">
        <div className="w-full px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/creator-dashboard">
            <div className="flex items-center cursor-pointer">
              <img src="/logo-white.png" alt="FoodieFans" className="h-8" />
            </div>
          </Link>

          {/* Search Bar */}
          <div className="relative flex-grow max-w-md mx-6">
            <div className="flex items-center glass-morph rounded-full">
              <input
                type="text"
                placeholder="Search content"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 pl-4 pr-12 bg-transparent rounded-full text-sm focus:outline-none placeholder:text-white text-white "
              />
              <button className="absolute right-3 text-gray-500">
                <Search size={18} color='white' />
              </button>
            </div>
          </div>

          {/* Earnings display in header */}
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl mr-2 hidden md:block">
            <div className="flex items-center">
              {/* <DollarSign size={16} className="text-white mr-1" /> */}
              <div>
                <p className="text-white text-xs font-medium">Total Earnings</p>
                <p className="text-white font-bold">£3,250.00</p>
              </div>
            </div>
          </div>

          {/* Nav icons */}
          <div className="flex items-center space-x-2">
            <div
              onClick={() => onNavigate('dashboard')}
              className="flex items-center justify-center w-10 h-10 rounded-lg glass-morph cursor-pointer"
            >
              <Home size={20} color='white' />
            </div>
            <div
              onClick={() => onNavigate('followers')}
              className="flex items-center justify-center w-10 h-10 rounded-lg glass-morph cursor-pointer"
            >
              <User size={20} color='white' />
            </div>
            <div
              onClick={() => onNavigate('messages')}
              className="flex items-center justify-center w-10 h-10  rounded-lg glass-morph cursor-pointer relative"
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
              className="flex items-center justify-center w-10 h-10  rounded-lg glass-morph cursor-pointer relative"
            >
              <Bell size={20} color='white' />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </div>
            <div onClick={openSidebar} className="cursor-pointer">
              <img
                src={userImageUrl}
                alt="Creator Avatar"
                className="w-10 h-10 rounded-full object-cover border border-white"
              />
            </div>
          </div>
        </div>

        {/* Profile Card & Creator Info under the header */}
        <div className="w-full mt-4 pb-4 px-6">
          <div className="flex items-start">
            {/* Left - Creator Profile Card */}
            <div className="relative mt-20 w-[330px]">
              <div className="bg-white rounded-[25px] shadow-md  border-[0.5px] border-primary/20 p-6">
                <div className="h-18 w-full bg-gray-100 rounded-t-xl overflow-hidden relative">
                  <img
                     src="/fanbg2.jpg"
                    alt="Creator Banner"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-center relative">
                  <div className="w-20 h-20 rounded-full -mt-10 overflow-hidden border-2 border-white bg-white">
                    <img
                      src={userImageUrl}
                      alt="Creator"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="pt-1 px-2 pb-2 text-center">
                  <h2 className="text-base font-bold text-gray-800">Chef Gordon Ramsay</h2>
                  <p className="text-gray-500 text-xs mb-2">chef.gordon@foodiefans.com</p>
                  <div className="flex justify-around mb-2">
                    <div className="text-center">
                      <p className="text-lg font-bold">250</p>
                      <p className="text-gray-600 text-xs">Posts</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold">4.2k</p>
                      <p className="text-gray-600 text-xs">Followers</p>
                    </div>
                  </div>
                  <div className="px-1">
                    <Link href="/creator-profile">
                      <button className="w-full py-2 border cursor-pointer border-primary/20 text-primary rounded-full text-xs font-medium hover:bg-primary/5 transition-colors">
                        View Profile
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Creator Name & Actions */}
            <div className="ml-4 mt-15 text-white">
              <div className="text-xs font-medium tracking-wide">Top Creator</div>
              <h1 className="text-2xl font-bold mt-0.5">Chef Gordon Ramsay</h1>
              <div className="flex mt-2 space-x-3">
                <button className="bg-primary hover:bg-primary-hover text-white px-6 py-1.5 rounded-full text-sm font-medium transition-colors">
                  Follow
                </button>
                <button className="bg-white hover:bg-gray-100 text-gray-800 px-6 py-1.5 rounded-full text-sm font-medium transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <CreatorProfileSidebar
          isOpen={sidebarOpen}
          onClose={closeSidebar}
          user={{
            name: 'Chef Gordon Ramsay',
            username: '@gordonramsay',
            avatarUrl: userImageUrl,
            balance: '£3200.00',
            subscriptionCount: 240,
            verified: true,
          }}
        />
      </header>
    </div>
  );
};

export default CreatorDashboardHeader;