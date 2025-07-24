import { api } from "@/provider/api";

interface Teacher {
  name: string;
  email: string;
  password: string;
  phone: string;
  discipline: string;
  educationalInstitution: string;
  experience: string;
}

export default async function createTeacher({ data }: { data: Teacher }) {
  try {
    const response = await api.post(`teacher`, {
      email: data.email,
      password: data.password,
      name: data.name,
      phone: data.phone,
      discipline: data.discipline,
      educationalInstitution: data.educationalInstitution,
      experience: data.experience,
    });

    return { success: true, data: response.data };
  } catch (err) {
    console.error({ success: false, error: err });
  }
}
