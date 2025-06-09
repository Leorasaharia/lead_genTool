import { Badge } from '@/components/ui/badge';
import { NotificationPanel } from './NotificationPanel';
import { SettingsPanel } from './SettingsPanel';
import { UserProfile } from './UserProfile';

export const DashboardHeader = () => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <img 
                src="https://ik.imagekit.io/qcgxthanm/_fd558886-515d-4a64-8ace-0cef64a57fff.jpeg?updatedAt=1749365745875" 
                alt="Prospect Flow Insights Logo" 
                className="w-10 h-10 rounded-lg object-cover shadow-sm"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Prospect Flow Insights</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">AI-Powered Lead Generation</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
              Pro Plan
            </Badge>
          </div>
          
          <div className="flex items-center space-x-3">
            <NotificationPanel />
            <SettingsPanel />
            <UserProfile />
          </div>
        </div>
      </div>
    </header>
  );
};