/**
 * Notification-related type definitions
 */

export type NotificationType = 
  | 'job_opening' 
  | 'application_status' 
  | 'interview_scheduled' 
  | 'interview_reminder' 
  | 'interview_result' 
  | 'system';

export interface Notification {
  notification_id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
  is_read: boolean;
  created_at: string;
  read_at?: string;
}

export interface NotificationListResponse {
  notifications: Notification[];
  unread_count: number;
  total: number;
}

export interface MarkAsReadRequest {
  notification_ids: string[];
}
