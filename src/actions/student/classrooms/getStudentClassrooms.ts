import { api } from "@/provider/api";

export async function getStudentClassrooms(
  token: string
): Promise<StudentClassroom[] | null> {
  try {
    const response = await api.get<StudentClassroom[]>("student/classrooms", {
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  } catch (err) {
    console.error("Erro ao buscar salas do aluno:", err);
    return null;
  }
}
