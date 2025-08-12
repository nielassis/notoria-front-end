"use client";

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
import { StarIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

interface ActivitySubmissionFormProps {
  activityId: string;
}

const formSchema = z.object({
  content: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export default function ActivitySubmissionForm({
  activityId,
}: ActivitySubmissionFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  async function onSubmit(data: FormData) {
    console.log(data);
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
                    placeholder="Escreva aqui o conteúdo da resposta"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button>
              <StarIcon className="mr-2" /> Entregar atividade
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
