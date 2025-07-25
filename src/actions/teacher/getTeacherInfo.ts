import { api } from "@/provider/api";

export default async function getTeacherInfo(token: string) {
  try {
    const response = await api.get(`teacher/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.data;
    return data;
  } catch (err) {
    console.error(err);
  }
}
