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
}

export const useAuthStore = create<AuthState>((set) => ({
  user: typeof window !== "undefined" && localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
  isAuthenticated: typeof window !== "undefined" && !!localStorage.getItem("user"),
  
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
