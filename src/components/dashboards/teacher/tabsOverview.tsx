import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import RecentClasses from "./recentClasses";
import RecentStudents from "./recentStudents";
import StudentsTab from "../StudentsTab/studentsTab";

export default function TabsOverview() {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="overview">Visão Geral</TabsTrigger>
        <TabsTrigger value="students">Alunos</TabsTrigger>
        <TabsTrigger value="classes">Turmas</TabsTrigger>
        <TabsTrigger value="grades">Notas</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="flex flex-col gap-6 lg:flex-row">
        <RecentClasses />
        <RecentStudents />
      </TabsContent>

      <TabsContent value="students">
        <StudentsTab />
      </TabsContent>
      <TabsContent value="classes">Conteúdo de Turmas...</TabsContent>
      <TabsContent value="grades">Conteúdo de Notas...</TabsContent>
    </Tabs>
  );
}
