"use client";

import { getStudentClassrooms } from "@/actions/student/classrooms/getStudentClassrooms";
import React, { startTransition, useEffect, useState } from "react";
import { StudentClassroomCard } from "./studentClassroomCard";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";

export default function StudentClassroomTab() {
  const [classrooms, setClassrooms] = useState<StudentClassroom[]>([]);
  const { role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    startTransition(async () => {
      const response = await getStudentClassrooms(token);
      if (response) setClassrooms(response);
    });
  }, []);

  const handleCardClick = (id: string) => {
    router.push(`/class/${role}/${id}`);
  };

  return (
    <div className="p-4 w-full flex flex-wrap gap-4 cursor-pointer">
      {classrooms.map((classroom) => (
        <div
          className="w-full"
          onClick={() => handleCardClick(classroom.classroom.id)}
          key={classroom.id}
        >
          <StudentClassroomCard subject={classroom.classroom.name} />
        </div>
      ))}
    </div>
  );
}
