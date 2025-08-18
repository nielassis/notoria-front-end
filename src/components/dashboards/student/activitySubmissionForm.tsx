"use client";

import { pathActivitySumission } from "@/actions/student/activities/pathActivitySumission";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  content: z.string(),
  fileUrl: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface ActivitySubmissionFormProps {
  activityId: string;
  onSuccess?: () => void;
}

export default function ActivitySubmissionForm({
  activityId,
  onSuccess,
}: ActivitySubmissionFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  async function onSubmit(data: FormData) {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await pathActivitySumission({
      activityId,
      content: data.content,
      fileUrl: data.fileUrl,
      token,
    });

    if (response?.success) {
      toast.success("Atividade entregue com sucesso!");
      if (onSuccess) onSuccess();
    } else {
      toast.error("Erro ao entregar atividade");
    }
  }

  return (
    <div className="w-full h-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 rounded-xl p-8 w-full"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resposta</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="rounded-md border resize-none border-gray-300 px-4 py-2"
                    placeholder="Escreva aqui o conteúdo da resposta"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2">
            <Button type="submit">
              <Check className="mr-2" /> Entregar atividade
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
