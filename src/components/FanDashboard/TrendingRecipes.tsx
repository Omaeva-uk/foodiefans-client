import React from 'react';
import Link from 'next/link';

interface TrendingRecipeItemProps {
  name: string;
  views: string;
  avatar: string;
  recipeImage: string;
  recipeId: string;
}

const TrendingRecipeItem: React.FC<TrendingRecipeItemProps> = ({
  name,
  views,
  avatar,
  recipeImage,
  recipeId
}) => {
  return (
    <Link href={`/recipe/${recipeId}`}>
      <div className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 transition-colors">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
            <img src={avatar} alt={name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="text-base font-medium text-gray-800">{name}</h3>
            <p className="text-xs text-gray-500">{views}</p>
          </div>
        </div>
        <div className="w-12 h-12 rounded-lg overflow-hidden">
          <img src={recipeImage} alt="Recipe" className="w-full h-full object-cover" />
        </div>
      </div>
    </Link>
  );
};

const TrendingRecipes: React.FC = () => {
  // Sample data - in a real app, this would be fetched from an API
  const trendingRecipes = [
    {
      id: '1',
      name: 'Andrea',
      views: '2.5k views',
      avatar: '/avatar1.jpg',
      recipeImage: '/food2.jpg'
    },
    {
      id: '2',
      name: 'Abdul',
      views: '2.5k views',
      avatar: '/avatar2.jpg',
      recipeImage: '/food4.jpg'
    },
    {
      id: '3',
      name: 'Katlyn',
      views: '2.5k views',
      avatar: '/avatar3.jpg',
      recipeImage: '/food3.jpg'
    },
    {
      id: '4',
      name: 'Kevin',
      views: '2.5k views',
      avatar: '/avatar4.jpg',
      recipeImage: '/food4.jpg'
    }
  ];

  return (
    <div className="bg-white rounded-[25px]  shadow-md overflow-hidden border-[0.5px] border-primary/20  p-4 mt-4">
      <h2 className="text-lg font-bold text-gray-800 mb-3">Trending Recipe</h2>
      <div className="space-y-3">
        {trendingRecipes.map((recipe) => (
          <TrendingRecipeItem
            key={recipe.id}
            name={recipe.name}
            views={recipe.views}
            avatar={recipe.avatar}
            recipeImage={recipe.recipeImage}
            recipeId={recipe.id}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingRecipes;