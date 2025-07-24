import Link from "next/link";
import { Button } from "./button";
import Logo from "./logo/notoriaLogo";

export default function Header() {
  return (
    <div className="flex items-center justify-between w-full px-2 py-4">
      <Logo />
      <div className="flex gap-2">
        <Button variant="ghost">
          {" "}
          <Link href="/login">Entrar</Link>
        </Button>
        <Button className="bg-emerald-500 hover:bg-emerald-600">
          <Link href="/login">Começar Grátis</Link>
        </Button>
      </div>
    </div>
  );
}
