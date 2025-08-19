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
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  newPassword: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
  oldPassword: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});

type FormSchema = z.infer<typeof formSchema>;

export default function TeacherChangePasswordForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      oldPassword: "",
    },
    mode: "onChange",
  });

  async function onSubmit(data: FormSchema) {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await updateTeacher(data, token);

      if (response?.success) {
        toast.success("Senha alterada com sucesso!");
      } else {
        toast.error("Erro ao alterar senha");
      }
      form.reset();
    } catch (err) {
      if (err instanceof Error) {
        toast.error("Erro ao alterar senha");
      } else {
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 rounded-xl p-8 w-full"
      >
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha atual</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Digite sua senha atual"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nova senha</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Digite sua nova senha"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 items-center"
          disabled={!form.formState.isValid}
        >
          <Lock className="mr-2 h-4 w-4" /> Alterar senha
        </Button>
      </form>
    </Form>
  );
}
