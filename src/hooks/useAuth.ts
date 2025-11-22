import { api } from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";


export function useAuth() {
  const { login } = useAuthStore();

  const loginUser = async (email: string, password: string) => {
    const { data } = await api.get("/users");

    const found = data.find(
      (u: any) => u.email === email && u.password === password
    );

    if (!found) throw new Error("Invalid credentials");

    login(found); // Saves user + token to localStorage
    return found;
  };

  const logoutUser = () => {
    useAuthStore.getState().logout();
  };

  return { loginUser, logoutUser };
}
