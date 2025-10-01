import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { isTokenExpired } from '../utils/jwtUtils';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      permissions: null,
      
      login: (userData, token) => {
        console.log('Auth store login - userData:', userData);
        console.log('Auth store login - permissions:', userData?.permissions);
        if (isTokenExpired(token)) {
          set({ user: null, token: null, isAuthenticated: false, permissions: null });
          return;
        }
        set({ 
          user: userData, 
          token: token, 
          isAuthenticated: true,
          permissions: userData?.permissions || null
        });
      },
      
      logout: () => set({ 
        user: null, 
        token: null, 
        isAuthenticated: false,
        permissions: null
      }),
      
      updateUser: (userData) => set({ user: userData }),
      
      checkAuth: () => {
        const state = get();
        if (state.token && isTokenExpired(state.token)) {
          set({ user: null, token: null, isAuthenticated: false, permissions: null });
          return false;
        }
        return state.isAuthenticated;
      },
      
      getToken: () => get().token,
      getUser: () => get().user,
      getPermissions: () => {
        const permissions = get().permissions;
        console.log('getPermissions called, returning:', permissions);
        return permissions;
      },
    }),
    {
      name: 'dental-auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        isAuthenticated: state.isAuthenticated,
        permissions: state.permissions
      }),
    }
  )
);