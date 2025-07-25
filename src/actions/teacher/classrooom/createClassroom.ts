import { api } from "@/provider/api";

export default async function createClassroom(
  { name }: Omit<Class, "id" | "_count">,
  token: string
) {
  try {
    const response = await api.post(
      "classroom",
      { name },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return { success: true, data: response.data };
  } catch (err) {
    console.error({ success: false, error: err });
  }
}
