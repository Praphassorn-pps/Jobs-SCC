/**
 * Job Service
 * Handles job listings, applications, and related operations
 */

import { apiClient, API_CONFIG } from '@/lib/api-client';
import {
  Job,
  JobOpening,
  JobApplication,
  QA,
  JobListParams,
  JobListResponse,
  JobDetailResponse,
  CreateApplicationRequest,
  CreateApplicationResponse,
  MyApplicationsResponse,
  PaginatedResponse,
} from '@/types';
import {
  mockJobOpenings,
  mockJobs,
  mockApplications,
  mockQuestions,
  delay,
  generateId,
} from '@/lib/mock-data-services';

class JobService {
  /**
   * Get list of job openings with filters
   */
  async getJobs(params?: JobListParams): Promise<JobListResponse> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      
      let filteredJobs = [...mockJobOpenings];

      // Apply filters
      if (params?.status) {
        filteredJobs = filteredJobs.filter((job) => job.status === params.status);
      }
      if (params?.department && filteredJobs[0]?.job) {
        filteredJobs = filteredJobs.filter(
          (job) => job.job?.department === params.department
        );
      }
      if (params?.employment_type && filteredJobs[0]?.job) {
        filteredJobs = filteredJobs.filter(
          (job) => job.job?.employment_type === params.employment_type
        );
      }
      if (params?.experience_level && filteredJobs[0]?.job) {
        filteredJobs = filteredJobs.filter(
          (job) => job.job?.experience_level === params.experience_level
        );
      }
      if (params?.search && filteredJobs[0]?.job) {
        const searchLower = params.search.toLowerCase();
        filteredJobs = filteredJobs.filter((job) => 
          job.job?.jobname.toLowerCase().includes(searchLower) ||
          job.job?.description.toLowerCase().includes(searchLower)
        );
      }

      // Pagination
      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

      return {
        jobs: paginatedJobs,
        total: filteredJobs.length,
        page,
        limit,
        total_pages: Math.ceil(filteredJobs.length / limit),
      };
    }

    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, String(value));
        }
      });
    }

    return apiClient.get<JobListResponse>(`/jobs?${queryParams.toString()}`);
  }

  /**
   * Get job opening detail
   */
  async getJobDetail(jobOpeningId: string): Promise<JobDetailResponse> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      const jobOpening = mockJobOpenings.find((j) => j.job_opening_id === jobOpeningId);
      if (!jobOpening) {
        throw new Error('Job not found');
      }

      // Check if user has applied
      const userApplication = mockApplications.find(
        (app) => app.job_opening_id === jobOpeningId
      );

      return {
        ...jobOpening,
        job: jobOpening.job!,
        application: userApplication,
      };
    }

    return apiClient.get<JobDetailResponse>(`/jobs/${jobOpeningId}`);
  }

  /**
   * Get random questions for job application
   */
  async getApplicationQuestions(jobId: string, count: number = 3): Promise<QA[]> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      // Return random questions (mix of general and job-specific)
      const generalQuestions = mockQuestions.filter((q) => !q.job_id);
      const jobSpecificQuestions = mockQuestions.filter((q) => q.job_id === jobId);
      
      const allQuestions = [...generalQuestions, ...jobSpecificQuestions];
      const shuffled = allQuestions.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }

    return apiClient.get<QA[]>(`/jobs/${jobId}/questions?count=${count}`);
  }

  /**
   * Create job application
   */
  async createApplication(
    data: CreateApplicationRequest
  ): Promise<CreateApplicationResponse> {
    if (API_CONFIG.USE_MOCK) {
      await delay(1000); // Simulate processing time
      
      // Check if already applied
      const existingApp = mockApplications.find(
        (app) => app.job_opening_id === data.job_opening_id
      );
      
      if (existingApp) {
        throw new Error('คุณได้สมัครตำแหน่งงานนี้แล้ว');
      }

      return {
        job_application_id: generateId('app'),
        status: 'pending',
        applied_at: new Date().toISOString(),
      };
    }

    return apiClient.post<CreateApplicationResponse>('/jobs/applications', data);
  }

  /**
   * Get my applications
   */
  async getMyApplications(): Promise<MyApplicationsResponse> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      const applicationsWithDetails = mockApplications.map((app) => ({
        ...app,
        job_opening: {
          ...app.job_opening!,
          job: app.job_opening!.job!,
        },
      }));

      return {
        applications: applicationsWithDetails,
        total: applicationsWithDetails.length,
      };
    }

    return apiClient.get<MyApplicationsResponse>('/jobs/applications/me');
  }

  /**
   * Get application detail
   */
  async getApplicationDetail(applicationId: string): Promise<JobApplication> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      const application = mockApplications.find(
        (app) => app.job_application_id === applicationId
      );
      if (!application) {
        throw new Error('Application not found');
      }
      return application;
    }

    return apiClient.get<JobApplication>(`/jobs/applications/${applicationId}`);
  }

  /**
   * Withdraw application
   */
  async withdrawApplication(applicationId: string): Promise<void> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      return;
    }

    return apiClient.patch(`/jobs/applications/${applicationId}/withdraw`);
  }

  /**
   * Check if user can apply to a job
   */
  async canApplyToJob(jobOpeningId: string): Promise<{ can_apply: boolean; reason?: string }> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      
      // Check if already applied
      const existingApp = mockApplications.find(
        (app) => app.job_opening_id === jobOpeningId
      );
      
      if (existingApp) {
        return {
          can_apply: false,
          reason: 'คุณได้สมัครตำแหน่งงานนี้แล้ว',
        };
      }

      // Check if job is still open
      const jobOpening = mockJobOpenings.find((j) => j.job_opening_id === jobOpeningId);
      if (!jobOpening || jobOpening.status !== 'open') {
        return {
          can_apply: false,
          reason: 'ตำแหน่งงานนี้ปิดรับสมัครแล้ว',
        };
      }

      // Check if closing date has passed
      const closeDate = new Date(jobOpening.close_date);
      if (closeDate < new Date()) {
        return {
          can_apply: false,
          reason: 'ตำแหน่งงานนี้หมดเขตรับสมัครแล้ว',
        };
      }

      return { can_apply: true };
    }

    return apiClient.get<{ can_apply: boolean; reason?: string }>(
      `/jobs/${jobOpeningId}/can-apply`
    );
  }

  /**
   * Get available departments (for filtering)
   */
  async getDepartments(): Promise<string[]> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      const departments = new Set(
        mockJobs.map((job) => job.department).filter(Boolean) as string[]
      );
      return Array.from(departments);
    }

    return apiClient.get<string[]>('/jobs/departments');
  }
}

export const jobService = new JobService();
export default jobService;
