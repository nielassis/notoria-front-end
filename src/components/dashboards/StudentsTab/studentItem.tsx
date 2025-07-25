"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { getInitials } from "@/utils/getInitials";
import DeleteStudentDialog from "./deleteStudentDialog";
import updateStudent from "@/actions/teacher/students/updateStudent";
import EditStudentDialog from "./editStudentDialog";

interface StudentItemProps {
  student: StudentSymple;
  onDelete: (id: string) => void;
}

export default function StudentItem({ student, onDelete }: StudentItemProps) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const handleSave = async (data: {
    id: string;
    name: string;
    email: string;
    newPassword?: string;
  }) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token não encontrado");

    await updateStudent(data.id, data, token);
    setOpenEditDialog(false);
    window.location.reload();
  };

  return (
    <div className="flex justify-between items-center border rounded-lg p-4">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{student.name}</p>
          <p className="text-sm text-muted-foreground">{student.email}</p>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              setOpenEditDialog(true);
            }}
          >
            <Pencil className="w-4 h-4 mr-2" />
            Editar
          </DropdownMenuItem>

          <EditStudentDialog
            student={student}
            open={openEditDialog}
            onOpenChange={setOpenEditDialog}
            onSave={handleSave}
          />

          <DropdownMenuItem
            className="text-red-600 focus:bg-red-50"
            onClick={(e) => {
              e.preventDefault();
              setOpenDeleteDialog(true);
            }}
          >
            <Trash2 className="w-4 h-4 mr-2 text-inherit" />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteStudentDialog
        student={student}
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        onDelete={onDelete}
      />
    </div>
  );
}
