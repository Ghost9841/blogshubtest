"use client";
import useAuthStore from "@/store/authStore";
import { redirect } from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.user);

  if (!user) redirect("/login");

  return <>{children}</>;
}
