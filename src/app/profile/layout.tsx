"use client";

import DashboardHeader from "@/components/dashboards/header";
import { AuthProvider, useAuth } from "@/contexts/authContext";

function ProfileWrapper({ children }: { children: React.ReactNode }) {
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <DashboardHeader signOut={signOut} />
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
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
      <ProfileWrapper>{children}</ProfileWrapper>
    </AuthProvider>
  );
}
