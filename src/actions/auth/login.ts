import { api } from "@/provider/api";

interface User {
  email: string;
  password: string;
  userType: "teacher" | "student";
}

export default async function postLogin({ data }: { data: User }) {
  try {
    const response = await api.post(`${data.userType}/login`, {
      email: data.email,
      password: data.password,
    });

    return { success: true, data: response.data };
  } catch (err) {
    console.error({ success: false, error: err });
  }
}
