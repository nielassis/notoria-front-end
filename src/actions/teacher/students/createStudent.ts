import { api } from "@/provider/api";

export default async function createStudent(
  { email, name }: Omit<StudentSymple, "id">,
  token: string
) {
  try {
    const response = await api.post(
      "teacher/student",
      { email, name },
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
