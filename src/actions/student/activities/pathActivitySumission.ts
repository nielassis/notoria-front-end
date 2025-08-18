// service
import { api } from "@/provider/api";

interface Props {
  activityId: string;
  fileUrl?: string;
  content: string;
  token: string;
}

export async function pathActivitySumission({
  fileUrl,
  content,
  activityId,
  token,
}: Props): Promise<DefaultReturn | null> {
  try {
    const response = await api.patch<DefaultReturn>(
      `activities/student/${activityId}/submissions`,
      {
        fileUrl,
        content,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error("Erro ao enviar submissão da atividade:", err);
    return null;
  }
}
