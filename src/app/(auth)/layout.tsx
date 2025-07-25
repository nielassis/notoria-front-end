"use client";

import Logo from "@/components/ui/logo/notoriaLogo";
import { AuthProvider, useAuth } from "@/contexts/authContext";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function AuthLayoutContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, role, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated && role) {
      router.replace(`/dashboard/${role}`);
    }
  }, [isAuthenticated, isLoading, role, router]);

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-100 px-4 py-10">
      <div className="mb-8">
        <div className="flex flex-col items-center gap-4">
          <span className="text-sm text-gray-500">
            <Link href="/" className="flex items-center cursor-pointer">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Voltar ao início
            </Link>
          </span>

          <Logo />
        </div>
      </div>
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
      <AuthLayoutContent>{children}</AuthLayoutContent>
    </AuthProvider>
  );
}
