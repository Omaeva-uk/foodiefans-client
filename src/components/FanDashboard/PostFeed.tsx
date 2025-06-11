import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

interface PostProps {
  id: string;
  author: {
    name: string;
    avatar: string;
    username?: string;
  };
  timeAgo: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  tags: string[];
}

const Post: React.FC<PostProps> = ({
  id,
  author,
  timeAgo,
  content,
  image,
  likes,
  comments,
  tags
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [commentText, setCommentText] = useState('');

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden mb-6">
      {/* Post header */}
      <div className="p-4 flex items-center">
        <Link href={`/profile/${author.username || id}`}>
          <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
            <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
          </div>
        </Link>
        <div>
          <Link href={`/profile/${author.username || id}`}>
            <h3 className="font-bold text-lg text-gray-800">{author.name}</h3>
          </Link>
          <p className="text-gray-500 text-sm">{timeAgo}</p>
        </div>
      </div>

      {/* Post content */}
      <div className="px-4 pb-3">
        <p className="text-gray-800 mb-3">{content}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map(tag => (
            <Link href={`/tags/${tag.replace('#', '')}`} key={tag}>
              <span className="text-blue-500 hover:underline">{tag}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Post image if available */}
      {image && (
        <div className="w-full overflow-hidden border-t border-b border-gray-100">
          <img src={image} alt="Post" className="w-full h-auto object-cover" />
        </div>
      )}

      {/* Post actions */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            className={`flex items-center mr-6 ${liked ? 'text-red-500' : 'text-gray-700'}`}
            onClick={handleLike}
          >
            <Heart size={24} fill={liked ? 'currentColor' : 'none'} className="mr-2" />
            <span className="font-semibold">{likeCount}</span>
          </button>
          <button className="flex items-center mr-6 text-gray-700">
            <MessageCircle size={24} className="mr-2" />
            <span className="font-semibold">{comments}</span>
          </button>
          <button className="flex items-center text-gray-700">
            <Share2 size={24} />
          </button>
        </div>

        {/* Comment form */}
        <div className="relative flex-grow max-w-xs ml-auto">
          <input
            type="text"
            placeholder="Amazing content"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full py-2 pl-4 pr-10 bg-gray-100 rounded-full text-sm focus:outline-none"
          />
          {commentText && (
            <button 
              onClick={() => setCommentText('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#E4E4E4"/>
                <path d="M15 9L9 15M9 9L15 15" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const PostFeed: React.FC = () => {
  // Posts data relevant to a Fan's dashboard
  const posts = [
    {
      id: '1',
      author: {
        name: 'Aston Martin',
        avatar: '/avatar1.jpg',
        username: 'astonmartin'
      },
      timeAgo: '12 minutes ago',
      content: 'Your taste, your way. With FoodieFans, you can explore recipes handpicked for your preferences and even request custom dishes! 🍳 Log in today and start your personalized food journey.',
      image: '/food2.jpg',
      likes: 600,
      comments: 40,
      tags: ['#FoodieLife', '#ExclusiveRecipes']
    },
    {
      id: '2',
      author: {
        name: 'Chef Andrea',
        avatar: '/avatar2.jpg',
        username: 'chefandrea'
      },
      timeAgo: '3 hours ago',
      content: 'Just shared my secret pasta sauce recipe with my premium subscribers! This family recipe has been passed down for generations and I\'m so excited to share it with my dedicated fans. 🍝 #PremiumContent',
      image: '/food3.jpg',
      likes: 842,
      comments: 76,
      tags: ['#ItalianCooking', '#PremiumContent', '#FamilyRecipes']
    },
    {
      id: '3',
      author: {
        name: 'Dessert King',
        avatar: '/avatar3.jpg',
        username: 'dessertking'
      },
      timeAgo: '1 day ago',
      content: 'Thanks to all my amazing fans who joined yesterday\'s live baking session! We made those chocolate soufflés together and seeing all your results was incredible. Next week we\'ll tackle French macarons!',
      image: '/food4.jpg',
      likes: 1254,
      comments: 98,
      tags: ['#LiveBaking', '#ChocolateSoufflé', '#BakingTogether']
    }
  ];

  // Filter tabs
  const filterTabs = [
    { id: 'all', label: 'All Posts', active: true },
    { id: 'text', label: 'Text', active: false },
    { id: 'video', label: 'Video', active: false },
    { id: 'photos', label: 'Photos', active: false },
    { id: 'audio', label: 'Audio', active: false },
    { id: 'scheduled', label: 'Scheduled Streaming', active: false }
  ];

  return (
    <div className="w-full">
      {/* Filter tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex overflow-x-auto hide-scrollbar">
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              className={`px-4 cursor-pointer py-3 text-base font-medium whitespace-nowrap ${
                tab.active 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Posts list */}
      <div>
        {posts.map(post => (
          <Post key={post.id} {...post} />
        ))}
      </div>

      {/* Load more button */}
      <div className="text-center mt-4 mb-8">
        <button className="px-6 py-2 text-[#4EB596] border border-[#4EB596] rounded-full hover:bg-[#4EB596]/5">
          Load more
        </button>
      </div>
    </div>
  );
};

export default PostFeed;