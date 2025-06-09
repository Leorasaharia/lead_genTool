import React, { createContext, useContext, useEffect, useState } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  title?: string;
  company?: string;
  bio?: string;
  location?: string;
  timezone: string;
  linkedin?: string;         // <-- added
  portfolio?: string;        // <-- added
  joinDate: Date;
  preferences: {
    emailFrequency: 'daily' | 'weekly' | 'monthly' | 'never';
    industries: string[];
    regions: string[];
  };
  subscription: {
    plan: 'free' | 'pro' | 'enterprise';
    expiresAt?: Date;
    features: string[];
  };
}

interface UserContextType {
  user: UserProfile | null;
  updateProfile: (updates: Partial<UserProfile>) => void;
  uploadAvatar: (file: File) => Promise<void>;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user data
    setTimeout(() => {
      const sampleUser: UserProfile = {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@email.com',
        title: 'Business Development Manager',
        company: 'TechCorp Solutions',
        bio: 'Experienced in lead generation and business development with a focus on SaaS companies.',
        location: 'San Francisco, CA',
        timezone: 'America/Los_Angeles',
        joinDate: new Date('2025-06-15'),
        preferences: {
          emailFrequency: 'weekly',
          industries: ['Software', 'Technology', 'SaaS'],
          regions: ['California', 'New York', 'Texas']
        },
        subscription: {
          plan: 'pro',
          expiresAt: new Date('2026-12-31'),
          features: ['Advanced Search', 'Bulk Export', 'API Access', 'Priority Support']
        }
      };
      setUser(sampleUser);
      setIsLoading(false);
    }, 1000);
  }, []);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  const uploadAvatar = async (file: File): Promise<void> => {
    // Simulate avatar upload
    return new Promise((resolve) => {
      setTimeout(() => {
        const avatarUrl = URL.createObjectURL(file);
        setUser(prev => prev ? { ...prev, avatar: avatarUrl } : null);
        resolve();
      }, 1500);
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateProfile,
        uploadAvatar,
        isLoading
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
