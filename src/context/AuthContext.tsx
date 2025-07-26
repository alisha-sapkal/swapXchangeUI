import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface User {
  _id: string;
  fullName: string;
  email: string;
}

interface AuthContextType {
  accessToken: string | null;
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string, onSuccess?: Function) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const API_URL = import.meta.env.VITE_API_URL || 'https://swapxchange-backend.onrender.com';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setIsAuthenticated(!!accessToken);
  }, [accessToken]);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('accessToken');
    const storedUser = sessionStorage.getItem('user');
    
    if (storedToken) {
      setAccessToken(storedToken);
    }
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        sessionStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (email: string, password: string, onSuccess?: Function) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      
      setAccessToken(data.token);
      sessionStorage.setItem("accessToken", data.token);
      
      const userData = {
        _id: data.user._id,
        fullName: data.user.fullName,
        email: data.user.email
      };
      setUser(userData);
      sessionStorage.setItem("user", JSON.stringify(userData));
      
      document.cookie = `refreshToken=${data.refreshToken}; Secure; SameSite=Strict; path=/;`;
      document.cookie = `token=${data.token}; Secure; SameSite=Strict; path=/;`;
      
      console.log("User logged in successfully:", userData);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error instanceof Error ? error.message : "Could not log in. Please try again later.");
      throw error;
    }
  };
  
  const logout = () => {
    setAccessToken(null);
    setUser(null);
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('user');
    document.cookie = 'refreshToken=; Max-Age=0; path=/;';
    document.cookie = 'token=; Max-Age=0; path=/;';
    console.log('User logged out');
  };

  const refreshToken = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const data = await response.json();
      setAccessToken(data.accessToken);
      sessionStorage.setItem('accessToken', data.accessToken);
      console.log('Access token refreshed');
    } catch (error) {
      console.error('An error occurred during token refresh:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(
      () => {
        refreshToken();
      },
      14 * 60 * 1000,
    ); 
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider
      value={{ accessToken, isAuthenticated, user, setUser, login, logout, refreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
