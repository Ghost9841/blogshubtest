import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  token: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  hydrate: () => void; 
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  hydrate: () => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("user");

    if (saved) {
      set({ user: JSON.parse(saved), isAuthenticated: true });
    }
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
}));

export default useAuthStore;