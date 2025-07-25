import { api } from "@/provider/api";

export async function getAllStudentsInClassroom(
  classroomId: string,
  token: string
) {
  try {
    const response = await api.get(`classroom/classes/${classroomId}`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
}
