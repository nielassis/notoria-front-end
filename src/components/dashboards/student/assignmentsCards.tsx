"use client";

import React, { startTransition, useEffect, useState } from "react";
import { CalendarDays, NotebookPen } from "lucide-react";
import {
  getClassroomActivities,
  StudentActivity,
} from "@/actions/student/activities/getClassroomsActivities";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/formatDate";
import { cn } from "@/lib/utils";
import ActivityInstructionsDialog from "./activityInstuctionsDialog";

interface Props {
  classroomId: string;
}

export default function AssignmentsCards({ classroomId }: Props) {
  const [activities, setActivities] = useState<StudentActivity[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    startTransition(async () => {
      const response = await getClassroomActivities(token, classroomId);
      if (!response) return;

      setActivities(response);
    });
  }, [classroomId]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Atividades da turma</h1>

      {activities.map((activity) => {
        const isLate =
          new Date(activity.activity?.dueDate) < new Date() &&
          activity.status !== "COMPLETED";

        const formattedDueDate = formatDate(
          activity.activity?.dueDate,
          "DD MM YY"
        );

        return (
          <Card
            key={activity.id}
            className={cn(
              "p-4 border rounded-xl shadow-sm space-y-4",
              isLate ? "border-red-300" : "border-gray-200"
            )}
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 w-full">
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-semibold">
                    {activity.activity.title}
                  </h2>

                  <Badge className="h-5 text-xs rounded-full text-foreground bg-muted">
                    {activity.activity.type === "ASSIGNMENT"
                      ? "Atividade"
                      : activity.activity.type === "EXERCISE"
                      ? "Exercício"
                      : "Material Complementar"}
                  </Badge>

                  {isLate && (
                    <Badge className="h-5 text-xs rounded-full bg-red-100 text-red-800">
                      Atrasado
                    </Badge>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-12">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">
                        Prazo
                      </span>
                      <span className={cn("text-sm", isLate && "text-red-600")}>
                        {formattedDueDate}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <NotebookPen size={16} />
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">
                        Nota Máxima
                      </span>
                      <span className="text-sm font-semibold">10</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 min-w-[140px]">
                <span className="flex flex-col text-end text-green-700">
                  <span className="text-sm font-medium text-foreground">
                    Minha Nota:{" "}
                  </span>
                  {activity.grade === null ? "N/A" : activity.grade.toFixed(1)}
                </span>

                <ActivityInstructionsDialog activityId={activity.activity.id} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
