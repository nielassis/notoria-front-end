"use client";
import { getByIdClassroom } from "@/actions/teacher/classrooom/getByIdClassroom";
import { getAllStudentsInClassroom } from "@/actions/teacher/students/getStudentsInClassroom";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { formatDate } from "@/utils/formatDate";
import { getInitials } from "@/utils/getInitials";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Plus, Users2 } from "lucide-react";
import { useParams } from "next/navigation";
import { startTransition, useEffect, useState } from "react";

export default function ClassTeacherPage() {
  useProtectedRoute("teacher");
  const [classname, setClassname] = useState("");
  const [classCreatedAt, setClassCreatedAt] = useState("");
  const [countStudents, setCountStudents] = useState<number>();
  const [students, setStudents] = useState<StudentWithScore[]>([]);

  const params = useParams();
  const classId = params.id as string;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    startTransition(async () => {
      const response = await getByIdClassroom(classId, token);

      const data = await response?.data;
      console.log(data);
      setClassname(data.classroom.name);
      setClassCreatedAt(data.classroom.createdAt);
      setCountStudents(data.count);
    });

    startTransition(() => {
      (async () => {
        const data = await getAllStudentsInClassroom(classId, token);

        console.log(data);

        if (Array.isArray(data)) {
          setStudents(data);
        } else {
          setStudents([]);
        }
      })();
    });
  }, [classId]);

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">{classname}</h1>
      <p className="text-gray-600 mt-2 sm:w-1/2">
        Nesta página, você pode acompanhar todos os detalhes da turma: lista de
        alunos, atividades criadas, notas atribuídas e o progresso geral dos
        estudantes.
      </p>

      <div className="flex items-center gap-2">
        <p className="font-bold mt-2 flex">
          <Users2 className="mr-2" />
          {countStudents} {countStudents === 1 ? "Aluno" : "Alunos"}
        </p>

        <span>|</span>

        <p className="mt-2 flex">{formatDate(classCreatedAt, "YY. M")}</p>
      </div>

      <div className="mt-8 flex flex-col lg:flex-row gap-4">
        <Card className="w-full lg:w-[30%] max-h-50 overflow-auto">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Alunos</CardTitle>
              <Button
                size="sm"
                className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden md:inline">Adicionar aluno</span>
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 items-center">
            {students.map((student) => (
              <div
                key={student.student.id}
                className="flex items-center gap-4 p-3 border rounded-lg shadow-sm bg-white"
              >
                <Avatar>
                  <AvatarFallback className="flex items-center justify-center w-full h-full bg-slate-200 font-semibold">
                    {getInitials(student.student.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">
                    {student.student.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {student.student.email}
                  </p>
                </div>
              </div>
            ))}

            {students.length === 0 && (
              <p className="text-sm text-gray-500 text-center">
                Nenhum aluno cadastrado ainda.
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="w-full lg:w-[70%]"></Card>
      </div>
    </div>
  );
}
