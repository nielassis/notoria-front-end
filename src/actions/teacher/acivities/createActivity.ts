import { api } from "@/provider/api";

type ActivityType = "ASSIGNMENT" | "COMPLEMENTARY_MATERIAL" | "EXERCISE";

interface Activity {
  title: string;
  description: string;
  dueDate: Date;
  type: ActivityType;
  fileUrl?: string;
}

type ActivityPayload = {
  title: string;
  description: string;
  dueDate: string;
  type: ActivityType;
  fileUrl?: string;
};

export default async function createActivity(
  data: Activity,
  token: string,
  classroomId: string
) {
  try {
    const payload: ActivityPayload = {
      title: data.title,
      description: data.description,
      dueDate: data.dueDate.toISOString(),
      type: data.type,
      ...(data.fileUrl ? { fileUrl: data.fileUrl } : {}),
    };

    const response = await api.post(`activities/${classroomId}`, payload, {
      headers: {
        Authorization: token,
      },
    });

    return { success: true, data: response.data };
  } catch (err) {
    console.error("Erro ao criar atividade:", err);
    return { success: false, error: err };
  }
}
