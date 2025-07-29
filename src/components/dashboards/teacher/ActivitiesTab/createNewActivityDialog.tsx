"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Plus } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import z from "zod";
import createActivity from "@/actions/teacher/acivities/createActivity";
import { toast } from "sonner";

interface Props {
  classroomId: string;
}

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  dueDate: z.date(),
  type: z.enum(["ASSIGNMENT", "COMPLEMENTARY_MATERIAL", "EXERCISE"]),
  fileUrl: z.string().optional(),
});

export default function CreateNewActivityDialog({ classroomId }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: new Date(),
      type: "ASSIGNMENT",
      fileUrl: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const token = localStorage.getItem("token");
    if (!token) return;
    const response = await createActivity(values, token, classroomId);

    if (response?.success) {
      toast.success("Atividade criada com sucesso!");
      form.reset();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden md:block">Nova atividade</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md rounded-2xl px-6 py-8 shadow-xl">
        <DialogTitle className="text-lg font-semibold text-gray-800 mb-4">
          Criar nova atividade
        </DialogTitle>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Título
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Atividade 1"
                      {...field}
                      className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Instruções para a atividade
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="rounded-lg border border-gray-300 px-4 py-2 resize-none focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      placeholder="Ex: Escreva o enunciado da atividade aqui..."
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Tipo
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ASSIGNMENT">Atividade</SelectItem>
                        <SelectItem value="COMPLEMENTARY_MATERIAL">
                          Material complementar
                        </SelectItem>
                        <SelectItem value="EXERCISE">Exercício</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Prazo para entrega
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={`
                w-full justify-start text-left font-normal
                ${!field.value ? "text-muted-foreground" : ""}
              `}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy")
                          ) : (
                            <span>Selecionar data</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-emerald-500 text-white hover:bg-emerald-600 transition-all py-2 rounded-lg"
            >
              Postar atividade
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
