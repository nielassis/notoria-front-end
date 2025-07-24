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
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import postLogin from "@/actions/auth/login";
import Link from "next/link";

interface LoginFormProps {
  userType: "teacher" | "student";
}

const formSchema = z.object({
  email: z.string().email("Precisa ser um email válido"),
  password: z.string(),
});

export default function LoginForm({ userType }: LoginFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const response = await postLogin({
      data: {
        ...data,
        userType,
      },
    });

    if (response?.success) {
      console.log("usuário logado com sucesso", response.data);
    } else {
      console.error("Erro ao fazer Login");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 rounded-xl p-8 w-full max-w-md"
      >
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite sua senha"
                  type="password"
                  {...field}
                  className="rounded-md border border-gray-300 px-4 py-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-emerald-500 text-white hover:bg-emerald-600"
        >
          Entrar como {userType === "student" ? "Aluno" : "Professor"}
        </Button>

        {userType === "teacher" && (
          <p className="text-sm text-center text-gray-600 ">
            Não tem uma conta? <br />
            <Link href="register" className="text-emerald-600 hover:underline">
              Cadastre-se aqui
            </Link>
          </p>
        )}
      </form>
    </Form>
  );
}
