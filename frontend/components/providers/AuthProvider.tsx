'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { AuthType } from '@/types/users';
import fetchAuth from '@/lib/auth/fetchAuth';

/**
 * The shape of the context value provided by the AuthContext.
 */
export interface AuthContextType extends AuthType {
  isLoading: boolean;
  setAuth: (auth: AuthType) => void;
  updateAuth: () => void;
}

// Create an AuthContext to share authentication state across the app
const AuthContext = createContext<AuthContextType | null>(null);

/**
 * AuthProvider component that manages and provides authentication context.
 * It fetches the authentication status from the server and stores it in state.
 *
 * @param {ReactNode} children - The child components to render inside the provider.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  // Local state for managing authentication information
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [id, setId] = useState<number | null>(null);
  const [username, setUsername] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * Sets authentication state with the provided AuthType.
   * @param {AuthType} auth - The authentication data to set.
   */
  const setAuth = useCallback(({ isAuthenticated, id, username }: AuthType) => {
    setIsAuthenticated(isAuthenticated);
    setId(id);
    setUsername(username);
  }, []);

  /**
   * Fetches the authentication data from the server and updates the context.
   * If no data is found, it sets the context to unauthenticated.
   */
  const fetchAuthWrapper = useCallback(async () => {
    const fetchedAuth = await fetchAuth();
    if (fetchedAuth) {
      setAuth({
        isAuthenticated: fetchedAuth.isAuthenticated,
        id: Number(fetchedAuth?.id),
        username: fetchedAuth?.username,
      });
    } else {
      setAuth({
        isAuthenticated: false,
        id: null,
        username: '',
      });
    }
  }, [setAuth]);

  /**
   * Updates the authentication context by re-fetching auth data from the server.
   */
  const updateAuth = async () => {
    await fetchAuthWrapper();
  };

  // Initialize the auth state from localStorage if available, otherwise fetch it
  useEffect(() => {
    const storedIsAuthenticated =
      localStorage.getItem('isAuthenticated') === 'true';
    const storedId = parseInt(localStorage.getItem('id') || '');
    const storedUsername = localStorage.getItem('username') || '';

    if (storedIsAuthenticated && !isNaN(storedId) && storedUsername) {
      setAuth({
        isAuthenticated: storedIsAuthenticated,
        id: storedId,
        username: storedUsername,
      });
    } else {
      fetchAuthWrapper();
    }

    setIsLoading(false);
  }, [fetchAuthWrapper, setAuth]);

  // Store authentication state in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    localStorage.setItem('id', JSON.stringify(id));
    localStorage.setItem('username', username);
  }, [isAuthenticated, id, username]);

  // Provide authentication state and functions to the rest of the app
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        id,
        username,
        isLoading,
        setAuth,
        updateAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to access authentication context.
 * Throws an error if used outside of the AuthProvider.
 *
 * @returns {AuthContextType} - The authentication context values.
 * @throws {Error} - Throws an error if used outside the provider.
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
