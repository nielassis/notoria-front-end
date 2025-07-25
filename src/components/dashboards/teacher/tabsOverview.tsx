import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import RecentClasses from "./recentClasses";
import RecentStudents from "./recentStudents";
import StudentsTab from "../StudentsTab/studentsTab";
import ClassroomTab from "../ClassroomTabs/classroomTab";

interface TabsOverviewProps {
  submissions: ActivitySubmission[] | null;
}

export default function TabsOverview({ submissions }: TabsOverviewProps) {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="overview">Visão Geral</TabsTrigger>
        <TabsTrigger value="students">Alunos</TabsTrigger>
        <TabsTrigger value="classes">Turmas</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="flex flex-col gap-6 lg:flex-row">
        <RecentClasses />
        <RecentStudents submissions={submissions ?? []} />
      </TabsContent>

      <TabsContent value="students">
        <StudentsTab />
      </TabsContent>
      <TabsContent value="classes">
        <ClassroomTab />
      </TabsContent>
    </Tabs>
  );
}
