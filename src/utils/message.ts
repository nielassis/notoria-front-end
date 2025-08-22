import { z } from "zod";

export const messageSchema = z.object({
  content: z.string().min(1, "Digite sua mensagem"),
});

export type MessageInput = z.infer<typeof messageSchema>;
