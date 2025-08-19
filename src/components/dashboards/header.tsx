import React from "react";
import Logo from "../ui/logo/notoriaLogo";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ArrowLeft, LogOutIcon, User } from "lucide-react";
import { useAuth } from "@/contexts/authContext";
import { usePathname } from "next/navigation";
import { getInitials } from "@/utils/getInitials";
import Link from "next/link";
import { Button } from "../ui/button";

interface HeaderProps {
  signOut: () => void;
}

export default function DashboardHeader({ signOut }: HeaderProps) {
  const { name, role } = useAuth();
  const initials = name ? getInitials(name) : "??";

  const pathname = usePathname();
  const profilePath = `/profile/${role}`;
  const isClassPath = pathname.startsWith("/class");

  return (
    <div className="flex items-center sticky justify-between w-full p-4 bg-white shadow-sm border-b">
      <Logo />

      <div className="flex gap-6">
        {isClassPath && (
          <Link
            href={`/dashboard/${role}`}
            className="mr-auto flex items-center gap-2"
          >
            <ArrowLeft className="md:hidden w-5 h-5" />

            <Button size="sm" className="hidden md:inline-flex">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para dashboard
            </Button>
          </Link>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={profilePath} className="flex gap-2">
                <User /> Perfil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive" onClick={signOut}>
              <LogOutIcon className="text-inherit" /> Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
