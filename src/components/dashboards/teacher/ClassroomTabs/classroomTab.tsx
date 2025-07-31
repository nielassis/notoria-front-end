"use client";

import React, { useEffect, useState, startTransition } from "react";
import { toast } from "sonner";
import getAllTeacherClassroom from "@/actions/teacher/classrooom/getAllTeacherClassroom";
import ClassroomList from "./classroomList";
import CreateClassroomForm from "../actions/createNewClassroomDialog copy";
import deleteClassroom from "@/actions/teacher/classrooom/deleteClassroom";

export default function ClassroomTab() {
  const [classroom, setClassroom] = useState<Class[]>([]);

  const fetchClassrooms = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token não encontrado");
      return;
    }
    const response = await getAllTeacherClassroom(token);
    if (!response) return;
    setClassroom(response);
  };

  useEffect(() => {
    startTransition(() => {
      fetchClassrooms();
    });
  }, []);

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    startTransition(async () => {
      const result = await deleteClassroom({ id, token });
      if (result?.success) {
        toast.success("Turma deletado com sucesso!");
        fetchClassrooms();
      } else {
        toast.error("Erro ao deletar turma");
      }
    });
  };

  return (
    <div className="flex flex-col px-4 w-full ">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Gerenciar Turmas</h1>

        <div className="">
          <CreateClassroomForm />
        </div>
      </div>

      <ClassroomList classroom={classroom} onDelete={handleDelete} />
    </div>
  );
}
