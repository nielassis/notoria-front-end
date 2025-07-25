import { api } from "@/provider/api";

interface UpdateClassroomPayload {
  name?: string;
}

interface UpdateClassroomResponse {
  success: boolean;
  message?: string;
}

export default async function updateClassroom(
  id: string,
  data: UpdateClassroomPayload,
  token: string
): Promise<UpdateClassroomResponse> {
  try {
    const response = await api.put<UpdateClassroomResponse>(
      `classroom/${id}`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.data;
  } catch {
    console.error("Erro ao atualizar turma:");
    return {
      success: false,
      message: "Erro na requisição.",
    };
  }
}
