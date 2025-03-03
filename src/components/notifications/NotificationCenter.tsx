import React from "react";
import { Bell, UserPlus, Calendar, Clock, AlertCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";

type NotificationType = "invitation" | "turn" | "completion" | "friend";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationCenterProps {
  notifications?: Notification[];
  onNotificationClick?: (notification: Notification) => void;
  onMarkAllAsRead?: () => void;
}

const NotificationCenter = ({
  notifications = [
    {
      id: "1",
      type: "invitation",
      title: "Draft Invitation",
      message: 'John invited you to join "Fantasy Football 2023"',
      time: "5 minutes ago",
      read: false,
    },
    {
      id: "2",
      type: "turn",
      title: "Your Turn",
      message: 'It\'s your turn to pick in "NBA All-Stars Draft"',
      time: "2 minutes ago",
      read: false,
    },
    {
      id: "3",
      type: "completion",
      title: "Draft Complete",
      message: '"Movie Night Picks" draft has been completed',
      time: "1 hour ago",
      read: true,
    },
    {
      id: "4",
      type: "friend",
      title: "Friend Request",
      message: "Sarah sent you a friend request",
      time: "3 hours ago",
      read: true,
    },
    {
      id: "5",
      type: "invitation",
      title: "Draft Invitation",
      message: 'Mike invited you to join "Book Club Picks"',
      time: "1 day ago",
      read: true,
    },
  ],
  onNotificationClick = () => {},
  onMarkAllAsRead = () => {},
}: NotificationCenterProps) => {
  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "invitation":
        return <Calendar className="h-4 w-4 text-blue-500" />;
      case "turn":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "completion":
        return <AlertCircle className="h-4 w-4 text-green-500" />;
      case "friend":
        return <UserPlus className="h-4 w-4 text-purple-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-background relative">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {unreadCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="end">
          <div className="bg-background flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onMarkAllAsRead}
                className="text-xs"
              >
                Mark all as read
              </Button>
            )}
          </div>
          <ScrollArea className="h-[400px]">
            {notifications.length > 0 ? (
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 cursor-pointer hover:bg-accent ${!notification.read ? "bg-accent/20" : ""}`}
                    onClick={() => onNotificationClick(notification)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm">
                            {notification.title}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-6">
                <Bell className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground text-center">
                  No notifications yet
                </p>
              </div>
            )}
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default NotificationCenter;
