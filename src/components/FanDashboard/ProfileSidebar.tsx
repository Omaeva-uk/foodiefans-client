import React, { useState, useRef, useEffect } from 'react';
import { User, CreditCard, BookOpen, Heart, ShoppingCart, Clock, Euro, LogOut, X } from 'lucide-react';
import { useRouter } from 'next/router';

interface User {
  name: string;
  username: string;
  avatarUrl: string;
  balance: string;
  subscriptionCount: number;
  verified: boolean;
}

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ 
  isOpen, 
  onClose, 
  user 
}) => {
  const [theme, setTheme] = useState('Light');
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // Sample user data if not provided
  const defaultUser = {
    name: 'Poovazhahi Asokan',
    username: '@poova',
    avatarUrl: '/api/placeholder/100/100', // Placeholder image
    balance: '£0.00',
    subscriptionCount: 0,
    verified: true
  };
  
  const userData = user || defaultUser;
  
  // Handle click outside to close sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  const toggleTheme = () => {
    setTheme(theme === 'Light' ? 'Dark' : 'Light');
    // Implement actual theme toggle here
  };
  
  // Handle signout action
  const handleSignOut = () => {
    // Here you would typically clear authentication tokens/cookies
    // For now, we just navigate to the login page
    router.push('/login');
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 z-50 flex justify-end">
      <div 
        ref={sidebarRef}
        className="w-full max-w-sm bg-white h-full shadow-lg flex flex-col animate-slideInRight rounded-l-3xl"
        style={{animationDuration: '0.3s'}}
      >
        {/* Header with close button */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
              <img 
                src={userData.avatarUrl} 
                alt={`${userData.name}'s avatar`}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center">
                <h2 className="text-lg font-medium text-gray-900">{userData.name}</h2>
                {userData.verified && <span className="ml-1">✓</span>}
              </div>
              <p className="text-sm text-gray-500">{userData.username}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Close sidebar"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>
        
        {/* Balance section */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
          <div className="flex items-center">
            <CreditCard size={20} className="text-gray-500 mr-2" />
            <span className="text-gray-700">{userData.balance}</span>
          </div>
          <button className="text-gray-500 bg-gray-100 p-1 rounded-full">
            <span className="text-2xl font-light">+</span>
          </button>
          <div className="flex items-center">
            <Heart size={20} className="text-gray-500 mr-2" />
            <span className="text-gray-700">Subscription {userData.subscriptionCount}</span>
          </div>
        </div>
        
        {/* Menu items */}
        <nav className="flex-1 overflow-y-auto">
          <div className="py-2">
            <button className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100">
              <User size={20} className="mr-3 text-gray-500" />
              <span>Edit Profile</span>
            </button>
            <button className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100">
              <CreditCard size={20} className="mr-3 text-gray-500" />
              <span>Add Card</span>
            </button>
            <button className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100">
              <BookOpen size={20} className="mr-3 text-gray-500" />
              <span>Bookmarks</span>
            </button>
            <button className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100">
              <Heart size={20} className="mr-3 text-gray-500" />
              <span>Subscriptions</span>
            </button>
          </div>
          
          <div className="border-t border-gray-200 py-2">
            <button className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100">
              <ShoppingCart size={20} className="mr-3 text-gray-500" />
              <span>Order History</span>
            </button>
            <button className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100">
              <Clock size={20} className="mr-3 text-gray-500" />
              <span>Payment History</span>
            </button>
            <button className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100">
              <Euro size={20} className="mr-3 text-gray-500" />
              <span>Wallet Transactions</span>
            </button>
          </div>
          
          <div className="border-t border-gray-200 py-2">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center">
                <span className="w-5 h-5 mr-3" aria-hidden="true">🔆</span>
                <span>{theme}</span>
              </div>
              <button 
                onClick={toggleTheme}
                className="w-12 h-6 bg-gray-200 rounded-full relative"
              >
                <div className={`absolute top-1 ${theme === 'Light' ? 'left-1' : 'left-6'} w-4 h-4 bg-white rounded-full transition-all duration-300`}></div>
              </button>
            </div>
            <button 
              onClick={handleSignOut}
              className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors"
            >
              <LogOut size={20} className="mr-3 text-gray-500" />
              <span>Sign Out</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default ProfileSidebar;