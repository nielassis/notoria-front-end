"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FileText,
  FileQuestion,
  CalendarCheck,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useEffect, useState, startTransition } from "react";
import { formatDate } from "@/utils/formatDate";
import { getSubmissionsByActivityId } from "@/actions/teacher/acivities/submissions/getSubmissionsByActivityId";
import DashBoardCards from "@/components/dashboards/cards";
import ActivityTabs from "./ActivityTab/activityTab";

interface Props {
  activity: ClassroomActivities;
  classroomName: string;
}

export default function ActivityCard({ activity, classroomName }: Props) {
  const [pending, setPending] = useState(0);
  const [graded, setGraded] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    startTransition(async () => {
      const response = await getSubmissionsByActivityId(activity.id, token);
      if (response.success) {
        setPending(response.data.pending.length);
        setGraded(response.data.graded.length);
      }
    });
  }, [activity.id]);

  const getIcon = (type: string) => {
    switch (type) {
      case "ASSIGNMENT":
        return <FileText className="w-5 h-5 text-white" />;
      case "EXERCISE":
        return <FileQuestion className="w-5 h-5 text-white" />;
      default:
        return <CalendarCheck className="w-5 h-5 text-white" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case "ASSIGNMENT":
      case "EXERCISE":
        return "bg-emerald-500";
      default:
        return "bg-slate-300";
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-start gap-4 cursor-pointer">
          <div className={`rounded-full p-2 ${getBgColor(activity.type)}`}>
            {getIcon(activity.type)}
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">
              Nova atividade:{" "}
              <span className="font-bold">{activity.title}</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-red-500">Prazo: </span>
              {new Date(activity.dueDate).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
              })}{" "}
              –
              {new Date(activity.dueDate).toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="w-full max-w-[90vw] md:max-w-[80vw] max-h-screen overflow-y-auto px-4 py-6 rounded-xl">
        <DialogHeader className="flex">
          <div className="flex justify-between">
            <DialogTitle>{activity.title}</DialogTitle>
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  new Date(activity.dueDate) > new Date()
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {new Date(activity.dueDate) > new Date() ? "Ativa" : "Expirada"}
              </span>
              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full capitalize">
                {activity.type === "ASSIGNMENT"
                  ? "Atividade"
                  : activity.type === "EXERCISE"
                  ? "Exercício"
                  : "Material Complementar"}
              </span>
            </h2>
          </div>
        </DialogHeader>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-4">
          <p className="flex items-center gap-1">
            <CalendarCheck className="w-4 h-4" />
            <span className="font-medium text-gray-800">Prazo:</span>
            {formatDate(activity.dueDate, "DD MM YY")}
          </p>

          <p className="flex items-center gap-1">
            <span className="font-medium text-gray-800">Turma:</span>
            {classroomName}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <DashBoardCards
            title="Avaliadas"
            icon={CheckCircle}
            type="normal"
            action={async () => graded}
          />

          <DashBoardCards
            title="Pendentes"
            icon={Clock}
            type="pending"
            action={async () => pending}
          />
        </div>

        <ActivityTabs description={activity.description} id={activity.id} />
      </DialogContent>
    </Dialog>
  );
}
