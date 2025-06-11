import React from 'react';
import Link from 'next/link';

interface SuggestionItemProps {
  id: string;
  name: string;
  avatar: string;
  relationship?: string;
  relationshipTo?: string;
}

const SuggestionItem: React.FC<SuggestionItemProps> = ({
  id,
  name,
  avatar,
  relationship,
  relationshipTo
}) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center">
        <Link href={`/profile/${id}`}>
          <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
            <img src={avatar} alt={name} className="w-full h-full object-cover" />
          </div>
        </Link>
        <div>
          <Link href={`/profile/${id}`}>
            <p className="font-medium text-gray-800 text-xs">{name}</p>
          </Link>
          {relationship && (
            <p className="text-xs text-gray-500">
              {relationship} {relationshipTo}
            </p>
          )}
        </div>
      </div>
      <button className="text-primary text-xs font-medium hover:underline">
        Follow
      </button>
    </div>
  );
};

const SuggestionsSidebar: React.FC = () => {
  // Sample suggestions data
  const suggestions = [
    {
      id: 'neeraj',
      name: 'Neeraj',
      avatar: '/avatar1.jpg',
      relationship: 'started following',
      relationshipTo: 'you.'
    },
    {
      id: 'abdul',
      name: 'Abdul',
      avatar: '/avatar2.jpg',
      relationship: 'Followed by',
      relationshipTo: 'Martin'
    },
    {
      id: 'andrea',
      name: 'Andrea',
      avatar: '/avatar3.jpg',
      relationship: 'Suggested for',
      relationshipTo: 'you'
    },
    {
      id: 'katlyn',
      name: 'Katlyn',
      avatar: '/avatar4.jpg',
      relationship: 'Followed by',
      relationshipTo: 'Kinsley'
    },
    {
      id: 'kevin',
      name: 'Kevin',
      avatar: '/avatar3.jpg',
      relationship: 'Suggested for',
      relationshipTo: 'you'
    }
  ];

  return (
    <div className="bg-white rounded-[25px] shadow-md overflow-hidden border-[0.5px] border-primary/20 p-3 w-[300px] ml-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-medium text-gray-800 text-sm">Suggested for you</h2>
        <Link href="/suggestions">
          <span className="text-xs text-primary hover:underline">See All</span>
        </Link>
      </div>
      
      <div className="divide-y divide-gray-100">
        {suggestions.map((suggestion) => (
          <SuggestionItem key={suggestion.id} {...suggestion} />
        ))}
      </div>
    </div>
  );
};

export default SuggestionsSidebar;