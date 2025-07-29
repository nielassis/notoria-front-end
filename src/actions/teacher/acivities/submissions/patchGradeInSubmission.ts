import { api } from "@/provider/api";

interface Props {
  submissionId: string;
  token: string;
  grade: number;
}

export async function patchGradeInSubmission({
  submissionId,
  token,
  grade,
}: Props) {
  try {
    const response = await api.patch(
      `activities/submission/${submissionId}/grade`,
      { grade },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return { success: true, data: response.data };
  } catch (err) {
    console.error({ success: false, error: err });
    return { success: false, error: err };
  }
}
