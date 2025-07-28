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

type SubmissionStatus = "PENDING" | "COMPLETED";

interface Student {
  id: string;
  name: string;
  email?: string;
}

type StudentWithScore = {
  student: {
    id: string;
    name: string;
    email: string;
  };
  score: number | null;
};

interface Activity {
  id: string;
  title: string;
}

interface ActivitySubmission {
  id: string;
  studentId: string;
  activityId: string;
  submittedAt: string | null;
  fileUrl: string | null;
  content: string | null;
  grade: number | null;
  status: SubmissionStatus;
  student: Student;
  activity: Activity;
}

interface SubmissionsResponse {
  completed: ActivitySubmission[];
  pending: ActivitySubmission[];
}

interface ClassroomActivities {
  id: string;
  title: string;
  description: string;
  type: "ASSIGNMENT" | "COMPLEMENTARY_MATERIAL" | "EXERCISE";
  dueDate: string;
  fileUrl?: string;
}
