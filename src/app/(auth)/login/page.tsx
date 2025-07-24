import LoginForm from "@/components/loginPage/loginform";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NotebookPenIcon, TestTubeDiagonalIcon } from "lucide-react";
import React from "react";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
      <Tabs defaultValue="student" className="w-full">
        <h1 className="text-2xl font-bold text-center">Fazer Login</h1>
        <p className="text-md text-gray-500 text-center mb-4">
          Acesse sua conta como professor ou como aluno
        </p>

        <TabsList className="bg-transparent rounded-none flex w-full mb-4">
          <TabsTrigger
            value="student"
            className="data-[state=active]:bg-emerald-500 cursor-pointer data-[state=active]:text-white data-[state=active]:font-semibold flex-1 rounded-none transition-colors"
          >
            <NotebookPenIcon className="mr-2 h-4 w-4" />
            Aluno
          </TabsTrigger>
          <TabsTrigger
            value="teacher"
            className="data-[state=active]:bg-emerald-500 cursor-pointer data-[state=active]:text-white data-[state=active]:font-semibold flex-1 rounded-none transition-colors"
          >
            <TestTubeDiagonalIcon className="mr-2 h-4 w-4" />
            Professor
          </TabsTrigger>
        </TabsList>

        <TabsContent value="teacher">
          <LoginForm userType="teacher" />
        </TabsContent>
        <TabsContent value="student">
          <LoginForm userType="student" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
