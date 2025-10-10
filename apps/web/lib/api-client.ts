/**
 * API Configuration and Base Client
 */

import { ApiError, ApiResponse } from '@/types';

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  TIMEOUT: 30000, // 30 seconds
  USE_MOCK: process.env.NEXT_PUBLIC_USE_MOCK === 'true', // Toggle between mock and real API
};

// HTTP Methods
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestConfig extends RequestInit {
  timeout?: number;
  skipAuth?: boolean;
}

/**
 * Base API Client
 * Handles all HTTP requests with proper error handling and token management
 */
class ApiClient {
  private baseUrl: string;
  private timeout: number;

  constructor(baseUrl: string, timeout: number = 30000) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }

  /**
   * Get authorization headers
   */
  private getAuthHeaders(): HeadersInit {
    const token = this.getAccessToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  /**
   * Get access token from storage
   */
  private getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('access_token');
  }

  /**
   * Set access token to storage
   */
  public setAccessToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', token);
    }
  }

  /**
   * Remove access token from storage
   */
  public removeAccessToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }

  /**
   * Main request method
   */
  public async request<T = any>(
    endpoint: string,
    method: HttpMethod = 'GET',
    data?: any,
    config: RequestConfig = {}
  ): Promise<T> {
    const { timeout = this.timeout, skipAuth = false, ...restConfig } = config;

    const url = `${this.baseUrl}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(skipAuth ? {} : this.getAuthHeaders()),
      ...restConfig.headers,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
        signal: controller.signal,
        ...restConfig,
      });

      clearTimeout(timeoutId);

      // Handle non-JSON responses
      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        if (!response.ok) {
          throw new ApiError(
            'HTTP_ERROR',
            `HTTP ${response.status}: ${response.statusText}`,
            response.status
          );
        }
        return (await response.text()) as any;
      }

      const result: ApiResponse<T> = await response.json();

      if (!response.ok) {
        throw new ApiError(
          result.error?.code || 'API_ERROR',
          result.error?.message || 'An error occurred',
          response.status,
          result.error?.details
        );
      }

      if (!result.success) {
        throw new ApiError(
          result.error?.code || 'API_ERROR',
          result.error?.message || 'Request failed',
          response.status,
          result.error?.details
        );
      }

      return result.data as T;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof ApiError) {
        throw error;
      }

      if ((error as Error).name === 'AbortError') {
        throw new ApiError('TIMEOUT', 'Request timeout');
      }

      throw new ApiError(
        'NETWORK_ERROR',
        error instanceof Error ? error.message : 'Network error occurred'
      );
    }
  }

  /**
   * Upload file with multipart/form-data
   */
  public async uploadFile<T = any>(
    endpoint: string,
    file: File,
    additionalData?: Record<string, any>
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const formData = new FormData();
    formData.append('file', file);

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, typeof value === 'object' ? JSON.stringify(value) : value);
      });
    }

    const headers: HeadersInit = {
      ...this.getAuthHeaders(),
      // Don't set Content-Type for FormData, browser will set it with boundary
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: formData,
      });

      const result: ApiResponse<T> = await response.json();

      if (!response.ok || !result.success) {
        throw new ApiError(
          result.error?.code || 'UPLOAD_ERROR',
          result.error?.message || 'Upload failed',
          response.status,
          result.error?.details
        );
      }

      return result.data as T;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        'UPLOAD_ERROR',
        error instanceof Error ? error.message : 'Upload failed'
      );
    }
  }

  // Convenience methods
  public get<T = any>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, 'GET', undefined, config);
  }

  public post<T = any>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, 'POST', data, config);
  }

  public put<T = any>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, 'PUT', data, config);
  }

  public patch<T = any>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, 'PATCH', data, config);
  }

  public delete<T = any>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, 'DELETE', undefined, config);
  }
}

// Export singleton instance
export const apiClient = new ApiClient(API_CONFIG.BASE_URL, API_CONFIG.TIMEOUT);
export default apiClient;
