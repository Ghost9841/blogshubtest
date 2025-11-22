import { useAuthStore } from "@/store/authStore";
import axios from "axios";

const API = "https://67566fc611ce847c992cc7b5.mockapi.io/users/users";

export function useAuth() {
  const { login } = useAuthStore();

  const loginUser = async (email: string, password: string) => {
    const { data } = await axios.get(API);

    const found = data.find(
      (u: any) => u.email === email && u.password === password
    );

    if (!found) throw new Error("Invalid credentials");

    login(found);
    return found;
  };

  return { loginUser };
}
