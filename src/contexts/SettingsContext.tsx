
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AppSettings {
  // General Settings
  language: string;
  autoRefresh: boolean;
  refreshInterval: number; // in minutes
  
  // Search Settings
  defaultSearchLimit: number;
  saveSearchHistory: boolean;
  autoApplyFilters: boolean;
  
  // Display Settings
  compactView: boolean;
  showAdvancedMetrics: boolean;
  defaultSortBy: string;
  
  // Export Settings
  defaultExportFormat: string;
  includeContactInfo: boolean;
  
  // Notification Settings
  enableNotifications: boolean;
  emailNotifications: boolean;
  browserNotifications: boolean;
}

interface SettingsContextType {
  settings: AppSettings;
  updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
  resetSettings: () => void;
  exportSettings: () => void;
  importSettings: (settings: Partial<AppSettings>) => void;
}

const defaultSettings: AppSettings = {
  language: 'en',
  autoRefresh: true,
  refreshInterval: 30,
  defaultSearchLimit: 100,
  saveSearchHistory: true,
  autoApplyFilters: false,
  compactView: false,
  showAdvancedMetrics: true,
  defaultSortBy: 'score',
  defaultExportFormat: 'csv',
  includeContactInfo: true,
  enableNotifications: true,
  emailNotifications: false,
  browserNotifications: true
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const savedSettings = localStorage.getItem('appSettings');
    return savedSettings ? { ...defaultSettings, ...JSON.parse(savedSettings) } : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
  }, [settings]);

  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('appSettings');
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'leadgen-settings.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSetting,
        resetSettings,
        exportSettings,
        importSettings
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
