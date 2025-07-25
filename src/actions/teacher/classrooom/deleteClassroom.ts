import { api } from "@/provider/api";

interface DeleteClassroomProps {
  id: string;
  token: string;
}

export default async function deleteClassroom({
  id,
  token,
}: DeleteClassroomProps) {
  try {
    const response = await api.delete(`classroom/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return { success: true, data: response.data };
  } catch (err) {
    console.error({ success: false, error: err });
  }
}
