import React from 'react';
import Link from 'next/link';

interface ActivityItemProps {
  id: string;
  name: string;
  avatar: string;
  action: string;
  target?: string;
  targetImage?: string;
  time?: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  id,
  name,
  avatar,
  action,
  target,
  targetImage,
  time
}) => {
  return (
    <div className="flex items-start py-2">
      <Link href={`/profile/${id}`}>
        <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
          <img src={avatar} alt={name} className="w-full h-full object-cover" />
        </div>
      </Link>
      <div className="flex-grow">
        <div className="text-xs">
          <Link href={`/profile/${id}`}>
            <span className="font-medium text-gray-800">{name}</span>
          </Link>{' '}
          <span className="text-gray-600">{action}</span>{' '}
          {target && <span className="text-gray-600">you.</span>}
        </div>
        {time && <div className="text-xs text-gray-500 mt-0.5">{time}</div>}
      </div>
      {targetImage && (
        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 ml-2">
          <img src={targetImage} alt="Post" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
};

const ActivitySidebar: React.FC = () => {
  // Sample activity data
  const activities = [
    {
      id: 'neeraj',
      name: 'Neeraj',
      avatar: '/avatar1.jpg',
      action: 'started following',
      target: 'you',
      time: ''
    },
    {
      id: 'martin',
      name: 'Martin',
      avatar: '/avatar2.jpg',
      action: 'liked your recent post.',
      targetImage: '/food1.jpg',
      time: ''
    },
    {
      id: 'rahuman',
      name: 'Rahuman',
      avatar: '/avatar3.jpg',
      action: 'started following',
      target: 'you',
      time: 'Yesterday',
      targetImage: '/food2.jpg'
    },
    {
      id: 'kinsley',
      name: 'Kinsley',
      avatar: '/avatar4.jpg',
      action: 'liked your recent post.',
      targetImage: '/food3.jpg',
      time: ''
    }
  ];

  return (
    <div className="bg-white rounded-[25px] shadow-md overflow-hidden border-[0.5px] border-primary/20 p-3 w-[300px] ml-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-medium text-gray-800 text-sm">Activity</h2>
        <Link href="/activity" className=' cursor-pointer'>
          <span className="text-xs text-primary cursor-pointer font-medium hover:underline">See All</span>
        </Link>
      </div>
      
      <div className="divide-y divide-gray-100">
        {activities.map((activity, index) => (
          <React.Fragment key={`${activity.id}-${index}`}>
            {index === 2 && (
              <div className="py-1 text-xs text-gray-500">Yesterday</div>
            )}
            <ActivityItem {...activity} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ActivitySidebar;