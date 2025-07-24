"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "../ui/alert-dialog";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { formatPhone } from "@/utils/formatPhone";
import { Textarea } from "../ui/textarea";
import createTeacher from "@/actions/teacher/createTeacher";
import { CheckCircle2Icon } from "lucide-react";

const formSchema = z
  .object({
    name: z
      .string()
      .min(
        10,
        "Por favor, insira o nome completo, incluindo pelo menos o nome e o sobrenome"
      ),
    email: z.string().email("Precisa ser um email válido"),
    phone: z
      .string()
      .regex(
        /^\(\d{2}\) \d{5}-\d{4}$/,
        "Formato de telefone inválido. Use (xx) xxxxx-xxxx"
      ),
    discipline: z.string().min(1, "Por favor, insira uma disciplina"),
    educationalInstitution: z
      .string()
      .min(1, "Por favor, insira uma instituição"),
    experience: z
      .string()
      .max(
        100,
        "Por favor, conte-nos um pouco sobre sua experiencia educacional"
      ),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não coincidem",
  });

export default function RegisterTeacherForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      discipline: "",
      educationalInstitution: "",
      experience: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [openDialog, setOpenDialog] = React.useState(false);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const response = await createTeacher({ data });
      if (response) {
        setOpenDialog(true);
        form.reset();
      }
    } catch (err) {
      console.error("Erro ao criar conta", err);
    }
  }

  return (
    <>
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
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Seu nome"
                    {...field}
                    className="rounded-md border border-gray-300 px-4 py-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-6">
            <div className="flex gap-4 justify-center">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="seu.email@exemplo.com"
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value}
                        onChange={(e) =>
                          field.onChange(formatPhone(e.target.value))
                        }
                        className="rounded-md border border-gray-300 px-4 py-2"
                        placeholder="(11) 91234-5678"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-4 justify-center">
              <FormField
                control={form.control}
                name="educationalInstitution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instituição de Ensino</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nome da Instituição"
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
                name="discipline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Disciplina Principal</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="rounded-md border border-gray-300 px-4 py-2"
                        placeholder="Matemática"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experiência em ensino</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="rounded-md border resize-none border-gray-300 px-4 py-2"
                    placeholder="Conte-nos um pouco sobre sua experiencia educacional"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4 justify-center">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Minimo 8 caracteres"
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
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repita sua senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Minimo 8 caracteres"
                      type="password"
                      {...field}
                      className="rounded-md border border-gray-300 px-4 py-2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-emerald-500 text-white hover:bg-emerald-600"
          >
            Criar conta de professor
          </Button>

          <p className="text-sm text-center text-gray-600 ">
            Já tem uma conta? <br />
            <Link href="/login" className="text-emerald-600 hover:underline">
              Faça login aqui
            </Link>
          </p>
        </form>
      </Form>

      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent className="flex flex-col justify-center items-center text-center rounded-xl border border-gray-200 p-6">
          <AlertDialogHeader className="flex flex-col justify-center items-center text-center">
            <CheckCircle2Icon size={64} className="text-emerald-600" />
            <AlertDialogTitle className="text-emerald-600">
              Conta criada com sucesso!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-700 text-center">
              Sua conta de professor foi criada com sucesso. Agora você pode
              fazer login com seu e-mail e senha.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              className="bg-emerald-500 text-white hover:bg-emerald-600"
              onClick={() => setOpenDialog(false)}
            >
              <Link href="/login">Ok, entendi</Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
