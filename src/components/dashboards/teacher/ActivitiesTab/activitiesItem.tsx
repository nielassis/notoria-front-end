import { getAllClassroomActivities } from "@/actions/teacher/acivities/getAllClassroomActivities";
import { Card } from "@/components/ui/card";
import { startTransition, useEffect, useState } from "react";
import ActivityCard from "./ActivityDialog/activityCard";

interface Props {
  classroomId: string;
  classroomName: string;
}

export default function ActivitiesItem({ classroomId, classroomName }: Props) {
  const [activities, setActivities] = useState<ClassroomActivities[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    startTransition(async () => {
      const response = await getAllClassroomActivities(classroomId, token);
      if (response?.success) {
        setActivities(response.data);
      }
    });
  }, [classroomId]);

  return (
    <div className="space-y-2 mt-4">
      {activities.map((activity, index) => (
        <Card
          key={activity.id}
          className={`border-none bg-none shadow-none rounded-lg p-4 ${
            activities.length > 1 && index !== activities.length - 1
              ? "border-b border-gray-300"
              : ""
          }`}
        >
          <ActivityCard activity={activity} classroomName={classroomName} />
        </Card>
      ))}
    </div>
  );
}
