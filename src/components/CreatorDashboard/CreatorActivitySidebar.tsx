import React from "react";
import { MessageCircle, Users, Zap } from "lucide-react";

const recentActivities = [
  {
    icon: <Users size={18} className="text-primary" />,
    description: "Collaborated with Chef Jamie",
    time: "2 hours ago",
  },
  {
    icon: <Zap size={18} className="text-yellow-400" />,
    description: "Posted a new recipe: Honey Glazed Chicken",
    time: "5 hours ago",
  },
  {
    icon: <MessageCircle size={18} className="text-primary" />,
    description: "Received 12 new comments",
    time: "1 day ago",
  },
  {
    icon: <Users size={18} className="text-primary" />,
    description: "Started a new collaboration with Chef Mark",
    time: "2 days ago",
  },
];

const CreatorActivitySidebar: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-2xl p-6 border-[0.5px] border-primary/20">
      <h2 className="text-lg font-bold mb-6 text-primary flex items-center gap-2">
        <Zap size={20} className="text-yellow-400" />
        Recent Activity
      </h2>
      <div className="space-y-4">
        {recentActivities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start gap-3 border-b pb-3 border-gray-100 last:border-b-0"
          >
            <div className="mt-1">{activity.icon}</div>
            <div className="flex-1 text-sm">
              <p className="text-gray-700">{activity.description}</p>
              <p className="text-xs text-gray-400">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatorActivitySidebar;