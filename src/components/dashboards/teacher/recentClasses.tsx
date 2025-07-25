"use client";

import getAllTeacherClassroom from "@/actions/teacher/classrooom/getAllTeacherClassroom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function RecentClasses() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClassrooms = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("Token não encontrado");
        return;
      }

      try {
        const response = await getAllTeacherClassroom(token);
        if (response) setClasses(response);
      } catch (error) {
        console.error("Erro ao buscar turmas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClassrooms();
  }, []);

  return (
    <Card className="w-full lg:w-1/2 ">
      <CardHeader>
        <CardTitle className="text-lg">Turmas Recentes</CardTitle>
        <p className="text-sm text-muted-foreground">
          Suas turmas com atividade recente
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Carregando...</p>
        ) : classes.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nenhuma turma encontrada.
          </p>
        ) : (
          classes.map((classroom) => (
            <div
              key={classroom.id}
              className="rounded-lg border cursor-pointer p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{classroom.name}</p>
                <p className="text-sm text-muted-foreground">
                  {classroom._count.students} alunos
                </p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
