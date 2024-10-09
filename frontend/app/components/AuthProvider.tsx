'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { AuthType } from '@/types';
import fetchAuth from '@/lib/auth/fetchAuth';

interface AuthContextType extends AuthType {
  setAuth: (auth: AuthType) => void;
  updateAuth: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [id, setId] = useState<number | null>(null);
  const [username, setUsername] = useState<string>('');

  const setAuth = useCallback(({ isAuthenticated, id, username }: AuthType) => {
    setIsAuthenticated(isAuthenticated);
    setId(id);
    setUsername(username);
  }, []);

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

  const updateAuth = async () => {
    await fetchAuthWrapper();
  };

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
  }, [fetchAuthWrapper, setAuth]);

  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    localStorage.setItem('id', JSON.stringify(id));
    localStorage.setItem('username', username);
  }, [isAuthenticated, id, username]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        id,
        username,
        setAuth,
        updateAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
