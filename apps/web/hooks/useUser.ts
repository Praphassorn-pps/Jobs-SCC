/**
 * Custom hooks for user profile and authentication
 */

import { useState, useEffect } from 'react';
import { userService, authService } from '@/services';
import type {
  User,
  UserProfile,
  UserDocument,
  UpdateProfileRequest,
  DocumentType,
} from '@/types';

/**
 * Hook to fetch user profile
 */
export function useUserProfile() {
  const [data, setData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  async function refetch() {
    try {
      setLoading(true);
      setError(null);
      const result = await userService.getProfile();
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

  return { profile: data, loading, error, refetch };
}

/**
 * Hook to update user profile
 */
export function useUpdateProfile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function updateProfile(data: UpdateProfileRequest) {
    try {
      setLoading(true);
      setError(null);
      const result = await userService.updateProfile(data);
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { updateProfile, loading, error };
}

/**
 * Hook to manage user documents
 */
export function useUserDocuments() {
  const [documents, setDocuments] = useState<UserDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  async function fetchDocuments() {
    try {
      setLoading(true);
      setError(null);
      const result = await userService.getDocuments();
      setDocuments(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  async function uploadDocument(file: File, documentType: DocumentType) {
    try {
      setError(null);
      const result = await userService.uploadDocument(file, documentType);
      await fetchDocuments(); // Refresh list
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }

  async function deleteDocument(documentId: string) {
    try {
      setError(null);
      await userService.deleteDocument(documentId);
      await fetchDocuments(); // Refresh list
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }

  useEffect(() => {
    fetchDocuments();
  }, []);

  return {
    documents,
    loading,
    error,
    uploadDocument,
    deleteDocument,
    refetch: fetchDocuments,
  };
}

/**
 * Hook to get current authenticated user
 */
export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  async function fetchUser() {
    try {
      setLoading(true);
      setError(null);
      const result = await authService.getCurrentUser();
      setUser(result);
    } catch (err) {
      setError(err as Error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, error, refetch: fetchUser };
}

/**
 * Hook for authentication actions
 */
export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function logout() {
    try {
      setLoading(true);
      setError(null);
      await authService.logout();
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { logout, loading, error };
}
