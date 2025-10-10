/**
 * Authentication-related type definitions
 */

import { User, UserRole } from './user.types';

export interface LineProfile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  token_type: string;
}

export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
  is_new_user: boolean;
  requires_pdpa: boolean;
}

export interface LineLoginRequest {
  code: string;
  redirect_uri: string;
  state?: string;
}

export interface PDPAConsentRequest {
  consent: boolean;
  version?: string;
}

export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
