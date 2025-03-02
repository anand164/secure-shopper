
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "@/components/ui/use-toast";
import { User, AuthContextType, LoginCredentials, RegisterCredentials } from '@/types';
import { login as apiLogin, register as apiRegister, getCurrentUser, isAuthenticated } from '@/lib/api';

// Create the Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in (on mount)
  useEffect(() => {
    const initAuth = () => {
      setLoading(true);
      try {
        if (isAuthenticated()) {
          const userData = getCurrentUser();
          if (userData) {
            setUser(userData);
          }
        }
      } catch (err) {
        console.error('Authentication initialization error:', err);
        setError(err instanceof Error ? err.message : 'Authentication failed');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiLogin({ email, password });
      
      if (response.success && response.data) {
        setUser(response.data);
        toast({
          title: "Login Successful",
          description: `Welcome back, ${response.data.firstName}!`,
        });
      } else {
        throw new Error(response.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Login failed');
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: err instanceof Error ? err.message : 'Invalid credentials',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (firstName: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiRegister({ firstName, email, password });
      
      if (response.success && response.data) {
        setUser(response.data);
        toast({
          title: "Registration Successful",
          description: `Welcome, ${firstName}!`,
        });
      } else {
        throw new Error(response.error || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err instanceof Error ? err.message : 'Registration failed');
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: err instanceof Error ? err.message : 'Could not create account',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
