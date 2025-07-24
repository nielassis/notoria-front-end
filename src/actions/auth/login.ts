import { SignInData } from "@/contexts/authContext";
import { api } from "@/provider/api";
import { jwtDecode } from "jwt-decode";

interface SignInResponse {
  success: boolean;
  token?: string;
  user?: TokenPayload;
}

export default async function signInRequest(
  data: Omit<SignInData, "role">,
  role: "student" | "teacher"
): Promise<SignInResponse> {
  try {
    const response = await api.post(`/${role}/login`, {
      email: data.email,
      password: data.password,
    });

    const token = response.data.token;
    const decoded: TokenPayload = jwtDecode(token.replace("Bearer ", ""));

    localStorage.setItem("token", token);

    return {
      success: true,
      token,
      user: decoded,
    };
  } catch (err) {
    console.error("Erro no login:", err);
    return { success: false };
  }
}
