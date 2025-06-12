import React, { useState } from 'react';
import { Bell, Heart, MessageCircle, User, Clock, Check, Star } from 'lucide-react';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'star';
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  time: string;
  isRead: boolean;
  postImage?: string;
}

const NotificationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'like',
      user: {
        name: 'ChefEmilyCooks',
        avatar: '/chef-emily.jpg'
      },
      content: 'liked your grilled chicken recipe',
      time: '5 minutes ago',
      isRead: false,
      postImage: '/food1.jpg'
    },
    {
      id: '2',
      type: 'comment',
      user: {
        name: 'BakeMasterRyan',
        avatar: '/baker-ryan.jpg'
      },
      content: 'commented on your sourdough bread post: "This looks amazing! Can you share your starter recipe?"',
      time: '30 minutes ago',
      isRead: false
    },
    {
      id: '3',
      type: 'follow',
      user: {
        name: 'VeganQueenLila',
        avatar: '/vegan-lila.jpg'
      },
      content: 'started following you',
      time: '2 hours ago',
      isRead: true
    },
    {
      id: '4',
      type: 'star',
      user: {
        name: 'SpicySam',
        avatar: '/spicy-sam.jpg'
      },
      content: 'featured your chili recipe in their collection',
      time: '1 day ago',
      isRead: true,
      postImage: '/food2.jpg'
    },
    {
      id: '5',
      type: 'mention',
      user: {
        name: 'GrillKingMark',
        avatar: '/grill-mark.jpg'
      },
      content: 'mentioned you in a comment: "@DhamuRavi what marinade do you use?"',
      time: '1 day ago',
      isRead: true
    },
    {
      id: '6',
      type: 'like',
      user: {
        name: 'SavoryChefLena',
        avatar: '/chef-lena.jpg'
      },
      content: 'and 15 others liked your pasta carbonara photo',
      time: '2 days ago',
      isRead: true,
      postImage: '/food3.jpg'
    },
    {
      id: '7',
      type: 'comment',
      user: {
        name: 'HealthyChefIvy',
        avatar: '/chef-ivy.jpg'
      },
      content: 'replied to your comment: "Yes, you can substitute honey with maple syrup!"',
      time: '3 days ago',
      isRead: true
    }
  ]);

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.isRead;
    return notification.type === activeTab;
  });

  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  // Get icon for notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart size={16} className="text-red-500" />;
      case 'comment':
        return <MessageCircle size={16} className="text-blue-500" />;
      case 'follow':
        return <User size={16} className="text-green-500" />;
      case 'mention':
        return <Bell size={16} className="text-purple-500" />;
      case 'star':
        return <Star size={16} className="text-yellow-500" />;
      default:
        return <Bell size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="w-full bg-gray-50">
      <div className="max-w-4xl mx-auto py-6 px-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Notifications</h2>
            {filteredNotifications.some(n => !n.isRead) && (
              <button 
                onClick={markAllAsRead}
                className="text-sm text-primary hover:text-primary-hover font-medium"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Tabs */}
          <div className="flex overflow-x-auto border-b border-gray-200 scrollbar-hide">
            <button 
              className={`px-4 py-3 whitespace-nowrap text-sm font-medium ${activeTab === 'all' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
              onClick={() => setActiveTab('all')}
            >
              All
            </button>
            <button 
              className={`px-4 py-3 whitespace-nowrap text-sm font-medium ${activeTab === 'unread' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
              onClick={() => setActiveTab('unread')}
            >
              Unread
            </button>
            <button 
              className={`px-4 py-3 whitespace-nowrap text-sm font-medium ${activeTab === 'like' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
              onClick={() => setActiveTab('like')}
            >
              Likes
            </button>
            <button 
              className={`px-4 py-3 whitespace-nowrap text-sm font-medium ${activeTab === 'comment' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
              onClick={() => setActiveTab('comment')}
            >
              Comments
            </button>
            <button 
              className={`px-4 py-3 whitespace-nowrap text-sm font-medium ${activeTab === 'follow' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
              onClick={() => setActiveTab('follow')}
            >
              Follows
            </button>
          </div>

          {/* Notifications List */}
          <div className="divide-y divide-gray-100 max-h-[70vh] overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="py-16 text-center">
                <Bell size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">No notifications to show</p>
              </div>
            ) : (
              filteredNotifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`p-4 hover:bg-primary-hover/5 transition-colors ${!notification.isRead ? 'bg-primary-light/10' : ''}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex">
                    <div className="mr-3 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between">
                        <div className="flex items-center mb-1 mr-2">
                          <img 
                            src={notification.user.avatar} 
                            alt={notification.user.name}
                            className="w-8 h-8 rounded-full object-cover mr-2"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const sibling = target.nextElementSibling as HTMLElement;
                              if (sibling) sibling.style.display = 'flex';
                              
                            }}
                          />
                          <div 
                            className="w-8 h-8 rounded-full bg-gray-200 items-center justify-center mr-2 hidden" 
                            style={{display: 'none'}}
                          >
                            <span className="text-gray-600 font-medium">
                              {notification.user.name.charAt(0)}
                            </span>
                          </div>
                          <p className="text-sm font-medium text-gray-900">
                            {notification.user.name}
                          </p>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock size={12} className="mr-1" />
                          {notification.time}
                          {!notification.isRead && (
                            <span className="ml-2 w-2 h-2 bg-primary rounded-full"></span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{notification.content}</p>
                      {notification.postImage && (
                        <div className="mt-2">
                          <img 
                            src={notification.postImage} 
                            alt="Post" 
                            className="rounded-lg h-16 w-auto object-cover"
                          />
                        </div>
                      )}
                      {!notification.isRead && (
                        <div className="flex mt-3">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(notification.id);
                            }}
                            className="flex items-center text-xs font-medium text-primary hover:text-primary-hover"
                          >
                            <Check size={14} className="mr-1" />
                            Mark as read
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;