import { getAllClassroomActivities } from "@/actions/teacher/acivities/getAllClassroomActivities";
import { Card } from "@/components/ui/card";
import { CalendarCheck, FileText, FileQuestion } from "lucide-react";
import { startTransition, useEffect, useState } from "react";

interface Props {
  classroomId: string;
}

export default function ActivitiesItem({ classroomId }: Props) {
  const [activities, setActivities] = useState<ClassroomActivities[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    startTransition(async () => {
      const response = await getAllClassroomActivities(classroomId, token);
      if (response && response.success) {
        setActivities(response.data);
      }
    });
  }, [classroomId]);

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
    <div className="space-y-2 mt-4">
      {activities.map((activity, index) => (
        <Card
          key={activity.id}
          className={`
          border-none bg-none shadow-none rounded-lg p-4
          ${
            activities.length > 1 && index !== activities.length - 1
              ? "border-b border-gray-300"
              : ""
          }
        `}
        >
          <div className="flex items-start gap-4">
            <div className={`rounded-full p-2 ${getBgColor(activity.type)}`}>
              {getIcon(activity.type)}
            </div>

            <div className="flex-1">
              <p className="text-sm text-muted-foreground">
                Professor postou uma nova atividade:{" "}
                <span className="font-bold">{activity.title}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                <span className="text-red-500">Prazo: </span>
                {new Date(activity.dueDate).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                })}
                –
                {new Date(activity.dueDate).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
