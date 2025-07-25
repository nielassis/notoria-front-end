interface UpdateStudentPayload {
  name?: string;
  email?: string;
  newPassword?: string;
}

interface UpdateStudentResponse {
  success: boolean;
  message?: string;
}

export default async function updateStudent(
  id: string,
  data: UpdateStudentPayload,
  token: string
): Promise<UpdateStudentResponse> {
  const response = await fetch(`/teacher/student/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erro na requisição: " + response.statusText);
  }

  const json = (await response.json()) as UpdateStudentResponse;
  return json;
}
