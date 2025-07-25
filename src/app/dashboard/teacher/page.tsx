"use client";

import getAllTeacherClassroom from "@/actions/teacher/classrooom/getAllTeacherClassroom";
import getAllTeacherStudents from "@/actions/teacher/getAllTeacherStudents";
import DashBoardCards from "@/components/dashboards/cards";
import TabsOverview from "@/components/dashboards/teacher/tabsOverview";
import { useAuth } from "@/contexts/authContext";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { User, LayoutDashboard, TrendingUp, Star } from "lucide-react";
import { startTransition, useEffect, useState } from "react";

export default function TeacherDashboard() {
  useProtectedRoute("teacher");
  const { name } = useAuth();

  const [studentCount, setStudentCount] = useState<number | null>(null);
  const [classroomCount, setClassroomCount] = useState<number | null>(null);

  useEffect(() => {
    startTransition(() => {
      const fetchStudents = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("Token não encontrado");
          return;
        }

        const response = await getAllTeacherStudents(token);
        if (response && Array.isArray(response)) {
          setStudentCount(response.length);
        } else {
          setStudentCount(0);
        }
      };

      fetchStudents();
    });

    startTransition(() => {
      const fetchClassrooms = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("Token não encontrado");
          return;
        }

        const response = await getAllTeacherClassroom(token);
        if (response && Array.isArray(response)) {
          setClassroomCount(response.length);
        } else {
          setClassroomCount(0);
        }
      };

      fetchClassrooms();
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col px-8 py-6">
      <div className="mb-6 space-y-4">
        <h1 className="text-2xl font-bold">Bem-vindo, Prof. {name}!</h1>
        <p className="text-md text-gray-500">
          Gerencie suas turmas e acompanhe o progresso dos seus alunos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashBoardCards
          title="Total de Alunos"
          icon={User}
          type="normal"
          action={() => studentCount ?? "..."}
        />
        <DashBoardCards
          title="Turmas Ativas"
          icon={LayoutDashboard}
          type="normal"
          action={() => classroomCount ?? "..."}
        />
        <DashBoardCards
          title="Média Geral"
          icon={TrendingUp}
          type="normal"
          action={() => 8.2}
        />
        <DashBoardCards
          title="Notas Pendentes"
          icon={Star}
          type="pending"
          action={() => 12}
        />
      </div>

      <div className="py-10">
        <TabsOverview />
      </div>
    </div>
  );
}
