import React, { useState, useRef } from "react";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  MoreHorizontal, 
  ChefHat, 
  Clock, 
  Award, 
  Upload, 
  Film, 
  Image as ImageIcon, 
  Plus
} from "lucide-react";

// Sample data with additional creator details and post features
const posts = [
  {
    id: "post1",
    image: "/chicken.jpg",
    title: "Spicy Tandoori Chicken",
    description: "A vibrant Indian dish packed with spices and flavors! Perfect for weekend dinner parties.",
    category: "Main Course",
    cookingTime: "45 min",
    difficulty: "Medium",
    likes: 120,
    comments: 35,
    shares: 18,
    saved: 42,
    postedOn: "22 Mar 2025",
    creator: {
      name: "Priya Sharma",
      avatar: "/avatar1.jpg",
      verified: true,
      followers: "12.5K"
    },
    featured: true,
    premium: false,
    ingredients: ["Chicken", "Yogurt", "Spices", "Lemon", "Garlic"],
    isVideo: false
  },
  {
    id: "post2",
    image: "/lavacake.jpg",
    title: "Chocolate Lava Cake",
    description: "Gooey, rich dessert that's perfect for any occasion. Surprise your guests with this delightful treat!",
    category: "Dessert",
    cookingTime: "30 min",
    difficulty: "Easy",
    likes: 200,
    comments: 48,
    shares: 25,
    saved: 96,
    postedOn: "20 Mar 2025",
    creator: {
      name: "James Wilson",
      avatar: "/avatar2.jpg",
      verified: true,
      followers: "28.7K"
    },
    featured: false,
    premium: true,
    ingredients: ["Chocolate", "Butter", "Eggs", "Sugar", "Flour"],
    isVideo: false
  },
  {
    id: "post3",
    image: "/sushi.jpg",
    title: "Sushi Platter",
    description: "Fresh and colorful sushi rolls prepared with love. Impress your friends with these restaurant-quality rolls!",
    category: "Japanese",
    cookingTime: "60 min",
    difficulty: "Hard",
    likes: 150,
    comments: 27,
    shares: 12,
    saved: 38,
    postedOn: "18 Mar 2025",
    creator: {
      name: "Yuki Tanaka",
      avatar: "/avatar3.jpg",
      verified: false,
      followers: "5.2K"
    },
    featured: false,
    premium: false,
    ingredients: ["Rice", "Nori", "Fish", "Avocado", "Cucumber"],
    isVideo: true,
    videoUrl: "/sushi.mp4"
  },
];

const CreatorPostFeed: React.FC = () => {
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [localPosts, setLocalPosts] = useState(posts);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [mediaType, setMediaType] = useState('image'); // 'image' or 'video'
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    category: '',
    cookingTime: '',
    difficulty: 'Medium',
    ingredients: '',
    mediaFile: null as File | null,
    mediaPreview: ''
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLike = (postId: string) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
  };

  const handleSave = (postId: string) => {
    if (savedPosts.includes(postId)) {
      setSavedPosts(savedPosts.filter(id => id !== postId));
    } else {
      setSavedPosts([...savedPosts, postId]);
    }
  };
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const isVideo = file.type.startsWith('video/');
    setMediaType(isVideo ? 'video' : 'image');
    
    setNewPost({
      ...newPost,
      mediaFile: file,
      mediaPreview: URL.createObjectURL(file)
    });
    
    // Simulate upload process (replace with actual upload logic)
    simulateUpload();
  };

  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 300);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a new post object
    const ingredientsArray = newPost.ingredients
      .split('\n')
      .map(item => item.trim())
      .filter(item => item !== '');
      
    const today = new Date();
    const formattedDate = `${today.getDate()} Mar 2025`;
    
    const createdPost = {
      id: `post${Date.now()}`,
      image: newPost.mediaPreview,
      title: newPost.title,
      description: newPost.description,
      category: newPost.category,
      cookingTime: newPost.cookingTime,
      difficulty: newPost.difficulty,
      likes: 0,
      comments: 0,
      shares: 0,
      saved: 0,
      postedOn: formattedDate,
      creator: {
        name: "You (Creator)",
        avatar: "/avatars/your-avatar.jpg",
        verified: true,
        followers: "1.2K"
      },
      featured: false,
      premium: false,
      ingredients: ingredientsArray,
      isVideo: mediaType === 'video',
      videoUrl: mediaType === 'video' ? newPost.mediaPreview : undefined
    };
    
    // Add to posts
    setLocalPosts([createdPost, ...localPosts]);
    
    // Reset form
    setNewPost({
      title: '',
      description: '',
      category: '',
      cookingTime: '',
      difficulty: 'Medium',
      ingredients: '',
      mediaFile: null,
      mediaPreview: ''
    });
    
    setUploadProgress(0);
    setShowUploadForm(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const isVideo = file.type.startsWith('video/');
      setMediaType(isVideo ? 'video' : 'image');
      
      setNewPost({
        ...newPost,
        mediaFile: file,
        mediaPreview: URL.createObjectURL(file)
      });
      
      simulateUpload();
    }
  };

  return (
    <div className="space-y-4"> {/* Changed from space-y-8 to space-y-4 */}
      {/* Create New Post Button */}
      <div className="mb-4"> {/* Changed from mb-8 to mb-4 */}
        <button 
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="w-full bg-[#028b6e] text-white p-3 rounded-2xl shadow flex items-center justify-center gap-2 hover:bg-[#026655] transition-colors"
          /* Changed p-4 to p-3 to make button slightly smaller */
        >
          <Plus size={20} />
          <span>Create New Recipe Post</span>
        </button>
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-4"> {/* Changed from mb-8 to mb-4 */}
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-lg font-bold text-[#028b6e]">Create New Recipe</h3>
          </div>
          
          <form onSubmit={handleSubmit} className="p-4">
            {/* Media Upload Area */}
            <div 
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 mb-6 text-center cursor-pointer hover:border-[#028b6e] transition-colors"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {newPost.mediaPreview ? (
                <div className="mb-4">
                  {mediaType === 'video' ? (
                    <video 
                      src={newPost.mediaPreview} 
                      className="max-h-80 mx-auto rounded-lg" 
                      controls 
                    />
                  ) : (
                    <img 
                      src={newPost.mediaPreview} 
                      className="max-h-80 mx-auto rounded-lg object-contain" 
                      alt="Preview" 
                    />
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="p-4 bg-[#F0F9F6] rounded-full mb-4">
                    <Upload size={32} className="text-[#028b6e]" />
                  </div>
                  <p className="text-gray-600 mb-2">Drag and drop or click to upload</p>
                  <p className="text-gray-400 text-sm mb-4">Supports images and videos up to 500MB</p>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      <ImageIcon size={16} />
                      <span>Images</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      <Film size={16} />
                      <span>Videos</span>
                    </div>
                  </div>
                </div>
              )}
              
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-4">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#028b6e]" 
                      style={{ width: `${uploadProgress}%` }} 
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Uploading: {uploadProgress}%</p>
                </div>
              )}
              
              <input 
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*,video/*"
                className="hidden"
              />
            </div>
            
            {/* Recipe Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recipe Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={newPost.title}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
                  placeholder="e.g. Homemade Margherita Pizza"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={newPost.category}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Main Course">Main Course</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Appetizer">Appetizer</option>
                  <option value="Drinks">Drinks</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Italian">Italian</option>
                  <option value="Indian">Indian</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cooking Time
                </label>
                <input
                  type="text"
                  name="cookingTime"
                  value={newPost.cookingTime}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
                  placeholder="e.g. 30 min"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty
                </label>
                <select
                  name="difficulty"
                  value={newPost.difficulty}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
                  required
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={newPost.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
                placeholder="Describe your recipe..."
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ingredients (one per line)
              </label>
              <textarea
                name="ingredients"
                value={newPost.ingredients}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#028b6e]/50 focus:border-[#028b6e] focus:outline-none"
                placeholder="List your ingredients, one per line"
                required
              />
            </div>
            
            {/* Submit buttons */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowUploadForm(false)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-[#028b6e] text-white rounded-xl shadow hover:bg-[#026655] transition-colors"
              >
                Publish Recipe
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Posts Feed */}
      {localPosts.map((post, index) => (
        <div
          key={post.id}
          className={`bg-white rounded-2xl shadow-md overflow-hidden border-[0.5px] border-[#4EB596] transition-all hover:shadow-lg ${index === 0 ? "mt-0" : ""}`}          /* Added conditional class to ensure first post has no top margin */
        >
          {/* Creator header */}
          <div className="p-4 flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center gap-3">
              <img 
                src={post.creator.avatar} 
                alt={post.creator.name} 
                className="w-10 h-10 rounded-full object-cover border border-gray-200" 
              />
              <div>
                <div className="flex items-center gap-1">
                  <h4 className="font-semibold text-gray-800">{post.creator.name}</h4>
                  {post.creator.verified && (
                    <span className="text-[#028b6e]">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">{post.creator.followers} followers</p>
              </div>
            </div>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <MoreHorizontal size={18} className="text-gray-400" />
            </button>
          </div>
          
          {/* Post media - video or image */}
          <div className="relative">
            {post.isVideo ? (
              <video 
                src={post.videoUrl} 
                className="w-full h-64 md:h-80 object-cover" 
                controls
                poster={post.image}
              />
            ) : (
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-64 md:h-80 object-cover" 
              />
            )}
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {post.featured && (
                <span className="bg-[#028b6e] text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <Award size={12} />
                  Featured
                </span>
              )}
              {post.premium && (
                <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <ChefHat size={12} />
                  Premium
                </span>
              )}
              {post.isVideo && (
                <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <Film size={12} />
                  Video
                </span>
              )}
            </div>
            
            {/* Recipe info badges */}
            <div className="absolute bottom-3 left-3 flex gap-2">
              <span className="bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <Clock size={12} />
                {post.cookingTime}
              </span>
              <span className="bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                {post.difficulty}
              </span>
            </div>
          </div>
          
          {/* Post content */}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#E5F5F0] text-[#028b6e] text-xs px-2 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-xs text-gray-400">{post.postedOn}</span>
            </div>
            
            <h3 className="text-xl font-bold mb-2 text-[#028b6e]">{post.title}</h3>
            <p className="text-gray-600 mb-4 text-sm">{post.description}</p>
            
            {/* Ingredients preview */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Ingredients:</h4>
              <div className="flex flex-wrap gap-2">
                {post.ingredients.map((ingredient, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
              <div className="flex gap-4">
                <button 
                  className={`flex items-center gap-1 text-sm ${likedPosts.includes(post.id) ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
                  onClick={() => handleLike(post.id)}
                >
                  <Heart size={18} fill={likedPosts.includes(post.id) ? "currentColor" : "none"} />
                  <span>{likedPosts.includes(post.id) ? post.likes + 1 : post.likes}</span>
                </button>
                <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-500">
                  <MessageCircle size={18} />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-green-500">
                  <Share2 size={18} />
                  <span>{post.shares}</span>
                </button>
              </div>
              <button 
                className={`flex items-center gap-1 text-sm ${savedPosts.includes(post.id) ? 'text-amber-500' : 'text-gray-500'} hover:text-amber-500`}
                onClick={() => handleSave(post.id)}
              >
                <Bookmark size={18} fill={savedPosts.includes(post.id) ? "currentColor" : "none"} />
                <span>{savedPosts.includes(post.id) ? post.saved + 1 : post.saved}</span>
              </button>
            </div>
          </div>
          
          {/* View full recipe button */}
          <div className="px-4 pb-4">
            <button className="w-full bg-[#F0F9F6] hover:bg-[#E5F5F0] text-[#028b6e] font-medium py-2 rounded-xl transition-colors">
              View Full Recipe
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CreatorPostFeed;