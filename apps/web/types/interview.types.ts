/**
 * Interview-related type definitions
 * Based on PRD database schema
 */

export type InterviewStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'cancelled' 
  | 'completed' 
  | 'no_show';

export type InterviewResult = 
  | 'passed' 
  | 'failed' 
  | 'pending' 
  | 'under_review';

export interface Interview {
  interview_id: string;
  job_application_id: string;
  scheduled_date: string;
  scheduled_time?: string;
  location?: string;
  interview_type?: 'phone' | 'video' | 'onsite' | 'panel';
  status: InterviewStatus;
  result?: InterviewResult;
  notes?: string;
  feedback?: string;
  created_by?: string;
  created_at: string;
  updated_by?: string;
  updated_at?: string;
}

export interface InterviewWithApplication extends Interview {
  job_application: {
    job_application_id: string;
    user_id: string;
    status: string;
    job_opening: {
      job_opening_id: string;
      job: {
        job_id: string;
        jobcode: string;
        jobname: string;
        department?: string;
      };
    };
  };
}

// Request/Response types
export interface MyInterviewsResponse {
  interviews: InterviewWithApplication[];
  upcoming: InterviewWithApplication[];
  past: InterviewWithApplication[];
  total: number;
}

export interface ConfirmInterviewRequest {
  interview_id: string;
  status: 'confirmed' | 'cancelled';
  reason?: string;
}

export interface InterviewDetailResponse extends Interview {
  job_application: {
    job_application_id: string;
    user_id: string;
    status: string;
    applied_at: string;
    job_opening: {
      job_opening_id: string;
      job: {
        job_id: string;
        jobcode: string;
        jobname: string;
        description: string;
        department?: string;
        location?: string;
      };
    };
  };
}
