"use client";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

export default function TeacherDashboard() {
  useProtectedRoute("teacher");

  return <div>Área do professor</div>;
}
