"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
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
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import z from "zod";
import { toast } from "sonner";
import updateActivity from "@/actions/teacher/acivities/updateActivity";

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  dueDate: z.date(),
  type: z.enum(["ASSIGNMENT", "COMPLEMENTARY_MATERIAL", "EXERCISE"]),
  fileUrl: z.string().optional(),
});

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  activity: ClassroomActivities;
  onUpdated: () => void;
}

export default function EditActivityDialog({
  open,
  setOpen,
  activity,
  onUpdated,
}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: activity.title,
      description: activity.description,
      dueDate: new Date(activity.dueDate),
      type: activity.type,
      fileUrl: activity.fileUrl || "",
    },
  });

  useEffect(() => {
    form.reset({
      title: activity.title,
      description: activity.description,
      dueDate: new Date(activity.dueDate),
      type: activity.type,
      fileUrl: activity.fileUrl || "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await updateActivity(activity.id, values, token);
    if (response.success) {
      toast.success("Atividade atualizada com sucesso!");
      onUpdated();
      setOpen(false);
    } else {
      toast.error("Erro ao atualizar atividade");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md rounded-2xl px-6 py-8 shadow-xl">
        <DialogTitle className="text-lg font-semibold text-gray-800 mb-4">
          Editar atividade
        </DialogTitle>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700">
                    Título
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Título da atividade" />
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
                  <FormLabel className="text-sm text-gray-700">
                    Instruções
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={4}
                      placeholder="Detalhes da atividade..."
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
                  <FormLabel className="text-sm text-gray-700">Tipo</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Tipo da atividade" />
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
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700">Prazo</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={`w-full justify-start text-left font-normal ${
                            !field.value ? "text-muted-foreground" : ""
                          }`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? format(field.value, "dd/MM/yyyy")
                            : "Selecionar"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="p-0">
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
              className="w-full bg-emerald-500 text-white hover:bg-emerald-600"
            >
              Salvar alterações
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
