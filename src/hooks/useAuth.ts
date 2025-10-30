import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'EDITOR' | 'CONTENT_CREATOR' | 'VIEWER';
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => {
  // Load from localStorage on init
  const storedToken = localStorage.getItem('auth_token');
  const storedUser = localStorage.getItem('auth_user');
  
  return {
    token: storedToken,
    user: storedUser ? JSON.parse(storedUser) : null,
    isAuthenticated: !!storedToken,
    
    login: (token: string, user: User) => {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(user));
      set({ token, user, isAuthenticated: true });
    },
    
    logout: () => {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      set({ token: null, user: null, isAuthenticated: false });
    },
  };
});
