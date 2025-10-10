/**
 * User-related type definitions
 * Based on PRD database schema
 */

export type UserRole = 'user' | 'hr' | 'admin' | 'sysadmin';

export interface User {
  user_id: string;
  email?: string;
  line_user_id?: string;
  display_name?: string;
  picture_url?: string;
  prefix?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  address?: string;
  role: UserRole;
  pdpa_consent: boolean;
  is_active: boolean;
  extra_fields?: Record<string, any>;
  created_at: string;
  created_by?: string;
  updated_at?: string;
  updated_by?: string;
}

export type DocumentType = 
  | 'id_card' 
  | 'resume' 
  | 'transcript' 
  | 'certificate' 
  | 'portfolio' 
  | 'house_registration' 
  | 'photo' 
  | 'reference_letter' 
  | 'cover_letter' 
  | 'other';

export interface UserDocument {
  document_id: string;
  user_id: string;
  document_type: DocumentType;
  file_path: string;
  file_name: string;
  file_size: number;
  uploaded_at: string;
  is_active: boolean;
  created_at: string;
  created_by?: string;
  updated_at?: string;
  updated_by?: string;
}

export interface UserProfile extends User {
  documents: UserDocument[];
}

// Request/Response types
export interface UpdateProfileRequest {
  prefix?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  address?: string;
  extra_fields?: Record<string, any>;
}

export interface UploadDocumentRequest {
  document_type: DocumentType;
  file: File;
}

export interface UploadDocumentResponse {
  document_id: string;
  file_path: string;
  file_name: string;
  file_size: number;
}
