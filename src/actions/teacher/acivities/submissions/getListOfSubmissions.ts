import { api } from "@/provider/api";

export async function getListOfSubmissions(
  token: string
): Promise<
  | { success: true; data: SubmissionsResponse }
  | { success: false; error: unknown }
> {
  try {
    const response = await api.get<SubmissionsResponse>(
      `activities/submissions`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return { success: true, data: response.data };
  } catch (err) {
    console.error("Erro ao buscar submissões:", err);
    return { success: false, error: err };
  }
}
