"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { RecentActivityCard } from "./recentActivityCard";
import { PendingActivityCard } from "./pendingActivityCard";
import { Card } from "@/components/ui/card";
import StudentClassroomTab from "./studentClassroomTab";
import { StudentActivity } from "@/actions/student/activities/getClassroomsActivities";

interface TabsOverviewProps {
  activities: StudentActivity[] | null;
}

function formatTimeAgo(date: string) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: ptBR,
  });
}

export default function StudentTabsOverview({ activities }: TabsOverviewProps) {
  const recentActivities =
    activities
      ?.filter((a) => a.grade !== null && a.submittedAt !== null)
      .sort(
        (a, b) =>
          new Date(b.submittedAt!).getTime() -
          new Date(a.submittedAt!).getTime()
      )
      .slice(0, 3)
      .map((a) => ({
        id: a.id,
        title: a.activity.title,
        type: a.activity.type,
        grade: a.grade!,
        timeAgo: formatTimeAgo(a.submittedAt!),
      })) ?? [];

  const pendingActivities =
    activities
      ?.filter((a) => a.status === "PENDING")
      .sort(
        (a, b) =>
          new Date(a.activity.dueDate).getTime() -
          new Date(b.activity.dueDate).getTime()
      )
      .slice(0, 3)
      .map((a) => ({
        id: a.id,
        title: a.activity.title,
        type: a.activity.type,
        deadline: a.activity.dueDate,
      })) ?? [];

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="overview">Visão Geral</TabsTrigger>
        <TabsTrigger value="classrooms">Disciplinas</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="flex flex-col gap-6 lg:flex-row">
        <Card className="flex-1 space-y-4 p-4">
          <div className="flex flex-col ml-2 mt-2">
            <h1 className="text-xl font-bold">Atividades Recentes</h1>
            <span className="text-muted-foreground">
              Suas últimas avaliações e trabalhos
            </span>
          </div>
          {recentActivities.map((activity) => (
            <RecentActivityCard
              key={activity.id}
              title={activity.title}
              type={activity.type}
              grade={activity.grade}
              timeAgo={activity.timeAgo}
            />
          ))}

          {recentActivities.length === 0 && (
            <p className="text-muted-foreground">Nenhuma atividade recente</p>
          )}
        </Card>

        <Card className="flex-1 space-y-4 p-4">
          <div className="flex flex-col ml-2 mt-2">
            <h1 className="text-xl font-bold">Atividades Pendentes</h1>
            <span className="text-muted-foreground">
              Próximas entregas e prazos
            </span>
          </div>
          {pendingActivities.map((activity) => (
            <PendingActivityCard
              key={activity.id}
              title={activity.title}
              type={activity.type}
              deadline={activity.deadline}
            />
          ))}

          {pendingActivities.length === 0 && (
            <p className="text-muted-foreground">Nenhuma atividade pendente</p>
          )}
        </Card>
      </TabsContent>

      <TabsContent value="classrooms">
        <StudentClassroomTab />
      </TabsContent>
    </Tabs>
  );
}
