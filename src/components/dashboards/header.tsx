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
import { LogOutIcon, User } from "lucide-react";
import { useAuth } from "@/contexts/authContext";
import { usePathname } from "next/navigation";
import { getInitials } from "@/utils/getInitials";
import Link from "next/link";

interface HeaderProps {
  signOut: () => void;
}

export default function DashboardHeader({ signOut }: HeaderProps) {
  const { name } = useAuth();
  const initials = name ? getInitials(name) : "??";

  const pathname = usePathname();
  const profilePath = `${pathname}/profile`;

  return (
    <div className="flex items-center justify-between w-full p-4 bg-white shadow-sm border-b">
      <Logo />
      <div className="flex gap-2">
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
