/**
 * Authentication Service
 * Handles LINE Login, PDPA consent, and user authentication
 */

import { apiClient, API_CONFIG } from '@/lib/api-client';
import {
  LineLoginRequest,
  LoginResponse,
  PDPAConsentRequest,
  User,
} from '@/types';
import {
  mockCurrentUser,
  mockUserProfile,
  delay,
} from '@/lib/mock-data-services';

class AuthService {
  /**
   * LINE Login
   */
  async lineLogin(request: LineLoginRequest): Promise<LoginResponse> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      return {
        user: mockCurrentUser,
        tokens: {
          access_token: 'mock_access_token_' + Date.now(),
          refresh_token: 'mock_refresh_token_' + Date.now(),
          expires_in: 3600,
          token_type: 'Bearer',
        },
        is_new_user: false,
        requires_pdpa: !mockCurrentUser.pdpa_consent,
      };
    }

    const response = await apiClient.post<LoginResponse>('/auth/line/login', request, {
      skipAuth: true,
    });

    // Store tokens
    if (response.tokens.access_token) {
      apiClient.setAccessToken(response.tokens.access_token);
      if (response.tokens.refresh_token) {
        localStorage.setItem('refresh_token', response.tokens.refresh_token);
      }
    }

    return response;
  }

  /**
   * Get LINE Login URL
   */
  getLineLoginUrl(redirectUri: string, state?: string): string {
    const lineChannelId = process.env.NEXT_PUBLIC_LINE_CHANNEL_ID;
    if (!lineChannelId) {
      throw new Error('LINE Channel ID is not configured');
    }

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: lineChannelId,
      redirect_uri: redirectUri,
      state: state || Math.random().toString(36).substring(7),
      scope: 'profile openid email',
    });

    return `https://access.line.me/oauth2/v2.1/authorize?${params.toString()}`;
  }

  /**
   * Accept PDPA Consent
   */
  async acceptPDPA(request: PDPAConsentRequest): Promise<User> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      return {
        ...mockCurrentUser,
        pdpa_consent: request.consent,
      };
    }

    return apiClient.post<User>('/auth/pdpa/consent', request);
  }

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<User> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      return mockCurrentUser;
    }

    return apiClient.get<User>('/auth/me');
  }

  /**
   * Logout
   */
  async logout(): Promise<void> {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      apiClient.removeAccessToken();
      return;
    }

    try {
      await apiClient.post('/auth/logout');
    } finally {
      apiClient.removeAccessToken();
    }
  }

  /**
   * Refresh token
   */
  async refreshToken(): Promise<LoginResponse> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    if (API_CONFIG.USE_MOCK) {
      await delay();
      return {
        user: mockCurrentUser,
        tokens: {
          access_token: 'mock_access_token_' + Date.now(),
          refresh_token: 'mock_refresh_token_' + Date.now(),
          expires_in: 3600,
          token_type: 'Bearer',
        },
        is_new_user: false,
        requires_pdpa: false,
      };
    }

    const response = await apiClient.post<LoginResponse>(
      '/auth/refresh',
      { refresh_token: refreshToken },
      { skipAuth: true }
    );

    // Update tokens
    if (response.tokens.access_token) {
      apiClient.setAccessToken(response.tokens.access_token);
      if (response.tokens.refresh_token) {
        localStorage.setItem('refresh_token', response.tokens.refresh_token);
      }
    }

    return response;
  }
}

export const authService = new AuthService();
export default authService;
