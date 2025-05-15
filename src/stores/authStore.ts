import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '../types';
import { supabase } from '../lib/supabase';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          console.log('Attempting login with:', email);
          
          // For demo purposes - allow login with demo credentials
          if ((email === 'admin@company.com' && password === 'admin123') ||
              (email === 'employee@company.com' && password === 'employee123')) {
            
            const isAdmin = email === 'admin@company.com';
            const user: User = {
              id: isAdmin ? 'admin-id' : 'employee-id',
              name: isAdmin ? 'Admin User' : 'John Employee',
              email: email,
              role: isAdmin ? 'admin' : 'employee',
              profileImage: isAdmin ? 'https://randomuser.me/api/portraits/men/32.jpg' : 'https://randomuser.me/api/portraits/men/43.jpg',
            };
            
            set({ user, isAuthenticated: true, isLoading: false });
            return;
          }
          
          // Authenticate with Supabase
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          
          if (error) {
            console.error('Supabase auth error:', error);
            throw error;
          }
          
          if (!data.user) throw new Error('User not found');
          
          console.log('Supabase auth successful, fetching user data');
          
          // Get user profile data from users table
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', data.user.id)
            .single();
          
          if (userError) {
            console.error('User data fetch error:', userError);
            throw userError;
          }
          
          const user: User = {
            id: data.user.id,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            profileImage: userData.profile_image,
          };
          
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          console.error('Login error:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Invalid login credentials', 
            isLoading: false 
          });
        }
      },
      
      register: async (email: string, password: string, name: string, role: 'admin' | 'employee' = 'employee') => {
        set({ isLoading: true, error: null });
        
        try {
          console.log('Attempting registration for:', email);
          
          // For demo purposes - simulate successful registration
          if (email.includes('@') && password.length >= 6) {
            // Simulate successful registration
            console.log('Demo registration successful');
            set({ isLoading: false });
            return { success: true };
          }
          
          // Register with Supabase Auth
          console.log('Registering with Supabase Auth');
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                name: name,
                role: role
              }
            }
          });
          
          if (error) {
            console.error('Supabase auth signup error:', error);
            throw error;
          }
          
          if (!data.user) throw new Error('Failed to create user');
          
          console.log('Supabase auth signup successful, creating user profile');
          
          // Create user profile in users table
          const { error: profileError } = await supabase
            .from('users')
            .insert({
              id: data.user.id,
              email,
              name,
              role,
            });
          
          if (profileError) {
            console.error('User profile creation error:', profileError);
            throw profileError;
          }
          
          console.log('User profile created successfully');
          
          // Don't automatically sign in after registration
          return { success: true };
        } catch (error) {
          console.error('Registration error:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Registration failed', 
            isLoading: false 
          });
          return { success: false, error };
        } finally {
          set({ isLoading: false });
        }
      },
      
      logout: async () => {
        await supabase.auth.signOut();
        set({ user: null, isAuthenticated: false });
      },
      
      checkSession: async () => {
        set({ isLoading: true });
        
        try {
          const { data } = await supabase.auth.getSession();
          
          if (data.session?.user) {
            // Get user profile data
            const { data: userData, error: userError } = await supabase
              .from('users')
              .select('*')
              .eq('id', data.session.user.id)
              .single();
            
            if (userError) throw userError;
            
            const user: User = {
              id: data.session.user.id,
              name: userData.name,
              email: userData.email,
              role: userData.role,
              profileImage: userData.profile_image,
            };
            
            set({ user, isAuthenticated: true });
          }
        } catch (error) {
          console.error('Session check error:', error);
        } finally {
          set({ isLoading: false });
        }
      },
      
      updateProfile: async (userData: Partial<User>) => {
        const currentUser = get().user;
        if (!currentUser) return { success: false, error: 'Not authenticated' };
        
        try {
          const { error } = await supabase
            .from('users')
            .update({
              name: userData.name,
              profile_image: userData.profileImage,
            })
            .eq('id', currentUser.id);
          
          if (error) throw error;
          
          set({ 
            user: { ...currentUser, ...userData } 
          });
          
          return { success: true };
        } catch (error) {
          return { 
            success: false, 
            error: error instanceof Error ? error.message : 'An error occurred' 
          };
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);