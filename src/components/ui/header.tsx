"use client";

import Link from "next/link";
import { Button } from "./button";
import Logo from "./logo/notoriaLogo";
import { useAuth } from "@/contexts/authContext";
import { ArrowRight } from "lucide-react";

export default function Header() {
  const { isAuthenticated, role } = useAuth();
  console.log(isAuthenticated, role);

  return (
    <div className="flex items-center sticky justify-between w-full p-4 bg-white shadow-sm border-b">
      <Logo />
      <div className="flex gap-2">
        {!isAuthenticated ? (
          <>
            <Button variant="ghost">
              <Link href="/login">Entrar</Link>
            </Button>
            <Button className="bg-emerald-500 hover:bg-emerald-600">
              <Link href="/login">Começar Grátis</Link>
            </Button>
          </>
        ) : (
          <Button>
            <Link href={`/dashboard/${role}`} className="flex items-center">
              <ArrowRight className="mr-2" />
              Ir para meu Dashboard
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
