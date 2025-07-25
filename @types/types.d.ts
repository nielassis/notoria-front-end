enum Role {
  TEACHER = "teacher",
  STUDENT = "student",
}

type UserValidation = {
  email: string;
  password: string;
};

type Class = {
  id: string;
  name: string;
  _count: {
    students: number;
  };
};

type StudentSymple = {
  id: string;
  name: string;
  email: string;
};

interface TokenPayload {
  sub: string;
  email: string;
  name: string;
  role: "student" | "teacher";
  exp: number;
}
