import Header from "@/components/ui/header";
import { AuthProvider } from "@/contexts/authContext";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-emerald-50 to-slate-100 px-4 py-10">
      <Header />
      <AuthProvider>{children}</AuthProvider>
    </div>
  );
}
