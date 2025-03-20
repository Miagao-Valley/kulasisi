'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { User } from '@/types/users';
import fetchAuth from '@/lib/auth/fetchAuth';
import getUser from '@/lib/users/getUser';

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  updateAuth: () => void;
  updateUser: () => void;
  isLoading: boolean;
}

const AUTH_DATA_KEY = 'auth-data';

const AuthContext = createContext<AuthContextType | null>(null);

/**
 * Provider that manages and provides authentication context.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * Fetches the authentication data from the server and updates the context.
   */
  const updateAuth = useCallback(async () => {
    const authData = await fetchAuth();
    if (authData) {
      setIsAuthenticated(authData.isAuthenticated);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  const updateUser = useCallback(async () => {
    const authData = await fetchAuth();
    if (authData) {
      const userData = await getUser(authData?.username);
      setUser(userData);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  // Initialize the auth state from localStorage if available, otherwise fetch it
  useEffect(() => {
    const storedAuth = localStorage.getItem(AUTH_DATA_KEY);
    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth);
        if (parsedAuth.isAuthenticated) {
          setIsAuthenticated(parsedAuth.isAuthenticated);
          setUser(parsedAuth.user);
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.error('Error parsing stored auth data:', error);
      }
    }

    updateAuth();
    setIsLoading(false);
  }, [updateAuth, updateUser]);

  // Persist the auth state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      AUTH_DATA_KEY,
      JSON.stringify({ isAuthenticated, user })
    );
  }, [isAuthenticated, user]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        updateAuth,
        updateUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to access authentication context.
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
