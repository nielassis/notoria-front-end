import { api } from "@/provider/api";

interface UpdateStudentPayload {
  name?: string;
  email?: string;
  newPassword?: string;
}

interface UpdateStudentResponse {
  success: boolean;
  message?: string;
}

export default async function updateStudent(
  id: string,
  data: UpdateStudentPayload,
  token: string
): Promise<UpdateStudentResponse> {
  try {
    const response = await api.put<UpdateStudentResponse>(
      `teacher/student/${id}`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.data;
  } catch {
    console.error("Erro ao atualizar aluno:");
    return {
      success: false,
      message: "Erro na requisição.",
    };
  }
}
