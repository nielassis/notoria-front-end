"use client";

import { PostStudentInClassroom } from "@/actions/teacher/classrooom/insertStudentInClassroom";
import getAllTeacherStudents from "@/actions/teacher/getAllTeacherStudents";
import { getAllStudentsInClassroom } from "@/actions/teacher/students/getStudentsInClassroom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getInitials } from "@/utils/getInitials";
import { Plus } from "lucide-react";
import React, { startTransition, useEffect, useState } from "react";
import { toast } from "sonner";

interface InsertStudentInClassroomProps {
  classroomName: string;
  classroomId: string;
}

export default function InsertStudentInClassroom({
  classroomName,
  classroomId,
}: InsertStudentInClassroomProps) {
  const [students, setStudents] = useState<StudentSymple[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string>("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    startTransition(() => {
      (async () => {
        try {
          const response = await getAllTeacherStudents(token);
          const studentsInClassRoom = await getAllStudentsInClassroom(
            classroomId,
            token
          );

          if (response && studentsInClassRoom) {
            const idsInClassroom = new Set(
              studentsInClassRoom.map((s: StudentWithScore) => s.student.id)
            );

            const filteredStudents = response.filter(
              (student: Student) => !idsInClassroom.has(student.id)
            );

            setStudents(filteredStudents);
          }
        } catch (err) {
          console.error("Erro ao buscar alunos:", err);
        }
      })();
    });
  }, [classroomId]);

  async function onSubmit() {
    try {
      const response = await PostStudentInClassroom({
        classroomId,
        studentId: selectedStudentId,
        token: localStorage.getItem("token") || "",
      });

      if (response?.success) {
        toast.success("Aluno adicionado com sucesso!");
      }

      window.location.reload();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden md:inline">Adicionar aluno</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>
          Adicionar aluno à turma &ldquo;{classroomName}&rdquo;
        </DialogTitle>

        <div className="mt-4">
          <Select onValueChange={(value) => setSelectedStudentId(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um aluno" />
            </SelectTrigger>

            <SelectContent>
              {students.map((student) => (
                <SelectItem key={student.id} value={student.id}>
                  <div className="flex items-center gap-4 p-2">
                    <Avatar>
                      <AvatarFallback>
                        {getInitials(student.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{student.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {student.email}
                      </span>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <p className="text-red-500 mt-2">{error}</p>
        <Button
          className="mt-4 w-full bg-emerald-500 text-white hover:bg-emerald-600"
          onClick={() => onSubmit()}
        >
          Salvar
        </Button>
      </DialogContent>
    </Dialog>
  );
}
