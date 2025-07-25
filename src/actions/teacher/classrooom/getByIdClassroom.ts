import { api } from "@/provider/api";

export async function getByIdClassroom(classroomId: string, token: string) {
  try {
    const response = await api.get(`classroom/${classroomId}`, {
      headers: {
        Authorization: token,
      },
    });
    const data = await response.data;
    return { success: true, data };
  } catch (err) {
    console.error(err);
  }
}
