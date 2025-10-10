/**
 * User Service
 * Handles user profile and document management
 */

import { apiClient, API_CONFIG } from '@/lib/api-client';
import {
  User,
  UserProfile,
  UserDocument,
  UpdateProfileRequest,
  UploadDocumentRequest,
  UploadDocumentResponse,
  DocumentType,
} from '@/types';
import {
  mockUserProfile,
  mockUserDocuments,
  delay,
  generateId,
} from '@/lib/mock-data-services';

class UserService {
  /**
   * Get user profile
   */
  async getProfile(): Promise<UserProfile> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      return mockUserProfile;
    }

    return apiClient.get<UserProfile>('/users/profile');
  }

  /**
   * Update user profile
   */
  async updateProfile(data: UpdateProfileRequest): Promise<User> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      return {
        ...mockUserProfile,
        ...data,
        updated_at: new Date().toISOString(),
      };
    }

    return apiClient.patch<User>('/users/profile', data);
  }

  /**
   * Get user documents
   */
  async getDocuments(): Promise<UserDocument[]> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      return mockUserDocuments;
    }

    return apiClient.get<UserDocument[]>('/users/documents');
  }

  /**
   * Get document by type
   */
  async getDocumentByType(documentType: DocumentType): Promise<UserDocument | null> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      return mockUserDocuments.find(
        (doc) => doc.document_type === documentType && doc.is_active
      ) || null;
    }

    return apiClient.get<UserDocument | null>(`/users/documents/type/${documentType}`);
  }

  /**
   * Upload document
   */
  async uploadDocument(
    file: File,
    documentType: DocumentType
  ): Promise<UploadDocumentResponse> {
    if (API_CONFIG.USE_MOCK) {
      await delay(1000); // Simulate longer upload time
      return {
        document_id: generateId('doc'),
        file_path: `https://example.com/documents/${file.name}`,
        file_name: file.name,
        file_size: file.size,
      };
    }

    return apiClient.uploadFile<UploadDocumentResponse>('/users/documents/upload', file, {
      document_type: documentType,
    });
  }

  /**
   * Delete document
   */
  async deleteDocument(documentId: string): Promise<void> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      return;
    }

    return apiClient.delete(`/users/documents/${documentId}`);
  }

  /**
   * Download document
   */
  async downloadDocument(documentId: string): Promise<Blob> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      // Return a dummy blob for testing
      return new Blob(['Mock document content'], { type: 'application/pdf' });
    }

    const response = await fetch(`${API_CONFIG.BASE_URL}/users/documents/${documentId}/download`, {
      headers: {
        Authorization: `Bearer ${apiClient['getAccessToken']()}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to download document');
    }

    return response.blob();
  }

  /**
   * Validate document file
   */
  validateDocumentFile(file: File, documentType: DocumentType): { valid: boolean; error?: string } {
    // Allowed file types
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    
    // Max file sizes (in bytes)
    const maxSizes: Record<string, number> = {
      id_card: 2 * 1024 * 1024, // 2MB
      resume: 5 * 1024 * 1024, // 5MB
      default: 5 * 1024 * 1024, // 5MB
    };

    // Check file type
    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'รองรับเฉพาะไฟล์ PDF, JPG, หรือ PNG เท่านั้น',
      };
    }

    // Check file size
    const maxSize = maxSizes[documentType] || maxSizes.default;
    if (file.size > maxSize) {
      const maxSizeMB = maxSize / (1024 * 1024);
      return {
        valid: false,
        error: `ขนาดไฟล์ต้องไม่เกิน ${maxSizeMB}MB`,
      };
    }

    return { valid: true };
  }
}

export const userService = new UserService();
export default userService;
