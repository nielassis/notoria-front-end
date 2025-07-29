"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubmissionsTable from "./submissionsTab";
import GradesTab from "./gradesTab";

interface ActivityTabsProps {
  description?: string;
  id: string;
}

export default function ActivityTabs({ description, id }: ActivityTabsProps) {
  return (
    <div className="mt-8">
      <Tabs defaultValue="instructions" className="w-full">
        <TabsList className="border-none bg-transparent mb-4 p-0 gap-4">
          <TabsTrigger
            value="instructions"
            className="px-2 py-1 text-sm font-medium rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-black"
          >
            Instruções
          </TabsTrigger>
          <TabsTrigger
            value="submissions"
            className="px-2 py-1 text-sm font-medium rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-black"
          >
            Entregas
          </TabsTrigger>
          <TabsTrigger
            value="grades"
            className="px-2 py-1 text-sm font-medium rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-black"
          >
            Notas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="instructions">
          <div className="bg-[#1f2937] text-white rounded-lg p-4 max-h-64 overflow-y-auto text-sm leading-relaxed shadow-sm">
            <p className="font-semibold mb-1">Instruções da Atividade:</p>
            <p>
              {description?.trim() ||
                "Nenhuma instrução disponível para essa atividade no momento."}
            </p>
          </div>
        </TabsContent>

        <TabsContent value="submissions">
          <div className="rounded-lg p-4 text-sm text-muted-foreground">
            <SubmissionsTable activityId={id} />
          </div>
        </TabsContent>

        <TabsContent value="grades">
          <div className="bg-gray-100 rounded-lg p-4 text-sm text-muted-foreground">
            <GradesTab activityId={id} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
