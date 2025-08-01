import { api } from "@/provider/api";

interface Props {
  classroomId: string;
  token: string;
}

export async function getStudentClassroomById({
  classroomId,
  token,
}: Props): Promise<Classroom | null> {
  try {
    const response = await api.get<Classroom>(
      `student/classrooms/${classroomId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}
