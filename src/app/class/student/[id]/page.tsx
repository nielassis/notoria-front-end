"use client";

import { getStudentClassroomById } from "@/actions/student/classrooms/getStudentClassroomById";
import ClassTab from "@/components/dashboards/student/classTab";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { formatDate } from "@/utils/formatDate";
import { Calendar } from "lucide-react";
import { useParams } from "next/navigation";
import { startTransition, useEffect, useState } from "react";

export default function ClassStudentPage() {
  useProtectedRoute("student");
  const [classname, setClassname] = useState("");
  const [classCreatedAt, setClassCreatedAt] = useState("");

  const params = useParams();
  const classroomId = params.id as string;
  console.log("Id da turma: ", classroomId);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    startTransition(async () => {
      const response = await getStudentClassroomById({ classroomId, token });
      if (response) {
        setClassname(response.name);
        setClassCreatedAt(response.createdAt);
      }
    });
  }, [classroomId]);

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">{classname}</h1>
      <p className="text-gray-600 mt-2 sm:w-1/2">
        Nesta página, você pode acompanhar todos os detalhes da turma: lista de
        atividades criadas, notas atribuídas e o progresso geral.
      </p>

      <div className="flex items-center gap-2">
        <p className="mt-2 flex">
          <Calendar className="mr-2" />
          {formatDate(classCreatedAt, "YY. M")}
        </p>
      </div>

      <div className="py-10">
        <ClassTab classroomId={classroomId} />
      </div>
    </div>
  );
}
