/**
 * Job-related type definitions
 * Based on PRD database schema
 */

export type JobStatus = 'open' | 'closed' | 'draft';
export type ApplicationStatus = 'pending' | 'reviewing' | 'interview' | 'accepted' | 'rejected' | 'withdrawn';
export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'lead' | 'manager';
export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'internship';

export interface Job {
  job_id: string;
  jobcode: string;
  jobname: string;
  description: string;
  requirements: string;
  benefits?: string;
  department?: string;
  location?: string;
  salary_range?: string;
  employment_type?: EmploymentType;
  experience_level?: ExperienceLevel;
  status: JobStatus;
  created_by?: string;
  created_at: string;
  updated_by?: string;
  updated_at?: string;
}

export interface JobOpening {
  job_opening_id: string;
  job_id: string;
  job?: Job; // Populated in responses
  open_date: string;
  close_date: string;
  status: JobStatus;
  position_count?: number;
  created_by?: string;
  created_at: string;
  updated_by?: string;
  updated_at?: string;
}

export interface JobApplication {
  job_application_id: string;
  user_id: string;
  job_opening_id: string;
  job_opening?: JobOpening; // Populated in responses
  extra_answers?: Record<string, any>;
  status: ApplicationStatus;
  applied_at: string;
  created_by?: string;
  created_at: string;
  updated_by?: string;
  updated_at?: string;
}

export type QuestionType = 
  | 'basic' 
  | 'job-specific' 
  | 'attitude' 
  | 'company-fit' 
  | 'ai-extra';

export interface QA {
  qa_id: string;
  question_text: string;
  question_type: QuestionType;
  job_id?: string;
  is_active: boolean;
  created_by?: string;
  created_at: string;
  updated_by?: string;
  updated_at?: string;
}

export interface JobApplicationAnswer {
  job_application_id: string;
  qa_id: string;
  question?: QA; // Populated in responses
  answer_text: string;
  created_at: string;
}

// Request/Response types
export interface JobListParams {
  status?: JobStatus;
  department?: string;
  employment_type?: EmploymentType;
  experience_level?: ExperienceLevel;
  search?: string;
  page?: number;
  limit?: number;
}

export interface JobListResponse {
  jobs: JobOpening[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface JobDetailResponse extends JobOpening {
  job: Job;
  application?: JobApplication; // Current user's application if exists
}

export interface CreateApplicationRequest {
  job_opening_id: string;
  answers: {
    qa_id: string;
    answer_text: string;
  }[];
}

export interface CreateApplicationResponse {
  job_application_id: string;
  status: ApplicationStatus;
  applied_at: string;
}

export interface MyApplicationsResponse {
  applications: (JobApplication & {
    job_opening: JobOpening & { job: Job };
  })[];
  total: number;
}
