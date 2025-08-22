"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getInitials } from "@/utils/getInitials";

interface StudentListProps {
  students: Student[];
  selectStudent: (student: Student) => void;
}

export default function StudentList({
  students,
  selectStudent,
}: StudentListProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      <Separator orientation="horizontal" className="my-4" />

      {students.map((s) => (
        <Card
          key={s.id}
          onClick={() => selectStudent(s)}
          className="flex flex-col items-start p-1 cursor-pointer hover:bg-gray-100 mb-2"
        >
          <div className="flex items-center gap-2 p-2 cursor-pointer">
            <Avatar className="w-10 h-10">
              <AvatarFallback>{getInitials(s.name)}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col flex-1">
              <span className="font-medium">{s.name}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
