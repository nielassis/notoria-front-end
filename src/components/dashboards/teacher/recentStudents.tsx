import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/utils/getInitials";

interface RecentStudentsProps {
  submissions: ActivitySubmission[];
}

export default function RecentStudents({ submissions }: RecentStudentsProps) {
  const recent = submissions.filter(
    (submission) =>
      submission.status === "COMPLETED" && submission.grade !== null
  );

  return (
    <Card className="w-full lg:w-1/2">
      <CardHeader>
        <CardTitle className="text-lg">Alunos Recentes</CardTitle>
        <p className="text-sm text-muted-foreground">
          Últimas atualizações de notas
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {recent.map((submission) => (
          <div
            key={submission.id}
            className="flex justify-between items-center border rounded-lg p-4"
          >
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>
                  {getInitials(submission.student.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{submission.student.name}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">{submission.grade}</p>
              <Badge variant="success">Avaliado</Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
