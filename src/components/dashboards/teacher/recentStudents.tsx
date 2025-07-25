import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const students = [
  { name: "Ana Silva", grade: 9.5, status: "Aprovado", class: "9º A" },
  { name: "João Santos", grade: 7.8, status: "Aprovado", class: "8º B" },
  { name: "Maria Costa", grade: 6.2, status: "Recuperação", class: "9º A" },
  { name: "Pedro Lima", grade: 8.9, status: "Aprovado", class: "1º Ano" },
];

export default function RecentStudents() {
  return (
    <Card className="w-full lg:w-1/2">
      <CardHeader>
        <CardTitle className="text-lg">Alunos Recentes</CardTitle>
        <p className="text-sm text-muted-foreground">
          Últimas atualizações de notas
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {students.map((student, index) => (
          <div
            key={index}
            className="flex justify-between items-center border rounded-lg p-4"
          >
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>
                  {student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{student.name}</p>
                <p className="text-sm text-muted-foreground">{student.class}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">{student.grade}</p>
              <Badge
                variant={
                  student.status === "Recuperação" ? "destructive" : "success"
                }
              >
                {student.status}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
