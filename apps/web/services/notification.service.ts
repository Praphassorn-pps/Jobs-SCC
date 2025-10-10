/**
 * Notification Service
 * Handles notification management and real-time updates
 */

import { apiClient, API_CONFIG } from '@/lib/api-client';
import {
  Notification,
  NotificationListResponse,
  MarkAsReadRequest,
} from '@/types';
import {
  mockNotifications,
  delay,
} from '@/lib/mock-data-services';

class NotificationService {
  /**
   * Get all notifications
   */
  async getNotifications(): Promise<NotificationListResponse> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      
      const unreadCount = mockNotifications.filter((n) => !n.is_read).length;

      return {
        notifications: mockNotifications,
        unread_count: unreadCount,
        total: mockNotifications.length,
      };
    }

    return apiClient.get<NotificationListResponse>('/notifications');
  }

  /**
   * Get unread notifications only
   */
  async getUnreadNotifications(): Promise<Notification[]> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      return mockNotifications.filter((n) => !n.is_read);
    }

    return apiClient.get<Notification[]>('/notifications?unread=true');
  }

  /**
   * Mark notifications as read
   */
  async markAsRead(notificationIds: string[]): Promise<void> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      return;
    }

    return apiClient.patch<void>('/notifications/mark-read', {
      notification_ids: notificationIds,
    } as MarkAsReadRequest);
  }

  /**
   * Mark single notification as read
   */
  async markOneAsRead(notificationId: string): Promise<void> {
    return this.markAsRead([notificationId]);
  }

  /**
   * Mark all notifications as read
   */
  async markAllAsRead(): Promise<void> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      return;
    }

    return apiClient.patch<void>('/notifications/mark-all-read');
  }

  /**
   * Delete notification
   */
  async deleteNotification(notificationId: string): Promise<void> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      return;
    }

    return apiClient.delete(`/notifications/${notificationId}`);
  }

  /**
   * Get unread count
   */
  async getUnreadCount(): Promise<number> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      return mockNotifications.filter((n) => !n.is_read).length;
    }

    const response = await apiClient.get<{ count: number }>('/notifications/unread-count');
    return response.count;
  }
}

export const notificationService = new NotificationService();
export default notificationService;
