"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { AlertTriangle } from "lucide-react";

interface DeleteStudentDialogProps {
  student: StudentSymple;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: (id: string) => void;
}

export default function DeleteStudentDialog({
  student,
  open,
  onOpenChange,
  onDelete,
}: DeleteStudentDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md rounded-xl border border-red-200 bg-white shadow-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            Confirmar exclusão
          </AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir <strong>{student.name}</strong>? Esta
            ação não poderá ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={() => onDelete(student.id)}
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
