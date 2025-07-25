"use client";

import createStudent from "@/actions/teacher/students/createStudent";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
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

const formSchema = z.object({
  name: z.string().min(3, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
});

type FormData = z.infer<typeof formSchema>;

export default function CreateStudentForm() {
  const [openDialog, setOpenDialog] = useState(false);
  const [createdStudent, setCreatedStudent] = useState<{
    email: string;
    temporaryPassword: string;
  } | null>(null);
  const [error, setError] = useState("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await createStudent({ ...data }, token);

      if (response?.data) {
        setCreatedStudent({
          email: response.data.student.email,
          temporaryPassword: response.data.temporaryPassword,
        });
        setError("");
        setOpenDialog(true);
        form.reset();
      }
    } catch {
      setError("Erro ao criar aluno");
      toast.error("Erro ao criar aluno");
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-emerald-500 hover:bg-emerald-600 w-full sm:w-fit">
            <Plus className="mr-2 h-4 w-4" />
            <span>Novo Aluno</span>
          </Button>
        </DialogTrigger>

        <DialogContent className="w-100">
          <DialogTitle>Criar novo aluno</DialogTitle>
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
                    <FormLabel>Nome completo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o nome do aluno"
                        {...field}
                        className="rounded-md border border-gray-300 px-4 py-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="aluno.email@exemplo.com"
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
                Criar Aluno
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
              <AlertDialogTitle>Aluno criado com sucesso!</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-700">
                Informe o aluno sobre seus dados de acesso:
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>

          {createdStudent && (
            <div className="mt-4 bg-gray-100 rounded-lg p-4 text-left w-full max-w-sm mx-auto">
              <p className="mb-2">
                <span className="font-semibold text-gray-800">Email:</span>{" "}
                {createdStudent.email}
              </p>
              <p>
                <span className="font-semibold text-gray-800">
                  Senha Temporária:
                </span>{" "}
                {createdStudent.temporaryPassword}
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
