import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
  searchQuery?: string;
  companyCount?: number;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotification: (id: string) => void;
  clearAllNotifications: () => void;
  unreadCount: number;
  notifyOnOpen: (open: boolean) => void; // <--- added
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

// --- random notification generator ---
function getRandomNotification(): Omit<Notification, 'id' | 'timestamp' | 'read'> {
  const titles = [
    'Blog: How AI is Changing Lead Gen',
    'Hot: Startup ZyxTech enters your market',
    'Market Watch: SaaS funding trends 2024',
    'Internship Alert: Growth Analyst at NovaCorp',
    'Event: Product Manager Bootcamp this weekend',
    'New: FinPro launches in your sector',
    'Insight: Top 5 hiring companies this month'
  ];
  const messages = [
    'Read our latest blog post on new AI sales strategies.',
    'A new player is shaking up the competition—see what ZyxTech is about!',
    'SaaS investments have hit an all-time high this quarter.',
    'Apply now for open internship positions at NovaCorp!',
    'Register for our exclusive product bootcamp and level up your career.',
    'FinPro now offers its services to your region—opportunities ahead.',
    'Discover which companies are actively hiring and trending in tech.'
  ];
  const types: Notification['type'][] = ['info', 'success', 'warning'];
  const searchQueries = ['ai blog', 'startup', 'funding', 'internship', 'SaaS', 'bootcamp'];
  const companyCounts = [1, 5, 12, 25, 50];

  const i = Math.floor(Math.random() * titles.length);
  return {
    title: titles[i],
    message: messages[i],
    type: types[Math.floor(Math.random() * types.length)],
    searchQuery: Math.random() > 0.7 ? searchQueries[Math.floor(Math.random() * searchQueries.length)] : undefined,
    companyCount: Math.random() > 0.5 ? companyCounts[Math.floor(Math.random() * companyCounts.length)] : undefined,
  };
}

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const prevOpen = useRef(false);

  // Initialize with sample notifications
  useEffect(() => {
    const sampleNotifications: Notification[] = [
      {
        id: '1',
        title: 'Search Results Updated',
        message: 'Found 45 new software companies in California matching your criteria.',
        type: 'success',
        timestamp: new Date(Date.now() - 5 * 60000),
        read: false,
        searchQuery: 'software california',
        companyCount: 45
      },
      {
        id: '2',
        title: 'Data Refresh Complete',
        message: 'Lead database has been updated with latest company information.',
        type: 'info',
        timestamp: new Date(Date.now() - 30 * 60000),
        read: false
      }
    ];
    setNotifications(sampleNotifications);
  }, []);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString() + Math.random().toString().slice(2),
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const clearNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(notif => !notif.read).length;

  // NEW: this function triggers a random notification when tab is opened
  const notifyOnOpen = (open: boolean) => {
    // Only trigger when opening (not closing)
    if (open && !prevOpen.current) {
      addNotification(getRandomNotification());
    }
    prevOpen.current = open;
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotification,
        clearAllNotifications,
        unreadCount,
        notifyOnOpen    // <--- now available in your context!
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
