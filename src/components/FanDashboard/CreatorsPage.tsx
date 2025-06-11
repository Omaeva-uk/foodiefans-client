import React, { useState } from 'react';
import Link from 'next/link';
import { Search, User, Star } from 'lucide-react';

interface Creator {
  id: string;
  name: string;
  imageUrl: string;
  country: string;
}

interface Category {
  id: string;
  name: string;
  backgroundColor: string;
  textColor: string;
}

const CreatorsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Category');
  const [statusFilter, setStatusFilter] = useState('Live');
  const [creatorsFilter, setCreatorsFilter] = useState('All creators');
  
  // Mock data for creators - using your existing image paths
  const creators: Creator[] = [
    { id: '1', name: 'Simon Park', imageUrl: '/creator1.jpg', country: '🇺🇸' },
    { id: '2', name: 'Andrea Tylor', imageUrl: '/creator2.jpg', country: '🇺🇸' },
    { id: '3', name: 'Jackie Chan', imageUrl: '/creator3.jpg', country: '🇺🇸' },
    { id: '4', name: 'John Snow', imageUrl: '/creator4.jpg', country: '🇺🇸' },
    { id: '5', name: 'Samwell Posh', imageUrl: '/creator5.jpg', country: '🇺🇸' },
    { id: '6', name: 'Dhaamu Master', imageUrl: '/creator1.jpg', country: '🇺🇸' },
    { id: '7', name: 'Sandra Hewitts', imageUrl: '/creator2.jpg', country: '🇺🇸' },
    { id: '8', name: 'Kevin Marshell', imageUrl: '/creator3.jpg', country: '🇺🇸' },
    { id: '9', name: 'Olivia Powa', imageUrl: '/creator4.jpg', country: '🇺🇸' },
  ];
  
  // Featured creators with star icons
  const featuredCreators = [
    { id: '1', name: 'Gordon Ramsay', imageUrl: '/creator1.jpg' },
    { id: '2', name: 'Jamie Oliver', imageUrl: '/creator2.jpg' },
  ];
  
  // Category cards
  const categories: Category[] = [
    { id: '1', name: 'Drinks and Smoothies', backgroundColor: 'bg-purple-600', textColor: 'text-white' },
    { id: '2', name: 'Homemade Pantry Staples', backgroundColor: 'bg-pink-500', textColor: 'text-white' },
  ];

  // Function to handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Function to clear search
  const clearSearch = () => {
    setSearchQuery('');
  };

  // Filter creators based on search query
  const filteredCreators = creators.filter(creator => 
    creator.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full bg-gray-50 min-h-screen pb-16">
      {/* Search section */}
      <div className="w-full p-4 bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main search bar */}
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 mb-6">
            <input
              type="text"
              placeholder="search text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="flex-grow bg-transparent border-none outline-none"
            />
            {searchQuery && (
              <button 
                onClick={clearSearch}
                className="text-gray-400 hover:text-gray-600 mr-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="#E4E4E4"/>
                  <path d="M15 9L9 15M9 9L15 15" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
            <Search className="text-gray-400" size={20} />
          </div>

          {/* Filter options */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-2 flex-grow">
              {/* Example filter with clear button */}
              <div className="relative inline-block">
                <div className="flex items-center bg-white border rounded-full px-3 py-2">
                  <User size={16} className="text-gray-500 mr-2" />
                  <span className="text-sm">example</span>
                  <button className="ml-2 text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" fill="#E4E4E4"/>
                      <path d="M15 9L9 15M9 9L15 15" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Dropdown filters */}
              <select 
                value={creatorsFilter}
                onChange={(e) => setCreatorsFilter(e.target.value)}
                className="bg-white border rounded-full px-3 py-2 text-sm appearance-none pr-8 cursor-pointer"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center" }}
              >
                <option>All creators</option>
                <option>My creators</option>
                <option>Following</option>
              </select>

              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-white border rounded-full px-3 py-2 text-sm appearance-none pr-8 cursor-pointer"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center" }}
              >
                <option>All Category</option>
                <option>Food</option>
                <option>Fitness</option>
                <option>Travel</option>
                <option>Lifestyle</option>
              </select>

              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-white border rounded-full px-3 py-2 text-sm appearance-none pr-8 cursor-pointer"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center" }}
              >
                <option>Live</option>
                <option>Offline</option>
                <option>All</option>
              </select>

              <div className="bg-white border rounded-full px-3 py-2 text-sm cursor-pointer flex items-center">
                More filters
                <svg className="ml-1" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            <button className="bg-[#4EB596] hover:bg-[#3a9b7e] text-white px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center">
              <Search size={16} className="mr-1" />
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Main content with left sidebar and creators grid */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-1">
            {/* Top creators section */}
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-4">Top creators curated for you</h2>
              <div className="space-y-4">
                {/* Featured creator cards */}
                {featuredCreators.map((creator, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex">
                      <div className="w-16 h-16 rounded-lg overflow-hidden relative">
                        <img 
                          src={creator.imageUrl} 
                          alt={creator.name} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                          <Star className="text-yellow-400 fill-yellow-400" size={20} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending recipe creators */}
            <div className="mb-6">
              <h2 className="text-base font-medium mb-3">Trending recipe creators</h2>
            </div>

            {/* Category cards */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {categories.map(category => (
                <div 
                  key={category.id}
                  className={`${category.backgroundColor} p-4 rounded-xl flex items-center justify-center aspect-square cursor-pointer`}
                >
                  <p className={`${category.textColor} text-center font-medium text-sm`}>
                    {category.name}
                  </p>
                </div>
              ))}
            </div>

            {/* Join the contest */}
            <div className="mb-6">
              <h2 className="text-base font-medium mb-3">Join the contest and win</h2>
            </div>

            {/* FoodieFans promo */}
            <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
              <div className="aspect-w-4 aspect-h-3 mb-3">
                <img 
                  src="/creator5.jpg" 
                  alt="FoodieFans Promo" 
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
              <p className="text-sm font-medium">Your taste, your way. With FoodieFans, you can explore recipes handpicked for your preferences.</p>
            </div>
          </div>

          {/* Creators Grid - 3 columns */}
          <div className="col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCreators.map(creator => (
                <div key={creator.id} className="relative overflow-hidden rounded-3xl shadow-md group">
                  {/* Creator image */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={creator.imageUrl} 
                      alt={creator.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Creator info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="flex items-center">
                      <User size={18} className="text-white mr-2" />
                      <span className="text-white font-medium">{creator.name}</span>
                      <span className="ml-1">{creator.country}</span>
                    </div>
                  </div>
                  
                  {/* Clickable overlay */}
                  <Link href={`/creator/${creator.id}`}>
                    <div className="absolute inset-0"></div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorsPage;