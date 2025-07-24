enum Role {
  TEACHER = "teacher",
  STUDENT = "student",
}

type UserValidation = {
  email: string;
  password: string;
};

interface TokenPayload {
  sub: string;
  email: string;
  name: string;
  role: "student" | "teacher";
  exp: number;
}
