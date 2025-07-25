"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import CreateNewStudentDialog from "../teacher/actions/createNewStudentDialog";

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function SearchBar({ search, setSearch }: SearchBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
      <div className="relative  w-full sm:w-64">
        <Search className="absolute bg-white left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input
          type="text"
          placeholder="Buscar aluno..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <CreateNewStudentDialog />
    </div>
  );
}
