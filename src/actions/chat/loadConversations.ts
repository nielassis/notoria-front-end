import { api } from "@/provider/api";

export async function loadConversationAction(
  role: string,
  token: string,
  studentId?: string
) {
  if (!token) return null;

  const normalizedRole =
    role.toLowerCase() === "teacher" ? "TEACHER" : "STUDENT";

  try {
    const res = await api.get("/chat/conversations", {
      headers: { Authorization: token },
    });

    if (normalizedRole === "STUDENT") {
      return res.data.length > 0 ? res.data[0].messages : [];
    } else if (normalizedRole === "TEACHER" && studentId) {
      const conversation = res.data.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (c: any) => c.student.id === studentId
      );
      return conversation?.messages || [];
    }

    return [];
  } catch (err) {
    console.error("Erro ao carregar conversas:", err);
    return [];
  }
}
