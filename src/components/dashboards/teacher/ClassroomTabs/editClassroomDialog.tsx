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
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface EditClassroomDialogProps {
  classroom: Class;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: { id: string; name: string }) => Promise<void>;
}

export default function EditClassroomDialog({
  classroom,
  open,
  onOpenChange,
  onSave,
}: EditClassroomDialogProps) {
  const [name, setName] = useState(classroom.name);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setName(classroom.name);
    }
  }, [open, classroom]);

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error("Nome é obrigatórios.");
      return;
    }

    try {
      setLoading(true);
      await onSave({
        id: classroom.id,
        name: name.trim(),
      });
      toast.success("turma atualizada com sucesso!");
      onOpenChange(false);
    } catch {
      toast.error("Erro ao atualizar turma.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Editar turma</AlertDialogTitle>
          <AlertDialogDescription>
            Atualize os dados do turma abaixo.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-col gap-4 py-2">
          <Input
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? "Salvando..." : "Salvar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
