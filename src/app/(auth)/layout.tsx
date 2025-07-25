import Logo from "@/components/ui/logo/notoriaLogo";
import { AuthProvider } from "@/contexts/authContext";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <AuthProvider>{children}</AuthProvider>
    </div>
  );
}
