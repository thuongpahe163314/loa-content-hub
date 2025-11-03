import { apiClient } from '@/lib/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  role?: 'ADMIN' | 'EDITOR' | 'CONTENT_CREATOR' | 'VIEWER';
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'EDITOR' | 'CONTENT_CREATOR' | 'VIEWER';
  };
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    return response;
  },

  signup: async (data: SignupData): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/signup', data);
    return response;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },

  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/me');
    return response;
  },
};
