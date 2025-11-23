import { useState, useEffect } from "react";
import { api } from "@/lib/axios";

export function useUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/users"); // ← your mock/json-server
      setUsers(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  return { users, loading };
}