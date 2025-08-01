import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import CreateNewActivityDialog from "./createNewActivityDialog";
import ActivitiesItem from "./activitiesItem";

interface Props {
  classroomId: string;
  classroomName: string;
}

export default function ActivitiesTab({ classroomId, classroomName }: Props) {
  return (
    <Card className="w-full bg-none shadow-none border-none p-0 m-0">
      <CardContent>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-lg font-semibold">Atividades</h3>
          <CreateNewActivityDialog classroomId={classroomId} />
        </CardHeader>
        <ActivitiesItem
          classroomId={classroomId}
          classroomName={classroomName}
        />
      </CardContent>
    </Card>
  );
}
