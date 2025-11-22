"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { redirect } from "next/navigation";

export default function ProtectedRoute({ children }: {children: React.ReactNode}) {
  const { user, hydrate } = useAuthStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    hydrate();
    setReady(true);
  }, []);

  if (!ready) return null; // Wait for hydration

  if (!user) {
    redirect("/login");
  }

  return children;
}
