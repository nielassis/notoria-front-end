import { api } from "@/provider/api";

export default async function getAllTeacherStudents(token: string) {
  try {
    const response = await api.get(`teacher/student`, {
      headers: {
        Authorization: token,
      },
    });
    const data = await response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
}
