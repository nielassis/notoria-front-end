import { api } from "@/provider/api";

export async function getAllClassroomActivities(
  classroomId: string,
  token: string
) {
  try {
    const response = await api.get(`activities/${classroomId}`, {
      headers: {
        Authorization: token,
      },
    });
    const data = await response.data;
    return { success: true, data };
  } catch (err) {
    console.error({ success: false, error: err });
  }
}
