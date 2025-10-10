/**
 * Custom hooks for job-related operations
 */

import { useState, useEffect } from 'react';
import { jobService } from '@/services';
import type {
  JobListParams,
  JobListResponse,
  JobDetailResponse,
  CreateApplicationRequest,
  MyApplicationsResponse,
  QA,
} from '@/types';

/**
 * Hook to fetch job listings with filters
 */
export function useJobs(params?: JobListParams) {
  const [data, setData] = useState<JobListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchJobs() {
      try {
        setLoading(true);
        setError(null);
        const result = await jobService.getJobs(params);
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

    fetchJobs();

    return () => {
      isMounted = false;
    };
  }, [JSON.stringify(params)]);

  return { data, loading, error };
}

/**
 * Hook to fetch job detail
 */
export function useJobDetail(jobOpeningId: string | null) {
  const [data, setData] = useState<JobDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!jobOpeningId) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function fetchJobDetail() {
      try {
        setLoading(true);
        setError(null);
        const result = await jobService.getJobDetail(jobOpeningId!);
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

    fetchJobDetail();

    return () => {
      isMounted = false;
    };
  }, [jobOpeningId]);

  return { data, loading, error };
}

/**
 * Hook to apply for a job
 */
export function useApplyJob() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function applyJob(data: CreateApplicationRequest) {
    try {
      setLoading(true);
      setError(null);
      const result = await jobService.createApplication(data);
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { applyJob, loading, error };
}

/**
 * Hook to fetch my applications
 */
export function useMyApplications() {
  const [data, setData] = useState<MyApplicationsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  async function refetch() {
    try {
      setLoading(true);
      setError(null);
      const result = await jobService.getMyApplications();
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
 * Hook to get application questions
 */
export function useApplicationQuestions(jobId: string | null, count: number = 3) {
  const [data, setData] = useState<QA[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function fetchQuestions() {
    if (!jobId) return;

    try {
      setLoading(true);
      setError(null);
      const result = await jobService.getApplicationQuestions(jobId, count);
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (jobId) {
      fetchQuestions();
    }
  }, [jobId, count]);

  return { data, loading, error, refetch: fetchQuestions };
}

/**
 * Hook to check if can apply to job
 */
export function useCanApplyToJob(jobOpeningId: string | null) {
  const [canApply, setCanApply] = useState(false);
  const [reason, setReason] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!jobOpeningId) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function checkCanApply() {
      try {
        setLoading(true);
        setError(null);
        const result = await jobService.canApplyToJob(jobOpeningId!);
        if (isMounted) {
          setCanApply(result.can_apply);
          setReason(result.reason);
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

    checkCanApply();

    return () => {
      isMounted = false;
    };
  }, [jobOpeningId]);

  return { canApply, reason, loading, error };
}
