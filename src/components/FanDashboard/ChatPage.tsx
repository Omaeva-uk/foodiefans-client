import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, MoreHorizontal } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isCurrentUser: boolean;
}

interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  lastMessage?: string;
  isActive?: boolean;
}

const ChatPage: React.FC = () => {
  const [currentChat, setCurrentChat] = useState('SweetToothSara');
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('All Conversation');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Sample chat users
  const chatUsers: ChatUser[] = [
    { 
      id: '1', 
      name: 'ChefEmilyCooks', 
      avatar: '/creator1.jpg', 
      lastMessage: 'Try this secret spice!',
      isActive: false
    },
    { 
      id: '2', 
      name: 'BakeMasterRyan', 
      avatar: '/creator2.jpg', 
      lastMessage: 'Got a great recipe!',
      isActive: false
    },
    { 
      id: '3', 
      name: 'VeganQueenLila', 
      avatar: '/creator3.jpg',
      lastMessage: 'Plant-based and delicious!',
      isActive: false
    },
    { 
      id: '4', 
      name: 'FlavorHunterTom', 
      avatar: '/creator4.jpg', 
      lastMessage: 'What\'s your favorite herb?',
      isActive: false
    },
    { 
      id: '5', 
      name: 'SweetToothSara', 
      avatar: '/creator1.jpg', 
      lastMessage: 'Desserts to die for!',
      isActive: true
    },
    { 
      id: '6', 
      name: 'ChefAntonio', 
      avatar: '/creator2.jpg', 
      lastMessage: 'Fresh pasta tips here!',
      isActive: false
    },
    { 
      id: '7', 
      name: 'SpicySam', 
      avatar: '/creator2.jpg', 
      lastMessage: 'Let\'s talk about chilies.',
      isActive: false
    },
    { 
      id: '8', 
      name: 'GrillKingMark', 
      avatar:'/creator3.jpg',
      lastMessage: 'BBQ season is on!',
      isActive: false
    },
    { 
      id: '9', 
      name: 'SavoryChefLena', 
      avatar: '/creator1.jpg', 
      lastMessage: 'Check out my stew!',
      isActive: false
    },
    { 
      id: '10', 
      name: 'HealthyChefIvy', 
      avatar: '/creator5.jpg', 
      lastMessage: 'Nutritious and tasty meals.',
      isActive: false
    }
  ];

  // Sample messages for the current chat
  const chatMessages: Message[] = [
    {
      id: '1',
      senderId: 'SweetToothSara',
      text: 'Hey there, FoodieFan! Excited to share something special with you today. 😊',
      timestamp: '2:33 pm',
      isCurrentUser: false
    },
    {
      id: '2',
      senderId: 'currentUser',
      text: 'Hi Chef Emily! What\'s cooking?',
      timestamp: '2:40 pm',
      isCurrentUser: true
    },
    {
      id: '3',
      senderId: 'SweetToothSara',
      text: 'A secret spice blend for grilled chicken! I call it "Emily\'s Magic Mix." ✨',
      timestamp: '3:00 pm',
      isCurrentUser: false
    },
    {
      id: '4',
      senderId: 'currentUser',
      text: 'Sounds amazing! What\'s in it?',
      timestamp: '3:20 pm',
      isCurrentUser: true
    },
    {
      id: '5',
      senderId: 'SweetToothSara',
      text: 'Can\'t reveal it all! But it\'s a mix of smoked paprika, cumin, and a touch of cinnamon. You\'ll love it.',
      timestamp: '3:25 pm',
      isCurrentUser: false
    }
  ];

  // User profile for the current chat
  const currentChatUser = {
    name: 'SweetToothSara',
    email: 'sarahlisaac@gmail.com',
    following: 0,
    posts: 14,
    bio: 'Hi, I\'m Emily! I\'m a home chef who loves creating flavorful recipes and unique spice blends. I\'m here to share quick, delicious meal ideas with you. Let\'s cook something amazing! 😊',
    gallery: [
      '/food1.jpg',
      '/food2.jpg',
      '/food3.jpg',
      '/food4.jpg'
    ]
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === '') return;
    
    // In a real app, you would send this message to your backend
    console.log('Sending message:', message);
    
    // Clear the input
    setMessage('');
  };

  const handleChangeChat = (userName: string) => {
    setCurrentChat(userName);
  };

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
          {/* Left sidebar - Chat list */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden ">
            {/* Tabs */}
            <div className="flex">
              <button 
                className={`flex-1 py-3 text-sm font-medium ${activeTab === 'All Conversation' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
                onClick={() => setActiveTab('All Conversation')}
              >
                <div className="flex items-center justify-center">
                  <span className="w-5 h-5 mr-2 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  All Conversation
                </div>
              </button>
              <button 
                className={`flex-1 py-3 text-sm font-medium ${activeTab === 'Archived' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
                onClick={() => setActiveTab('Archived')}
              >
                <div className="flex items-center justify-center">
                  <span className="w-5 h-5 mr-2 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 8H19M5 8C3.89543 8 3 7.10457 3 6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6C21 7.10457 20.1046 8 19 8M5 8L5 18C5 19.1046 5.89543 20 7 20H17C18.1046 20 19 19.1046 19 18V8M10 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  Archived
                </div>
              </button>
            </div>
            
            {/* Chat list */}
            <div className="overflow-y-auto ">
              {chatUsers.map(user => (
                <div 
                  key={user.id}
                  className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 rounded-xl bg-primary-light/10 transition-colors ${user.name === currentChat ? 'border-r-4 border-primary bg-white' : ''}`}
                  onClick={() => handleChangeChat(user.name)}
                >
                  <div className="relative mr-3">
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) => {
                        // Fallback to initials if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    {/* Fallback initials */}
                    <div className="absolute inset-0 rounded-full bg-gray-200 flex items-center justify-center" style={{display: 'none'}}>
                      <span className="text-gray-600 font-medium">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.lastMessage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Middle - Chat messages */}
          <div className="lg:col-span-3 flex flex-col bg-white rounded-xl shadow-sm overflow-hidden border-[0.5px] border-gray-200">
            {/* Chat header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center">
                <img 
                  src="/creator1.jpg" 
                  alt="SweetToothSara" 
                  className="w-10 h-10 rounded-full object-cover mr-3"
                  onError={(e) => {
                    // Fallback to initials if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <div className="relative rounded-full bg-gray-200 w-10 h-10 flex items-center justify-center mr-3" style={{display: 'none'}}>
                  <span className="text-gray-600 font-medium">S</span>
                </div>
                <h2 className="text-lg font-medium text-gray-800">{currentChat}</h2>
              </div>
              <button className="text-gray-500 hover:text-gray-700">
                <MoreHorizontal size={20} />
              </button>
            </div>
            
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(100vh-15rem)]  border-gray-200">
              {chatMessages.map(msg => (
                <div key={msg.id} className={`flex ${msg.isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                  {!msg.isCurrentUser && (
                    <img 
                      src="/creator1.jpg" 
                      alt={msg.senderId} 
                      className="w-8 h-8 rounded-full object-cover mr-2 self-end mb-1"
                    />
                  )}
                  <div className="max-w-[70%]">
                    {!msg.isCurrentUser && (
                      <p className="text-xs text-gray-500 mb-1">{msg.senderId}</p>
                    )}
                    <div 
                      className={`rounded-xl p-3 break-words ${
                        msg.isCurrentUser 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {msg.timestamp} {msg.isCurrentUser && 'You'}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Message input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                <button type="button" className="text-gray-500 mr-2">
                  <Paperclip size={20} />
                </button>
                <input
                  type="text"
                  placeholder="Yum! How do I use it?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none"
                />
                <button 
                  type="submit" 
                  className="ml-2 bg-primary text-white rounded-full p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!message.trim()}
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </div>
          
          {/* Right sidebar - User profile */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border-[0.5px] border-gray-200">
            <div className="h-full flex flex-col items-center py-8 px-4">
              <img 
                src="/creator1.jpg" 
                alt="SweetToothSara Profile"
                className="w-24 h-24 rounded-full object-cover mb-3"
              />
              <h2 className="text-xl font-bold text-gray-800 mb-1">{currentChatUser.name}</h2>
              <p className="text-sm text-gray-500 mb-4">{currentChatUser.email}</p>
              
              <div className="flex gap-6 mb-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500">Following</p>
                  <p className="text-lg font-bold">{currentChatUser.following}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500">Posts</p>
                  <p className="text-lg font-bold">{currentChatUser.posts}</p>
                </div>
              </div>
              
              <p className="text-sm text-gray-700 text-center mb-6">{currentChatUser.bio}</p>
              
              {/* Tabs for profile content */}
              <div className="w-full mb-4">
                <div className="flex border-b border-gray-200 w-full">
                  <button 
                    className="flex-1 pb-2 text-sm font-medium text-primary border-b-2 border-primary"
                  >
                    Attachments
                  </button>
                  <button 
                    className="flex-1 pb-2 text-sm font-medium text-gray-500"
                  >
                    Feed
                  </button>
                </div>
              </div>
              
              {/* Photo gallery */}
              <div className="grid grid-cols-2 gap-2 w-full">
                {currentChatUser.gallery.map((img, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden">
                    <img 
                      src={img} 
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              
              <button className="mt-6 w-full py-2 border border-primary/20 text-primary rounded-full text-sm font-medium hover:bg-primary/5 transition-colors">
                View Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;