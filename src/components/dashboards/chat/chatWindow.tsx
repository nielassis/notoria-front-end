"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/utils/getInitials";
import { ArrowLeft, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { loadConversationAction } from "@/actions/chat/loadConversations";
import { sendMessageAction } from "@/actions/chat/sendMessage";
import { MessageInput, messageSchema } from "@/utils/message";
import { useEffect, useState } from "react";

interface ChatWindowProps {
  selectedStudent: Student | null;
  back: () => void;
  role: "teacher" | "student" | null;
}

export default function ChatWindow({
  selectedStudent,
  back,
  role,
}: ChatWindowProps) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);
  }, []);

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MessageInput>({
    resolver: zodResolver(messageSchema),
  });

  const conversationKey = role === "teacher" ? selectedStudent?.id : "self";

  const { data: messages = [] } = useQuery({
    queryKey: ["conversation", conversationKey],
    queryFn: async () => {
      if (!token) return [];
      if (role === "teacher") {
        return selectedStudent
          ? await loadConversationAction(role, token, selectedStudent.id)
          : [];
      }
      return await loadConversationAction(role!, token);
    },
    enabled: role !== null && (role === "student" || selectedStudent !== null),
    refetchInterval: 3000,
  });

  const mutation = useMutation({
    mutationFn: (data: MessageInput) =>
      sendMessageAction({
        token: token!,
        content: data.content,
        studentId: role === "teacher" ? selectedStudent?.id : undefined,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversation", conversationKey],
      });
      reset();
    },
  });

  const onSubmit = (data: MessageInput) => mutation.mutate(data);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 p-2 border-b">
        {role === "teacher" && (
          <button onClick={back} className="p-1 hover:bg-gray-200 rounded">
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <span className="flex gap-2 items-center">
          <Avatar className="w-8 h-8">
            <AvatarFallback>
              {getInitials(
                role === "teacher" ? selectedStudent?.name ?? "C" : "P"
              )}
            </AvatarFallback>
          </Avatar>
          <p>
            {role === "teacher"
              ? selectedStudent?.name || "Conversa"
              : "Professor"}
          </p>
        </span>
      </div>

      <div className="flex-1 p-2 overflow-y-auto space-y-2">
        {messages.map((msg: Message) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.senderRole === role?.toUpperCase()
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <span
              className={`px-3 py-1 rounded-md max-w-[70%] break-words ${
                msg.senderRole === role?.toUpperCase()
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex border-t p-2 gap-2"
      >
        <Input
          {...register("content")}
          className="flex-1"
          placeholder="Digite sua mensagem..."
        />
        <Button type="submit" className="bg-emerald-500 hover:bg-emerald-600">
          <Send className="w-5 h-5" />
        </Button>
      </form>

      {errors.content && (
        <p className="text-red-500 text-sm px-2">{errors.content.message}</p>
      )}
    </div>
  );
}
