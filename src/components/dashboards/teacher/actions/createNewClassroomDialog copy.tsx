"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import createClassroom from "@/actions/teacher/classrooom/createClassroom";

const formSchema = z.object({
  name: z.string().min(3, "Nome é obrigatório"),
});

type FormData = z.infer<typeof formSchema>;

export default function CreateClassroomForm() {
  const [openDialog, setOpenDialog] = useState(false);
  const [createdClassroom, setCreatedClassroom] = useState<{
    name: string;
  } | null>(null);
  const [error, setError] = useState("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await createClassroom({ ...data }, token);

      if (response?.data) {
        setCreatedClassroom({
          name: response.data.name,
        });
        setError("");
        setOpenDialog(true);
        form.reset();
      }
    } catch {
      setError("Erro ao criar turma");
      toast.error("Erro ao criar turma");
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-emerald-500 hover:bg-emerald-600 w-full sm:w-fit">
            <Plus className="mr-2 h-4 w-4" />
            <span>Nova turma</span>
          </Button>
        </DialogTrigger>

        <DialogContent className="w-100">
          <DialogTitle>Criar nova turma</DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 rounded-xl p-8 w-full max-w-md"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da turma</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Fundamentos da Algebra Linear"
                        {...field}
                        className="rounded-md border border-gray-300 px-4 py-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && <p className="text-red-500 text-center">{error}</p>}

              <Button
                type="submit"
                className="w-full bg-emerald-500 text-white hover:bg-emerald-600"
              >
                Criar turma
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent className="text-center">
          <AlertDialogHeader>
            <div className="flex flex-col items-center justify-center gap-2">
              <CheckCircle className="text-green-500 w-10 h-10" />
              <AlertDialogTitle>turma criado com sucesso!</AlertDialogTitle>
            </div>
          </AlertDialogHeader>

          {createdClassroom && (
            <div className="mt-4 bg-gray-100 rounded-lg p-4 text-left w-full max-w-sm mx-auto">
              <p className="mb-2">
                <span className="font-semibold text-gray-800">
                  Nome da turma
                </span>{" "}
                {createdClassroom.name}
              </p>
            </div>
          )}

          <AlertDialogCancel asChild>
            <Button
              className="mt-4 bg-emerald-500 hover:bg-emerald-600"
              onClick={() => window.location.reload()}
            >
              Ok, entendi
            </Button>
          </AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
