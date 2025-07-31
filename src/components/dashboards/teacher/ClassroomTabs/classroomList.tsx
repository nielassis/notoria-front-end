"use client";

import { Card } from "@/components/ui/card";
import ClassroomItem from "./classroomItem";

interface ClassroomListProps {
  classroom: Class[];
  onDelete: (id: string) => void;
}

export default function ClassroomList({
  classroom,
  onDelete,
}: ClassroomListProps) {
  return (
    <div className="mt-8 ">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {classroom.map((classroom) => (
          <Card
            key={classroom.id}
            className="border-none shadow-none bg-transparent"
          >
            <ClassroomItem classroom={classroom} onDelete={onDelete} />
          </Card>
        ))}
      </div>
    </div>
  );
}
