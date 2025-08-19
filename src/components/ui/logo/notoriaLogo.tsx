import { GraduationCap } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center space-x-2 cursor-pointer">
        <GraduationCap className="h-8 w-8 text-emerald-500 " />
        <span
          className="text-xl font-bold"
          style={{ fontFamily: "Euphoria Script, cursive" }}
        >
          Notoria
        </span>
      </div>
    </Link>
  );
}
