import { api } from "@/provider/api";

interface UpdateStudentPayload {
  newPassword: string;
}

interface UpdateStudentResponse {
  success: boolean;
  message?: string;
}

export default async function changeStudentPassword(
  data: UpdateStudentPayload,
  token: string
): Promise<UpdateStudentResponse> {
  try {
    const response = await api.put<UpdateStudentResponse>(
      `student/change-password`,
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
