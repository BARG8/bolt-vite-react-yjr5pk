import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, CreditCard, Gift, ChevronRight, Star, Clock, LogOut, Bell } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';

const ProfilePage = () => {
  const { currentUser, logOut } = useAuth();
  const { notificationsEnabled, requestPermission } = useNotifications();

  const user = {
    name: currentUser?.displayName || "Guest User",
    email: currentUser?.email || "",
    avatar: currentUser?.photoURL || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    totalPoints: 725,
    cards: 4,
    memberSince: "January 2024"
  };

  const menuItems = [
    { 
      icon: CreditCard, 
      label: "My Loyalty Cards", 
      count: user.cards,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      link: "/my-cards"
    },
    { 
      icon: Gift, 
      label: "Rewards History", 
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      link: "/rewards"
    },
    { 
      icon: Star, 
      label: "Favorite Stores",
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
      link: "/favorites"
    },
    { 
      icon: Clock, 
      label: "Recent Activity",
      color: "text-green-500",
      bgColor: "bg-green-50",
      link: "/activity"
    },
    { 
      icon: Bell, 
      label: "Notifications",
      color: "text-red-500",
      bgColor: "bg-red-50",
      onClick: requestPermission,
      status: notificationsEnabled ? 'Enabled' : 'Disabled'
    },
    { 
      icon: Settings, 
      label: "Settings",
      color: "text-gray-500",
      bgColor: "bg-gray-50",
      link: "/settings"
    }
  ];

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* User Info Section */}
      <div className="bg-white shadow-sm mb-6">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-lg"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
              <div className="mt-2 flex items-center space-x-4">
                <div>
                  <p className="text-sm text-gray-500">Total Points</p>
                  <p className="font-semibold text-blue-600">{user.totalPoints}</p>
                </div>
                <div className="h-4 w-px bg-gray-200"></div>
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-semibold text-gray-900">{user.memberSince}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm divide-y divide-gray-100">
          {menuItems.map((item, index) => (
            item.link ? (
              <Link 
                key={index}
                to={item.link}
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-xl ${item.bgColor}`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <span className="font-medium text-gray-900">{item.label}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {item.count && (
                    <span className="text-sm text-gray-500">{item.count}</span>
                  )}
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </Link>
            ) : (
              <button
                key={index}
                onClick={item.onClick}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-xl ${item.bgColor}`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <span className="font-medium text-gray-900">{item.label}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {item.status && (
                    <span className={`text-sm ${
                      item.status === 'Enabled' ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {item.status}
                    </span>
                  )}
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            )
          ))}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;