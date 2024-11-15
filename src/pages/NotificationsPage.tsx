import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bell, AlertCircle } from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';

const NotificationsPage = () => {
  const { notificationsEnabled, requestPermission } = useNotifications();

  // Mock notifications data - in a real app, this would come from your backend
  const notifications = [
    {
      id: 1,
      title: "New Loyalty Offer",
      message: "Morning Brew Coffee is offering double stamps this weekend!",
      time: "2 hours ago",
      type: "offer",
      read: false
    },
    {
      id: 2,
      title: "Reward Available",
      message: "You've earned a free coffee at Fresh Bake!",
      time: "1 day ago",
      type: "reward",
      read: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between p-4">
            <Link 
              to="/" 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
            <div className="w-10"></div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4">
        {!notificationsEnabled && (
          <div className="mb-6 bg-blue-50 p-4 rounded-xl">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Enable Notifications
                </h3>
                <p className="mt-1 text-sm text-blue-600">
                  Stay updated with the latest offers and rewards from your favorite stores.
                </p>
                <button
                  onClick={requestPermission}
                  className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Enable Now
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {notifications.map((notification) => (
            <div 
              key={notification.id}
              className={`bg-white rounded-xl p-4 shadow-sm ${
                !notification.read ? 'border-l-4 border-blue-500' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-full ${
                  notification.type === 'offer' ? 'bg-purple-100' : 'bg-green-100'
                }`}>
                  <Bell className={`w-5 h-5 ${
                    notification.type === 'offer' ? 'text-purple-600' : 'text-green-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className={`font-medium ${
                        !notification.read ? 'text-gray-900' : 'text-gray-600'
                      }`}>
                        {notification.title}
                      </h3>
                      <p className={`text-sm ${
                        !notification.read ? 'text-gray-600' : 'text-gray-500'
                      }`}>
                        {notification.message}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400">
                      {notification.time}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {notifications.length === 0 && (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No Notifications</h3>
              <p className="text-gray-500">
                You're all caught up! Check back later for updates.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;