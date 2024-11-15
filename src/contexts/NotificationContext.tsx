import React, { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { requestNotificationPermission, onMessageListener } from '../lib/firebase';

interface NotificationContextType {
  notificationsEnabled: boolean;
  requestPermission: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const requestPermission = async () => {
    const token = await requestNotificationPermission();
    if (token) {
      setNotificationsEnabled(true);
      // Here you would typically send this token to your backend
      console.log('FCM Token:', token);
      toast.success('Notifications enabled successfully!');
    } else {
      toast.error('Failed to enable notifications');
    }
  };

  useEffect(() => {
    // Check if notifications are already permitted
    if (Notification.permission === 'granted') {
      setNotificationsEnabled(true);
    }

    // Listen for foreground messages
    const unsubscribe = onMessageListener().then((payload: any) => {
      toast.custom((t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {payload?.notification?.title}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {payload?.notification?.body}
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      ), {
        duration: 4000,
      });
    });

    return () => {
      unsubscribe;
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ notificationsEnabled, requestPermission }}>
      {children}
    </NotificationContext.Provider>
  );
};