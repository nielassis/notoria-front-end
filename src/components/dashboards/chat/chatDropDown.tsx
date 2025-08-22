"use client";

import { useState, useEffect, startTransition } from "react";
import { MessageCircle } from "lucide-react";
import { useAuth } from "@/contexts/authContext";
import getAllTeacherStudents from "@/actions/teacher/getAllTeacherStudents";
import StudentList from "./chatStudentList";
import ChatWindow from "./chatWindow";
import {
  ChatDialog,
  ChatDialogContent,
  ChatDialogTitle,
  ChatDialogTrigger,
} from "@/components/ui/chatDialog";

export default function ChatDropdown() {
  const { role } = useAuth();
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (role !== "teacher" || !token) return;

    startTransition(async () => {
      const response = await getAllTeacherStudents(token);
      if (response) setStudents(response);
    });
  }, [role]);

  return (
    <ChatDialog open={open} onOpenChange={setOpen}>
      <ChatDialogTrigger asChild>
        <button className="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-emerald-500 text-white shadow-lg flex items-center justify-center hover:bg-green-600 transition">
          <MessageCircle className="w-6 h-6" />
        </button>
      </ChatDialogTrigger>

      <ChatDialogContent className="w-full sm:w-1/3 h-full overflow-hidden rounded-none p-0 flex flex-col bg-white shadow-lg">
        <ChatDialogTitle>Chat</ChatDialogTitle>
        {role === "teacher" && !selectedStudent ? (
          <div className="p-4">
            <div className="p-2 gap-2">
              <h1 className="text-lg font-semibold">Chat com Alunos</h1>
              <p className="text-xs text-gray-500">
                Selecione um aluno para conversar
              </p>
            </div>

            <StudentList
              students={students}
              selectStudent={setSelectedStudent}
            />
          </div>
        ) : (
          <ChatWindow
            selectedStudent={selectedStudent}
            back={() => setSelectedStudent(null)}
            role={role}
          />
        )}
      </ChatDialogContent>
    </ChatDialog>
  );
}
