/**
 * Interview Service
 * Handles interview scheduling, confirmation, and management
 */

import { apiClient, API_CONFIG } from '@/lib/api-client';
import {
  Interview,
  InterviewWithApplication,
  MyInterviewsResponse,
  ConfirmInterviewRequest,
  InterviewDetailResponse,
} from '@/types';
import {
  mockInterviews,
  mockApplications,
  mockJobOpenings,
  delay,
} from '@/lib/mock-data-services';

class InterviewService {
  /**
   * Get my interviews
   */
  async getMyInterviews(): Promise<MyInterviewsResponse> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      
      const interviewsWithDetails: InterviewWithApplication[] = mockInterviews.map((interview) => {
        const application = mockApplications.find(
          (app) => app.job_application_id === interview.job_application_id
        );
        const jobOpening = application?.job_opening;

        return {
          ...interview,
          job_application: {
            job_application_id: application!.job_application_id,
            user_id: application!.user_id,
            status: application!.status,
            job_opening: {
              job_opening_id: jobOpening!.job_opening_id,
              job: {
                job_id: jobOpening!.job!.job_id,
                jobcode: jobOpening!.job!.jobcode,
                jobname: jobOpening!.job!.jobname,
                department: jobOpening!.job!.department,
              },
            },
          },
        };
      });

      // Separate upcoming and past interviews
      const now = new Date();
      const upcoming = interviewsWithDetails.filter(
        (interview) => new Date(interview.scheduled_date) > now
      );
      const past = interviewsWithDetails.filter(
        (interview) => new Date(interview.scheduled_date) <= now
      );

      return {
        interviews: interviewsWithDetails,
        upcoming,
        past,
        total: interviewsWithDetails.length,
      };
    }

    return apiClient.get<MyInterviewsResponse>('/interviews/me');
  }

  /**
   * Get interview detail
   */
  async getInterviewDetail(interviewId: string): Promise<InterviewDetailResponse> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      
      const interview = mockInterviews.find((i) => i.interview_id === interviewId);
      if (!interview) {
        throw new Error('Interview not found');
      }

      const application = mockApplications.find(
        (app) => app.job_application_id === interview.job_application_id
      );
      const jobOpening = application?.job_opening;

      return {
        ...interview,
        job_application: {
          job_application_id: application!.job_application_id,
          user_id: application!.user_id,
          status: application!.status,
          applied_at: application!.applied_at,
          job_opening: {
            job_opening_id: jobOpening!.job_opening_id,
            job: {
              job_id: jobOpening!.job!.job_id,
              jobcode: jobOpening!.job!.jobcode,
              jobname: jobOpening!.job!.jobname,
              description: jobOpening!.job!.description,
              department: jobOpening!.job!.department,
              location: jobOpening!.job!.location,
            },
          },
        },
      };
    }

    return apiClient.get<InterviewDetailResponse>(`/interviews/${interviewId}`);
  }

  /**
   * Confirm or cancel interview
   */
  async confirmInterview(data: ConfirmInterviewRequest): Promise<Interview> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      
      const interview = mockInterviews.find((i) => i.interview_id === data.interview_id);
      if (!interview) {
        throw new Error('Interview not found');
      }

      return {
        ...interview,
        status: data.status,
        notes: data.reason ? `${interview.notes}\nเหตุผล: ${data.reason}` : interview.notes,
        updated_at: new Date().toISOString(),
      };
    }

    return apiClient.patch<Interview>(`/interviews/${data.interview_id}/confirm`, {
      status: data.status,
      reason: data.reason,
    });
  }

  /**
   * Get upcoming interviews (within next 7 days)
   */
  async getUpcomingInterviews(): Promise<InterviewWithApplication[]> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      
      const result = await this.getMyInterviews();
      const sevenDaysFromNow = new Date();
      sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

      return result.upcoming.filter(
        (interview) => new Date(interview.scheduled_date) <= sevenDaysFromNow
      );
    }

    return apiClient.get<InterviewWithApplication[]>('/interviews/upcoming');
  }

  /**
   * Check if interview needs confirmation
   */
  needsConfirmation(interview: Interview): boolean {
    return interview.status === 'pending';
  }

  /**
   * Check if interview is upcoming (within 24 hours)
   */
  isUpcomingSoon(interview: Interview): boolean {
    const interviewDate = new Date(interview.scheduled_date);
    const now = new Date();
    const hoursDiff = (interviewDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    return hoursDiff > 0 && hoursDiff <= 24;
  }

  /**
   * Format interview date and time
   */
  formatInterviewDateTime(interview: Interview): string {
    const date = new Date(interview.scheduled_date);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Bangkok',
    };
    return date.toLocaleDateString('th-TH', options);
  }
}

export const interviewService = new InterviewService();
export default interviewService;
