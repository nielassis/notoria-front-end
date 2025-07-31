"use client";

import React, { useEffect, useState, startTransition } from "react";
import getAllTeacherStudents from "@/actions/teacher/getAllTeacherStudents";
import deleteStudent from "@/actions/teacher/students/deleteStudent";
import { toast } from "sonner";

import SearchBar from "./searchBar";
import StudentList from "./studentList";

export default function StudentsTab() {
  const [students, setStudents] = useState<StudentSymple[]>([]);
  const [search, setSearch] = useState("");

  const fetchStudents = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token não encontrado");
      return;
    }
    const response = await getAllTeacherStudents(token);
    if (!response) return;
    setStudents(response);
  };

  useEffect(() => {
    startTransition(() => {
      fetchStudents();
    });
  }, []);

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    startTransition(async () => {
      const result = await deleteStudent({ id, token });
      if (result?.success) {
        toast.success("Aluno deletado com sucesso!");
        fetchStudents();
      } else {
        toast.error("Erro ao deletar aluno");
      }
    });
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col px-4 w-full">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Gerenciar Alunos</h1>
        <SearchBar search={search} setSearch={setSearch} />
      </div>

      <StudentList students={filteredStudents} onDelete={handleDelete} />
    </div>
  );
}
