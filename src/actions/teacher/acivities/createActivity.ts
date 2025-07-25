import { api } from "@/provider/api";

interface Acitivity {
  title: string;
  description: string;
  dueDate: Date;
  type: "ASSIGNMENT" | "COMPLEMENTARY_MATERIAL" | "EXERCISE";
  fileUrl?: string;
}

export default async function createActivity(
  data: Acitivity,
  token: string,
  classroomId: string
) {
  try {
    const response = await api.post(`activities/${classroomId}`, data, {
      headers: {
        Authorization: token,
      },
    });

    return { success: true, data: response.data };
  } catch (err) {
    console.error({ success: false, error: err });
  }
}
