"use client";

import DashboardHeader from "@/components/dashboards/header";
import { AuthProvider, useAuth } from "@/contexts/authContext";

function DashboardWrapper({ children }: { children: React.ReactNode }) {
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <DashboardHeader signOut={signOut} />
      {children}
    </div>
  );
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <DashboardWrapper>{children}</DashboardWrapper>
    </AuthProvider>
  );
}
