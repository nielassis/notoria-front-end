import { api } from "@/provider/api";

interface UpdateTeacherPayload {
  name?: string;
  email?: string;
  phone?: string;
  educationalInstitution?: string;
  discipline?: string;
  experience?: string;
  oldPassword?: string;
  newPassword?: string;
}

export default async function updateTeacher(
  data: UpdateTeacherPayload,
  token: string
) {
  try {
    const response = await api.put(`teacher/profile`, data, {
      headers: {
        Authorization: token,
      },
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Erro ao atualizar professor:", error);
    return {
      success: false,
    };
  }
}
