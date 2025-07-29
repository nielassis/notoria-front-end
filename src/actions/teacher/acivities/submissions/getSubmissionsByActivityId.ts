import { api } from "@/provider/api";

interface Submission {
  id: string;
  studentId: string;
  activityId: string;
  submittedAt: string;
  fileUrl: string;
  content: string;
  grade: number | null;
  status: string;
  student: {
    id: string;
    name: string;
  };
}

interface SubmissionsResponse {
  graded: Submission[];
  pending: Submission[];
}

export async function getSubmissionsByActivityId(
  activityId: string,
  token: string
): Promise<
  | { success: true; data: SubmissionsResponse }
  | { success: false; error: unknown }
> {
  try {
    const response = await api.get<SubmissionsResponse>(
      `activities/${activityId}/submissions`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (err) {
    console.error("Erro ao buscar submissões:", err);
    return {
      success: false,
      error: err,
    };
  }
}
