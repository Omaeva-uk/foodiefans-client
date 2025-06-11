import React from "react";
import { Star } from "lucide-react";

const trendingRecipes = [
  {
    title: "Spicy Garlic Butter Shrimp",
    creator: "Chef Emma",
    image: "/shrimp.jpg",
    likes: 185,
  },
  {
    title: "Classic French Croissants",
    creator: "Pastry Master John",
    image: "/croissant.jpg",
    likes: 142,
  },
  {
    title: "Vegan Buddha Bowl",
    creator: "Green Chef Lisa",
    image: "/vegan.jpg",
    likes: 98,
  },
];

const CreatorTrendingRecipes: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-2xl p-6 border-[0.5px] border-primary/20">
      <h2 className="text-xl font-bold mb-6 text-primary flex items-center gap-2">
        <Star size={20} className="text-yellow-400" />
        Trending Recipes
      </h2>
      <div className="space-y-4">
        {trendingRecipes.map((recipe, index) => (
          <div
            key={index}
            className="flex gap-4 items-center border-[0.5px] border-primary/30 rounded-xl p-3 hover:shadow-md hover:border-primary transition-all"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 text-sm">
                {recipe.title}
              </h3>
              <p className="text-xs text-gray-500">by {recipe.creator}</p>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Star size={16} className="text-yellow-400" />
              {recipe.likes}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatorTrendingRecipes;