/**
 * Custom hooks for interview management
 */

import { useState, useEffect } from 'react';
import { interviewService } from '@/services';
import type {
  Interview,
  InterviewWithApplication,
  MyInterviewsResponse,
  ConfirmInterviewRequest,
  InterviewDetailResponse,
} from '@/types';

/**
 * Hook to fetch my interviews
 */
export function useMyInterviews() {
  const [data, setData] = useState<MyInterviewsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  async function refetch() {
    try {
      setLoading(true);
      setError(null);
      const result = await interviewService.getMyInterviews();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refetch();
  }, []);

  return { data, loading, error, refetch };
}

/**
 * Hook to fetch interview detail
 */
export function useInterviewDetail(interviewId: string | null) {
  const [data, setData] = useState<InterviewDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!interviewId) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function fetchInterviewDetail() {
      try {
        setLoading(true);
        setError(null);
        const result = await interviewService.getInterviewDetail(interviewId!);
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchInterviewDetail();

    return () => {
      isMounted = false;
    };
  }, [interviewId]);

  return { data, loading, error };
}

/**
 * Hook to confirm/cancel interview
 */
export function useConfirmInterview() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function confirmInterview(data: ConfirmInterviewRequest) {
    try {
      setLoading(true);
      setError(null);
      const result = await interviewService.confirmInterview(data);
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { confirmInterview, loading, error };
}

/**
 * Hook to fetch upcoming interviews
 */
export function useUpcomingInterviews() {
  const [data, setData] = useState<InterviewWithApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  async function refetch() {
    try {
      setLoading(true);
      setError(null);
      const result = await interviewService.getUpcomingInterviews();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refetch();
  }, []);

  return { data, loading, error, refetch };
}
