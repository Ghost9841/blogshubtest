// store/authStore.ts
import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  token: string;
  createdAt?: string; // we will store this on register
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (partial: Partial<User>) => void; // ← NEW
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  hydrate: () => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("user");
    if (saved) set({ user: JSON.parse(saved), isAuthenticated: true });
  },

  login: (user) => {
    set({ user, isAuthenticated: true });
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", user.token);
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },

  updateUser: (partial) =>
    set((state) => {
      if (!state.user) return state;
      const updated = { ...state.user, ...partial };
      localStorage.setItem("user", JSON.stringify(updated));
      return { user: updated };
    }),
}));

export default useAuthStore;