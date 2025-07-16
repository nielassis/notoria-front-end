import { GraduationCap } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <GraduationCap className="h-8 w-8 text-emerald-500 " />
      <span
        className="text-xl font-bold"
        style={{ fontFamily: "Euphoria Script, cursive" }}
      >
        Notoria
      </span>
    </div>
  );
}
