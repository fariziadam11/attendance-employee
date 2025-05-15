import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '../types';

// Mock login credentials for demo
const ADMIN_EMAIL = 'admin@company.com';
const ADMIN_PASSWORD = 'admin123';
const EMPLOYEE_EMAIL = 'employee@company.com';
const EMPLOYEE_PASSWORD = 'employee123';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulating API call delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          let user: User | null = null;
          
          // Mock authentication logic
          if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            user = {
              id: 'admin-id',
              name: 'Admin User',
              email: ADMIN_EMAIL,
              role: 'admin',
              profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
            };
          } else if (email === EMPLOYEE_EMAIL && password === EMPLOYEE_PASSWORD) {
            user = {
              id: 'employee-id',
              name: 'John Employee',
              email: EMPLOYEE_EMAIL,
              role: 'employee',
              profileImage: 'https://randomuser.me/api/portraits/men/43.jpg',
            };
          } else {
            throw new Error('Invalid email or password');
          }
          
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'An error occurred', 
            isLoading: false 
          });
        }
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);