"use client";

import Link from "next/link";
import { Button } from "./button";
import Logo from "./logo/notoriaLogo";

export default function Header() {
  return (
    <div className="flex items-center sticky justify-between w-full p-4 bg-white shadow-sm border-b">
      <Logo />
      <div className="flex gap-2">
        <Button variant="ghost">
          <Link href="/login">Entrar</Link>
        </Button>
        <Button className="bg-emerald-500 hover:bg-emerald-600">
          <Link href="/login">Começar Grátis</Link>
        </Button>
      </div>
    </div>
  );
}
