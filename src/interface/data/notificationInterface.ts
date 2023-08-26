export interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
}

export interface NotificationPanelProps {
  notifications: Notification[];
}
