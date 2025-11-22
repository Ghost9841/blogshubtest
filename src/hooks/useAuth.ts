import { api } from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";

export function useAuth() {
  const { login, logout } = useAuthStore();

  const loginUser = async (email: string, password: string) => {
    const { data } = await api.get("/users");

    const found = data.find(
      (u: any) => u.email === email && u.password === password
    );

    if (!found) throw new Error("Invalid credentials");

    login(found);

    return found;
  };

  const registerUser = async (payload: any) => {
    const { data } = await api.post("/users", {
      ...payload,
      token: crypto.randomUUID(), 
      avatar: `https://api.dicebear.com/8.x/thumbs/svg?seed=${payload.name}`,
      createdAt: new Date().toISOString(),
    });

    login(data);

    return data;
  };

  const logoutUser = () => logout();

  return { loginUser, registerUser, logoutUser };
}
