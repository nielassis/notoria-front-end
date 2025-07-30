"use client";

import {
  getStudentActivities,
  StudentActivity,
} from "@/actions/student/activities/getAllActivities";
import { getStudentClassrooms } from "@/actions/student/classrooms/getStudentClassrooms";
import DashBoardCards from "@/components/dashboards/cards";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/authContext";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { getInitials } from "@/utils/getInitials";
import { BookOpen, Clock, Medal, TrendingUp } from "lucide-react";
import { startTransition, useEffect, useState } from "react";

export default function StudentDashboard() {
  useProtectedRoute("student");
  const { name, email } = useAuth();

  const [classrooms, setClassrooms] = useState<StudentClassroom[]>([]);
  const [activities, setActivities] = useState<StudentActivity[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    startTransition(async () => {
      const response = await getStudentClassrooms(token);
      if (response) setClassrooms(response);
    });

    startTransition(async () => {
      const response = await getStudentActivities(token);
      if (response) setActivities(response);
    });
  }, []);

  function calculateAverage(activities: StudentActivity[]) {
    if (activities.length === 0) return 0;

    const sum = activities.reduce(
      (acc, activity) => acc + (activity.grade ?? 0),
      0
    );

    const average = sum / activities.length;

    if (average === 0) return 0;

    return Number(average.toFixed(2));
  }

  const average = calculateAverage(activities);

  return (
    <div className="px-8 py-6">
      <div className="mb-6 space-y-4">
        <h1 className="text-2xl font-bold">Olá, {name}!</h1>
        <p className="text-md text-gray-500">
          Acompanhe seu progresso acadêmico e suas atividades
        </p>
      </div>

      <Card className="flex flex-col md:flex-row w-full justify-between p-6 rounded-lg bg-gradient-to-l from-teal-600 to-emerald-500 gap-6 md:gap-0">
        <div className="flex items-center justify-center md:justify-start space-x-4">
          <Avatar className="w-14 h-14">
            <AvatarFallback className="text-2xl">
              {getInitials(name ?? "")}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col text-start md:text-start text-white">
            <h1 className="font-bold text-lg leading-tight">{name}</h1>
            <span className="text-sm">{email}</span>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end text-white">
          <span className="text-4xl font-bold leading-none">{average}</span>
          <span className="text-sm font-semibold">Média Geral</span>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <DashBoardCards
          title="Disciplinas"
          icon={BookOpen}
          type="normal"
          action={() => classrooms.length ?? "..."}
        />
        <DashBoardCards
          title="Média Geral"
          icon={TrendingUp}
          type="normal"
          action={() => (average === 0 ? "0" : average.toFixed(2) ?? "...")}
        />
        <DashBoardCards
          title="Atividades Concluidas"
          icon={Medal}
          type="normal"
          action={() =>
            activities.filter((activity) => activity.status === "COMPLETED")
              .length ?? "..."
          }
        />
        <DashBoardCards
          title="Pendentes"
          icon={Clock}
          type="pending"
          action={() =>
            activities.filter((activity) => activity.status === "PENDING")
              .length ?? "..."
          }
        />
      </div>
    </div>
  );
}
