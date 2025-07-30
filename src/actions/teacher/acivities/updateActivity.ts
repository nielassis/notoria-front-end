import { api } from "@/provider/api";

interface ActivityPayload {
  title: string;
  description: string;
  dueDate: string;
  type: "ASSIGNMENT" | "COMPLEMENTARY_MATERIAL" | "EXERCISE";
  fileUrl?: string;
}

export default async function updateActivity(
  activityId: string,
  data: Omit<ActivityPayload, "dueDate"> & { dueDate: Date },
  token: string
) {
  try {
    const payload: ActivityPayload = {
      ...data,
      dueDate: data.dueDate.toISOString(),
    };

    const response = await api.put(`/activities/${activityId}`, payload, {
      headers: {
        Authorization: token,
      },
    });

    return { success: true, data: response.data };
  } catch (err) {
    console.error("Erro ao atualizar atividade:", err);
    return { success: false, error: err };
  }
}
