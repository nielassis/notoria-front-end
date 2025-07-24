import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useProtectedRoute(expectedRole: "teacher" | "student") {
  const { isAuthenticated, role, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated || role !== expectedRole) {
      router.push("/login");
    }
  }, [isAuthenticated, role, expectedRole, router, isLoading]);
}
