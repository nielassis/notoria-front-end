"use client";

import { getStudentClassroomById } from "@/actions/student/classrooms/getStudentClassroomById";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { useParams } from "next/navigation";
import { startTransition, useEffect, useState } from "react";

export default function ClassStudentPage() {
  useProtectedRoute("student");
  const [classname, setClassname] = useState("");

  const params = useParams();
  const classroomId = params.id as string;
  console.log("Id da turma: ", classroomId);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    startTransition(async () => {
      const response = await getStudentClassroomById({ classroomId, token });
      if (response) setClassname(response.name);
    });
  }, [classroomId]);

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">{classname}</h1>
      <p className="text-gray-600 mt-2 sm:w-1/2">
        Nesta página, você pode acompanhar todos os detalhes da turma: lista de
        atividades criadas, notas atribuídas e o progresso geral.
      </p>
    </div>
  );
}
