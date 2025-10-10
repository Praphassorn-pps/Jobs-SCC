// Application status constants
export const APPLICATION_STATUS = {
  SUBMITTED: 'SUBMITTED',
  UNDER_REVIEW: 'UNDER_REVIEW',
  INTERVIEW_SCHEDULED: 'INTERVIEW_SCHEDULED',
  INTERVIEWED: 'INTERVIEWED',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  WITHDRAWN: 'WITHDRAWN'
} as const

// Interview status constants
export const INTERVIEW_STATUS = {
  SCHEDULED: 'SCHEDULED',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED',
  NO_SHOW: 'NO_SHOW'
} as const

// Interview types
export const INTERVIEW_TYPE = {
  IN_PERSON: 'IN_PERSON',
  PHONE: 'PHONE',
  VIDEO_CALL: 'VIDEO_CALL',
  GROUP: 'GROUP'
} as const

// File upload constants
export const FILE_CONSTRAINTS = {
  RESUME: {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_TYPES: ['application/pdf', 'image/jpeg', 'image/png']
  },
  ID_CARD: {
    MAX_SIZE: 2 * 1024 * 1024, // 2MB
    ALLOWED_TYPES: ['image/jpeg', 'image/png']
  }
} as const

// LINE API constants
export const LINE_API = {
  LOGIN_URL: 'https://access.line.me/oauth2/v2.1/authorize',
  TOKEN_URL: 'https://api.line.me/oauth2/v2.1/token',
  PROFILE_URL: 'https://api.line.me/v2/profile',
  MESSAGING_URL: 'https://api.line.me/v2/bot/message'
} as const

// Notification types
export const NOTIFICATION_TYPE = {
  JOB_POSTED: 'JOB_POSTED',
  APPLICATION_RECEIVED: 'APPLICATION_RECEIVED',
  INTERVIEW_SCHEDULED: 'INTERVIEW_SCHEDULED',
  INTERVIEW_REMINDER: 'INTERVIEW_REMINDER',
  INTERVIEW_CANCELLED: 'INTERVIEW_CANCELLED',
  RESULT_ANNOUNCED: 'RESULT_ANNOUNCED',
  GENERAL: 'GENERAL'
} as const

// Admin roles
export const ADMIN_ROLE = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  HR_MANAGER: 'HR_MANAGER',
  HR: 'HR',
  RECRUITER: 'RECRUITER'
} as const

// Employment types
export const EMPLOYMENT_TYPE = {
  FULL_TIME: 'full-time',
  PART_TIME: 'part-time',
  CONTRACT: 'contract',
  INTERNSHIP: 'internship'
} as const

// PDPA constants
export const PDPA = {
  CURRENT_VERSION: '1.0',
  COMPANY_NAME: 'บริษัท SCC'
} as const