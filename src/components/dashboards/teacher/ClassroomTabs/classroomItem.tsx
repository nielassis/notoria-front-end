"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import EditClassroomDialog from "./editClassroomDialog";
import DeleteClassroomDialog from "./deleteClassroomDialog";
import updateClassroom from "@/actions/teacher/classrooom/updateClassroom";
import { useAuth } from "@/contexts/authContext";

interface ClassrooomItemProps {
  classroom: Class;
  onDelete: (id: string) => void;
}

export default function ClassroomItem({
  classroom,
  onDelete,
}: ClassrooomItemProps) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const router = useRouter();
  const { role } = useAuth();

  const handleCardClick = () => {
    router.push(`/class/${role}/${classroom.id}`);
  };

  const handleSave = async (data: { id: string; name: string }) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token não encontrado");

    await updateClassroom(data.id, data, token);
    setOpenEditDialog(false);
    window.location.reload();
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative p-6 rounded-xl border border-slate-200 shadow-sm bg-white h-full flex flex-col justify-between cursor-pointer hover:bg-slate-50 transition"
    >
      <div
        className="absolute top-3 right-3 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
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

            <EditClassroomDialog
              classroom={classroom}
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
      </div>

      <div className="space-y-2 border-none shadow-none bg-none">
        <h3 className="text-lg font-bold">{classroom.name}</h3>
        <p className="text-sm text-muted-foreground">
          {classroom._count.students ?? 0} alunos matriculados
        </p>
      </div>

      <DeleteClassroomDialog
        classroom={classroom}
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        onDelete={onDelete}
      />
    </div>
  );
}
