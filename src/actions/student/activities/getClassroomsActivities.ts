import { api } from "@/provider/api";

interface Activity {
  id: string;
  title: string;
  dueDate: string;
  description?: string;
  type: string;
}

export interface StudentActivity {
  id: string;
  studentId: string;
  activityId: string;
  submittedAt: string | null;
  fileUrl: string | null;
  content: string | null;
  grade: number | null;
  status: "PENDING" | "COMPLETED";
  activity: Activity;
}

export async function getClassroomActivities(
  token: string,
  classroomId: string
): Promise<StudentActivity[] | null> {
  try {
    const response = await api.get<StudentActivity[]>(
      `activities/student/${classroomId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error("Erro ao buscar atividades do aluno:", err);
    return null;
  }
}
