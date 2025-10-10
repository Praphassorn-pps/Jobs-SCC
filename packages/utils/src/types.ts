// Job types
export interface Job {
  id: string
  title: string
  company: string
  location: string
  salary: string
  type: 'full-time' | 'part-time' | 'contract' | 'internship'
  description: string
  requirements: string[]
  benefits?: string[]
  closingDate: string
  isActive: boolean
  department?: string
  experienceLevel: 'entry' | 'mid' | 'senior'
  createdAt: string
}

// User types
export interface User {
  id: string
  lineId?: string
  name: string
  email: string
  phone: string
  profileImage?: string
  pdpaConsent: boolean
  pdpaConsentAt?: string
  createdAt: string
}

// Application types
export interface JobApplication {
  id: string
  jobId: string
  userId: string
  status: ApplicationStatus
  resumeUrl?: string
  idCardUrl?: string
  coverLetter?: string
  answers?: Record<string, any>
  submittedAt: string
}

export type ApplicationStatus = 
  | 'draft'
  | 'submitted' 
  | 'under_review'
  | 'interview_scheduled'
  | 'interviewed'
  | 'accepted'
  | 'rejected'
  | 'withdrawn'

// Form types
export interface ApplicationFormData {
  // Personal info
  name: string
  email: string
  phone: string
  
  // Documents
  resume?: File
  idCard?: File
  
  // Additional info
  coverLetter?: string
  answers?: Record<string, any>
  
  // PDPA
  pdpaConsent: boolean
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// File upload types
export interface FileUploadResult {
  success: boolean
  url?: string
  error?: string
}

// Pagination types
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}