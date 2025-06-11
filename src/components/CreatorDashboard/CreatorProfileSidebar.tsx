import React, { useState, useRef, useEffect } from 'react';
import { User, CreditCard, BookOpen, Heart, ShoppingCart, Clock, Euro, LogOut, X } from 'lucide-react';
import { useRouter } from 'next/router';

interface CreatorUser {
  name: string;
  username: string;
  avatarUrl: string;
  balance: string;
  subscriptionCount: number;
  verified: boolean;
}

interface CreatorProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user?: CreatorUser;
}

const CreatorProfileSidebar: React.FC<CreatorProfileSidebarProps> = ({ 
  isOpen, 
  onClose, 
  user 
}) => {
  const [theme, setTheme] = useState('Light');
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const defaultUser = {
    name: 'Chef Ramsay',
    username: '@chefmaster',
    avatarUrl: '/creator-avatar.jpg',
    balance: '£1200.00',
    subscriptionCount: 120,
    verified: true
  };

  const userData = user || defaultUser;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isOpen) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const toggleTheme = () => {
    setTheme(theme === 'Light' ? 'Dark' : 'Light');
  };

  const handleSignOut = () => {
    router.push('/login');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 z-50 flex justify-end">
      <div
        ref={sidebarRef}
        className="w-full max-w-sm bg-white h-full shadow-lg flex flex-col animate-slideInRight rounded-l-3xl"
        style={{ animationDuration: '0.3s' }}
      >
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
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
          <div className="flex items-center">
            <CreditCard size={20} className="text-gray-500 mr-2" />
            <span className="text-gray-700">{userData.balance}</span>
          </div>
          <div className="flex items-center">
            <Heart size={20} className="text-gray-500 mr-2" />
            <span className="text-gray-700">Subscribers {userData.subscriptionCount}</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <div className="py-2">
            <button className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100">
              <User size={20} className="mr-3 text-gray-500" />
              <span>Edit Profile</span>
            </button>
            <button className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100">
              <BookOpen size={20} className="mr-3 text-gray-500" />
              <span>My Posts</span>
            </button>
            <button className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100">
              <Euro size={20} className="mr-3 text-gray-500" />
              <span>Earnings</span>
            </button>
          </div>

          <div className="border-t border-gray-200 py-2">
            <button className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100">
              <ShoppingCart size={20} className="mr-3 text-gray-500" />
              <span>Shop Orders</span>
            </button>
            <button className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100">
              <Clock size={20} className="mr-3 text-gray-500" />
              <span>Activity Logs</span>
            </button>
          </div>

          <div className="border-t border-gray-200 py-2">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center">
                <span className="w-5 h-5 mr-3">🔆</span>
                <span>{theme}</span>
              </div>
              <button onClick={toggleTheme} className="w-12 h-6 bg-gray-200 rounded-full relative">
                <div
                  className={`absolute top-1 ${
                    theme === 'Light' ? 'left-1' : 'left-6'
                  } w-4 h-4 bg-white rounded-full transition-all duration-300`}
                ></div>
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

export default CreatorProfileSidebar;
