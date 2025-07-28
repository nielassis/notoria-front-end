import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import CreateNewActivityDialog from "./createNewActivityDialog";
import ActivitiesItem from "./activitiesItem";

interface Props {
  classroomId: string;
}

export default function ActivitiesTab({ classroomId }: Props) {
  return (
    <Card className="w-full bg-none shadow-none border-none p-0 m-0">
      <CardContent>
        <CardHeader>
          <CreateNewActivityDialog classroomId={classroomId} />
        </CardHeader>
        <ActivitiesItem classroomId={classroomId} />
      </CardContent>
    </Card>
  );
}
