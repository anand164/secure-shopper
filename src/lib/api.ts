
import { LoginCredentials, RegisterCredentials, ApiResponse, User, Product } from '../types';
import { toast } from "@/components/ui/use-toast";

// In a real application, this would be an environment variable
const API_URL = 'https://fakestoreapi.com';

/**
 * Makes a request to the API with the appropriate headers
 */
async function apiRequest<T>(
  endpoint: string, 
  method: string = 'GET', 
  body?: any, 
  requiresAuth: boolean = false
): Promise<ApiResponse<T>> {
  try {
    const token = localStorage.getItem('token');
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };

    if (requiresAuth && token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const options: RequestInit = {
      method,
      headers,
      credentials: 'include',
    };

    if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_URL}${endpoint}`, options);
    
    // For the purposes of this demonstration, we'll simulate JWT behavior
    // using the fake store API responses

    // Handle authentication responses specifically - in a real app, 
    // this would be part of your backend API response
    if (endpoint === '/auth/login') {
      // Simulate JWT auth with fakestore API
      if (response.ok) {
        const data = await response.json();
        
        // Create a fake JWT token with user info embedded
        const fakeUser = {
          id: 'user_' + Math.random().toString(36).substr(2, 9),
          firstName: body.username || 'John', // Use username as firstName for the demo
          email: body.username + '@example.com'
        };
        
        const fakeToken = btoa(JSON.stringify(fakeUser));
        localStorage.setItem('token', fakeToken);
        localStorage.setItem('user', JSON.stringify(fakeUser));
        
        return {
          success: true,
          data: { ...fakeUser, token: fakeToken } as T
        };
      } else {
        throw new Error('Authentication failed');
      }
    }

    if (endpoint === '/users') {
      // Simulate user registration - in a real app, this would create a user in your database
      if (response.ok) {
        const fakeUser = {
          id: 'user_' + Math.random().toString(36).substr(2, 9),
          firstName: body.firstName || 'New User',
          email: body.email
        };
        
        const fakeToken = btoa(JSON.stringify(fakeUser));
        localStorage.setItem('token', fakeToken);
        localStorage.setItem('user', JSON.stringify(fakeUser));
        
        return {
          success: true,
          data: { ...fakeUser, token: fakeToken } as T
        };
      } else {
        throw new Error('Registration failed');
      }
    }

    // Normal response handling
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }
    
    // For products endpoint, add pagination info (simulated)
    if (endpoint.includes('/products') && Array.isArray(data)) {
      return {
        success: true,
        data: data as T,
        pagination: {
          currentPage: Number(new URLSearchParams(endpoint.split('?')[1]).get('page')) || 1,
          totalPages: Math.ceil(data.length / 10),
          totalItems: 20, // In a real API, this would come from the server
          itemsPerPage: 10
        }
      };
    }
    
    return {
      success: true,
      data: data as T
    };
  } catch (error) {
    console.error('API request failed:', error);
    
    let errorMessage = 'An unexpected error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    toast({
      variant: "destructive",
      title: "Error",
      description: errorMessage,
    });
    
    return {
      success: false,
      error: errorMessage
    };
  }
}

// Auth functions
export async function login(credentials: LoginCredentials): Promise<ApiResponse<User>> {
  return apiRequest<User>('/auth/login', 'POST', { 
    username: credentials.email, // Adjust to match fakestore API
    password: credentials.password 
  });
}

export async function register(credentials: RegisterCredentials): Promise<ApiResponse<User>> {
  return apiRequest<User>('/users', 'POST', credentials);
}

// Products API
export async function getProducts(page: number = 1, limit: number = 10): Promise<ApiResponse<Product[]>> {
  // We'll use the fake store API but simulate pagination
  // In a real app, you would use your actual API endpoint with pagination parameters
  return apiRequest<Product[]>(`/products?limit=${limit}`, 'GET', undefined, true);
}

// Function to check if user is authenticated by validating token
export function isAuthenticated(): boolean {
  const token = localStorage.getItem('token');
  if (!token) return false;
  
  try {
    // In a real application, you would verify the JWT expiration, etc.
    // Here we just check if it exists and can be decoded
    const userData = JSON.parse(atob(token));
    return !!userData.id;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
}

// Get current user from token
export function getCurrentUser(): User | null {
  if (!isAuthenticated()) return null;
  
  const userString = localStorage.getItem('user');
  if (!userString) return null;
  
  try {
    return JSON.parse(userString);
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
}
