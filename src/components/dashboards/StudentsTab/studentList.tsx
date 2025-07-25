"use client";

import { Card, CardContent } from "@/components/ui/card";
import StudentItem from "./studentItem";

interface StudentListProps {
  students: StudentSymple[];
  onDelete: (id: string) => void;
}

export default function StudentList({ students, onDelete }: StudentListProps) {
  return (
    <Card className="mt-6">
      <CardContent className="space-y-4">
        {students.map((student) => (
          <StudentItem key={student.id} student={student} onDelete={onDelete} />
        ))}
      </CardContent>
    </Card>
  );
}
