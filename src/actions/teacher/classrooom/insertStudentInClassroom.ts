import { api } from "@/provider/api";

interface Props {
  classroomId: string;
  studentId: string;
  token: string;
}

export async function PostStudentInClassroom({
  classroomId,
  studentId,
  token,
}: Props) {
  try {
    const response = await api.post(
      `classroom/classes/${classroomId}/${studentId}`,
      null,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return { success: true, data: response.data };
  } catch (err) {
    console.log("Erro ao adicionar aluno:", err);
  }
}
