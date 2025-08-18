"use client";

import {
  getClassroomActivities,
  StudentActivity,
} from "@/actions/student/activities/getClassroomsActivities";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import React, { startTransition, useEffect, useState } from "react";
import { formatDate } from "@/utils/formatDate";

interface Props {
  classroomId: string;
}

export default function StudentGradesTab({ classroomId }: Props) {
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
    <div className="w-full p-4">
      <div className="space-y-4">
        <div className="">
          <h1 className="text-2xl font-bold">Minhas notas</h1>
          <span className="text-sm text-muted-foreground">
            Visualize suas notas em todas as atividades
          </span>
        </div>

        {activities.map((activity) => {
          const grade = activity.grade;
          const maxGrade = 10;
          const percentage = grade ? (grade / maxGrade) * 100 : null;

          return (
            <Card
              key={activity.id}
              className="flex flex-col gap-2 rounded-xl border p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold">
                    {activity.activity.title}
                  </h3>
                  <Badge variant="outline" className="w-fit">
                    {activity.activity.type === "ASSIGNMENT"
                      ? "Atividade"
                      : activity.activity.type === "EXERCISE"
                      ? "Exercício"
                      : "Material Complementar"}
                  </Badge>
                </div>
                {grade !== null ? (
                  <div className="flex flex-col gap-4">
                    <div className="text-right ">
                      <span className="text-xl font-bold text-green-600">
                        {grade}/{maxGrade}
                      </span>
                      <div className="text-sm text-muted-foreground">
                        {percentage?.toFixed(1)}%
                      </div>
                    </div>

                    <span className="text-sm text-muted-foreground">
                      Entregue em:{" "}
                      <span className="font-semibold">
                        {activity.submittedAt
                          ? formatDate(activity.submittedAt, "DD MM YY")
                          : "N/A"}
                      </span>
                    </span>
                  </div>
                ) : (
                  <div className="text-right">
                    <span className="text-lg font-medium text-muted-foreground">
                      Aguardando
                    </span>
                    <div className="text-sm text-muted-foreground">
                      Correção
                    </div>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
