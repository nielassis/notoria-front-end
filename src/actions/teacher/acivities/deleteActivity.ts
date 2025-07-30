import { api } from "@/provider/api";

export default async function deleteActivity(
  activityId: string,
  token: string
) {
  try {
    const response = await api.delete(`/activities/${activityId}`, {
      headers: {
        Authorization: token,
      },
    });

    return { success: true, data: response.data };
  } catch (err) {
    console.error("Erro ao deletar atividade:", err);
    return { success: false, error: err };
  }
}
