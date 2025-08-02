import { api } from "@/provider/api";

interface Props {
  activityId: string;
  token: string;
}

export async function getActivityById({
  activityId,
  token,
}: Props): Promise<StudentActivityById | null> {
  try {
    const response = await api.get<StudentActivityById>(
      `activities/student/activity/${activityId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Erro ao buscar atividade:", err);
    return null;
  }
}
