
import React from 'react';
import { Bell, X, Check, CheckCheck, Trash2, Clock, Search, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useNotifications, Notification } from '@/contexts/NotificationContext';
import { formatDistanceToNow } from 'date-fns';

export const NotificationPanel = () => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotification,
    clearAllNotifications
  } = useNotifications();

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'warning':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'error':
        return <X className="w-4 h-4 text-red-600" />;
      default:
        return <Search className="w-4 h-4 text-blue-600" />;
    }
  };

  const getNotificationBg = (type: Notification['type'], read: boolean) => {
    const opacity = read ? 'bg-opacity-30' : 'bg-opacity-50';
    switch (type) {
      case 'success':
        return `bg-green-50 ${opacity}`;
      case 'warning':
        return `bg-yellow-50 ${opacity}`;
      case 'error':
        return `bg-red-50 ${opacity}`;
      default:
        return `bg-blue-50 ${opacity}`;
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs"
              >
                <CheckCheck className="w-3 h-3 mr-1" />
                Mark all read
              </Button>
            )}
            {notifications.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllNotifications}
                className="text-xs text-destructive"
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Clear all
              </Button>
            )}
          </div>
        </div>

        <ScrollArea className="h-80">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
              <Bell className="w-8 h-8 mb-2 opacity-50" />
              <p className="text-sm">No notifications yet</p>
            </div>
          ) : (
            <div className="p-2">
              {notifications.map((notification, index) => (
                <div key={notification.id}>
                  <div
                    className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                      getNotificationBg(notification.type, notification.read)
                    } ${!notification.read ? 'border-l-4 border-l-primary' : ''}`}
                    onClick={() => !notification.read && markAsRead(notification.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <h4 className={`text-sm font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {notification.title}
                            </h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                clearNotification(notification.id);
                              }}
                              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                          <p className={`text-xs mt-1 ${!notification.read ? 'text-foreground/80' : 'text-muted-foreground/80'}`}>
                            {notification.message}
                          </p>
                          {notification.searchQuery && (
                            <Badge variant="secondary" className="mt-2 text-xs">
                              Search: {notification.searchQuery}
                            </Badge>
                          )}
                          <p className="text-xs text-muted-foreground mt-2">
                            {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      )}
                    </div>
                  </div>
                  {index < notifications.length - 1 && <Separator className="my-1" />}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
