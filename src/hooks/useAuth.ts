import { api } from "@/lib/axios";
import { generateJWT } from "@/lib/jwt";
import { useAuthStore } from "@/store/authStore";

export function useAuth() {
  const { login, logout } = useAuthStore();

  const registerUser = async (payload: any) => {
    // generate JWT token
    const token = await generateJWT({
      email: payload.email,
      name: payload.name,
    });

    // send user to mockapi
    const { data } = await api.post("/users", {
      ...payload,
      token,
      avatar: `https://api.dicebear.com/8.x/thumbs/svg?seed=${payload.name}`,
      createdAt: new Date().toISOString(),
    });

    login(data); // auto login

    return data;
  };

  const loginUser = async (email: string, password: string) => {
    const { data } = await api.get("/users");

    const found = data.find(
      (u: any) => u.email === email && u.password === password
    );

    if (!found) throw new Error("Invalid credentials");

    login(found);

    return found;
  };

  const logoutUser = () => logout();

  return { loginUser, registerUser, logoutUser };
}
