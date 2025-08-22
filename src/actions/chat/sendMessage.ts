import { api } from "@/provider/api";

interface SendMessageParams {
  token: string;
  content: string;
  studentId?: string;
}

export async function sendMessageAction({
  token,
  content,
  studentId,
}: SendMessageParams) {
  if (!token || !content) return null;

  try {
    const res = await api.post(
      "/chat",
      { studentId, content },
      { headers: { Authorization: token } }
    );

    return res.data;
  } catch (err) {
    console.error("Erro ao enviar mensagem:", err);
    return null;
  }
}
