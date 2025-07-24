"use client";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

export default function StudentDashboard() {
  useProtectedRoute("student");

  return <div>Área do aluno</div>;
}
