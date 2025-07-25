import { api } from "@/provider/api";

interface DeleteStudentProps {
  id: string;
  token: string;
}

export default async function deleteStudent({ id, token }: DeleteStudentProps) {
  try {
    const response = await api.delete(`teacher/student/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return { success: true, data: response.data };
  } catch (err) {
    console.error({ success: false, error: err });
  }
}
