import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import AssignmentsCards from "./assignmentsCards";

interface Props {
  classroomId: string;
}

export default function ClassTab({ classroomId }: Props) {
  return (
    <Tabs defaultValue="assignments" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="assignments">Atividades</TabsTrigger>
        <TabsTrigger value="my-grades">Minhas Notas</TabsTrigger>
        <TabsTrigger value="my-submissions">Minhas Entregas</TabsTrigger>
      </TabsList>

      <TabsContent value="assignments">
        <AssignmentsCards classroomId={classroomId} />
      </TabsContent>

      <TabsContent value="my-grades"></TabsContent>
      <TabsContent value="my-submissions"></TabsContent>
    </Tabs>
  );
}
