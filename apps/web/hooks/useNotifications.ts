/**
 * Custom hooks for notifications
 */

import { useState, useEffect } from 'react';
import { notificationService } from '@/services';
import type { Notification, NotificationListResponse } from '@/types';

/**
 * Hook to fetch notifications
 */
export function useNotifications() {
  const [data, setData] = useState<NotificationListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  async function refetch() {
    try {
      setLoading(true);
      setError(null);
      const result = await notificationService.getNotifications();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  async function markAsRead(notificationIds: string[]) {
    try {
      await notificationService.markAsRead(notificationIds);
      await refetch();
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }

  async function markAllAsRead() {
    try {
      await notificationService.markAllAsRead();
      await refetch();
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }

  useEffect(() => {
    refetch();
  }, []);

  return { data, loading, error, refetch, markAsRead, markAllAsRead };
}

/**
 * Hook to fetch unread count
 */
export function useUnreadCount() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  async function refetch() {
    try {
      setLoading(true);
      setError(null);
      const result = await notificationService.getUnreadCount();
      setCount(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refetch();

    // Poll every 30 seconds for new notifications
    const interval = setInterval(refetch, 30000);

    return () => clearInterval(interval);
  }, []);

  return { count, loading, error, refetch };
}
