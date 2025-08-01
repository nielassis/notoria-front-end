"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarCheck, CheckCircle, Clock } from "lucide-react";
import { useEffect, useState, startTransition } from "react";
import { formatDate } from "@/utils/formatDate";
import { getSubmissionsByActivityId } from "@/actions/teacher/acivities/submissions/getSubmissionsByActivityId";
import DashBoardCards from "@/components/dashboards/cards";
import ActivityTabs from "./ActivityTab/activityTab";
import ActivityOptions from "../activityOptions";
import deleteActivity from "@/actions/teacher/acivities/deleteActivity";
import { toast } from "sonner";

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

  async function onDelete() {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await deleteActivity(activity.id, token);
    if (response.success) {
      toast.success("Atividade deletada com sucesso!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }

  async function onUpdated() {
    window.location.reload();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ActivityOptions
          activity={activity}
          onUpdate={onUpdated}
          onDelete={onDelete}
        />
      </DialogTrigger>

      <DialogContent className="w-full max-w-[90vw] md:max-w-[80vw] max-h-screen overflow-y-auto px-4 py-6 rounded-xl">
        <DialogHeader className="flex">
          <div className="flex justify-between">
            <DialogTitle className="text-start">{activity.title}</DialogTitle>
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
