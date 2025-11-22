"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { redirect } from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, hydrate } = useAuthStore();

  useEffect(() => {
    hydrate();
  }, []);

  if (!user) {
    return redirect("/login");
  }

  return <>{children}</>;
}
