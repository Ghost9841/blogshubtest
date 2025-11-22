"use client";

import { useAuthStore } from "@/store/authStore";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthContext({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);

    if (isAuthenticated) {
      redirect("/dashboard");
    }
  }, [isAuthenticated]);

  if (!checked) return null;

  return <>{children}</>;
}
