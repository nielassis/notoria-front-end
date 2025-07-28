import { api } from "@/provider/api";

export async function getAllClassroomActivities(
  classroomId: string,
  token: string
) {
  try {
    const response = await api.get(`activities/${classroomId}/activities`, {
      headers: {
        Authorization: token,
      },
    });

    const { activities } = response.data;

    return { success: true, data: activities };
  } catch (err) {
    console.error({ success: false, error: err });
  }
}
