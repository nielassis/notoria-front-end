// ActivityOptions.tsx
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  CalendarCheck,
  FileQuestion,
  FileText,
  MoreHorizontal,
  Pencil,
  Trash,
} from "lucide-react";
import React, { useState } from "react";
import EditActivityDialog from "./updateActivity";
import { formatDate } from "@/utils/formatDate";

interface ActivityOptionsProps {
  activity: ClassroomActivities;
  onUpdate: () => void;
  onDelete: (activityId: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

// Use React.forwardRef para que o componente possa receber uma ref
export default React.forwardRef<HTMLDivElement, ActivityOptionsProps>(
  function ActivityOptions({ activity, onUpdate, onDelete, ...props }, ref) {
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const dueDate = new Date(activity.dueDate);

    const getIcon = (type: string) => {
      switch (type) {
        case "ASSIGNMENT":
          return <FileText className="w-5 h-5 text-white" />;
        case "EXERCISE":
          return <FileQuestion className="w-5 h-5 text-white" />;
        default:
          return <CalendarCheck className="w-5 h-5 text-white" />;
      }
    };

    const getBgColor = (type: string) => {
      switch (type) {
        case "ASSIGNMENT":
        case "EXERCISE":
          return "bg-emerald-500";
        default:
          return "bg-slate-300";
      }
    };

    return (
      <div
        ref={ref}
        {...props}
        className="relative flex items-start gap-4 p-4 bg-white rounded-lg hover:bg-muted transition-colors cursor-pointer"
      >
        <div className={`rounded-full p-2 ${getBgColor(activity.type)}`}>
          {getIcon(activity.type)}
        </div>
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">
            Nova atividade:{" "}
            <span className="font-semibold text-foreground">
              {activity.title}
            </span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            <span className="text-red-500 font-medium">Prazo: </span>
            {formatDate(dueDate, "DD MM YY")}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded"
            >
              <MoreHorizontal size={16} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                setEditOpen(true);
              }}
            >
              <Pencil className="text-inherit mr-2" /> Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                setDeleteOpen(true);
              }}
              className="text-red-600"
            >
              <Trash className="text-inherit mr-2" /> Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <EditActivityDialog
          open={editOpen}
          setOpen={setEditOpen}
          activity={activity}
          onUpdated={onUpdate}
        />
        <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <AlertDialogTrigger asChild>
            <span />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Deseja realmente excluir?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação não pode ser desfeita. Isso excluirá a atividade{" "}
                <strong>{activity.title}</strong> permanentemente.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(activity.id);
                  setDeleteOpen(false);
                }}
                className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded"
              >
                Excluir
              </button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }
);
