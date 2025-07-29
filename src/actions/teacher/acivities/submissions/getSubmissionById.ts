import { api } from "@/provider/api";

interface Props {
  submissionId: string;
  token: string;
}

export interface SubmissionResponse {
  id: string;
  submittedAt: string | null;
  fileUrl: string | null;
  content: string | null;
  grade: number | null;
  status: "PENDING" | "COMPLETED" | "REJECTED" | string;
  student: {
    id: string;
    name: string;
  };
  activity: {
    id: string;
    title: string;
  };
}

export async function getSubmissionById({
  submissionId,
  token,
}: Props): Promise<SubmissionResponse | null> {
  try {
    const response = await api.get<SubmissionResponse>(
      `activities/submission/${submissionId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Erro ao buscar submissão:", err);
    return null;
  }
}
