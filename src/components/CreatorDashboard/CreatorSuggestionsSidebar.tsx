import React from "react";
import { Users, Star, MessageCircle } from "lucide-react";

const dummySuggestions = [
  {
    name: "John's Bakery",
    description: "Collaborate for recipe cross-promotions.",
    avatar: "/avatar2.jpg",
  },
  {
    name: "Chef Lisa",
    description: "Partner for an upcoming cooking series.",
    avatar: "/avatar1.jpg",
  },
  {
    name: "FoodFest Events",
    description: "Feature at the next Foodie Fest event.",
    avatar: "/avatar3.jpg",
  },
];

const CreatorSuggestionsSidebar: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-2xl p-6 border-[0.5px] border-[#4EB596]">
      <h2 className="text-lg font-bold mb-6 text-[#4EB596]">Suggestions for You</h2>
      <div className="space-y-4">
        {dummySuggestions.map((suggestion, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-3 border border-gray-200 rounded-xl hover:shadow transition duration-300"
          >
            <img
              src={suggestion.avatar}
              alt={suggestion.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{suggestion.name}</h3>
              <p className="text-sm text-gray-500">{suggestion.description}</p>
            </div>
            <button className="bg-[#4EB596] hover:bg-[#3a9b7e] text-white px-3 py-1 rounded-full text-xs font-semibold">
              Connect
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatorSuggestionsSidebar;