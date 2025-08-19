"use client";

import updateTeacher from "@/actions/teacher/profile/updateTeacherProfile";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/authContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres").optional(),
  email: z.email("Email inválido").optional(),
  phone: z.string().min(10, "Telefone inválido").optional(),
  educationalInstitution: z
    .string()
    .min(2, "Instituição obrigatória")
    .optional(),
  discipline: z.string().min(2, "Disciplina obrigatória").optional(),
  experience: z.string().min(2, "Experiência obrigatória").optional(),
});

type FormSchema = z.infer<typeof formSchema>;

export default function TeacherProfileInfoForm() {
  const { signOut } = useAuth();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      educationalInstitution: "",
      discipline: "",
      experience: "",
    },
    mode: "onChange",
  });

  async function onSubmit(data: FormSchema) {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await updateTeacher(data, token);

      if (response?.success) {
        toast.success(
          "Informações alteradas com sucesso, faça login novamente!"
        );
      } else {
        toast.error("Erro ao alterar informações");
      }
      form.reset();
      setTimeout(() => signOut(), 3000);
    } catch (err) {
      if (err instanceof Error) {
        toast.error("Erro ao alterar informações");
      } else {
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Digite seu nome completo" />
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
                <Input {...field} placeholder="Digite seu novo email" />
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
                <Input {...field} placeholder="(11) 00000-0000" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="educationalInstitution"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instituição de Ensino</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Digite a instituição" />
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
              <FormLabel>Disciplina</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ex: Matemática" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experiência</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ex: 2 anos" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600"
        >
          <Save className="mr-2 h-4 w-4" /> Salvar Alterações
        </Button>
      </form>
    </Form>
  );
}
